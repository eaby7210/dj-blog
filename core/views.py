# views.py
from django.middleware.csrf import get_token
from rest_framework.views import APIView
from rest_framework.response import Response


class CSRFTokenView(APIView):
    """
    API view to ensure the CSRF token is sent in the response.
    This view will set the CSRF cookie when accessed.
    """

    def get(self, request):
        csrf_token = get_token(request)  # Manually get CSRF token
        response = Response(
            {"detail": "CSRF cookie set", "csrftoken": csrf_token})
        # Set the CSRF token in cookies
        response.set_cookie('csrftoken', csrf_token)
        return response
