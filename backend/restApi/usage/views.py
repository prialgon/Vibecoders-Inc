from rest_framework import generics

from .serializers import UsageSerializer
from .models import Usage

from rest_framework.permissions import IsAuthenticated


# Create your views here.
class UsageListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UsageSerializer

    def get_queryset(self):
        user_id = self.request.user
        queryset = Usage.objects.filter(user_id=user_id)
        return queryset
