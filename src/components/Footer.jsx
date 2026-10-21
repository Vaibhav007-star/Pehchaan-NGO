import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  ExternalLink 
} from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';

export default function Footer({ setActiveTab, onOpenRegister, onOpenDonate }) {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1 & 2: NGO Identity & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-black text-xl font-cinzel">
                प
              </div>
              <div>
                <span className="text-xl font-extrabold text-white font-heading">PEHCHAAN NGO</span>
                <span className="text-[10px] font-bold block text-amber-400 uppercase tracking-widest">
                  The Power of Re-Use
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Established on 28th January 2016 under the Societies Registration Act XXI of 1860. 
              Committed to bringing transformative change across Uttar Pradesh through Gyan Jyoti street education, 
              Project Ankur child malnutrition eradication, and dignified redistribution of wearable clothes.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-[11px]">
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-amber-400 font-mono">
                Reg: {NGO_INFO.registrationNumber.split(' ')[0]}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 font-mono">
                NITI: {NGO_INFO.nitiAayogDarpanId}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-blue-400 font-mono">
                80G: {NGO_INFO.taxExemption80G.split('/')[2]}
              </span>
            </div>
          </div>

          {/* Col 3: Programs */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Our Flagship Projects
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className="hover:text-amber-400 transition"
                >
                  Gyan Jyoti Street School
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className="hover:text-amber-400 transition"
                >
                  Project Ankur (Malnutrition Relief)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className="hover:text-amber-400 transition"
                >
                  The Power of Re-Use (Cloth Drive)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('projects')} 
                  className="hover:text-amber-400 transition"
                >
                  Women Skill & Health Workshops
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('campaigns')} 
                  className="hover:text-amber-400 transition text-emerald-400 font-semibold"
                >
                  Crowdfunding Campaigns
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Portals & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Credential Portals
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button 
                  onClick={() => setActiveTab('verify')} 
                  className="hover:text-amber-400 transition"
                >
                  Verify Member / Volunteer ID
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('verify')} 
                  className="hover:text-amber-400 transition"
                >
                  Verify Certificate
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('certificates')} 
                  className="hover:text-amber-400 transition"
                >
                  Generate Digital Certificate
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('idcards')} 
                  className="hover:text-amber-400 transition"
                >
                  Generate ID Card Badge
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActiveTab('admin')} 
                  className="hover:text-amber-400 transition"
                >
                  Administrative Console
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact Offices */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact & Centers
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Head Office:</strong> BH 1/85 FF KA Block, Sector 12, Pratap Vihar, Ghaziabad UP 201009
                </span>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  <strong>Noida Office:</strong> Sector 22, Noida UP (Mr. Pawan Sharma)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`tel:${NGO_INFO.phone}`} className="hover:text-white">
                  {NGO_INFO.phone} (Dr. Neelesh Singh)
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${NGO_INFO.email}`} className="hover:text-white">
                  {NGO_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Collection Center Open Sundays: 10 AM - 5 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Official NGO Bottom Strip */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>
              Pehchaan NGO · Registered under the Societies Registration Act XXI of 1860 (Reg No: {NGO_INFO.registrationNumber.split(' ')[0]})
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('about')}
              className="text-slate-400 hover:text-amber-400 transition"
            >
              Statutory Documents & Exemption
            </button>
            <span>·</span>
            <span>All Rights Reserved © {new Date().getFullYear()} Pehchaan NGO</span>
          </div>
        </div>

      </div>
    </footer>
  );
}

