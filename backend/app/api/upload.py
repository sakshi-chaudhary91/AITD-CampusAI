from fastapi import APIRouter, UploadFile, File
import os
import shutil

from app.core.config import UPLOAD_FOLDER
from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import create_embeddings
from app.services.faiss_service import add_to_faiss_index


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post("/")
async def upload_pdf(file: UploadFile = File(...)):

    # Save PDF inside backend/uploads/
    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    # Extract text from PDF
    extracted_text = extract_text_from_pdf(
        file_path
    )

    # Split text into chunks
    chunks = chunk_text(
        extracted_text
    )

    # Generate embeddings
    embeddings = create_embeddings(
        chunks
    )

    # Add new PDF to existing FAISS index
    # instead of replacing the old index
    index, all_chunks = add_to_faiss_index(
        embeddings,
        chunks
    )

    return {
        "message": "PDF uploaded and processed successfully.",
        "filename": file.filename,
        "saved_path": file_path,
        "new_chunks": len(chunks),
        "total_chunks": len(all_chunks)
    }