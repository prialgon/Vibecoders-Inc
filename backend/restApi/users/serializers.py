from rest_framework import serializers
import re

from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password2')
        extra_kwargs = {
            "password": {"write_only": True},
        }
        
    def validate_username(self, value):
        user = self.instance
        if User.objects.filter(username=value).exclude(pk=user.pk if user else None).exists():
            raise serializers.ValidationError("Username already in use.")
        return value
        
    def validate_email(self, value):
        user = self.instance
        
        if User.objects.filter(email=value).exclude(pk=user.pk if user else None).exists():
            raise serializers.ValidationError("Email already in use.")
        
        pattern = re.compile(r"^([^@]+)@([A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*)\.(com)$")
        
        if not pattern.match(value):
            raise serializers.ValidationError(
                {"email": "Email must have the form: admin@vibecoders.com"}
            )
        
        return value
    
    def validate_password(self, value):
        if len(value) <= 8:
            raise serializers.ValidationError(
                {"password": "Minimum length is more than 8 characters."}
            )
        
        if not any(character == character.upper() for character in value):
            raise serializers.ValidationError(
                {"password": "At least one character must be uppercase."}
            )
        
        if not any(character == character.lower() for character in value):
            raise serializers.ValidationError(
                {"password": "At least one character must be lowercase."}
            )
        
        return value
    
    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

    def create(self, validated_data):
        validated_data.pop("password2")
        return User.objects.create_user(**validated_data)
    
    
    
    