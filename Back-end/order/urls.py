from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('orders/', views.get_orders, name='get_orders'),
    path('orders/new/', views.new_order, name='new_order'),
    path('orders/<str:pk>/', views.get_order, name='get_order'),
    path('orders/<str:pk>/update/', views.update_order, name='update_order'),
    path('orders/<str:pk>/delete/', views.delete_order, name='delete_order'),
]