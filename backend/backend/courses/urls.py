from django.urls import path
from .views import CourseListCreateView, CourseRetrieveUpdateDestroyView, CourseActivateView

urlpatterns = [
    path('', CourseListCreateView.as_view(), name='course-list-create'),
    path('<int:pk>/', CourseRetrieveUpdateDestroyView.as_view(), name='course-detail'),
    path('<int:pk>/activate/', CourseActivateView.as_view(), name='course-activate'),
]
