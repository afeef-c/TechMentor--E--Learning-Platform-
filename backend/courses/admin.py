from django.contrib import admin
from .models import Course, Lesson

class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'tutor', 'course_fee', 'is_active')
    list_filter = ('is_active', 'tutor')
    search_fields = ('title', 'tutor__username')

admin.site.register(Course, CourseAdmin)

class LessonAdmin(admin.ModelAdmin):
    list_display = ('title', 'order', 'course', 'video_url', 'document_url')
    list_filter = ('course',)  # Ensure this is a tuple
    search_fields = ('title', 'course__title')

admin.site.register(Lesson, LessonAdmin)
