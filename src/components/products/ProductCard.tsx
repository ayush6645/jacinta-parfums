import { motion } from 'motion/react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/src/data/products';
import { useStore } from '@/src/store/useStore';
import { cn } from '@/src/lib/utils';

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toggleWishlist, wishlist, addToCart } = useStore();
  const isWishlisted = wishlist.includes(product.id);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-luxury-dark/40 border border-gold/10 overflow-hidden"
    >
      <Link to={`/product/${product.id}`} className="block aspect-[4/5] overflow-hidden bg-black">
        <motion.img 
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </Link>
      
      <button 
        onClick={() => toggleWishlist(product.id)}
        className="absolute top-4 right-4 p-2 rounded-full border border-gold/20 bg-black/40 backdrop-blur-sm text-gold hover:bg-gold hover:text-black transition-all z-10 no-flow"
      >

        <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
      </button>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-[10px] text-gold uppercase tracking-widest block mb-1 italic">
              {product.category}
            </span>
            <h3 className="text-lg font-serif italic text-luxury-white group-hover:text-gold transition-colors">
              {product.name}
            </h3>
          </div>
          <span className="text-xl font-serif text-luxury-white">₹{product.price}</span>
        </div>
        
        <p className="text-[11px] text-luxury-white/40 line-clamp-2 mb-6 font-light leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-3">
          <Link 
            to={`/product/${product.id}`}
            className="flex-1 text-center py-3 border border-gold/30 text-[10px] font-bold uppercase tracking-widest hover:bg-gold/10 transition-colors"
          >
            Details
          </Link>
          <button 
            onClick={() => addToCart({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
              size: product.sizes[0],
              image: product.image
            })}
            className="p-3 bg-gold text-black hover:bg-gold-hover transition-colors rounded-none"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

      <div className="absolute inset-0 border-2 border-gold/0 group-hover:border-gold/10 pointer-events-none transition-all"></div>
    </motion.div>
  );
}
