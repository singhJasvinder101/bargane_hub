from bs4 import BeautifulSoup
from scrape.models import Scrape
from scrape.libs.mail_service import generate_email_body, send_custome_email
from django.db import transaction

THRESHOLD_PERCENTAGE = 40;

def extract_price(*elements):
    for element in elements:
        if element:
            price_text = element.get_text().strip()
            clean_price = ''.join(filter(str.isdigit, price_text))
            if clean_price:
                return clean_price
    return ''

def get_images(soup):
    images = []
    img_elements = soup.find_all(class_='imgTagWrapper') + soup.find_all(class_='a-dynamic-image')
    for img_element in img_elements:
        img_src = img_element.attrs.get('src') or img_element.attrs.get('data-a-dynamic-image')
        if img_src:
            images.append(img_src)
    return images
    

def extract_currency(element):
    if element:
        currency_text = element.get_text().strip()[:-1]
        return currency_text if currency_text else ''
    else:
        return ''


def extract_description(soup):
    try:
        list_items = soup.find('ul', class_='a-unordered-list a-vertical a-spacing-mini').find_all('li')
    except AttributeError:
        return "Description not found."

    points_list = []
    
    print(list_items)

    for item in list_items:
        print(item)
        point = item.text.strip()
        points_list.append(f'<li>{point}</li>') 

    points_string = ''.join(points_list)

    return f'<ul>{points_string}</ul>'

def get_highest_price(price_list):
    if not price_list:
        return 0
    
    print(price_list[0]['price'])

    return max(price_list, key=lambda x: x['price'])['price']
    
def get_lowest_price(price_list):
    if not price_list:
        return 0

    if isinstance(price_list[0], dict):
        return min(price_list, key=lambda x: x['price'])['price']
    else:
        return min(price_list)

def get_average_price(price_list):
    if not price_list:
        return 0

    sum_of_prices = sum(float(item['price']) for item in price_list)
    return sum_of_prices / len(price_list)



# Function to format a number
def format_number(num):
    return '{:,}'.format(num)



# get email notify type based on the product newly added
def get_email_notif_type(scraped_product, current_product):
    lowest_price = get_lowest_price(current_product.price_history)

    if float(scraped_product.current_price) < lowest_price:
        return 'LOWEST_PRICE'
    if not scraped_product.is_out_of_stock and current_product['is_out_of_stock']:
        return 'CHANGE_OF_STOCK'
    if scraped_product.discount_rate >= THRESHOLD_PERCENTAGE:
        return 'THRESHOLD_MET'

    return None


# will be used in map function to update all products
def update_all_products(product):
    if not product:
        return
    
    price_history = product.price_history or []
    current_price = product.current_price
    
    if current_price:
        price_history.append({'price': float(current_price)})
    
    updated_product = {
        # not dictionary its db's object
        **product.__dict__,
        'price_history': price_history,
        'highest_price': get_highest_price(price_history),
        'lowest_price': get_lowest_price(price_history),
        'average_price': get_average_price(price_history),
    }
    print(updated_product)
    
    try:
        with transaction.atomic():
            updated_product_instance, created = Scrape.objects.update_or_create(
                url=product.url,
                defaults=updated_product
            )

            email_notify_type = get_email_notif_type(updated_product_instance, product)

            if email_notify_type:
                email_content = generate_email_body(updated_product, email_notify_type)
                send_custome_email(email_content, recipient_list=updated_product_instance.users)

    except Exception as e:
        print(f"Error updating product: {e}")

    return updated_product
