# Generated by Django 5.0.3 on 2024-04-02 13:37

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('scrape', '0008_best_sellers'),
        ('users', '0003_account_points'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='tracks',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='scrape.scrape'),
        ),
    ]
