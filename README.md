# 📄 InsightPDF: AI-Powered Document Intelligence

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/Groq-f55036?style=for-the-badge&logo=groq&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge" />
</p>

---

### 🚀 Transform static PDFs into interactive conversations.
**InsightPDF** is a high-performance RAG (Retrieval-Augmented Generation) application that allows users to upload complex documents and query them in real-time. Powered by **Groq's LPL (Language Processing Unit)** and **LLaMA 3**, it delivers near-instant AI responses with deep contextual understanding.

---

## 🔥 Key Highlights

- **⚡ Lightning Fast Inference:** Leverages Groq's API for sub-second response times using LLaMA 3.
- **🧠 Intelligent RAG Pipeline:** Uses LangChain and FAISS for efficient vector similarity search.
- **🎨 Modern UX/UI:** A sleek, responsive interface built with Next.js 14, Tailwind CSS, and Framer Motion.
- **📂 Multi-Page Context:** Extracts and processes text from large PDFs while maintaining structural context.
- **🔒 Privacy First:** Documents are processed securely and stored in-memory for session-based privacy.

---

## 🧠 Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion, Zustand |
| **Backend** | FastAPI (Python), Uvicorn, Pydantic |
| **AI / ML** | Groq API (LLaMA 3.1 8B), LangChain, HuggingFace Embeddings |
| **Vector DB** | FAISS (Facebook AI Similarity Search) |
| **PDF Engine** | PyMuPDF (fitz) |

---

## ⚙️ Installation & Setup

### 1. Prerequisites
- Python 3.9+
- Node.js 18+
- Groq API Key ([Get one here](https://console.groq.com/))

### 2. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/scripts/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Frontend Setup
```bash
cd frontend
npm install
```

### 4. Environment Configuration
Create a `.env` file in the root directory:
```env
GROQ_API_KEY=your_api_key_here
```

---

## 🌐 Running the Application

1. **Start Backend:**
   ```bash
   cd backend
   python main.py
   ```
2. **Start Frontend:**
   ```bash
   cd frontend
   npm run dev
   ```
3. **Access the App:** Open `http://localhost:3000` in your browser.

---

## 💡 Future Roadmap
- [ ] Support for multiple file uploads (Batch Processing).
- [ ] OCR integration for scanned/image-based PDFs.
- [ ] Export chat history to PDF/Markdown.
- [ ] Deployment via Docker & AWS/Vercel.

---

## 👨‍💻 Author
**Rahul Raj Jaiswal**
- GitHub: [@Rahul130405](https://github.com/Rahul130405)
- LinkedIn: [Rahul Raj Jaiswal](https://www.linkedin.com/in/rahulrajjaiswal/)
- Portfolio: [Your Portfolio Link]

---

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.


