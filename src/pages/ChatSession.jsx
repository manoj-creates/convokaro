import React, { useState, useRef, useEffect, useContext } from 'react';
import { ArrowLeft, Mic, Send, Power, AlertCircle, Globe, ChevronDown } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate, Link } from 'react-router-dom';
import { generateChatResponse } from '../lib/gemini';
import AuthContext from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function ChatSession() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const { user } = useContext(AuthContext);

  // State
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState(user?.user_metadata?.language || 'English');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Practice session started!' },
    { id: 2, sender: 'user', text: 'Yep! Ready.' },
    { id: 3, sender: 'ai', text: "Great! Let’s start with a basic question: 'What’s your name and why do you want to join this college?'" }
  ]);
  const [scores, setScores] = useState({ avg: 0, fluency: 0, grammar: 0, confidence: 0 });
  const [showResults, setShowResults] = useState(false);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (overrideText = null) => {
    const textToSendMessage = overrideText || inputValue;
    if (!textToSendMessage.trim() || isTyping) return;
    
    // Append user message
    setMessages(prev => [...prev, { id: Date.now(), sender: 'user', text: textToSendMessage }]);
    setInputValue('');
    setIsTyping(true);
    
    try {
      // Start both the API call and a minimum delay timer
      const [response, _] = await Promise.all([
        generateChatResponse(
          textToSendMessage, 
          "You are a friendly AI conversation coach helping a user practice their English in a casual college setting. Keep it brief.",
          language
        ),
        new Promise(resolve => setTimeout(resolve, 1500)) // Minimum 1.5s typing delay
      ]);
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: response.text,
        suggestions: response.suggestions
      }]);
    } catch (error) {
      console.error("Failed to get AI response:", error);
    } finally {
      setIsTyping(false);
    }

    // Simulate scoring (we'll integrate real scoring later)
    setTimeout(() => {
      setScores({
        avg: 74,
        fluency: 7,
        grammar: 8,
        confidence: 7
      });
    }, 500);
  };

  const resetSession = () => {
    setMessages([
      { id: 1, sender: 'ai', text: 'Practice session started!' },
      { id: 2, sender: 'user', text: 'Yep! Ready.' },
      { id: 3, sender: 'ai', text: "Great! Let’s start with a basic question: 'What’s your name and why do you want to join this college?'" }
    ]);
    setScores({ avg: 0, fluency: 0, grammar: 0, confidence: 0 });
    setShowResults(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  const handleLanguageChange = async (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
    try {
      await supabase.auth.updateUser({
        data: { language: newLang }
      });
    } catch (error) {
      console.error("Failed to save language preference:", error);
    }
  };

  const toggleListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support voice recognition.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-IN';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputValue((prev) => (prev ? prev + ' ' + transcript : transcript));
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex h-screen bg-[#f3f4f6] font-sans overflow-hidden">
      
      {/* COLUMN 1: LEFT SIDEBAR */}
      <Sidebar />

      {/* COLUMN 2: MAIN CHAT AREA */}
      <main className="flex-1 flex flex-col relative z-10 bg-[#eef0f3]">
         {/* Ambient Glows */}
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-radial from-emerald-500/10 to-transparent blur-[80px] rounded-full pointer-events-none"></div>
         <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-blue-500/5 to-transparent blur-[80px] rounded-full pointer-events-none"></div>

         {/* Header */}
         <header className="h-24 bg-white/70 backdrop-blur-xl border-b border-white/50 px-8 flex justify-between items-center shadow-sm relative z-20">
            <div className="flex items-center gap-6">
               <button onClick={() => navigate('/practice')} className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 shadow-sm hover:shadow active:scale-95 transition-all">
                 <ArrowLeft size={18} />
               </button>
               <div>
                  <h1 className="text-2xl font-serif text-gray-900 tracking-tight">Chat Practice</h1>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div> Session Active</p>
               </div>
            </div>

            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-xl shadow-sm">
                  <Globe size={14} className="text-gray-400" />
                  <select 
                     value={language}
                     onChange={handleLanguageChange}
                     className="text-xs font-bold text-gray-700 bg-transparent outline-none focus:ring-0 cursor-pointer"
                  >
                     <option value="English">English</option>
                     <option value="Hindi">Hindi</option>
                     <option value="Hinglish">Hinglish</option>
                  </select>
               </div>
            </div>
            <button onClick={() => setShowResults(true)} className="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-red-500/20 bg-red-50 text-red-600 font-bold text-sm shadow-[inset_0_1px_2px_rgba(255,255,255,0.8),0_4px_10px_rgba(239,68,68,0.15)] hover:bg-red-500 hover:text-white hover:border-red-500 transition-all active:scale-95 group">
              <Power size={16} className="group-hover:drop-shadow-[0_0_4px_rgba(255,255,255,0.6)]" /> End Session
            </button>
         </header>

         {/* Chat Bubbles Feed */}
         <div className="flex-1 overflow-y-auto p-8 relative z-10 flex flex-col gap-6">
            <div className="text-center mb-4">
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold uppercase tracking-widest border border-emerald-500/20">Topic: College Introduction</span>
            </div>

            {messages.map(msg => (
               <React.Fragment key={msg.id}>
                  <div className={`flex w-full ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                     {msg.sender === 'ai' && (
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border border-white flex items-center justify-center shadow-md mr-3 shrink-0">
                          <span className="font-serif font-bold text-gray-600">AI</span>
                        </div>
                     )}
                     
                     <div className={`max-w-[75%] p-5 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.06)] relative overflow-hidden backdrop-blur-md border ${
                       msg.sender === 'user' 
                         ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-emerald-400 rounded-br-md shadow-[0_10px_30px_rgba(16,185,129,0.3),inset_0_2px_4px_rgba(255,255,255,0.3)]' 
                         : 'bg-white/80 text-gray-800 border-white rounded-bl-md shadow-[0_10px_30px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,0.8)]'
                     }`}>
                        {msg.sender === 'user' && <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>}
                        <p className="relative z-10 font-medium text-[15px] leading-relaxed tracking-wide">{msg.text}</p>
                     </div>
                  </div>

                  {/* Suggestion Chips */}
                  {msg.sender === 'ai' && msg.suggestions && msg.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 ml-14 mb-4 animate-in slide-in-from-left-4 duration-300">
                       {msg.suggestions.map((suggestion, index) => (
                          <button 
                            key={index}
                            onClick={() => handleSend(suggestion)}
                            className="px-4 py-2 bg-white border border-gray-200 rounded-full text-xs font-bold text-gray-700 shadow-sm hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700 transition-all active:scale-95 whitespace-nowrap"
                          >
                            {suggestion}
                          </button>
                       ))}
                    </div>
                  )}
               </React.Fragment>
            ))}

            {isTyping && (
              <div className="flex w-full justify-start items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border border-white flex items-center justify-center shadow-md shrink-0">
                   <span className="font-serif font-bold text-gray-600">AI</span>
                </div>
                <div className="bg-white/80 p-4 rounded-3xl border border-white shadow-sm flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
         </div>

         {/* Sticky Input Bar */}
         <div className="p-6 bg-white/60 backdrop-blur-xl border-t border-white/50 relative z-20">
            <div className="max-w-4xl mx-auto">
               <div className="relative group flex items-center">
                  <button 
                    onClick={toggleListening}
                    className={`absolute left-2 w-12 h-12 rounded-full flex items-center justify-center transition-all z-10 shadow-sm border ${
                      isListening 
                        ? 'bg-red-500 border-red-400 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse' 
                        : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    <Mic size={20} />
                  </button>
                  
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..." 
                    className="w-full pl-16 pr-32 py-5 bg-white border border-gray-200 rounded-[2rem] shadow-[0_8px_25px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(0,0,0,0.02)] focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-300 transition-all font-medium text-gray-800 text-[15px]"
                  />
                  
                  <div className="absolute right-2 flex items-center gap-2 z-10">
                     <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden sm:block">Practice in English, Hindi, Hinglish</span>
                     <button 
                       onClick={handleSend}
                       className="px-6 py-3.5 bg-[#141a24] text-white rounded-[1.5rem] font-bold text-sm shadow-[0_4px_15px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.2)] hover:bg-black transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 flex items-center gap-2"
                     >
                       Enter <Send size={14} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </main>

      {/* COLUMN 3: LIVE FEEDBACK SIDEBAR */}
      <aside className="w-[340px] bg-[#f8f9fa] border-l border-gray-200 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] flex flex-col shrink-0 z-20">
         {/* Texture top layer */}
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/concrete-wall.png')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>
         
         <div className="p-8 relative z-10 flex-1 overflow-y-auto">
            <h2 className="font-serif text-2xl text-gray-900 mb-10 tracking-tight">Live Performance</h2>
            
            {/* Primary Gauge */}
            <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.04),inset_0_2px_4px_rgba(255,255,255,1)] border border-gray-100 flex flex-col items-center justify-center mb-8 relative overflow-hidden group">
               <div className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-emerald-50 to-transparent opacity-50"></div>
               
               <div className="relative w-40 h-40 flex items-center justify-center mb-2">
                 {/* SVG Donut Background */}
                 <svg className="w-full h-full transform -rotate-90 drop-shadow-sm" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="36" fill="none" stroke="#f1f5f9" strokeWidth="8" />
                    {/* SVG Donut Foreground mapped to score */}
                    <circle cx="50" cy="50" r="36" fill="none" stroke="url(#emerald-gradient)" strokeWidth="8" strokeLinecap="round" strokeDasharray="226" strokeDashoffset={226 - (226 * scores.avg / 100)} className="transition-all duration-1000 ease-out" />
                    <defs>
                       <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#059669" />
                       </linearGradient>
                    </defs>
                 </svg>
                 <div className="absolute flex flex-col items-center">
                    <span className="font-serif text-5xl font-bold text-gray-900 drop-shadow-sm">
                      {scores.avg}<span className="text-2xl text-gray-400">%</span>
                    </span>
                 </div>
               </div>
               <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest drop-shadow-sm">Avg. Score</span>
            </div>

            {/* Sub-Score Widget Group */}
            <div className="space-y-4 mb-8">
               <SubScoreCard label="Fluency" val={scores.fluency} color="text-blue-600" bg="bg-blue-500" />
               <SubScoreCard label="Grammar" val={scores.grammar} color="text-amber-600" bg="bg-amber-500" />
               <SubScoreCard label="Confidence" val={scores.confidence} color="text-emerald-600" bg="bg-emerald-500" />
            </div>

            {/* Message Analysis Section */}
            <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-[inset_0_2px_4px_rgba(255,255,255,0.7),0_4px_15px_rgba(0,0,0,0.02)]">
               <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800 text-sm flex items-center gap-2">
                     <AlertCircle size={16} className="text-gray-400" /> Last Message Analysis
                  </h3>
               </div>
               <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                  {scores.avg === 0 ? (
                    <p className="text-sm text-gray-500 italic leading-relaxed">Start speaking to get instant feedback on your latest response.</p>
                  ) : (
                    <div className="space-y-3">
                       <p className="text-sm text-gray-700 leading-relaxed"><span className="font-bold text-emerald-600">Great tone!</span> Your pronunciation was clear.</p>
                       <div className="p-3 bg-red-50 border border-red-100 rounded-lg">
                          <p className="text-xs text-red-600 font-bold mb-1">Grammar Tip:</p>
                          <p className="text-xs text-red-500">Instead of "I is wanting to join", try "I want to join".</p>
                       </div>
                    </div>
                  )}
               </div>
            </div>
         </div>
      </aside>

      {/* Results Modal */}
       {showResults && (
         <div className="fixed inset-0 bg-[#0f172a]/80 backdrop-blur-md z-[100] flex items-center justify-center p-4">
           <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border border-white p-8 animate-in zoom-in duration-300">
             <div className="text-center">
               <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glass">
                 <Target size={40} />
               </div>
               
               <h2 className="text-4xl font-serif text-gray-900 mb-2">Great session!</h2>
               <p className="text-slate-500 font-medium mb-8">Your confidence improved today.</p>
               
               <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center">
                   <span className="text-4xl font-serif text-emerald-600 mb-1">{scores.confidence === 0 ? 0 : (scores.confidence * 10 + 20)}</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Confidence Score</span>
                 </div>
                 <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center">
                   <span className="text-xl font-bold text-gray-800 mb-1">
                     {scores.confidence > 7 ? 'Confident' : scores.confidence > 4 ? 'Neutral' : 'Friendly'}
                   </span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Tone Rating</span>
                 </div>
                 <div className="bg-gray-100/50 p-6 rounded-3xl border border-gray-100 flex flex-col items-center">
                   <span className="text-2xl font-bold text-gray-800 mb-1">{scores.grammar === 0 ? 0 : scores.grammar * 10}%</span>
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">Grammar</span>
                 </div>
                 <div className="bg-emerald-500 text-white p-6 rounded-3xl border border-emerald-400 flex flex-col items-center shadow-lg shadow-emerald-500/20">
                   <span className="text-2xl font-bold mb-1">+{scores.avg * 2}</span>
                   <span className="text-[10px] font-bold opacity-80 uppercase tracking-widest text-center">XP Earned</span>
                 </div>
               </div>
               
               <div className="flex flex-col gap-3">
                 <button 
                   onClick={resetSession}
                   className="w-full bg-convo-ink text-white py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95 btn-3d"
                 >
                   Practice Again
                 </button>
                 <button 
                   onClick={() => navigate('/dashboard')}
                   className="w-full bg-white border-2 border-gray-100 text-gray-700 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all"
                 >
                   Go to Dashboard
                 </button>
               </div>
             </div>
           </div>
         </div>
       )}

    </div>
  );
}

function SubScoreCard({ label, val, color, bg }) {
  // Convert 0-10 scale to percentage for width
  const percent = val * 10;
  return (
     <div className="bg-white p-4 rounded-2xl shadow-[0_4px_15px_rgba(0,0,0,0.03),inset_0_2px_4px_rgba(255,255,255,1)] border border-gray-50 flex items-center gap-4 group cursor-default hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all">
        <div className="w-10 flex flex-col items-center justify-center">
           <span className={`text-xl font-serif font-bold ${color} drop-shadow-sm leading-none block mb-1`}>{val}</span>
           <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">/ 10</span>
        </div>
        <div className="flex-1">
           <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">{label}</p>
           <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden shadow-inner flex">
             <div className={`${bg} h-1.5 rounded-full transition-all duration-1000 ease-out`} style={{ width: `${percent}%` }}></div>
           </div>
        </div>
     </div>
  );
}
