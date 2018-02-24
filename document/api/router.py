# App
from document.api import viewsets

# rest_framework
from rest_framework import routers

router = routers.DefaultRouter()

router.register(
    r'document',
    viewsets.DocumentViewSet,
    base_name='document'
)
