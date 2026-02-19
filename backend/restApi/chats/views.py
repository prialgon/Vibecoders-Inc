from django.shortcuts import render
from rest_framework import generics
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
    queryset = Chat.objects.all()
    serializer_class = ChatListCreateSerializer


class ChatDetailAPIView(generics.RetrieveDestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatDetailSerializer

    def post(self, request, *args, **kwargs):
        chat = self.get_object()
        serializer = ChatMessageCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(chat_id=chat)
        return Response(serializer.data, status=201)
