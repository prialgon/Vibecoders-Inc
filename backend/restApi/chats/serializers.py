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
        fields = ["role", "content"]


class ChatDetailSerializer(serializers.ModelSerializer):
    messages = ChatMessageSerializer(many=True, read_only=True)

    class Meta:
        model = Chat
        fields = ["title", "messages"]


class ChatMessageCreateSerializer(serializers.ModelSerializer):
    role = serializers.ReadOnlyField()

    class Meta:
        model = ChatMessage
        fields = ["role", "content"]


class ChatPatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ["title"]

    def validate_title(self, value):
        if not value or not value.strip():
            raise serializers.ValidationError("The title cannot be empty.")
        if len(value) > 60:
            raise serializers.ValidationError(
                "The title is too long, max is 60 characters."
            )

        return value
