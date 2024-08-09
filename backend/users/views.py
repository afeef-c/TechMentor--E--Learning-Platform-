from django.forms import ValidationError
from django.shortcuts import render
from rest_framework import generics, permissions,status
from .permissions import IsAdminOrTutor
from .models import OTP, Cart, CartItem, CourseProgress, CustomUser, StudentActivityLog, StudentProfile, TutorProfile, Wishlist
from .serializers import CartItemSerializer, CartSerializer, CourseProgressSerializer, CustomUserSerializer, RegisterSerializer, StudentActivityLogSerializer, StudentProfileSerializer, TutorProfileSerializer, WishlistSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission
from django.core.mail import send_mail
from django.conf import settings
import random
from rest_framework import serializers
from rest_framework.decorators import api_view




class IsAdminOrSelf(BasePermission):
    
    def has_object_permission(self, request, view, obj):
        if request.user and request.user.is_staff:
            return True
        return obj == request.user

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            # Log detailed errors
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        # Don't save the user yet
        user = serializer.save(is_active=False)
        
        # Generate OTP
        otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        
        # Save OTP
        OTP.objects.create(user=user, otp=otp)
        
        # Send email
        self.send_otp_email(user.email, otp)
        
        headers = self.get_success_headers(serializer.data)
        return Response({
            "message": "User registered successfully. Please check your email for OTP.",
            "user_id": user.id
        }, status=status.HTTP_201_CREATED, headers=headers)

    def send_otp_email(self, email, otp):
        subject = 'Verify your email'
        message = f'Your OTP for email verification is: {otp}'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, email_from, recipient_list)

