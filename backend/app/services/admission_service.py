from sqlalchemy.orm import Session

from app.models.admission import Admission
from app.schemas.admission_schema import AdmissionCreate


def create_admission(
    db: Session,
    admission: AdmissionCreate
):
    new_admission = Admission(
        title=admission.applicant_name,
        category="Admission",
        description=(
            f"Admission application submitted by "
            f"{admission.applicant_name}"
        ),

        applicant_name=admission.applicant_name,
        email=admission.email,
        course=admission.course,
        admission_year=admission.admission_year,
        status=admission.status
    )

    db.add(new_admission)
    db.commit()
    db.refresh(new_admission)

    return new_admission


def get_admissions(db: Session):
    return (
        db.query(Admission)
        .order_by(Admission.id.desc())
        .all()
    )


def update_admission(
    db: Session,
    admission_id: int,
    admission: AdmissionCreate
):
    existing_admission = (
        db.query(Admission)
        .filter(Admission.id == admission_id)
        .first()
    )

    if not existing_admission:
        return None

    existing_admission.title = admission.applicant_name
    existing_admission.category = "Admission"
    existing_admission.description = (
        f"Admission application submitted by "
        f"{admission.applicant_name}"
    )

    existing_admission.applicant_name = admission.applicant_name
    existing_admission.email = admission.email
    existing_admission.course = admission.course
    existing_admission.admission_year = admission.admission_year
    existing_admission.status = admission.status

    db.commit()
    db.refresh(existing_admission)

    return existing_admission


def update_admission_status(
    db: Session,
    admission_id: int,
    status: str
):
    existing_admission = (
        db.query(Admission)
        .filter(Admission.id == admission_id)
        .first()
    )

    if not existing_admission:
        return None

    existing_admission.status = status

    db.commit()
    db.refresh(existing_admission)

    return existing_admission


def delete_admission(
    db: Session,
    admission_id: int
):
    existing_admission = (
        db.query(Admission)
        .filter(Admission.id == admission_id)
        .first()
    )

    if not existing_admission:
        return None

    db.delete(existing_admission)
    db.commit()

    return existing_admission