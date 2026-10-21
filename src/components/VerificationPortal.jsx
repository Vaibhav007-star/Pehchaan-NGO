import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ShieldCheck, 
  UserCheck, 
  Award, 
  CreditCard, 
  Download, 
  CheckCircle, 
  AlertCircle, 
  Calendar, 
  Building, 
  QrCode,
  Share2,
  ExternalLink
} from 'lucide-react';
import { verifyCredential, getMembers } from '../utils/storage';
import { downloadCertificatePdf, downloadIdCardPdf, generateQrCode } from '../utils/pdfGenerator';
import { NGO_INFO } from '../data/ngoData';

export default function VerificationPortal({ initialQuery = '' }) {
  const [searchQuery, setSearchQuery] = useState(initialQuery || '');
  const [result, setResult] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  // Check on load if initialQuery exists or auto-verify first member for quick preview
  useEffect(() => {
    if (initialQuery) {
      handleVerify(initialQuery);
    }
  }, [initialQuery]);

  const handleVerify = async (queryToSearch) => {
    const q = queryToSearch || searchQuery;
    if (!q.trim()) return;

    setHasSearched(true);
    const matched = verifyCredential(q);
    setResult(matched);

    if (matched) {
      const qr = await generateQrCode(`https://pehchaan-ngo.org/verify?id=${matched.id}`);
      setQrCodeUrl(qr);
    }
  };

  const handleQuickDemo = (demoId) => {
    setSearchQuery(demoId);
    handleVerify(demoId);
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Central Credential Verification Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading">
          Verify Member, Intern & Volunteer Credentials
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Verify authentic certificates, digital ID cards, and official service records issued by Pehchaan NGO for employers, universities, and background checks.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="max-w-2xl mx-auto bg-white rounded-3xl p-4 sm:p-6 shadow-md border border-slate-200 mb-8">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            handleVerify(searchQuery);
          }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Enter Member ID (e.g. PEH-VOL-2024-001) or Certificate ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 uppercase font-mono"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow transition flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Verify Now</span>
          </button>
        </form>

        {/* Demo ID Pills for Easy Evaluation */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Try Sample Verified IDs:</span>
          <button
            onClick={() => handleQuickDemo('PEH-VOL-2024-001')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-900 font-mono font-semibold border border-slate-200 transition"
          >
            PEH-VOL-2024-001 (Volunteer)
          </button>
          <button
            onClick={() => handleQuickDemo('PEH-INT-2024-114')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-blue-900 font-mono font-semibold border border-slate-200 transition"
          >
            PEH-INT-2024-114 (DU Intern)
          </button>
          <button
            onClick={() => handleQuickDemo('CERT-2024-V089')}
            className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 text-amber-900 font-mono font-semibold border border-slate-200 transition"
          >
            CERT-2024-V089 (Certificate)
          </button>
        </div>
      </div>

      {/* VERIFICATION RESULTS CONTAINER */}
      {hasSearched && (
        <div className="max-w-3xl mx-auto">
          {result ? (
            /* VERIFIED SUCCESS CARD */
            <div className="bg-white rounded-3xl border-2 border-emerald-500/40 shadow-xl overflow-hidden animate-in fade-in duration-300">
              
              {/* Top Verified Ribbon */}
              <div className="bg-emerald-600 text-white px-6 py-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 fill-white text-emerald-600" />
                  <span className="font-extrabold text-sm tracking-wide uppercase">
                    Authentic Verified Record in Pehchaan NGO Registry
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold bg-emerald-700 px-2.5 py-0.5 rounded-full">
                  Status: {result.status || 'Active'}
                </span>
              </div>

              {/* Main Candidate Card */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  
                  {/* Photo & QR */}
                  <div className="flex flex-col items-center gap-3 shrink-0 mx-auto sm:mx-0">
                    <img 
                      src={result.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"} 
                      alt={result.fullName}
                      className="w-28 h-28 rounded-2xl object-cover border-2 border-slate-200 shadow"
                    />
                    {qrCodeUrl && (
                      <div className="p-1.5 bg-slate-50 border border-slate-200 rounded-xl text-center">
                        <img src={qrCodeUrl} alt="QR Code" className="w-16 h-16" />
                        <span className="text-[9px] font-mono text-slate-500 block">Scan to Verify</span>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 space-y-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-2xl font-bold text-slate-900 font-heading">
                          {result.fullName}
                        </h2>
                        <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                          {result.role}
                        </span>
                      </div>
                      <p className="text-xs font-mono text-slate-500 mt-1">
                        Registration ID: <strong className="text-blue-900">{result.id}</strong>
                      </p>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div>
                        <span className="text-slate-600 font-semibold block">Affiliated Center:</span>
                        <span className="font-semibold text-slate-800">{result.center}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 font-semibold block">Joining Date:</span>
                        <span className="font-semibold text-slate-800">{result.joinedDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 font-semibold block">Blood Group:</span>
                        <span className="font-semibold text-slate-800">{result.bloodGroup || 'O+'}</span>
                      </div>
                      <div>
                        <span className="text-slate-600 font-semibold block">Certificate Status:</span>
                        <span className="font-semibold text-emerald-800">
                          {result.certificateIssued ? `Issued (${result.certificateId})` : 'Under Review / Active'}
                        </span>
                      </div>
                      {result.college && (
                        <div className="sm:col-span-2">
                          <span className="text-slate-600 font-semibold block">Institution / Dept:</span>
                          <span className="font-semibold text-slate-800">{result.college}</span>
                        </div>
                      )}
                      {result.skills && (
                        <div className="sm:col-span-2">
                          <span className="text-slate-600 font-semibold block">Contribution Focus:</span>
                          <span className="font-semibold text-slate-800">{result.skills}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions: Download ID Card & Certificate */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <button
                        onClick={() => downloadIdCardPdf(result)}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs shadow hover:bg-blue-800 transition"
                      >
                        <CreditCard className="w-4 h-4 text-amber-400" />
                        <span>Download Official ID Card (PDF)</span>
                      </button>

                      {result.certificateIssued && (
                        <button
                          onClick={() => downloadCertificatePdf(result)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 text-white font-bold text-xs shadow hover:bg-amber-700 transition"
                        >
                          <Award className="w-4 h-4" />
                          <span>Download Digital Certificate (PDF)</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>

                {/* Statutory verification note */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Authorized by MSW & Pehchaan NGO Administration</span>
                  <span>Societies Act Reg: {NGO_INFO.registrationNumber.split(' ')[0]}</span>
                </div>
              </div>

            </div>
          ) : (
            /* NOT FOUND CARD */
            <div className="bg-white rounded-3xl border border-rose-200 p-8 text-center shadow-md space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-rose-50 text-rose-600 flex items-center justify-center">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 font-heading">
                No Record Found in Central Database
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                No active candidate, volunteer, or certificate matches query "<strong>{searchQuery}</strong>". 
                Please verify spelling or check whether your registration is under verification.
              </p>
              <div className="pt-2">
                <a
                  href={`mailto:${NGO_INFO.email}?subject=Verification%20Query%20${encodeURIComponent(searchQuery)}`}
                  className="inline-flex items-center gap-1.5 text-xs text-blue-700 font-semibold hover:underline"
                >
                  Contact Pehchaan NGO Verification Desk: {NGO_INFO.email}
                </a>
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

