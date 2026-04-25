import { useState } from 'react';
import { products } from '@/src/data/products';
import ProductCard from '@/src/components/products/ProductCard';
import { motion } from 'motion/react';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function CollectionsPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  
  const categories = ['All', 'Oud', 'Floral', 'Woody', 'Fresh', 'Spicy'];
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-luxury-black">
      <div className="container mx-auto px-6 md:px-12">
        <header className="mb-16 text-center lg:text-left">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="text-gold text-xs uppercase tracking-[0.4em] mb-4 block"
          >
            The Jacinta Signature
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-5xl md:text-6xl font-serif italic mb-8"
          >
            Our Collections
          </motion.h1>
          
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 border-y border-gold/10 py-6">
            <div className="flex items-center gap-2 text-gold/60 mr-4">
              <Filter size={14} />
              <span className="text-[10px] uppercase tracking-widest font-bold">Filter By</span>
            </div>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 text-[10px] uppercase tracking-[0.2em] font-bold transition-all border ${
                  activeCategory === cat 
                    ? 'border-gold text-gold bg-gold/5' 
                    : 'border-gold/10 text-luxury-white/40 hover:text-luxury-white hover:border-gold/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-32 border border-dashed border-gold/20">
            <p className="text-luxury-white/30 font-serif italic">No fragrances found in this collection.</p>
          </div>
        )}
      </div>
    </div>
  );
}
