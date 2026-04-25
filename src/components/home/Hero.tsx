import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import InteractiveHoverButton from '../ui/interactive-hover-button';
import RuixenCarouselWave from '../ui/ruixen-carousel-wave';

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
          className="mb-8"
        >
          <h2 className="text-gold text-[10px] md:text-xs tracking-[0.8em] uppercase font-bold mb-4">
            The Art of Olfaction
          </h2>
          <h1 className="text-luxury-white text-5xl md:text-8xl font-serif italic tracking-tighter leading-tight animate-gold-glow">
            Jacinta <span className="not-italic text-gold/80">Atelier</span>
          </h1>
        </motion.div>

        {/* HERO PRODUCT (THE CINEMATIC WAVE) */}
        <div className="w-full max-w-6xl">
          <RuixenCarouselWave />
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



