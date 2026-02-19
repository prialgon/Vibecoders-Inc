from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Chat, ChatMessage
from .serializers import (
    ChatDetailSerializer,
    ChatListCreateSerializer,
    ChatMessageCreateSerializer,
)

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
        serializer.is_valid(raise_exception=True)
        serializer.save(chat_id=chat)
        return Response(serializer.data, status=201)
