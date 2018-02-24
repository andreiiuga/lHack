# App
from document.api import viewsets
from document.api import views

# rest_framework
from rest_framework import routers

router = routers.DefaultRouter()

router.register(
    r'document',
    viewsets.DocumentViewSet,
    base_name='document'
)

router.register(
    r'upload',
    views.FileUploadView,
    base_name='upload'
)
