from django.urls import path

from .views import CreateData, DetectFace
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("form", csrf_exempt(CreateData.as_view()), name="form"),
    path("face", csrf_exempt(DetectFace.as_view()), name="face"),
]
