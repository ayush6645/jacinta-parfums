import { useEffect, useState } from 'react';
import { useSearchParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Package, ArrowRight, Download, Share2 } from 'lucide-react';
import { JacintaLoader } from '@/src/components/ui/jacinta-loader';
import { orderService } from '@/src/services/order';

export default function OrderSuccessPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [order, setOrder] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const res = await orderService.getOrderDetail(orderId!);
      setOrder(res);
    } catch (err) {
      console.error("Failed to fetch order", err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!orderId) {
    return <Navigate to="/" />;
  }

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-luxury-black">
        <JacintaLoader />
      </div>
    );
  }

  return (
    <div className="pt-40 pb-24 min-h-screen bg-luxury-black">
      <div className="container mx-auto px-6 max-w-3xl">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gold blur-3xl opacity-20 animate-pulse"></div>
            <CheckCircle2 size={100} className="text-gold relative z-10" />
          </div>
          <h1 className="text-5xl md:text-6xl font-serif italic mb-6">Acquisition Confirmed</h1>
          <p className="text-luxury-white/40 text-lg font-light max-w-lg mx-auto leading-relaxed">
            Your artisanal fragrance selection has been secured. Our master perfumers are now preparing your hand-poured collection.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-luxury-dark/40 border border-gold/10 p-8 md:p-12 backdrop-blur-xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Package size={120} className="text-gold" />
          </div>

          <div className="grid md:grid-cols-2 gap-12 relative z-10">
            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3">Order Identifier</h3>
                <p className="text-2xl font-serif italic text-luxury-white">{order?.order_number || orderId}</p>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3">Estimated Delivery</h3>
                <p className="text-lg font-serif text-luxury-white/80">3 - 5 Business Days</p>
                <p className="text-[10px] text-luxury-white/40 uppercase tracking-widest mt-1">Via Global Priority Express</p>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3">Total Investment</h3>
                <p className="text-2xl font-serif text-gold">₹{order?.total_amount?.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-3">Shipping To</h3>
                <p className="text-sm font-light text-luxury-white/60 leading-relaxed">
                  {order?.shipping_address || "Your Atelier Address"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-12 border-t border-gold/10 flex flex-wrap gap-6 justify-center md:justify-start">
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-white/40 hover:text-gold transition-colors">
              <Download size={14} /> Download Invoice
            </button>
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-luxury-white/40 hover:text-gold transition-colors">
              <Share2 size={14} /> Share Collection
            </button>
          </div>
        </motion.div>

        <div className="mt-16 flex flex-col md:flex-row gap-6 justify-center items-center">
          <Link 
            to="/profile" 
            className="px-12 py-4 bg-gold text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gold-hover transition-all flex items-center gap-2"
          >
            Track Acquisition <ArrowRight size={14} />
          </Link>
          <Link 
            to="/collections" 
            className="text-[10px] uppercase tracking-widest text-luxury-white/40 hover:text-gold transition-all"
          >
            Continue Exploring
          </Link>
        </div>
      </div>
    </div>
  );
}
