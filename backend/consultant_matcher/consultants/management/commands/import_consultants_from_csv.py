import csv
from faker import Faker
from django.core.management.base import BaseCommand
from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, Industry, AreaOfInterest
from ast import literal_eval

class Command(BaseCommand):
    help = 'Imports consultants from a CSV file'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The CSV file to process')

    def handle(self, *args, **options):
        fake = Faker()
        with open(options['csv_file'], newline='') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                random_name = fake.name()
                random_email = fake.email()

                consultant = Consultant.objects.create(
                    name=random_name,
                    email=random_email,
                    description='Automatically generated',
                    seniority=row['seniority']
                )

                skills = literal_eval(row['soft_skills'])
                for skill in skills:
                    skill_obj, created = SoftSkill.objects.get_or_create(name=skill)
                    consultant.soft_skills.add(skill_obj)

                tech_stacks = literal_eval(row['tech_stack'])
                for tech, years in tech_stacks:
                    tech_stack_obj, created = TechStack.objects.get_or_create(name=tech, defaults={'years_of_experience': years})
                    consultant.tech_stacks.add(tech_stack_obj)

                interests = literal_eval(row['interest'])
                for interest in interests:
                    interest_obj, created = AreaOfInterest.objects.get_or_create(name=interest)
                    consultant.areas_of_interest.add(interest_obj)

                self.stdout.write(self.style.SUCCESS(f'Successfully imported consultant {consultant.name}'))
