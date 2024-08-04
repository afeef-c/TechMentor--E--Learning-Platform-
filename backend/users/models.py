from django.conf import settings
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

from courses.models import Course

class CustomUser(AbstractUser):
    USER_TYPES = (
        ('student', 'Student'),
        ('tutor', 'Tutor'),
        ('admin', 'Admin'),
    )
    
    user_type = models.CharField(max_length=10, choices=USER_TYPES, default='student')
    bio = models.TextField(blank=True, null=True)
    profile_pic = models.ImageField(upload_to='profile_pics/', blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)
    groups = models.ManyToManyField(Group, related_name='customuser_set')
    user_permissions = models.ManyToManyField(Permission, related_name='customuser_set')
    is_active = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.user_type = 'admin'
        super().save(*args, **kwargs)




class TutorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    expertise = models.CharField(max_length=255)
    experience = models.TextField()
    documents = models.FileField(upload_to='tutor_documets/', blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    def clean(self):
        if self.user.user_type != 'tutor':
            raise ValidationError('Only users with user_type "tutor" can have a TutorProfile.')

    def __str__(self):
        return f"{self.user.username} - {self.expertise}"


@receiver(post_save, sender=CustomUser)
def create_or_update_tutor_profile(sender, instance, created, **kwargs):
    if instance.user_type == 'tutor':
        TutorProfile.objects.get_or_create(user=instance)
    elif instance.user_type == 'student':
        StudentProfile.objects.get_or_create(user=instance)
        Cart.objects.get_or_create(user= instance)


class StudentProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    
class StudentActivityLog(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    login_time = models.DateTimeField()
    logout_time = models.DateTimeField()


class CourseProgress(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    lessons_completed = models.IntegerField()
    total_lessons = models.IntegerField()
    progress_percentage = models.FloatField()
    updated_at = models.DateField(auto_now=True)

class Wishlist(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        unique_together = ('user', 'course')

class Cart(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    date_added = models.DateTimeField(auto_now_add=True)
    price_at_addition = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        unique_together = ('cart', 'course')


class OTP(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    otp = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
