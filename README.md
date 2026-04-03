
# Premium PDF-AI SaaS Application

A modern, full-stack AI application that allows users to upload PDFs and chat with them in real-time. Built with Next.js, FastAPI, and Groq (Llama-3.1).

## 🚀 Features
- **Modern UI/UX**: Dark mode, glassmorphism design, and smooth animations with Framer Motion.
- **RAG Engine**: Powered by LangChain and FAISS for accurate context retrieval.
- **Fast Inference**: Uses Groq SDK for near-instant Llama-3.1 responses.
- **Real-time Streaming**: Token-by-token response streaming via SSE.
- **Responsive**: Fully functional on desktop and mobile.

---

## 🛠 Tech Stack
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion, Lucide Icons, Zustand.
- **Backend**: FastAPI, PyMuPDF, LangChain, FAISS, Groq SDK.
- **Models**: Llama-3.1-8b (via Groq).

---

## 📦 Setup Instructions

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Create a `.env` file in the `backend` directory:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```
4. Run the server:
   ```bash
   python main.py
   ```

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 🌍 Deployment Guide

### Backend (Render / Railway)
1. Push the `backend` directory to GitHub.
2. Create a new "Web Service" on Render.
3. Use `python main.py` as the start command or `gunicorn -k uvicorn.workers.UvicornWorker main:app`.
4. Add `GROQ_API_KEY` to environment variables.

### Frontend (Vercel)
1. Push the `frontend` directory to GitHub.
2. Connect the repository to Vercel.
3. Set the environment variable `NEXT_PUBLIC_API_URL` to your backend URL.
4. Vercel will automatically build and deploy.

---

## ⚠️ Security Note
Ensure your `GROQ_API_KEY` is never committed to version control. Use `.env` files locally and secure environment variables in production.
