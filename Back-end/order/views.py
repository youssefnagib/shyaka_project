from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from account import models

from .models import Order, OrderItem
from product.models import Product
from .serializers import OrderSerializer, OrderItemSerializer


# Get all orders
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders(request):
    order = Order.objects.all()
    serializer = OrderSerializer(order, many=True)
    return Response({'orders': serializer.data})


# Get all orders of user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_orders_user(request):
    user = request.user
    order = Order.objects.filter(user=user)
    serializer = OrderSerializer(order, many=True)
    return Response({'orders': serializer.data})



# Get order of user
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order_user(request, pk):
    user = request.user
    try:
        order = Order.objects.get(pk=pk, user=user)
    except Order.DoesNotExist:
        return Response(
            {'error': 'Order not found or does not belong to the user'},
            status=status.HTTP_404_NOT_FOUND
        )
    serializer = OrderSerializer(order, many=False)
    return Response({'order': serializer.data})



# Create new order
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_order(request, pk):
    order = get_object_or_404(Order, id=pk)
    serializer = OrderSerializer(order, many=False)
    return Response({'order': serializer.data})



# Update order status and payment details
@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_order(request, pk):
    order = get_object_or_404(Order, id=pk)
    order.status = request.data['status']
    order.payment_status = request.data['payment_status']
    order.payment_method = request.data['payment_method']
    order.save()
    serializer = OrderSerializer(order, many=False)
    return Response({"order":serializer.data})



# Delete order
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_order(request, pk):
    order = get_object_or_404(Order, id=pk)
    order.delete()
    return Response({'details': 'Order deleted successfully'})



# Create new order with order items
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def new_order(request):
    user = request.user
    data = request.data
    order_items = data['order_items']
    
    if not order_items or len(order_items) == 0:
        return Response({'details': 'Order items are required'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Calculate the total amount for the order
    total_amount = sum(item['price'] * item['quantity'] for item in order_items)
    
    # Create the order
    order = Order.objects.create(
        user=user,
        city=data['city'],
        zip_code=data['zip_code'],
        address=data['address'],
        country=data['country'],
        phone_number=data['phone_number'],
        total_amount=total_amount
    )
    
    # Create the order items
    for i in order_items:
        try:
            product = Product.objects.get(id=i['product'])
        except Product.DoesNotExist:
            return Response({'details': f"Product with id {i['product']} does not exist"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        item = OrderItem.objects.create(
            order=order,
            product=product,
            name=product.name,
            quantity=i['quantity'],
            price=i['price'],
            color=i['color'],
            size=i['size']
        )
        
        # Update the product stock
        if product.stock < item.quantity:
            return Response({'details': f"Not enough stock for product {product.name}"}, 
                            status=status.HTTP_400_BAD_REQUEST)
        
        product.stock -= item.quantity
        product.save()
        
    
    # Serialize and return the order after all items are added
    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
