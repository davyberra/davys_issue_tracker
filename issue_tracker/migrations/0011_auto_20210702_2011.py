# Generated by Django 3.1.3 on 2021-07-03 03:11

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('issue_tracker', '0010_auto_20210702_2004'),
    ]

    operations = [
        migrations.AlterField(
            model_name='issue',
            name='date_posted',
            field=models.DateTimeField(default=datetime.datetime.now, verbose_name='date_posted'),
        ),
    ]
