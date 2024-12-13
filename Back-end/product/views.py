from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .serializers import ProductSerializer
from rest_framework import status
from .models import Product, Review
from .filters import ProductFilter
from rest_framework.pagination import PageNumberPagination
from django.db.models import Avg

@api_view(["GET"])
def get_all_products(request):
    filterset = ProductFilter(request.GET,
                              queryset=Product.objects.all().order_by('id'))
    page_size = 4
    count = filterset.qs.count()
    paginator = PageNumberPagination()
    paginator.page_size = page_size



    queryset = paginator.paginate_queryset(filterset.qs, request)
    # product = Product.objects.all()
    # serializer = ProductSerializer(product, many=True)
    serializer = ProductSerializer(queryset, many=True)
    return Response({'products': serializer.data, 'per page': page_size, 'count': count})


@api_view(["GET"])
def get_women_products(request):
    filterset = ProductFilter(request.GET, queryset=Product.objects.filter(gender='Female').order_by('id'))
    page_size = 4
    count = filterset.qs.count()
    paginator = PageNumberPagination()
    paginator.page_size = page_size

    queryset = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(queryset, many=True)
    return Response({'products': serializer.data, 'per_page': page_size, 'count': count})


@api_view(["GET"])
def get_men_products(request):
    filterset = ProductFilter(request.GET, queryset=Product.objects.filter(gender='Male').order_by('id'))
    page_size = 4
    count = filterset.qs.count()
    paginator = PageNumberPagination()
    paginator.page_size = page_size

    queryset = paginator.paginate_queryset(filterset.qs, request)
    serializer = ProductSerializer(queryset, many=True)
    return Response({'products': serializer.data, 'per_page': page_size, 'count': count})


@api_view(["GET"])
def get_product_by_id(request, pk):
    product = get_object_or_404(Product, id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response({'products':serializer.data})


@api_view(["POST"])
@permission_classes([IsAuthenticated, IsAdminUser])
def new_product(request):
    data = request.data
    serializer = ProductSerializer(data = data)
    
    if serializer.is_valid():
        product = Product.objects.create(**data, user=request.user)
        res = ProductSerializer(product, many=False)

        return Response({'products':res.data})
    else:
        return Response(serializer.errors)


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
    product.brand = request.data['brand']
    product.category = request.data['category']
    product.rating = request.data['rating']
    product.stock = request.data['stock']
    
    product.save()
    serializer = ProductSerializer(product, many=False)
    return Response({'product': serializer.data})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAdminUser])
def delete_product(request, pk):
    product = get_object_or_404(Product, id=pk)
    
    if product.user != request.user:
        return Response({'error': 'Unauthorized access'},
                        status=status.HTTP_403_FORBIDDEN)

    product.delete()
    return Response({'details': "proudct Deleted successfully"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_review(request, pk):
    product = get_object_or_404(Product, id=pk)
    user = request.user
    data = request.data
    review = product.reviews.filter(user=user)


    if data['rating'] <=0 or data['rating'] >10:
        return Response({'error': 'Rating must be greater than 0 and smaller than 10'},
                        status=status.HTTP_400_BAD_REQUEST)
    elif review.exists():
        new_review = {'rating':data['rating'], "comment":data['comment'] }
        review.update(**new_review)

        rating = product.reviews.aggregate(avg_rating = Avg('rating'))
        product.rating = rating['avg_rating']
        product.save()
        
        return Response({'details': 'Review updated successfully'})
    
    else:
        Review.objects.create(
            user=user,
            product=product,
            rating=data['rating'],
            comment=data['comment']
        )
        rating = product.reviews.aggregate(avg_rating = Avg('rating'))
        product.rating = rating['avg_rating']
        product.save()
        return Response({'details': 'Review created successfully'})

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_reviews(request, pk):
    user = request.user
    product = get_object_or_404(Product, id=pk)
    review = product.reviews.filter(user=user)
    
    if review.exists():
        review.delete()
        rating = product.reviews.aggregate(avg_rating = Avg('rating'))

        if rating['avg_rating'] is None:
            product.rating = 0
        else:
            product.rating = rating['avg_rating']

        product.save()

        return Response({'details': 'Review deleted'})
    else:
        return Response({'error': 'No review found for this user'},
                        status=status.HTTP_400_BAD_REQUEST)

