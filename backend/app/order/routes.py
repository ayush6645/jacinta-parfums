from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.auth.dependencies import get_current_active_user
from app.models.user import User
from app.order import schemas, service
import uuid
from typing import List

router = APIRouter(prefix="/orders", tags=["Order Management"])

@router.post("/checkout", response_model=schemas.OrderOut, status_code=status.HTTP_201_CREATED)
def checkout(
    order_in: schemas.OrderCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Initialize the luxury checkout process.
    Creates a 'pending' order and captures item snapshots.
    """
    return service.create_order_from_cart(db, current_user.id, order_in)

@router.get("/", response_model=List[schemas.OrderOut])
def list_my_orders(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Retrieve your purchase history.
    """
    return service.get_user_orders(db, current_user.id)

@router.get("/{order_id}", response_model=schemas.OrderDetailOut)
def get_order_details(
    order_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Get deep details of a specific order, including historical snapshots.
    """
    return service.get_order_by_id(db, current_user.id, order_id)
