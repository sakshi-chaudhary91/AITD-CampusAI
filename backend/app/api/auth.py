from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User
from app.schemas.user import UserCreate, UserLogin

from passlib.context import CryptContext

from jose import jwt
from datetime import datetime, timedelta

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)

pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto"
)

SECRET_KEY = "AITD_CAMPUS_AI_SECRET_KEY"

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES = 60


# ===========================
# Password Hash
# ===========================

def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)


# ===========================
# JWT Token
# ===========================

def create_access_token(data: dict):

    to_encode = data.copy()

    expire = datetime.utcnow() + timedelta(
        minutes=ACCESS_TOKEN_EXPIRE_MINUTES
    )

    to_encode.update({"exp": expire})

    return jwt.encode(
        to_encode,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

# ===========================
# STUDENT SIGNUP
# ===========================

@router.post("/signup")

def signup(user: UserCreate, db: Session = Depends(get_db)):

    # Email already exists
    existing_email = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered."
        )

    # Enrollment already exists
    if user.enrollment_no:

        existing_enrollment = db.query(User).filter(
            User.enrollment_no == user.enrollment_no
        ).first()

        if existing_enrollment:
            raise HTTPException(
                status_code=400,
                detail="Enrollment number already exists."
            )

    new_user = User(

        full_name=user.full_name,

        enrollment_no=user.enrollment_no,

        email=user.email,

        password=hash_password(user.password),

        role="student"

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "Account created successfully."
    }


# ===========================
# LOGIN
# ===========================

@router.post("/login")

def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    if not verify_password(
        user.password,
        db_user.password
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid email or password."
        )

    token = create_access_token({

        "id": db_user.id,

        "email": db_user.email,

        "role": db_user.role

    })

    return {

        "access_token": token,

        "token_type": "bearer",

        "role": db_user.role,

        "full_name": db_user.full_name

    }