import React from 'react';
import { 
  Heart, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  CreditCard, 
  Mail, 
  GraduationCap, 
  Quote, 
  Phone,
  FileText
} from 'lucide-react';
import { NGO_INFO, PROJECTS, CROWDFUNDING_CAMPAIGNS } from '../data/ngoData';

export default function Home({ 
  setActiveTab, 
  onOpenRegister, 
  onOpenDonate 
}) {
  const platformFeatures = [
    {
      title: "Complete Dynamic Coding Website",
      desc: "Modern React architecture replacing static templates with real-time state and offline support.",
      icon: Sparkles,
      color: "bg-blue-500/10 text-blue-800 border-blue-200",
      action: () => setActiveTab('about')
    },
    {
      title: "Member, Volunteer & Intern Registration",
      desc: "Self-service onboarding with auto-assigned Registration IDs and MSW internship tracks.",
      icon: Users,
      color: "bg-emerald-500/10 text-emerald-800 border-emerald-200",
      action: onOpenRegister
    },
    {
      title: "Donation & Crowdfunding Page",
      desc: "Targeted campaigns for street schooling kits, child nutrition, and winter emergency packs.",
      icon: Heart,
      color: "bg-rose-500/10 text-rose-800 border-rose-200",
      action: onOpenDonate
    },
    {
      title: "Mail & Payment Gateway Integration",
      desc: "Integrated Razorpay checkout (UPI / Cards / NetBanking) and instant automated email dispatches.",
      icon: CreditCard,
      color: "bg-indigo-500/10 text-indigo-800 border-indigo-200",
      action: onOpenDonate
    },
    {
      title: "Generate Certificate (Member, Intern, Volunteer)",
      desc: "1-Click verifiable digital certificates with gold seal, signature, and dynamic QR authentication.",
      icon: Award,
      color: "bg-amber-500/10 text-amber-900 border-amber-200",
      action: () => setActiveTab('certificates')
    },
    {
      title: "Verify Member, Volunteer & Intern",
      desc: "Public search engine for colleges, HRs, and employers to confirm active credential validity.",
      icon: ShieldCheck,
      color: "bg-teal-500/10 text-teal-800 border-teal-200",
      action: () => setActiveTab('verify')
    },
    {
      title: "Verify Member, Intern Volunteer ID Card",
      desc: "CR80 print-ready identity badges complete with photo, center, blood group, and barcode/QR.",
      icon: CreditCard,
      color: "bg-purple-500/10 text-purple-800 border-purple-200",
      action: () => setActiveTab('idcards')
    },
    {
      title: "Auto Generate 80G Donation Receipt",
      desc: "Instant Income Tax compliant 80G tax exemption receipt PDF download with donor PAN & signature.",
      icon: FileText,
      color: "bg-orange-500/10 text-orange-900 border-orange-200",
      action: onOpenDonate
    }
  ];

  return (
    <div className="space-y-20 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-950 via-blue-900 to-slate-900 text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        
        {/* Glow backdrop shapes */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 text-center space-y-6">
          
          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Dedicated to Child Education, Malnutrition Eradication & Sustainable Welfare</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-heading tracking-tight leading-[1.1] max-w-5xl mx-auto">
            Give Underprivileged Children a True{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400">
              Pehchaan (Identity)
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-xl max-w-3xl mx-auto leading-relaxed">
            Registered Non-Governmental Organization empowering beggar, slum, and street children across Uttar Pradesh & NCR through free street education, clinical malnutrition therapy, and circular clothing redistribution.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={onOpenDonate}
              className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-slate-950 font-extrabold text-base shadow-lg shadow-amber-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
            >
              <Heart className="w-5 h-5 fill-slate-950" />
              <span>Donate Now (80G Tax Exemption)</span>
            </button>

            <button
              onClick={onOpenRegister}
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base backdrop-blur-md border border-white/20 transition flex items-center gap-2"
            >
              <Users className="w-5 h-5 text-amber-400" />
              <span>Join as Volunteer / Intern</span>
            </button>

            <button
              onClick={() => setActiveTab('verify')}
              className="px-6 py-4 rounded-2xl bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 font-bold text-sm border border-blue-700/50 transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verify Credentials</span>
            </button>
          </div>

          {/* Impact Stats Banner */}
          <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto text-left">
            
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Malnourished Rescued</span>
              <p className="text-3xl sm:text-4xl font-black text-white font-heading mt-1">1,800+</p>
              <p className="text-xs text-slate-400 mt-1">Free nutrition therapy & medicines</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <span className="text-xs uppercase font-bold text-blue-300 tracking-wider">College Interns</span>
              <p className="text-3xl sm:text-4xl font-black text-white font-heading mt-1">1,500+</p>
              <p className="text-xs text-slate-400 mt-1">From DU, Amity, IPU & Pan-India</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">Clothes Distributed</span>
              <p className="text-3xl sm:text-4xl font-black text-white font-heading mt-1">45,000+</p>
              <p className="text-xs text-slate-400 mt-1">Under The Power of Re-Use</p>
            </div>

            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5">
              <span className="text-xs uppercase font-bold text-rose-300 tracking-wider">Street School Centers</span>
              <p className="text-3xl sm:text-4xl font-black text-white font-heading mt-1">12+</p>
              <p className="text-xs text-slate-400 mt-1">Ghaziabad, Noida & Etawah</p>
            </div>

          </div>

        </div>

      </section>

      {/* 2. THE 8 CORE PLATFORM FEATURES (MIRRORING USER'S OWNER REQUIREMENT IMAGE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-700" />
            <span>Modern Technical Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
            Built Directly to NGO Owner Specifications
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Every feature requested by the leadership of Pehchaan NGO has been engineered into this dynamic coding platform.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {platformFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div 
                key={idx}
                onClick={feat.action}
                className="group cursor-pointer bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-300 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border mb-4 group-hover:scale-110 transition ${feat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug group-hover:text-blue-900 transition">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-amber-600 transition">
                  <span>Explore Module</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 3. FLAGSHIP PROJECTS SHOWCASE */}
      <section className="bg-slate-100/70 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-200">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-700">
                Grassroots Programs in Action
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading mt-1">
                Transforming Vulnerable Lives at the Ground Level
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('projects')}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-50 transition shadow-xs"
            >
              <span>View All Detailed Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROJECTS.slice(0, 3).map((proj) => (
              <div 
                key={proj.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition flex flex-col"
              >
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={proj.image} 
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold">
                    {proj.tag}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 font-heading">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <p className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl">
                      <strong>Impact:</strong> {proj.impact}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. AUTHENTIC SCRAPED TESTIMONIAL: THE STORY OF HOPE */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-gradient-to-tr from-amber-50 via-white to-amber-50/60 rounded-3xl p-8 sm:p-12 border-2 border-amber-200 shadow-md relative overflow-hidden">
          
          <div className="flex items-center gap-2 text-amber-800 text-xs font-bold uppercase tracking-widest mb-4">
            <Quote className="w-5 h-5 text-amber-600" />
            <span>Real Grassroots Story from Pehchaan Archives</span>
          </div>

          <blockquote className="text-slate-800 text-base sm:text-xl font-serif italic leading-relaxed">
            "I want to teach my children but I am very poor and uneducated. I work in a nearby factory, and earlier my wife and children were begging at intersections and picking garbage to survive. 
            Since Pehchaan NGO came here with their Gyan Jyoti street school and showed us the value of education, we completely stopped our children from begging. Now, our children attend Pehchaan NGO every single day."
          </blockquote>

          <div className="mt-6 pt-6 border-t border-amber-200/80 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="font-bold text-slate-900 text-sm">Parent of Gyan Jyoti Street Student</p>
              <p className="text-xs text-slate-600">Sector 12 Pratap Vihar Slum Settlement, Ghaziabad</p>
            </div>

            <button
              onClick={onOpenDonate}
              className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow transition flex items-center gap-1.5"
            >
              <Heart className="w-4 h-4 fill-white" />
              <span>Sponsor a Child's Education (₹1,000)</span>
            </button>
          </div>

        </div>
      </section>

      {/* 5. DR. APJ ABDUL KALAM INSPIRATION & VOLUNTEERING QUOTE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="max-w-2xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
              Inspired by Dr. A.P.J. Abdul Kalam
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-heading">
              "The best way to find yourself is to lose yourself in the service of others."
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Join over 1,500+ student interns and dynamic volunteers who have contributed their time and intellect to Pehchaan NGO. 
              Earn an authorized MSW certificate of appreciation valid for university credits, government examinations, and corporate recruitment.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Online & Offline Internships
              </span>
              <span className="flex items-center gap-1.5 text-amber-400">
                <CheckCircle2 className="w-4 h-4" />
                MSW Authorized Certificate
              </span>
              <span className="flex items-center gap-1.5 text-blue-400">
                <CheckCircle2 className="w-4 h-4" />
                Print-ready ID Badges
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col gap-3 w-full sm:w-auto">
            <button
              onClick={onOpenRegister}
              className="w-full sm:w-64 py-4 rounded-2xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-sm text-center shadow-lg transition active:scale-95"
            >
              Join as Volunteer / Intern
            </button>
            <button
              onClick={() => setActiveTab('verify')}
              className="w-full sm:w-64 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs text-center border border-white/20 transition"
            >
              Verify Existing Credential / Certificate
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}

