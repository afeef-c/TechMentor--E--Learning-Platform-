from django.forms import ValidationError
from django.shortcuts import render
from rest_framework import generics, permissions
from .permissions import IsAdminOrTutor
from .models import CustomUser, TutorProfile
from .serializers import CustomUserSerializer, RegisterSerializer, TutorProfileSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework.views import APIView
from rest_framework.permissions import BasePermission

class IsAdminOrSelf(BasePermission):
    """
    Custom permission to only allow admins or the user themselves to edit user details.
    """
    def has_object_permission(self, request, view, obj):
        # Admin users can edit any user
        if request.user and request.user.is_staff:
            return True
        # Non-admin users can only edit their own details
        return obj == request.user

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminOrSelf]
    
    def get_object(self):
        # Retrieve the object based on the URL pk
        obj = generics.get_object_or_404(CustomUser, pk=self.kwargs['pk'])
        return obj
    
class TutorProfileDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TutorProfile.objects.all()
    serializer_class = TutorProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsAdminOrTutor]

    def get_object(self):
        return TutorProfile.objects.get(user=self.request.user)

    def perform_update(self, serializer):
        if self.request.user.user_type != 'tutor':
            raise ValidationError('Only users with user_type "tutor" can update tutor details.')
        serializer.save()
        
class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user


class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [IsAdminUser]


