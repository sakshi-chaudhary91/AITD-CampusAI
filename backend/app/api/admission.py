from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.admission_schema import (
    AdmissionCreate,
    AdmissionResponse
)

from app.services.admission_service import (
    create_admission,
    get_admissions,
    update_admission,
    update_admission_status,
    delete_admission
)


router = APIRouter(
    prefix="/admissions",
    tags=["Admissions"]
)


@router.post(
    "/",
    response_model=AdmissionResponse
)
def add_admission(
    admission: AdmissionCreate,
    db: Session = Depends(get_db)
):
    return create_admission(
        db,
        admission
    )


@router.get(
    "/",
    response_model=list[AdmissionResponse]
)
def read_admissions(
    db: Session = Depends(get_db)
):
    return get_admissions(db)


@router.put(
    "/{admission_id}",
    response_model=AdmissionResponse
)
def edit_admission(
    admission_id: int,
    admission: AdmissionCreate,
    db: Session = Depends(get_db)
):
    updated_admission = update_admission(
        db,
        admission_id,
        admission
    )

    if not updated_admission:
        raise HTTPException(
            status_code=404,
            detail="Admission not found."
        )

    return updated_admission


@router.patch(
    "/{admission_id}/status",
    response_model=AdmissionResponse
)
def change_admission_status(
    admission_id: int,
    status: str,
    db: Session = Depends(get_db)
):
    allowed_statuses = [
        "Pending",
        "Approved",
        "Rejected"
    ]

    if status not in allowed_statuses:
        raise HTTPException(
            status_code=400,
            detail="Invalid admission status."
        )

    updated_admission = update_admission_status(
        db,
        admission_id,
        status
    )

    if not updated_admission:
        raise HTTPException(
            status_code=404,
            detail="Admission not found."
        )

    return updated_admission


@router.delete("/{admission_id}")
def remove_admission(
    admission_id: int,
    db: Session = Depends(get_db)
):
    deleted_admission = delete_admission(
        db,
        admission_id
    )

    if not deleted_admission:
        raise HTTPException(
            status_code=404,
            detail="Admission not found."
        )

    return {
        "message": "Admission deleted successfully.",
        "id": admission_id
    }