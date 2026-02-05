from django.db import models

from users.models import User

# Create your models here.
class Usage(models.Model):
    messages_used = models.IntegerField()
    messages_limit = models.IntegerField()
    reset_date = models.DateTimeField()
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    
    class Meta:
        ordering=('id',)