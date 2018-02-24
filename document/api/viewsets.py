import logging

# App
from document.models import Document
from document.api import serializers

# rest_framework
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser

logger = logging.getLogger(__name__)


class DocumentViewSet(viewsets.ModelViewSet):

    queryset = Document.objects.all()
    serializer_class = serializers.DocumentSerializer
    parser_classes = (MultiPartParser, FormParser,)

    def perform_create(self, serializer):
        print self.request.data.get('content')
        serializer.save(owner=self.request.user,
                        datafile=self.request.data.get('content'))
