import React, { useState } from 'react';
import { ShieldCheck, Lock, KeyRound, AlertCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { NGO_INFO } from '../data/ngoData';
import { LOGO_PNG_BASE64 } from '../data/assetsBase64';

export default function AdminLoginGate({ onAuthenticated, onCancel }) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [showHint, setShowHint] = useState(true);

  // Accepted passwords: supports environment variable, custom PIN from localStorage, or predefined default PINs
  const envPasscode = import.meta.env.VITE_ADMIN_PASSCODE;
  const customPin = typeof window !== 'undefined' ? localStorage.getItem('pehchaan_admin_pin') : null;
  const VALID_PASSCODES = [
    envPasscode,
    customPin,
    'admin',
    'admin123',
    'pehchaan1860',
    'pehchaan2024',
    '1234'
  ].filter(Boolean).map(p => String(p).trim().toLowerCase());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (VALID_PASSCODES.includes(passcode.trim().toLowerCase())) {
      sessionStorage.setItem('pehchaan_admin_auth', 'true');
      setError('');
      onAuthenticated();
    } else {
      setError('Incorrect Administrator PIN. Access denied.');
    }
  };

  const handleQuickDemoAccess = () => {
    sessionStorage.setItem('pehchaan_admin_auth', 'true');
    onAuthenticated();
  };

  return (
    <div className="max-w-xl mx-auto py-16 px-4 sm:px-6">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-950 via-red-950 to-slate-900 p-8 text-white text-center relative">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-red-600/30 border border-red-500/40 flex items-center justify-center text-red-400 mb-3 shadow-inner">
            <Lock className="w-7 h-7 text-amber-400" />
          </div>

          <div className="flex justify-center mb-2">
            <img 
              src={LOGO_PNG_BASE64} 
              alt="Pehchaan Welfare Society" 
              className="h-10 object-contain brightness-0 invert" 
            />
          </div>

          <h2 className="text-2xl font-black font-heading tracking-tight mt-1">
            Administrator Security Portal
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
            Restricted access for Pehchaan Welfare Society authorized personnel only (ID Badge Creation, Certificates &amp; Donor Audits).
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          
          {error && (
            <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Enter Administrator Passcode / PIN
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <KeyRound className="w-4 h-4" />
              </span>
              <input
                type="password"
                required
                autoFocus
                placeholder="Enter PIN (e.g. admin123)"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setError('');
                }}
                className="w-full pl-10 pr-4 py-3 rounded-2xl border border-slate-200 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-700 hover:to-rose-800 text-white font-extrabold text-sm shadow-lg shadow-red-600/25 transition active:scale-98 flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verify &amp; Unlock Admin Console</span>
            </button>

            <button
              type="button"
              onClick={handleQuickDemoAccess}
              className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Click for 1-Click Authorized Demo Access (PIN: admin123)</span>
            </button>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-1 hover:text-slate-900 transition font-semibold"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Website</span>
            </button>
            <span>Authorized: Dr. Neelesh Singh</span>
          </div>

        </form>

      </div>
    </div>
  );
}
