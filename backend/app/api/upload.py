from fastapi import APIRouter, UploadFile, File, Form, Depends, HTTPException
from sqlalchemy.orm import Session

import os
import shutil

from app.core.config import UPLOAD_FOLDER
from app.database.database import get_db
from app.models.document import Document

from app.services.pdf_service import extract_text_from_pdf
from app.services.chunk_service import chunk_text
from app.services.embedding_service import create_embeddings
from app.services.faiss_service import add_to_faiss_index


router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


# ===============================
# UPLOAD PDF
# ===============================

@router.post("/")
async def upload_pdf(
    file: UploadFile = File(...),
    title: str = Form(...),
    category: str = Form(...),
    db: Session = Depends(get_db)
):

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed."
        )

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    try:

        with open(file_path, "wb") as buffer:

            shutil.copyfileobj(
                file.file,
                buffer
            )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=f"Failed to save PDF: {str(e)}"
        )

    file_size = os.path.getsize(file_path)

    document = Document(
        title=title,
        filename=file.filename,
        category=category,
        file_path=file_path,
        file_size=file_size,
        status="Processing",
        chunk_count=0,
        embedding_count=0
    )

    db.add(document)
    db.commit()
    db.refresh(document)

    try:

        # ==========================================
        # EXTRACT TEXT
        # ==========================================

        extracted_text = extract_text_from_pdf(
            file_path
        )


        # ==========================================
        # CREATE CHUNKS
        # ==========================================

        chunks = chunk_text(
            extracted_text
        )

        chunk_count = len(chunks)


        # ==========================================
        # CREATE EMBEDDINGS
        # ==========================================

        embeddings = create_embeddings(
            chunks
        )

        embedding_count = len(embeddings)


        # ==========================================
        # ADD TO FAISS
        # ==========================================

        index, all_chunks = add_to_faiss_index(
            embeddings,
            chunks
        )


        # ==========================================
        # SAVE COUNTS IN DATABASE
        # ==========================================

        document.chunk_count = chunk_count

        document.embedding_count = embedding_count

        document.status = "Processed"

        db.commit()
        db.refresh(document)


        return {
            "message":
                "PDF uploaded and processed successfully.",

            "id":
                document.id,

            "title":
                document.title,

            "filename":
                document.filename,

            "category":
                document.category,

            "file_size":
                document.file_size,

            "status":
                document.status,

            "chunk_count":
                document.chunk_count,

            "embedding_count":
                document.embedding_count,

            "new_chunks":
                len(chunks),

            "total_chunks":
                len(all_chunks)
        }


    except Exception as e:

        document.status = "Failed"

        db.commit()

        raise HTTPException(
            status_code=500,
            detail=f"PDF processing failed: {str(e)}"
        )


# ===============================
# GET ALL DOCUMENTS
# ===============================

@router.get("/")
def get_documents(
    db: Session = Depends(get_db)
):

    documents = (
        db.query(Document)
        .order_by(Document.uploaded_at.desc())
        .all()
    )

    return [

        {
            "id":
                document.id,

            "title":
                document.title,

            "filename":
                document.filename,

            "category":
                document.category,

            "file_size":
                document.file_size,

            "status":
                document.status,

            "chunk_count":
                document.chunk_count,

            "embedding_count":
                document.embedding_count,

            "uploaded_at":
                document.uploaded_at
        }

        for document in documents

    ]


# ===============================
# GET PDF STATS
# ===============================

@router.get("/stats")
def get_pdf_stats(
    db: Session = Depends(get_db)
):

    documents = db.query(Document).all()


    # ==========================================
    # TOTAL PDFS
    # ==========================================

    total_pdfs = len(documents)


    # ==========================================
    # PROCESSED
    # ==========================================

    processed = sum(
        1
        for document in documents
        if document.status == "Processed"
    )


    # ==========================================
    # PROCESSING
    # ==========================================

    processing = sum(
        1
        for document in documents
        if document.status == "Processing"
    )


    # ==========================================
    # FAILED
    # ==========================================

    failed = sum(
        1
        for document in documents
        if document.status == "Failed"
    )


    # ==========================================
    # STORAGE
    # ==========================================

    total_storage = sum(
        document.file_size
        for document in documents
        if document.file_size
    )


    return {

        "total_pdfs":
            total_pdfs,

        "processed":
            processed,

        "processing":
            processing,

        "failed":
            failed,

        "storage_bytes":
            total_storage

    }