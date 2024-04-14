from django.db import models

class Scrape(models.Model):
    url = models.CharField(max_length=255)
    currency = models.CharField(max_length=10)
    image = models.CharField(max_length=500)
    title = models.CharField(max_length=255)
    current_price = models.FloatField()
    original_price = models.FloatField(null=True, blank=True)
    lowest_price = models.FloatField(null=True, blank=True)
    highest_price = models.FloatField(null=True, blank=True)
    average_price = models.FloatField(null=True, blank=True)
    discount_rate = models.FloatField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    category = models.CharField(max_length=255, null=True, blank=True)
    reviews_count = models.CharField(max_length=255, null=True, blank=True)
    stars = models.FloatField(default=0)
    is_out_of_stock = models.CharField(max_length=255)
    users = models.JSONField(default=list) 
    price_history = models.JSONField(default=list) 
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'users_scrape'

class Best_Sellers(models.Model):
    url = models.CharField(max_length=255)
    image = models.CharField(max_length=500)
    title = models.CharField(max_length=500)
    rank = models.CharField(max_length=50)
    rating = models.CharField(max_length=50)
    href_link = models.CharField(max_length=500)
    category = models.CharField(max_length=255, null=True, blank=True)
    price = models.CharField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    class Meta:
        db_table = 'best_sellers'