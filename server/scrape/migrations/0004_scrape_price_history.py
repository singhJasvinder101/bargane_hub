# Generated by Django 5.0.3 on 2024-03-27 17:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrape', '0003_scrape_users'),
    ]

    operations = [
        migrations.AddField(
            model_name='scrape',
            name='price_history',
            field=models.JSONField(default=list),
        ),
    ]
