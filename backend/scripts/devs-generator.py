import csv
import random

seniorities = ['senior', 'junior', 'consultant']

soft_skills = ['leadership', 'teamwork', 'communication', 'emotional intelligence', 'problem solving']

technologies = [
    # Programming Languages
    "JavaScript", "Python", "Java", "C#", "Ruby", "PHP", "Go", "Rust", "TypeScript", "Swift", "Kotlin", "Scala",
    # Web Development
    "React", "Angular", "Vue.js", "Node.js", "Django", "Flask", "Spring Boot", "ASP.NET", "Laravel", "Ruby on Rails",
    # Mobile Development
    "Swift (iOS)", "Kotlin (Android)", "React Native", "Flutter", "Xamarin",
    # Databases
    "MySQL", "PostgreSQL", "MongoDB", "Redis", "Oracle Database", "Microsoft SQL Server", "Cassandra",
    # DevOps Tools
    "Docker", "Kubernetes", "Ansible", "Terraform", "Jenkins", "Git", "AWS", "Azure", "Google Cloud Platform",
    # AI and Machine Learning
    "TensorFlow", "PyTorch", "Keras", "Scikit-learn", "Pandas", "NumPy",
    # Miscellaneous
    "GraphQL", "Apache Kafka", "Elasticsearch", "RabbitMQ", "Selenium"
]

years_range = (1, 10)

interests = ['web', 'mobile', 'infrastructure', 'cloud', 'AI']

def generate_tech_stack():
    """Generates a list of tuples with technology and years of experience."""
    tech_stack = []
    num_techs = random.randint(1, len(technologies))
    for tech in random.sample(technologies, num_techs):
        tech_stack.append((tech, random.randint(*years_range)))
    return tech_stack

def generate_interests():
    """Generates a tuple of interests."""
    num_interests = random.randint(1, len(interests))
    return tuple(random.sample(interests, num_interests))

def generate_soft_skills():
    """Generates a tuple of soft skills."""
    num_skills = random.randint(1, len(soft_skills))
    return tuple(random.sample(soft_skills, num_skills))

def main():
    with open('developers.csv', 'w', newline='') as file:
        writer = csv.writer(file)
        writer.writerow(['seniority', 'soft_skills', 'tech_stack', 'interest'])

        for _ in range(100):
            seniority = random.choice(seniorities)
            skills = generate_soft_skills()
            tech_stack = generate_tech_stack()
            interest = generate_interests()

            writer.writerow([seniority, skills, tech_stack, interest])

if __name__ == '__main__':
    main()
