# Generated by Django 5.0.7 on 2024-08-01 13:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_alter_customuser_is_active_otp'),
    ]

    operations = [
        migrations.AddField(
            model_name='tutorprofile',
            name='documents',
            field=models.FileField(blank=True, null=True, upload_to='tutor_documets/'),
        ),
        migrations.AddField(
            model_name='tutorprofile',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]