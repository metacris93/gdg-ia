from rest_framework import serializers

from consultant_matcher.consultants.models import Consultant


class ConsultantSerializer(serializers.ModelSerializer[Consultant]):
    class Meta:
        model = Consultant
        fields = ["name", "email", "description", "seniority"]

        extra_kwargs = {
            "url": {"view_name": "api:consultant-detail", "lookup_field": "pk"},
        }
