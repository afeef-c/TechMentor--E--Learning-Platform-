from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from django.dispatch import receiver

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

    def save(self, *args, **kwargs):
        if self.is_superuser:
            self.user_type = 'admin'
        super().save(*args, **kwargs)


class TutorProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, primary_key=True)
    expertise = models.CharField(max_length=255)
    experience = models.TextField()

    def clean(self):
        if self.user.user_type != 'tutor':
            raise ValidationError('Only users with user_type "tutor" can have a TutorProfile.')

    def __str__(self):
        return f"{self.user.username} - {self.expertise}"


@receiver(post_save, sender=CustomUser)
def create_or_update_tutor_profile(sender, instance, created, **kwargs):
    if instance.user_type == 'tutor':
        TutorProfile.objects.get_or_create(user=instance)
