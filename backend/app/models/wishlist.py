from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from .base import Base, TimestampMixin
import uuid

class Wishlist(Base, TimestampMixin):
    __tablename__ = "wishlists"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    user_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("users.id", ondelete="CASCADE"), unique=True)

    user: Mapped["User"] = relationship(back_populates="wishlist")
    items: Mapped[list["WishlistItem"]] = relationship(back_populates="wishlist", cascade="all, delete-orphan")

class WishlistItem(Base, TimestampMixin):
    __tablename__ = "wishlist_items"

    id: Mapped[uuid.UUID] = mapped_column(primary_key=True, default=uuid.uuid4)
    wishlist_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("wishlists.id", ondelete="CASCADE"))
    product_id: Mapped[uuid.UUID] = mapped_column(ForeignKey("products.id", ondelete="CASCADE"))

    wishlist: Mapped["Wishlist"] = relationship(back_populates="items")
    product: Mapped["Product"] = relationship()
