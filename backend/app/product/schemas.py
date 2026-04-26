from pydantic import BaseModel, Field, HttpUrl
from typing import List, Optional, Union
import uuid
from datetime import datetime

# --- NOTE SCHEMAS ---
class NoteBase(BaseModel):
    name: str
    type: str # top, heart, base

class NoteCreate(NoteBase):
    pass

class NoteOut(NoteBase):
    id: uuid.UUID
    class Config:
        from_attributes = True

# --- IMAGE SCHEMAS ---
class ProductImageBase(BaseModel):
    image_url: str
    alt_text: Optional[str] = None
    is_primary: bool = False
    display_order: int = 0

class ProductImageCreate(ProductImageBase):
    pass

class ProductImageOut(ProductImageBase):
    id: uuid.UUID
    class Config:
        from_attributes = True

# --- VARIANT SCHEMAS ---
class ProductVariantBase(BaseModel):
    size_ml: int
    price: float
    sku: Optional[str] = None
    stock_quantity: int = 0

class ProductVariantCreate(ProductVariantBase):
    pass

class ProductVariantOut(ProductVariantBase):
    id: uuid.UUID
    class Config:
        from_attributes = True

# --- CATEGORY SCHEMAS ---
class CategoryBase(BaseModel):
    name: str
    slug: str
    description: Optional[str] = None

class CategoryOut(CategoryBase):
    id: uuid.UUID
    class Config:
        from_attributes = True

# --- PRODUCT SCHEMAS ---
class ProductBase(BaseModel):
    name: str
    slug: str
    description: str
    brand: str = "Jacinta Atelier"
    category_id: Optional[uuid.UUID] = None
    base_price: float
    intensity: Optional[str] = None
    gender: Optional[str] = None
    is_featured: bool = False

class ProductCreate(ProductBase):
    variants: List[ProductVariantCreate] = []
    images: List[ProductImageCreate] = []
    note_ids: List[uuid.UUID] = []

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    base_price: Optional[float] = None
    is_active: Optional[bool] = None
    is_featured: Optional[bool] = None

class ProductOut(ProductBase):
    id: uuid.UUID
    is_active: bool
    created_at: datetime
    category: Optional[CategoryOut] = None
    variants: List[ProductVariantOut] = []
    images: List[ProductImageOut] = []
    notes: List[NoteOut] = []
    
    # Aggregates (optional, can be calculated in service)
    average_rating: float = 0.0
    reviews_count: int = 0

    class Config:
        from_attributes = True

class ProductList(BaseModel):
    items: List[ProductOut]
    total: int
    page: int
    limit: int
