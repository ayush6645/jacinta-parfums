from pydantic import BaseModel
from typing import List, Optional
import uuid
from app.product.schemas import ProductOut, ProductVariantOut

class CartItemBase(BaseModel):
    variant_id: uuid.UUID
    quantity: int = 1

class CartItemCreate(CartItemBase):
    pass

class CartItemUpdate(BaseModel):
    quantity: int

class CartItemOut(BaseModel):
    id: uuid.UUID
    variant_id: uuid.UUID
    quantity: int
    variant: ProductVariantOut
    product_name: str # Helper for frontend

    class Config:
        from_attributes = True

class CartOut(BaseModel):
    id: uuid.UUID
    items: List[CartItemOut]
    total_price: float = 0.0

    class Config:
        from_attributes = True
