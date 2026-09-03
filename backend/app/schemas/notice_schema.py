from pydantic import BaseModel
from datetime import datetime


class NoticeCreate(BaseModel):
    title: str
    category: str
    description: str


class NoticeResponse(NoticeCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True