from rest_framework import serializers

from .models import Chat, ChatMessage


class ChatListCreateSerializer(serializers.ModelSerializer):
    created_at = serializers.DateTimeField(format="%Y-%m-%dT%H:%M:%SZ", read_only=True)

    class Meta:
        model = Chat
        fields = ["id", "title", "created_at", "user_id"]
        read_only_fields = ["user_id"]


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"


class ChatDetailSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ["messages"]


class ChatMessageCreateSerializer(serializers.ModelSerializer):
    role = serializers.ReadOnlyField()

    class Meta:
        model = ChatMessage
        fields = ["role", "content"]

    def create(self, validated_data):
        validated_data["role"] = "user"  # fuerza siempre "user"
        return super().create(validated_data)
