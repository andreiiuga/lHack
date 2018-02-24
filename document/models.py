# Python
from __future__ import unicode_literals
import uuid

# Django
from django.db import models


# Create your models here.
class Document(models.Model):
    name = models.CharField(max_length=300)
    uuid = models.UUIDField(default=uuid.uuid4)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.name


class DocumentTag(models.Model):
    document = models.ForeignKey(Document)
    name = models.CharField(max_length=300)
    created_at = models.DateTimeField(auto_now_add=True)

    def __unicode__(self):
        return self.name
