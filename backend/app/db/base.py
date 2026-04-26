# Import all models for Alembic or Model discovery
from app.models.base import Base
from app.models.user import User
from app.models.address import Address
from app.models.product import Category, Product, ProductVariant, ProductImage, Note
from app.models.order import Order, OrderItem
from app.models.payment import Payment
from app.models.review import Review
from app.models.cart import Cart, CartItem
from app.models.wishlist import Wishlist, WishlistItem
from app.models.coupon import Coupon
from app.models.search import SearchHistory
from app.models.audit import AuditLog
