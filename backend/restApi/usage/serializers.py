from rest_framework import serializers
from .models import Usage

class UsageSerializer(serializers.ModelSerializer):
    tokens_used = serializers.SerializerMethodField(read_only=True)
    tokens_limit = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = Usage
        fields = '__all__'
        
    def get_tokens_used(self, obj):
        return int(100 * obj.messages_used)
    
    def get_tokens_limit(self, obj):
        return int(100 * obj.messages_limit)
        
