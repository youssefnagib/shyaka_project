from datetime import datetime, timedelta
from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password
from rest_framework import status
from .serializer import UserSerializer, SignUpSerializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.utils.crypto import get_random_string
from django.core.mail import send_mail
from rest_framework_simplejwt.views import TokenObtainPairView



# login
class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
             return Response({"detail": "Invalid username or password"}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(serializer.validated_data, status=status.HTTP_200_OK)



# register
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

# get current user
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = UserSerializer(request.user, many=False)
    if request.user.groups.filter(name='admin').exists():
        role = 'Admin'
    elif request.user.groups.filter(name='customer').exists():
        role = 'Customer'
    else:
        role = 'Unknown'
    response_data = {**user.data, 'role': role}
    return Response(response_data)


# update user for admin but not used yet
@api_view(['PUT'])
@permission_classes([IsAuthenticated, IsAdminUser])
def update_user(request):
    user = request.user
    data = request.data
    user.first_name = data['first_name']
    user.last_name = data['last_name']
    user.email = data['email']
    user.username = data['username']
    
    if 'password' in data != "":
        user.password = make_password(data['password'])
    user.save()
    serialzer = UserSerializer(user, many=False)
    return Response(serialzer.data)


def get_current_host(request):
    """
    This function retrieves the current host URL based on the request.

    Parameters:
    request (HttpRequest): The request object containing information about the client.

    Returns:
    str: The current host URL in the format 'protocol://host/'.
    """
    protocol = request.is_secure() and 'https' or 'http'
    host = request.get_host()
    return f'{protocol}://{host}/'



# for user if forget password but still not used in website
@api_view(['POST'])
def forget_pass(request):
    data = request.data
    user = get_object_or_404(User, email=data['email'])
    token = get_random_string(40)
    expire_date = datetime.now() + timedelta(minutes=30)
    user.profile.reset_password_token = token
    user.profile.reset_password_expire = expire_date
    user.profile.save()
    host = get_current_host(request)
    link = f"{host}api/reset_password/{token}"
    body = f"Your password reset link is : {link}"
    send_mail(
        "Password reset link",
        body,
        "nagib@yahoo.com",
        [data['email']]
    )
    return Response({'details': 'Password reset sent to {email}'.format(email=data['email'])})


# for user if want to reset password but not used
@api_view(['POST'])
def reset_pass(request, token):
    data = request.data
    user = get_object_or_404(User, profile__reset_password_token = token)
    
    if user.profile.reset_password_expire.replace(tzinfo=None) < datetime.now():
        return Response({'error': 'Token expired. Please request a new password reset link.'})
    if data['password'] != data['confirmPassword']:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    
    user.password = make_password(data['password'])
    user.profile.reset_password_token = ""
    user.profile.reset_password_expire = None
    user.profile.save()
    user.save()
    return Response({'details': 'Password reset done.'}, status=status.HTTP_200_OK)