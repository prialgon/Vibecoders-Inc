from rest_framework import serializers
from django.core.exceptions import ValidationError
import re

from .models import User
from .validators import password_validation


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
        value = password_validation(value)
        return value
    
    def validate(self, attrs):
        if attrs["password"] != attrs["password2"]:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

    def create(self, validated_data):
        validated_data.pop("password2")
        return User.objects.create_user(**validated_data)
    
class UserUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("username", "email")
        
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    
    def validate(self, attrs):
        user = self.context['request'].user

        if not user.check_password(attrs['old_password']):
            raise serializers.ValidationError(
                {"old_password": "Wrong password."}
            )

        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Passwords do not match."}
            )

        try:
            password_validation(attrs['password'])
        except ValidationError as e:
            raise serializers.ValidationError(
                {"password": e.messages}
            )

        return attrs
    
    