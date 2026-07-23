from pydantic import BaseModel


class AdmissionCreate(BaseModel):
    title: str
    category: str
    description: str


class AdmissionResponse(AdmissionCreate):
    id: int

    class Config:
        from_attributes = True