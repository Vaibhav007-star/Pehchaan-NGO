import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  Phone, 
  Mail, 
  BookOpen, 
  Heart, 
  Sparkles, 
  CheckCircle, 
  Calendar 
} from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';

export default function AboutUs({ onOpenRegister, onOpenDonate }) {
  const missionPoints = [
    { title: "Education for Slum & Beggar Children", desc: "Running street schools with zero fees, providing uniforms, books, stationery, and fundamental rights literacy." },
    { title: "Combating Child Malnutrition", desc: "Partnering with Community Health Centers (Mahewa Etawah & Ghaziabad) to rescue severely malnourished infants with pediatric supplements." },
    { title: "The Power of Re-Use", desc: "Collecting and redistributing pre-loved clothes, blankets, school bags, and essentials to families in poverty and calamity zones." },
    { title: "Women Empowerment & Gender Equity", desc: "Conducting stitching workshops, menstrual hygiene campaigns, and skill training for mothers in informal settlements." },
    { title: "Community Health & Free Medical Camps", desc: "Organizing periodic general health checkups, anemia screening, and deworming drives." },
    { title: "Environmental Protection & Circular Welfare", desc: "Minimizing textile waste by extending the lifecycle of usable garments and materials." }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Statutory Registered Non-Governmental Organization</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 font-heading">
          About Pehchaan NGO
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
          Inspired by the vision of <strong>Dr. A.P.J. Abdul Kalam</strong>, Pehchaan NGO operates a people-centric model that blends grassroots engagement with long-term sustainable development across Uttar Pradesh and NCR.
        </p>
      </div>

      {/* Profile & History Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="p-3 bg-amber-100 text-amber-800 rounded-2xl">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-heading">
              Organizational Profile & Governance
            </h2>
            <p className="text-xs text-slate-500">Established 28th January 2016 under Societies Registration Act XXI of 1860</p>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed">
          <strong>Pehchaan NGO</strong> was founded on <strong>28th January 2016</strong> by a dedicated group of socially conscious professionals, educators, and social workers. 
          Operating under registration number <strong>1122/6164M (renewed as R/GHA/17643/2020-2021)</strong> and NITI Aayog Unique ID <strong>{NGO_INFO.nitiAayogDarpanId}</strong>, our mandate is to enable the most vulnerable sections of society—specifically beggar children, homeless families, and daily wagers—to claim their constitutional dignity through education, health, and circular welfare.
        </p>

        {/* Legal Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Societies Act Reg:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{NGO_INFO.registrationNumber}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">NITI Aayog Darpan:</span>
            <span className="font-mono font-bold text-blue-900 text-sm">{NGO_INFO.nitiAayogDarpanId}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Section 80G IT Exemption:</span>
            <span className="font-mono font-bold text-emerald-700 text-sm">{NGO_INFO.taxExemption80G}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Section 12A Registration:</span>
            <span className="font-mono font-bold text-slate-900 text-sm">{NGO_INFO.taxExemption12A}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Founder & General Secretary:</span>
            <span className="font-bold text-slate-900 text-sm">{NGO_INFO.founderDirector}</span>
          </div>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold text-slate-400 uppercase block">Official Email:</span>
            <span className="font-mono font-semibold text-slate-900 text-xs">{NGO_INFO.email}</span>
          </div>
        </div>
      </div>

      {/* Mission & Vision Pillars */}
      <div className="space-y-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
            Our Core Objectives & Mission Pillars
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Official mission objectives recorded with the Registrar of Societies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {missionPoints.map((pt, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
              <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-900 font-extrabold flex items-center justify-center text-xs">
                0{idx + 1}
              </div>
              <h3 className="font-bold text-slate-900 text-base">{pt.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{pt.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Centers & Office Network */}
      <div className="bg-gradient-to-r from-blue-950 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Centers & Operational Bases</span>
          <h2 className="text-2xl sm:text-3xl font-black font-heading mt-1">
            Where We Operate
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          
          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Ghaziabad Head Office</span>
            </div>
            <p className="text-slate-300">
              BH 1/85 FF KA Block, Sector 12, Pratap Vihar, Ghaziabad, Uttar Pradesh 201009
            </p>
            <p className="text-slate-400 pt-1">
              Contact: <strong>Dr. Neelesh Singh</strong> (+91 9457320905)
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Noida Regional Office</span>
            </div>
            <p className="text-slate-300">
              E-251, E-118, Aditi General Store / Pawan Store (near F Block Baarat Ghar), Sector 22, Noida UP
            </p>
            <p className="text-slate-400 pt-1">
              Contact: <strong>Mr. Pawan Sharma</strong>
            </p>
          </div>

          <div className="bg-white/10 rounded-2xl p-5 border border-white/10 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <MapPin className="w-4 h-4" />
              <span>Collection & Field Centers</span>
            </div>
            <p className="text-slate-300">
              Charan Singh Colony L Block Pratap Vihar (Sundays 10am-5pm) & Mahewa Etawah CHC
            </p>
            <p className="text-slate-400 pt-1">
              Contact: <strong>Dr. Yatendra Rajput</strong> (Malnutrition Camp Lead)
            </p>
          </div>

        </div>

        <div className="pt-4 flex flex-wrap gap-4 justify-center sm:justify-start">
          <button
            onClick={onOpenDonate}
            className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow transition"
          >
            Support Pehchaan NGO (80G Tax Exemption)
          </button>
          <button
            onClick={onOpenRegister}
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition"
          >
            Join as Volunteer / Intern
          </button>
        </div>
      </div>

    </div>
  );
}

