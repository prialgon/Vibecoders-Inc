from django.urls import path, include
from .views importChatListView,

app_name="chats"
urlpatterns = [
    path('', ChatListView.as_view(), name='chat-list-create')
]
