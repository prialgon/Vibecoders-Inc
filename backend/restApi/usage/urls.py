from django.urls import path
from .views import UsageListView

app_name = "usage"
urlpatterns = [
    path('', UsageListView.as_view(), name='usage-list'),
]