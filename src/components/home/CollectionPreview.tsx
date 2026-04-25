import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const collections = [
  { 
    id: '01', 
    title: 'Noir Libre', 
    category: 'Woody / Intense', 
    image: '/Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg' 
  },
  { 
    id: '02', 
    title: 'Red Desire', 
    category: 'Spicy / Warm', 
    image: '/Images/WhatsApp Image 2026-04-22 at 10.18.12 AM.jpeg' 
  },
  { 
    id: '03', 
    title: 'Summer Ice', 
    category: 'Fresh / Citrus', 
    image: '/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg' 
  },
];

export default function CollectionPreview() {
  return (
    <section className="h-auto lg:h-[220px] bg-luxury-dark border-t border-gold/10 flex flex-col lg:flex-row shrink-0 overflow-hidden">
      <div className="w-full lg:w-1/4 border-b lg:border-b-0 lg:border-r border-gold/10 p-8 flex flex-col justify-center bg-black/40">
        <h3 className="text-[10px] uppercase tracking-[0.3em] text-gold mb-2 font-bold italic">The Collection</h3>
        <p className="text-[11px] text-luxury-white/40 italic">Three distinct voices of the night.</p>
      </div>
      
      <div className="flex-1 flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x divide-gold/10">
        {collections.map((col) => (
          <motion.div 
            key={col.id}
            whileHover={{ backgroundColor: 'rgba(201, 161, 74, 0.02)' }}
            className="flex-1 flex items-center px-8 py-8 lg:py-0 cursor-pointer transition-colors group relative overflow-hidden"
          >
            {/* Background Image on Hover */}
            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileHover={{ opacity: 0.15, scale: 1 }}
              className="absolute inset-0 z-0"
            >
              <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
            </motion.div>

            <div className="relative z-10 flex items-center">
              <span className="text-gold text-lg font-serif mr-6 opacity-40 group-hover:opacity-100 transition-opacity">{col.id}</span>
              <div>
                <div className="text-xs uppercase tracking-widest font-semibold text-luxury-white group-hover:text-gold transition-colors">
                  {col.title}
                </div>
                <div className="text-[10px] text-luxury-white/40 mt-1 uppercase tracking-tighter group-hover:text-luxury-white/70">
                  {col.category}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      
      <div className="w-full lg:w-1/6 flex items-center justify-center p-8 border-t lg:border-t-0 lg:border-l border-gold/10">
        <motion.div 
          whileHover={{ scale: 1.1, borderColor: '#C9A14A' }}
          className="w-10 h-10 border border-gold/30 rounded-full flex items-center justify-center group cursor-pointer transition-all"
        >
          <ArrowRight size={18} className="text-gold" />
        </motion.div>
      </div>
    </section>
  );
}
