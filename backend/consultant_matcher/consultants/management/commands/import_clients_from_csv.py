import csv
import random
import datetime
import string
from faker import Faker
from django.db.models import Count
from django.core.management.base import BaseCommand
from consultant_matcher.consultants.models import Client, Team, Consultant
from ast import literal_eval

class Command(BaseCommand):
    help = 'Imports clients from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The CSV file to process')

    def handle(self, *args, **options):
        with open(options['csv_file'], newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                name = row['name']
                contact_email = row['contact_email']
                industry = row['industry']
                teams = literal_eval(row['teams'])

                client = Client.objects.create(
                    name=name,
                    contact_email=contact_email,
                    industry=industry,
                )
                for name_team in teams:
                    Team.objects.get_or_create(name=name_team, client=client)

                teams = Team.objects.all()
                count = teams.aggregate(count=Count('id'))['count']
                for consultant in Consultant.objects.all():
                    random_index = random.randint(0, count - 1)
                    random_team = teams[random_index]
                    consultant.team = random_team
                    consultant.save()

                self.stdout.write(self.style.SUCCESS(f'Successfully imported client {name} - {contact_email} - {industry}'))
