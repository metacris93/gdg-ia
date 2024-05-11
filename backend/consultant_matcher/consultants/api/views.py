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

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

    @action(detail=True, methods=['post'])
    def matches(self, request, pk=None):
        consultants = Consultant.objects.prefetch_related(
            'tech_stacks', 'industries', 'soft_skills', 'areas_of_interest'
        ).all()
        serializer = ConsultantSerializer(consultants, many=True)
        return JsonResponse(serializer.data, safe=False)

class SeniorityList(APIView):
    def get(self, request):
        seniorities = Consultant.objects.values_list('seniority', flat=True).distinct()
        return Response(seniorities)
