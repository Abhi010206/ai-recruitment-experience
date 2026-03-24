import React, { useState, useEffect, useMemo } from 'react';
import { 
  User, Briefcase, Search, CheckCircle, MessageSquare, ChevronRight, 
  LayoutDashboard, Star, ArrowRight, Zap, Download, Share2, Clock, 
  Filter, LogOut, ShieldCheck, Code, FileText, AlertCircle, Sparkles,
  Award, Target, Rocket, Copy, Trash2, BrainCircuit, MapPin, Key,
  Layers, Database, PieChart, Users, Eye, MousePointer2, Box, PencilRuler
} from 'lucide-react';

// --- MANDATORY SEEDED CREDENTIALS ---
const DEMO_CREDENTIALS = { 
  email: "hire-me@anshumat.org", 
  password: "HireMe@2025!" 
};

// --- INITIAL MOCK DATA ---
const INITIAL_CANDIDATES = [
  {
    id: 'c1',
    name: 'Arjun Mehta',
    role: 'Frontend Developer',
    experience: '2 Years',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
    summary: 'Expert in building high-performance web applications with a focus on modular component architecture and responsive design.',
    status: 'pending',
    matchScore: 94,
    projects: ['Nexus UI Kit', 'HealthTrack Dashboard']
  },
  {
    id: 'c2',
    name: 'Sarah Chen',
    role: 'Product Designer',
    experience: '4 Years',
    skills: ['Figma', 'User Research', 'Prototyping'],
    summary: 'Design lead focused on conversion-driven UX and creating scalable design systems for fintech startups.',
    status: 'shortlisted',
    matchScore: 88,
    projects: ['FinPay Mobile', 'Eco-Portal']
  }
];

