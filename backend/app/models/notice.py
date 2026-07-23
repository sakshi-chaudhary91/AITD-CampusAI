from sqlalchemy import Column, Integer, String, Text

from app.database.database import Base


class Notice(Base):
    __tablename__ = "notices"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)
    description = Column(Text, nullable=False)