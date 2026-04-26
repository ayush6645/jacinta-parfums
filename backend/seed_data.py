from sqlalchemy.orm import Session
from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models.product import Category, Product, ProductVariant, Note, ProductImage
from app.models.user import User
from app.auth.utils import get_password_hash
import uuid

def seed_data():
    db = SessionLocal()
    try:
        print("Seeding Luxury Collection...")
        
        # 1. Categories
        floral = Category(name="Floral", slug="floral", description="Delicate and romantic blossoms")
        woody = Category(name="Woody", slug="woody", description="Earthy and sophisticated scents")
        db.add_all([floral, woody])
        db.flush()

        # 2. Notes
        saffron = Note(name="Saffron", type="top")
        rose = Note(name="Damask Rose", type="heart")
        oud = Note(name="Agarwood (Oud)", type="base")
        db.add_all([saffron, rose, oud])
        db.flush()

        # 3. Product: Jacinta Royale
        royale = Product(
            name="JΛCINTΛ Royale",
            slug="jacinta-royale",
            description="A majestic blend of saffron and rare oud, crafted for the modern monarch.",
            brand="JΛCINTΛ Atelier",
            category_id=floral.id,
            base_price=4500.00,
            intensity="Extrait de Parfum",
            gender="unisex",
            is_featured=True
        )
        royale.notes = [saffron, rose, oud]
        db.add(royale)
        db.flush()

        # 4. Variants for Royale
        v1 = ProductVariant(product_id=royale.id, size_ml=50, price=4500.00, stock_quantity=20)
        v2 = ProductVariant(product_id=royale.id, size_ml=100, price=8200.00, stock_quantity=15)
        db.add_all([v1, v2])

        # 5. Product: Velvet Night
        velvet = Product(
            name="Velvet Night",
            slug="velvet-night",
            description="The essence of a midnight garden, mysterious and alluring.",
            brand="JΛCINTΛ Atelier",
            category_id=woody.id,
            base_price=3800.00,
            intensity="Eau de Parfum",
            gender="women"
        )
        db.add(velvet)
        db.flush()
        
        v3 = ProductVariant(product_id=velvet.id, size_ml=100, price=3800.00, stock_quantity=50)
        db.add(v3)

        # 6. Test User
        test_user = User(
            name="Test User",
            email="test@jacinta.com",
            password_hash=get_password_hash("password123"),
            role="customer"
        )
        db.add(test_user)

        db.commit()
        print("Seeding completed successfully.")
        
    except Exception as e:
        db.rollback()
        print(f"Seeding failed: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
