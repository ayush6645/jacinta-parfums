import { useStore } from '@/src/store/useStore';
import { products } from '@/src/data/products';
import ProductCard from '@/src/components/products/ProductCard';
import { motion } from 'motion/react';
import { Heart, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  const wishlistIds = useStore((state) => state.wishlist);
  const wishlistProducts = products.filter(p => wishlistIds.includes(p.id));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-luxury-black">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block"
          >
            Curated Selections
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-6xl font-serif italic mb-2"
          >
            Your Wishlist
          </motion.h1>
          <div className="w-24 h-[1px] bg-gold/20 mx-auto lg:mx-0 mt-8"></div>
        </header>

        {wishlistProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border border-dashed border-gold/10">
            <Heart size={48} className="mx-auto text-gold/10 mb-6" />
            <p className="text-luxury-white/30 font-serif italic text-xl mb-8">Your sanctuary of scent is empty.</p>
            <Link to="/collections" className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold border-b border-gold pb-1 hover:text-luxury-white hover:border-luxury-white transition-colors">
              Explore The Atelier
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
