import { useState } from 'react';
import { useStore } from '@/src/store/useStore';
import { motion } from 'motion/react';
import { User, Package, MapPin, Settings, LogOut, ChevronRight, Star } from 'lucide-react';
import { useNavigate, Navigate } from 'react-router-dom';
import { Modal } from '@/src/components/ui/modal';
import { FlowButton } from '@/src/components/ui/flow-hover-button';

export default function ProfilePage() {
  const { user, logout } = useStore();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Profile Details');
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);

  if (!user.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const orders = [
    { id: 'ORD-2938', date: '22 Apr 2026', status: 'In Transit', total: '₹4,499', item: 'Noir Libre' },
    { id: 'ORD-1049', date: '10 Mar 2026', status: 'Delivered', total: '₹4,499', item: 'Summer Ice' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Order History':
        return (
          <section>
            <div className="flex justify-between items-center mb-8 border-b border-gold/10 pb-4">
              <h3 className="text-xl font-serif italic">Recent Acquisitions</h3>
              <button className="text-[10px] uppercase tracking-widest text-luxury-white/40 hover:text-gold transition-colors no-flow">Filter by Date</button>
            </div>
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="p-6 border border-gold/5 bg-luxury-dark/20 hover:border-gold/20 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-20 bg-black border border-gold/10 overflow-hidden flex-shrink-0">
                         <div className="w-full h-full bg-gradient-to-br from-gold/20 to-black opacity-50 flex items-center justify-center">
                           <Package size={20} className="text-gold/40" />
                         </div>
                      </div>
                      <div>
                        <div className="text-sm font-bold uppercase tracking-widest text-luxury-white group-hover:text-gold transition-colors">{order.item}</div>
                        <div className="text-[10px] text-luxury-white/40 mt-1 uppercase tracking-tighter">{order.id} • {order.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between md:justify-end gap-12">
                      <div className="text-right">
                        <div className="text-sm font-serif">{order.total}</div>
                        <div className="text-[9px] uppercase tracking-widest text-gold mt-1">{order.status}</div>
                      </div>
                      <button className="p-3 border border-gold/10 hover:border-gold/30 transition-colors no-flow">
                        <ChevronRight size={14} className="text-luxury-white/40 group-hover:text-gold transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        );
      case 'Shipping Addresses':
        return (
          <section>
            <div className="flex justify-between items-center mb-8 border-b border-gold/10 pb-4">
              <h3 className="text-xl font-serif italic">Addresses</h3>
              <button 
                onClick={() => setIsAddressModalOpen(true)}
                className="text-[10px] uppercase tracking-widest text-gold hover:text-luxury-white transition-colors no-flow"
              >
                + Add New
              </button>
            </div>
            <div className="p-8 border border-gold/10 bg-gold/5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-gold" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">Primary Residence</span>
                </div>
                <span className="text-[8px] bg-gold text-black px-2 py-0.5 font-bold uppercase tracking-tighter">Default</span>
              </div>
              <p className="text-sm text-luxury-white/60 leading-relaxed max-w-xs font-light">
                {user.name}<br />
                123 Luxury Lane, Penthouse 4<br />
                New York, NY 10001<br />
                United States
              </p>
            </div>
          </section>
        );
      case 'Member Rewards':
        return (
          <section>
            <div className="flex justify-between items-center mb-8 border-b border-gold/10 pb-4">
              <h3 className="text-xl font-serif italic">Aurelian Rewards</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="p-8 border border-gold/10 bg-gold/5 flex flex-col justify-between">
                <h4 className="text-[10px] uppercase tracking-widest text-gold mb-6 font-bold">Atelier Points</h4>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-serif">1,240</span>
                  <button className="text-[9px] uppercase tracking-widest border-b border-gold pb-1 text-gold hover:text-luxury-white transition-colors no-flow">Redeem Now</button>
                </div>
              </div>
              <div className="p-8 border border-gold/10 bg-luxury-dark/40 flex flex-col justify-between">
                <h4 className="text-[10px] uppercase tracking-widest text-luxury-white/40 mb-6 font-bold">Tier Level</h4>
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-serif italic">Gold Member</span>
                  <span className="text-[9px] uppercase tracking-widest text-luxury-white/20">Next Tier: Platinum</span>
                </div>
              </div>
            </div>
          </section>
        );
      case 'Settings':
        return (
          <section className="space-y-12">
             <div className="flex justify-between items-center mb-8 border-b border-gold/10 pb-4">
              <h3 className="text-xl font-serif italic">Atelier Settings</h3>
            </div>
            
            {/* Personal Info */}
            <div className="space-y-6">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6">Personal Information</h4>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-luxury-white/40 ml-1">Display Name</label>
                  <div className="flex gap-4">
                    <input className="flex-1 bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" defaultValue={user.name} />
                    <button className="px-4 border border-gold/20 text-[9px] uppercase tracking-widest hover:border-gold hover:text-gold transition-colors no-flow">Update</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-luxury-white/40 ml-1">Email Address</label>
                  <div className="flex gap-4">
                    <input className="flex-1 bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" defaultValue={user.email} />
                    <button className="px-4 border border-gold/20 text-[9px] uppercase tracking-widest hover:border-gold hover:text-gold transition-colors no-flow">Change</button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase tracking-widest text-luxury-white/40 ml-1">Contact Number</label>
                  <div className="flex gap-4">
                    <input className="flex-1 bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" defaultValue="+1 (555) 000-7890" />
                    <button className="px-4 border border-gold/20 text-[9px] uppercase tracking-widest hover:border-gold hover:text-gold transition-colors no-flow">Update</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="space-y-6 pt-12 border-t border-gold/5">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6">Security & Authentication</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-6 border border-gold/10 bg-gold/5 group">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-luxury-white font-bold mb-1">Two-Factor Authentication (2FA)</div>
                    <div className="text-[10px] text-luxury-white/40 font-light italic">Secure your account with an additional verification step.</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] uppercase tracking-widest text-gold/60">Currently Disabled</span>
                    <button className="px-6 py-2 bg-gold text-black text-[9px] font-bold uppercase tracking-widest hover:bg-gold-hover transition-all no-flow">Enable</button>
                  </div>
                </div>

                <div className="flex justify-between items-center p-6 border border-gold/5 bg-luxury-dark/20">
                  <div>
                    <div className="text-[11px] uppercase tracking-widest text-luxury-white/60 font-bold mb-1">Change Password</div>
                    <div className="text-[10px] text-luxury-white/30 font-light italic">Last updated 3 months ago.</div>
                  </div>
                  <button className="text-[9px] uppercase tracking-widest text-gold hover:text-luxury-white transition-colors no-flow">Update Secret</button>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="space-y-6 pt-12 border-t border-gold/5">
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gold font-bold mb-6">Preferences</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: 'Olfactory Newsletters', status: 'Subscribed' },
                  { label: 'Order Notifications', status: 'Enabled' },
                  { label: 'Private Event Invites', status: 'Enabled' },
                  { label: 'Marketing Cookies', status: 'Refused' },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center p-4 border border-gold/5 bg-luxury-dark/20">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-white/40">{item.label}</span>
                    <button className="text-[9px] uppercase tracking-widest text-gold font-bold no-flow">{item.status}</button>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return (
          <section>
            <div className="flex justify-between items-center mb-8 border-b border-gold/10 pb-4">
              <h3 className="text-xl font-serif italic">Profile Details</h3>
              <button className="text-[10px] uppercase tracking-widest text-luxury-white/40 hover:text-gold transition-colors no-flow">Edit Profile</button>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-luxury-white/20 mb-2">Full Name</h4>
                  <p className="text-sm font-serif italic border-b border-gold/10 pb-2">{user.name}</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-luxury-white/20 mb-2">Email Address</h4>
                  <p className="text-sm font-serif italic border-b border-gold/10 pb-2">{user.email}</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-luxury-white/20 mb-2">Member Since</h4>
                  <p className="text-sm font-serif italic border-b border-gold/10 pb-2">October 2025</p>
                </div>
                <div>
                  <h4 className="text-[10px] uppercase tracking-widest text-luxury-white/20 mb-2">Phone</h4>
                  <p className="text-sm font-serif italic border-b border-gold/10 pb-2">+1 (555) 000- luxury</p>
                </div>
              </div>
            </div>
          </section>
        );
    }
  };


  return (
    <div className="pt-32 pb-24 min-h-screen bg-luxury-black">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-8 border border-gold/10 bg-luxury-dark/40 backdrop-blur-xl sticky top-32"
            >
              <div className="flex flex-col items-center text-center mb-8">
                <div className="w-20 h-20 rounded-full border-2 border-gold/20 flex items-center justify-center bg-gold/5 mb-4">
                  <User size={32} className="text-gold" />
                </div>
                <h2 className="text-xl font-serif italic">{user.name}</h2>
                <p className="text-[10px] uppercase tracking-widest text-luxury-white/40">{user.email}</p>
              </div>

              <div className="space-y-2">
                {[
                  { icon: User, label: 'Profile Details' },
                  { icon: Package, label: 'Order History' },
                  { icon: MapPin, label: 'Shipping Addresses' },
                  { icon: Star, label: 'Member Rewards' },
                  { icon: Settings, label: 'Settings' },
                ].map((item) => (
                  <button 
                    key={item.label}
                    onClick={() => setActiveTab(item.label)}
                    className={`w-full flex items-center justify-between p-4 text-[10px] uppercase tracking-widest transition-all no-flow ${
                      activeTab === item.label ? 'text-gold bg-gold/5 border border-gold/10' : 'text-luxury-white/40 hover:text-luxury-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={14} />
                      {item.label}
                    </div>
                    <ChevronRight size={12} className={activeTab === item.label ? 'opacity-100' : 'opacity-0'} />
                  </button>
                ))}
                
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 p-4 text-[10px] uppercase tracking-widest text-red-500/60 hover:text-red-500 transition-all mt-8 no-flow"
                >
                  <LogOut size={14} />
                  Logout from Atelier
                </button>
              </div>
            </motion.div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <header className="mb-12">
                <span className="text-gold text-[10px] uppercase tracking-[0.4em] mb-2 block font-semibold italic">The Collective Membership</span>
                <h1 className="text-4xl md:text-5xl font-serif italic">Welcome, {user.name.split(' ')[0]}</h1>
              </header>

              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isAddressModalOpen} 
        onClose={() => setIsAddressModalOpen(false)} 
        title="Add New Address"
      >
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAddressModalOpen(false); }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-luxury-white/40">Full Name</label>
              <input className="w-full bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" placeholder="Julian Vance" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-luxury-white/40">Phone Number</label>
              <input className="w-full bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" placeholder="+1 (555) 000-0000" />
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-luxury-white/40">Email Address</label>
            <input className="w-full bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" placeholder="julian@aurelian.com" />
          </div>

          <div className="space-y-2">
            <label className="text-[9px] uppercase tracking-widest text-luxury-white/40">Street Address</label>
            <input className="w-full bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" placeholder="123 Luxury Lane" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-luxury-white/40">City</label>
              <input className="w-full bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" placeholder="New York" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-luxury-white/40">State</label>
              <input className="w-full bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" placeholder="NY" />
            </div>
            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-widest text-luxury-white/40">Postal Code</label>
              <input className="w-full bg-black/40 border border-gold/10 p-3 focus:border-gold outline-none text-xs" placeholder="10001" />
            </div>
          </div>

          <div className="pt-6">
            <FlowButton className="w-full py-4 border-gold text-gold text-[10px] font-bold uppercase tracking-[0.3em] no-flow">
              Save Atelier Address
            </FlowButton>
          </div>
        </form>
      </Modal>
    </div>

  );
}
