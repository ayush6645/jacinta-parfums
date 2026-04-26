from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.auth.schemas import UserCreate, UserLogin, Token, UserOut
from app.auth import service
from app.auth.utils import create_access_token, create_refresh_token

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserOut, status_code=status.HTTP_201_CREATED)
def register(user_in: UserCreate, db: Session = Depends(get_db)):
    """
    Register a new user in the Jacinta luxury perfume platform.
    """
    return service.create_user(db, user_in)

@router.post("/login", response_model=Token)
def login(user_login: UserLogin, db: Session = Depends(get_db)):
    """
    Authenticate a user and return access/refresh tokens.
    """
    user = service.authenticate_user(db, user_login)
    
    access_token = create_access_token(subject=user.id)
    refresh_token = create_refresh_token(subject=user.id)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/refresh", response_model=Token)
def refresh_token(refresh_token: str, db: Session = Depends(get_db)):
    """
    Issue a new access token using a valid refresh token.
    """
    # Logic to decode and verify refresh token would go here
    # For now, this is a placeholder for the full refresh flow
    pass
