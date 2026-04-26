import razorpay
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.core.config import settings
from app.models.order import Order
from app.models.payment import Payment
from app.models.product import ProductVariant
from app.models.cart import Cart, CartItem
from app.payment.utils import verify_razorpay_signature
from fastapi import HTTPException, status
import uuid

# Initialize Razorpay Client
client = razorpay.Client(auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET))

def create_razorpay_order_session(db: Session, user_id: uuid.UUID, order_id: uuid.UUID):
    """
    Creates a Razorpay Order and links it to our internal Order record.
    """
    order = db.execute(select(Order).where(Order.id == order_id, Order.user_id == user_id)).scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if order.status != "pending":
        raise HTTPException(status_code=400, detail="Order already processed")

    # Razorpay expects amount in paise (1 INR = 100 paise)
    amount_paise = int(float(order.total_amount) * 100)
    
    try:
        razorpay_order = client.order.create({
            "amount": amount_paise,
            "currency": "INR",
            "receipt": str(order.order_number),
            "payment_capture": 1 # Auto capture
        })
        
        # Update our Payment record with the Razorpay Order ID
        payment = db.execute(select(Payment).where(Payment.order_id == order.id)).scalar_one_or_none()
        if payment:
            payment.transaction_id = razorpay_order['id']
            db.commit()
            
        return {
            "razorpay_order_id": razorpay_order['id'],
            "amount": amount_paise,
            "currency": "INR",
            "key_id": settings.RAZORPAY_KEY_ID
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Razorpay Error: {str(e)}")

def verify_and_finalize_payment(
    db: Session, 
    user_id: uuid.UUID, 
    razorpay_order_id: str, 
    razorpay_payment_id: str, 
    razorpay_signature: str
):
    """
    The High-Security Fulfillment Logic:
    1. Verify Signature
    2. Update Order Status
    3. Deduct Stock
    4. Clear Cart
    """
    # 1. Signature Check
    if not verify_razorpay_signature(razorpay_order_id, razorpay_payment_id, razorpay_signature):
        raise HTTPException(status_code=400, detail="Invalid payment signature. Verification failed.")

    # 2. Fetch Records
    payment = db.execute(select(Payment).where(Payment.transaction_id == razorpay_order_id)).scalar_one_or_none()
    if not payment:
        raise HTTPException(status_code=404, detail="Payment record not found")
        
    order = db.execute(select(Order).where(Order.id == payment.order_id, Order.user_id == user_id)).scalar_one_or_none()
    if not order:
        raise HTTPException(status_code=404, detail="Order associated with payment not found")

    if order.payment_status == "paid":
        return order # Already processed

    # 3. Transactional Fulfillment
    try:
        # Update Statuses
        order.status = "confirmed"
        order.payment_status = "paid"
        payment.payment_status = "success"
        payment.payment_method = "razorpay" # or capture from signature if needed

        # Deduct Stock
        for item in order.items:
            variant = db.execute(select(ProductVariant).where(ProductVariant.id == item.variant_id)).scalar_one_or_none()
            if variant:
                if variant.stock_quantity < item.quantity:
                    # In a real system, you'd handle this as a critical failure/refund
                    pass 
                variant.stock_quantity -= item.quantity

        # Clear User Cart
        cart = db.execute(select(Cart).where(Cart.user_id == user_id)).scalar_one_or_none()
        if cart:
            db.execute(select(CartItem).where(CartItem.cart_id == cart.id)).delete() # Clear items

        db.commit()
        db.refresh(order)
        return order
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Fulfillment Error: {str(e)}")