const App = () => {
  // Navigation & Session State
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ email: '', pass: '' });
  const [isWireframeMode, setIsWireframeMode] = useState(false);
  
  // App Data State
  const [candidates, setCandidates] = useState(INITIAL_CANDIDATES);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Candidate Profile State
  const [profile, setProfile] = useState({
    role: '',
    experience: '',
    skills: [],
    summary: '',
    progress: 15,
    isSaved: true
  });

  // --- UTILITIES ---
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const isRecruiter = 
      loginForm.email.trim() === DEMO_CREDENTIALS.email && 
      loginForm.pass === DEMO_CREDENTIALS.password;

    if (isRecruiter) {
      setUser({ email: loginForm.email, role: 'recruiter' });
      setView('recruiter-dashboard');
      showToast("Evaluator Login Successful");
    } else {
      setUser({ email: loginForm.email || 'new-candidate@hire.me', role: 'candidate' });
      setView('onboarding-intro');
      showToast("Welcome to the platform!");
    }
  };

  const simulateAiProcessing = (narrative) => {
    if (!narrative.trim()) return;
    setIsAiProcessing(true);
    setProfile(p => ({ ...p, isSaved: false }));

    setTimeout(() => {
      const lower = narrative.toLowerCase();
      const detectedRole = lower.includes('design') || lower.includes('ui') ? 'UI/UX Designer' : 'Software Engineer';
      const detectedSkills = narrative.match(/(react|figma|node|python|tailwind|ui|ux|javascript|aws|git|sql)/gi) || ['Problem Solving'];
      
      setProfile(prev => ({
        ...prev,
        role: detectedRole,
        skills: [...new Set([...prev.skills, ...detectedSkills])],
        summary: `AI Extracted: Professional with a background in ${detectedRole}. Demonstrates practical proficiency in ${detectedSkills.join(', ')}. Narrative suggests high impact on project lifecycle.`,
        progress: 100,
        isSaved: true
      }));
      
      setIsAiProcessing(false);
      showToast("AI Profile Built!");
      setView('profile-preview');
    }, 2500);
  };

  const toggleShortlist = (id) => {
    setCandidates(prev => prev.map(c => 
      c.id === id ? { ...c, status: c.status === 'shortlisted' ? 'pending' : 'shortlisted' } : c
    ));
    showToast("Status Updated");
  };

  // --- STYLING LOGIC FOR WIREFRAME MODE ---
  const ui = (classes, wireframeClasses = "") => {
    if (isWireframeMode) {
      return `border-2 border-dashed border-gray-300 bg-white rounded-none grayscale ${wireframeClasses}`;
    }
    return classes;
  };

  // --- SUB-COMPONENTS ---

  const Navbar = () => (
    <nav className={ui("h-20 border-b border-gray-100 bg-white/70 backdrop-blur-xl sticky top-0 z-50 px-8 flex items-center justify-between", "h-20 border-b-2 border-black bg-white sticky top-0 px-8 flex items-center justify-between")}>
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => setView('landing')}>
        <div className={ui("bg-indigo-600 p-2 rounded-xl shadow-lg", "bg-black p-2")}>
          <BrainCircuit size={20} className="text-white" />
        </div>
        <span className={ui("font-black text-xl tracking-tighter uppercase italic", "font-bold text-xl uppercase")}>
          HireGenius{isWireframeMode ? " [Wireframe]" : ".AI"}
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <button 
          onClick={() => setIsWireframeMode(!isWireframeMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${isWireframeMode ? 'bg-black text-white' : 'bg-gray-100 text-gray-500 hover:bg-indigo-100 hover:text-indigo-600'}`}
        >
          {isWireframeMode ? <Box size={14}/> : <PencilRuler size={14}/>}
          {isWireframeMode ? "High-Fi Mode" : "Wireframe Mode"}
        </button>
        <button 
          onClick={() => setView('user-flow')}
          className="text-[10px] font-black uppercase text-gray-400 hover:text-indigo-600 transition-colors flex items-center gap-2"
        >
          <Layers size={14}/> Flow
        </button>
        {user ? (
          <div className="flex items-center gap-4">
             <span className={ui("text-[10px] font-black bg-indigo-50 text-indigo-700 px-3 py-1.5 rounded-lg uppercase tracking-widest", "text-[10px] font-bold border border-black px-2 py-1")}>{user.role}</span>
             <button onClick={() => {setUser(null); setView('landing');}} className="text-xs font-black uppercase text-gray-400 hover:text-red-500 transition-colors">Logout</button>
          </div>
        ) : (
          <button onClick={() => setView('auth')} className={ui("bg-black text-white px-6 py-2.5 rounded-2xl text-xs font-bold tracking-widest uppercase hover:bg-gray-800 transition-all", "border-2 border-black px-6 py-2 text-xs font-bold uppercase")}>Sign In</button>
        )}
      </div>
    </nav>
  );

  const Toast = () => toast && (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 bg-gray-900 text-white px-6 py-4 rounded-[24px] shadow-2xl animate-bounce">
      {toast.type === 'success' ? <CheckCircle size={18} className="text-green-400"/> : <AlertCircle size={18} className="text-red-400"/>}
      <span className="text-sm font-bold">{toast.message}</span>
    </div>
  );

  const UserFlowView = () => {
    const layers = [
      { id: 1, title: "Discovery", desc: "User lands on the zero-friction 'Anti-Resume' value prop.", icon: <Eye />, color: "bg-blue-500" },
      { id: 2, title: "Authentication", desc: "Lightweight Auth or Evaluator-specific demo login.", icon: <Key />, color: "bg-indigo-500" },
      { id: 3, title: "AI Onboarding", desc: "Setting the context: AI explains why narrative beats PDFs.", icon: <Sparkles />, color: "bg-purple-500" },
      { id: 4, title: "Narrative Synthesis", desc: "User enters natural language; AI extracts role/skills/impact.", icon: <BrainCircuit />, color: "bg-pink-500" },
      { id: 5, title: "Validation", desc: "Candidate reviews AI's structured interpretation of their work.", icon: <ShieldCheck />, color: "bg-rose-500" },
      { id: 6, title: "Recruiter Evaluation", desc: "Profile hits the pipeline with auto-calculated match scores.", icon: <LayoutDashboard />, color: "bg-amber-500" },
      { id: 7, title: "Conversion", desc: "Decision point: Shortlist, Export, or Direct Contact.", icon: <Target />, color: "bg-green-500" },
    ];

    return (
      <div className="max-w-6xl mx-auto py-16 px-6">
        <div className="text-center mb-16">
          <h2 className={ui("text-5xl font-black tracking-tight mb-4", "text-4xl font-bold uppercase mb-4")}>The 7 Layers of Flow</h2>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto">This architecture ensures 0% drop-off from resume fatigue and 100% structured data capture for hiring managers.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {layers.map((layer, idx) => (
            <div key={layer.id} className={ui("bg-white border-2 border-gray-50 rounded-[32px] p-8 relative hover:border-indigo-600 hover:shadow-xl transition-all group overflow-hidden", "border-2 border-black p-6 bg-white")}>
              <div className="text-[10px] font-black uppercase text-gray-300 tracking-[0.3em] mb-4">Step 0{idx + 1}</div>
              <div className={ui(`w-10 h-10 ${layer.color} text-white rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100`, "w-8 h-8 bg-black text-white flex items-center justify-center mb-4")}>
                {React.cloneElement(layer.icon, { size: 16 })}
              </div>
              <h3 className="text-xl font-black mb-3">{layer.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed font-medium">{layer.desc}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const LandingPage = () => (
    <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      {!isWireframeMode && (
        <div className="absolute top-0 left-0 w-full h-full -z-10 opacity-30">
          <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-200 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200 rounded-full blur-[120px]"></div>
        </div>
      )}
      <div className={ui("bg-white border border-gray-100 px-4 py-2 rounded-full shadow-sm mb-10 flex items-center gap-2", "border border-black px-4 py-1 mb-8")}>
        <Sparkles size={14} className={ui("text-indigo-600", "text-black")} />
        <span className="text-[10px] font-black tracking-widest text-gray-400 uppercase">Redesigning Recruitment</span>
      </div>
      <h1 className={ui("text-7xl md:text-9xl font-black text-gray-900 mb-8 tracking-tighter leading-[0.85] max-w-4xl", "text-5xl font-bold uppercase mb-8 border-b-4 border-black")}>
        The End of the <br /><span className={ui("text-indigo-600 underline decoration-indigo-200 underline-offset-8", "text-black")}>PDF Resume.</span>
      </h1>
      <p className="text-xl text-gray-500 max-w-xl mb-12 font-medium leading-relaxed">Modern profile building for freshers. Capture your narrative. Prove your capability. Get hired by impact.</p>
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <button onClick={() => setView('auth')} className={ui("flex-1 h-16 bg-black text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:scale-105 transition-transform shadow-2xl shadow-black/20", "flex-1 h-14 border-2 border-black font-bold uppercase")}>Build My Profile <ArrowRight size={20}/></button>
        <button onClick={() => { setLoginForm({email: DEMO_CREDENTIALS.email, pass: DEMO_CREDENTIALS.password}); setView('auth'); }} className={ui("flex-1 h-16 bg-white border-2 border-gray-100 text-gray-900 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all", "flex-1 h-14 border-2 border-black font-bold uppercase bg-gray-100")}>Recruiter Demo</button>
      </div>
    </div>
  );

  const AuthView = () => (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-gray-50/50">
      <div className={ui("w-full max-w-md bg-white border border-gray-100 p-10 rounded-[48px] shadow-2xl", "w-full max-w-md border-2 border-black p-8 bg-white")}>
        <h2 className="text-3xl font-black mb-2 text-center tracking-tight uppercase">Login</h2>
        <p className="text-gray-400 text-center mb-8 text-[10px] font-black uppercase tracking-widest">Candidate or Evaluator</p>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest">Email</label>
            <input type="email" required className={ui("w-full h-14 bg-gray-50 border-2 border-transparent rounded-2xl px-5 font-bold focus:border-black focus:bg-white outline-none transition-all", "w-full h-12 border border-black px-4")} value={loginForm.email} onChange={e => setLoginForm(prev => ({ ...prev, email: e.target.value }))} />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase text-gray-400 px-2 tracking-widest">Password</label>
            <input type="password" required className={ui("w-full h-14 bg-gray-50 border-2 border-transparent rounded-2xl px-5 font-bold focus:border-black focus:bg-white outline-none transition-all", "w-full h-12 border border-black px-4")} value={loginForm.pass} onChange={e => setLoginForm(prev => ({ ...prev, pass: e.target.value }))} />
          </div>
          <button className={ui("w-full h-14 bg-black text-white rounded-2xl font-black uppercase tracking-widest mt-4 hover:shadow-xl transition-all", "w-full h-12 bg-black text-white font-bold uppercase")}>Enter Dashboard</button>
        </form>
        <div className="mt-8 pt-6 border-t border-gray-100">
           <button onClick={() => setLoginForm({email: DEMO_CREDENTIALS.email, pass: DEMO_CREDENTIALS.password})} className={ui("w-full py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2", "w-full py-2 border border-black text-xs font-bold uppercase")}>
             <Key size={12}/> Autofill Evaluator
           </button>
        </div>
      </div>
    </div>
  );

  const OnboardingIntro = () => (
    <div className="max-w-xl mx-auto py-24 px-6 text-center">
      <div className={ui("w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl", "w-20 h-20 border-2 border-black mx-auto mb-8 flex items-center justify-center bg-gray-100")}>
        <Sparkles size={40} className={ui("text-white", "text-black")} />
      </div>
      <h2 className={ui("text-4xl font-black mb-6 tracking-tight", "text-3xl font-bold uppercase mb-4")}>Zero-Resume Intake.</h2>
      <p className="text-xl text-gray-500 mb-12 font-medium leading-relaxed italic">"In the next 2 minutes, I'll interview you about your work. I'll then structure that into a capability profile that recruiters actually love."</p>
      <button onClick={() => setView('ai-builder')} className={ui("w-full h-16 bg-black text-white rounded-2xl font-black text-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-3 shadow-xl", "w-full h-14 border-2 border-black bg-black text-white font-bold uppercase")}>Begin AI Interview</button>
    </div>
  );

  const AiProfileBuilder = () => {
    const [narrative, setNarrative] = useState("");
    return (
      <div className="max-w-3xl mx-auto py-12 px-6">
        <div className="flex justify-between items-end mb-8">
          <div><h2 className="text-2xl font-black tracking-tight uppercase">Experience Capture</h2><p className="text-gray-400 text-sm font-medium">Capture your impact through storytelling.</p></div>
          <div className="text-right"><span className="text-[10px] font-black text-indigo-600 block mb-2">{profile.progress}% Complete</span>
            <div className={ui("w-32 h-2 bg-gray-100 rounded-full", "w-32 h-3 border border-black")}><div className="h-full bg-black transition-all duration-1000" style={{ width: `${profile.progress}%` }}></div></div>
          </div>
        </div>
        <div className={ui("bg-white border-2 border-gray-100 rounded-[48px] p-10 shadow-2xl relative", "border-2 border-black p-8 bg-white")}>
          <div className="flex gap-4 mb-8">
            <div className={ui("w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shrink-0", "w-10 h-10 border border-black flex items-center justify-center bg-gray-50")}><MessageSquare size={20} className={ui("text-white", "text-black")} /></div>
            <p className="text-lg font-bold text-gray-800 leading-snug italic">"Tell me about your best project. What did you build, and what technologies made it happen?"</p>
          </div>
          <textarea className={ui("w-full h-64 bg-gray-50/50 border-2 border-transparent rounded-[32px] p-8 text-xl font-medium focus:bg-white focus:border-black outline-none resize-none transition-all", "w-full h-48 border border-black p-4 font-mono")} placeholder="I built a web scraper using Python..." value={narrative} onChange={e => setNarrative(e.target.value)} />
          <div className="mt-8 flex justify-between items-center"><p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Guided AI Input v1.0</p>
            <button onClick={() => simulateAiProcessing(narrative)} disabled={!narrative || isAiProcessing} className={ui(`h-14 px-10 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 transition-all ${isAiProcessing ? 'bg-gray-100 text-gray-400' : 'bg-black text-white'}`, "h-12 border-2 border-black px-6 font-bold uppercase")}>
              {isAiProcessing ? "Processing..." : "Submit Experience"}</button>
          </div>
        </div>
      </div>
    );
  };

  const ProfilePreview = () => (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className={ui("bg-black text-white p-8 rounded-[40px] mb-10 flex flex-col md:flex-row items-center justify-between gap-6", "border-2 border-black p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4")}>
        <div className="flex items-center gap-4"><div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center"><CheckCircle className="text-white"/></div>
          <div><h4 className="font-black text-sm uppercase tracking-widest">Profile Ready</h4><p className="text-gray-400 text-xs font-medium">Recruiter-ready structured data.</p></div>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button className={ui("flex-1 md:flex-none bg-white/10 px-6 py-3 rounded-xl text-xs font-black uppercase", "border border-white px-4 py-2 text-xs")}>Export</button>
          <button className={ui("flex-1 md:flex-none bg-indigo-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase", "bg-white text-black px-4 py-2 text-xs font-bold border border-white")}>Share Link</button>
        </div>
      </div>
      <div className={ui("bg-white border-2 border-gray-50 rounded-[64px] overflow-hidden shadow-sm", "border-2 border-black bg-white")}>
        <div className={ui("h-32 bg-indigo-50", "h-20 bg-gray-100 border-b border-black")}></div>
        <div className="px-14 pb-14"><div className="relative -mt-16 mb-10"><div className={ui("w-32 h-32 bg-white rounded-[40px] border-[8px] border-white shadow-2xl flex items-center justify-center", "w-24 h-24 border-4 border-black bg-white flex items-center justify-center")}><User size={48} /></div></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16"><div className="lg:col-span-2 space-y-12"><section><h1 className="text-5xl font-black mb-2 tracking-tight">{profile.role || "Talent Name"}</h1><p className="text-2xl text-gray-700 font-bold leading-relaxed">{profile.summary}</p></section>
              <section><h3 className="text-[10px] font-black uppercase text-gray-400 mb-6 tracking-widest">Capabilities</h3><div className="flex flex-wrap gap-3">{profile.skills.map(s => <span key={s} className={ui("bg-gray-50 border-2 border-gray-100 px-6 py-3 rounded-2xl text-sm font-black", "border border-black px-4 py-2 text-xs font-bold uppercase")}>{s}</span>)}</div></section>
            </div></div></div></div>
    </div>
  );

  const RecruiterView = () => (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div><h1 className="text-5xl font-black tracking-tight mb-2 uppercase">Candidate Pipeline</h1><p className="text-gray-400 font-bold uppercase tracking-widest text-xs italic">Structured Evaluation Dashboard</p></div>
        <div className="relative w-80"><Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input type="text" placeholder="Search pipeline..." className={ui("pl-12 pr-6 h-14 w-full bg-white border-2 border-gray-100 rounded-2xl outline-none font-bold", "w-full h-12 border border-black pl-10")} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {candidates.map(c => (
          <div key={c.id} className={ui("bg-white border-2 border-gray-50 rounded-[48px] p-10 group", "border-2 border-black p-6 bg-white")}>
            <div className="flex items-start justify-between mb-8"><div className={ui("w-16 h-16 bg-indigo-50 rounded-[24px] flex items-center justify-center text-indigo-600 font-black text-2xl", "w-12 h-12 border border-black flex items-center justify-center text-xl font-bold")}>{c.name[0]}</div><div className="bg-green-50 text-green-700 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest">{c.matchScore}%</div></div>
            <h3 className="text-2xl font-black mb-1">{c.name}</h3><p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">{c.role}</p>
            <div className="flex gap-3"><button onClick={() => { setSelectedCandidate(c); setView('candidate-detail'); }} className={ui("flex-1 bg-black text-white h-14 rounded-2xl font-black text-[10px] uppercase", "flex-1 border-2 border-black h-10 font-bold uppercase")}>View Profile</button>
              <button onClick={() => toggleShortlist(c.id)} className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${c.status === 'shortlisted' ? 'bg-amber-400 text-white' : 'border-gray-100 text-gray-300'}`}><Star size={20} fill={c.status === 'shortlisted' ? "white" : "none"}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const CandidateDetail = () => {
    if (!selectedCandidate) return null;
    return (
      <div className="max-w-5xl mx-auto py-12 px-6">
        <button onClick={() => setView('recruiter-dashboard')} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-400 mb-10"><ArrowRight size={14} className="rotate-180"/> Back</button>
        <div className={ui("bg-white border-2 border-gray-100 rounded-[64px] overflow-hidden shadow-2xl", "border-2 border-black bg-white")}>
           <div className="p-14 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div className="flex items-center gap-8"><div className={ui("w-24 h-24 bg-indigo-600 rounded-[32px] flex items-center justify-center text-white text-3xl font-black", "w-20 h-20 border-2 border-black flex items-center justify-center font-bold")}>{selectedCandidate.name[0]}</div>
                 <div><h1 className="text-5xl font-black tracking-tighter mb-1">{selectedCandidate.name}</h1><p className="text-indigo-600 font-black uppercase text-xs">{selectedCandidate.role}</p></div>
              </div>
              <button onClick={() => { toggleShortlist(selectedCandidate.id); setView('recruiter-dashboard'); }} className={ui("px-12 h-16 rounded-[24px] font-black uppercase text-xs", "border-2 border-black px-8 h-12 font-bold uppercase bg-black text-white")}>{selectedCandidate.status === 'shortlisted' ? 'Shortlisted' : 'Shortlist'}</button>
           </div>
           <div className="p-14 grid grid-cols-1 lg:grid-cols-3 gap-20"><div className="lg:col-span-2 space-y-12"><section><h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 border-b-2 border-black inline-block">Analysis</h3><p className="text-2xl text-gray-700 font-bold leading-relaxed">{selectedCandidate.summary}</p></section>
                 <section><h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-6 border-b-2 border-black inline-block">Stack</h3><div className="flex flex-wrap gap-3">{selectedCandidate.skills.map(s => <span key={s} className="border border-black px-4 py-2 text-xs font-bold uppercase">{s}</span>)}</div></section>
              </div><div className="bg-gray-50 p-10 rounded-[48px] border-2 border-gray-100 space-y-4"><h4 className="font-black text-sm uppercase mb-4">Verification</h4><div className="flex items-center gap-3 text-sm font-bold text-gray-600"><ShieldCheck size={18}/> Validated</div></div>
           </div>
        </div>
      </div>
    );
  };

  // --- ROOT RENDER ---
  return (
    <div className={`min-h-screen ${isWireframeMode ? 'bg-[#EEEEEE]' : 'bg-[#FBFBFD]'} text-gray-900 font-sans pb-20 transition-colors duration-500`}>
      <Navbar />
      <main className="animate-in fade-in duration-700">
        {view === 'landing' && <LandingPage />}
        {view === 'auth' && <AuthView />}
        {view === 'user-flow' && <UserFlowView />}
        {view === 'onboarding-intro' && <OnboardingIntro />}
        {view === 'ai-builder' && <AiProfileBuilder />}
        {view === 'profile-preview' && <ProfilePreview />}
        {view === 'recruiter-dashboard' && <RecruiterView />}
        {view === 'candidate-detail' && <CandidateDetail />}
      </main>
      <Toast />
    </div>
  );
};

export default App;
