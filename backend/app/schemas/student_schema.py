from pydantic import BaseModel


class StudentCreate(BaseModel):
    name: str
    roll_no: str
    email: str
    branch: str