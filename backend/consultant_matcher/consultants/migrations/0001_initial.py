# Generated by Django 4.2.11 on 2024-05-05 03:40

from django.db import migrations, models
import django.db.models.deletion
import pgvector.django

def forwards(apps, schema_editor):
    with schema_editor.connection.cursor() as cursor:
        cursor.execute("CREATE EXTENSION IF NOT EXISTS vector;")

def backwards(apps, schema_editor):
    pass


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.RunPython(forwards, backwards),
        migrations.CreateModel(
            name='AreaOfInterest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Consultant',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('description', models.TextField(blank=True)),
                ('seniority', models.CharField(choices=[('senior', 'Senior'), ('junior', 'Junior'), ('consultant', 'Consultant')], max_length=10)),
                ('areas_of_interest', models.ManyToManyField(related_name='consultants', to='consultants.areaofinterest')),
            ],
        ),
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='SoftSkill',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='TechStack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
                ('years_of_experience', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='ConsultantEmbedding',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField(blank=True)),
                ('embedding', pgvector.django.VectorField(blank=True, dimensions=3)),
                ('consultant', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='embedding', to='consultants.consultant')),
            ],
        ),
        migrations.AddField(
            model_name='consultant',
            name='industries',
            field=models.ManyToManyField(related_name='consultants', to='consultants.industry'),
        ),
        migrations.AddField(
            model_name='consultant',
            name='soft_skills',
            field=models.ManyToManyField(related_name='consultants', to='consultants.softskill'),
        ),
        migrations.AddField(
            model_name='consultant',
            name='tech_stacks',
            field=models.ManyToManyField(related_name='consultants', to='consultants.techstack'),
        ),
    ]
