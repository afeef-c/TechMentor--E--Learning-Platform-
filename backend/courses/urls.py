from django.urls import path
from .views import AssignmentListCreateView, AssignmentRetrieveUpdateDestroyView, CategoryListView, CourseCategoryListCreateView, CourseCategoryRetrieveUpdateDestroyView, CourseDetailView, CourseListCreateView, CourseListView, CourseRetrieveUpdateDestroyView, CourseActivateView, LessonListCreateView, LessonRetrieveUpdateDestroyView, TutorCoursesList

urlpatterns = [
    # CourseCategory URLs
    path('course_categories/', CourseCategoryListCreateView.as_view(), name='coursecategory-list-create'),
    path('categories_list/', CategoryListView.as_view(), name='categories_list'),
    path('course_categories/<int:pk>/', CourseCategoryRetrieveUpdateDestroyView.as_view(), name='coursecategory-detail'),
    
    #coures
    path('', CourseListCreateView.as_view(), name='course-list-create'),
    path('courses_list/', CourseListView.as_view(), name='course-list-create'),
    
    path('tutor_courses/', TutorCoursesList.as_view(), name='tutor_courses'),

    
    path('course_details/<int:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('<int:pk>/', CourseRetrieveUpdateDestroyView.as_view(), name='course_detail_update'),
    path('<int:pk>/activate/', CourseActivateView.as_view(), name='course-activate'),


    
    # Lesson URLs
    path('lessons/<int:course_id>/', LessonListCreateView.as_view(), name='lesson-list-create'),
    path('lessons/<int:pk>/', LessonRetrieveUpdateDestroyView.as_view(), name='lesson-detail'),

    # Assignment URLs
    path('assignments/', AssignmentListCreateView.as_view(), name='assignment-list-create'),
    path('assignments/<int:pk>/', AssignmentRetrieveUpdateDestroyView.as_view(), name='assignment-detail'),
]
