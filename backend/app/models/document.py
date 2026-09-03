from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime

from app.database.database import Base


class Document(Base):

    __tablename__ = "documents"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    title = Column(
        String,
        nullable=False
    )

    filename = Column(
        String,
        nullable=False
    )

    category = Column(
        String,
        nullable=False
    )

    file_path = Column(
        String,
        nullable=False
    )

    file_size = Column(
        Integer,
        nullable=False
    )

    status = Column(
        String,
        default="Processing"
    )

    # ==========================================
    # KNOWLEDGE BASE COUNTS
    # ==========================================

    chunk_count = Column(
        Integer,
        default=0
    )

    embedding_count = Column(
        Integer,
        default=0
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )