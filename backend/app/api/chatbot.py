from fastapi import APIRouter

from app.services.rag_service import ask_question
from app.services.rag_service import retrieve_context


router = APIRouter(
    prefix="/chatbot",
    tags=["Chatbot"]
)


@router.get("/")
def chatbot_status():
    return {
        "status": "AITD Smart Campus Assistant is running"
    }


@router.get("/ask")
def ask(question: str):
    answer = ask_question(question)

    return {
        "question": question,
        "answer": answer
    }

@router.get("/search")
def search(question: str):
    context = retrieve_context(question)

    return {
        "question": question,
        "retrieved_context": context
    }