from django.db import models
from django.contrib.auth.models import User
from product.models import Product


class Size(models.TextChoices):
    SMALL = 'S', 'Small'
    MEDIUM = 'M', 'Medium'
    LARGE = 'L', 'Large'
    XLARGE = 'XL', 'X-Large'


class Color(models.TextChoices):
    GRAY = 'Gray'
    WHITE = 'White'
    BLACK = 'Black'
    CAFE = 'CAFE'

class OrderStatus(models.TextChoices):
    PROCESSING = "Processing"
    SHIPPED = "Shipped"
    DELIVERED = "Delivered"
    CANCELLED = "Cancelled"

class PaymentStatus(models.TextChoices):
    PAID = 'Paid'
    UNPAID = 'Unpaid'

class PaymentMethod(models.TextChoices):
    COD = 'COD'
    CARD = 'Card'
    

class Order(models.Model):
    city = models.CharField(max_length=400, default="", blank=False)
    zip_code = models.CharField(max_length=100, default="", blank=False)
    address = models.CharField(max_length=500, default="",blank=False)
    country = models.CharField(max_length=100, default="", blank=False)
    phone_number = models.CharField(max_length=100, default="", blank=False)
    total_amount = models.IntegerField(default=0)
    payment_status = models.CharField(max_length=30, choices=PaymentStatus.choices, default=PaymentStatus.UNPAID)
    payment_method = models.CharField(max_length=30, choices=PaymentMethod.choices, default=PaymentMethod.COD)
    status = models.CharField(max_length=60, choices=OrderStatus.choices, default=OrderStatus.PROCESSING)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return str(self.id)




class OrderItem(models.Model):
    order = models.ForeignKey(Order, null=True, on_delete=models.CASCADE, related_name='orderitem')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.PositiveIntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=200, default="", blank=False)
    color = models.CharField(max_length=20, choices=Color.choices, default=Color.BLACK)
    size = models.CharField(max_length=2, choices=Size.choices, default=Size.MEDIUM)
    
    def __str__(self):
        return self.name
    