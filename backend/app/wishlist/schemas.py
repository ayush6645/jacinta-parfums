from pydantic import BaseModel
from typing import List
import uuid
from app.product.schemas import ProductOut

class WishlistItemOut(BaseModel):
    id: uuid.UUID
    product_id: uuid.UUID
    product: ProductOut

    class Config:
        from_attributes = True

class WishlistOut(BaseModel):
    id: uuid.UUID
    items: List[WishlistItemOut]

    class Config:
        from_attributes = True
