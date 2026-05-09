from datetime import timedelta

from django.db.models import Q

from ai.llm_service import call_llm
from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from usage.models import Usage

from .models import Chat, ChatMessage
from .serializers import (
    ChatDetailSerializer,
    ChatListCreateSerializer,
    ChatMessageCreateSerializer,
    ChatMessageSerializer,
    ChatPatchSerializer,
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


class ChatSearchView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatListCreateSerializer

    def get_queryset(self):
        user_id = self.request.user
        if "content" in self.request.query_params:
            text = self.request.query_params.get("content")

            results = []

            return Chat.objects.filter(
                Q(user_id=user_id)
                & (Q(title__icontains=text) | Q(messages__content__icontains=text))
            ).distinct()

        else:
            return Chat.objects.filter(user_id=user_id)


class ChatDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatDetailSerializer
    http_method_names = ["get", "post", "patch", "delete"]

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
        # serializer.save(chat_id=chat)
        usage.save()

        ChatMessage.objects.create(
            chat_id=chat, role="user", content=serializer.validated_data["content"]
        )

        history = [
            {"role": msg.role, "content": msg.content}
            for msg in ChatMessage.objects.filter(chat_id=chat).order_by("id")
        ]
        llm_response = call_llm(history)

        msg = ChatMessage.objects.create(
            chat_id=chat, role="system", content=llm_response
        )
        serializer_llm = ChatMessageSerializer(msg)
        return Response(serializer_llm.data, status=201)

    def patch(self, request, *args, **kwargs):
        chat = self.get_object()
        serializer = ChatPatchSerializer(chat, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
