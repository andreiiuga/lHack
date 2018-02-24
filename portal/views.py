from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.shortcuts import render
from rest_framework.views import APIView


# Create your views here.
@login_required(login_url='/accounts/login/')
def index(request):
    context = {'HOT_LOAD': settings.HOT_LOAD}
    return render(request, 'portal/index.html', context)


class UserDetails(APIView):

    def get(self, request):
        user = request.user

        return JsonResponse(
            {'username': user.username,
             'first_name': user.first_name,
             'last_name': user.last_name,
             'email': user.email}
        )
