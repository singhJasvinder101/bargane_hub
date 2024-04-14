from django.urls import path
from scrape import views

app_name = "scrape"
urlpatterns = [
    path('create', views.save_product),
    path('all', views.get_products),
    path('<int:id>', views.getProductById),
    path('delete', views.deleteAllScrapedData),
    path('add/useremail', views.addUserEmailToProduct),
    path('delete/useremail', views.removeUserEmailToProduct),
    path('update/all', views.scrapeLatestProductAndUpdate),
    path('save/bestsellers', views.save_best_sellers),
    path('delete/bestsellers', views.deleteAllBestSeller),
    path('get/bestsellers', views.get_best_sellers),
    path('get/competetive', views.get_competetive_prices),
]
