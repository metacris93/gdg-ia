import os
from celery import Celery, shared_task
from celery.schedules import crontab

from ai.generators.genai_generator import GenAIGenerator
from ai.generator_factory import GeneratorFactory

app = Celery()

@app.on_after_configure.connect
def setup_periodic_tasks(sender, **kwargs):
    sender.add_periodic_task(10.0, set_embedding_for_consultants.s(), name='set_embedding_for_consultants')

@shared_task
def set_missing_embedding_for_consultants():
    from consultant_matcher.consultants.utils.embedding_utils import ConsultantEmbedder
    from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, Industry, AreaOfInterest, ConsultantEmbedding
    factory = GeneratorFactory()
    factory.register_generator('genai', GenAIGenerator)

    api_key = os.getenv('AI_API_KEY')
    embedding_generator = factory.get_generator('genai', api_key)

    consultants = Consultant.objects.prefetch_related('soft_skills', 'tech_stacks', 'industries', 'areas_of_interest').filter(embedding__content__isnull=True).all()
    for consultant in consultants:
        document = get_document_from_consultant(consultant)
        content = embedding_generator.generate_embedding(
                                      content=document,
                                      task_type="retrieval_document")

        content = embedding_generator.generate_embedding(
            content=document,
            task_type="retrieval_document",
            title='consultant-filter'
        )

        ConsultantEmbedding.objects.create(consultant=consultant, content=document[0], embedding=content[0])

def get_document_from_consultant(c):
    return [c.name + " " + c.description + " " + c.email + " " + c.seniority +
        " ".join([s.name for s in c.soft_skills.all()]) + " " + " ".join([i.name for i in c.industries.all()]) + " " + " ".join([a.name for a in c.areas_of_interest.all()]) + " " + " ".join([t.name for t in c.tech_stacks.all()])]
