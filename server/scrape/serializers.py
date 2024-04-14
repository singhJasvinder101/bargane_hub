from rest_framework import serializers
from .models import Scrape, Best_Sellers

class ScrapeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scrape
        fields = '__all__'

    def validate(self, data):
        # Perform validation to ensure all required fields are present
        required_fields = ['url', 'currency', 'image', 'title', 'current_price', 'original_price', 'is_out_of_stock', 'reviews_count']
        for field in required_fields:
            if field not in data:
                raise serializers.ValidationError(f"Field '{field}' is required.")
            
        
        return data    


class BestSellersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Best_Sellers
        fields = '__all__'    
    