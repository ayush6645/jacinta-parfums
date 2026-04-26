import hmac
import hashlib
from app.core.config import settings

def verify_razorpay_signature(razorpay_order_id: str, razorpay_payment_id: str, signature: str) -> bool:
    """
    Cryptographically verify the Razorpay signature to prevent payment spoofing.
    """
    secret = settings.RAZORPAY_KEY_SECRET
    payload = f"{razorpay_order_id}|{razorpay_payment_id}"
    
    generated_signature = hmac.new(
        secret.encode(),
        payload.encode(),
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(generated_signature, signature)

def verify_webhook_signature(payload: bytes, signature: str) -> bool:
    """
    Verify signature for Razorpay webhooks.
    """
    secret = settings.RAZORPAY_WEBHOOK_SECRET
    generated_signature = hmac.new(
        secret.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()
    
    return hmac.compare_digest(generated_signature, signature)
