import razorpay
import json
import logging

from django.conf import settings
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from courses.models import Course
from users.models import Cart, CartItem
from .models import Order, OrderItem, Payment
from .serializers import OrderSerializer

logger = logging.getLogger(__name__)
razorpay_client = razorpay.Client(auth=(settings.RAZORPAY_API_KEY, settings.RAZORPAY_API_SECRET))

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        course_ids = request.data.get('courseIds', [])

        if not course_ids:
            return Response({'error': 'No course IDs provided.'}, status=status.HTTP_400_BAD_REQUEST)
        
        pending_orders = Order.objects.filter(user=user, status='pending', items__course__id__in=course_ids).exists()

        if pending_orders:
            return Response({'error': 'You have already purchased these courses.'}, status=status.HTTP_400_BAD_REQUEST)

        # Create order in Django
        order = Order.objects.create(user=user, total_amount=0)
        total_amount = 0
        cart_items_to_delete = []

        for course_id in course_ids:
            course = get_object_or_404(Course, id=course_id)
            OrderItem.objects.create(order=order, course=course, course_fee=course.course_fee)
            total_amount += course.course_fee

            cart_item = CartItem.objects.filter(cart__user=user, course=course).first()
            if cart_item:
                cart_items_to_delete.append(cart_item)
                
        order.total_amount = total_amount
        order.save()

        for cart_item in cart_items_to_delete:
            cart_item.delete()

        # Create order in Razorpay
        try:
            razorpay_order = razorpay_client.order.create({
                'amount': int(total_amount * 100),  # Amount in paise
                'currency': 'INR',
                'receipt': str(order.id),
                'payment_capture': '1'  # Automatic capture
            })
            razorpay_order_id = razorpay_order['id']
            order.razorpay_order_id = razorpay_order_id
            order.save()
        except Exception as e:
            return Response({'error': f'Error creating Razorpay order: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request):
        orders = Order.objects.filter(user=request.user)
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CancelOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)
        if order.status != 'pending':
            return Response({'error': 'Order cannot be canceled as it is already processed.'}, status=status.HTTP_400_BAD_REQUEST)

        order.status = 'cancelled'
        order.save()

        #for item in order.items.all():
        #    CartItem.objects.create(
        #        cart=Cart.objects.get_or_create(user=request.user)[0],
        #        course=item.course,
        #        price_at_addition=item.course_fee
        #    )

        return Response({'message': 'Order has been canceled successfully.'}, status=status.HTTP_200_OK)

class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, order_id):
        order = get_object_or_404(Order, id=order_id, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_200_OK)

class PaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        order_id = request.data.get('order_id')
        if not order_id:
            return Response({'error': 'Order ID is required'}, status=status.HTTP_400_BAD_REQUEST)

        order = get_object_or_404(Order, id=order_id)

        # Check if a payment already exists for this order
        existing_payment = Payment.objects.filter(order=order).first()
        if existing_payment:
            return Response({'error': 'Payment already exists for this order.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount_in_paise = int(order.total_amount * 100)
            razorpay_order = razorpay_client.order.create({
                "amount": amount_in_paise,
                "currency": "INR",
                "payment_capture": "1"
            })

            # Create payment record
            payment = Payment.objects.create(
                order=order,
                amount=order.total_amount,
                payment_method='Razorpay',
                payment_status='pending',
                transaction_id=razorpay_order['id']
            )

            logger.info(f'Payment created successfully for Order ID {order_id} with Razorpay Order ID {razorpay_order["id"]}')

            return Response({
                'razorpay_order_id': razorpay_order['id'],
                'razorpay_key': settings.RAZORPAY_KEY_ID,
                'amount': amount_in_paise,
                'currency': "INR",
                'order_id': order_id
            }, status=status.HTTP_201_CREATED)

        except razorpay.errors.RazorpayError as e:
            logger.error(f'Razorpay error while creating payment for Order ID {order_id}: {str(e)}')
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f'Unexpected error while processing payment for Order ID {order_id}: {str(e)}')
            return Response({'error': 'An error occurred while processing your payment. Please try again later.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ExecuteRazorpayPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        razorpay_payment_id = request.data.get('razorpay_payment_id')
        order_id = request.data.get('order_id')
        razorpay_order_id = request.data.get('razorpay_order_id')

        if not (razorpay_payment_id and order_id and razorpay_order_id):
            return Response({'error': 'Required parameters are missing'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Fetch payment details from Razorpay
            payment = razorpay_client.payment.fetch(razorpay_payment_id)
            signature = payment.get('signature', None)  # Ensure the signature is fetched if available
            
            # Verify the payment
            order = get_object_or_404(Order, id=order_id)
            if payment['order_id'] != razorpay_order_id:
                raise ValueError('Invalid Order ID')

            # Update your Payment model or perform additional verification as needed
            Payment.objects.create(
                order=order,
                amount=order.total_amount,
                payment_method='Razorpay',
                payment_status='completed',
                transaction_id=razorpay_payment_id,
                razorpay_signature=signature,
            )

            return Response({'success': 'Payment verified'}, status=status.HTTP_200_OK)

        except razorpay.errors.RazorpayError as e:
            logger.error(f'Razorpay error: {str(e)}')
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f'Unexpected error: {str(e)}')
            return Response({'error': 'An error occurred'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@csrf_exempt
def handle_payment_success(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            order = get_object_or_404(Order, id=data.get('order_id'))

            payment, _ = Payment.objects.get_or_create(order=order)
            payment.transaction_id = data.get('razorpay_payment_id')
            payment.signature_id = data.get('razorpay_signature')
            payment.payment_status = 'completed'
            payment.save()

            order.status = 'paid'
            order.save()

            return JsonResponse({'message': 'Payment recorded successfully'}, status=200)
        except Exception as e:
            logger.error(f'Error recording payment: {str(e)}')
            return JsonResponse({'error': 'Failed to record payment'}, status=500)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=405)
