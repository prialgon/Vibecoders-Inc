from django.db import models
from users.models import User


# Create your models here.
class Chat(models.Model):
    title = models.CharField()
    created_at = models.DateTimeField(auto_now_add=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ("id",)


class ChatMessage(models.Model):
    ROLE_CHOICES = [("User", "user"), ("System", "system")]

    role = models.CharField(choices=ROLE_CHOICES)
    content = models.TextField()
    chat_id = models.ForeignKey(Chat, on_delete=models.CASCADE)

    class Meta:
        ordering = ("id",)
