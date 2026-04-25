import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveHoverButton from '../ui/interactive-hover-button';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-10 md:pt-20 overflow-hidden">
      {/* User Requested Cinematic Texture Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <img 
          loading="eager" 
          alt="" 
          className="w-full h-full object-cover mix-blend-overlay opacity-30 scale-110" 
          src="https://images.unsplash.com/photo-1550686041-366ad85a1355?q=80&w=2000&auto=format&fit=crop"
        />
      </div>

      {/* Brand Identity Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-luxury-black via-transparent to-luxury-black z-10 opacity-90"></div>
        <img 
          src="/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg" 
          alt="Brand Background" 
          className="w-full h-full object-cover opacity-10 scale-125 blur-[2px] lg:blur-none"
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center z-30">
        <div className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left mb-8 lg:mb-0">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 block lg:hidden"
          >
            <h2 className="text-gold text-[12px] tracking-[1em] uppercase font-black mb-3">Jacinta</h2>
            <div className="w-24 h-[1px] bg-gold/50 mx-auto"></div>
          </motion.div>

          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold text-[9px] md:text-xs uppercase tracking-[0.5em] mb-4 font-bold"
          >
            The Art of Olfaction
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl lg:text-9xl font-serif italic leading-[1] mb-6 text-luxury-white"
          >
            Noir <br /> <span className="not-italic text-gold drop-shadow-[0_0_20px_rgba(201,161,74,0.3)]">Libre</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-luxury-white/60 text-[14px] md:text-base leading-relaxed max-w-[300px] md:max-w-sm mx-auto lg:mx-0 mb-10 font-light italic"
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
              text="Explore Now" 
              className="bg-gold text-black border-gold hover:bg-gold/90 w-full sm:w-auto px-12 py-5 font-bold"
              loadingText="Entering..."
              successText="Welcome"
            />
            <div className="flex items-center gap-4">
              <span className="text-2xl md:text-3xl font-serif text-luxury-white">₹4,499</span>
              <div className="w-[1px] h-8 bg-gold/20 hidden md:block"></div>
              <span className="text-[10px] text-luxury-white/40 uppercase tracking-[0.2em]">50ml / 1.7oz</span>
            </div>
          </motion.div>
        </div>

        {/* Visual Element */}
        <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative w-full max-w-[280px] md:max-w-[450px] aspect-[4/5] bg-luxury-dark border border-gold/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center group overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-70 z-10"></div>
            
            <div className="w-full h-full relative flex items-center justify-center group-hover:scale-110 transition-transform duration-2000">
              <img src="/Images/WhatsApp Image 2026-04-13 at 2.06.56 PM.jpeg" alt="Noir Libre" className="w-full h-full object-cover opacity-90" />
            </div>
            
            <div className="absolute bottom-12 left-0 right-0 text-center z-20">
              <div className="text-gold text-[10px] tracking-[0.6em] uppercase mb-3 font-bold">The Signature</div>
              <div className="w-16 h-[1px] bg-gold/40 mx-auto"></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Luxury Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center z-30"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] text-gold/40 mb-4 italic">Scroll to Explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-gold to-transparent"></div>
      </motion.div>

      {/* Background Textures */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-2/3 luxury-gradient pointer-events-none opacity-20 lg:opacity-100"></div>
    </section>
  );
}


