from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.conf import settings
from scrape.serializers import ScrapeSerializer 

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={"input_type": "password"})
    
    class Meta:
        # get_user_model return the user model that is active in this project
        model = get_user_model()
        fields = ['email', 'username', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
            'password2': {'write_only': True},
        }
        
    def save(self):
        user = get_user_model()(
            email=self.validated_data['email'],
            username=self.validated_data['username'],
        )
        
        password = self.validated_data["password"]
        password2 = self.validated_data["password2"]
        
        if password != password2:
            raise serializers.ValidationError(
                {"password": "Passwords do not match!"})
        
        user.set_password(password)
        user.save()
        return user
    
    
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={"input_type": "password"}, write_only=True)      
    
class AccountSerializer(serializers.ModelSerializer):
    tracks = ScrapeSerializer(many=True, read_only=True)
    class Meta:
        model = get_user_model()
        fields = ("username", "email", "points", 'tracks')        

