import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, User, ArrowRight, Github, Phone, ShieldCheck } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '@/src/lib/utils';
import { useStore } from '@/src/store/useStore';
import { FlowButton } from '@/src/components/ui/flow-hover-button';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState('julian@aurelian.com');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Julian Vance');
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isLogin && !showOtp) {
      setShowOtp(true);
      return;
    }
    setUser({ email, name });
    navigate('/profile');
  };

  return (
    <div className="pt-20 min-h-screen bg-luxury-black flex items-center justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gold/5 to-transparent pointer-events-none"></div>
      <div className="absolute top-1/4 -right-20 w-80 h-80 rounded-full bg-gold/5 blur-[100px]"></div>
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 rounded-full bg-gold/5 blur-[100px]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg p-8 lg:p-12 border border-gold/10 bg-luxury-dark/60 backdrop-blur-xl z-10 mx-6 my-12"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-serif italic mb-4">
            {isLogin ? 'Welcome Back' : (showOtp ? 'Security Check' : 'Join The Collective')}
          </h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gold/60">
            {isLogin 
              ? 'Access the Aurelian Atelier' 
              : (showOtp ? 'Verify your identity to proceed' : 'Registration is optional to explore, required to acquire.')
            }
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {!isLogin && !showOtp && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-luxury-white/40 ml-1">First Name</label>
                <input 
                  type="text"
                  placeholder="Julian"
                  className="w-full bg-black/40 border border-gold/10 p-4 focus:border-gold outline-none transition-colors text-sm"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-luxury-white/40 ml-1">Last Name</label>
                <input 
                  type="text"
                  placeholder="Vance"
                  className="w-full bg-black/40 border border-gold/10 p-4 focus:border-gold outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>
          )}

          {!showOtp && (
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-luxury-white/40 ml-1">Email Address</label>
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
                  <input 
                    type="email"
                    placeholder="julian@aurelian.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-black/40 border border-gold/10 p-4 pl-12 focus:border-gold outline-none transition-colors text-sm"
                    required
                  />
                </div>
                {!isLogin && (
                  <button 
                    type="button"
                    onClick={() => setIsEmailSent(true)}
                    className={cn(
                      "px-4 text-[9px] uppercase tracking-widest border transition-all no-flow",
                      isEmailSent ? "border-green-500/40 text-green-500" : "border-gold/20 text-gold/60 hover:border-gold"
                    )}
                  >
                    {isEmailSent ? 'Sent' : 'Verify'}
                  </button>
                )}
              </div>
              {isEmailSent && <p className="text-[9px] text-green-500/60 uppercase tracking-tighter mt-2 ml-1 italic">Verification link sent to your inbox.</p>}
            </div>
          )}

          {!isLogin && !showOtp && (
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-luxury-white/40 ml-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
                <input 
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-black/40 border border-gold/10 p-4 pl-12 focus:border-gold outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>
          )}

          {!showOtp && (
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-[10px] uppercase tracking-widest text-luxury-white/40 ml-1">Password</label>
                {isLogin && <button type="button" className="text-[10px] text-gold/40 hover:text-gold transition-colors">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
                <input 
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-gold/10 p-4 pl-12 focus:border-gold outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>
          )}

          {!isLogin && !showOtp && (
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-widest text-luxury-white/40 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/40" size={16} />
                <input 
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-black/40 border border-gold/10 p-4 pl-12 focus:border-gold outline-none transition-colors text-sm"
                  required
                />
              </div>
            </div>
          )}

          {showOtp && (
            <div className="space-y-8 py-6 text-center">
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <input 
                    key={i} 
                    type="text" 
                    maxLength={1} 
                    className="w-12 h-14 bg-black/40 border border-gold/10 text-center text-xl font-serif focus:border-gold outline-none" 
                  />
                ))}
              </div>
              <p className="text-[10px] text-luxury-white/30 uppercase tracking-[0.2em]">Resend code in 0:59</p>
            </div>
          )}

          <button 
            type="submit"
            className="w-full bg-gold text-black py-5 text-[11px] font-bold uppercase tracking-[0.3em] shadow-[0_0_20px_rgba(201,161,74,0.2)] hover:bg-gold-hover transition-all flex items-center justify-center gap-3 no-flow"
          >
            {isLogin ? 'Enter Atelier' : (showOtp ? 'Confirm Identity' : 'Register & Verify')}
            <ArrowRight size={14} />
          </button>
        </form>

        <div className="mt-12 text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center px-4">
              <div className="w-full border-t border-gold/5"></div>
            </div>
            <span className="relative bg-luxury-dark px-4 text-[8px] uppercase tracking-widest text-luxury-white/20">navigation control</span>
          </div>

          <p className="text-[10px] text-luxury-white/40 tracking-widest mb-6">
            {isLogin ? "New to the Collective?" : "Already a member?"}{' '}
            <button 
              onClick={() => { setIsLogin(!isLogin); setShowOtp(false); }}
              className="text-gold font-bold hover:underline ml-1 no-flow"
            >
              {isLogin ? 'JOIN US' : 'SIGN IN'}
            </button>
          </p>

          <Link to="/" className="text-[10px] text-gold/40 hover:text-gold uppercase tracking-[0.4em] transition-colors italic block">
            Continue exploring as guest
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
