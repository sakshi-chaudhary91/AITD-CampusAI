from pydantic import BaseModel


class NoticeCreate(BaseModel):
    title: str
    category: str
    description: str


class NoticeResponse(NoticeCreate):
    id: int

    class Config:
        from_attributes = True