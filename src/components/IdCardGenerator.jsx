import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Download, 
  QrCode, 
  ShieldCheck, 
  UserCheck, 
  Calendar, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { downloadIdCardPdf, generateQrCode } from '../utils/pdfGenerator';
import { NGO_INFO } from '../data/ngoData';

export default function IdCardGenerator({ initialMember = null }) {
  const [member, setMember] = useState(
    initialMember || {
      id: 'PEH-VOL-2024-001',
      fullName: 'Aarav Sharma',
      role: 'Volunteer',
      center: 'Ghaziabad Sector 12 Center',
      joinedDate: '2024-03-15',
      bloodGroup: 'O+',
      emergencyContact: '+91 9457320905',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    }
  );

  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    async function loadQr() {
      const qr = await generateQrCode(`https://pehchaan-ngo.org/verify?id=${member.id}`);
      setQrCodeUrl(qr);
    }
    loadQr();
  }, [member.id]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    downloadIdCardPdf(member);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
          <CreditCard className="w-4 h-4 text-blue-700" />
          <span>Official Identity Card System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Member, Intern & Volunteer ID Card Generator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Generate tamper-proof physical ID badges with high-density QR verification, center affiliation, and emergency blood group data.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Customizer (6 Cols) */}
        <div className="md:col-span-6 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-900" />
            <span>Badge Details</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={member.fullName}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Role
              </label>
              <select
                name="role"
                value={member.role}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="Volunteer">Volunteer</option>
                <option value="Intern">Intern</option>
                <option value="Member">Member</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                System ID
              </label>
              <input
                type="text"
                name="id"
                value={member.id}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Assigned Center
            </label>
            <select
              name="center"
              value={member.center}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Ghaziabad Sector 12 Center">Ghaziabad (Sector 12 Pratap Vihar HQ)</option>
              <option value="Noida Sector 22 Center">Noida (Sector 22 Center)</option>
              <option value="Charan Singh Colony Re-Use">Charan Singh Colony Re-Use Center</option>
              <option value="Mahewa Etawah CHC">Mahewa Etawah CHC (Ankur Camp)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Blood Group
              </label>
              <select
                name="bloodGroup"
                value={member.bloodGroup || 'O+'}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Joining Date
              </label>
              <input
                type="date"
                name="joinedDate"
                value={member.joinedDate}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleDownload}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4 text-amber-400" />
              <span>Download Official ID Card (PDF)</span>
            </button>
          </div>
        </div>

        {/* Right Live Preview: ID Card (6 Cols) */}
        <div className="md:col-span-6 flex flex-col items-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
            Live CR80 Identity Badge Preview
          </span>

          {/* Physical Badge Layout */}
          <div className="w-[310px] rounded-3xl bg-white shadow-2xl border-4 border-slate-200 overflow-hidden relative text-slate-900">
            
            {/* Lanyard punch hole preview */}
            <div className="w-12 h-3 mx-auto mt-2 bg-slate-300 rounded-full border border-slate-400 shadow-inner"></div>

            {/* Navy Header */}
            <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 text-white p-4 pt-3 text-center border-b-2 border-amber-500 mt-2">
              <div className="flex items-center justify-center gap-1.5">
                <span className="text-xl font-black font-cinzel text-amber-400">प</span>
                <span className="text-base font-extrabold tracking-tight">PEHCHAAN NGO</span>
              </div>
              <p className="text-[9px] text-blue-200 uppercase tracking-widest font-semibold">
                The Power of Re-Use & Education
              </p>
              <p className="text-[8px] text-slate-400 mt-0.5">
                Reg: {NGO_INFO.registrationNumber.split(' ')[0]} | NITI: {NGO_INFO.nitiAayogDarpanId}
              </p>
            </div>

            {/* Member Photo */}
            <div className="pt-4 flex flex-col items-center">
              <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-amber-500 shadow-md bg-slate-100">
                <img 
                  src={member.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"} 
                  alt={member.fullName}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name & Role Pill */}
              <h3 className="text-lg font-extrabold text-blue-950 mt-2 font-heading text-center px-2">
                {member.fullName}
              </h3>

              <div className="inline-block px-3 py-0.5 mt-1 rounded-full text-xs font-extrabold uppercase bg-amber-100 text-amber-900 border border-amber-200">
                {member.role}
              </div>
            </div>

            {/* Card Metadata Grid */}
            <div className="p-4 pt-3 space-y-2 text-xs">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100 space-y-1.5 font-sans">
                <div className="flex justify-between">
                  <span className="text-slate-600 font-semibold">ID Number:</span>
                  <span className="font-mono font-bold text-blue-900">{member.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-semibold">Center:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-[170px]">{member.center}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-semibold">Joined:</span>
                  <span className="font-semibold text-slate-800">{member.joinedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 font-semibold">Blood Group:</span>
                  <span className="font-bold text-rose-600">{member.bloodGroup || 'O+'}</span>
                </div>
              </div>

              {/* Bottom QR and signature */}
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  {qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="QR Code" className="w-12 h-12" />
                  ) : (
                    <div className="w-12 h-12 bg-slate-200 rounded"></div>
                  )}
                  <span className="text-[8px] text-slate-600 font-semibold leading-tight">
                    Scan for Live<br/>Credential Check
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-serif italic text-xs font-bold text-blue-950 block">Dr. Neelesh Singh</span>
                  <span className="text-[8px] text-slate-600 block font-semibold">Founder & Secretary</span>
                </div>
              </div>
            </div>

            {/* Bottom Navy Bar */}
            <div className="bg-slate-900 text-slate-300 py-1.5 text-center text-[8px] border-t border-slate-800">
              Helpline: {NGO_INFO.phone} | pehchaanngo.org
            </div>

          </div>

          <button
            onClick={handleDownload}
            className="mt-4 inline-flex items-center gap-1.5 text-xs text-blue-900 font-bold hover:underline"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download CR80 Badge Format (PDF)</span>
          </button>
        </div>

      </div>

    </div>
  );
}

