from django.conf.urls import url
from document import views

urlpatterns = [
    url(
        r'^upload/',
        views.FileUploadView.as_view(),
        name='upload'
    ),
    url(
        r'^query/',
        views.QueryView.as_view(),
        name='query'
    ),
]
