from django.shortcuts import render
from rest_framework import generics

from .models import Chat, ChatMessage
from .serializers import ChatDetailSerializer, ChatListCreateSerializer

# Create your views here.


class ChatListView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatListCreateSerializer


class ChatMessagesListView(generics.ListCreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatListView
