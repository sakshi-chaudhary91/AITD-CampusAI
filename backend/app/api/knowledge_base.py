from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

import os
import pickle
import faiss

from app.database.database import get_db
from app.models.document import Document
from app.core.config import VECTOR_STORE_PATH


router = APIRouter(
    prefix="/knowledge-base",
    tags=["Knowledge Base"]
)


# ==========================================
# KNOWLEDGE BASE OVERVIEW
# ==========================================

@router.get("/")
def get_knowledge_base(
    db: Session = Depends(get_db)
):

    documents = (
        db.query(Document)
        .order_by(Document.uploaded_at.desc())
        .all()
    )


    # ==========================================
    # TOTAL DOCUMENTS
    # ==========================================

    total_documents = len(documents)


    # ==========================================
    # TOTAL CHUNKS
    # ==========================================

    total_chunks = sum(
        document.chunk_count or 0
        for document in documents
    )


    # ==========================================
    # TOTAL EMBEDDINGS
    # ==========================================

    total_embeddings = sum(
        document.embedding_count or 0
        for document in documents
    )


    # ==========================================
    # FALLBACK FOR OLD DATA
    # ==========================================

    # Agar database mein old documents hain
    # jinke counts 0 hain, to overall FAISS
    # count se total embeddings recover karenge.

    index_file = os.path.join(
        VECTOR_STORE_PATH,
        "faiss_index.bin"
    )

    if total_embeddings == 0:

        if os.path.exists(index_file):

            try:

                index = faiss.read_index(
                    index_file
                )

                total_embeddings = index.ntotal

            except Exception:

                total_embeddings = 0


    # ==========================================
    # FALLBACK TOTAL CHUNKS
    # ==========================================

    chunks_file = os.path.join(
        VECTOR_STORE_PATH,
        "chunks.pkl"
    )

    if total_chunks == 0:

        if os.path.exists(chunks_file):

            try:

                with open(
                    chunks_file,
                    "rb"
                ) as file:

                    chunks = pickle.load(file)

                if isinstance(chunks, list):

                    total_chunks = len(chunks)

            except Exception:

                total_chunks = 0


    # ==========================================
    # INDEX HEALTH
    # ==========================================

    index_health = 100.0

    if total_chunks > 0:

        index_health = (
            total_embeddings /
            total_chunks
        ) * 100

        index_health = min(
            index_health,
            100
        )


    # ==========================================
    # LAST UPDATED
    # ==========================================

    last_updated = None

    if documents:

        last_updated = documents[0].uploaded_at


    # ==========================================
    # KNOWLEDGE SOURCES
    # ==========================================

    sources = []

    for document in documents:

        sources.append({

            "id":
                document.id,

            "title":
                document.title,

            "filename":
                document.filename,

            "category":
                document.category,

            "chunks":
                document.chunk_count or 0,

            "embeddings":
                document.embedding_count or 0,

            "uploaded_at":
                document.uploaded_at,

            "status":
                document.status

        })


    # ==========================================
    # RESPONSE
    # ==========================================

    return {

        "total_documents":
            total_documents,

        "total_chunks":
            total_chunks,

        "total_embeddings":
            total_embeddings,

        "index_health":
            round(
                index_health,
                1
            ),

        "last_updated":
            last_updated,

        "vector_database":
            "FAISS",

        "embedding_model":
            "Sentence Transformer",

        "index_file":
            "faiss_index.bin",

        "sources":
            sources

    }