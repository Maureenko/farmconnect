from django.urls import path
from .authentication import CustomAuthToken
from .views import UserRegistrationView, UserProfileView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', CustomAuthToken.as_view(), name='login'),
    path('profile/', UserProfileView.as_view(), name='profile'),
]