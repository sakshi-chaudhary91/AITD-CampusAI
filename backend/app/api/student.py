from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.student_schema import StudentCreate
from app.services.student_service import (
    create_student,
    get_students,
    update_student,
    delete_student
)

router = APIRouter(
    prefix="/students",
    tags=["Students"]
)


@router.post("/")
def add_student(student: StudentCreate, db: Session = Depends(get_db)):
    return create_student(db, student)


@router.get("/")
def read_students(db: Session = Depends(get_db)):
    return get_students(db)


@router.put("/{student_id}")
def edit_student(
    student_id: int,
    student: StudentCreate,
    db: Session = Depends(get_db)
):
    return update_student(db, student_id, student)


@router.delete("/{student_id}")
def remove_student(
    student_id: int,
    db: Session = Depends(get_db)
):
    return delete_student(db, student_id)