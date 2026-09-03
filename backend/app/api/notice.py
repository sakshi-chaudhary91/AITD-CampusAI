from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.notice_schema import NoticeCreate, NoticeResponse
from app.services.notice_service import (
    create_notice,
    get_notices,
    update_notice,
    delete_notice
)


router = APIRouter(
    prefix="/notices",
    tags=["Notices"]
)


# ==========================================
# CREATE NOTICE
# ==========================================

@router.post("/", response_model=NoticeResponse)
def add_notice(
    notice: NoticeCreate,
    db: Session = Depends(get_db)
):

    return create_notice(db, notice)


# ==========================================
# GET ALL NOTICES
# ==========================================

@router.get("/", response_model=list[NoticeResponse])
def read_notices(
    db: Session = Depends(get_db)
):

    return get_notices(db)


# ==========================================
# UPDATE NOTICE
# ==========================================

@router.put("/{notice_id}", response_model=NoticeResponse)
def edit_notice(
    notice_id: int,
    notice: NoticeCreate,
    db: Session = Depends(get_db)
):

    updated_notice = update_notice(
        db,
        notice_id,
        notice
    )

    if not updated_notice:

        raise HTTPException(
            status_code=404,
            detail="Notice not found."
        )

    return updated_notice


# ==========================================
# DELETE NOTICE
# ==========================================

@router.delete("/{notice_id}")
def remove_notice(
    notice_id: int,
    db: Session = Depends(get_db)
):

    deleted_notice = delete_notice(
        db,
        notice_id
    )

    if not deleted_notice:

        raise HTTPException(
            status_code=404,
            detail="Notice not found."
        )

    return {
        "message": "Notice deleted successfully.",
        "id": deleted_notice.id
    }