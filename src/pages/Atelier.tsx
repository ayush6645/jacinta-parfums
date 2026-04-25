import { motion } from 'motion/react';
import { JacintaLoader } from '@/src/components/ui/jacinta-loader';

export default function AtelierPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-luxury-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gold text-[10px] uppercase tracking-[0.6em] mb-4 block font-bold">The Artisanal Workspace</span>
          <h1 className="text-6xl md:text-8xl font-serif italic mb-12">The Atelier</h1>
          
          <div className="relative max-w-4xl mx-auto mb-24">
             <div className="absolute inset-0 bg-gold blur-[120px] opacity-10"></div>
             <img 
               src="/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg" 
               alt="Atelier" 
               className="w-full h-[500px] object-cover border border-gold/10 grayscale hover:grayscale-0 transition-all duration-1000" 
             />
          </div>

          <div className="grid md:grid-cols-2 gap-16 text-left max-w-5xl mx-auto">
            <div>
              <h3 className="text-2xl font-serif italic mb-6 text-gold">A Sanctuary of Scent</h3>
              <p className="text-luxury-white/40 leading-relaxed font-light">
                Located in the heart of our botanical gardens, the Jacinta Atelier is where chemistry meets poetry. 
                Our grand master perfumers work with rare molecules and aged absolutes to craft fragrances that defy convention.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-serif italic mb-6 text-gold">The Molecular Lab</h3>
              <p className="text-luxury-white/40 leading-relaxed font-light">
                Equipped with state-of-the-art fractional distillation units and a vast library of over 3,000 raw materials, 
                our lab is a playground for olfactory innovation.
              </p>
            </div>
          </div>
        </motion.div>
        
        <div className="mt-32">
          <JacintaLoader size={120} />
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/40 mt-8">Innovation in every drop</p>
        </div>
      </div>
    </div>
  );
}
