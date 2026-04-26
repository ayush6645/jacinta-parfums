from fastapi import APIRouter, Depends, Query, status, HTTPException
from sqlalchemy.orm import Session
from typing import Optional, List
import uuid
from app.db.session import get_db
from app.product import schemas, service
# from app.auth.dependencies import get_current_admin # To be implemented

router = APIRouter(prefix="/products", tags=["Product Catalog"])

@router.get("/", response_model=schemas.ProductList)
def get_products(
    page: int = Query(1, ge=1),
    limit: int = Query(10, ge=1, le=100),
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    category_id: Optional[uuid.UUID] = None,
    gender: Optional[str] = None,
    intensity: Optional[str] = None,
    note: Optional[str] = None,
    sort: str = Query("newest", regex="^(newest|price_asc|price_desc)$"),
    db: Session = Depends(get_db)
):
    """
    Explore the JΛCINTΛ collection. 
    Supports deep filtering by olfactory notes, intensity, and price.
    """
    skip = (page - 1) * limit
    items, total = service.list_products(
        db, skip=skip, limit=limit, 
        search=search, min_price=min_price, max_price=max_price,
        category_id=category_id, gender=gender, intensity=intensity,
        note_name=note, sort_by=sort
    )
    
    return {
        "items": items,
        "total": total,
        "page": page,
        "limit": limit
    }

@router.get("/{product_id}", response_model=schemas.ProductOut)
def get_product(product_id: uuid.UUID, db: Session = Depends(get_db)):
    """
    Get deep details of a specific fragrance.
    """
    product = service.get_product_by_id(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product

@router.post("/", response_model=schemas.ProductOut, status_code=status.HTTP_201_CREATED)
def create_product(
    product_in: schemas.ProductCreate, 
    db: Session = Depends(get_db),
    # current_admin = Depends(get_current_admin) # TODO: Enable after auth logic is complete
):
    """
    (Admin Only) Craft a new product entry.
    """
    return service.create_product(db, product_in)

@router.put("/{product_id}", response_model=schemas.ProductOut)
def update_product(
    product_id: uuid.UUID, 
    product_in: schemas.ProductUpdate, 
    db: Session = Depends(get_db)
):
    """
    (Admin Only) Refine an existing product.
    """
    return service.update_product(db, product_id, product_in)

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: uuid.UUID, db: Session = Depends(get_db)):
    """
    (Admin Only) Retire a product from the collection.
    """
    service.delete_product(db, product_id)
    return None
