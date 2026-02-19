from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from datetime import timedelta

from .models import Chat, ChatMessage
from .serializers import (
    ChatDetailSerializer,
    ChatListCreateSerializer,
    ChatMessageCreateSerializer,
)
from usage.models import Usage

# Create your views here.


class ChatListView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatListCreateSerializer

    def get_queryset(self):
        user_id = self.request.user
        queryset = Chat.objects.filter(user_id=user_id)
        return queryset

    def perform_create(self, serializer):
        serializer.save(user_id=self.request.user)


class ChatDetailAPIView(generics.RetrieveDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatDetailSerializer

    def get_queryset(self):
        user_id = self.request.user
        queryset = Chat.objects.filter(user_id=user_id)
        return queryset

    def post(self, request, *args, **kwargs):
        chat = self.get_object()
        serializer = ChatMessageCreateSerializer(data=request.data)
        
        usage: Usage = self.request.user.usage
        
        if usage.messages_used >= usage.messages_limit:
            if usage.reset_date > timezone.now():
                return Response(
                    f"Messages limit ({usage.messages_limit}) has been reached. Message limit will be reset on {usage.reset_date}.",
                    status=403,
                )
            else:
                usage.messages_used = 0
                usage.reset_date = timezone.now() + timedelta(days=30)
                
        usage.messages_used += 1
        serializer.is_valid(raise_exception=True)
        serializer.save(chat_id=chat)
        usage.save()
        return Response(serializer.data, status=201)
        
        

