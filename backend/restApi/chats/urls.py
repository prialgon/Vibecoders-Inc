from django.urls import include, path

from .views import ChatDetailAPIView, ChatListView, ChatSearchView

app_name = "chats"
urlpatterns = [
    path("", ChatListView.as_view(), name="chat-list-create"),
    path(
        "<int:pk>/",
        ChatDetailAPIView.as_view(),
        name="chat-detail",
    ),
    path("search/", ChatSearchView.as_view(), name="chat-search"),
]
