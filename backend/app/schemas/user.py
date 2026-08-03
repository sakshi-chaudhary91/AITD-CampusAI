from pydantic import BaseModel, EmailStr
from typing import Optional


# ===========================
# Signup Request
# ===========================

class UserCreate(BaseModel):
    full_name: str
    enrollment_no: Optional[str] = None
    email: EmailStr
    password: str


# ===========================
# Login Request
# ===========================

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ===========================
# Response
# ===========================

class UserResponse(BaseModel):
    id: int
    full_name: str
    enrollment_no: Optional[str]
    email: EmailStr
    role: str

    class Config:
        from_attributes = True