from rest_framework import generics

from .serializers import UsageSerializer
from .models import Usage

# Create your views here.
class UsageListView(generics.ListAPIView):
    serializer_class = UsageSerializer
    queryset = Usage.objects.all()