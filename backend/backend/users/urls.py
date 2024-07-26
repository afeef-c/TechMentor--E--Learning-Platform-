from django.urls import path
from .views import RegisterView, TutorProfileDetailView, UserDetailView,UserListView,CurrentUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', CurrentUserView.as_view(), name='profile'),
    path('tutor_profile/<int:pk>/', TutorProfileDetailView.as_view(), name='tutor-profile'),
    path('profile/<int:pk>/', UserDetailView.as_view(), name='profile'),
    
    path('users_list/', UserListView.as_view(), name='users_list'),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
