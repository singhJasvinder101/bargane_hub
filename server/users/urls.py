from django.urls import path
from users import views

app_name = "users"

urlpatterns = [
    path('login', views.loginView),
    path('register', views.registerView),
    # path('refresh-token', views.CookieTokenRefreshView.as_view()),
    path('logout', views.logoutView),
    path("user", views.user),
    path("get-token", views.getToken),
    path("add-points", views.add_points),
]
