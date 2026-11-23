import { LOGO_PNG_BASE64, SIGNATURE_PNG_BASE64, KOMAL_PHOTO_BASE64 } from '../data/assetsBase64';
import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Download, 
  UserCheck, 
  RotateCw, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  CheckCircle, 
  Sparkles,
  Shield
} from 'lucide-react';
import { downloadIdCardPdf } from '../utils/pdfGenerator';
import { NGO_INFO, INITIAL_MEMBERS } from '../data/ngoData';

export default function IdCardGenerator({ initialMember = null }) {
  const defaultMember = initialMember || INITIAL_MEMBERS[0];

  const [member, setMember] = useState({
    id: defaultMember.id || 'M1122PWS001',
    fullName: defaultMember.fullName || 'KOMAL TIWARI',
    role: defaultMember.role || 'Member',
    email: defaultMember.email || 'itc.singha@gmail.com',
    phone: defaultMember.phone || '+91 8081821480',
    location: defaultMember.location || 'ALL India',
    validTill: defaultMember.validTill || '31 March 2028',
    photoUrl: defaultMember.photoUrl || KOMAL_PHOTO_BASE64
  });

  const [activeSide, setActiveSide] = useState('front'); // 'front' or 'back'

  // Pre-load member presets
  const handleSelectPreset = (selectedId) => {
    const found = INITIAL_MEMBERS.find(m => m.id === selectedId);
    if (found) {
      setMember({
        id: found.id,
        fullName: found.fullName,
        role: found.role,
        email: found.email,
        phone: found.phone,
        location: found.location || 'ALL India',
        validTill: found.validTill || '31 March 2028',
        photoUrl: found.photoUrl || KOMAL_PHOTO_BASE64
      });
    }
  };

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    downloadIdCardPdf(member);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-bold uppercase tracking-wider mb-3">
          <CreditCard className="w-4 h-4 text-red-700" />
          <span>Official Pehchaan Welfare Society ID System</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Official NGO Identity Card Generator
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Official vertical badge format with authentic red &amp; yellow geometric theme, verified signature, and double-sided ID printing.
        </p>

        {/* Quick Official Presets */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <span className="text-xs font-bold text-slate-500 self-center mr-1">Load Authentic Profiles:</span>
          {INITIAL_MEMBERS.map((m) => (
            <button
              key={m.id}
              onClick={() => handleSelectPreset(m.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                member.id === m.id
                  ? 'bg-red-600 text-white border-red-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{m.fullName}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded ${member.id === m.id ? 'bg-red-800 text-red-100' : 'bg-slate-100 text-slate-600'}`}>
                {m.role}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Customizer (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-red-600" />
              <span>Card Information</span>
            </h3>
            <span className="text-xs font-mono font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded">
              {member.id}
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Full Name (as printed on ID)
            </label>
            <input
              type="text"
              name="fullName"
              value={member.fullName}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm font-semibold uppercase focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Role / Designation
              </label>
              <input
                type="text"
                name="role"
                value={member.role}
                onChange={handleChange}
                placeholder="e.g. Member, Volunteer"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                ID Number
              </label>
              <input
                type="text"
                name="id"
                value={member.id}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Email
              </label>
              <input
                type="text"
                name="email"
                value={member.email}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={member.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={member.location}
                onChange={handleChange}
                placeholder="e.g. ALL India"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Valid Till
              </label>
              <input
                type="text"
                name="validTill"
                value={member.validTill}
                onChange={handleChange}
                placeholder="e.g. 31 March 2028"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Photo URL / Image Path
            </label>
            <input
              type="text"
              name="photoUrl"
              value={member.photoUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div className="pt-2 text-center">
            <div className="w-full py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center gap-2">
              <Shield className="w-4 h-4 text-red-600" />
              <span>Official Pehchaan NGO Verified Identity Badge</span>
            </div>
          </div>
        </div>

        {/* Right Live Preview: ID Card (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col items-center">
          
          {/* Side Toggle Control */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Badge Preview:
            </span>
            <div className="inline-flex rounded-xl p-1 bg-slate-200/80">
              <button
                onClick={() => setActiveSide('front')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeSide === 'front'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Front Side
              </button>
              <button
                onClick={() => setActiveSide('back')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition ${
                  activeSide === 'back'
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Back Side (Terms)
              </button>
            </div>
            <button
              onClick={() => setActiveSide(activeSide === 'front' ? 'back' : 'front')}
              title="Flip Card"
              className="p-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 transition shadow-sm"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* PHYSICAL ID BADGE CONTAINER (Matches Authentic PDF Dimensions & Visuals) */}
          <div className="w-[330px] h-[550px] rounded-[24px] bg-white shadow-2xl border-4 border-slate-300/80 overflow-hidden relative select-none">
            
            {/* Lanyard punch slot */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-2.5 bg-slate-300 rounded-full border border-slate-400 z-30 shadow-inner"></div>

            {/* FRONT SIDE VIEW */}
            {activeSide === 'front' && (
              <div 
                className="w-full h-full relative overflow-hidden flex flex-col justify-between"
                style={{
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'linear-gradient(rgba(226, 232, 240, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 232, 240, 0.5) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              >
                {/* Diagonal Yellow Top Geometric Band */}
                <div 
                  className="absolute top-0 right-0 w-[240px] h-[190px] pointer-events-none z-10"
                  style={{
                    background: '#FFB800',
                    clipPath: 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)'
                  }}
                ></div>

                {/* Right Edge Solid Red Banner with Vertical Text */}
                <div className="absolute top-0 right-0 w-[78px] h-full bg-[#E52520] z-20 flex flex-col items-center justify-center shadow-lg">
                  <div 
                    className="text-white font-black text-xl sm:text-2xl tracking-[0.28em] uppercase font-sans whitespace-nowrap"
                    style={{
                      writingMode: 'vertical-rl',
                      textOrientation: 'upright',
                      letterSpacing: '0.22em'
                    }}
                  >
                    PEHCHAAN NGO
                  </div>
                </div>

                {/* Top-Left Geometric Red/Yellow Square Mosaic */}
                <div className="absolute top-2 left-3 z-10">
                  <div className="w-5 h-5 bg-[#FFB800] rounded-sm"></div>
                  <div className="w-5 h-5 bg-[#E52520] -mt-1 ml-4 rounded-sm"></div>
                </div>

                {/* Main Content Area (Restricted by right red banner) */}
                <div className="relative z-20 pt-6 pr-[84px] pl-4 flex flex-col items-center">
                  
                  {/* Official Logo */}
                  <div className="w-full flex justify-center mt-3 mb-2 px-2">
                    <img 
                      src={LOGO_PNG_BASE64} 
                      alt="Pehchaan Welfare Society NGO" 
                      className="h-10 object-contain drop-shadow-sm"
                    />
                  </div>

                  {/* Circular Member Photo with Red Ring */}
                  <div className="mt-2 relative">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-[4.5px] border-[#E52520] shadow-md bg-white">
                      <img 
                        src={member.photoUrl} 
                        alt={member.fullName}
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
                        }}
                      />
                    </div>
                  </div>

                  {/* Member Name in BOLD RED UPPERCASE */}
                  <div className="text-center mt-3 px-1">
                    <h2 className="text-xl font-black text-[#E52520] tracking-tight uppercase leading-tight font-sans">
                      {member.fullName}
                    </h2>
                    <p className="text-sm font-bold text-[#E52520] mt-0.5 font-sans">
                      {member.role}
                    </p>
                  </div>

                  {/* Card Key-Value Details */}
                  <div className="w-full mt-4 px-2 space-y-1.5 text-xs font-sans">
                    <div className="flex items-center text-[11px] leading-tight">
                      <span className="font-extrabold text-black w-16 shrink-0">ID No</span>
                      <span className="font-bold text-black mr-2">:</span>
                      <span className="font-semibold text-slate-900">{member.id}</span>
                    </div>

                    <div className="flex items-center text-[11px] leading-tight">
                      <span className="font-extrabold text-black w-16 shrink-0">Email</span>
                      <span className="font-bold text-black mr-2">:</span>
                      <span className="font-semibold text-slate-900 truncate max-w-[150px]" title={member.email}>
                        {member.email || 'N/A'}
                      </span>
                    </div>

                    <div className="flex items-center text-[11px] leading-tight">
                      <span className="font-extrabold text-black w-16 shrink-0">Phone</span>
                      <span className="font-bold text-black mr-2">:</span>
                      <span className="font-semibold text-slate-900">{member.phone}</span>
                    </div>

                    <div className="flex items-center text-[11px] leading-tight">
                      <span className="font-extrabold text-black w-16 shrink-0">Location</span>
                      <span className="font-bold text-black mr-2">:</span>
                      <span className="font-semibold text-slate-900">{member.location}</span>
                    </div>

                    <div className="flex items-center text-[11px] leading-tight">
                      <span className="font-extrabold text-black w-16 shrink-0">Valid</span>
                      <span className="font-bold text-black mr-2">:</span>
                      <span className="font-semibold text-slate-900">{member.validTill}</span>
                    </div>
                  </div>

                </div>

                {/* Bottom-Left Geometric Red/Yellow Square Mosaic */}
                <div className="relative z-20 pb-3 pl-3">
                  <div className="w-4 h-4 bg-[#FFB800] rounded-sm"></div>
                  <div className="w-4 h-4 bg-[#E52520] -mt-2 ml-3 rounded-sm"></div>
                </div>

              </div>
            )}

            {/* BACK SIDE VIEW: TERMS & CONDITIONS */}
            {activeSide === 'back' && (
              <div 
                className="w-full h-full relative overflow-hidden flex flex-col justify-between p-4"
                style={{
                  backgroundColor: '#FFFFFF',
                  backgroundImage: 'linear-gradient(rgba(226, 232, 240, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(226, 232, 240, 0.5) 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              >
                {/* Left Edge Solid Red Stripe */}
                <div className="absolute top-0 left-0 w-[42px] h-full bg-[#E52520] z-20 shadow-md"></div>

                {/* Diagonal Yellow Swath across Top */}
                <div 
                  className="absolute top-0 left-0 w-[240px] h-[190px] pointer-events-none z-10"
                  style={{
                    background: '#FFB800',
                    clipPath: 'polygon(0 0, 100% 0, 10% 100%, 0 100%)'
                  }}
                ></div>

                {/* Top-Right Decorative Squares */}
                <div className="absolute top-2 right-4 z-20">
                  <div className="w-5 h-5 bg-[#E52520] rounded-sm"></div>
                  <div className="w-5 h-5 bg-[#FFB800] -mt-1 -ml-3 rounded-sm"></div>
                </div>

                {/* Terms & Conditions Content */}
                <div className="relative z-30 pl-10 pr-2 pt-16 space-y-2.5 text-slate-900 font-sans">
                  
                  <h3 className="text-base font-black text-black tracking-tight uppercase mb-2">
                    TERMS &amp; CONDITIONS
                  </h3>

                  <div className="text-[10px] leading-tight space-y-2 text-slate-900">
                    <p>
                      <strong className="font-extrabold text-black">Identification:</strong> The card holder must keep this ID card visible or present it when required for identification..
                    </p>
                    <p>
                      <strong className="font-extrabold text-black">Proper Use:</strong> This ID card is issued only for official work and must not be shared, copied, or misused.
                    </p>
                    <p>
                      <strong className="font-extrabold text-black">Security:</strong> If this card is lost or stolen, it must be reported to the organization immediately.
                    </p>
                    <p>
                      <strong className="font-extrabold text-black">Note:</strong> The organization reserves the right to cancel this ID card at any time.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/80 text-[11px] font-sans space-y-0.5">
                    <p>
                      <strong className="font-extrabold text-black">ID Number: :</strong> <span className="font-mono font-bold text-black">{member.id}</span>
                    </p>
                    <p>
                      <strong className="font-extrabold text-black">ID Valid: :</strong> <span className="font-bold text-black">{member.validTill}</span>
                    </p>
                  </div>

                  {/* Authorized By & Signature Block */}
                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex flex-col">
                      <img 
                        src={SIGNATURE_PNG_BASE64} 
                        alt="Signature" 
                        className="h-10 w-24 object-contain -mb-1"
                      />
                      <span className="text-[10px] font-bold text-black">Authorized By:</span>
                      <span className="text-[11px] font-extrabold text-black">Pehchaan NGO</span>
                    </div>

                    {/* Bottom-Right Pixel Mosaic */}
                    <div className="self-end pb-1 pr-1">
                      <div className="w-5 h-5 bg-[#FFB800] rounded-sm"></div>
                      <div className="w-5 h-5 bg-[#E52520] -mt-2 -ml-3 rounded-sm"></div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>



        </div>

      </div>

    </div>
  );
}
