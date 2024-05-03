import google.generativeai as genai
from dotenv import load_dotenv
import os
from langchain_core.prompts import PromptTemplate
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_community.document_loaders import PyPDFDirectoryLoader
# from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.text_splitter import CharacterTextSplitter
from langchain_chroma import Chroma
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain

def load_credentials():
    load_dotenv()
    genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

def load_models():
    load_credentials()
    llm = ChatGoogleGenerativeAI(model="gemini-pro")
    embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
    return llm, embeddings

def get_text_splitter():
    return CharacterTextSplitter(
		separator="\n\n",
  	    chunk_size=250,
   	    chunk_overlap=50,
        length_function=len,
        is_separator_regex=False,
	)

def main():
    llm, embeddings = load_models()
    loader = PyPDFDirectoryLoader("langchain-pdfs")
    text_splitter = get_text_splitter()
    pages = loader.load_and_split(text_splitter)
    vectordb = Chroma.from_documents(pages, embeddings)
    retriever = vectordb.as_retriever(search_kwargs={"k": 2})
    template = """
    You are a helpful AI assistant.
    Answer based on the context provided.
    context: {context}
    input: {input}
    answer:
    """
    prompt = PromptTemplate.from_template(template)
    combine_docs_chain = create_stuff_documents_chain(llm, prompt)
    retrieval_chain = create_retrieval_chain(retriever, combine_docs_chain)
    response = retrieval_chain.invoke({"input": "explain me about the Breach of Condition"})
    print(response["answer"])

if __name__ == "__main__":
    main()
