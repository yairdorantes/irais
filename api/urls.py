from django.urls import path

from .views import CreateData
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path("form", csrf_exempt(CreateData.as_view()), name="musicians"),
]
