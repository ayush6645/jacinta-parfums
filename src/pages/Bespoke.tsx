import { motion } from 'motion/react';
import { FlowButton } from '@/src/components/ui/flow-hover-button';
import { Star, ShieldCheck, Sparkles } from 'lucide-react';

export default function BespokePage() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-luxury-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full lg:w-1/2"
          >
            <span className="text-gold text-[10px] uppercase tracking-[0.6em] mb-6 block font-bold italic">Exclusive Service</span>
            <h1 className="text-6xl md:text-8xl font-serif italic mb-8 leading-tight">Bespoke<br />Fragrance</h1>
            <p className="text-luxury-white/50 text-lg leading-relaxed font-light mb-12 italic">
              "Your identity, distilled into a singular olfactory masterpiece."
            </p>
            
            <div className="space-y-8 mb-12">
              {[
                { icon: Star, title: 'Private Consultation', desc: 'A 3-hour immersive session with our Master Perfumer.' },
                { icon: Sparkles, title: 'Rare Ingredients', desc: 'Access to our private vault of aged absolutes and limited resins.' },
                { icon: ShieldCheck, title: 'Olfactory Signature', desc: 'The formula is yours alone, archived in our safe for lifetime refills.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div className="p-3 border border-gold/10 group-hover:border-gold/40 transition-colors">
                    <item.icon size={20} className="text-gold" />
                  </div>
                  <div>
                    <h4 className="text-[11px] uppercase tracking-widest text-gold font-bold mb-1">{item.title}</h4>
                    <p className="text-xs text-luxury-white/40 leading-relaxed font-light">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <FlowButton className="px-16 py-6 border-gold text-gold text-[11px] font-bold uppercase tracking-[0.4em] no-flow">
              Request Invitation
            </FlowButton>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] bg-luxury-dark border border-gold/10 overflow-hidden">
               <img 
                 src="/Images/WhatsApp Image 2026-04-22 at 10.18.12 AM.jpeg" 
                 alt="Bespoke Experience" 
                 className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-1000" 
               />
            </div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-gold/10 bg-luxury-black/80 backdrop-blur-md p-6 hidden md:block">
              <div className="text-[10px] uppercase tracking-widest text-gold font-bold mb-2">Price Starting At</div>
              <div className="text-2xl font-serif">₹1,50,000</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
