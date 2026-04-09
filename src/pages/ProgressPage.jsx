import React, { useState } from 'react';
import { 
  TrendingUp, 
  ArrowUpRight, 
  Zap, 
  Target, 
  Download, 
  MessageSquare,
  Clock,
  Mic,
  Flame,
  Star,
  Globe,
  Trophy,
  MessageCircle,
  Crown,
  Rocket,
  X,
  CheckCircle2,
  Lock,
  Award,
  Sparkles
} from 'lucide-react';
import Sidebar from '../components/Sidebar';

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState('7days'); // '7days' | '30days'
  const [showRewards, setShowRewards] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleDownloadReport = () => {
    setIsDownloading(true);
    
    // Simulate generation delay for premium feel
    setTimeout(() => {
      const sessions = [
        { title: 'Job Interview', time: 'Today', duration: '12 mins', score: '88%' },
        { title: 'College Introduction', time: 'Yesterday', duration: '8 mins', score: '92%' },
        { title: 'Casual Talk', time: 'March 18', duration: '15 mins', score: '75%' },
        { title: 'Office Meeting', time: 'March 17', duration: '10 mins', score: '81%' },
      ];
      
      const headers = "Session,Date,Duration,Score\n";
      const csvContent = sessions.map(s => `${s.title},${s.time},${s.duration},${s.score}`).join("\n");
      const blob = new Blob([headers + csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.setAttribute('hidden', '');
      a.setAttribute('href', url);
      a.setAttribute('download', `ConvoKaro_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setIsDownloading(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-8 xl:p-10 relative">
        <div className="max-w-[1240px] mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-6 border-b border-gray-200 pb-6">
            <div>
              <h1 className="text-4xl font-serif text-gray-900 mb-2">
                Your <span className="text-convo-green italic">Progress</span>
              </h1>
              <p className="text-slate-500 font-medium">Track your journey to becoming a confident speaker</p>
            </div>
            
            {/* Toggle Controls */}
            <div className="flex bg-gray-100 p-1 rounded-xl w-fit">
               <button 
                 onClick={() => setTimeRange('7days')}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${timeRange === '7days' ? 'bg-white text-convo-green shadow-sm ring-1 ring-convo-green/20' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Last 7 Days
               </button>
               <button 
                 onClick={() => setTimeRange('30days')}
                 className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${timeRange === '30days' ? 'bg-white text-convo-green shadow-sm ring-1 ring-convo-green/20' : 'text-gray-500 hover:text-gray-700'}`}
               >
                 Last 30 Days
               </button>
            </div>
          </header>

          {/* KPI Cards (Top Row) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             <div className="bg-white rounded-3xl p-6 shadow-3d border border-gray-100 flex flex-col justify-between">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Avg Confidence</p>
                <div className="flex items-end gap-3 mb-1">
                   <div className="text-4xl font-serif text-gray-900 tracking-tight">82%</div>
                   <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold mb-1.5">
                     <ArrowUpRight size={14} /> +12%
                   </div>
                </div>
                <p className="text-sm text-gray-500">up from 75% {timeRange === '7days' ? 'last week' : 'last month'}</p>
             </div>
             
             <div className="bg-white rounded-3xl p-6 shadow-3d border border-gray-100 flex flex-col justify-between">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Total Practice</p>
                <div className="flex items-end gap-3 mb-1">
                   <div className="text-4xl font-serif text-gray-900 tracking-tight">14.5</div>
                   <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold mb-1.5">
                     <ArrowUpRight size={14} /> +8%
                   </div>
                </div>
                <p className="text-sm text-gray-500">hours this month</p>
             </div>
             
             <div className="bg-white rounded-3xl p-6 shadow-3d border border-gray-100 flex flex-col justify-between">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Scenarios Mastered</p>
                <div className="flex items-end gap-3 mb-1">
                   <div className="text-4xl font-serif text-gray-900 tracking-tight">8</div>
                </div>
                <p className="text-sm text-gray-500">/ 50 available</p>
             </div>
          </div>

          {/* Trend Chart & Level Card (Middle Row) */}
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
             
             {/* Confidence Trend Chart */}
             <div className="bg-white rounded-3xl p-6 lg:p-8 shadow-3d border border-gray-100 flex flex-col">
                <div className="flex justify-between items-center mb-8">
                   <h3 className="font-bold text-lg text-gray-900">Confidence Trend</h3>
                   <span className="px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-bold rounded-full uppercase tracking-wider">This Week</span>
                </div>
                <div className="flex-1 min-h-[200px] relative w-full flex items-end justify-center">
                   {/* Mock Chart Layout with CSS and SVG */}
                   <div className="absolute inset-x-0 bottom-0 top-0 flex flex-col justify-between pt-2 pb-6">
                     {[100, 75, 50, 25, 0].map(val => (
                       <div key={val} className="border-b border-gray-100 w-full relative flex-1">
                         <span className="absolute -top-2.5 -left-2 text-[10px] font-bold text-gray-300">{val}</span>
                       </div>
                     ))}
                   </div>
                   
                   {/* Mock SVG Line */}
                   <svg className="absolute inset-x-8 bottom-6 top-2 h-[calc(100%-2rem)] w-[calc(100%-4rem)] overflow-visible" preserveAspectRatio="none">
                      <path 
                        d="M0,80 C50,90 100,50 150,60 C200,70 250,30 300,20 C350,10 400,40 450,10 C500,-10 550,20 600,0 C650,-20 700,-10 750,-30 C800,-50 850,-40 900,-60" 
                        vectorEffect="non-scaling-stroke"
                        fill="none" 
                        stroke="#16a34a" 
                        strokeWidth="4" 
                        strokeLinecap="round" 
                        className="drop-shadow-[0_4px_8px_rgba(22,163,74,0.3)]"
                      />
                   </svg>
                   
                   {/* X-axis labels */}
                   <div className="absolute bottom-0 inset-x-8 flex justify-between text-[11px] font-bold text-gray-400 mt-2">
                     <span>Mon</span>
                     <span>Tue</span>
                     <span>Wed</span>
                     <span>Thu</span>
                     <span>Fri</span>
                     <span>Sat</span>
                     <span>Sun</span>
                   </div>
                </div>
             </div>

             {/* Current Level */}
             <div className="bg-[#111827] rounded-3xl p-8 shadow-3d relative overflow-hidden flex flex-col items-center justify-center border border-gray-800 text-center">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,163,74,0.15)_0%,transparent_70%)] pointer-events-none"></div>
                
                <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-6 relative z-10">Current Level</h3>
                
                <div className="w-24 h-24 rounded-full border-4 border-convo-green/30 flex items-center justify-center mb-4 relative z-10 shadow-[0_0_30px_rgba(22,163,74,0.3)] bg-[#1f2937]">
                   <div className="text-3xl font-serif text-white font-bold">12</div>
                </div>
                
                <h4 className="text-2xl font-serif text-white mb-2 relative z-10">Intermediate</h4>
                <p className="text-gray-400 text-sm mb-6 relative z-10">750 XP to Advanced</p>
                
                <div className="w-full bg-gray-800 h-2 rounded-full mb-8 relative z-10 overflow-hidden shadow-inner">
                   <div className="bg-convo-green h-full rounded-full" style={{ width: '80%' }}></div>
                </div>
                
                <button 
                  onClick={() => setShowRewards(true)}
                  className="w-full bg-white text-gray-900 font-bold py-3.5 rounded-xl hover:bg-gray-100 transition-all text-sm shadow-[0_4px_15px_rgba(255,255,255,0.1)] relative z-10 active:scale-95 active:shadow-inner flex items-center justify-center gap-2"
                >
                  View Rewards <Zap size={16} className="text-yellow-500 fill-yellow-500" />
                </button>
             </div>
          </div>

          {/* AI Insights */}
          <div className="pt-2">
            <h3 className="font-serif text-2xl text-gray-900 mb-5">AI Insights for You</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-green-50 text-green-600 shrink-0">
                     <TrendingUp size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Confidence improving</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Your score rose 8 points this week. Keep practicing daily.</p>
                  </div>
               </div>
               
               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-orange-50 text-orange-500 shrink-0">
                     <Zap size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Work on your Tone</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">Tone is your lowest metric at 70%. Try the Casual Talk scenario.</p>
                  </div>
               </div>
               
               <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500 shrink-0">
                     <Target size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Streak goal nearby</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">You're 2 days from your 7-day badge.</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Bottom Grid: Recent Sessions & Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 pb-12">
            
            {/* Recent Sessions */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
               <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                  <h3 className="font-serif text-xl text-gray-900">Recent Sessions</h3>
                  <button 
                    onClick={handleDownloadReport}
                    disabled={isDownloading}
                    className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-gray-800 transition-colors bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     {isDownloading ? (
                        <div className="w-3 h-3 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                     ) : (
                        <Download size={14} />
                     )}
                     {isDownloading ? 'Generating...' : 'Download Report'}
                  </button>
               </div>
               
               <div className="divide-y divide-gray-50 flex-1">
                  {[
                    { title: 'Job Interview', time: 'Today, 2:30 PM', duration: '12 mins', score: 88, icon: <MessageSquare size={18} /> },
                    { title: 'College Introduction', time: 'Yesterday', duration: '8 mins', score: 92, icon: <MessageSquare size={18} /> },
                    { title: 'Casual Talk', time: 'March 18', duration: '15 mins', score: 75, icon: <Clock size={18} /> },
                    { title: 'Office Meeting', time: 'March 17', duration: '10 mins', score: 81, icon: <TrendingUp size={18} /> },
                  ].map((session, index) => (
                    <div key={index} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                             {session.icon}
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-900 text-sm mb-0.5">{session.title}</h4>
                             <p className="text-xs text-gray-500 font-medium">{session.time} • {session.duration}</p>
                          </div>
                       </div>
                       <div className={`text-xl font-bold font-serif ${session.score >= 85 ? 'text-green-600' : 'text-orange-500'}`}>
                          {session.score}%
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Achievements preview briefly */}
            <div className="bg-white rounded-3xl p-6 lg:p-8 border border-gray-100 shadow-sm">
               <h3 className="font-serif text-xl text-gray-900 mb-6 border-b border-gray-50 pb-4">Recent Badges</h3>
               
               <div className="grid grid-cols-4 gap-y-6 gap-x-2">
                  <AchievementBadge icon={<Mic size={22} />} bg="bg-blue-100" color="text-blue-500" label="First Voice" />
                  <AchievementBadge icon={<Flame size={22} />} bg="bg-orange-100" color="text-orange-500" label="5-Day Streak" />
                  <AchievementBadge icon={<Star size={22} />} bg="bg-yellow-100" color="text-yellow-500" label="Level 4" />
                  <AchievementBadge icon={<Globe size={22} />} bg="bg-emerald-100" color="text-emerald-500" label="IRL Hero" />
                  <AchievementBadge icon={<Trophy size={22} />} bg="bg-gray-100" color="text-gray-400" label="Top 10%" locked />
                  <AchievementBadge icon={<MessageCircle size={22} />} bg="bg-gray-100" color="text-gray-400" label="50 Sessions" locked />
                  <AchievementBadge icon={<Crown size={22} />} bg="bg-gray-100" color="text-gray-400" label="Pro Member" locked />
                  <AchievementBadge icon={<Rocket size={22} />} bg="bg-gray-100" color="text-gray-400" label="Level 10" locked />
               </div>
            </div>
            
          </div>
        </div>

        {/* Modal: View Rewards */}
        {showRewards && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
             <div className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-white animate-in zoom-in-95 duration-300">
                <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
                   <div>
                     <h3 className="font-serif text-2xl text-gray-900">Your Rewards</h3>
                     <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mt-1">Level 12 Intermediate</p>
                   </div>
                   <button onClick={() => setShowRewards(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                      <X size={24} />
                   </button>
                </div>
                
                <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
                   {/* Unlocked Section */}
                   <div>
                      <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4 px-2">
                         <div className="w-1.5 h-6 bg-convo-green rounded-full"></div> Unlocked Rewards
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <RewardCard 
                            icon={<Award className="text-emerald-500" />} 
                            title="Intermediate Badge" 
                            desc="Showcase your fluency on your profile profile." 
                            unlocked 
                          />
                         <RewardCard 
                            icon={<Zap className="text-yellow-500 fill-yellow-500" />} 
                            title="1.2x XP Multiplier" 
                            desc="Earn XP faster in every practice session." 
                            unlocked 
                          />
                      </div>
                   </div>

                   {/* Milestone Section */}
                   <div>
                      <h4 className="flex items-center gap-2 font-bold text-gray-900 mb-4 px-2">
                         <div className="w-1.5 h-6 bg-gray-300 rounded-full"></div> Upcoming Perks
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                         <RewardCard 
                            icon={<Sparkles className="text-orange-400" />} 
                            title="Expert Scenarios" 
                            desc="Unlocks at Level 15. Real-world negotiation simulations." 
                          />
                         <RewardCard 
                            icon={<Mic className="text-blue-400" />} 
                            title="Tone Visualization" 
                            desc="Unlocks at Level 20. See your pitch and emotion in real-time." 
                          />
                      </div>
                   </div>
                </div>

                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-center">
                   <button 
                     onClick={() => setShowRewards(false)}
                     className="bg-gray-900 text-white font-bold px-8 py-3 rounded-xl hover:bg-gray-800 transition-all active:scale-95 shadow-lg"
                   >
                     Got it, thanks!
                   </button>
                </div>
             </div>
          </div>
        )}

        {/* Download Toast Notification */}
        {showToast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[70] bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/10 animate-in slide-in-from-bottom-2 duration-300">
             <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 size={18} className="text-emerald-400" />
             </div>
             <div>
                <p className="font-bold text-sm">Report Downloaded!</p>
                <p className="text-[10px] text-gray-400 font-medium">Session history exported as CSV.</p>
             </div>
          </div>
        )}

      </main>
    </div>
  );
}

function AchievementBadge({ icon, bg, color, label, locked }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${locked ? 'cursor-not-allowed opacity-60' : 'group cursor-pointer'}`}>
       <div className={`w-12 h-12 rounded-full ${bg} ${color} flex items-center justify-center shadow-inner ${!locked ? 'group-hover:scale-110 transition-transform' : 'border border-gray-200'}`}>
          {React.cloneElement(icon, { size: 22, className: locked ? '' : 'drop-shadow-sm' })}
       </div>
       <span className={`text-[10px] font-bold text-center uppercase tracking-tighter sm:tracking-normal ${locked ? 'text-gray-400' : 'text-gray-800'}`}>{label}</span>
    </div>
  );
}

function RewardCard({ icon, title, desc, unlocked }) {
   return (
      <div className={`p-4 rounded-2xl border flex items-start gap-4 transition-all ${unlocked ? 'bg-emerald-50/50 border-emerald-100 hover:border-emerald-200' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'}`}>
         <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm border border-gray-100 shrink-0">
            {icon}
         </div>
         <div>
            <div className="flex items-center gap-1.5 mb-0.5">
               <h5 className="font-bold text-sm text-gray-900">{title}</h5>
               {!unlocked && <Lock size={12} className="text-gray-400" />}
            </div>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">{desc}</p>
         </div>
      </div>
   );
}
