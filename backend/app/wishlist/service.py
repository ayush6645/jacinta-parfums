from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select
from app.models.wishlist import Wishlist, WishlistItem
from app.models.product import Product
from fastapi import HTTPException
import uuid

def get_or_create_wishlist(db: Session, user_id: uuid.UUID) -> Wishlist:
    wishlist = db.execute(
        select(Wishlist)
        .where(Wishlist.user_id == user_id)
        .options(selectinload(Wishlist.items).selectinload(WishlistItem.product))
    ).scalar_one_or_none()
    
    if not wishlist:
        wishlist = Wishlist(user_id=user_id)
        db.add(wishlist)
        db.commit()
        db.refresh(wishlist)
    return wishlist

def add_to_wishlist(db: Session, user_id: uuid.UUID, product_id: uuid.UUID) -> Wishlist:
    wishlist = get_or_create_wishlist(db, user_id)
    
    # Check if product exists
    product = db.execute(select(Product).where(Product.id == product_id)).scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
        
    # Check if already in wishlist
    existing = db.execute(
        select(WishlistItem).where(WishlistItem.wishlist_id == wishlist.id, WishlistItem.product_id == product_id)
    ).scalar_one_or_none()
    
    if not existing:
        db_item = WishlistItem(wishlist_id=wishlist.id, product_id=product_id)
        db.add(db_item)
        db.commit()
        
    return get_or_create_wishlist(db, user_id)

def remove_from_wishlist(db: Session, user_id: uuid.UUID, product_id: uuid.UUID) -> Wishlist:
    wishlist = get_or_create_wishlist(db, user_id)
    db_item = db.execute(
        select(WishlistItem).where(WishlistItem.wishlist_id == wishlist.id, WishlistItem.product_id == product_id)
    ).scalar_one_or_none()
    
    if db_item:
        db.delete(db_item)
        db.commit()
        
    return get_or_create_wishlist(db, user_id)
