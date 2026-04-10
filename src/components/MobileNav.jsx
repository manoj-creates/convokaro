import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, MessagesSquare, Target, TrendingUp, Settings } from 'lucide-react';

const MobileNav = () => {
    const location = useLocation();

    const navItems = [
        { id: 'dashboard', path: '/dashboard', label: 'Home', icon: LayoutDashboard },
        { id: 'practice', path: '/practice', label: 'Practice', icon: MessagesSquare },
        { id: 'progress', path: '/progress', label: 'Stats', icon: TrendingUp },
        { id: 'profile', path: '/profile', label: 'Settings', icon: Settings },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#141a24] flex justify-around items-center h-16 md:hidden z-50 border-t border-white/10 px-2 pb-safe">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                const Icon = item.icon;

                return (
                    <Link
                        key={item.id}
                        to={item.path}
                        className={`flex flex-col items-center justify-center w-full h-full transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-400'}`}
                    >
                        <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                        <span className="text-[10px] mt-1 font-medium">{item.label}</span>
                    </Link>
                );
            })}
        </nav>
    );
};

export default MobileNav;