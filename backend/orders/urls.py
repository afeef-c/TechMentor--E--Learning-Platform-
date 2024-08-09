
from django.urls import path
from .views import (
    CreateOrderView,
    CancelOrderView,
    OrderDetailView,
    PaymentView,
    ExecuteRazorpayPaymentView,
    handle_payment_success
)


urlpatterns = [
    # CourseCategory URLs
    path('', CreateOrderView.as_view(), name='orders'),
    path('<int:order_id>', OrderDetailView.as_view(), name='order_detail'),
    path('cancel_order/<int:order_id>/', CancelOrderView.as_view(), name='cancel_order'),

    path('create_payment/', PaymentView.as_view(), name='create_payment'),
    path('execute_payment/', ExecuteRazorpayPaymentView.as_view(), name='execute_payment'),
    path('handle_payment_success/', handle_payment_success, name='handle_payment_success'),

    #path('payments/', PaymentView.as_view(), name='payments'),
    #path('execute_payment/', ExecuteRazorpayPaymentView.as_view(), name='execute_payment'),
    #path('cancel_payment/', CancelRazorpayPaymentView.as_view(), name='cancel_payment'),

    
]





