# 🎓 AITD Smart Campus Assistant

An AI-powered Smart Campus Assistant built using **FastAPI**, **FAISS**, **Sentence Transformers**, and **Google Gemini API**. The system uses **Retrieval-Augmented Generation (RAG)** to answer user queries based on uploaded college documents.

---

## ✨ Features

- 📄 Upload PDF documents
- 📚 Extract text from PDFs
- ✂️ Automatic text chunking
- 🧠 Generate embeddings using Sentence Transformers
- 🔍 Semantic search with FAISS
- 🤖 AI-powered answers using Google Gemini
- ⚡ FastAPI REST APIs
- 📖 Interactive Swagger Documentation

---

## 🛠 Tech Stack

**Backend**
- Python
- FastAPI
- Uvicorn

**AI / ML**
- Google Gemini API
- Sentence Transformers
- FAISS

**Database**
- SQLite
- SQLAlchemy

**Document Processing**
- PyMuPDF (fitz)

---

## 📂 Project Structure

```text
AITD CampusAI/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── database/
│   │   ├── models/
│   │   ├── services/
│   │   └── main.py
│   │
│   ├── uploads/
│   ├── vector_store/
│   ├── requirements.txt
│   ├── .env
│   ├── .gitignore
│   └── README.md
│
└── frontend/   
```

---

## ⚙️ Installation

### 1. Clone Repository

```bash
git clone https://github.com/sakshi-chaudhary91/AITD-CampusAI.git
cd AITD-CampusAI
```

### 2. Create Virtual Environment

```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows**

```bash
venv\Scripts\activate
```

**Linux / macOS**

```bash
source venv/bin/activate
```

### 4. Install Dependencies

```bash
pip install -r requirements.txt
```

### 5. Create `.env`

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

### 6. Run Server

```bash
uvicorn app.main:app --reload
```

Server:

```
http://127.0.0.1:8000
```

Swagger UI:

```
http://127.0.0.1:8000/docs
```

---

## 📌 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Home |
| POST | `/upload` | Upload PDF |
| GET | `/chatbot/search` | Retrieve relevant context |
| GET | `/chatbot/ask` | Generate AI response |
| CRUD | `/student` | Student APIs |
| CRUD | `/admission` | Admission APIs |
| CRUD | `/notice` | Notice APIs |

---

## 🔄 RAG Workflow

```text
PDF Upload
     │
     ▼
Text Extraction
     │
     ▼
Chunking
     │
     ▼
Embeddings
     │
     ▼
FAISS Vector Store
     │
     ▼
Semantic Search
     │
     ▼
Gemini AI
     │
     ▼
Final Response
```

---

## 🚀 Future Improvements

- Multiple PDF Support
- Source Citations
- Chat History
- Authentication
- Admin Dashboard
- Frontend Integration
- Docker Deployment
- Cloud Deployment

---

## 👩‍💻 Author

**Sakshi Chaudhary**

B.Tech CSE (AI & ML)

Dr. Ambedkar Institute of Technology for Divyangjan

---


This project is developed for learning and academic purposes.