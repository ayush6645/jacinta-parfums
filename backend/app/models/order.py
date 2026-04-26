from sqlalchemy import String, ForeignKey, DECIMAL, Integer, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, TimestampMixin
import uuid

class Order(Base, TimestampMixin):
    __tablename__ = "orders"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id"))
    address_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("addresses.id"))
    order_number: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    subtotal: Mapped[float] = mapped_column(DECIMAL(12, 2))
    discount_amount: Mapped[float] = mapped_column(DECIMAL(12, 2), default=0)
    shipping_fee: Mapped[float] = mapped_column(DECIMAL(12, 2), default=0)
    total_amount: Mapped[float] = mapped_column(DECIMAL(12, 2))
    status: Mapped[str] = mapped_column(String(20), default="pending")
    payment_status: Mapped[str] = mapped_column(String(20), default="unpaid")
    notes: Mapped[str | None] = mapped_column(Text)

    user: Mapped["User"] = relationship(back_populates="orders")
    items: Mapped[list["OrderItem"]] = relationship(back_populates="order", cascade="all, delete-orphan")
    payment: Mapped["Payment"] = relationship(back_populates="order", uselist=False)

class OrderItem(Base):
    __tablename__ = "order_items"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"))
    variant_id: Mapped[uuid.UUID | None] = mapped_column(ForeignKey("product_variants.id", ondelete="SET NULL"))
    product_name: Mapped[str] = mapped_column(String(255)) # Snapshot
    quantity: Mapped[int] = mapped_column(Integer)
    price_at_purchase: Mapped[float] = mapped_column(DECIMAL(12, 2)) # Snapshot
    total_item_price: Mapped[float] = mapped_column(DECIMAL(12, 2))

    order: Mapped["Order"] = relationship(back_populates="items")
    variant: Mapped["ProductVariant"] = relationship()
