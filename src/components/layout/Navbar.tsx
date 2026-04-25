import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Heart, Menu } from 'lucide-react';
import { useStore } from '@/src/store/useStore';
import { cn } from '@/src/lib/utils';


export default function Navbar() {
  const { cart, user } = useStore();
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="h-20 px-6 md:px-12 flex items-center justify-between glass-nav fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-12">
        <Link to="/" className="text-2xl font-serif tracking-[0.2em] text-gold font-bold no-flow">
          JACINTA
        </Link>
        <div className="hidden lg:flex gap-8 text-[11px] uppercase tracking-[0.15em] font-medium text-luxury-white/60">
          <Link to="/collections" className="hover:text-gold transition-colors no-flow">Collections</Link>
          <Link to="/atelier" className="hover:text-luxury-white transition-colors no-flow">The Atelier</Link>
          <Link to="/bespoke" className="hover:text-luxury-white transition-colors no-flow">Bespoke</Link>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="hidden md:flex items-center gap-2 border-b border-gold/30 pb-1 cursor-pointer group no-flow">
          <Search size={14} className="text-gold group-hover:scale-110 transition-transform" />
          <span className="text-[10px] uppercase tracking-widest">Search</span>
        </div>
        
        <div className="flex gap-4 md:gap-6 items-center">
          <Link to="/wishlist" className="relative text-luxury-white/60 hover:text-luxury-white transition-colors no-flow">
            <Heart size={18} />
          </Link>
          
          <Link to="/cart" className="relative group no-flow flex items-center gap-2 px-2 py-1">
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



          <Link 
            to={user.isLoggedIn ? "/profile" : "/login"} 
            className={cn(
              "w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer hover:bg-gold/10 transition-colors no-flow",
              user.isLoggedIn ? "border-gold bg-gold/5" : "border-gold/40"
            )}
          >
            <User size={14} className={user.isLoggedIn ? "text-gold" : "text-luxury-white"} />
          </Link>
          
          <button className="lg:hidden no-flow">
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>

  );
}
