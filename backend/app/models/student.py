from sqlalchemy import Column, Integer, String

from app.database.database import Base


class Student(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    roll_no = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    branch = Column(String, nullable=False)