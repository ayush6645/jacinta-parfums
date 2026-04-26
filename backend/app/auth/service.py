from sqlalchemy.orm import Session
from sqlalchemy import select
from typing import Optional
from app.models.user import User
from app.auth.schemas import UserCreate, UserLogin
from app.auth.utils import get_password_hash, verify_password, create_access_token, create_refresh_token
from fastapi import HTTPException, status

def get_user_by_email(db: Session, email: str) -> Optional[User]:
    return db.execute(select(User).where(User.email == email)).scalar_one_or_none()

def create_user(db: Session, user_in: UserCreate) -> User:
    if get_user_by_email(db, user_in.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists."
        )
    
    db_user = User(
        email=user_in.email,
        name=user_in.name,
        password_hash=get_password_hash(user_in.password),
        phone=user_in.phone
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, user_login: UserLogin) -> User:
    user = get_user_by_email(db, user_login.email)
    if not user or not verify_password(user_login.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    if not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
    return user
