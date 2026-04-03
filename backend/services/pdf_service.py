import fitz  # PyMuPDF
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

class PDFService:
    def __init__(self):
        self.embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200,
            length_function=len,
        )

    def extract_text(self, file_path):
        """Extracts text from a PDF file using PyMuPDF."""
        text = ""
        try:
            doc = fitz.open(file_path)
            for page in doc:
                text += page.get_text()
            doc.close()
        except Exception as e:
            print(f"Error extracting text: {e}")
            raise e
        return text

    def create_vector_store(self, text):
        """Creates a searchable vector store from extracted text."""
        chunks = self.text_splitter.split_text(text)
        vector_store = FAISS.from_texts(chunks, self.embeddings)
        return vector_store

    def get_context(self, vector_store, query, k=4):
        """Retrieves relevant context from the vector store based on a query."""
        docs = vector_store.similarity_search(query, k=k)
        context = "\n\n".join([doc.page_content for doc in docs])
        return context

pdf_service = PDFService()
