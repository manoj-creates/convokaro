import React, { useState } from 'react';
import { 
  Target, 
  Zap, 
  Flame, 
  Trophy, 
  CheckCircle2, 
  ArrowUpRight, 
  TrendingUp,
  Award,
  Star,
  Clock,
  Sparkles,
  Search,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  Rocket,
  X,
  Lock,
  Globe,
  Mic,
  Crown
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

const dailyMissions = [
  { id: 1, text: "Say 'Hi' in a chat", xp: 50, progress: 1, goal: 1, completed: true, icon: <MessageSquare size={16} /> },
  { id: 2, text: "Ask a follow-up question", xp: 50, progress: 2, goal: 5, completed: false, icon: <Search size={16} /> },
  { id: 3, text: "Complete a 10 min session", xp: 100, progress: 0, goal: 1, completed: false, icon: <Clock size={16} /> },
];

const weeklyMissions = [
  { id: 101, text: "Practice 5 different scenarios", xp: 500, progress: 3, goal: 5, completed: false, icon: <Globe size={16} /> },
  { id: 102, text: "Reach 85% Avg Confidence", xp: 300, progress: 82, goal: 85, completed: false, icon: <TrendingUp size={16} /> },
  { id: 103, text: "Earn 1500 XP total", xp: 750, progress: 1240, goal: 1500, completed: false, icon: <Zap size={16} /> },
];

const seasonMissions = [
  { id: 201, text: "Unlock 'Expert' Scenario", xp: 2000, progress: 12, goal: 15, completed: false, icon: <Lock size={16} /> },
  { id: 202, text: "Maintain a 14-day streak", xp: 3000, progress: 5, goal: 14, completed: false, icon: <Flame size={16} /> },
  { id: 203, text: "Master 10 Formal scenarios", xp: 5000, progress: 2, goal: 10, completed: false, icon: <Target size={16} /> },
];

export default function GoalsPage() {
  const [goalType, setGoalType] = useState('daily');
  const [missions, setMissions] = useState({
    daily: dailyMissions,
    weekly: weeklyMissions,
    season: seasonMissions
  });
  const [showTrophyModal, setShowTrophyModal] = useState(false);

  const toggleMission = (id) => {
    setMissions(prev => ({
      ...prev,
      [goalType]: prev[goalType].map(m => 
        m.id === id ? { ...m, completed: !m.completed, progress: !m.completed ? m.goal : 0 } : m
      )
    }));
  };

  const currentMissions = missions[goalType];
  const completedCount = currentMissions.filter(m => m.completed).length;
  const progressPercent = (completedCount / currentMissions.length) * 100;

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-8 xl:p-10 relative">
        <div className="max-w-[1240px] mx-auto space-y-10">
          
          {/* Page Header */}
          <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 border-b border-gray-200 pb-8">
            <div>
              <h1 className="text-4xl font-serif text-gray-900 mb-2">
                Your <span className="text-convo-green italic">Goals Center</span>
              </h1>
              <p className="text-slate-500 font-medium">
                {goalType === 'daily' && "Daily challenges to build your habit"}
                {goalType === 'weekly' && "Weekly milestones for serious growth"}
                {goalType === 'season' && "Season-long quests for legendary rewards"}
              </p>
            </div>
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
               <button 
                 onClick={() => setGoalType('daily')}
                 className={`px-5 py-2.5 font-bold rounded-lg shadow-sm text-sm transition-all ${goalType === 'daily' ? 'bg-white text-convo-green border border-emerald-100' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Daily
               </button>
               <button 
                 onClick={() => setGoalType('weekly')}
                 className={`px-5 py-2.5 font-bold rounded-lg shadow-sm text-sm transition-all ${goalType === 'weekly' ? 'bg-white text-convo-green border border-emerald-100' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Weekly
               </button>
               <button 
                 onClick={() => setGoalType('season')}
                 className={`px-5 py-2.5 font-bold rounded-lg shadow-sm text-sm transition-all ${goalType === 'season' ? 'bg-white text-convo-green border border-emerald-100' : 'text-gray-400 hover:text-gray-600'}`}
               >
                 Season
               </button>
            </div>
          </header>

          {/* Top Row: Current Goal Status & Streak */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
             
             {/* Goals Visualization */}
             <div className="bg-white rounded-[2.5rem] p-10 shadow-3d border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden text-center group min-h-[450px]">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-40"></div>
                
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-10 relative z-10 transition-colors group-hover:text-emerald-500">
                  {goalType.toUpperCase()} PROGRESS
                </h3>
                
                <div className="relative w-64 h-64 mb-8">
                   {/* Background Circle */}
                   <svg className="w-full h-full transform -rotate-90">
                      <circle cx="128" cy="128" r="115" fill="none" stroke="#f1f5f9" strokeWidth="18" />
                      {/* Progress Circle */}
                      <circle 
                        cx="128" cy="128" r="115" fill="none" 
                        stroke="#16a34a" 
                        strokeWidth="18" 
                        strokeDasharray="722" 
                        strokeDashoffset={722 - (722 * progressPercent) / 100}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out drop-shadow-[0_0_12px_rgba(22,163,74,0.3)]"
                      />
                   </svg>
                   {/* Center Text */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <div className="text-6xl font-serif text-gray-900 leading-none mb-2">{Math.round(progressPercent)}%</div>
                      <div className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em]">COMPLETE</div>
                   </div>
                </div>

                <div className="flex gap-16 border-t border-gray-50 pt-10 w-full max-w-sm justify-center relative z-10">
                   <div className="text-center group-hover:scale-105 transition-transform">
                      <div className="text-3xl font-serif text-gray-900 mb-1">{completedCount}</div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Missions<br/>Completed</div>
                   </div>
                   <div className="text-center border-l border-gray-100 pl-16 group-hover:scale-105 transition-transform">
                      <div className="text-3xl font-serif text-gray-900 mb-1">
                        {goalType === 'daily' ? '+150' : goalType === 'weekly' ? '+1550' : '+10000'}
                      </div>
                      <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">XP Total<br/>Reward</div>
                   </div>
                </div>
             </div>

             {/* Streak Card */}
             <div className="bg-[#111827] rounded-[2.5rem] p-10 flex flex-col items-center justify-center relative overflow-hidden shadow-3d group min-h-[450px]">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.1)_0%,transparent_70%)] pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl -translate-y-10 translate-x-10"></div>
                
                <div className="w-24 h-24 bg-orange-100/10 rounded-3xl flex items-center justify-center mb-10 shadow-inner border border-white/5 group-hover:scale-110 transition-transform duration-500">
                   <Flame size={48} className="text-orange-500 fill-orange-500 drop-shadow-[0_0_20px_rgba(249,115,22,0.6)]" />
                </div>
                
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Current Streak</h3>
                <div className="text-7xl font-serif text-white mb-2 leading-none drop-shadow-lg">05 <span className="text-xl font-serif italic text-orange-400">Days</span></div>
                <p className="text-sm text-gray-400 mb-12 font-medium opacity-80 uppercase tracking-wide">Build momentum daily!</p>
                
                <div className="w-full space-y-4 pt-10 border-t border-white/5 relative z-10">
                   <div className="flex justify-between items-center px-2">
                     <span className="text-[11px] font-bold text-white uppercase tracking-widest opacity-60">Next Milestone</span>
                     <span className="text-xs font-bold text-orange-400">7 Day Badge</span>
                   </div>
                   <div className="w-full bg-white/5 h-2.5 rounded-full overflow-hidden shadow-inner">
                      <div className="bg-gradient-to-r from-orange-600 to-orange-400 h-full rounded-full shadow-[0_0_12px_rgba(249,115,22,0.4)]" style={{ width: '71%' }}></div>
                   </div>
                </div>
             </div>
          </div>

          {/* Mission Center */}
          <div className="space-y-8">
             <div className="flex justify-between items-end px-2">
                <h3 className="font-serif text-3xl text-gray-900 flex items-center gap-4 capitalize">
                  {goalType} Missions <div className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-extrabold rounded-lg uppercase border border-emerald-100 tracking-wider">AI Curated</div>
                </h3>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Clock size={14} /> Resets in {goalType === 'daily' ? '12h 45m' : goalType === 'weekly' ? '3 Days' : '45 Days'}
                </span>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {currentMissions.map(mission => (
                   <div 
                      key={mission.id}
                      onClick={() => toggleMission(mission.id)}
                      className={`p-8 rounded-[2rem] border transition-all cursor-pointer group relative overflow-hidden ${
                         mission.completed 
                            ? 'bg-emerald-50/40 border-emerald-100/50 grayscale-[0.5]' 
                            : 'bg-white border-gray-100 hover:border-emerald-200 hover:shadow-2xl hover:-translate-y-1.5'
                      }`}
                   >
                      <div className="flex justify-between items-start mb-10 relative z-10">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            mission.completed ? 'bg-white text-emerald-500 shadow-sm' : 'bg-gray-50 text-gray-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'
                         }`}>
                            {mission.completed ? <ShieldCheck size={24} /> : mission.icon}
                         </div>
                         <div className="text-[11px] font-bold text-emerald-600 bg-emerald-100/50 px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                           +{mission.xp} XP
                         </div>
                      </div>

                      <h4 className={`font-bold text-xl mb-3 relative z-10 transition-all ${mission.completed ? 'text-gray-400 line-through decoration-emerald-500/30' : 'text-gray-900 group-hover:text-emerald-600'}`}>{mission.text}</h4>
                      
                      <div className="flex justify-between items-center mb-3 px-1 relative z-10">
                         <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Progress</span>
                         <span className="text-[11px] font-bold text-emerald-600">{mission.completed ? 'COMPLETED ✓' : `${mission.progress}/${mission.goal}`}</span>
                      </div>
                      <div className="w-full bg-gray-100/50 h-2 rounded-full overflow-hidden mb-2 shadow-inner relative z-10">
                         <div className={`bg-emerald-500 h-full rounded-full transition-all duration-1000 ${mission.completed ? 'shadow-[0_0_10px_rgba(22,163,74,0.4)]' : ''}`} style={{ width: `${(mission.progress/mission.goal)*100}%` }}></div>
                      </div>
                   </div>
                ))}
             </div>
          </div>

          {/* Weekly Milestones */}
          <div className="bg-convo-ink rounded-[3.5rem] p-12 relative overflow-hidden shadow-3d border border-white/5">
             <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_top_right,rgba(22,163,74,0.15)_0%,transparent_70%)] pointer-events-none opacity-40"></div>
             
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 relative z-10">
                <div>
                   <h3 className="text-xs font-bold text-emerald-400 uppercase tracking-[0.2em] mb-4">Weekly Milestones</h3>
                   <h2 className="text-4xl font-serif text-white tracking-tight">Unlock Elite Reward <span className="text-emerald-400 italic">Chests</span></h2>
                </div>
                <div className="flex items-center gap-3 text-xs text-white/50 font-bold bg-white/5 border border-white/10 px-6 py-3 rounded-2xl backdrop-blur-sm">
                   <Clock size={16} className="text-emerald-400" /> RESET IN 3 DAYS
                </div>
             </div>

             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                <MilestoneCard 
                   icon={<Zap size={22} className="text-yellow-500 fill-yellow-500" />} 
                   title="1000 XP Goal" 
                   progress="750" 
                   goal="1000" 
                   reward="+5 Gems" 
                />
                <MilestoneCard 
                   icon={<Star size={22} className="text-blue-400 fill-blue-400" />} 
                   title="5 Scenarios" 
                   progress="3" 
                   goal="5" 
                   reward="Exclusive Badge" 
                />
                <MilestoneCard 
                   icon={<MessageSquare size={22} className="text-purple-400" />} 
                   title="10 Sessions" 
                   progress="8" 
                   goal="10" 
                   reward="+200 XP" 
                />
                <MilestoneCard 
                   icon={<Rocket size={22} className="text-emerald-400" />} 
                   title="Expert Level" 
                   progress="12" 
                   goal="15" 
                   reward="Avatar Unlock" 
                />
             </div>
          </div>

          {/* Achievement Path Gallery Preview */}
          <div className="pb-16 pt-4">
             <div className="flex justify-between items-end mb-10 px-2 border-b border-gray-100 pb-4">
                <h3 className="font-serif text-3xl text-gray-900">Achievement Path</h3>
                <button 
                  onClick={() => setShowTrophyModal(true)}
                  className="text-emerald-600 font-bold text-sm flex items-center gap-2 hover:translate-x-1 transition-transform group"
                >
                  Explore Full Trophy Room <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>

             <div className="bg-white rounded-[3rem] p-12 border border-gray-100 shadow-3d relative flex items-center group cursor-pointer overflow-hidden transform hover:-translate-y-1 transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000 opacity-60"></div>
                
                <div className="flex flex-col md:flex-row items-center gap-14 w-full relative z-10">
                   <div className="w-40 h-40 rounded-[2.5rem] bg-emerald-50/50 border border-emerald-100 flex items-center justify-center rotate-3 transform group-hover:rotate-0 transition-all duration-700 shadow-glass shrink-0">
                      <Award size={80} className="text-emerald-500 drop-shadow-[5px_5px_15px_rgba(22,163,74,0.3)] group-hover:scale-110 transition-transform duration-700" />
                   </div>
                   <div className="flex-1 text-center md:text-left">
                      <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                         <h4 className="text-3xl font-serif text-gray-900 tracking-tight">Confidence King</h4>
                         <span className="px-3 py-1 bg-emerald-100/50 text-emerald-600 text-[10px] font-extrabold rounded-lg tracking-[0.2em] uppercase">LEGENDARY</span>
                      </div>
                      <p className="text-slate-500 text-lg mb-8 max-w-xl leading-relaxed">Reach Level 20 and maintain 90%+ confidence for 10 sessions to earn this legendary status badge and profile frame.</p>
                      <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden shadow-inner mb-4">
                         <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_15px_rgba(22,163,74,0.5)]" style={{ width: '45%' }}></div>
                      </div>
                      <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">
                         <span>CURRENT LEVEL 12</span>
                         <span className="text-emerald-600 font-extrabold group-hover:scale-110 transition-transform">45% COMPLETE</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* Trophy Room Modal */}
        {showTrophyModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
             <div className="w-full max-w-4xl bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-white animate-in zoom-in-95 duration-300 flex flex-col h-[85vh]">
                <div className="px-10 py-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 shrink-0">
                   <div>
                      <h3 className="font-serif text-3xl text-gray-900">Trophy Room</h3>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Collecting your legendary achievements</p>
                   </div>
                   <button onClick={() => setShowTrophyModal(false)} className="p-3 rounded-full hover:bg-gray-200 transition-colors text-gray-400 hover:text-gray-700">
                      <X size={24} />
                   </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                      <TrophyBadge icon={<Mic size={32} />} label="First Voice" desc="Completed your first voice session" unlocked color="text-blue-500" bg="bg-blue-50" />
                      <TrophyBadge icon={<Flame size={32} />} label="Streak Master" desc="Maintain a 5-day streak" unlocked color="text-orange-500" bg="bg-orange-50" />
                      <TrophyBadge icon={<CheckCircle2 size={32} />} label="Quick Learner" desc="Answered all questions perfectly" unlocked color="text-emerald-500" bg="bg-emerald-50" />
                      <TrophyBadge icon={<Star size={32} />} label="Rising Star" desc="Reached level 10" unlocked color="text-yellow-500" bg="bg-yellow-50" />
                      
                      <TrophyBadge icon={<Crown size={32} />} label="Confidence King" desc="Maintain 90% confidence" locked />
                      <TrophyBadge icon={<Award size={32} />} label="Scenario Expert" desc="Master 50 scenarios" locked />
                      <TrophyBadge icon={<Globe size={32} />} label="Global Citizen" desc="Chat with 5 different accents" locked />
                      <TrophyBadge icon={<TrendingUp size={32} />} label="Growth Leader" desc="Earn 50,000 XP" locked />
                      <TrophyBadge icon={<Search size={32} />} label="Grammar Pro" desc="Perfect grammar for 5 sessions" locked />
                      <TrophyBadge icon={<ShieldCheck size={32} />} label="Daily Hero" desc="Complete 30 daily goals" locked />
                      <TrophyBadge icon={<Sparkles size={32} />} label="Smooth Talker" desc="Use 5 complex idioms" locked />
                      <TrophyBadge icon={<Rocket size={32} />} label="Space Explorer" desc="Unlock all scenarios" locked />
                   </div>
                </div>

                <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex justify-center shrink-0">
                   <button 
                     onClick={() => setShowTrophyModal(false)}
                     className="bg-gray-900 text-white font-bold px-10 py-3.5 rounded-2xl hover:bg-black transition-all active:scale-95 shadow-lg"
                   >
                     Close Collection
                   </button>
                </div>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

function TrophyBadge({ icon, label, desc, unlocked, color, bg, locked }) {
  return (
    <div className={`p-6 rounded-3xl border flex flex-col items-center text-center transition-all group ${
      unlocked ? 'bg-white border-gray-100 hover:shadow-xl hover:-translate-y-1' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'
    }`}>
       <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-5 shadow-inner transition-transform group-hover:rotate-3 ${
         unlocked ? `${bg} ${color}` : 'bg-gray-200 text-gray-400'
       }`}>
          {unlocked ? icon : <Lock size={32} />}
       </div>
       <h5 className="font-bold text-sm text-gray-900 mb-1">{label}</h5>
       <p className="text-[10px] text-gray-500 font-medium leading-relaxed">{desc}</p>
       {!unlocked && (
         <div className="mt-4 px-3 py-1 bg-gray-200 text-gray-500 text-[10px] font-bold rounded-full uppercase tracking-widest">Locked</div>
       )}
    </div>
  );
}

function MilestoneCard({ icon, title, progress, goal, reward }) {
   const percent = (parseInt(progress) / parseInt(goal)) * 100;
   return (
      <div className="bg-white/5 border border-white/10 rounded-[2rem] p-8 hover:bg-white/10 transition-all group cursor-pointer active:scale-95">
         <div className="flex justify-between items-start mb-8">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
               {icon}
            </div>
            <div className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-sm uppercase tracking-wider">
              {reward}
            </div>
         </div>
         <h5 className="text-white font-bold text-sm uppercase tracking-widest mb-6 opacity-90 group-hover:text-emerald-400 transition-colors">{title}</h5>
         <div className="w-full bg-black/40 h-2 rounded-full overflow-hidden shadow-inner mb-3">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-1000 group-hover:shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{ width: `${percent}%` }}></div>
         </div>
         <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Progress</span>
            <div className="text-[11px] font-bold text-white/50 uppercase tracking-widest">{progress} <span className="text-white/20">/</span> {goal}</div>
         </div>
      </div>
   );
}
