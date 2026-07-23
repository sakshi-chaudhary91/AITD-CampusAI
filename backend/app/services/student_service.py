from sqlalchemy.orm import Session

from app.models.student import Student
from app.schemas.student_schema import StudentCreate


def create_student(db: Session, student: StudentCreate):
    new_student = Student(
        name=student.name,
        roll_no=student.roll_no,
        email=student.email,
        branch=student.branch
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return new_student


def get_students(db: Session):
    return db.query(Student).all()

def update_student(db: Session, student_id: int, student: StudentCreate):
    existing_student = db.query(Student).filter(Student.id == student_id).first()

    if not existing_student:
        return None

    existing_student.name = student.name
    existing_student.roll_no = student.roll_no
    existing_student.email = student.email
    existing_student.branch = student.branch

    db.commit()
    db.refresh(existing_student)

    return existing_student

def delete_student(db: Session, student_id: int):
    student = db.query(Student).filter(Student.id == student_id).first()

    if not student:
        return {"message": "Student not found"}

    db.delete(student)
    db.commit()

    return {"message": "Student deleted successfully"}