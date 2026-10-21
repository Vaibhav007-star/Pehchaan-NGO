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
              80G Tax Exemption Available
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
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-blue-800 to-indigo-900 flex items-center justify-center text-white shadow-md shadow-blue-900/20 group-hover:scale-105 transition transform">
              <div className="relative">
                <span className="text-2xl font-black font-cinzel text-amber-400">प</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight text-blue-950 font-heading">
                  PEHCHAAN
                </span>
                <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md">
                  NGO
                </span>
              </div>
              <p className="text-[11px] text-slate-700 font-medium tracking-wide">
                The Power of Re-Use & Education for All
              </p>
            </div>
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
                      ? 'bg-blue-50 text-blue-800 font-bold' 
                      : 'text-slate-600 hover:text-blue-700 hover:bg-slate-50'
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
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition shadow-sm"
            >
              <UserPlus className="w-4 h-4 text-blue-700" />
              <span>Join as Volunteer/Intern</span>
            </button>

            <button
              onClick={onOpenDonate}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 transition shadow-md shadow-amber-500/20 active:scale-95"
            >
              <Heart className="w-4 h-4 text-white fill-white animate-pulse" />
              <span>Donate (80G Tax)</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenDonate}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-amber-600 shadow-sm"
            >
              Donate
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
                    ? 'bg-blue-50 text-blue-800 font-bold'
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
              className="w-full py-2.5 rounded-xl text-sm font-bold text-center text-blue-900 bg-blue-50 border border-blue-200"
            >
              Join as Volunteer / Intern / Member
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

