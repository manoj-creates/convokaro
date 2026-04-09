import React from 'react';
import { Mic, Target, Zap, Globe, MessageSquare, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Floating Navbar */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl glass-panel rounded-full px-8 py-4 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-convo-green flex items-center justify-center">
             <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
          </div>
          <span className="font-serif text-2xl font-bold tracking-wide text-convo-ink">ConvoKaro</span>
        </div>
        <div className="hidden md:flex gap-8 text-sm font-bold text-slate-500">
          <a href="#features" className="hover:text-convo-ink transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-convo-ink transition-colors">How it Works</a>
          <a href="#pricing" className="hover:text-convo-ink transition-colors">Pricing</a>
        </div>
        <div className="flex gap-6 items-center">
          <Link to="/auth" className="text-sm font-bold text-slate-700 hover:text-convo-green transition-colors">Login</Link>
          <Link to="/auth" className="bg-convo-ink text-white px-6 py-2.5 rounded-full text-sm font-bold hover:shadow-xl transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      <section className="pt-40 pb-20 px-4 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-sm font-medium text-convo-green-dark border-convo-green/20">
            <Zap size={16} className="text-convo-green" />
            AI-Powered • Made for India 🇮🇳
          </div>

          <h1 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tight">
            Start every<br />
            conversation<br />
            <span className="text-gradient italic pr-4">with confidence.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-md leading-relaxed font-medium">
            Practice with AI. Get real feedback. Build confidence in Hindi, English, or Hinglish. No judgement. Just growth.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link to="/auth" className="bg-convo-green text-white px-8 py-4 rounded-full text-lg font-bold btn-3d shadow-[0_0_20px_rgba(22,163,74,0.4)] text-center w-fit">
              Start Practicing Free →
            </Link>
            <Link to="/auth" className="px-8 py-4 rounded-full text-lg font-bold glass-panel hover:bg-white/90 transition-all btn-3d text-convo-ink border-2 border-transparent hover:border-gray-200 text-center w-fit">
              Try Demo
            </Link>
          </div>
        </div>

        <div className="relative perspective-1000 hidden lg:block">
          <div className="absolute inset-0 bg-gradient-radial from-convo-green/20 to-transparent blur-3xl rounded-full scale-150 -z-10"></div>

          <div className="transform rotate-y-[-10deg] rotate-x-[5deg] glass-panel p-6 rounded-3xl shadow-3d border border-white/60 w-full max-w-md ml-auto transition-transform duration-700 hover:rotate-y-0 hover:rotate-x-0">
            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-convo-green to-emerald-400 flex items-center justify-center text-white font-bold shadow-lg">AI</div>
              <div>
                <h3 className="font-bold text-convo-ink">College Intro Setup</h3>
                <p className="text-xs text-gray-500 font-medium">Beginner • 50 XP</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 text-sm text-gray-700 shadow-sm border border-gray-100">
                Hey! You look new here — first year CS batch?
              </div>
              <div className="flex justify-end">
                <div className="bg-convo-green text-white rounded-2xl rounded-tr-none p-4 text-sm shadow-md">
                  Yeah, hi! I am Rahul. Just joined today.
                </div>
              </div>
              <div className="flex justify-end">
                <span className="text-[10px] font-bold bg-green-100 text-convo-green px-2 py-1 rounded-full">Confidence: 85%</span>
              </div>
              <div className="bg-gray-50 rounded-2xl rounded-tl-none p-4 text-sm text-gray-700 shadow-sm border border-gray-100">
                Nice to meet you Rahul! Ready for the first lecture?
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="w-full bg-gray-50 border-y border-gray-100 py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-12 text-sm font-bold text-slate-700 tracking-wide uppercase items-center min-w-max">
          <span className="flex items-center gap-12">
            <span>• Hindi + English</span><span>• 6 Scenarios</span><span>• Daily Missions</span><span>• Confidence Score</span><span>• No Judgement</span><span>• AI Voice Practice</span><span>• Real-time Feedback</span>
          </span>
          <span className="flex items-center gap-12">
            <span>• Hindi + English</span><span>• 6 Scenarios</span><span>• Daily Missions</span><span>• Confidence Score</span><span>• No Judgement</span><span>• AI Voice Practice</span><span>• Real-time Feedback</span>
          </span>
        </div>
      </div>

      <section className="bg-convo-ink-2 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('[https://www.transparenttextures.com/patterns/carbon-fibre.png](https://www.transparenttextures.com/patterns/carbon-fibre.png)')] opacity-20"></div>
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-800 relative z-10 text-center">
          {[
            { num: "50,000+", label: "PRACTICE SESSIONS" },
            { num: "12,847+", label: "USERS ACROSS INDIA" },
            { num: "4.8 ★", label: "AVERAGE RATING" },
            { num: "87%", label: "FEEL MORE CONFIDENT" }
          ].map((stat, i) => (
            <div key={i} className="px-4">
              <div className="text-4xl md:text-5xl font-serif text-convo-green mb-2 text-glow">{stat.num}</div>
              <div className="text-xs tracking-widest text-gray-400 font-bold">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="py-32 px-4 max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif mb-4">Everything you need to<br />master conversations</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: <Mic />, title: "AI Voice", desc: "Speak naturally. Our AI listens and responds in real-time." },
            { icon: <Target />, title: "Scenario Training", desc: "Practice for interviews, dates, or basic social small talk." },
            { icon: <Zap />, title: "Instant Feedback", desc: "Get live scores on your confidence, tone, and grammar." },
            { icon: <Award />, title: "Daily Missions", desc: "Build habits with short, daily automated challenges." },
            { icon: <Globe />, title: "IRL Challenges", desc: "Take your skills outside and apply them in real life." },
            { icon: <MessageSquare />, title: "Hindi + English", desc: "Mix it up. Practice in pure English, Hindi, or Hinglish." }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-3d hover:shadow-3d-hover transition-all duration-300 hover:-translate-y-2 border border-gray-100 group">
              <div className="w-14 h-14 rounded-2xl bg-convo-green-bg text-convo-green flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-500 font-medium leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      {/* How It Works Section */}
      <section className="py-24 bg-convo-ink text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-convo-green/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-serif mb-4">How it works</h2>
            <p className="text-gray-400 font-medium">Four simple steps to conversational mastery.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Pick a Scenario", desc: "Choose from interviews, casual dates, or office chat." },
              { step: "02", title: "Start Talking", desc: "Speak into your mic naturally. The AI listens." },
              { step: "03", title: "Get Feedback", desc: "Instant scores on tone, grammar, and confidence." },
              { step: "04", title: "Level Up", desc: "Earn XP, complete missions, and track your growth." }
            ].map((item, i) => (
              <div key={i} className="relative p-6 rounded-3xl bg-convo-ink-2 border border-gray-800 shadow-xl hover:-translate-y-2 transition-transform duration-300">
                <div className="text-4xl font-serif text-convo-green/50 mb-4">{item.step}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 max-w-6xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4 text-convo-ink">Real stories from real users</h2>
          <p className="text-slate-500 font-medium">See how ConvoKaro is helping students and job seekers across India</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Rahul K.", role: "BTech Student, Nagpur", initials: "RK", quote: "After 3 weeks I had my first real conversation without freezing. Zabardast app hai yaar!", color: "bg-green-100 text-green-700" },
            { name: "Arjun M.", role: "MBA Student, Pune", initials: "AM", quote: "The AI feedback fixed my pacing issues in 2 weeks. Very helpful!", color: "bg-emerald-100 text-emerald-700" },
            { name: "Vikas S.", role: "Job Seeker, Indore", initials: "VS", quote: "Confidence score went from 40 to 75 in one month. Highly recommend.", color: "bg-teal-100 text-teal-700" }
          ].map((t, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-yellow-400 mb-6">
                  {"★★★★★".split('').map((star, j) => <span key={j}>{star}</span>)}
                </div>
                <p className="text-slate-700 font-medium leading-relaxed italic mb-8">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-convo-ink">{t.name}</div>
                  <div className="text-xs text-slate-500 font-medium">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 px-4 max-w-5xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-5xl font-serif mb-4">Simple pricing, huge results</h2>
          <p className="text-gray-500 font-medium">Invest in your confidence today.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto items-center">
          {/* Free Tier */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-3d border border-gray-100 h-fit">
            <div className="inline-block px-4 py-1.5 rounded-full bg-gray-100 text-sm font-bold text-gray-600 mb-6">Free</div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-serif">₹0</span>
              <span className="text-gray-500 font-medium">/forever</span>
            </div>
            <p className="text-gray-500 mb-8 pb-8 border-b border-gray-100">Perfect to start building confidence.</p>
            <ul className="space-y-4 mb-8">
              {["3 sessions per day", "2 core scenarios unlocked", "Basic confidence tracking"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-5 h-5 rounded-full bg-green-100 text-convo-green flex items-center justify-center text-xs">✓</div>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/auth" className="w-full py-4 rounded-full font-bold border-2 border-gray-200 text-convo-ink hover:border-convo-ink transition-colors btn-3d block text-center">
              Get Started Free
            </Link>
          </div>

          {/* Pro Tier */}
          <div className="bg-convo-ink text-white p-10 rounded-[2.5rem] shadow-2xl relative transform md:-translate-y-4 shadow-convo-green/20 border border-gray-800">
            <div className="absolute -top-4 right-8 bg-gradient-to-r from-convo-green to-emerald-400 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg shadow-convo-green/30 tracking-wide uppercase">
              Popular
            </div>
            <div className="inline-block px-4 py-1.5 rounded-full bg-convo-green/20 text-convo-green border border-convo-green/30 text-sm font-bold mb-6">Pro</div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-5xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-convo-green to-emerald-400">₹49</span>
              <span className="text-gray-400 font-medium">/month</span>
            </div>
            <p className="text-gray-300 mb-8 pb-8 border-b border-gray-800">Unlock your full social potential.</p>
            <ul className="space-y-4 mb-8">
              {["Unlimited daily sessions", "All 6 scenarios unlocked", "Deep tone & grammar feedback", "Priority AI response speed"].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-200 font-medium">
                  <div className="w-5 h-5 rounded-full bg-convo-green text-white flex items-center justify-center text-xs shadow-md shadow-convo-green/20">✓</div>
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="/auth" className="w-full py-4 rounded-full font-bold bg-gradient-to-r from-convo-green to-emerald-500 text-white shadow-lg shadow-convo-green/30 hover:scale-[1.02] transition-transform btn-3d block text-center">
              Upgrade to Pro
            </Link>
          </div>
        </div>
      </section>

      {/* Light Final CTA & Footer */}
      <section className="bg-gradient-to-b from-white to-green-50 pt-24 pb-12 relative overflow-hidden">
        {/* CTA */}
        <div className="text-center mb-32 relative z-10 px-4">
          <h2 className="text-6xl md:text-8xl font-serif mb-8 text-convo-ink">
            Jhijhak chhodo. <span className="text-convo-green italic">Start talking.</span>
          </h2>
          <Link to="/auth" className="bg-convo-ink text-white px-8 py-4 rounded-full text-lg font-bold shadow-2xl hover:-translate-y-1 transition-all inline-flex items-center gap-2 mx-auto w-fit">
            Get Started for Free <span className="text-xl">→</span>
          </Link>
        </div>

        {/* Detailed Footer */}
        <div className="max-w-6xl mx-auto px-8 border-t border-gray-200/60 pt-12">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-xl bg-convo-green flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <span className="font-serif text-2xl font-bold tracking-wide text-convo-ink">ConvoKaro</span>
              </div>
              <p className="text-slate-500 font-medium max-w-sm leading-relaxed">
                Helping Indian students and professionals speak English with confidence through AI-powered practice.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-convo-ink mb-6">Product</h4>
              <ul className="space-y-4 text-slate-500 font-medium text-sm">
                <li><a href="#" className="hover:text-convo-green transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-convo-green transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-convo-green transition-colors">Scenarios</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-convo-ink mb-6">Company</h4>
              <ul className="space-y-4 text-slate-500 font-medium text-sm">
                <li><a href="#" className="hover:text-convo-green transition-colors">About</a></li>
                <li><a href="#" className="hover:text-convo-green transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-convo-green transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200/60 text-xs font-bold text-slate-400">
            <p>© 2026 ConvoKaro. Made with <span className="text-red-500">❤️</span> for India.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-convo-ink transition-colors">Twitter</a>
              <a href="#" className="hover:text-convo-ink transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-convo-ink transition-colors">Instagram</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
