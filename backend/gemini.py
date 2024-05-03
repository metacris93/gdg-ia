import google.generativeai as genai
import os
from dotenv import load_dotenv

# chat = model.start_chat(history=[])
# response = chat.send_message("Can you explain about you?")
# print(response.text)
def load_credentials():
  load_dotenv()
  genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

def list_gemini_models():
  load_credentials()
  for m in genai.list_models():
    if 'generateContent' in m.supported_generation_methods:
      print(m.name)

def get_single_response():
  load_credentials()
  question = input("Ingrese la pregunta:")
  model = genai.GenerativeModel(model_name="gemini-pro")
  response = model.generate_content(question)
  print(response.text)

def chat_with_gemini():
  load_credentials()
  model = genai.GenerativeModel(model_name="gemini-pro")
  chat = model.start_chat(history=[])
  while True:
    question = input("You: ")
    response = chat.send_message(question, stream=True)
    for chunk in response:
      print(chunk.text)
      print("_"*80)

def main():
  while True:
    command = input("""
    Enter command:
      1. Get Single Response
      2. Start Chat
      3. Listar Modelos
      4. Exit
    """)
    if command == "1":
      get_single_response()
    elif command == "2":
      chat_with_gemini()
    elif command == "3":
      list_gemini_models()
    elif command == "4":
      break
    else:
      print("Invalid command")

if __name__ == "__main__":
  main()
