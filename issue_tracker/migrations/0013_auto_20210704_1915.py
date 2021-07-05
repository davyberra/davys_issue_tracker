# Generated by Django 3.1.3 on 2021-07-05 02:15

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('issue_tracker', '0012_auto_20210702_2012'),
    ]

    operations = [
        migrations.AddField(
            model_name='issue',
            name='date_completed',
            field=models.DateTimeField(null=True, verbose_name='date_completed'),
        ),
        migrations.AddField(
            model_name='issue',
            name='date_posted',
            field=models.DateTimeField(default=datetime.datetime(2021, 7, 4, 19, 15, 54, 197408), verbose_name='date_posted'),
            preserve_default=False,
        ),
    ]
