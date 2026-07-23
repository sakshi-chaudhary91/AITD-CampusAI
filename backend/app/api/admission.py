from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.admission_schema import AdmissionCreate
from app.services.admission_service import (
    create_admission,
    get_admissions
)

router = APIRouter(
    prefix="/admissions",
    tags=["Admissions"]
)


@router.post("/")
def add_admission(
    admission: AdmissionCreate,
    db: Session = Depends(get_db)
):
    return create_admission(db, admission)


@router.get("/")
def read_admissions(
    db: Session = Depends(get_db)
):
    return get_admissions(db)