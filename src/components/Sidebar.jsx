import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, TrendingUp, User, LogOut, Zap, Target, Settings } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { handleProUpgrade } from '../lib/razorpay';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';

  const navItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'practice', path: '/practice', label: 'Scenarios', icon: MessageSquare },
    { id: 'goals', path: '/goals', label: 'Goals', icon: Target },
    { id: 'progress', path: '/progress', label: 'Progress', icon: TrendingUp },
    { id: 'profile', path: '/profile', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex w-[280px] bg-[#141a24] text-white flex-col gap-4 shadow-[10px_0_30px_rgba(0,0,0,0.15)] z-20 shrink-0 h-screen sticky top-0">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

      <div className="p-8 relative z-10 flex flex-col items-center">
        <Link to="/" className="flex flex-col items-center gap-4 hover:scale-105 transition-transform group">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1ea852] to-[#146b33] flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_8px_16px_rgba(22,163,74,0.4)]">
            <div className="w-5 h-5 bg-white rounded-sm transform rotate-45 shadow-inner-light"></div>
          </div>
          <span className="font-serif text-2xl font-bold tracking-tight text-white group-hover:text-emerald-400 transition-colors drop-shadow-sm">
            Convo<span className="text-emerald-500">Karo</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-5 space-y-3 relative z-10">
        {navItems.map((item) => {
          const isActive = item.id === 'goals' ? false : location.pathname.startsWith(item.path);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl font-medium transition-all group ${isActive
                  ? 'bg-white/10 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/10 glass-panel'
                  : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
            >
              <Icon size={20} className={isActive ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'group-hover:text-emerald-400 transition-colors'} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-5 relative z-10 space-y-4">
        {/* Pro Upgrade Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-b from-[#2a2318] to-[#1e1a14] border border-[#382d1a] relative overflow-hidden group shadow-lg shadow-black/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>
          <div className="flex items-center gap-2 mb-2 text-yellow-500 font-bold text-xs relative z-10">
            <Zap size={14} className="fill-yellow-500" /> Go Pro
          </div>
          <p className="text-[#a89b82] text-[10px] mb-4 relative z-10 leading-relaxed font-medium">Unlock all scenarios and advanced feedback.</p>
          <button
            onClick={() => handleProUpgrade(user)}
            className="w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-2.5 rounded-xl text-xs shadow-md hover:scale-[1.02] transition-transform relative z-10"
          >
            Upgrade Now
          </button>
        </div>

        {/* Profile Card Bottom */}
        <div
          onClick={() => navigate('/profile')}
          className="bg-gradient-to-b from-[#1e2532] to-[#181e28] border border-[#2b3546] rounded-2xl p-4 flex items-center gap-3 shadow-[0_10px_20px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-transform cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center shadow-[inset_0_2px_4px_rgba(255,255,255,0.2)] text-emerald-300 font-bold text-sm tracking-wide group-hover:bg-emerald-500 group-hover:text-white transition-all">
            {userName[0] || 'U'}
          </div>
          <div className="overflow-hidden">
            <div className="font-bold text-sm text-gray-200 truncate">{userName}</div>
            <div className="text-[10px] font-bold text-emerald-400/80 uppercase tracking-widest truncate">Free Plan</div>
          </div>
        </div>

        <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-slate-500 hover:text-red-400 font-bold transition-all text-xs uppercase tracking-widest group">
          <LogOut size={14} className="group-hover:translate-x-[-2px] transition-transform" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
