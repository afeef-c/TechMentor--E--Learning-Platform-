# Generated by Django 5.0.7 on 2024-07-28 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0004_course_image_coursecategory_image_lesson_files'),
    ]

    operations = [
        migrations.AddField(
            model_name='lesson',
            name='document_url',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='lesson',
            name='video_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]