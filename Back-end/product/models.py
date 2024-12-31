from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator


class Category(models.TextChoices):
    Pants = 'pants'
    Jackets = 'jackets'
    Tops = 'tops'
    Hoodies = 'hoodies'
    Dress = 'dress'



class Gender(models.TextChoices):
    MALE = 'male'
    FEMALE = 'female'
    UNISEX = 'unisex'


class Product(models.Model):
    name = models.CharField(max_length=200, default="", blank=False)
    description = models.TextField(max_length=1000, default="", blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, validators=[MinValueValidator(0)])
    category = models.CharField(max_length=40, choices=Category.choices)
    stock = models.IntegerField(default=0)
    gender = models.CharField(max_length=10, choices=Gender.choices, default=Gender.UNISEX)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)  # Image field
    createdAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name
