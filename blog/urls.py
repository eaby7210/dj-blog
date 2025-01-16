from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import OpenPostViewSet, UserPostViewSet

router = DefaultRouter()
router.register('posts', OpenPostViewSet, basename='open-posts')
router.register('userposts', UserPostViewSet, basename='user-posts')

urlpatterns = [

    path('auth/', include('dj_rest_auth.urls')),
    path('auth/register/', include('dj_rest_auth.registration.urls')),
]
urlpatterns += router.urls
