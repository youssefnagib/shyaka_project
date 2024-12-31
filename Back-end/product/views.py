from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import ProductSerializer
from rest_framework import status
from .models import Product
from .filters import ProductFilter
from rest_framework.pagination import PageNumberPagination
from django.db.models import Avg
from django.db.models import Q


# Get all products
@api_view(["GET"])
def get_all_products(request):
    filterset = ProductFilter(request.GET,
                              queryset=Product.objects.all().order_by('id'))
    page_size = 20
    count = filterset.qs.count()
    paginator = PageNumberPagination()
    paginator.page_size = page_size



    queryset = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(queryset, many=True)
    return Response({'products': serializer.data, 'per page': page_size, 'count': count})


# Get all women products
@api_view(["GET"])
def get_women_products(request):
    filterset = ProductFilter(request.GET, queryset=Product.objects.filter(Q(gender='Female') | Q(gender='Unisex')).order_by('id'))
    page_size = 20
    count = filterset.qs.count()
    paginator = PageNumberPagination()
    paginator.page_size = page_size

    queryset = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(queryset, many=True)
    return Response({'products': serializer.data, 'per_page': page_size, 'count': count})



# Get all men products
@api_view(["GET"])
def get_men_products(request):
    filterset = ProductFilter(request.GET, queryset=Product.objects.filter( Q(gender='Male') | Q(gender='Unisex')).order_by('id'))
    page_size = 20
    count = filterset.qs.count()
    paginator = PageNumberPagination()
    paginator.page_size = page_size

    queryset = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(queryset, many=True)
    return Response({'products': serializer.data, 'per_page': page_size, 'count': count})


# Get product by ID
@api_view(["GET"])
def get_product_by_id(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response({'products':serializer.data})


# new product
@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminUser])
def new_product(request):
    data = request.data
    data = {key: value.strip() if isinstance(value, str) else value for key, value in data.items()}
    
    serializer = ProductSerializer(data=data)
    
    if serializer.is_valid():
        product = Product.objects.create(**serializer.validated_data, user=request.user)
        
        res = ProductSerializer(product)
        return Response({'product': res.data}, status=201)
    else:
        return Response({'errors': serializer.errors}, status=400)


# update product
@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    
    if product.user != request.user:
        return Response({'error': 'Unauthorized access'},
                        status=status.HTTP_403_FORBIDDEN)
    
    product.name = request.data['name']
    product.description = request.data['description']
    product.price = request.data['price']
    product.category = request.data['category']
    product.stock = request.data['stock']
    product.gender = request.data['gender']
    if 'image' in request.FILES:
        product.image = request.FILES['image']
    
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response({'product': serializer.data})


# delete product
@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    
    if product.user != request.user:
        return Response({'error': 'Unauthorized access'},
                        status=status.HTTP_403_FORBIDDEN)

    product.delete()
    return Response({'details': "proudct Deleted successfully"}, status=status.HTTP_200_OK)
