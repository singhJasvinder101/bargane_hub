import json
from django.shortcuts import render
from scrape.libs.scrapper import extractorProduct
from scrape.libs.utils import get_lowest_price, get_highest_price, get_average_price
from rest_framework import decorators as rest_decorators
from scrape.serializers import ScrapeSerializer, BestSellersSerializer
from scrape.models import Scrape, Best_Sellers
from users.models import Account
from rest_framework import response
from scrape.libs.mail_service import generate_email_body, send_custome_email
from scrape.libs.utils import update_all_products
from scrape.libs.scrapper import scrape_amazon_best_sellers, fetch_product_info

# Create your views here.

@rest_decorators.api_view(["POST"])
def save_product(request):
    url = request.data.get('url')
    url = url.split('/ref=')[0]
    scraped_product = extractorProduct(url)
    
    print(scraped_product)
    
    if not scraped_product:
        return response.Response({'message': 'Failed to extract product data.'}, status=400)

    existing_product = Scrape.objects.filter(url=url).first()    
    
    if existing_product:
        # Updating the existing product information
        
        existing_price_history = existing_product.price_history or []
        new_price_entry = {'price': scraped_product['current_price']}
        existing_price_history.append(new_price_entry)
        
        # Updating the highest, lowest, and average prices
        existing_product.title = scraped_product.get('title')
        existing_product.highest_price = get_highest_price(existing_price_history)
        existing_product.lowest_price = get_lowest_price(existing_price_history)
        existing_product.average_price = get_average_price(existing_price_history)
        existing_product.price_history = existing_price_history
        existing_product.description = scraped_product.get('description')
        
        existing_product.save()
        _id = existing_product.id
    else:
        serializer = ScrapeSerializer(data=scraped_product)
        serializer.is_valid(raise_exception=True)
        saved_product = serializer.save()
        _id = saved_product.id
    
    return response.Response({'data': _id}, status=200)

@rest_decorators.api_view(["GET"])
def get_products(request):
    products = Scrape.objects.all()
    serializer = ScrapeSerializer(products, many=True)
    return response.Response(serializer.data)

@rest_decorators.api_view(["GET"])
def getProductById(request, id):
    product = Scrape.objects.filter(id=id).first()
    if not product:
        return response.Response({'message': 'Requested product not found'})

    serializer = ScrapeSerializer(product)
    return response.Response(serializer.data)


@rest_decorators.api_view(["GET"])
def addUserEmailToProduct(request):
    product_id = request.query_params.get('product_id')
    user_email = request.query_params.get('user_email')
    
    print(product_id, user_email)
    
    product = Scrape.objects.filter(id=product_id).first()
    user = Account.objects.filter(email=user_email).first()
    
    if not product:
        return response.Response({'message': 'Requested product not found'}, status=404)

    if not user:
        return response.Response({'message': 'User not found'}, status=404)        
    
    existing_user = product.users or []
    existing_product = user.tracks or []
    
    if user_email not in existing_user:
        existing_user.append(user_email)
        # product.users.add(user)
        user.tracks.add(product)
        user.points += 100
        user.save()
        
        product.users = existing_user
        product.save()
        
        
        email_content = generate_email_body(product, 'WELCOME')
        # print(email_content)
        send_custome_email(email_content, recipient_list=[user_email])
        
        return response.Response({'message': 'User email added successfully'}, status=200)
    
    return response.Response({'message': 'User email already subscribed'}, status=200)
    
@rest_decorators.api_view(["GET"])
def removeUserEmailToProduct(request):
    product_id = request.query_params.get('product_id')
    user_email = request.query_params.get('user_email')
    
    target_mail = Scrape.objects.filter(id=product_id).first()
    if target_mail:
        existing_users = target_mail.users or []
        if user_email in existing_users:
            existing_users.remove(user_email)
            target_mail.users = existing_users
            target_mail.save()
            return response.Response({'message': 'User email removed successfully'}, status=200)
        else:
            return response.Response({'message': 'Requested user not found in product'}, status=404)    
    else:
        return response.Response({'message': 'Requested product not found'}, status=404)
    
@rest_decorators.api_view(["DELETE"])
def deleteProduct(request, id):
    product = Scrape.objects.filter(id=id).first()
    if not product:
        return response.Response({'message': 'Requested product not found'}, status=404)
    product.delete()
    return response.Response({'message': 'Product deleted successfully'}, status=200)

@rest_decorators.api_view(["GET"])
def scrapeLatestProductAndUpdate(request):
    try:
        products = Scrape.objects.all()
        if not products:
            return response.Response({'message': 'No products found'}, status=404)
        
        # SCRAPING LATEST DATA AND UPDATING TO THE SCUBSCRIBED USER
        updated_products = [update_all_products(product) for product in products]
        updated_products = list(updated_products)  
        serialized_products = ScrapeSerializer(updated_products, many=True)
        return response.Response({'message': 'Products updated successfully', 'updated': serialized_products.data}, status=200)  
    except Exception as e:
        raise e

@rest_decorators.api_view(["DELETE"])
def deleteAllScrapedData(request):
    Scrape.objects.all().delete()
    return response.Response({'message': 'All scraped data deleted successfully'}, status=200)



@rest_decorators.api_view(["POST"])
def save_best_sellers(request):
    url = request.data.get('url')
    best_sellers_list = scrape_amazon_best_sellers(url)
    
    print(best_sellers_list)
    
    if best_sellers_list:
        for best_sellers_data in best_sellers_list:
            image = best_sellers_data.get('image')
            existing_product = Best_Sellers.objects.filter(image=image).first()  

            if image and existing_product:
                existing_product.rank = best_sellers_data.get('rank')
                existing_product.rating = best_sellers_data.get('rating')
                existing_product.href_link = best_sellers_data.get('href_link')
                existing_product.category = best_sellers_data.get('category')
                existing_product.save()
            else:
                serializer = BestSellersSerializer(data=best_sellers_data)
                serializer.is_valid(raise_exception=True)
                serializer.save()
        
        return response.Response({'message': 'Best sellers updated successfully', 'data': best_sellers_list}, status=200)
    else:
        return response.Response({'message': 'Best sellers list not found'}, status=400)

@rest_decorators.api_view(["DELETE"])
def deleteAllBestSeller(request):
    Best_Sellers.objects.all().delete()
    return response.Response({'message': 'All scraped data deleted successfully'}, status=200)

@rest_decorators.api_view(["GET"])
def get_best_sellers(request):
    best_sellers = Best_Sellers.objects.all()
    serializer = BestSellersSerializer(best_sellers, many=True)
    return response.Response(serializer.data)

@rest_decorators.api_view(["POST"])
def get_competetive_prices(request):
    query = request.data.get('query')
    
    info = fetch_product_info(query)
    # print(info)
    return response.Response(info)

