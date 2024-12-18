from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MinValueValidator

# class Size(models.TextChoices):
#     SMALL = 'S', 'Small'
#     MEDIUM = 'M', 'Medium'
#     LARGE = 'L', 'Large'
#     XLARGE = 'XL', 'Extra Large'


class Category(models.TextChoices):
    Pants = 'pants'
    Jackets = 'jackets'
    Tops = 'tops'


# class Color(models.TextChoices):
#     GRAY = 'gray'
#     WHITE = 'white'
#     BLACK = 'Black'
#     CAFE = 'CAFE'

class Gender(models.TextChoices):
    MALE = 'Male'
    FEMALE = 'Female'
    UNISEX = 'Unisex'


class Product(models.Model):
    name = models.CharField(max_length=200, default="", blank=False)
    description = models.TextField(max_length=1000, default="", blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00, validators=[MinValueValidator(0)])
    # size = models.CharField( max_length=2, choices=Size.choices, default=Size.MEDIUM)
    # color = models.CharField(max_length=20, choices=Color.choices, default=Color.BLACK)
    category = models.CharField(max_length=40, choices=Category.choices)
    # rating = models.DecimalField(max_digits=3, decimal_places=2, default=0)
    stock = models.IntegerField(default=0)
    gender = models.CharField(max_length=10, choices=Gender.choices, default=Gender.UNISEX)
    image = models.ImageField(upload_to='product_images/', null=True, blank=True)  # Image field
    createdAt = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.name
    
    
# class Review(models.Model):
#     product = models.ForeignKey(Product, null=True,
#                                 on_delete=models.CASCADE, related_name='reviews')
#     user = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
#     rating = models.IntegerField(default=0)
#     comment = models.TextField(max_length=1000, default="", blank=False)
#     createdAt = models.DateTimeField(auto_now_add=True)

    # def __str__(self):
    #     return self.comment