import { useState } from 'react';
import { useStore } from '@/src/store/useStore';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, ChevronRight, CreditCard, MapPin, CheckCircle2, Ticket } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/src/lib/utils';

type CheckoutStep = 'cart' | 'address' | 'payment' | 'review';

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useStore();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [coupon, setCoupon] = useState('');
  
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (cart.length === 0 && step === 'cart') {
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
          {/* Main Content */}
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
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-8 border-b border-gold/10 group">
                      <div className="w-24 h-32 bg-luxury-dark border border-gold/5 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover opacity-80" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-2">
                        <div>
                          <div className="flex justify-between mb-1">
                            <h3 className="text-lg font-serif italic">{item.name}</h3>
                            <span className="text-lg font-serif text-gold">₹{item.price}</span>
                          </div>
                          <span className="text-[10px] uppercase tracking-widest text-luxury-white/30">{item.size}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gold/20">
                            <button className="px-3 py-1 hover:bg-gold/10 no-flow">-</button>
                            <span className="px-4 text-xs font-mono">{item.quantity}</span>
                            <button className="px-3 py-1 hover:bg-gold/10 no-flow">+</button>
                          </div>

                          <button 
                            onClick={() => removeFromCart(item.id)}
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
                      <input className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="Julian" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">Last Name</label>
                      <input className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="Vance" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">Shipping Address</label>
                    <input className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="123 Luxury Lane, Penthouse 4" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">City</label>
                      <input className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="New York" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] uppercase tracking-widest text-luxury-white/40">Postal Code</label>
                      <input className="bg-luxury-dark border border-gold/10 p-4 focus:border-gold outline-none text-sm" placeholder="10001" />
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
                      onClick={() => {
                        alert("Order Confirmed! Your artisanal fragrance is being prepared.");
                        clearCart();
                        window.location.href = "/";
                      }}
                      className="px-16 py-5 bg-gold text-black text-[12px] font-extrabold uppercase tracking-[0.3em] hover:bg-gold-hover transition-all luxury-shadow"
                    >
                      Place Secure Order - ₹{total.toFixed(2)}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar Summary */}
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

import { ShieldCheck, Truck } from 'lucide-react';
