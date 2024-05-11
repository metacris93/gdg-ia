from rest_framework import serializers

from consultant_matcher.consultants.models import Consultant, TechStack, SoftSkill, Industry, AreaOfInterest, \
    Client, Team


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

class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'

class TeamSerializer(serializers.ModelSerializer):
    client = serializers.PrimaryKeyRelatedField(queryset=Client.objects.all())
    consultants = serializers.PrimaryKeyRelatedField(many=True, queryset=Consultant.objects.all(), required=False, write_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'client', 'consultants']

    def create(self, validated_data):
        consultants_data = validated_data.pop('consultants', [])
        team = Team.objects.create(**validated_data)
        for consultant_data in consultants_data:
            team.consultants.add(consultant_data)
        return team

    def update(self, instance, validated_data):
        consultants = validated_data.pop('consultants', [])
        instance.name = validated_data.get('name', instance.name)

        if consultants:
            instance.consultants.clear()
            instance.consultants.set(consultants)

        instance.save()

        return instance

    def to_representation(self, instance):
        self.fields['client'] = ClientSerializer()
        self.fields['consultants'] = ConsultantSerializer(many=True)

        return super(TeamSerializer, self).to_representation(instance)
