from rest_framework import serializers

from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, Industry, AreaOfInterest

class TechStackSerializer(serializers.ModelSerializer):
    class Meta:
        model = TechStack
        fields = ('id', 'name')

class IndustrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Industry
        fields = ('id', 'name')

class SoftSkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = SoftSkill
        fields = ('id', 'name')

class AreaOfInterestSerializer(serializers.ModelSerializer):
    class Meta:
        model = AreaOfInterest
        fields = ('id', 'name')


class ConsultantSerializer(serializers.ModelSerializer[Consultant]):
    class Meta:
        model = Consultant
        fields = '__all__'

    tech_stacks = TechStackSerializer(many=True, read_only=True)
    industries = IndustrySerializer(many=True, read_only=True)
    soft_skills = SoftSkillSerializer(many=True, read_only=True)
    areas_of_interest = AreaOfInterestSerializer(many=True, read_only=True)

    extra_kwargs = {
        "url": {"view_name": "api:consultant-detail", "lookup_field": "pk"},
    }

