from django.core.mail import send_mail
from django.conf import settings
from enum import Enum


class Notification(Enum):
    WELCOME = 'WELCOME'
    CHANGE_OF_STOCK = 'CHANGE_OF_STOCK'
    LOWEST_PRICE = 'LOWEST_PRICE'
    THRESHOLD_MET = 'THRESHOLD_MET'

primary_font = 'Arial, sans-serif'
secondary_font = 'Georgia, serif'
def generate_email_body(product, type_str):
    # print(type)
    type = Notification(type_str)
    THRESHOLD_PERCENTAGE = 40
    shortened_title = product.title[:20] +'...' if len(product.title) > 20 else product.title

    subject = ""
    body = ""
    
    if type == Notification('WELCOME'):
        subject = f"Welcome to Price BargainHub for {shortened_title}"
        body = f"""
            <div style="font-family: {secondary_font};">
              <h2>Welcome to BargainHub 🚀</h2>
              <p>You are now tracking {product.title}.</p>
              <p>Here's an example of how you'll receive updates:</p>
              <div style="border: 1px solid #ccc; padding: 10px; background-color: #f8f8f8;">
                <h3>{product.title} is back in stock!</h3>
                <p>We're excited to let you know that {product.title} is now back in stock.</p>
                <p>Don't miss out - <a href="{product.url}" target="_blank" rel="noopener noreferrer">buy it now</a>!</p>
                <img src="https://i.postimg.cc/j2w4dTBv/image.png" alt="Product Image" style="max-width: 100%;" />
              </div>
              <p>Stay tuned for more updates on {product.title} and other products you're tracking.</p>
            </div>
        """
    elif type == Notification('CHANGE_OF_STOCK'):
        subject = f"{shortened_title} is now back in stock!!"
        body = f"""
            <div>
              <h4>Hey, {product.title} is now restocked! Grab yours before they run out again!</h4>
              <p>See the product <a href="{product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
        """
    elif type == Notification('LOWEST_PRICE'):
        subject = f"Lowest Price Alert for {shortened_title}"
        body = f"""
            <div>
              <h4>Hey, {product.title} has reached its lowest price ever!!</h4>
              <p>Grab the product <a href="{product.url}" target="_blank" rel="noopener noreferrer">here</a> now.</p>
            </div>
        """
    elif type == Notification('THRESHOLD_MET'):
        subject = f"Discount Alert for {shortened_title}"
        body = f"""
            <div>
              <h4>Hey, {product.title} is now available at a discount more than {THRESHOLD_PERCENTAGE}%!</h4>
              <p>Grab it right away from <a href="{product.url}" target="_blank" rel="noopener noreferrer">here</a>.</p>
            </div>
        """
    else:
        raise ValueError("Invalid notification type.")
    
    return {"subject": subject, "body": body}

def send_custome_email(email_content, recipient_list=[]):
    print(email_content)
    from_email=settings.EMAIL_HOST_USER
        
    send_mail(email_content['subject'], email_content['body'], from_email, recipient_list, html_message=email_content['body'], fail_silently=False)



