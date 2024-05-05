from django.db import models

class Consultant(models.Model):
    SENIORITY_CHOICES = [
        ('senior', 'Senior'),
        ('junior', 'Junior'),
        ('consultant', 'Consultant'),
    ]

    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    description = models.TextField(blank=True)
    seniority = models.CharField(max_length=10, choices=SENIORITY_CHOICES)

    tech_stacks = models.ManyToManyField('TechStack', related_name='consultants')
    industries = models.ManyToManyField('Industry', related_name='consultants')
    soft_skills = models.ManyToManyField('SoftSkill', related_name='consultants')
    areas_of_interest = models.ManyToManyField('AreaOfInterest', related_name='consultants')

    def __str__(self):
        return f"{self.name} - {self.seniority}"

class TechStack(models.Model):
    name = models.CharField(max_length=50)
    years_of_experience = models.IntegerField()

    def __str__(self):
        return f"{self.name} ({self.years_of_experience} years)"

class SoftSkill(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name

class Industry(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name

class AreaOfInterest(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
