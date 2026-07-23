from sqlalchemy.orm import Session

from app.models.admission import Admission
from app.schemas.admission_schema import AdmissionCreate


def create_admission(db: Session, admission: AdmissionCreate):
    new_admission = Admission(
        title=admission.title,
        category=admission.category,
        description=admission.description
    )

    db.add(new_admission)
    db.commit()
    db.refresh(new_admission)

    return new_admission


def get_admissions(db: Session):
    return db.query(Admission).all()