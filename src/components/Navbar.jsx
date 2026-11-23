import { LOGO_PNG_BASE64 } from '../data/assetsBase64';
import React, { useState } from 'react';
import { 
  Heart, 
  Menu, 
  X, 
  ShieldCheck, 
  Award, 
  UserPlus, 
  Phone, 
  Mail, 
  Lock
} from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  onOpenRegister, 
  onOpenDonate 
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'projects', label: 'Our Projects' },
    { id: 'campaigns', label: 'Crowdfunding & Donate' },
    { id: 'verify', label: 'Verify Credentials' },
    { id: 'admin', label: 'Admin Portal', icon: Lock }
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      {/* Top emergency and accreditation strip */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Registered: {NGO_INFO.registrationNumber.split(' ')[0]}
            </span>
            <span className="hidden md:inline text-slate-500">|</span>
            <span className="hidden md:inline text-slate-400">
              NITI Aayog: <strong className="text-slate-200">{NGO_INFO.nitiAayogDarpanId}</strong>
            </span>
            <span className="hidden lg:inline text-slate-500">|</span>
            <span className="hidden lg:inline text-emerald-400 font-medium">
              The Power Of Re-Use &amp; Education for All
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <a href={`tel:${NGO_INFO.phone}`} className="flex items-center gap-1 hover:text-white transition">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>Helpline: {NGO_INFO.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* NGO Brand & Logo */}
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 text-left group"
          >
            <img 
              src={LOGO_PNG_BASE64} 
              alt="Pehchaan Welfare Society NGO" 
              className="h-11 sm:h-12 w-auto object-contain group-hover:scale-105 transition transform"
            />
          </button>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => setActiveTab(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-1.5 ${
                    isActive 
                      ? 'bg-red-50 text-red-700 font-bold' 
                      : 'text-slate-700 hover:text-red-700 hover:bg-slate-50'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5 text-slate-500" />}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Call to Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={onOpenRegister}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 transition shadow-sm"
            >
              <UserPlus className="w-4 h-4 text-red-600" />
              <span>Join as Volunteer/Intern</span>
            </button>

            {/* DONATE NOW BUTTON: 80G REMOVED & GREEN COLOR */}
            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 transition shadow-md shadow-emerald-600/25 active:scale-95"
            >
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              <span>Donate Now</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Mobile Donate Button */}
            <button
              onClick={onOpenDonate}
              className="px-3.5 py-1.5 rounded-lg text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm"
            >
              Donate Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition ${
                  activeTab === link.id
                    ? 'bg-red-50 text-red-700 font-bold'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                onOpenRegister();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl text-sm font-bold text-center text-red-700 bg-red-50 border border-red-200"
            >
              Join as Volunteer / Intern / Member
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
