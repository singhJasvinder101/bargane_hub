from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include("users.urls", namespace='users')),
    # path('api/events/', include("events.urls", namespace='events'))
    path('api/scrape/', include("scrape.urls", namespace='scrape'))
]
