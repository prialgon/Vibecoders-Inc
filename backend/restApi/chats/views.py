from django.shortcuts import render
from rest_framework import generics

from .models import Chat, ChatMessage

# Create your views here.


class ChatListView(generics.ListAPIView):
    queryset = Chat.objects.all()


class ChatMessagesListView(generics.ListAPIView):
    queryset = ChatMessage.objects.all()
