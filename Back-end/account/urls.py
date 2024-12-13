from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register, name='register'),
    path('userinfo/', views.current_user, name='userInfo'),
    path('userinfo/update/', views.update_user, name='update_userInfo'),
    path('forget_password/', views.forget_pass, name='forget_password'),
    path('reset_password/<str:token>', views.reset_pass, name='reset_password'),
]