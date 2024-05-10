from abc import ABC, abstractmethod

class EmbeddingGenerator(ABC):
    def __init__(self, api_key):
        self.api_key = api_key

    @abstractmethod
    def generate_embedding(self, content, model, task_type, title):
        """
        Generate an embedding for the given content.
        """
        pass
