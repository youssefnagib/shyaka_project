from django.shortcuts import render
from rest_framework.decorators import api_view
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializer import UserSerializer, SignUpSerializer





# Make register view for new users
@api_view(['POST'])
def register(request):
    data = request.data
    user = SignUpSerializer(data = data)

    if user.is_valid():
        if not User.objects.filter(username=data['username']).exists():
            if not User.objects.filter(email=data['email']).exists():
                user = User.objects.create(
                    first_name =data['first_name'],
                    last_name =data.get('last_name', ''),
                    username = data['username'],
                    email = data['email'],
                    password = make_password(data['password']),
                    )
                return Response(
                    {'details': 'Your account has been registered successfully!'},
                                status=status.HTTP_201_CREATED
                                )
            else:
                return Response(
                    {'details': 'Email already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                    )
        else:
            return Response(
                {'details': 'username already exists'},
                status=status.HTTP_400_BAD_REQUEST
                )

    else:
        return Response(
            user.errors,
            status=status.HTTP_400_BAD_REQUEST
            )