import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveHoverButton from '../ui/interactive-hover-button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* Brand Identity Overlay - Cinematic feel requested by user */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black z-10 opacity-80"></div>
        <img 
          src="/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg" 
          alt="Brand Background" 
          className="w-full h-full object-cover opacity-20 scale-110 blur-sm"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center z-10">
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left mb-12 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 block lg:hidden"
          >
            <h2 className="text-gold text-[10px] tracking-[0.8em] uppercase font-bold mb-2">Jacinta</h2>
            <div className="w-20 h-[1px] bg-gold/30 mx-auto"></div>
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold text-[10px] md:text-xs uppercase tracking-[0.4em] mb-4 font-semibold"
          >
            Exclusively Crafted
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif italic leading-[1.1] mb-6 text-luxury-white"
          >
            Noir <br /> <span className="not-italic text-gold">Libre</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-luxury-white/50 text-[13px] md:text-base leading-relaxed max-w-[280px] md:max-w-sm mx-auto lg:mx-0 mb-10 font-light italic"
          >
            An elegant expression of freedom. A sophisticated blend that balances dark intensity with refined grace.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8"
          >
            <InteractiveHoverButton 
              text="Discover Now" 
              className="bg-gold text-black border-gold hover:bg-gold/90 w-full sm:w-auto px-10 py-4"
              loadingText="Entering..."
              successText="Welcome"
            />
            <div className="flex items-center gap-3">
              <span className="text-xl md:text-2xl font-serif">₹4,499</span>
              <span className="text-[9px] text-luxury-white/40 uppercase tracking-widest">50ml / 1.7oz</span>
            </div>
          </motion.div>
        </div>

        {/* Visual Element */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-12 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            className="relative w-full max-w-[320px] md:max-w-[450px] aspect-[4/5] bg-luxury-dark border border-gold/10 shadow-2xl flex flex-col items-center justify-center group overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black to-transparent opacity-60 group-hover:opacity-40 transition-opacity z-10"></div>
            
            <div className="w-full h-full relative flex items-center justify-center group-hover:scale-105 transition-transform duration-1000">
              <img src="/Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg" alt="Noir Libre" className="w-full h-full object-cover opacity-90" />
            </div>
            
            <div className="absolute bottom-10 left-0 right-0 text-center z-10">
              <div className="text-gold text-[9px] tracking-[0.5em] uppercase mb-2">The Signature</div>
              <div className="w-12 h-[1px] bg-gold/40 mx-auto"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Textures */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 luxury-gradient pointer-events-none opacity-30 lg:opacity-100"></div>
    </section>
  );
}

