from django.db import models
from django.utils import timezone
from datetime import timedelta
from users.models import User

# Create your models here.
class Usage(models.Model):
    messages_used = models.IntegerField()
    messages_limit = models.IntegerField()
    reset_date = models.DateTimeField(default=timezone.now() + timedelta(days=30))
    user_id = models.OneToOneField(User, related_name="usage", on_delete=models.CASCADE)
    
    class Meta:
        ordering=('id',)