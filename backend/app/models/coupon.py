from sqlalchemy import String, DECIMAL, Integer, Boolean, DateTime
from sqlalchemy.orm import Mapped, mapped_column
from .base import Base, TimestampMixin
from datetime import datetime
import uuid

class Coupon(Base, TimestampMixin):
    __tablename__ = "coupons"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    code: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    discount_type: Mapped[str] = mapped_column(String(20), default="percentage") # percentage, fixed
    discount_value: Mapped[float] = mapped_column(DECIMAL(12, 2))
    min_order_value: Mapped[float] = mapped_column(DECIMAL(12, 2), default=0)
    max_discount_limit: Mapped[float | None] = mapped_column(DECIMAL(12, 2))
    usage_limit: Mapped[int | None] = mapped_column(Integer)
    used_count: Mapped[int] = mapped_column(Integer, default=0)
    expiry_date: Mapped[datetime] = mapped_column(DateTime(timezone=True))
    is_active: Mapped[bool] = mapped_column(Boolean, default=True)
