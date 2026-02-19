from datetime import timedelta

from django.db import models
from django.utils import timezone
from users.models import User

def default_reset_date():
    return timezone.now() + timedelta(days=30)

# Create your models here.
class Usage(models.Model):
    messages_used = models.IntegerField(default=0)
    messages_limit = models.IntegerField(default=100)
    reset_date = models.DateTimeField(default=default_reset_date)
    user_id = models.OneToOneField(
        User,
        related_name="usage",
        on_delete=models.CASCADE,
        primary_key=True,
    )

    class Meta:
        ordering = ("user_id",)
