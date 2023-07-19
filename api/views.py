# Create your views here.
from django.views import View
import json
from django.http import HttpResponse, JsonResponse
from .models import MyForm


class CreateData(View):
    def get(self, request):
        data_set = list(MyForm.objects.all().values())[::-1]
        return JsonResponse({"data": data_set})

    def post(self, request):
        jd = json.loads(request.body)
        MyForm.objects.create(**jd)
        return HttpResponse("oki", status=200)


# from django.contrib.auth import authenticate
