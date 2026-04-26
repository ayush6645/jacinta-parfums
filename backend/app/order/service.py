from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from typing import Optional, List
from app.models.order import Order, OrderItem
from app.models.cart import Cart, CartItem
from app.models.product import ProductVariant
from app.models.payment import Payment
from app.order.schemas import OrderCreate
from app.cart.service import get_cart_with_items, calculate_cart_total
from fastapi import HTTPException, status
import uuid
import random
import string

def generate_order_number() -> str:
    """Generates a unique luxury order identifier (e.g., JAC-A1B2-C3D4)"""
    prefix = "JAC"
    random_str = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
    return f"{prefix}-{random_str[:4]}-{random_str[4:]}"

def create_order_from_cart(db: Session, user_id: uuid.UUID, order_in: OrderCreate) -> Order:
    """
    The Core Checkout Engine:
    - Validates Cart
    - Captures Snapshots
    - Creates Pending Order
    - Prepares Payment Record
    """
    # 1. Fetch & Validate Cart
    cart = get_cart_with_items(db, user_id)
    if not cart or not cart.items:
        raise HTTPException(status_code=400, detail="Cannot checkout an empty bag.")

    # 2. Final Stock & Pricing Check
    subtotal = 0.0
    order_items_data = []
    
    for item in cart.items:
        variant = item.variant
        if variant.stock_quantity < item.quantity:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Stock mismatch for {variant.product.name}. Only {variant.stock_quantity} left."
            )
        
        item_total = float(variant.price) * item.quantity
        subtotal += item_total
        
        # Snapshot Data Preparation
        order_items_data.append({
            "variant_id": variant.id,
            "product_name": variant.product.name, # Captured Snapshot
            "quantity": item.quantity,
            "price_at_purchase": float(variant.price), # Captured Snapshot
            "total_item_price": item_total
        })

    # 3. Create Pending Order
    db_order = Order(
        user_id=user_id,
        address_id=order_in.address_id,
        order_number=generate_order_number(),
        subtotal=subtotal,
        total_amount=subtotal, # + tax/shipping if added later
        status="pending",
        payment_status="unpaid",
        notes=order_in.notes
    )
    db.add(db_order)
    db.flush() # Get Order ID

    # 4. Create Order Items (Snapshots)
    for item_data in order_items_data:
        db_item = OrderItem(order_id=db_order.id, **item_data)
        db.add(db_item)

    # 5. Prepare Placeholder Payment Record
    db_payment = Payment(
        order_id=db_order.id,
        payment_method="pending", # To be updated by frontend choice
        amount=db_order.total_amount,
        payment_status="pending"
    )
    db.add(db_payment)

    db.commit()
    db.refresh(db_order)
    return db_order

def get_user_orders(db: Session, user_id: uuid.UUID):
    return db.execute(
        select(Order).where(Order.user_id == user_id).order_by(Order.created_at.desc())
    ).scalars().all()

def get_order_by_id(db: Session, user_id: uuid.UUID, order_id: uuid.UUID) -> Order:
    order = db.execute(
        select(Order)
        .where(Order.id == order_id, Order.user_id == user_id)
        .options(selectinload(Order.items))
    ).scalar_one_or_none()
    
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return order

def mark_order_as_paid(db: Session, order_id: uuid.UUID, transaction_id: str):
    """
    Finalize Order after Payment Success:
    - Update Status
    - Deduct Stock
    - Clear Cart
    """
    order = db.execute(select(Order).where(Order.id == order_id)).scalar_one_or_none()
    if not order:
        return
    
    order.status = "confirmed"
    order.payment_status = "paid"
    
    # Deduct Stock & Clear Cart Logic...
    # (To be called from payment webhook)
    pass
