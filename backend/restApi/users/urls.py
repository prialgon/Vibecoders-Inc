from django.urls import path
from .views import (
    UserRegisterView,
    UserProfileView,
    UserPasswordUpdateView,
    LogoutView,
)

urlpatterns = [
    path("register/", UserRegisterView.as_view(), name="user-register"),
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path("profile/password/", UserPasswordUpdateView.as_view(), name="user-change-password"),
    path("logout/", LogoutView.as_view(), name="user-logout"),
]
