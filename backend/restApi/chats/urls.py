from django.urls import include, path

from .views import ChatListView, ChatMessagesListView

app_name = "chats"
urlpatterns = [
    path("", ChatListView.as_view(), name="chat-list-create"),
    path(
        "<int:pk>/",
        ChatMessagesListView.as_view(),
        name="chat-detail",
    ),
]
