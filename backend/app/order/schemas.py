from pydantic import BaseModel
from typing import List, Optional
import uuid
from datetime import datetime

class OrderItemOut(BaseModel):
    id: uuid.UUID
    variant_id: Optional[uuid.UUID]
    product_name: str # Snapshot
    quantity: int
    price_at_purchase: float # Snapshot
    total_item_price: float

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    address_id: uuid.UUID
    notes: Optional[str] = None

class OrderCreate(OrderBase):
    pass # No total_amount here, we calculate it on backend

class OrderOut(BaseModel):
    id: uuid.UUID
    order_number: str
    subtotal: float
    discount_amount: float
    shipping_fee: float
    total_amount: float
    status: str
    payment_status: str
    created_at: datetime
    
    class Config:
        from_attributes = True

class OrderDetailOut(OrderOut):
    items: List[OrderItemOut]
    address_id: uuid.UUID
    notes: Optional[str] = None
