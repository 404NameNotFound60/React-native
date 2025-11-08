from django.urls import path
from .views import Login, Register, ForgotPassword, UpdateProfile
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/',Login.as_view()),
    path('register/',Register.as_view()),
    path('refresh-token/',TokenRefreshView.as_view()),
    path('profile/<int:id>/',UpdateProfile.as_view()),
    path('forgot-password/',ForgotPassword.as_view())
]