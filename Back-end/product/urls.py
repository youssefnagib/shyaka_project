from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_all_products, name='products'),
    path('products/men/', views.get_men_products, name='get_man_products'),
    path('products/women/', views.get_women_products, name='get_woman_products'),
    path('products/<int:pk>/', views.get_product_by_id, name='get_by_product_id'),
    # For Admin 
    path('products/new/', views.new_product, name='new_product'),
    path('products/update/<int:pk>/', views.update_product, name='update_product'),
    path('products/delete/<int:pk>/', views.delete_product, name='delete_product')
]