import React, { useState, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { 
  User, Mail, Crown, Star, Camera, Bell, CreditCard, Settings, LogOut, 
  ChevronRight, Trophy, Flame, MessageSquare, Globe, CheckCircle2, Zap, X
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { handleProUpgrade } from '../lib/razorpay';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  // New States
  const [activeModal, setActiveModal] = useState(null); // 'edit' | 'billing' | 'general' | 'achievements'
  const [notificationsEnabled, setNotificationsEnabled] = useState(user?.user_metadata?.notifications_enabled ?? true);
  const [profileForm, setProfileForm] = useState({
    fullName: user?.user_metadata?.full_name || 'B Manoj Rav',
    title: user?.user_metadata?.title || 'Job Seeker, Indore'
  });
  const [saving, setSaving] = useState(false);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const filePath = `${Date.now()}-${file.name}`;

      const { data, error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(publicUrl);
    } catch (error) {
      console.error('Error uploading avatar:', error.message);
      alert('Error uploading avatar: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { 
          full_name: profileForm.fullName,
          title: profileForm.title
        }
      });
      if (error) throw error;
      setActiveModal(null);
    } catch (error) {
      console.error('Error updating profile:', error.message);
      alert('Error updating profile: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const toggleNotifications = async () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    try {
      await supabase.auth.updateUser({
        data: { notifications_enabled: newValue }
      });
    } catch (err) {
      console.error("Failed to toggle notifications:", err);
    }
  };

  const achievements = [
    { id: 1, icon: <Crown size={20} className="text-emerald-500" />, title: "Early Bird", date: "Earned March 2026", unlocked: true, desc: "Completed your first practice session." },
    { id: 2, icon: <MessageSquare size={20} className="text-emerald-500" />, title: "Conversationalist", date: "Earned March 2026", unlocked: true, desc: "Completed 5 practice sessions." },
    { id: 3, icon: <Zap size={20} className="text-emerald-500" />, title: "Fast Learner", date: "Earned March 2026", unlocked: true, desc: "Earned your first 100 XP points." },
    { id: 4, icon: <Star size={20} className="text-gray-400" />, title: "Grammar Pro", date: "LOCKED", unlocked: false, desc: "Maintain 90%+ grammar for 3 sessions." },
    { id: 5, icon: <Flame size={20} className="text-gray-400" />, title: "Streak Master", date: "LOCKED", unlocked: false, desc: "Maintain a 7-day practice streak." },
    { id: 6, icon: <Globe size={20} className="text-gray-400" />, title: "Dual Speaker", date: "LOCKED", unlocked: false, desc: "Complete sessions in 2 different languages." },
    { id: 7, icon: <Trophy size= {20} className="text-gray-400" />, title: "Confidence King", date: "LOCKED", unlocked: false, desc: "Achieve 95%+ confidence score." },
    { id: 8, icon: <CheckCircle2 size={20} className="text-gray-400" />, title: "Perfect Score", date: "LOCKED", unlocked: false, desc: "Get 100% in any performance metric." },
    { id: 9, icon: <CreditCard size={20} className="text-gray-400" />, title: "Pro Pioneer", date: "LOCKED", unlocked: false, desc: "Unlock the full power of ConvoKaro." },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex font-sans">
      <Sidebar />

      <main className="flex-1 h-screen overflow-y-auto p-4 sm:p-8 relative">
        <div className="max-w-5xl mx-auto space-y-8 pb-12">
           {/* Profile Header Card */}
           <div className="bg-white rounded-3xl shadow-3d border border-gray-100 overflow-hidden relative mt-8 sm:mt-0">
              <div className="h-32 bg-gradient-to-r from-convo-ink to-[#1f2937] w-full"></div>
              
              <div className="px-8 pb-8 relative -mt-16 text-center">
                 {/* Avatar */}
                 <div className="relative inline-block mb-4">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={uploadAvatar}
                      accept="image/*"
                      className="hidden"
                      disabled={uploading}
                    />
                    <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-100 flex items-center justify-center">
                       {avatarUrl ? (
                         <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                       ) : (
                         <div className="w-full h-full flex items-center justify-center bg-convo-green text-white text-4xl font-serif">
                           {profileForm.fullName?.[0] || 'U'}
                         </div>
                       )}
                       {uploading && (
                         <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                           <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                         </div>
                       )}
                    </div>
                    {/* Online Dot */}
                    <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 border-4 border-white rounded-full"></div>
                    {/* Camera Edit Badge */}
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className={`absolute bottom-1 right-1 w-8 h-8 bg-white border border-gray-200 shadow-sm rounded-full flex items-center justify-center text-emerald-600 hover:scale-105 transition-transform ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <Camera size={14} />
                    </button>
                 </div>
                 
                 {/* User Info */}
                 <h1 className="text-3xl font-serif text-gray-900 mb-1">{profileForm.fullName}</h1>
                 <p className="flex items-center justify-center gap-1.5 text-sm text-gray-500 mb-4">
                    <Mail size={14} /> {user?.email || 'bmanojkumarrav@gmail.com'}
                 </p>
                 
                 <div className="flex justify-center gap-3 w-full mb-6 relative z-10">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-100 shadow-sm">
                       <Crown size={14} className="text-emerald-500" /> Pro Member
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-full border border-orange-100 shadow-sm">
                       <Star size={14} className="text-orange-500 fill-orange-500" /> Lvl 12
                    </span>
                 </div>
              </div>
              
              {/* Stats Divider & Grid */}
              <div className="border-t border-gray-100">
                 <div className="grid grid-cols-3 divide-x divide-gray-100">
                    <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                       <div className="text-3xl font-serif text-gray-900 tracking-tight">1.2k</div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-2">XP Points</div>
                       <div className="text-[10px] font-bold text-emerald-500">+140 this week</div>
                    </div>
                    
                    <div className="p-6 text-center hover:bg-gray-50 transition-colors relative">
                       <div className="text-3xl font-serif text-gray-900 tracking-tight">5</div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-2">Day Streak</div>
                       <div className="text-[10px] font-bold text-orange-500 flex items-center justify-center gap-1"><Flame size={12} className="fill-orange-500"/> Personal best!</div>
                    </div>
                    
                    <div className="p-6 text-center hover:bg-gray-50 transition-colors">
                       <div className="text-3xl font-serif text-gray-900 tracking-tight">12</div>
                       <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1 mb-2">Sessions</div>
                       <div className="text-[10px] font-bold text-emerald-500">+3 this week</div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Settings & Achievements */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Account Settings */}
              <div className="bg-white rounded-3xl shadow-3d border border-gray-100 overflow-hidden flex flex-col">
                 <div className="px-6 py-5 border-b border-gray-50">
                    <h3 className="font-serif text-xl text-gray-900">Account Settings</h3>
                 </div>
                 <div className="flex-1 px-2 py-2">
                    <SettingsRow 
                      icon={<User size={18} className="text-gray-500" />} 
                      label="Edit Profile" 
                      onClick={() => setActiveModal('edit')}
                    />
                    <SettingsRow 
                      icon={<Bell size={18} className="text-gray-500" />} 
                      label="Notifications" 
                      badge={{ 
                        text: notificationsEnabled ? 'On' : 'Off', 
                        color: notificationsEnabled ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-gray-100 text-gray-500 border-gray-200' 
                      }} 
                      onClick={toggleNotifications}
                    />
                    <SettingsRow 
                      icon={<CreditCard size={18} className="text-gray-500" />} 
                      label="Billing & Plan" 
                      badge={{ text: 'Pro', color: 'bg-orange-100 text-orange-600 border-orange-200' }} 
                      onClick={() => setActiveModal('billing')}
                    />
                    <SettingsRow 
                      icon={<Settings size={18} className="text-gray-500" />} 
                      label="General Settings" 
                      onClick={() => setActiveModal('general')}
                    />
                    
                    <div className="px-4 py-2"><hr className="border-gray-50 border-t-2" /></div>
                    
                    <button onClick={handleLogout} className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-red-50 rounded-xl transition-colors group">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100 transition-colors">
                             <LogOut size={16} className="text-red-500" />
                          </div>
                          <span className="font-bold text-sm text-red-600 group-hover:text-red-700">Sign Out</span>
                       </div>
                    </button>
                 </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-3xl shadow-3d border border-gray-100 p-6 flex flex-col justify-between">
                 <div>
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="font-serif text-xl text-gray-900">Achievements</h3>
                       <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100">3/12 Collected</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 auto-rows-fr">
                        {achievements.slice(0, 4).map(ach => (
                           <AchievementCard 
                            key={ach.id} 
                            icon={ach.icon} 
                            title={ach.title} 
                            date={ach.date} 
                            unlocked={ach.unlocked} 
                          />
                        ))}
                    </div>
                 </div>
                 
                 <button 
                   onClick={() => setActiveModal('achievements')}
                   className="w-full mt-6 py-3 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-700 bg-white hover:bg-emerald-50 transition-colors shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                 >
                    View All Achievements
                 </button>
              </div>
           </div>

           {/* Recent Activity Timeline */}
           <div className="bg-white rounded-3xl shadow-3d border border-gray-100 p-6 sm:p-8">
              <div className="flex justify-between items-center mb-6 border-b border-gray-50 pb-4">
                 <h3 className="font-serif text-xl text-gray-900">Recent Activity</h3>
                 <button className="px-3 py-1.5 bg-gray-50 text-gray-600 text-xs font-bold rounded-lg border border-gray-200 hover:bg-gray-100 flex items-center gap-1 transition-colors">
                    This Week <ChevronRight size={14} className="rotate-90" />
                 </button>
              </div>
              
              <div className="relative pl-3 space-y-6 before:absolute before:inset-y-2 before:left-[1.35rem] before:w-0.5 before:bg-gray-100">
                 
                 <TimelineItem 
                   icon={<Flame size={12} className="text-white fill-current" />} 
                   iconColor="bg-gradient-to-br from-orange-400 to-orange-600 shadow-orange-500/30 ring-4 ring-white"
                   text={<><strong>5-day streak</strong> achieved!</>}
                   time="Today"
                 />
                 
                 <TimelineItem 
                   icon={<Star size={12} className="text-white fill-current" />} 
                   iconColor="bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-yellow-500/30 ring-4 ring-white"
                   text={<>Reached <strong>Level 12</strong></>}
                   time="Yesterday"
                   extra={<span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">+500 XP</span>}
                 />
                 
                 <TimelineItem 
                   icon={<MessageSquare size={12} className="text-white" />} 
                   iconColor="bg-gradient-to-br from-blue-400 to-blue-600 shadow-blue-500/30 ring-4 ring-white"
                   text={<>Completed <strong>College Intro</strong></>}
                   time="Yesterday"
                   extra={<span className="text-emerald-600 text-sm font-bold bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100">92%</span>}
                 />
                 
                 <TimelineItem 
                   icon={<Globe size={12} className="text-white" />} 
                   iconColor="bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30 ring-4 ring-white"
                   text={<>Completed Real World Challenge: <strong>Said hi to a stranger</strong></>}
                   time="2 days ago"
                 />

              </div>
           </div>

           {/* Pro Upgrade Banner */}
           <div className="bg-convo-ink rounded-3xl p-8 relative overflow-hidden shadow-3d hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(22,163,74,0.15)_0%,transparent_70%)] pointer-events-none"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex-1">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-bold rounded-lg uppercase tracking-widest mb-4">
                       <Zap size={12} className="fill-orange-400" /> Limited Time
                    </span>
                    <h3 className="text-2xl md:text-3xl font-serif text-white mb-2">
                       Unlock your <span className="text-convo-green italic font-bold">potential.</span>
                    </h3>
                    <p className="text-gray-400 text-sm mb-5">Get unlimited access to all features and scenarios</p>
                    
                    <ul className="space-y-2.5">
                       <li className="flex items-center gap-2.5 text-sm text-gray-300">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                             <CheckCircle2 size={12} className="text-emerald-400 stroke-[3]" />
                          </div>
                          Unlimited practice sessions
                       </li>
                       <li className="flex items-center gap-2.5 text-sm text-gray-300">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                             <CheckCircle2 size={12} className="text-emerald-400 stroke-[3]" />
                          </div>
                          All 6+ scenarios unlocked
                       </li>
                       <li className="flex items-center gap-2.5 text-sm text-gray-300">
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                             <CheckCircle2 size={12} className="text-emerald-400 stroke-[3]" />
                          </div>
                          Deep AI feedback & tone analysis
                       </li>
                    </ul>
                 </div>
                 
                 <div className="w-full md:w-auto bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm flex flex-col items-center shadow-2xl">
                    <div className="text-4xl font-serif text-white mb-1 shadow-black drop-shadow-md">₹49 <span className="text-sm font-sans text-gray-400 font-bold">/month</span></div>
                    <button 
                      onClick={() => handleProUpgrade(user)}
                      className="w-full sm:w-auto bg-convo-green hover:bg-emerald-500 text-white font-bold py-3.5 px-8 rounded-xl mt-5 shadow-[0_5px_15px_rgba(22,163,74,0.3)] hover:-translate-y-0.5 transition-transform active:scale-95 flex items-center justify-center gap-2 border border-emerald-400/50"
                    >
                       Get Pro Now <ChevronRight size={18} />
                    </button>
                 </div>
              </div>
           </div>

         </div>

         {/* Modals */}
         {activeModal === 'edit' && (
           <Modal title="Edit Profile" onClose={() => setActiveModal(null)}>
             <form onSubmit={handleSaveProfile} className="space-y-5">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                 <input 
                   type="text" 
                   value={profileForm.fullName}
                   onChange={(e) => setProfileForm(prev => ({ ...prev, fullName: e.target.value }))}
                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                   placeholder="Your Name"
                 />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Bio / Title</label>
                 <input 
                   type="text" 
                   value={profileForm.title}
                   onChange={(e) => setProfileForm(prev => ({ ...prev, title: e.target.value }))}
                   className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-medium text-gray-900 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none"
                   placeholder="e.g. Job Seeker, Indore"
                 />
               </div>
               <button 
                 disabled={saving}
                 className="w-full bg-convo-green text-white font-bold py-3.5 rounded-xl mt-4 shadow-lg shadow-emerald-500/20 active:scale-95 transition-transform"
               >
                 {saving ? 'Saving...' : 'Save Changes'}
               </button>
             </form>
           </Modal>
         )}

         {activeModal === 'billing' && (
           <Modal title="Billing & Plan" onClose={() => setActiveModal(null)}>
             <div className="space-y-6">
                <div className="p-5 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-between">
                   <div>
                      <div className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-1">Current Plan</div>
                      <div className="text-xl font-serif text-gray-900">PRO Member</div>
                   </div>
                   <div className="px-3 py-1 bg-white border border-orange-200 text-orange-600 font-bold rounded-lg text-xs">
                      Active
                   </div>
                </div>
                <div className="space-y-4">
                   <h4 className="font-bold text-sm text-gray-900 px-1">Plan Management</h4>
                   <button className="w-full flex items-center justify-between px-5 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-700">Update Payment Method</span>
                      <ChevronRight size={18} className="text-gray-300" />
                   </button>
                   <button className="w-full flex items-center justify-between px-5 py-4 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-700">View Billing History</span>
                      <ChevronRight size={18} className="text-gray-300" />
                   </button>
                </div>
             </div>
           </Modal>
         )}

         {activeModal === 'general' && (
           <Modal title="General Settings" onClose={() => setActiveModal(null)}>
              <div className="space-y-6">
                 <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">App Language</label>
                    <div className="grid grid-cols-3 gap-3">
                       {['English', 'Hindi', 'Hinglish'].map(lang => (
                          <button 
                            key={lang}
                            onClick={async () => {
                              try {
                                await supabase.auth.updateUser({ data: { language: lang } });
                                alert(`Language preference updated to ${lang}`);
                              } catch(e) {}
                            }}
                            className="py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:border-emerald-500 hover:text-emerald-700 transition-all"
                          >
                            {lang}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
           </Modal>
         )}

         {activeModal === 'achievements' && (
           <Modal title="Achievement Collection" onClose={() => setActiveModal(null)}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar text-center">
                 {achievements.map(ach => (
                    <div key={ach.id} className={`p-4 rounded-2xl border flex flex-col items-center gap-2 ${ach.unlocked ? 'bg-emerald-50/50 border-emerald-100' : 'bg-gray-50 border-gray-100 opacity-60 grayscale'}`}>
                       <div className="w-12 h-12 rounded-xl bg-white border border-emerald-50 flex items-center justify-center shadow-sm">
                          {ach.icon}
                       </div>
                       <h4 className={`text-xs font-bold ${ach.unlocked ? 'text-gray-900' : 'text-gray-400'}`}>{ach.title}</h4>
                       <p className="text-[9px] text-gray-500 leading-tight">{ach.desc}</p>
                    </div>
                 ))}
              </div>
           </Modal>
         )}

      </main>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/40 backdrop-blur-sm animate-in fade-in duration-300">
       <div className="w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] overflow-hidden border border-white animate-in zoom-in-95 duration-300">
          <div className="px-8 py-6 border-b border-gray-50 flex justify-between items-center bg-gray-50/30">
             <h3 className="font-serif text-2xl text-gray-900">{title}</h3>
             <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600">
                <X size={24} />
             </button>
          </div>
          <div className="p-8">
             {children}
          </div>
       </div>
    </div>
  );
}

function SettingsRow({ icon, label, badge, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="w-full px-4 py-3.5 flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors group"
    >
       <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-gray-200 transition-all">
             {icon}
          </div>
          <span className="font-bold text-sm text-gray-700">{label}</span>
       </div>
       <div className="flex items-center gap-3">
          {badge && (
             <span className={`px-2 py-0.5 text-[10px] font-bold rounded-md border ${badge.color} uppercase tracking-wider shadow-sm`}>
               {badge.text}
             </span>
          )}
          <ChevronRight size={16} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-1 transition-all" />
       </div>
    </button>
  );
}

function AchievementCard({ icon, title, date, unlocked }) {
   if (!unlocked) {
     return (
       <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100 flex items-center gap-3 opacity-60 grayscale filter">
          <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center shrink-0">
             {icon}
          </div>
          <div>
             <h4 className="font-bold text-gray-500 text-sm">{title}</h4>
             <p className="text-[10px] font-bold text-gray-400 mt-0.5 uppercase tracking-wider">{date}</p>
          </div>
       </div>
     )
   }
   
   return (
     <div className="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100 hover:bg-emerald-50 hover:border-emerald-200 transition-colors cursor-pointer group flex items-center gap-3 shadow-sm hover:shadow-md">
        <div className="w-10 h-10 rounded-xl bg-white border border-emerald-100 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
           {icon}
        </div>
        <div>
           <h4 className="font-bold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">{title}</h4>
           <p className="text-[10px] font-bold text-emerald-600/80 mt-0.5 uppercase tracking-wide">{date}</p>
        </div>
     </div>
   )
}

function TimelineItem({ icon, iconColor, text, time, extra }) {
  return (
    <div className="relative pl-10 flex items-center justify-between group">
       <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-6 h-6 rounded-full flex items-center justify-center shadow-md z-10 ${iconColor}`}>
          {icon}
       </div>
       <div className="bg-white group-hover:bg-gray-50 transition-colors border border-transparent group-hover:border-gray-100 py-3 px-4 rounded-xl flex-1 flex items-center justify-between ml-2">
          <div>
            <p className="text-sm text-gray-800">{text}</p>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wide mt-1">{time}</p>
          </div>
          {extra && <div>{extra}</div>}
       </div>
    </div>
  )
}
