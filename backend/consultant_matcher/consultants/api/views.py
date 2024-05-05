from rest_framework import status
from rest_framework.decorators import action
from rest_framework.mixins import ListModelMixin
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.mixins import UpdateModelMixin
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, \
    Industry, AreaOfInterest, ConsultantEmbedding

from .serializers import ConsultantSerializer


class ConsultantViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = ConsultantSerializer
    queryset = Consultant.objects.all()
    lookup_field = "pk"
