from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from services.pdf_service import pdf_service
from services.ai_service import ai_service
import shutil
import os
import uuid

app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global store for vector stores (in-memory for demo, should be Redis/Persistent for prod)
vector_stores = {}

@app.post("/upload")
async def upload_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    temp_path = f"temp_{uuid.uuid4()}.pdf"
    try:
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        text = pdf_service.extract_text(temp_path)
        vector_store = pdf_service.create_vector_store(text)
        
        doc_id = str(uuid.uuid4())
        vector_stores[doc_id] = vector_store
        
        return {"doc_id": doc_id, "filename": file.filename}
    finally:
        if os.path.exists(temp_path):
            os.remove(temp_path)

@app.get("/chat-stream")
async def chat_stream(doc_id: str, query: str):
    if doc_id not in vector_stores:
        raise HTTPException(status_code=404, detail="Document not found")
    
    vector_store = vector_stores[doc_id]
    context = pdf_service.get_context(vector_store, query)

    async def event_generator():
        async for chunk in ai_service.generate_response_stream(context, query):
            yield f"data: {chunk}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
