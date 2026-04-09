import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import { Search, Globe2, ChevronDown, Lock, Crown, Zap, Clock, TrendingUp, CheckCircle2, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PracticePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('All');
  const filters = ['All', 'Academic', 'Social', 'Professional'];

  const scenarios = [
    {
      id: 1,
      category: 'ACADEMIC',
      title: 'College Introduction',
      desc: 'Introduce yourself to a new classmate or professor on your first day.',
      level: 'BEGINNER',
      isPro: false,
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=600&auto=format&fit=crop',
      points: ['Self-introduction basics', 'Asking about courses', 'Making small talk'],
      openingLine: "Hi there! I don't think we've met. I'm a first-year student here. How are you finding the campus so far?",
      duration: '5-7 mins',
      xp: '+50 XP'
    },
    {
      id: 2,
      category: 'SOCIAL',
      title: 'Casual Talk',
      desc: 'Small talk with a neighbor or a friend at a local cafe.',
      level: 'BEGINNER',
      isPro: false,
      image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=600&auto=format&fit=crop',
      points: ['Greeting neighbors', 'Weather & local topics', 'Closing a conversation'],
      openingLine: "Hey! Nice to see you here. It's such a beautiful day, isn't it?",
      duration: '4-6 mins',
      xp: '+40 XP'
    },
    {
      id: 3,
      category: 'PROFESSIONAL',
      title: 'Office Introduction',
      desc: 'Introduce yourself to your new team and manager at the office.',
      level: 'INTERMEDIATE',
      isPro: false,
      image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600&auto=format&fit=crop',
      points: ['Professional greetings', 'Explaining your role', 'Asking about team culture'],
      openingLine: "Good morning everyone! I'm the new lead designer joining the team today. I'm really excited to work with you all.",
      duration: '6-8 mins',
      xp: '+80 XP'
    },
    {
      id: 4,
      category: 'SOCIAL',
      title: 'Party Networking',
      desc: 'How to strike up a conversation at a social gathering or house party.',
      level: 'INTERMEDIATE',
      isPro: true,
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=600&auto=format&fit=crop',
      points: ['Icebreakers for parties', 'Joining a group', 'Handling introductions'],
      openingLine: "Hey, do you know the host? I'm a friend from college. This is a great playlist!",
      duration: '8-10 mins',
      xp: '+120 XP'
    },
    {
      id: 5,
      category: 'PROFESSIONAL',
      title: 'Job Interview',
      desc: 'Standard HR round questions for a software engineer or sales role.',
      level: 'ADVANCED',
      isPro: true,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
      points: ['Answering "Tell me about yourself"', 'Speaking with confidence', 'Asking smart questions'],
      openingLine: "Hello! Thank you for coming in today. To start off, could you tell us a bit about your background and why you applied for this role?",
      duration: '12-15 mins',
      xp: '+200 XP'
    },
    {
      id: 6,
      category: 'PROFESSIONAL',
      title: 'Customer Support',
      desc: 'Practice handling a difficult customer on a support call.',
      level: 'ADVANCED',
      isPro: true,
      image: 'https://images.unsplash.com/photo-1534536281715-e28d76689b4d?q=80&w=600&auto=format&fit=crop',
      points: ['Empathy in speech', 'Problem-solving language', 'De-escalation tactics'],
      openingLine: "Hi, I've been on hold for twenty minutes and my internet still isn't working! This is extremely frustrating.",
      duration: '10-12 mins',
      xp: '+150 XP'
    }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const languages = ['English', 'Hindi', 'Hinglish'];
  const [selectedScenario, setSelectedScenario] = useState(null);

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-8 xl:p-12 relative">
        <div className="max-w-[1200px] mx-auto">
          
          {/* Header Area */}
          <div className="flex justify-between items-start mb-10">
            <div>
              <h1 className="text-4xl font-serif text-[#111827] mb-2 tracking-tight">Practice Scenarios</h1>
              <p className="text-[#6b7280] font-medium text-[15px]">Choose a real-world situation to practice your conversations.</p>
            </div>
            
            <div className="relative group cursor-pointer inline-flex items-center gap-2 bg-white border border-[#e5e7eb] px-4 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all">
              <Globe2 size={16} className="text-emerald-500" />
              <span className="text-sm font-bold text-gray-700">{selectedLanguage}</span>
              <ChevronDown size={14} className="text-gray-400 group-hover:text-gray-600 ml-1" />
              
              {/* Dropdown menu */}
              <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-100 shadow-xl rounded-2xl p-2 hidden group-hover:block z-50">
                {languages.map((lang) => (
                  <div 
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-3 py-2.5 text-sm font-bold rounded-xl transition-colors ${
                      selectedLanguage === lang 
                        ? 'bg-emerald-50 text-emerald-600' 
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {lang}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-8">
             <div className="relative w-full max-w-lg">
               <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                 <Search size={18} className="text-gray-400" />
               </div>
               <input 
                 type="text" 
                 placeholder="Search scenarios..." 
                 className="w-full pl-12 pr-6 py-4 bg-white border border-gray-100 rounded-full focus:outline-none focus:ring-4 focus:ring-emerald-50 focus:border-emerald-200 transition-all shadow-sm shadow-gray-200/50 text-sm font-medium"
               />
             </div>

             <div className="flex gap-3 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 hide-scrollbar shrink-0">
               {filters.map(f => (
                 <button 
                   key={f}
                   onClick={() => setFilter(f)}
                   className={`px-6 py-3.5 rounded-full text-sm font-bold whitespace-nowrap transition-all ${filter === f ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
                 >
                   {f}
                 </button>
               ))}
             </div>
          </div>

          {/* Separator */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-lg font-bold text-[#111827] whitespace-nowrap">6 scenarios available</h3>
            <div className="h-[1px] w-full bg-gray-200/80"></div>
          </div>

          {/* Scenario Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-10">
            {scenarios.filter(s => filter === 'All' || s.category === filter.toUpperCase()).map((scenario) => (
              <div key={scenario.id} className="bg-white rounded-[2rem] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col group hover:-translate-y-1.5 transition-transform duration-300">
                 
                 {/* Card Image Area */}
                 <div className="h-44 relative bg-gray-100 overflow-hidden">
                    <img 
                      src={scenario.image} 
                      alt={scenario.title}
                      className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${scenario.isPro ? 'filter blur-[3px] brightness-75 scale-105' : ''}`}
                    />
                    
                    {/* Level Badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        scenario.level === 'BEGINNER' ? 'bg-emerald-100 text-emerald-700' : 
                        scenario.level === 'INTERMEDIATE' ? 'bg-amber-100 text-amber-700' : 
                        'bg-purple-100 text-purple-700'
                      }`}>
                        {scenario.level}
                      </span>
                    </div>

                    {/* PRO Overlay Bubble */}
                    {scenario.isPro && (
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                         <div className="bg-white/95 backdrop-blur-sm p-4 rounded-3xl shadow-xl flex flex-col items-center border border-white translate-y-2 group-hover:translate-y-0 transition-transform">
                           <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white mb-2 shadow-lg shadow-orange-500/30">
                             <Crown size={24} className="fill-current" />
                           </div>
                           <span className="font-bold text-[#111827] text-sm mb-3">PRO Only</span>
                           <button className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold px-6 py-2 rounded-full shadow-md hover:scale-105 transition-transform">
                             Upgrade Now
                           </button>
                         </div>
                      </div>
                    )}
                 </div>

                 {/* Card Content Area */}
                 <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{scenario.category}</p>
                      <h3 className="font-bold text-xl text-gray-900 mb-2">{scenario.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{scenario.desc}</p>
                    </div>

                    <div className="mt-8">
                       <button 
                         onClick={() => setSelectedScenario(scenario)} 
                         className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3.5 rounded-2xl shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition-all group-hover:shadow-emerald-500/40"
                       >
                         View Details <Zap size={16} className="fill-white drop-shadow-sm" />
                       </button>
                    </div>
                 </div>

              </div>
            ))}
          </div>

        </div>
      </main>

      {/* Scenario Preview Modal */}
      {selectedScenario && (
        <div className="fixed inset-0 bg-[#0f172a]/60 backdrop-blur-xl z-[100] flex items-center justify-center p-4">
           <div className="max-w-xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border border-white p-0 animate-in zoom-in duration-300">
              
              {/* Modal Header Image */}
              <div className="h-48 relative overflow-hidden">
                <img src={selectedScenario.image} alt={selectedScenario.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
                <button 
                  onClick={() => setSelectedScenario(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/80 backdrop-blur text-gray-900 rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all z-10"
                >
                  ✕
                </button>
                <div className="absolute bottom-4 left-8">
                   <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                     selectedScenario.level === 'BEGINNER' ? 'bg-emerald-100 text-emerald-700' : 
                     selectedScenario.level === 'INTERMEDIATE' ? 'bg-amber-100 text-amber-700' : 
                     'bg-purple-100 text-purple-700'
                   }`}>
                     {selectedScenario.level}
                   </span>
                </div>
              </div>

              {/* Modal Content */}
              <div className="px-10 pb-10 pt-4">
                 <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">{selectedScenario.category}</p>
                 <h2 className="text-3xl font-serif text-gray-900 mb-6">{selectedScenario.title}</h2>
                 
                 <div className="space-y-8 mb-10">
                    <div>
                       <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">What you will practice:</h4>
                       <div className="grid grid-cols-1 gap-2.5">
                          {selectedScenario.points.map((pt, idx) => (
                             <div key={idx} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500">
                                   <CheckCircle2 size={12} strokeWidth={3} />
                                </div>
                                <span className="text-sm font-bold text-gray-700 uppercase tracking-tight">{pt}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 relative group overflow-hidden">
                       <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
                          <MessageSquare size={40} />
                       </div>
                       <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">AI Opening Line:</h4>
                       <p className="text-sm italic font-medium text-gray-600 leading-relaxed pr-8">"{selectedScenario.openingLine}"</p>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 pt-6">
                       <div className="flex items-center gap-6">
                          <div className="flex items-center gap-2">
                             <Clock size={16} className="text-gray-400" />
                             <span className="text-xs font-bold text-gray-500">{selectedScenario.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                             <TrendingUp size={16} className="text-emerald-500" />
                             <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">{selectedScenario.xp}</span>
                          </div>
                       </div>
                       
                       {selectedScenario.isPro ? (
                          <button className="flex items-center gap-2 bg-[#111827] text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-gray-900/10 hover:bg-black transition-all hover:-translate-y-0.5">
                             <Crown size={16} className="text-amber-400 fill-amber-400" /> Upgrade for PRO
                          </button>
                       ) : (
                          <button 
                            onClick={() => navigate('/chat')}
                            className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-bold text-sm shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 transition-all hover:-translate-y-0.5 btn-3d"
                          >
                             Start Practice
                          </button>
                       )}
                    </div>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
