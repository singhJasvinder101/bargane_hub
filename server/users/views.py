from django.contrib.auth import authenticate, logout
from django.conf import settings
from django.middleware import csrf
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions
from rest_framework_simplejwt import tokens, exceptions as jwt_exceptions
from users import serializers, models
from rest_framework.permissions import AllowAny

def get_user_tokens(user):
    access = tokens.AccessToken.for_user(user)
    return {
        'access_token': str(access),
    }

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def loginView(request):
    serializer = serializers.LoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    email = serializer.validated_data["email"]
    password = serializer.validated_data["password"]
    
    user = authenticate(email=email, password=password)
    
    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response()    
        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens["access_token"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        
        res.data = tokens
        print(csrf.get_token(request))
        res["X-CSRFToken"] = csrf.get_token(request)
        return res  
    else:
        raise rest_exceptions.AuthenticationFailed("Invalid Credentials")
    

@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([AllowAny])
def getToken(request):
    print(request.user)
    try:
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        print(access_token)
        if access_token:
            res = response.Response()
            res.data = {
                "access_token": access_token
            }
            return res
        else:
            raise rest_exceptions.AuthenticationFailed("No access token found in cookies")
    except Exception as e:
        raise rest_exceptions.APIException(f"Get token failed: {e}")

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([])
def registerView(request):
    serializer = serializers.RegisterSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    
    user = serializer.save()
    
    if user is not None:
        tokens = get_user_tokens(user)
        res = response.Response()    
        res.set_cookie(
            key=settings.SIMPLE_JWT['AUTH_COOKIE'],
            value=tokens["access_token"],
            expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
            secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
            httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
            samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
        )
        
        res.data = tokens
        res["X-CSRFToken"] = csrf.get_token(request)
        return res
    return rest_exceptions.AuthenticationFailed("Invalid credentials!")

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def logoutView(request):
    try:
        access_token = request.COOKIES.get(settings.SIMPLE_JWT['AUTH_COOKIE'])
        if access_token:
            res = response.Response()
            res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            res.delete_cookie("X-CSRFToken")
            res.delete_cookie("csrftoken")
            res["X-CSRFToken"] = None
            return res
        else:
            raise rest_exceptions.AuthenticationFailed("No access token found in cookies")
    except Exception as e:
        raise rest_exceptions.APIException(f"Logout failed: {e}")

@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:
        user = models.Account.objects.get(id=request.user.id)
    except models.Account.DoesNotExist:
        return response.Response(status_code=403)

    serializer = serializers.AccountSerializer(user)
    return response.Response(serializer.data)

@rest_decorators.api_view(["POST"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def add_points(request):
    user = models.Account.objects.get(id=request.user.id)
    points = request.data.get('points')
    user.points += points
    user.save()
    return response.Response({'message': 'Points added successfully'}, status=200)
