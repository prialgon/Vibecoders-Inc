from rest_framework import serializers
from .models import Usage
from django.utils import timezone

class UsageListCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usage
        fields = '__all__'
        
    def validate_reset_date(self, value):
        if value <= timezone.now():
            raise serializers.ValidationError("Reset date must be greater than now.")
        return value