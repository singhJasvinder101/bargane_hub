# Generated by Django 5.0.3 on 2024-03-27 17:22

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('scrape', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Scrape',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=255)),
                ('currency', models.CharField(max_length=10)),
                ('image', models.CharField(max_length=500)),
                ('title', models.CharField(max_length=255)),
                ('current_price', models.FloatField()),
                ('original_price', models.FloatField(blank=True, null=True)),
                ('lowest_price', models.FloatField(blank=True, null=True)),
                ('highest_price', models.FloatField(blank=True, null=True)),
                ('average_price', models.FloatField(blank=True, null=True)),
                ('discount_rate', models.FloatField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('category', models.CharField(blank=True, max_length=255, null=True)),
                ('reviews_count', models.IntegerField(blank=True, null=True)),
                ('is_out_of_stock', models.CharField(max_length=255)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'users_scrape',
            },
        ),
    ]
