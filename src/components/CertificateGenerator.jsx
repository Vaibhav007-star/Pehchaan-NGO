import React, { useState, useEffect } from 'react';
import { 
  Award, 
  Download, 
  Printer, 
  QrCode, 
  ShieldCheck, 
  Sparkles, 
  UserCheck, 
  CheckCircle2 
} from 'lucide-react';
import { downloadCertificatePdf, generateQrCode } from '../utils/pdfGenerator';
import { NGO_INFO } from '../data/ngoData';

export default function CertificateGenerator({ initialMember = null }) {
  const [member, setMember] = useState(
    initialMember || {
      fullName: 'Ananya Sharma',
      role: 'Intern',
      college: 'Delhi School of Social Work (MSW)',
      center: 'Ghaziabad Sector 12 Center',
      certificateId: 'CERT-2024-I882',
      certificateDate: new Date().toISOString().split('T')[0],
      joinedDate: '2024-05-10',
      status: 'Active'
    }
  );

  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  useEffect(() => {
    async function loadQr() {
      const qr = await generateQrCode(`https://pehchaan-ngo.org/verify?id=${member.certificateId || member.id}`);
      setQrCodeUrl(qr);
    }
    loadQr();
  }, [member.certificateId, member.id]);

  const handleChange = (e) => {
    setMember({ ...member, [e.target.name]: e.target.value });
  };

  const handleDownload = () => {
    downloadCertificatePdf(member);
  };

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Automated Credential Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Generate Certificate (Member, Intern & Volunteer)
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Authorized by MSW (Master in Social Work) faculty & issued under the Societies Registration Act. 
          Includes dynamic QR verification and digital signature.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form: Customizer (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-blue-900" />
            <span>Customize Certificate</span>
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Recipient Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={member.fullName}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Designation / Role
            </label>
            <select
              name="role"
              value={member.role}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Intern">Intern (Social Internship / MSW)</option>
              <option value="Volunteer">Volunteer (Grassroots & Education)</option>
              <option value="Member">Member (Core Community Member)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              College / Institution
            </label>
            <input
              type="text"
              name="college"
              value={member.college || ''}
              onChange={handleChange}
              placeholder="e.g. University of Delhi"
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">
              Operational Center
            </label>
            <select
              name="center"
              value={member.center || 'Ghaziabad Sector 12 Center'}
              onChange={handleChange}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Ghaziabad Sector 12 Center">Ghaziabad (Sector 12 Pratap Vihar HQ)</option>
              <option value="Noida Sector 22 Center">Noida (Sector 22 Aditi / Pawan Center)</option>
              <option value="Mahewa Etawah CHC">Mahewa Etawah (Ankur Malnutrition Camp)</option>
              <option value="Pratap Vihar Re-Use Center">Pratap Vihar (Charan Singh Colony Re-Use)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Certificate ID
              </label>
              <input
                type="text"
                name="certificateId"
                value={member.certificateId}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">
                Issue Date
              </label>
              <input
                type="date"
                name="certificateDate"
                value={member.certificateDate}
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
              <span>Download High-Resolution PDF</span>
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">
              Ready for academic submission, job verification & LinkedIn credentialing.
            </p>
          </div>
        </div>

        {/* Right Live Preview: Certificate (8 Cols) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Live Certificate Layout Preview
            </span>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 text-xs text-blue-900 font-bold hover:underline"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Direct PDF Export</span>
            </button>
          </div>

          {/* Realistic Certificate Container */}
          <div className="bg-amber-50/40 p-6 sm:p-10 rounded-3xl border-8 border-double border-blue-900 shadow-xl relative overflow-hidden text-center space-y-4">
            
            {/* Top Crest & NGO Title */}
            <div>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-xs font-bold tracking-widest text-amber-700 uppercase">
                  Govt. Registered NGO | Act XXI of 1860
                </span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-blue-950 font-heading tracking-tight">
                PEHCHAAN NGO
              </h2>
              <p className="text-xs text-slate-600 font-serif italic mt-0.5">
                The Power of Re-Use & Education for All | NITI Aayog: {NGO_INFO.nitiAayogDarpanId}
              </p>
            </div>

            {/* Certificate Ribbon */}
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 text-white text-xs sm:text-sm font-extrabold tracking-wider uppercase rounded-md shadow-sm">
              {member.role === 'Intern' ? 'CERTIFICATE OF INTERNSHIP' : (member.role === 'Volunteer' ? 'CERTIFICATE OF APPRECIATION' : 'MEMBERSHIP CREDENTIAL')}
            </div>

            {/* Recipient presentation */}
            <div className="pt-2">
              <p className="text-xs sm:text-sm text-slate-600 font-serif italic">
                This certificate is proudly and honorably awarded to
              </p>
              <h3 className="text-2xl sm:text-4xl font-black text-amber-600 font-serif-classic tracking-wide my-2 uppercase">
                {member.fullName}
              </h3>
              <div className="w-32 h-0.5 bg-amber-500 mx-auto mb-4"></div>
            </div>

            {/* Citation paragraph */}
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto px-2">
              for their outstanding commitment, active participation, and meritorious contribution as an official{' '}
              <strong className="text-blue-950">{member.role}</strong> at our{' '}
              <strong>{member.center}</strong>. During their tenure, they demonstrated exemplary leadership in street education under Gyan Jyoti and child welfare programs.
            </p>

            {/* Bottom Row: QR Code, Gold Seal, Signature */}
            <div className="pt-6 mt-6 border-t border-slate-200/80 flex flex-wrap items-center justify-between gap-4 text-left">
              
              {/* QR Verification block */}
              <div className="flex items-center gap-2.5">
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="QR Code" className="w-14 h-14 rounded-lg border border-slate-200 shadow-xs" />
                ) : (
                  <div className="w-14 h-14 bg-slate-200 rounded-lg flex items-center justify-center">
                    <QrCode className="w-8 h-8 text-slate-500" />
                  </div>
                )}
                <div>
                  <span className="text-[10px] font-bold text-slate-700 block uppercase">Official QR Verify</span>
                  <span className="text-[10px] font-mono font-bold text-blue-900 block">{member.certificateId}</span>
                  <span className="text-[9px] text-emerald-800 font-medium">Valid & Authenticated</span>
                </div>
              </div>

              {/* Gold Seal Graphic */}
              <div className="w-16 h-16 rounded-full border-2 border-dashed border-amber-500 flex flex-col items-center justify-center text-amber-700 text-[8px] font-bold text-center p-1 bg-amber-50">
                <span>PEHCHAAN</span>
                <span className="text-[10px]">★</span>
                <span>SEAL</span>
              </div>

              {/* Founder Sign */}
              <div className="text-right">
                <p className="font-serif italic text-base text-blue-950 font-bold">
                  Dr. Neelesh Singh
                </p>
                <div className="w-24 h-0.5 bg-slate-400 ml-auto my-0.5"></div>
                <p className="text-[11px] font-bold text-slate-800">Dr. Neelesh Singh</p>
                <p className="text-[9px] text-slate-500">Founder & General Secretary</p>
                <p className="text-[9px] text-slate-400">Date: {member.certificateDate}</p>
              </div>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

