from django.urls import include, path
from .views import CartDetailView, CourseProgressViewSet, RegisterView, StudentActivityLogViewSet, StudentProfileViewSet, TutorProfileUpdateView, UserDetailView,CurrentUserView, UserListView, VerifyOTPView, WishlistViewSet, add_item_to_cart, get_cart_items, get_or_create_cart
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.routers import DefaultRouter


router = DefaultRouter()

router.register(r'student_profiles', StudentProfileViewSet)
router.register(r'student_activity-logs', StudentActivityLogViewSet)
router.register(r'course_progress', CourseProgressViewSet)
router.register(r'wishlists', WishlistViewSet)

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


    #path('carts/', CartListCreateView.as_view(), name='cart-list-create'),
    path('carts/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),
    path('carts/user/', get_or_create_cart, name='get-or-create-cart'),
    path('cart_items/add/', add_item_to_cart, name='add-item-to-cart'),
    path('cart_items/', get_cart_items, name='get-cart-items'),

    path('', include(router.urls))
]