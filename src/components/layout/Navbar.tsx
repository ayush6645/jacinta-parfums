import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu, Sun, Moon, X } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { cn } from '@/src/lib/utils';


export default function Navbar() {
  const { cart, user, theme, toggleTheme } = useStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <nav className="h-20 px-6 md:px-12 flex items-center justify-between glass-nav fixed top-0 left-0 right-0 z-[100] transition-colors duration-700">
        <div className="flex items-center gap-12">
          <Link to="/" className="text-xl md:text-2xl font-serif tracking-[0.2em] text-gold font-bold no-flow" onClick={() => setIsMenuOpen(false)}>
            JΛCINTΛ
          </Link>
          <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.15em] font-medium text-luxury-white/60">
            <Link to="/collections" className="hover:text-gold transition-colors no-flow">Collections</Link>
            <Link to="/atelier" className="hover:text-luxury-white transition-colors no-flow">The Atelier</Link>
            <Link to="/bespoke" className="hover:text-luxury-white transition-colors no-flow">Bespoke</Link>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-8">
          <div className="hidden md:flex items-center gap-2 border-b border-gold/30 pb-1 cursor-pointer group no-flow">
            <Search size={14} className="text-gold group-hover:scale-110 transition-transform" />
            <span className="text-[10px] uppercase tracking-widest">Search</span>
          </div>
          
          <div className="flex gap-3 md:gap-6 items-center">
            {/* Theme Toggle - Desktop Only */}
            <button 
              onClick={toggleTheme}
              className="hidden md:flex p-2 rounded-full border border-gold/20 hover:bg-gold/10 transition-all no-flow text-gold"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>

            {/* Wishlist - Desktop Only */}
            <Link to="/wishlist" className="hidden md:flex relative text-luxury-white/60 hover:text-luxury-white transition-colors no-flow">
              <Heart size={18} />
            </Link>
            
            {/* Cart - Always Visible */}
            <Link to="/cart" className="relative group no-flow flex items-center gap-2 px-1 py-1" onClick={() => setIsMenuOpen(false)}>
              <div className="relative">
                <ShoppingBag size={20} className="text-gold/80 group-hover:text-gold transition-colors" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-[16px] bg-gold text-black text-[9px] flex items-center justify-center rounded-full font-bold px-1 ring-1 ring-black shadow-[0_0_10px_rgba(201,161,74,0.4)]">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-[10px] uppercase tracking-widest hidden md:inline group-hover:text-gold transition-colors pt-0.5">Cart</span>
            </Link>

            {/* Profile - Desktop Only */}
            <Link 
              to={user.isLoggedIn ? "/profile" : "/login"} 
              className={cn(
                "hidden md:flex w-8 h-8 rounded-full border items-center justify-center cursor-pointer hover:bg-gold/10 transition-colors no-flow",
                user.isLoggedIn ? "border-gold bg-gold/5" : "border-gold/40"
              )}
            >
              <User size={14} className={user.isLoggedIn ? "text-gold" : "text-luxury-white"} />
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="lg:hidden p-2 text-gold no-flow"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[90] bg-luxury-black transition-transform duration-500 lg:hidden flex flex-col pt-32 px-10",
        isMenuOpen ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="flex flex-col gap-8">
          <Link 
            to="/collections" 
            className="text-4xl font-serif italic text-luxury-white hover:text-gold transition-colors no-flow"
            onClick={() => setIsMenuOpen(false)}
          >
            Collections
          </Link>
          <Link 
            to="/atelier" 
            className="text-4xl font-serif italic text-luxury-white hover:text-gold transition-colors no-flow"
            onClick={() => setIsMenuOpen(false)}
          >
            The Atelier
          </Link>
          <Link 
            to="/bespoke" 
            className="text-4xl font-serif italic text-luxury-white hover:text-gold transition-colors no-flow"
            onClick={() => setIsMenuOpen(false)}
          >
            Bespoke
          </Link>
        </div>

        <div className="mt-auto mb-20 flex flex-col gap-8 border-t border-gold/10 pt-10">
          <div className="flex items-center justify-between">
            <Link 
              to={user.isLoggedIn ? "/profile" : "/login"} 
              className="flex items-center gap-4 text-luxury-white/60 no-flow"
              onClick={() => setIsMenuOpen(false)}
            >
              <User size={20} className="text-gold" />
              <span className="uppercase text-xs tracking-widest">{user.isLoggedIn ? "Your Profile" : "Login / Register"}</span>
            </Link>
            <button 
              onClick={toggleTheme}
              className="p-3 rounded-full border border-gold/20 text-gold no-flow"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
          <Link 
            to="/wishlist" 
            className="flex items-center gap-4 text-luxury-white/60 no-flow"
            onClick={() => setIsMenuOpen(false)}
          >
            <Heart size={20} className="text-gold" />
            <span className="uppercase text-xs tracking-widest">Wishlist</span>
          </Link>
        </div>
      </div>
    </>
  );
}

