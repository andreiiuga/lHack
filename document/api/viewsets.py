import logging

# App
from document.models import Document, DocumentTag
from document.api import serializers

# rest_framework
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response

logger = logging.getLogger(__name__)

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.DocumentSerializer
    queryset = Document.objects.all()


class DocumentTagViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.DocumentTagSerializer
    queryset = DocumentTag.objects.filter().all()
    http_method_names = ['get', 'post', 'delete', 'put']
