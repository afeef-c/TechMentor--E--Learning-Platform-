from django.contrib import admin
from .models import Course

class CourseAdmin(admin.ModelAdmin):
    list_display = ('title', 'tutor', 'course_fee', 'is_active')
    list_filter = ('is_active', 'tutor')
    search_fields = ('title', 'tutor__username')

admin.site.register(Course, CourseAdmin)
