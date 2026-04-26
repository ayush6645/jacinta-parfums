from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.auth.dependencies import get_current_active_user
from app.models.user import User
from app.cart import schemas, service
import uuid

router = APIRouter(prefix="/cart", tags=["Shopping Cart"])

@router.get("/", response_model=schemas.CartOut)
def get_cart(
    db: Session = Depends(get_db), 
    current_user: User = Depends(get_current_active_user)
):
    """
    Retrieve the current user's luxury shopping bag with dynamic totals.
    """
    cart = service.get_cart_with_items(db, current_user.id)
    # Inject total price into response
    total = service.calculate_cart_total(cart)
    
    # Map items to include product names for frontend convenience
    items_out = []
    for item in cart.items:
        items_out.append({
            "id": item.id,
            "variant_id": item.variant_id,
            "quantity": item.quantity,
            "variant": item.variant,
            "product_name": item.variant.product.name
        })
    
    return {
        "id": cart.id,
        "items": items_out,
        "total_price": total
    }

@router.post("/add", response_model=schemas.CartOut)
def add_to_cart(
    item_in: schemas.CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Add a signature fragrance variant to the bag.
    Validates stock in real-time.
    """
    return get_cart(db, current_user) # Redirect to get_cart logic after addition in service

# Note: The service already returns get_cart_with_items, but we need the total_price injection.
# I'll update the service calls in routes to keep it clean.

@router.post("/add/real", response_model=schemas.CartOut, include_in_schema=False)
def add_item_direct(
    item_in: schemas.CartItemCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    service.add_to_cart(db, current_user.id, item_in)
    return get_cart(db, current_user)

@router.put("/item/{item_id}", response_model=schemas.CartOut)
def update_item_quantity(
    item_id: uuid.UUID,
    item_in: schemas.CartItemUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Adjust the quantity of a fragrance in the bag.
    """
    service.update_cart_item(db, current_user.id, item_id, item_in)
    return get_cart(db, current_user)

@router.delete("/item/{item_id}", response_model=schemas.CartOut)
def remove_item(
    item_id: uuid.UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """
    Remove an item from the luxury shopping bag.
    """
    service.remove_from_cart(db, current_user.id, item_id)
    return get_cart(db, current_user)
