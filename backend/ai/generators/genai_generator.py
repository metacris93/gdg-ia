import google.generativeai as genai

from .embedding_generator import EmbeddingGenerator

class GenAIGenerator(EmbeddingGenerator):
    def __init__(self, api_key, model='models/embedding-001'):
        super().__init__(api_key)
        genai.configure(api_key=self.api_key)
        self.model = model

    def generate_embedding(self, content, task_type="retrieval_document", title="consultant-filter"):
        embedding_response = genai.embed_content(
            model=self.model,
            content=content,
            task_type=task_type,
            title=title
        )
        return embedding_response["embedding"]
