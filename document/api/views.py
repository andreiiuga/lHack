from rest_framework import views
from rest_framework.response import Response
from rest_framework.parsers import FileUploadParser


class FileUploadView(views.APIView):
    parser_classes = (FileUploadParser,)

    def post(self, request, filename, format=None):
        file_obj = request.FILES['file']
        print file_obj
        return Response(status=204)
