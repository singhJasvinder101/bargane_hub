# Generated by Django 5.0.3 on 2024-04-01 13:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrape', '0006_alter_scrape_reviews_count'),
    ]

    operations = [
        # migrations.CreateModel(
        #     name='Best_Sellers',
        #     fields=[
        #         ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
        #         ('url', models.CharField(max_length=255)),
        #         ('image', models.CharField(max_length=500)),
        #         ('title', models.CharField(max_length=500)),
        #         ('rank', models.CharField(max_length=50)),
        #         ('rating', models.CharField(max_length=50)),
        #         ('href_link', models.CharField(max_length=500)),
        #         ('category', models.CharField(blank=True, max_length=255, null=True)),
        #         ('price', models.CharField(blank=True, max_length=255, null=True)),
        #         ('created_at', models.DateTimeField(auto_now_add=True)),
        #         ('updated_at', models.DateTimeField(auto_now=True)),
        #     ],
        #     options={
        #         'db_table': 'best_sellers',
        #     },
        # ),
    ]
