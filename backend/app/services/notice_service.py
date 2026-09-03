from sqlalchemy.orm import Session

from app.models.notice import Notice
from app.schemas.notice_schema import NoticeCreate


# ==========================================
# CREATE NOTICE
# ==========================================

def create_notice(
    db: Session,
    notice: NoticeCreate
):

    new_notice = Notice(
        title=notice.title,
        category=notice.category,
        description=notice.description
    )

    db.add(new_notice)
    db.commit()
    db.refresh(new_notice)

    return new_notice


# ==========================================
# GET ALL NOTICES
# ==========================================

def get_notices(
    db: Session
):

    return db.query(Notice).all()


# ==========================================
# UPDATE NOTICE
# ==========================================

def update_notice(
    db: Session,
    notice_id: int,
    notice: NoticeCreate
):

    existing_notice = (
        db.query(Notice)
        .filter(Notice.id == notice_id)
        .first()
    )

    if not existing_notice:
        return None

    existing_notice.title = notice.title
    existing_notice.category = notice.category
    existing_notice.description = notice.description

    db.commit()
    db.refresh(existing_notice)

    return existing_notice


# ==========================================
# DELETE NOTICE
# ==========================================

def delete_notice(
    db: Session,
    notice_id: int
):

    existing_notice = (
        db.query(Notice)
        .filter(Notice.id == notice_id)
        .first()
    )

    if not existing_notice:
        return None

    db.delete(existing_notice)
    db.commit()

    return existing_notice