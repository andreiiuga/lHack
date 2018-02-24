from django.conf.urls import url

import views

urlpatterns = [
    url(
        r'^$',
        views.index,
        name='index'
    ),
    url(
        r'^user_details/',
        views.UserDetails.as_view(),
        name='user_details'
    ),

    # For react to work correctly
    url(
        r'^contract_helper',
        views.index,
        name='index'
    ),
    url(
        r'^page2',
        views.index,
        name='index'
    ),
]
