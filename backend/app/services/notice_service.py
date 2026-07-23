from sqlalchemy.orm import Session

from app.models.notice import Notice
from app.schemas.notice_schema import NoticeCreate


def create_notice(db: Session, notice: NoticeCreate):
    new_notice = Notice(
        title=notice.title,
        category=notice.category,
        description=notice.description
    )

    db.add(new_notice)
    db.commit()
    db.refresh(new_notice)

    return new_notice


def get_notices(db: Session):
    return db.query(Notice).all()