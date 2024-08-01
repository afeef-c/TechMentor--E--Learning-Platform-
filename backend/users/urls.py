from django.urls import path
from .views import RegisterView, TutorProfileCreateView, TutorProfileUpdateView, UserDetailView,CurrentUserView, UserListView, VerifyOTPView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('profile/', CurrentUserView.as_view(), name='profile'),
    #path('tutor-profile/create/', TutorProfileCreateView.as_view(), name='tutor-profile-create'),
    path('tutor_profile/update/', TutorProfileUpdateView.as_view(), name='tutor-profile-update'),
    path('profile/<int:pk>/', UserDetailView.as_view(), name='profile'),
    
    path('users_list/', UserListView.as_view(), name='users_list'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]