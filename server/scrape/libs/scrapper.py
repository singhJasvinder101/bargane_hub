from bs4 import BeautifulSoup
import requests
import random
from fake_useragent import UserAgent
import pandas as pd
import re
import time
ua = UserAgent()
# print(ua.random)
from scrape.libs.utils import extract_price, get_images, extract_currency, extract_description

def fetch(url):
    proxies = {
        "http": "http://seujshig:w8l034xf9gsz@185.199.229.156:7492",
        "https": "http://seujshig:w8l034xf9gsz@185.199.229.156:7492"
    }
    # headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.95 Safari/537.36'}
    headers = {'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:80.0) Gecko/20100101 Firefox/80.0'}
    # headers = {'User-Agent': ua.random}
    req = requests.get(url, headers=headers)
    return req.text


def extractLinks(html):
    soup = BeautifulSoup(html, 'html.parser')
    links = set()
    
    for a in soup.find_all('a', href=True):
        if a["href"]:
            links.append(a['href'])


import re
from bs4 import BeautifulSoup

def extractorProduct(url):
    url = url.split('/ref=')[0]
    html = fetch(url)
    # print(html)
    
    soup = BeautifulSoup(html, 'html.parser')
    title = soup.find("span", id='productTitle').get_text().strip() if soup.find(id='productTitle') else ''
    currentPrice = float(extract_price(soup.find(class_='priceToPay'))) if soup.find(class_='priceToPay') else None
    originalPrice_element = soup.find("span", class_="a-size-small aok-offscreen")
    originalPrice = originalPrice_element.get_text() if originalPrice_element else ''
    outOfStock = soup.find(id='availability').find('span').get_text().strip() if soup.find(id='availability') else ''
    images = get_images(soup)
    discount_percentage = float(soup.find(class_='savingsPercentage').get_text().strip()[:-1]) if soup.find(class_='savingsPercentage') else 0
    description = extract_description(soup)
    currency_symbol = soup.find(class_='a-price-symbol').get_text()[0:2] if soup.find(class_='a-price-symbol') else ''
    stars = soup.find('span', {'class': 'a-icon-alt'}).get_text() if soup.find('span', {'class': 'a-icon-alt'}) else ''
    reviews_count = soup.find('span', {'id': 'acrCustomerReviewText'}).get_text() if soup.find('span', {'id': 'acrCustomerReviewText'}) else ''

    originalPrice = re.findall(r'\d', originalPrice[:-3])
    originalPrice = ''.join(originalPrice)

    data = {
        'url': url,
        'currency': currency_symbol or '$',
        'image': images[0] if images else '',
        'title': title,
        'current_price': currentPrice,
        'original_price': float(originalPrice) if originalPrice else 0,
        'price_history': [],
        'discount_rate': discount_percentage,
        'category': 'category',
        'reviews_count': reviews_count,
        'stars': float(stars[0:3]) if stars else 0,
        'users': [],
        'is_out_of_stock': outOfStock,
        'description': description,
        'lowest_price': currentPrice or originalPrice,
        'highest_price': float(originalPrice) if originalPrice else currentPrice,
        'average_price': currentPrice or originalPrice,
    }
    return data

def scrape_amazon_best_sellers(url):
    html = fetch(url)
    soup = BeautifulSoup(html, 'html.parser')
    best_sellers_rows = soup.find_all('div', class_='p13n-gridRow _cDEzb_grid-row_3Cywl')
    best_sellers = []
    category = url.split("bestsellers/")[1]

    for row in best_sellers_rows:
        products = row.find_all('div', class_='a-cardui _cDEzb_grid-cell_1uMOS expandableGrid p13n-grid-content')

        for product in products:
            image_url = product.find('img')['src']
            title = product.find('div', class_='_cDEzb_p13n-sc-css-line-clamp-3_g3dy1').text.strip()
            rank = product.find('span', class_='zg-bdg-text').text.strip()
            rating_element = product.find('span', class_='a-icon-alt')
            rating = rating_element.text.strip() if rating_element else 'Not available'
            href_link = product.find('a', class_='a-link-normal')['href']
            price_element = product.find('span', class_='_cDEzb_p13n-sc-price_3mJ9Z')
            price = price_element.text.strip() if price_element else 'Price not available'

            best_sellers.append({
                'url': url,
                'image': image_url,
                'title': title,
                'rank': rank,
                'rating': rating,
                'href_link': href_link,
                'category': category,
                'price': price
            })
    
    return best_sellers

def fetch_product_info(query):
    url = f"https://www.google.com/search?q={query}"
    html = fetch(url)
    soup = BeautifulSoup(html, 'lxml')

    search_results = soup.find_all('div', class_='g Ww4FFb vt6azd tF2Cxc asEBEc')
    product_info_list = []

    for result in search_results:
        title_element = result.find('h3', class_='LC20lb MBeuO DKV0Md')
        title = title_element.text.strip() if title_element else None

        website_name_element = result.find('span', class_='VuuXrf')
        website_url_element = result.find('cite', class_='qLRx3b tjvcx GvPZzd cHaqb')
        website_name = website_name_element.text.strip() if website_name_element else None
        website_url = website_url_element.text.strip() if website_url_element else None

        description_element = result.find('div', class_='VwiC3b yXK7lf lVm3ye r025kc hJNv6b')
        description = description_element.text.strip() if description_element else None

        price_and_stock_element = result.find('div', class_='fG8Fp uo4vr')
        price_and_stock = price_and_stock_element.text.strip() if price_and_stock_element else None

        product_info = {
            "title": title,
            "website_name": website_name,
            "website_url": website_url,
            "description": description,
            "price_and_stock": price_and_stock.replace('· \u200e', '').strip()
        }

        product_info_list.append(product_info)

    print(product_info_list)
    return product_info_list

# def save(filename, content):
#     content = BeautifulSoup(content, 'html.parser').prettify()
#     with open(filename, "w", encoding="utf-8") as f:
#         f.write(content)
        
# save("amazon.html", fetch("https://www.amazon.in/") )        