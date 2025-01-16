
from django.urls import path
from .views import CSRFTokenView

urlpatterns = [

    path('csrf/', CSRFTokenView.as_view(), name='get_csrf_token'),
]