class VerifyOTPView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('userId')
        otp = request.data.get('otp')

        if not user_id or not otp:
            return Response({'error': 'User ID and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(id=user_id)
            stored_otp = OTP.objects.filter(user=user).latest('created_at')

            if stored_otp.otp == otp:
                user.is_active = True
                user.save()
                stored_otp.delete()
                return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except OTP.DoesNotExist:
            return Response({'error': 'OTP not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminOrSelf]
    
    def get_object(self):
        # Retrieve the object based on the URL pk
        obj = generics.get_object_or_404(CustomUser, pk=self.kwargs['pk'])
        return obj


class TutorProfileCreateView(generics.CreateAPIView):
    queryset = TutorProfile.objects.all()
    serializer_class = TutorProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if user.user_type != 'tutor':
            raise serializers.ValidationError('Only users with user_type "tutor" can create a TutorProfile.')
        serializer.save(user=user)

class TutorProfileUpdateView(generics.RetrieveUpdateAPIView):
    queryset = TutorProfile.objects.all()
    serializer_class = TutorProfileSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return TutorProfile.objects.get(user=self.request.user)

    def perform_update(self, serializer):
        user = self.request.user
        if user.user_type != 'tutor':
            raise serializers.ValidationError('Only users with user_type "tutor" can update a TutorProfile.')
        serializer.save(user=user)

    
class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]


from django.core.mail import send_mail
from django.conf import settings
from rest_framework import generics, permissions, status, viewsets, serializers
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission

from .models import OTP, CustomUser, TutorProfile
from .serializers import CustomUserSerializer, RegisterSerializer, TutorProfileSerializer
import random

class IsAdminOrSelf(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user and (request.user.is_staff or obj == request.user)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        user = serializer.save(is_active=False)
        otp = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        OTP.objects.create(user=user, otp=otp)
        self.send_otp_email(user.email, otp)
        
        headers = self.get_success_headers(serializer.data)
        return Response({
            "message": "User registered successfully. Please check your email for OTP.",
            "user_id": user.id
        }, status=status.HTTP_201_CREATED, headers=headers)

    def send_otp_email(self, email, otp):
        subject = 'Verify your email'
        message = f'Your OTP for email verification is: {otp}'
        email_from = settings.EMAIL_HOST_USER
        recipient_list = [email]
        send_mail(subject, message, email_from, recipient_list)

class VerifyOTPView(generics.CreateAPIView):
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        user_id = request.data.get('userId')
        otp = request.data.get('otp')

        if not user_id or not otp:
            return Response({'error': 'User ID and OTP are required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = CustomUser.objects.get(id=user_id)
            stored_otp = OTP.objects.filter(user=user).latest('created_at')

            if stored_otp.otp == otp:
                user.is_active = True
                user.save()
                stored_otp.delete()
                return Response({'message': 'Email verified successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Invalid OTP'}, status=status.HTTP_400_BAD_REQUEST)
        except CustomUser.DoesNotExist:
            return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
        except OTP.DoesNotExist:
            return Response({'error': 'OTP not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminOrSelf]

    def get_object(self):
        obj = generics.get_object_or_404(CustomUser, pk=self.kwargs['pk'])
        return obj

#class TutorProfileCreateView(generics.CreateAPIView):
    #queryset = TutorProfile.objects.all()
    #serializer_class = TutorProfileSerializer
    #permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        user = self.request.user
        if user.user_type != 'tutor':
            raise serializers.ValidationError('Only users with user_type "tutor" can create a TutorProfile.')
        serializer.save(user=user)

#class TutorProfileUpdateView(generics.RetrieveUpdateAPIView):
#    queryset = TutorProfile.objects.all()
#    serializer_class = TutorProfileSerializer
#    permission_classes = [IsAuthenticated]

#    def get_object(self):
#        return TutorProfile.objects.get(user=self.request.user)

#    def perform_update(self, serializer):
#        user = self.request.user
#        if user.user_type != 'tutor':
#            raise serializers.ValidationError('Only users with user_type "tutor" can update a TutorProfile.')
#        serializer.save(user=user)

class TutorProfileUpdateView(generics.RetrieveUpdateAPIView):
    queryset = TutorProfile.objects.all()
    serializer_class = TutorProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        try:
            return TutorProfile.objects.get(user=self.request.user)
        except TutorProfile.DoesNotExist:
            raise serializers.ValidationError("Tutor profile does not exist")

    def perform_update(self, serializer):
        if self.request.user.user_type != 'tutor':
            raise serializers.ValidationError('Only users with user_type "tutor" can update a TutorProfile.')

        if 'is_verified' in serializer.validated_data and not self.request.user.is_superuser:
            raise serializers.ValidationError("Only admins can update the 'is_verified' field.")

        serializer.save()

class TutorVerificationView(generics.UpdateAPIView):
    queryset = TutorProfile.objects.all()
    serializer_class = TutorProfileSerializer
    permission_classes = [permissions.IsAdminUser] 

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        data = {'is_verified': True}
        serializer = self.get_serializer(instance, data=data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)


class StudentProfileViewSet(viewsets.ModelViewSet):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentProfileSerializer

class StudentActivityLogViewSet(viewsets.ModelViewSet):
    queryset = StudentActivityLog.objects.all()
    serializer_class = StudentActivityLogSerializer

class CourseProgressViewSet(viewsets.ModelViewSet):
    queryset = CourseProgress.objects.all()
    serializer_class = CourseProgressSerializer

class WishlistViewSet(viewsets.ModelViewSet):
    queryset = Wishlist.objects.all()
    serializer_class = WishlistSerializer

#====================CART==============================================

#class CartListCreateView(generics.ListCreateAPIView):
#    queryset = Cart.objects.all()
#    serializer_class = CartSerializer

#    def perform_create(self, serializer):
#        serializer.save(user=self.request.user)


class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer

@api_view(['GET'])
def get_or_create_cart(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        cart = Cart.objects.create(user=user)

    serializer = CartSerializer(cart)
    return Response(serializer.data)

@api_view(['POST'])
def add_item_to_cart(request):
    user = request.user
    course_id = request.data.get('course')
    price_at_addition = request.data.get('price_at_addition')

    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        return Response({"detail": "Cart does not exist for this user."}, status=status.HTTP_404_NOT_FOUND)

    if CartItem.objects.filter(cart=cart, course_id=course_id).exists():
        return Response({"detail": "Item already in cart."}, status=status.HTTP_400_BAD_REQUEST)

    cart_item = CartItem.objects.create(
        cart=cart,
        course_id=course_id,
        price_at_addition=price_at_addition
    )

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_cart_items(request):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        return Response({"detail": "Cart does not exist for this user."}, status=status.HTTP_404_NOT_FOUND)

    items = CartItem.objects.filter(cart=cart)
    serializer = CartItemSerializer(items, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def remove_item_from_cart(request, item_id):
    user = request.user
    try:
        cart = Cart.objects.get(user=user)
    except Cart.DoesNotExist:
        return Response({"detail": "Cart does not exist for this user."}, status=status.HTTP_404_NOT_FOUND)

    try:
        cart_item = CartItem.objects.get(cart=cart, id=item_id)
    except CartItem.DoesNotExist:
        return Response({"detail": "Item not found in cart."}, status=status.HTTP_404_NOT_FOUND)

    cart_item.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
