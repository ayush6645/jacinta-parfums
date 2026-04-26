from sqlalchemy import String, ForeignKey, DECIMAL, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, TimestampMixin
import uuid

class Payment(Base, TimestampMixin):
    __tablename__ = "payments"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    order_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("orders.id", ondelete="CASCADE"))
    transaction_id: Mapped[str | None] = mapped_column(String(255), unique=True)
    payment_method: Mapped[str] = mapped_column(String(50))
    amount: Mapped[float] = mapped_column(DECIMAL(12, 2))
    payment_status: Mapped[str] = mapped_column(String(20), default="pending")
    provider_response: Mapped[dict | None] = mapped_column(JSON)

    order: Mapped["Order"] = relationship(back_populates="payment")
