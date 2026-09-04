from pydantic import BaseModel
from datetime import datetime


class AdmissionCreate(BaseModel):
    applicant_name: str
    email: str
    course: str
    admission_year: str
    status: str = "Pending"


class AdmissionResponse(AdmissionCreate):
    id: int
    created_at: str

    class Config:
        from_attributes = True