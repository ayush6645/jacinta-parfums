import { useParams, Link } from 'react-router-dom';
import { productService } from '@/src/services/product';
import { cartService } from '@/src/services/cart';
import { motion } from 'motion/react';
import { Heart, ArrowLeft, ShieldCheck, Truck, RefreshCcw } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { useState, useEffect } from 'react';
import { cn } from '@/src/lib/utils';
import { JacintaLoader } from '@/src/components/ui/jacinta-loader';
import InteractiveHoverButton from '@/src/components/ui/interactive-hover-button';
import { ImageSwiper } from '@/src/components/ui/image-swiper';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const { toggleWishlist, wishlist, user } = useStore();
  
  const isWishlisted = wishlist.includes(product?.id || '');

  useEffect(() => {
    async function load() {
      if (!id) return;
      setIsLoading(true);
      try {
        const res = await productService.getProductDetail(id);
        setProduct(res);
        if (res.variants && res.variants.length > 0) {
          setSelectedVariant(res.variants[0]);
        }
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) return;
    
    if (!user.isLoggedIn) {
      alert("Please login to add items to your atelier bag.");
      return;
    }

    try {
      await cartService.addToCart(selectedVariant.id, 1);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to add to cart");
    }
  };

  if (isLoading) return <div className="h-screen flex items-center justify-center bg-luxury-black"><JacintaLoader /></div>;

  if (!product) {
    return (
      <div className="pt-40 text-center h-screen bg-luxury-black text-luxury-white">
        <h2 className="text-3xl font-serif mb-4 italic">Fragrance Not Found</h2>
        <Link to="/collections" className="text-gold uppercase tracking-widest text-sm">Return to Collections</Link>
      </div>
    );
  }

  return (
    <div className="pt-16 lg:pt-0 min-h-screen bg-luxury-black">
      {/* BRAND IDENTITY HEADER (AS REQUESTED BY USER) */}
      <div className="relative w-full py-8 md:py-12 flex flex-col items-center justify-center overflow-hidden border-b border-gold/5 bg-luxury-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg" 
            alt="Brand Background" 
            className="w-full h-full object-cover opacity-5 blur-xl scale-125"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-gold text-[8px] md:text-[10px] tracking-[0.6em] uppercase font-bold mb-2">
              The Art of Olfaction
            </h2>
            <h1 className="text-luxury-white text-3xl md:text-5xl font-serif italic tracking-tighter leading-tight animate-gold-glow">
              Jacinta <span className="not-italic text-gold/80">Atelier</span>
            </h1>
          </motion.div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
        {/* Left: Image Gallery */}
        <div className="w-full lg:w-1/2 relative bg-black/20 overflow-hidden group flex items-center justify-center p-6 md:p-12">
          <Link to="/collections" className="absolute top-8 left-8 z-20 flex items-center gap-2 text-luxury-white/60 hover:text-gold transition-colors group/back no-flow">
            <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
            <span className="text-[9px] uppercase tracking-widest font-bold">Back</span>
          </Link>
          
          <div className="w-full h-full flex items-center justify-center relative min-h-[400px] md:min-h-[600px]">
            <ImageSwiper 
              images={product.images || product.image} 
              cardWidth={window.innerWidth < 768 ? window.innerWidth * 0.8 : 450} 
              cardHeight={window.innerWidth < 768 ? window.innerWidth * 1.0 : 550}
              className="mt-4"
            />
          </div>
        </div>

        {/* Right: Details */}
        <div className="w-full lg:w-1/2 p-8 lg:p-24 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="text-gold text-xs uppercase tracking-[0.4em] mb-3 block font-semibold italic">
                  {product.category?.name || 'Signature'} Collection
                </span>
                <h1 className="text-5xl md:text-7xl font-serif italic mb-2">{product.name}</h1>
                <p className="text-luxury-white/40 text-sm uppercase tracking-widest">{product.brand} Parfums</p>
              </div>
              <div className="text-3xl font-serif text-gold">₹{selectedVariant?.price || product.base_price}</div>
            </div>

            <p className="text-luxury-white/60 text-base leading-relaxed mb-12 max-w-xl font-light">
              {product.description}
            </p>

            {/* Fragrance Notes */}
            <div className="grid md:grid-cols-3 gap-8 mb-12 border-y border-gold/10 py-10">
              {['top', 'heart', 'base'].map((type) => {
                const typeNotes = product.notes?.filter((n: any) => n.type === type);
                if (!typeNotes || typeNotes.length === 0) return null;
                return (
                  <div key={type}>
                    <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-3 font-bold">{type} Notes</h4>
                    <ul className="space-y-1">
                      {typeNotes.map((note: any, i: number) => (
                        <li key={i} className="text-xs text-luxury-white/50 italic tracking-wide">{note.name}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>

            {/* Selection & Actions */}
            <div className="space-y-8">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-luxury-white/40 mb-4 font-bold">Select Size</h4>
                <div className="flex gap-4">
                  {product.variants?.map((v: any) => (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      className={cn(
                        "px-8 py-3 text-[10px] uppercase tracking-widest font-bold border transition-all no-flow",
                        selectedVariant?.id === v.id 
                          ? "border-gold text-gold bg-gold/5" 
                          : "border-gold/10 text-luxury-white/40 hover:border-gold/30 hover:text-luxury-white"
                      )}
                    >
                      {v.size_ml}ml
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <InteractiveHoverButton 
                  onClick={handleAddToCart}
                  text="Add to Atelier Bag"
                  loadingText="Adding..."
                  successText="Added to Bag"
                  className="flex-1 bg-gold text-black py-5 text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-gold-hover transition-colors luxury-shadow no-flow"
                />
                <button 
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    "px-8 py-5 border flex items-center justify-center transition-all no-flow",
                    isWishlisted 
                      ? "border-gold text-gold bg-gold/5" 
                      : "border-gold/20 text-luxury-white/40 hover:border-gold/40 hover:text-luxury-white"
                  )}
                >
                  <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-gold/5 text-[9px] uppercase tracking-widest text-luxury-white/30">
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-gold/40" />
                <span>Complimentary Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-gold/40" />
                <span>Authentic Artisanal Product</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw size={14} className="text-gold/40" />
                <span>Exquisite Returns</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
