from consultant_matcher.consultants.models import ConsultantEmbedding

class ConsultantEmbedder:
    def __init__(self, embedding_generator):
        self.embedding_generator = embedding_generator

    def generate_and_save_embedding(self, consultant):
        document = self._get_document_from_consultant(consultant)
        content = self.embedding_generator.generate_embedding(
            content=document,
            task_type="retrieval_document",
            title='consultant-filter'
        )
        ConsultantEmbedding.objects.create(consultant=consultant, content=document, embedding=content)

    def _get_document_from_consultant(self, consultant):
        return " ".join([
            consultant.name,
            consultant.description,
            consultant.email,
            consultant.seniority,
            " ".join([skill.name for skill in consultant.soft_skills.all()]),
            " ".join([industry.name for industry in consultant.industries.all()]),
            " ".join([interest.name for interest in consultant.areas_of_interest.all()]),
            " ".join([tech.name for tech in consultant.tech_stacks.all()])
        ])
