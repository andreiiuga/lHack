import logging

# App
from document.models import Document, DocumentTag
from document.api import serializers
from document.tasks import sleep_notify, send_email

# rest_framework
from rest_framework import viewsets
from rest_framework.decorators import list_route
from rest_framework.response import Response

logger = logging.getLogger(__name__)

class DocumentViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.DocumentSerializer
    queryset = Document.objects.all()

    @list_route()
    def notify_action(self, request):
        d = Document.objects.none()
        sleep_notify.delay(request.session.session_key)
        return Response()

    @list_route(methods=['get', 'post'])
    def ping(self, request):
        email = request.POST.get('email')
        logger.info(email)
        logger.info(request.POST)
        sleep_notify.delay(request.session.session_key, message=email)
        send_email.delay(email)
        return Response({"success": True})


class DocumentTagViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.DocumentTagSerializer
    queryset = DocumentTag.objects.filter().all()
    http_method_names = ['get', 'post', 'delete', 'put']
