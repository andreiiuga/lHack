# App
from document.models import Document

# rest_framework
from rest_framework import serializers


class DocumentSerializer(serializers.ModelSerializer):
    # email = serializers.CharField(
    #     max_length=None, min_length=None,
    #     allow_blank=True, trim_whitespace=True
    # )

    class Meta:
        model = Document
        fields = '__all__'
