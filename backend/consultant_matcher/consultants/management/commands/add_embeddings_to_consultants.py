import os
import csv
import random
import datetime
import string
from faker import Faker
from django.core.management.base import BaseCommand
from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, Industry, AreaOfInterest, ConsultantEmbedding
from consultant_matcher.consultants.utils.embedding_utils import ConsultantEmbedder
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

        embedder = ConsultantEmbedder(embedding_generator)

        consultants = Consultant.objects.prefetch_related('soft_skills', 'tech_stacks', 'industries', 'areas_of_interest').filter(embedding__content__isnull=True).all()
        for consultant in consultants:
            embedder.generate_and_save_embedding(consultant)
