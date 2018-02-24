from django.contrib import admin

# Register your models here.
from .models import Document, DocumentTag


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'created_at']


@admin.register(DocumentTag)
class DocumentTagAdmin(admin.ModelAdmin):
    list_display = ['id', 'document', 'name', 'created_at']
