class GeneratorFactory:
    def __init__(self):
        self.generators = {}

    def register_generator(self, key, generator):
        self.generators[key] = generator

    def get_generator(self, key, api_key):
        generator_class = self.generators.get(key)
        if not generator_class:
            raise ValueError(f"No generator registered under '{key}'")
        return generator_class(api_key)
