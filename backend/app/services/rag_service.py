from app.services.embedding_service import create_embeddings
from app.services.faiss_service import (
    load_index,
    search_index
)
from app.services.gemini_service import get_gemini_response


def retrieve_context(question: str):

    index, chunks = load_index()

    query_embedding = create_embeddings([question])[0]

    results = search_index(
        index,
        query_embedding,
        chunks,
        top_k=4
    )

    return "\n\n".join(results)


def ask_question(question: str):

    context = retrieve_context(question)

    return get_gemini_response(
        context,
        question
    )