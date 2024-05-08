# Generated by Django 4.2.11 on 2024-05-07 05:28

from django.db import migrations
import pgvector.django

class Migration(migrations.Migration):

    dependencies = [
        ('consultants', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ConsultantEmbedding',
            name='embedding',
            field=pgvector.django.VectorField(blank=True, dimensions=768),
        )
    ]