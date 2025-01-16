
from django.conf import settings
from django.contrib import admin
from django.urls import path, include
import blog.urls
import core.urls
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', include(blog.urls)),
    path('', include(core.urls))
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)
