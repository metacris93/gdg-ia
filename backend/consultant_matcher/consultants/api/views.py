import os
from rest_framework import status
from rest_framework.decorators import action
from rest_framework import viewsets
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet
from django.http import JsonResponse
from rest_framework.views import APIView
from pgvector.django import L2Distance

from ai.generators.genai_generator import GenAIGenerator
from ai.generator_factory import GeneratorFactory

from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, \
    Industry, AreaOfInterest, ConsultantEmbedding, Client, Team

from .serializers import ConsultantSerializer, TechStackSerializer, SoftSkillSerializer, \
    IndustrySerializer, AreaOfInterestSerializer, ClientSerializer, TeamSerializer


class ConsultantViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = ConsultantSerializer
    queryset = Consultant.objects.prefetch_related(
        'tech_stacks', 'industries', 'soft_skills', 'areas_of_interest'
    ).all()

    lookup_field = "pk"

    def get_queryset(self):
        queryset = Consultant.objects.prefetch_related(
            'tech_stacks', 'industries', 'soft_skills', 'areas_of_interest'
        ).all()
        return queryset

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer

class IndustryViewSet(viewsets.ModelViewSet):
    queryset = Industry.objects.all()
    serializer_class = IndustrySerializer

    def get_queryset(self):
        industries = Industry.objects.all()
        return industries

class TechStackViewSet(viewsets.ModelViewSet):
    queryset = TechStack.objects.all()
    serializer_class = TechStackSerializer

    def get_queryset(self):
        stacks = TechStack.objects.all()
        return stacks

class AreasOfInterestViewSet(viewsets.ModelViewSet):
    queryset = AreaOfInterest.objects.all()
    serializer_class = AreaOfInterestSerializer

    def get_queryset(self):
        areas = AreaOfInterest.objects.all()
        return areas

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    @action(detail=True, methods=['post'])
    def matches(self, request, pk=None):
        request_body = request.data

        development_levels = ','.join(request_body.get('developmentLevel', []))
        tech_stacks =','.join(request_body.get('techStack', []))
        industries = ','.join(request_body.get('industry', []))
        description = request_body.get('description', '')

        factory = GeneratorFactory()
        factory.register_generator('genai', GenAIGenerator)

        api_key = os.getenv('AI_API_KEY')
        embedding_generator = factory.get_generator('genai', api_key)

        document_payload = development_levels + " " + tech_stacks + " " + industries + " " + description
        document = [document_payload]


        embedding = embedding_generator.generate_embedding(
            content=document,
            task_type="retrieval_query"
        )[0]

        consultant_embeddings = ConsultantEmbedding.objects.order_by(L2Distance('embedding', embedding))[:5]

        consultants = [c.consultant for c in consultant_embeddings]

        serializer = ConsultantSerializer(consultants, many=True)
        return JsonResponse(serializer.data, safe=False)

class SeniorityList(APIView):
    def get(self, request):
        seniorities = Consultant.objects.values_list('seniority', flat=True).distinct()
        return Response(seniorities)
