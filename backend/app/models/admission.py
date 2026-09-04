from sqlalchemy import Column, Integer, String, Text
from datetime import datetime

from app.database.database import Base


class Admission(Base):
    __tablename__ = "admissions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    # Old database columns
    title = Column(
        String,
        nullable=False
    )

    category = Column(
        String,
        nullable=False
    )

    description = Column(
        Text,
        nullable=False
    )

    # New admission fields
    applicant_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        nullable=False
    )

    course = Column(
        String,
        nullable=False
    )

    admission_year = Column(
        String,
        nullable=False
    )

    status = Column(
        String,
        default="Pending",
        nullable=False
    )

    created_at = Column(
        String,
        default=lambda: datetime.utcnow().strftime(
            "%Y-%m-%d %H:%M:%S"
        )
    )