import { useState, useEffect } from 'react';
import { useStore } from '@/src/store/useStore';
import { cartService } from '@/src/services/cart';
import { orderService } from '@/src/services/order';
import { paymentService } from '@/src/services/payment';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, ChevronRight, CreditCard, MapPin, CheckCircle2, Ticket, ShieldCheck, Truck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { JacintaLoader } from '@/src/components/ui/jacinta-loader';

type CheckoutStep = 'cart' | 'address' | 'payment' | 'review';

export default function CartPage() {
  const { user, clearCart } = useStore();
  const navigate = useNavigate();
  const [backendCart, setBackendCart] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [coupon, setCoupon] = useState('');
  
  // Shipping form state
  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    street: '',
    city: '',
    postalCode: ''
  });

  const handleCheckout = async () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      // 1. Load Razorpay Script
      const isLoaded = await paymentService.loadRazorpayScript();
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load. Are you offline?");
      }

      // 2. Create internal order
      // We pass the shipping address to the backend
      const orderRes = await orderService.checkout({
        shipping_address: `${address.street}, ${address.city}, ${address.postalCode}`,
        contact_number: "9999999999" // Dummy for now, can be added to form
      });
      const orderId = orderRes.id;

      // 3. Create Razorpay order
      const paymentRes = await paymentService.createRazorpayOrder(orderId);
      
      if (!paymentRes.razorpay_order_id) {
        throw new Error("Payment initialization failed");
      }

      // 4. Open Razorpay
      const options = {
        key: paymentRes.key_id,
        amount: paymentRes.amount,
        currency: "INR",
        name: "Jacinta Luxury",
        description: "Artisanal Fragrance Acquisition",
        order_id: paymentRes.razorpay_order_id,
        handler: async function (response: any) {
          try {
            // 5. Verify payment
            await paymentService.verifyPayment(response);
            
            alert("Acquisition confirmed. Your artisanal fragrance is being prepared.");
            clearCart();
            navigate('/profile'); // Or success page
          } catch (err: any) {
            alert(err.response?.data?.detail || "Payment verification failed");
          } finally {
            setIsProcessing(false);
          }
        },
        prefill: {
          name: `${address.firstName} ${address.lastName}`,
          email: user.email,
        },
        theme: {
          color: "#C9A14A",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (err: any) {
      alert(err.response?.data?.detail || err.message || "Checkout failed");
      setIsProcessing(false);
    }
  };

  const loadCart = async () => {
    if (!user.isLoggedIn) {
      setIsLoading(false);
      return;
    }
    try {
      const res = await cartService.getCart();
      setBackendCart(res);
    } catch (err) {
      console.error("Failed to load cart", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, [user.isLoggedIn]);

  const handleUpdateQuantity = async (itemId: string, newQty: number) => {
    if (newQty < 1) return;
    try {
      const res = await cartService.updateQuantity(itemId, newQty);
      setBackendCart(res);
    } catch (err) {
      alert("Failed to update quantity");
    }
  };

  const handleRemove = async (itemId: string) => {
    try {
      const res = await cartService.removeFromCart(itemId);
      setBackendCart(res);
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-luxury-black">
        <JacintaLoader />
      </div>
    );
  }

  const items = backendCart?.items || [];
  
  const floatValue = (val: any) => {
    return typeof val === 'string' ? parseFloat(val) : val;
  };

  const subtotal = items.reduce((acc: number, item: any) => acc + (floatValue(item.variant.price) * item.quantity), 0);
  const shipping = subtotal > 5000 ? 0 : 250;
  const tax = subtotal * 0.18;
  const total = subtotal + shipping + tax;

  if (items.length === 0 && step === 'cart') {
    return (
      <div className="pt-40 px-6 text-center min-h-screen bg-luxury-black">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <ShoppingBag size={64} className="mx-auto text-gold/20 mb-8" />
          <h2 className="text-3xl font-serif mb-4 italic">Your Atelier Bag is Empty</h2>
          <p className="text-luxury-white/40 mb-12 max-w-sm mx-auto font-light">
            Discover our collection of rare fragrances and find your signature scent.
          </p>
          <Link to="/collections" className="px-12 py-4 bg-gold text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold-hover transition-all">
            Explore Collections
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 min-h-screen bg-luxury-black">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16">
          <h1 className="text-4xl font-serif italic mb-12">Checkout</h1>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold">
            {(['cart', 'address', 'payment', 'review'] as CheckoutStep[]).map((s, idx) => (
              <div key={s} className="flex items-center gap-4">
                <span className={cn(
                  "transition-colors",
                  step === s ? "text-gold" : "text-luxury-white/20"
                )}>
                  {s}
                </span>
                {idx < 3 && <span className="text-luxury-white/10">/</span>}
              </div>
            ))}
          </div>
        </header>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {step === 'cart' && (
                <motion.div 
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  {items.map((item: any) => (
                    <div key={item.id} className="flex gap-6 pb-8 border-b border-gold/10 group">
                      <div className="w-24 h-32 bg-luxury-dark border border-gold/5 overflow-hidden">
                        <img 
                          src={item.variant.product.images?.[0]?.url || "/Images/placeholder.jpg"} 
                          alt={item.variant.product.name} 
                          className="w-full h-full object-cover opacity-80" 
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <h3 className="text-lg font-serif italic">{item.variant.product.name}</h3>
                            <span className="text-lg font-serif text-gold">₹{item.variant.price}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-luxury-white/30">{item.variant.size_ml}ml</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gold/20">
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="px-3 py-1 hover:bg-gold/10 no-flow"
                            >
                              -
                            </button>
                            <span className="px-4 text-xs font-mono">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="px-3 py-1 hover:bg-gold/10 no-flow"
                            >
                              +
                            </button>
                          </div>

                          <button 
                            onClick={() => handleRemove(item.id)}
                            className="text-luxury-white/20 hover:text-red-500 transition-colors no-flow"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between pt-8">
                    <Link to="/collections" className="text-[10px] uppercase tracking-widest text-gold hover:underline">
                      Continue Shopping
                    </Link>
                    <button 
                      onClick={() => setStep('address')}
                      className="px-12 py-4 bg-gold text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gold-hover transition-all flex items-center gap-2"
                    >
                      Shipping Details <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'address' && (
                <motion.div 
                  key="address"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">First Name</label>
                      <input 
                        value={address.firstName}
                        onChange={(e) => setAddress({...address, firstName: e.target.value})}
                        className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" 
                        placeholder="Julian" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">Last Name</label>
                      <input 
                        value={address.lastName}
                        onChange={(e) => setAddress({...address, lastName: e.target.value})}
                        className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" 
                        placeholder="Vance" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">Shipping Address</label>
                    <input 
                      value={address.street}
                      onChange={(e) => setAddress({...address, street: e.target.value})}
                      className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" 
                      placeholder="123 Luxury Lane, Penthouse 4" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">City</label>
                      <input 
                        value={address.city}
                        onChange={(e) => setAddress({...address, city: e.target.value})}
                        className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" 
                        placeholder="New York" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">Postal Code</label>
                      <input 
                        value={address.postalCode}
                        onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                        className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" 
                        placeholder="10001" 
                      />
                    </div>
                  </div>
                  <div className="flex justify-between pt-8">
                    <button onClick={() => setStep('cart')} className="text-[10px] uppercase tracking-widest text-luxury-white/40 hover:text-gold transition-colors">
                      Back to Bag
                    </button>
                    <button 
                      onClick={() => setStep('payment')}
                      className="px-12 py-4 bg-gold text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gold-hover transition-all flex items-center gap-2"
                    >
                      Payment Method <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div 
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="p-8 border border-gold bg-gold/5 flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <CreditCard size={24} className="text-gold" />
                      <div>
                        <div className="text-sm font-bold uppercase tracking-widest text-luxury-white">Secure Credit Card</div>
                        <div className="text-[10px] text-luxury-white/40">Stripe / Razorpay Secure Gateway</div>
                      </div>
                    </div>
                    <CheckCircle2 size={20} className="text-gold" />
                  </div>
                  
                  <div className="p-8 border border-gold/10 hover:border-gold/30 transition-colors flex items-center gap-4 cursor-pointer">
                    <div className="w-6 h-6 rounded-full border border-gold/40"></div>
                    <span className="text-sm uppercase tracking-widest text-luxury-white/60">Digital Wallet (Apple Pay / Google Pay)</span>
                  </div>

                  <div className="space-y-4 pt-4">
                    <input className="w-full bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="Card Number" />
                    <div className="grid grid-cols-2 gap-4">
                      <input className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="MM / YY" />
                      <input className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="CVV" />
                    </div>
                  </div>

                  <div className="flex justify-between pt-8">
                    <button onClick={() => setStep('address')} className="text-[10px] uppercase tracking-widest text-luxury-white/40 hover:text-gold transition-colors">
                      Back to Address
                    </button>
                    <button 
                      onClick={() => setStep('review')}
                      className="px-12 py-4 bg-gold text-black text-[10px] font-bold uppercase tracking-widest hover:bg-gold-hover transition-all flex items-center gap-2"
                    >
                      Review Order <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'review' && (
                <motion.div 
                  key="review"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-12 text-center py-12"
                >
                  <div className="relative inline-block">
                    <div className="absolute inset-0 bg-gold blur-3xl opacity-20"></div>
                    <CheckCircle2 size={80} className="mx-auto text-gold relative z-10 mb-8" />
                  </div>
                  <div>
                    <h2 className="text-4xl font-serif italic mb-4">Complete Your Acquisition</h2>
                    <p className="text-luxury-white/40 mb-12 max-w-sm mx-auto font-light">
                      Please confirm your artisanal selection and shipping details before we begin the hand-pouring process.
                    </p>
                    <button 
                      onClick={handleCheckout}
                      disabled={isProcessing}
                      className="px-16 py-5 bg-gold text-black text-[12px] font-extrabold uppercase tracking-[0.3em] hover:bg-gold-hover transition-all luxury-shadow disabled:opacity-50"
                    >
                      {isProcessing ? "Processing..." : `Place Secure Order - ₹${total.toFixed(2)}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="w-full lg:w-[400px]">
            <div className="p-8 border border-gold/10 bg-luxury-dark/40 sticky top-32">
              <h3 className="text-xl font-serif italic mb-8 border-b border-gold/10 pb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-white/40">Subtotal</span>
                  <span className="text-luxury-white">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-white/40">Atelier Delivery</span>
                  <span className="text-luxury-white">{shipping === 0 ? 'Complimentary' : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-luxury-white/40">Vat / Taxes</span>
                  <span className="text-luxury-white">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="mb-8 p-4 bg-black/40 border border-gold/5 flex gap-2">
                <Ticket size={16} className="text-gold" />
                <input 
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="COUPON CODE" 
                  className="bg-transparent border-none outline-none text-[10px] uppercase tracking-widest flex-1"
                />
                <button className="text-[10px] uppercase tracking-widest text-gold font-bold">Apply</button>
              </div>

              <div className="flex justify-between items-center mb-8 pt-6 border-t border-gold/20">
                <span className="text-lg font-serif">Total</span>
                <span className="text-2xl font-serif text-gold">₹{total.toFixed(2)}</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-luxury-white/30">
                  <ShieldCheck size={14} className="text-gold/40" />
                  <span>Secure SSL Encryption</span>
                </div>
                <div className="flex items-center gap-3 text-[9px] uppercase tracking-widest text-luxury-white/30">
                  <Truck size={14} className="text-gold/40" />
                  <span>Global Priority Express</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
