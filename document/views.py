from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

class FileUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, format=None):
        # to access files
        print request.FILES
        # to access data
        print request.data
        return Response({'received data': request.data})
