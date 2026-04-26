import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Hero from './components/home/Hero';
import CollectionPreview from './components/home/CollectionPreview';
import { ParallaxComponent } from './components/ui/parallax-scrolling';
import CollectionsPage from './pages/Collections';
import ProductDetailPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import AuthPage from './pages/Auth';
import WishlistPage from './pages/Wishlist';
import DemosPage from './pages/Demos';
import ProfilePage from './pages/Profile';
import AtelierPage from './pages/Atelier';
import BespokePage from './pages/Bespoke';
import OrderSuccessPage from './pages/OrderSuccess';
import { JacintaLoader } from './components/ui/jacinta-loader';
import { useStore } from './store/useStore';
import { cn } from './lib/utils';
import { FlowButton } from './components/ui/flow-hover-button';




/**
 * Main Application Layout for Immersive Experience
 */
function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col">
        <Hero />
        <CollectionPreview />
        <ParallaxComponent />
        
        {/* Additional Sections */}
        <section className="py-32 bg-luxury-black border-t border-gold/5">
          <div className="container mx-auto px-6 text-center">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gold text-[10px] uppercase tracking-[0.5em] mb-4 block"
            >
              The Essence of JΛCINTΛ
            </motion.span>
            <h2 className="text-5xl md:text-6xl font-serif italic mb-16">The Artisanal Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-12 text-left">
              {[
                { title: 'Ethical Sourcing', desc: 'Rare ingredients harvested at their olfactory peak from protected botanical sanctuaries globally.' },
                { title: 'The Ageing Process', desc: 'Our compounds mature in dark, temperature-controlled cellars for months to reach peak complexity.' },
                { title: 'Atelier Craft', desc: 'Every heavy-glass bottle is hand-poured, hand-labeled, and wax-sealed in our boutique atelier.' }
              ].map((item, idx) => (
                <div key={idx} className="p-10 border border-gold/10 hover:border-gold/30 transition-all bg-luxury-dark/30 group">
                  <div className="text-gold text-[10px] font-bold uppercase tracking-[0.3em] mb-6 group-hover:tracking-[0.5em] transition-all">0{idx + 1}</div>
                  <h4 className="text-2xl font-serif mb-4 italic text-luxury-white/90">{item.title}</h4>
                  <p className="text-sm text-luxury-white/40 leading-relaxed font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Global CTA */}
         <section className="py-40 bg-luxury-dark text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('/Images/WhatsApp Image 2026-04-13 at 2.06.36 PM.jpeg')] bg-cover bg-fixed bg-center opacity-10"></div>
           <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
             <JacintaLoader className="mb-12" size={150} />
             <h3 className="text-4xl md:text-5xl font-serif italic mb-8">Personalize Your Scent Experience</h3>
             <p className="text-luxury-white/50 text-sm tracking-wide mb-12 max-w-lg mx-auto italic">
               Consult with our grand master perfumers to create a scent that is uniquely yours.
             </p>
             <Link to="/bespoke" className="no-flow">
               <FlowButton className="px-12 py-5 border-gold text-gold text-[10px] font-bold uppercase tracking-[0.3em]">
                 Book a Bespoke Session
               </FlowButton>
             </Link>

           </div>
         </section>

      </main>
      
      {/* Visual Overlay Texture */}
      <div className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] z-50"></div>
    </div>
  );
}

// Global animation imports
import { motion } from 'motion/react';

import { useEffect } from 'react';

export default function App() {
  const theme = useStore((state) => state.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark-theme');
    } else {
      document.documentElement.classList.remove('dark-theme');
    }
  }, [theme]);

  return (
    <Router>
      <div className={cn(
        "relative selection:bg-gold/30 selection:text-gold min-h-screen flex flex-col transition-colors duration-700 bg-luxury-black text-luxury-white",
        theme === 'dark' ? 'dark-theme' : ''
      )}>
        <Navbar />


        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/collections" element={<CollectionsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            
             <Route path="/cart" element={<CartPage />} />
             <Route path="/wishlist" element={<WishlistPage />} />
             <Route path="/profile" element={<ProfilePage />} />
              <Route path="/atelier" element={<AtelierPage />} />
              <Route path="/bespoke" element={<BespokePage />} />
              <Route path="/login" element={<AuthPage />} />

              <Route path="/demos" element={<DemosPage />} />
              <Route path="/order-success" element={<OrderSuccessPage />} />

           </Routes>

        </main>
        
        <footer className="py-20 px-6 md:px-12 bg-luxury-black border-t border-gold/10">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 mb-20">
              <div className="max-w-xs text-center md:text-left">
                <Link to="/" className="text-3xl font-serif tracking-[0.3em] text-gold font-bold mb-6 block">
                  JΛCINTΛ
                </Link>
                <p className="text-[11px] text-luxury-white/30 tracking-tight leading-loose uppercase">
                  The definitive voice of high-contemporary perfumery. Crafting memories through molecular excellence.
                </p>
              </div>
              
              <div className="flex gap-24">
                <div className="flex flex-col gap-4">
                  <h5 className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-2">Explore</h5>
                  <Link to="/collections" className="text-[10px] text-luxury-white/40 uppercase tracking-widest hover:text-gold transition-colors">Collections</Link>
                  <Link to="/atelier" className="text-[10px] text-luxury-white/40 uppercase tracking-widest hover:text-gold transition-colors">The Atelier</Link>
                   <Link to="/bespoke" className="text-[10px] text-luxury-white/40 uppercase tracking-widest hover:text-gold transition-colors">Bespoke</Link>
                  <Link to="/demos" className="text-[10px] text-gold uppercase tracking-widest hover:text-gold transition-colors font-bold">Animations Demo</Link>
                 </div>

                <div className="flex flex-col gap-4">
                  <h5 className="text-[10px] text-gold uppercase tracking-[0.3em] font-bold mb-2">Legal</h5>
                  <Link to="/terms" className="text-[10px] text-luxury-white/40 uppercase tracking-widest hover:text-gold transition-colors">Terms of Use</Link>
                  <Link to="/privacy" className="text-[10px] text-luxury-white/40 uppercase tracking-widest hover:text-gold transition-colors">Privacy Policy</Link>
                  <Link to="/cookies" className="text-[10px] text-luxury-white/40 uppercase tracking-widest hover:text-gold transition-colors">Cookies</Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gold/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex gap-6">
                {['Instagram', 'Twitter', 'Facebook'].map(social => (
                  <a key={social} href="#" className="text-[10px] text-luxury-white/30 uppercase tracking-widest hover:text-gold transition-colors">{social}</a>
                ))}
              </div>
              <p className="text-[9px] text-luxury-white/20 uppercase tracking-[0.3em]">
                © 2026 JΛCINTΛ Parfums. All Rights Reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}


