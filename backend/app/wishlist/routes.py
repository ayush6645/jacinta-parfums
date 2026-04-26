from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.auth.dependencies import get_current_active_user
from app.models.user import User
from app.wishlist import schemas, service
import uuid

router = APIRouter(prefix="/wishlist", tags=["Wishlist"])

@router.get("/", response_model=schemas.WishlistOut)
def get_wishlist(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_active_user)
):
    """
    Retrieve your curated luxury perfume collection.
    """
    return service.get_or_create_wishlist(db, current_user.id)

@router.post("/add/{product_id}", response_model=schemas.WishlistOut)
def add_item(
    product_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Save a signature fragrance to your personal collection.
    """
    return service.add_to_wishlist(db, current_user.id, product_id)

@router.delete("/{product_id}", response_model=schemas.WishlistOut)
def remove_item(
    product_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Remove a fragrance from your wishlist.
    """
    return service.remove_from_wishlist(db, current_user.id, product_id)
