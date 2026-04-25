import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveHoverButton from '../ui/interactive-hover-button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-luxury-black">
      {/* Immersive Luxury Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--gold-muted)_0%,_transparent_70%)] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black z-10"></div>
        <img 
          src="/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg" 
          alt="Brand Background" 
          className="w-full h-full object-cover opacity-5 scale-110 blur-xl animate-slow-zoom"
        />
      </div>

      <div className="container mx-auto px-6 z-20 flex flex-col items-center text-center">
        {/* BRAND IDENTITY (ELEGANT & REFINED) */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="mb-12"
        >
          <h2 className="text-gold text-[10px] md:text-xs tracking-[0.8em] uppercase font-bold mb-4">
            The Art of Olfaction
          </h2>
          <h1 className="text-luxury-white text-5xl md:text-8xl font-serif italic tracking-tighter leading-tight animate-gold-glow">
            Jacinta <span className="not-italic text-gold/80">Atelier</span>
          </h1>
        </motion.div>

        {/* HERO PRODUCT (THE SIGNATURE BOTTLE) */}
        <div className="relative w-full max-w-[320px] md:max-w-[500px] group">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 aspect-[3/4] flex items-center justify-center overflow-hidden rounded-lg border border-gold/10 bg-luxury-dark/40 shadow-[0_0_80px_rgba(0,0,0,0.6)]"
          >
            <img 
              src="/Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg" 
              alt="Noir Libre Signature" 
              className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-2000"
            />
            
            {/* Soft Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent"></div>
            
            {/* Minimal Info Overlay */}
            <div className="absolute bottom-8 left-0 right-0 px-6 flex justify-between items-end">
              <div className="text-left">
                <span className="text-[8px] text-gold uppercase tracking-[0.3em] font-bold block mb-1">Fragrance Noir</span>
                <h3 className="text-xl font-serif italic text-luxury-white">Noir Libre</h3>
              </div>
              <div className="text-right">
                <span className="text-lg font-serif text-gold">₹4,499</span>
              </div>
            </div>
          </motion.div>
          
          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-gold/5 blur-3xl -z-10 rounded-full animate-pulse"></div>
        </div>

        {/* ACTION & SCROLL */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16 flex flex-col items-center"
        >
          <InteractiveHoverButton 
            text="Explore Collection" 
            className="bg-gold text-black border-gold hover:bg-gold/90 px-12 py-5 font-black uppercase tracking-[0.2em] text-[10px]"
            loadingText="Loading..."
            successText="Discovering"
          />
          
          <div className="mt-20 flex flex-col items-center">
            <span className="text-[8px] text-gold/30 uppercase tracking-[0.5em] mb-4 italic">Begin the Journey</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-gold/50 to-transparent"></div>
          </div>
        </motion.div>
      </div>

      {/* Side Decorative Lines */}
      <div className="absolute left-12 top-0 bottom-0 w-[1px] bg-gold/5 hidden lg:block"></div>
      <div className="absolute right-12 top-0 bottom-0 w-[1px] bg-gold/5 hidden lg:block"></div>
    </section>
  );
}



