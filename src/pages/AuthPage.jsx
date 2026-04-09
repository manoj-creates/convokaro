import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check, User, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AuthPage() {
  const navigate = useNavigate();

  // State Management
  const [authMode, setAuthMode] = useState('login'); // 'login', 'signup', 'forgot'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status Flags
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMsg('');

    try {
      if (authMode === 'login') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/dashboard');
      } else if (authMode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setSuccessMsg('Success! Check your email for the confirmation link to complete signup.');
      } else if (authMode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) throw error;
        setSuccessMsg('Password reset instructions have been sent to your email.');
      }
    } catch (err) {
      setError(err.message || 'An unexpected error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      if (error) throw error;
    } catch (err) {
      setError(`Google Auth Error: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-convo-bg p-4 relative overflow-hidden">
      {/* Ambient circular glow */}
      <div className="absolute inset-0 bg-gradient-radial from-convo-green/10 to-transparent blur-3xl rounded-full scale-150 -z-10"></div>

      <div className="max-w-5xl w-full grid lg:grid-cols-2 gap-4 lg:gap-6 items-stretch z-10 my-8">

        {/* Left Navy Panel (Structured Content) */}
        <div className="hidden lg:flex flex-col justify-between bg-convo-ink text-white p-8 lg:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none"></div>

          <div className="relative z-10 flex-1 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6 shadow-inner-light w-fit">
              <div className="w-2 h-2 rounded-full bg-convo-green-light animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-convo-green-light font-sans">Join 12,847+ Confident Speakers</span>
            </div>

            <h1 className="text-5xl xl:text-6xl font-serif mb-6 text-white text-glow-green leading-tight">
              Practice<br />confidently.
            </h1>

            <ul className="space-y-4 text-gray-300 border-t border-white/10 pt-6 mb-8 font-sans">
              {[
                "Unlimited AI Practice Sessions",
                "All 6 Scenarios Unlocked",
                "Deep Tone & Grammar Feedback",
                "24/7 Priority Support"
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-4 pb-4 border-b border-white/10 last:border-b-0 last:pb-0">
                  <div className="p-1 rounded-full bg-convo-green/20">
                    <Check size={16} strokeWidth={3} className="text-convo-green-light drop-shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                  </div>
                  <span className="font-bold text-base tracking-wide text-white font-sans">{feature}</span>
                </li>
              ))}
            </ul>

            <Link to="/#pricing" className="btn-3d py-3 px-6 rounded-full bg-gradient-to-r from-convo-green to-emerald-500 text-white font-bold uppercase tracking-widest text-xs w-fit transition-all shadow-[0_0_20px_rgba(22,163,74,0.4)] block text-center">
              Explore Features
            </Link>
          </div>

          <div className="relative z-10 mt-8 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[1.5rem]">
            <div className="flex gap-1 text-yellow-500 mb-3 text-lg">
              {"★★★★★".split('').map((star, j) => <span key={j} className="drop-shadow-sm">{star}</span>)}
            </div>
            <p className="font-serif italic text-xl text-gray-200 mb-6 leading-relaxed">
              "Confidence score went from 40 to 75 in one month. Highly recommend."
            </p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-convo-green/20 border border-convo-green flex items-center justify-center font-bold text-convo-green-light text-sm shadow-[0_0_15px_rgba(34,197,94,0.3)]">
                VS
              </div>
              <div>
                <div className="font-bold text-white text-sm font-sans">Vikas S.</div>
                <div className="text-xs text-gray-400 font-medium font-sans">Job Seeker, Indore</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Glass-Panel Card (Sign-In Form) */}
        <div className="glass-panel p-8 sm:p-10 rounded-[2rem] shadow-3d w-full max-w-md mx-auto relative flex flex-col justify-center border-white">
          <Link to="/" className="w-12 h-12 rounded-xl bg-convo-green flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(22,163,74,0.4)] hover:scale-105 transition-transform group block relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm transform rotate-45 group-hover:scale-90 transition-transform"></div>
            </div>
          </Link>

          <h2 className="text-4xl font-serif mb-2 text-convo-ink">
            {authMode === 'login' ? 'Welcome Back' : authMode === 'signup' ? 'Get Started' : 'Reset Password'}
          </h2>
          <p className="text-slate-500 font-medium mb-6 text-sm font-sans">
            {authMode === 'login' ? 'Login to continue your journey.' : authMode === 'signup' ? 'Create an account to start your journey.' : 'Enter your email to receive recovery instructions.'}
          </p>

          {/* Error and Success Alerts */}
          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 flex items-start gap-3">
              <AlertCircle size={18} className="text-red-500 mt-0.5" />
              <p className="text-xs font-bold text-red-600 font-sans leading-relaxed">{error}</p>
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 flex items-start gap-3">
              <CheckCircle2 size={18} className="text-convo-green mt-0.5" />
              <p className="text-xs font-bold text-green-700 font-sans leading-relaxed">{successMsg}</p>
            </div>
          )}

          {authMode !== 'forgot' && (
            <>
              <button onClick={handleGoogleLogin} type="button" className="w-full relative overflow-hidden bg-white hover:bg-gray-50 border border-gray-200 text-convo-ink font-bold py-3.5 px-6 rounded-full transition-all duration-300 shadow-glass hover:shadow-3d flex items-center justify-center gap-3 group">
                <svg viewBox="0 0 24 24" className="w-5 h-5 drop-shadow-sm">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.15v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.15C1.43 8.55 1 10.22 1 12s.43 3.45 1.15 4.93l3.69-2.84z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.15 7.07l3.69 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                <span className="text-sm font-sans mt-0.5">Continue with Google</span>
                <span className="transform transition-transform text-lg group-hover:translate-x-1 ml-1 text-gray-400 font-serif">→</span>
              </button>

              <div className="my-6 flex items-center justify-between opacity-50">
                <span className="w-full border-b border-gray-300"></span>
                <span className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest whitespace-nowrap font-sans">Or continue with email</span>
                <span className="w-full border-b border-gray-300"></span>
              </div>
            </>
          )}

          <form onSubmit={handleAuth} className="space-y-4 flex-1 flex flex-col font-sans">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 pl-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-convo-green transition-colors">
                  <User size={18} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-12 pr-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-convo-green focus:ring-4 focus:ring-convo-green/10 transition-all bg-white/70 backdrop-blur-sm font-medium shadow-inner-light text-sm text-convo-ink"
                />
              </div>
            </div>

            {authMode !== 'forgot' && (
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5 pl-2">Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-convo-green transition-colors">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={authMode === 'signup' ? "Create a password (min 6 chars)" : "Enter your password"}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-convo-green focus:ring-4 focus:ring-convo-green/10 transition-all bg-white/70 backdrop-blur-sm font-medium shadow-inner-light text-sm text-convo-ink"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-convo-green transition-colors outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-3d bg-gradient-to-r from-convo-green to-emerald-500 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-convo-green/30 hover:scale-[1.02] flex items-center justify-center gap-2 mt-2 text-sm tracking-wide border-t border-white/20 disabled:opacity-70 disabled:hover:scale-100 transition-all"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Processing...
                </span>
              ) : (
                <>
                  {authMode === 'login' ? 'Sign In' : authMode === 'signup' ? 'Create Account' : 'Send Reset Link'}
                  <span className="text-xl font-serif leading-none mt-[-2px]">→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex justify-between items-center gap-4 text-xs font-bold font-sans flex-wrap">
            {authMode === 'login' && (
              <button onClick={() => setAuthMode('forgot')} type="button" className="text-convo-green hover:text-emerald-600 transition-colors">
                Forgot Password?
              </button>
            )}

            {authMode === 'forgot' ? (
              <div className="text-slate-500 w-full text-center">
                Remembered your password? <button onClick={() => setAuthMode('login')} className="font-bold text-convo-green hover:text-emerald-600 transition-colors ml-1">Log in</button>
              </div>
            ) : (
              <div className="text-slate-500 ml-auto">
                {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}{' '}
                <button
                  onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                  className="font-bold text-convo-green hover:text-emerald-600 transition-colors ml-1"
                >
                  {authMode === 'login' ? 'Sign Up' : 'Log In'}
                </button>
              </div>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 text-center text-[10px] font-bold text-slate-400 font-sans tracking-wide">
            © 2026 ConvoKaro. Made with <span className="text-red-500 text-[10px]">❤️</span> for India.
          </div>
        </div>

      </div>
    </div>
  );
}
