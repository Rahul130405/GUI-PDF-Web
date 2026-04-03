from groq import AsyncGroq
import os
from dotenv import load_dotenv

load_dotenv()

class AIService:
    def __init__(self):
        self.client = AsyncGroq(api_key=os.getenv("GROQ_API_KEY"))
        self.model = "llama-3.1-8b-instant"

    async def generate_response_stream(self, context, query):
        """Generates a streaming response from the Groq API."""
        prompt = f"""
        You are a helpful AI assistant. Answer the user's question ONLY based on the provided document context.
        If the answer is not in the context, say: "I'm sorry, I couldn't find information about that in the uploaded document."
        
        CONTEXT:
        {context}
        
        USER QUESTION:
        {query}
        
        ANSWER:
        """
        
        try:
            stream = await self.client.chat.completions.create(
                messages=[
                    {"role": "user", "content": prompt}
                ],
                model=self.model,
                stream=True,
            )
            
            async for chunk in stream:
                content = chunk.choices[0].delta.content
                if content:
                    yield content
        except Exception as e:
            print(f"Error in Groq stream: {e}")
            yield f"Error: {str(e)}"

ai_service = AIService()
