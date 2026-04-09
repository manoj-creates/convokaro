import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 transition-all duration-300">
      {/* Glassmorphism nav container */}
      <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border-b border-white shadow-glass pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-convo-green-light to-convo-green shadow-3d group-hover:shadow-3d-hover transition-all flex items-center justify-center transform group-hover:scale-105">
                 <div className="absolute inset-0 bg-white/20 rounded-xl rounded-b-none h-1/2"></div>
                 <div className="w-2.5 h-2.5 bg-white rounded-full shadow-inner-light"></div>
              </div>
              <span className="font-serif text-2xl text-convo-ink font-bold tracking-wide mt-1">ConvoKaro</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <a href="#features" className="text-gray-500 hover:text-convo-green font-medium transition-colors">Features</a>
            <a href="#pricing" className="text-gray-500 hover:text-convo-green font-medium transition-colors">Pricing</a>
            {user ? (
              <Link to="/dashboard" className="btn-primary py-2.5 px-6 !text-sm">Dashboard</Link>
            ) : (
              <div className="flex items-center gap-5">
                <Link to="/auth" className="text-convo-ink font-bold hover:text-convo-green transition-colors">Login</Link>
                <Link to="/auth" className="btn-primary py-2.5 px-6 !text-sm">Start Free</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
