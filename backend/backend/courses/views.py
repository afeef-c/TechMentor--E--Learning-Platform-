from rest_framework import generics, permissions
from .models import Course
from .serializers import CourseSerializer
from .permissions import IsAdminOrTutor


class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)

    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]  # Require authentication for POST requests
        return [permissions.AllowAny()]  # Allow read access for GET requests
    
class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def perform_create(self, serializer):
        serializer.save(tutor=self.request.user)

class CourseRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get_permissions(self):
        if self.request.method in ['PUT', 'DELETE', 'PATCH']:
            return [permissions.IsAuthenticated(), IsAdminOrTutor()]  # Restrict modifications to Admins or Tutors
        return [permissions.AllowAny()]  # Allow retrieval for all users

class CourseActivateView(generics.UpdateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAdminUser]  # Restrict access to Admins only

    def perform_update(self, serializer):
        serializer.instance.is_active = True
        serializer.save()
