from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.views import APIView

from document.process import process_doc, fetch_results

class FileUploadView(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, format=None):
        # to access data
        file_obj = request.data['image'].read().decode('utf-8')
        sents, highlights = process_doc(file_obj)
        return Response({'sentences': sents, 'highlights': highlights})


class QueryView(APIView):
    def post(self, request, format=None):
        q = request.data['query']
        results = fetch_results(q)
        return Response({'results': results})
