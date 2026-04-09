import React, { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, TrendingUp, User, LogOut, Bell, Flame, Globe, Briefcase, Zap, CheckCircle2, ChevronRight, Play, Clock, Target, Award, Sparkles, MoveRight, Bot, Trash2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { supabase } from '../lib/supabase';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [welcomeStep, setWelcomeStep] = useState(1);
  
  // Real World Challenges State
  const [completedChallenges, setCompletedChallenges] = useState([]);
  const [notifications, setNotifications] = useState(3);

  useEffect(() => {
    if (user && user.user_metadata?.has_seen_welcome === undefined) {
      setShowWelcome(true);
    }
  }, [user]);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleFinishWelcome = async () => {
    setShowWelcome(false);
    try {
      await supabase.auth.updateUser({
        data: { has_seen_welcome: true }
      });
    } catch (error) {
      console.error("Failed to update welcome metadata:", error);
    }
  };

  const startMission = () => {
    handleFinishWelcome();
    navigate('/chat');
  };

  const toggleChallenge = (id) => {
    if (completedChallenges.includes(id)) {
      setCompletedChallenges(completedChallenges.filter(i => i !== id));
    } else {
      setCompletedChallenges([...completedChallenges, id]);
    }
  };

  const userName = user?.user_metadata?.full_name?.split(' ')[0] || 'User';
  const challengeProgress = (completedChallenges.length / 3) * 100;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-8 xl:p-10 relative">
        <div className="max-w-[1240px] mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-serif text-gray-900 mb-1">Hey, <span className="text-emerald-600 font-serif italic">{userName} 👋</span></h1>
              <p className="text-gray-500 text-sm font-medium flex items-center gap-1.5 mt-1">
                <Flame size={14} className="text-orange-500 fill-orange-500" /> 
                <span className="font-bold text-gray-600">5 day streak</span> — you're building momentum!
              </p>
            </div>
            <div className="flex items-center gap-4">
               <button 
                  onClick={() => setNotifications(0)}
                  className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-emerald-600 hover:border-emerald-200 hover:scale-105 transition-all shadow-sm relative group"
               >
                  <Bell size={18} className="group-hover:animate-bounce" />
                  {notifications > 0 && (
                    <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                  )}
               </button>
               <button onClick={() => navigate('/practice')} className="bg-[#111827] text-white px-5 py-2.5 rounded-full text-sm font-bold shadow-md hover:bg-black transition-colors hover:shadow-lg hover:-translate-y-0.5">
                 Start Practice
               </button>
            </div>
          </header>

          {/* Hero Banner */}
          <div className="bg-[#166534] rounded-3xl p-8 relative overflow-hidden shadow-xl flex flex-col lg:flex-row justify-between gap-10 items-center border border-[#145a2a]">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-emerald-400/20 to-transparent blur-[80px] rounded-full transform translate-x-1/3 -translate-y-1/3 pointer-events-none"></div>
             
             {/* Left Text Box */}
             <div className="text-white relative z-10 flex-1 max-w-lg">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-[10px] uppercase tracking-widest font-bold mb-5 shadow-sm">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></div> You're on fire!
                </div>
                <h2 className="text-4xl lg:text-5xl font-serif mb-4 leading-tight tracking-tight">You're on fire! 5 day <br/>streak — keep it going!</h2>
                <p className="text-emerald-100 mb-8 max-w-sm text-sm leading-relaxed text-opacity-90">You're building an amazing habit. Every day counts!</p>
                <div className="flex items-center gap-4 mb-10">
                  <button onClick={() => navigate('/practice')} className="bg-white text-emerald-800 px-6 py-3 rounded-full font-bold shadow-lg hover:scale-[1.02] transition-transform flex items-center gap-2 text-sm border border-emerald-100">
                    Start Practice <ChevronRight size={16} />
                  </button>
                  <button onClick={() => navigate('/progress')} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full font-bold transition-colors text-sm backdrop-blur-sm">
                    View Progress
                  </button>
                </div>
                <div>
                   <p className="text-emerald-300 text-xs font-medium mb-2 opacity-80">Recommended for you:</p>
                   <button 
                     onClick={() => navigate('/practice')}
                     className="flex items-center gap-2 px-3 py-2 bg-black/20 hover:bg-black/30 rounded-lg text-xs font-bold text-emerald-100 transition-colors border border-white/5 backdrop-blur-sm"
                   >
                     <Briefcase size={14} className="text-emerald-300 opacity-80" /> College Introduction <ChevronRight size={14} className="opacity-60" />
                   </button>
                </div>
             </div>

             {/* Right Goal Card Box */}
             <div className="relative z-10 w-full lg:w-[420px]">
                <div className="absolute -left-5 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-xl shadow-orange-500/30 flex items-center gap-1.5 z-20 border border-orange-400/50 transform -rotate-6 lg:translate-x-[-50%] lg:-ml-6 lg:-mt-24">
                   <Flame size={14} className="fill-white" /> 5 Day Streak!
                </div>
                
                <div className="bg-white/[0.08] backdrop-blur-xl rounded-2xl p-6 border border-white/10 shadow-2xl">
                   <div className="flex justify-between items-center mb-4">
                     <h3 className="text-white font-bold text-sm">Today's Goal</h3>
                     <span className="text-[10px] font-bold text-emerald-100 bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded-md tracking-wide">2/3 Complete</span>
                   </div>
                   <div className="w-full bg-black/30 rounded-full h-2.5 mb-8 overflow-hidden shadow-inner flex">
                     <div className="bg-emerald-400 h-2.5 rounded-l-full" style={{ width: '66%' }}></div>
                     <div className="w-1 h-2.5 bg-black/20"></div>
                   </div>
                   <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-5 text-center">
                     <div>
                       <MessageSquare size={18} className="mx-auto text-emerald-300 mb-1.5 opacity-80" />
                       <div className="text-[11px] text-emerald-100 font-bold uppercase tracking-wider">3 chats</div>
                     </div>
                     <div>
                       <Target size={18} className="mx-auto text-emerald-300 mb-1.5 opacity-80" />
                       <div className="text-[11px] text-emerald-100 font-bold uppercase tracking-wider">2 goals</div>
                     </div>
                     <div>
                       <Zap size={18} className="mx-auto text-emerald-300 mb-1.5 opacity-80" />
                       <div className="text-[11px] text-emerald-100 font-bold uppercase tracking-wider">+150 XP</div>
                     </div>
                   </div>
                </div>
             </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard title="CONFIDENCE" value="82%" icon={<TrendingUp size={16} className="text-emerald-500" />} iconBg="bg-emerald-50" change="↑ +4 pts" changeColor="text-emerald-700 bg-emerald-100" />
            <StatCard title="STREAK" value="5 Days" icon={<Flame size={16} className="text-orange-500" />} iconBg="bg-orange-50" change="↑ +8 pts" changeColor="text-emerald-700 bg-emerald-100" />
            <StatCard title="SESSIONS" value="12" icon={<Clock size={16} className="text-blue-500" />} iconBg="bg-blue-50" change="↑ +8 pts" changeColor="text-emerald-700 bg-emerald-100" />
            <StatCard title="XP POINTS" value="1,240" icon={<Award size={16} className="text-purple-500" />} iconBg="bg-purple-50" change="↑ +x pts" changeColor="text-emerald-700 bg-emerald-100" />
          </div>

          {/* Middle Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
             <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col">
                <div className="flex justify-between items-center mb-8 border-b border-gray-50 pb-4">
                   <h3 className="font-bold text-lg text-gray-900">Daily Missions</h3>
                   <span className="px-2 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold rounded uppercase tracking-wider border border-gray-200">Reset in 14H</span>
                </div>
                <div className="space-y-6 flex-1 pr-4">
                   <MissionItem task={`Say "Hi" in a chat`} fill="100%" fraction="1/1" isComplete={true} />
                   <MissionItem task="Ask a follow-up question" fill="40%" fraction="2/5" />
                   <MissionItem task="Complete a 10 min session" fill="0%" fraction="0/1" />
                </div>
             </div>

             <div className="bg-[#1a1c23] rounded-3xl p-8 relative overflow-hidden shadow-xl flex flex-col justify-between border border-[#2d313c]">
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl translate-x-10 translate-y-10"></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -translate-y-10"></div>
                
                <div className="relative z-10 mb-8">
                   <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold mb-5 border border-emerald-500/20 tracking-wider uppercase">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-400"></div> In Progress
                   </div>
                   <h3 className="text-white font-bold text-xl mb-1.5">Continue Last Session</h3>
                   <p className="text-gray-400 text-xs leading-relaxed">Job Interview: Introduction round</p>
                </div>

                <div className="relative z-10 flex items-center gap-4 mb-8">
                   <div className="relative w-14 h-14 shrink-0 bg-[#1f222a] rounded-full shadow-inner flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                        <path className="text-[#2d313c]" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.8)]" strokeDasharray="75, 100" strokeWidth="3" stroke="currentColor" fill="none" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="font-bold text-white text-xs z-10">75%</div>
                   </div>
                   <div className="flex-1 bg-[#242730] h-1.5 rounded-full overflow-hidden shadow-inner">
                     <div className="bg-emerald-500 h-1.5 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" style={{ width: '75%' }}></div>
                   </div>
                </div>

                <button 
                  onClick={() => navigate('/practice')}
                  className="w-full bg-white text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-colors text-sm shadow-lg relative z-10 hover:shadow-xl active:scale-[0.98]"
                >
                  Resume Session
                </button>
             </div>
          </div>

          {/* Real World Challenges */}
          <div className="mb-6 pt-4">
             <div className="flex justify-between items-end mb-5 px-1">
               <h3 className="font-serif text-2xl text-gray-900">Real World Challenges</h3>
               <span className="px-3 py-1 bg-blue-50 text-blue-500 text-[10px] font-bold rounded-full uppercase tracking-widest border border-blue-100 shadow-sm">Resets Monday</span>
             </div>
             <div className="bg-[#fbfcff] rounded-3xl p-8 border border-blue-100/50 shadow-sm">
                <div className="flex items-start gap-4 mb-10 border-b border-blue-50 pb-8">
                   <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/30">
                     <Globe className="text-white" size={24} />
                   </div>
                   <div className="flex-1 pt-1">
                     <h4 className="font-bold text-gray-900 text-lg mb-1">Practice in Real Life</h4>
                     <p className="text-gray-500 text-sm">Take what you've learned and use it in the real world. Each challenge is worth <span className="text-emerald-500 font-bold bg-emerald-50 px-1 py-0.5 rounded">+50 XP!</span></p>
                   </div>
                </div>

                <div className="mb-8 px-2">
                   <div className="flex justify-between items-center mb-3 text-[11px] font-bold uppercase tracking-wider">
                     <span className="text-slate-400">Weekly Progress</span>
                     <span className="text-blue-500">{completedChallenges.length}/3 Completed</span>
                   </div>
                   <div className="w-full bg-blue-50/80 h-1.5 rounded-full overflow-hidden border border-blue-100/50 shadow-inner">
                     <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-700 shadow-[0_0_8px_rgba(59,130,246,0.4)]" style={{ width: `${challengeProgress}%` }}></div>
                   </div>
                </div>

                <div className="space-y-4">
                   <ChallengeRow 
                     id={1} 
                     text="Say hi to a stranger today" 
                     isCompleted={completedChallenges.includes(1)} 
                     onComplete={() => toggleChallenge(1)} 
                   />
                   <ChallengeRow 
                     id={2} 
                     text="Ask a classmate about their weekend" 
                     isCompleted={completedChallenges.includes(2)} 
                     onComplete={() => toggleChallenge(2)} 
                   />
                   <ChallengeRow 
                     id={3} 
                     text="Give someone a genuine compliment" 
                     isCompleted={completedChallenges.includes(3)} 
                     onComplete={() => toggleChallenge(3)} 
                   />
                </div>
             </div>
          </div>

          {/* Recommended Scenarios */}
          <div className="pt-2 pb-12">
             <div className="flex justify-between items-end mb-5 px-1">
               <h3 className="font-serif text-2xl text-gray-900">Recommended Scenarios</h3>
               <button onClick={() => navigate('/practice')} className="text-emerald-600 font-bold text-sm flex items-center gap-1 hover:text-emerald-700 transition-colors">View all <ChevronRight size={16}/></button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ScenarioCard title="College Intro" level="Beginner" xp="+50 XP" iconBg="bg-emerald-50" iconColor="text-emerald-500" />
                <ScenarioCard title="Office Talk" level="Intermediate" xp="+100 XP" iconBg="bg-blue-50" iconColor="text-blue-500" />
                <ScenarioCard title="Party Mixer" level="Intermediate" xp="+100 XP" iconBg="bg-purple-50" iconColor="text-purple-500" />
             </div>
          </div>

        </div>
      </main>

      {/* Welcome Popup Modal */}
      {showWelcome && (
        <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
           <div className="max-w-lg w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-white p-10 animate-in zoom-in duration-500">
              {/* Step indicator */}
              <div className="flex justify-center gap-2 mb-10">
                 {[1, 2, 3].map((step) => (
                    <div 
                       key={step} 
                       className={`h-1.5 rounded-full transition-all duration-300 ${
                         welcomeStep === step ? 'w-8 bg-emerald-500' : 'w-2 bg-gray-200'
                       }`}
                    ></div>
                 ))}
              </div>

              {/* Step 1: Welcome */}
              {welcomeStep === 1 && (
                 <div className="text-center animate-in slide-in-from-bottom-5 duration-300">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-glass rotate-3 animate-pulse">
                       <Sparkles size={40} />
                    </div>
                    <h2 className="text-4xl font-serif text-gray-900 mb-4 tracking-tight leading-tight">Welcome to <br/>ConvoKaro!</h2>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed">Your journey to confident communication and better speaking skills starts right here.</p>
                    <button 
                       onClick={() => setWelcomeStep(2)}
                       className="w-full bg-[#111827] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black hover:-translate-y-0.5 transition-all text-sm tracking-wide"
                    >
                       Let's Get Started
                    </button>
                 </div>
              )}

              {/* Step 2: How it Works */}
              {welcomeStep === 2 && (
                 <div className="animate-in slide-in-from-right-5 duration-300">
                    <h3 className="text-2xl font-serif text-gray-900 mb-8 text-center">How it Works</h3>
                    <div className="space-y-4 mb-10">
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-sm">
                             <Briefcase size={20} />
                          </div>
                          <div>
                             <p className="font-bold text-sm text-gray-900">1. Pick a Scenario</p>
                             <p className="text-xs text-gray-500 font-medium">Choose from real-world situations like interviews or parties.</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-sm">
                             <Bot size={20} />
                          </div>
                          <div>
                             <p className="font-bold text-sm text-gray-900">2. Practice with AI</p>
                             <p className="text-xs text-gray-500 font-medium">Have a natural conversation in English, Hindi or Hinglish.</p>
                          </div>
                       </div>
                       <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shadow-sm">
                             <TrendingUp size={20} />
                          </div>
                          <div>
                             <p className="font-bold text-sm text-gray-900">3. Get Instant Feedback</p>
                             <p className="text-xs text-gray-500 font-medium">See scores for confidence and grammar and earn XP.</p>
                          </div>
                       </div>
                    </div>
                    <button 
                       onClick={() => setWelcomeStep(3)}
                       className="w-full bg-[#111827] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-black transition-all text-sm group flex items-center justify-center gap-2"
                    >
                       Got it! <MoveRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                 </div>
              )}

              {/* Step 3: First Mission */}
              {welcomeStep === 3 && (
                 <div className="text-center animate-in slide-in-from-right-5 duration-300">
                    <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-glass border-4 border-white ring-4 ring-amber-50 animate-bounce">
                       <Zap size={40} className="fill-amber-600" />
                    </div>
                    <h3 className="text-3xl font-serif text-gray-900 mb-4 tracking-tight">Your First Mission</h3>
                    <p className="text-slate-500 font-medium mb-10 leading-relaxed uppercase tracking-widest text-[10px]">Complete the <span className="text-emerald-600 font-bold">College Introduction</span> scenario to earn your first 50 XP!</p>
                    <div className="flex flex-col gap-3">
                       <button 
                          onClick={startMission}
                          className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-emerald-600 hover:-translate-y-0.5 transition-all text-sm tracking-wide btn-3d"
                       >
                          Let's Go!
                       </button>
                       <button 
                          onClick={handleFinishWelcome}
                          className="w-full py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors text-xs uppercase tracking-widest"
                       >
                          Skip for now
                       </button>
                    </div>
                 </div>
              )}
           </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, iconBg, change, changeColor }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between group hover:-translate-y-1 transition-transform cursor-pointer">
       <div className="flex justify-between items-start mb-6">
          <div className={`w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center`}>
            {icon}
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-100 ${changeColor}`}>{change}</span>
       </div>
       <div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{title}</p>
          <div className="text-3xl font-serif text-gray-900 tracking-tight">{value}</div>
       </div>
    </div>
  );
}

function MissionItem({ task, fill, fraction, isComplete }) {
  return (
    <div className="pl-2">
       <div className="flex justify-between items-center mb-3">
         <div className="flex items-center gap-3">
            <CheckCircle2 size={18} strokeWidth={2.5} className={isComplete ? "text-emerald-500" : "text-gray-300"} />
            <span className={`text-[15px] font-bold ${isComplete ? 'text-gray-400 line-through decoration-2' : 'text-gray-800'}`}>{task}</span>
         </div>
         <span className={`text-xs font-bold ${isComplete ? 'text-emerald-500' : 'text-emerald-500'}`}>{fraction}</span>
       </div>
       <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden ml-8 flex-1">
         <div className="bg-emerald-500 h-1.5 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(16,185,129,0.4)]" style={{ width: fill }}></div>
       </div>
    </div>
  );
}

function ChallengeRow({ text, isCompleted, onComplete }) {
  return (
    <div className={`flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer group ${isCompleted ? 'bg-emerald-50/50 border-emerald-100' : 'border-gray-100 hover:border-blue-100 bg-white hover:shadow-md'}`}>
       <div className="flex items-center gap-4">
         <div className={`p-2 rounded-full border transition-colors ${isCompleted ? 'bg-white border-emerald-200' : 'bg-gray-50 border-gray-100 group-hover:bg-blue-50 group-hover:border-blue-100'}`}>
            {isCompleted ? (
              <CheckCircle2 size={16} className="text-emerald-500" />
            ) : (
              <Globe size={16} className="text-gray-400 group-hover:text-blue-500 transition-colors" />
            )}
         </div>
         <span className={`font-bold text-sm transition-colors ${isCompleted ? 'text-emerald-700' : 'text-gray-700 group-hover:text-gray-900'}`}>{text}</span>
       </div>
       <button 
         onClick={(e) => {
           e.stopPropagation();
           onComplete();
         }}
         className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-sm focus:ring-2 active:scale-95 ${
           isCompleted 
             ? 'bg-white border border-emerald-200 text-emerald-600 hover:bg-emerald-50' 
             : 'bg-emerald-500 hover:bg-emerald-600 text-white focus:ring-emerald-500 focus:ring-offset-2'
         }`}
       >
         {isCompleted ? 'Done ✓' : 'Mark as Done'}
       </button>
    </div>
  );
}

function ScenarioCard({ title, level, xp, iconBg, iconColor }) {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-[0_2px_15px_rgba(0,0,0,0.02)] flex flex-col group hover:-translate-y-1.5 transition-transform cursor-pointer hover:shadow-xl">
       <div className="flex justify-between items-start mb-8">
          <div className={`w-12 h-12 rounded-2xl ${iconBg} flex items-center justify-center transform group-hover:rotate-6 transition-transform`}>
            <TrendingUp size={22} className={iconColor} />
          </div>
          <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100/50 text-[10px] font-bold rounded-full uppercase tracking-wider">{xp}</span>
       </div>
       <div className="mb-6">
          <h4 className="font-bold text-gray-900 text-xl mb-1.5 group-hover:text-emerald-600 transition-colors">{title}</h4>
          <p className="text-xs text-gray-500 font-medium">{level}</p>
       </div>
       <button onClick={(e) => { e.stopPropagation(); navigate('/practice'); }} className="w-full py-3 rounded-xl border border-gray-200 text-gray-700 font-bold text-sm group-hover:bg-gray-50 group-hover:border-gray-300 transition-all active:bg-gray-100">
         Start Practice
       </button>
    </div>
  );
}
