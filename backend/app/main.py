from fastapi import FastAPI

from app.database.database import Base, engine
from app.models.student import Student
from app.api.student import router as student_router
from app.api.chatbot import router as chatbot_router
from app.models.admission import Admission
from app.api.admission import router as admission_router
from app.models.notice import Notice
from app.api.notice import router as notice_router
from app.api.upload import router as upload_router

app = FastAPI(
    title="AITD CampusAI",
    description="AI-powered Smart Campus Assistant",
    version="1.0.0"
)

Base.metadata.create_all(bind=engine)

app.include_router(student_router)
app.include_router(chatbot_router)
app.include_router(admission_router)
app.include_router(notice_router)
app.include_router(upload_router)


@app.get("/")
def home():
    return {
        "message": "Welcome to AITD Smart Campus Assistant 🚀"
    }