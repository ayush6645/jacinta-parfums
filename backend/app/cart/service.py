from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from typing import Optional
from app.models.cart import Cart, CartItem
from app.models.product import ProductVariant, Product
from app.cart.schemas import CartItemCreate, CartItemUpdate
from fastapi import HTTPException, status
import uuid

def get_or_create_cart(db: Session, user_id: uuid.UUID) -> Cart:
    cart = db.execute(select(Cart).where(Cart.user_id == user_id)).scalar_one_or_none()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart

def get_cart_with_items(db: Session, user_id: uuid.UUID) -> Cart:
    cart = db.execute(
        select(Cart)
        .where(Cart.user_id == user_id)
        .options(
            selectinload(Cart.items).selectinload(CartItem.variant).selectinload(ProductVariant.product)
        )
    ).scalar_one_or_none()
    
    if not cart:
        return get_or_create_cart(db, user_id)
    return cart

def calculate_cart_total(cart: Cart) -> float:
    total = 0.0
    for item in cart.items:
        total += float(item.variant.price) * item.quantity
    return total

def add_to_cart(db: Session, user_id: uuid.UUID, item_in: CartItemCreate) -> Cart:
    cart = get_or_create_cart(db, user_id)
    
    # 1. Validate Variant & Stock
    variant = db.execute(select(ProductVariant).where(ProductVariant.id == item_in.variant_id)).scalar_one_or_none()
    if not variant:
        raise HTTPException(status_code=404, detail="Product variant not found")
    
    if variant.stock_quantity < item_in.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Only {variant.stock_quantity} items in stock."
        )

    # 2. Check if item already in cart
    existing_item = db.execute(
        select(CartItem).where(CartItem.cart_id == cart.id, CartItem.variant_id == item_in.variant_id)
    ).scalar_one_or_none()

    if existing_item:
        new_qty = existing_item.quantity + item_in.quantity
        if variant.stock_quantity < new_qty:
             raise HTTPException(status_code=400, detail="Requested quantity exceeds stock.")
        existing_item.quantity = new_qty
    else:
        db_item = CartItem(cart_id=cart.id, variant_id=item_in.variant_id, quantity=item_in.quantity)
        db.add(db_item)

    db.commit()
    return get_cart_with_items(db, user_id)

def update_cart_item(db: Session, user_id: uuid.UUID, item_id: uuid.UUID, item_in: CartItemUpdate) -> Cart:
    db_item = db.execute(select(CartItem).where(CartItem.id == item_id)).scalar_one_or_none()
    if not db_item:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    
    # Validate Stock
    variant = db.execute(select(ProductVariant).where(ProductVariant.id == db_item.variant_id)).scalar_one_or_none()
    if variant.stock_quantity < item_in.quantity:
        raise HTTPException(status_code=400, detail="Requested quantity exceeds stock.")
    
    if item_in.quantity <= 0:
        db.delete(db_item)
    else:
        db_item.quantity = item_in.quantity
    
    db.commit()
    return get_cart_with_items(db, user_id)

def remove_from_cart(db: Session, user_id: uuid.UUID, item_id: uuid.UUID) -> Cart:
    db_item = db.execute(select(CartItem).where(CartItem.id == item_id)).scalar_one_or_none()
    if db_item:
        db.delete(db_item)
        db.commit()
    return get_cart_with_items(db, user_id)
