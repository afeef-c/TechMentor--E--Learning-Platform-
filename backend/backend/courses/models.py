from django.db import models
from django.conf import settings

class CourseCategory(models.Model):
    name = models.CharField(max_length=255, unique=True)
    image = models.ImageField(upload_to='category_images/', blank=True, null=True)

    def __str__(self):
        return self.name

class Course(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    tutor = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=False)
    course_fee = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    category = models.ForeignKey(CourseCategory, on_delete=models.CASCADE, related_name='courses', null=True, blank=True)
    image = models.ImageField(upload_to='course_images/', blank=True, null=True)


    def __str__(self):
        return self.title

class Lesson(models.Model):
    lesson_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    content = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    order = models.IntegerField()
    files = models.FileField(upload_to='lesson_files/', blank=True, null=True)
    video_url = models.URLField(max_length=200, blank=True, null=True)  # New field for video links
    document_url = models.URLField(max_length=200, blank=True, null=True)  # New field for video links



    def __str__(self):
        return f"{self.title} - {self.course.title} (Order: {self.order})"

class Assignment(models.Model):
    assi_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    description = models.TextField()
    due_date = models.DateField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    
    def __str__(self):
        return f"{self.title} - {self.course.title} (Due: {self.due_date})"

