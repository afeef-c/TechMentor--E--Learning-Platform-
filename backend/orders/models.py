from django.db import models
from django.contrib.auth import get_user_model
from courses.models import Course

User = get_user_model()

class Order(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('cancelled', 'Cancelled'),
        ('paid', 'Paid'),
        ('failed', 'Failed'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    razorpay_order_id = models.CharField(max_length=100, blank=True, null=True)

    
    def __str__(self):
        return f"Order {self.id} for {self.user}"

class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    course_fee = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"OrderItem {self.id} for Order {self.order.id}"

class Payment(models.Model):
    PAYMENT_CHOICES=(

        ('razorpay','Razorpay'),
        ('paypal','Paypal'),
        ('netbanking','Netbanking'),
    )
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    order = models.OneToOneField(Order, on_delete=models.CASCADE)
    payment_method = models.CharField(max_length=50, choices=PAYMENT_CHOICES, default='paypal') 
    transaction_id = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Payment {self.id} for Order {self.order.id}"



