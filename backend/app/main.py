from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base, engine
from app.models.student import Student
from app.api.student import router as student_router
from app.api.chatbot import router as chatbot_router
from app.models.admission import Admission
from app.api.admission import router as admission_router
from app.models.notice import Notice
from app.models.document import Document
from app.api.notice import router as notice_router
from app.api.upload import router as upload_router
from app.models.user import User
from app.api.auth import router as auth_router
from app.api.knowledge_base import router as knowledge_base_router


app = FastAPI(
    title="AITD CampusAI",
    description="AI-powered Smart Campus Assistant",
    version="1.0.0"
)


# ===============================
# CORS
# ===============================

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)


# ===============================
# DATABASE
# ===============================

Base.metadata.create_all(bind=engine)


# ===============================
# ROUTERS
# ===============================

app.include_router(student_router)

app.include_router(chatbot_router)

app.include_router(admission_router)

app.include_router(notice_router)

app.include_router(upload_router)

app.include_router(auth_router)
app.include_router(knowledge_base_router)


# ===============================
# HOME
# ===============================

@app.get("/")
def home():

    return {
        "message": "Welcome to AITD Smart Campus Assistant"
    }