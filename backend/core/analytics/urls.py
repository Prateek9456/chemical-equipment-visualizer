from django.urls import path
from .views import upload_csv, history

urlpatterns = [
    path("upload/", upload_csv),
    path("history/", history),
]
