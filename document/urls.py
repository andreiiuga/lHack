from django.conf.urls import url, include
from django.contrib import admin
from document import views

urlpatterns = [
    url(
        r'^upload/',
        views.FileUploadView.as_view(),
        name='upload'
    ),
]
