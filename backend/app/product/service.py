from sqlalchemy.orm import Session, selectinload
from sqlalchemy import select, func, or_, and_
from app.models.product import Product, ProductVariant, ProductImage, Note, Category, product_notes_association
from app.product.schemas import ProductCreate, ProductUpdate
from fastapi import HTTPException, status
from typing import List, Optional
import uuid

def get_product_by_id(db: Session, product_id: uuid.UUID) -> Optional[Product]:
    """
    Fetch a single product with all relationships loaded to avoid N+1.
    """
    query = (
        select(Product)
        .where(Product.id == product_id)
        .options(
            selectinload(Product.variants),
            selectinload(Product.images),
            selectinload(Product.notes),
            selectinload(Product.category)
        )
    )
    return db.execute(query).scalar_one_or_none()

def list_products(
    db: Session,
    skip: int = 0,
    limit: int = 10,
    search: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    category_id: Optional[uuid.UUID] = None,
    gender: Optional[str] = None,
    intensity: Optional[str] = None,
    note_name: Optional[str] = None,
    sort_by: str = "newest"
):
    """
    Advanced Product Query Engine with Filtering, Search, and Pagination.
    """
    query = select(Product).where(Product.is_active == True)

    # 1. Search (Name/Brand)
    if search:
        query = query.where(
            or_(
                Product.name.ilike(f"%{search}%"),
                Product.brand.ilike(f"%{search}%")
            )
        )

    # 2. Price Range (Filter by Base Price)
    if min_price is not None:
        query = query.where(Product.base_price >= min_price)
    if max_price is not None:
        query = query.where(Product.base_price <= max_price)

    # 3. Category/Gender/Intensity
    if category_id:
        query = query.where(Product.category_id == category_id)
    if gender:
        query = query.where(Product.gender == gender)
    if intensity:
        query = query.where(Product.intensity == intensity)

    # 4. Olfactory Note Filtering (Find perfumes with Saffron)
    if note_name:
        query = query.join(Product.notes).where(Note.name.ilike(f"%{note_name}%"))

    # 5. Sorting
    if sort_by == "price_asc":
        query = query.order_by(Product.base_price.asc())
    elif sort_by == "price_desc":
        query = query.order_by(Product.base_price.desc())
    else: # newest
        query = query.order_by(Product.created_at.desc())

    # Total Count for Pagination
    total_count = db.execute(select(func.count()).select_from(query.subquery())).scalar() or 0

    # Execute with Relationships
    results = db.execute(
        query.offset(skip).limit(limit).options(
            selectinload(Product.variants),
            selectinload(Product.images),
            selectinload(Product.notes),
            selectinload(Product.category)
        )
    ).scalars().all()

    return results, total_count

def create_product(db: Session, product_in: ProductCreate) -> Product:
    """
    Transactional Product Creation with Variants, Images, and Notes.
    """
    # Create Product
    db_product = Product(
        name=product_in.name,
        slug=product_in.slug,
        description=product_in.description,
        brand=product_in.brand,
        category_id=product_in.category_id,
        base_price=product_in.base_price,
        intensity=product_in.intensity,
        gender=product_in.gender,
        is_featured=product_in.is_featured
    )
    
    # Handle Notes
    if product_in.note_ids:
        notes = db.execute(select(Note).where(Note.id.in_(product_in.note_ids))).scalars().all()
        db_product.notes = list(notes)

    db.add(db_product)
    db.flush() # Get product ID

    # Handle Variants
    for variant in product_in.variants:
        db_variant = ProductVariant(**variant.model_dump(), product_id=db_product.id)
        db.add(db_variant)

    # Handle Images
    for image in product_in.images:
        db_image = ProductImage(**image.model_dump(), product_id=db_product.id)
        db.add(db_image)

    db.commit()
    db.refresh(db_product)
    return get_product_by_id(db, db_product.id)

def update_product(db: Session, product_id: uuid.UUID, product_in: ProductUpdate) -> Product:
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    update_data = product_in.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_product, key, value)
    
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

def delete_product(db: Session, product_id: uuid.UUID):
    db_product = get_product_by_id(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    db.delete(db_product)
    db.commit()
    return {"message": "Product deleted successfully"}
