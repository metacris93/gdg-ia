import os
import csv
import random
import datetime
import string
from faker import Faker
from django.core.management.base import BaseCommand
from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, Industry, AreaOfInterest, ConsultantEmbedding
from ai.generators.genai_generator import GenAIGenerator
from ai.generator_factory import GeneratorFactory

from ast import literal_eval


class Command(BaseCommand):
    help = 'Add embeddings to consultants'

    def handle(self, *args, **options):
        factory = GeneratorFactory()
        factory.register_generator('genai', GenAIGenerator)

        api_key = os.getenv('AI_API_KEY')
        embedding_generator = factory.get_generator('genai', api_key)

        consultants = Consultant.objects.prefetch_related('soft_skills', 'tech_stacks', 'industries', 'areas_of_interest').filter(embedding__content__isnull=True).all()
        for consultant in consultants:
            document = self.get_document_from_consultant(consultant)
            content = embedding_generator.generate_embedding(
                                          content=document,
                                          task_type="retrieval_document",
                                          title='consultant-filter')

            content = embedding_generator.generate_embedding(
                content=document,
                task_type="retrieval_document",
                title='consultant-filter'
            )

            ConsultantEmbedding.objects.create(consultant=consultant, content=document[0], embedding=content[0])

    def get_document_from_consultant(self, c):
        return [c.name + " " + c.description + " " + c.email + " " + c.seniority +
            " ".join([s.name for s in c.soft_skills.all()]) + " " + " ".join([i.name for i in c.industries.all()]) + " " + " ".join([a.name for a in c.areas_of_interest.all()]) + " " + " ".join([t.name for t in c.tech_stacks.all()])]
