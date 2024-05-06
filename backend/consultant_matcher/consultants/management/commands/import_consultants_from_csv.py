import csv
import random
import datetime
import string
from faker import Faker
from django.core.management.base import BaseCommand
from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, Industry, AreaOfInterest
from ast import literal_eval

def generate_random_email():
    current_time = datetime.datetime.now().strftime("%Y%m%d%H%M%S")

    letters = string.ascii_lowercase
    random_string = ''.join(random.choice(letters) for i in range(5))

    email = f"{random_string}{current_time}@example.com"
    return email


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
                random_email = generate_random_email()

                skills = literal_eval(row['soft_skills'])

                experience = random.randint(1, 15)
                primary_skills = random.sample(skills, 1)
                education = random.choice(["Bachelor's in Computer Science", "Master's in Software Engineering", "Self-taught"])
                previous_companies = fake.catch_phrase() + ", " + fake.company()

                background = f"""
                Name: {random_name}
                Experience: {experience} years
                Primary Skills: {', '.join(primary_skills)}
                Education: {education}
                Previous Companies: {previous_companies}
                """

                consultant = Consultant.objects.create(
                    name=random_name,
                    email=random_email,
                    description=background,
                    seniority=row['seniority']
                )

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

                industries = literal_eval(row['industries'])
                for industry in industries:
                    industry_obj, created = Industry.objects.get_or_create(name=industry)
                    consultant.industries.add(industry_obj)

                self.stdout.write(self.style.SUCCESS(f'Successfully imported consultant {consultant.name}'))
