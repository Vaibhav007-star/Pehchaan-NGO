import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Heart, 
  Award, 
  CreditCard, 
  Mail, 
  ShieldCheck, 
  Download, 
  Search, 
  CheckCircle2, 
  Filter, 
  ExternalLink,
  PlusCircle,
  FileText,
  TrendingUp,
  Building
} from 'lucide-react';
import { 
  getMembers, 
  getDonations, 
  getSystemEmails, 
  issueCertificate, 
  updateMember 
} from '../utils/storage';
import { 
  downloadCertificatePdf, 
  downloadIdCardPdf, 
  download80GReceiptPdf 
} from '../utils/pdfGenerator';
import { NGO_INFO } from '../data/ngoData';

export default function AdminDashboard({ onOpenRegister }) {
  const [activeTab, setActiveTab] = useState('members'); // 'members', 'donations', 'emails', 'metrics'
  const [members, setMembers] = useState([]);
  const [donations, setDonations] = useState([]);
  const [emails, setEmails] = useState([]);
  const [searchFilter, setSearchFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');

  useEffect(() => {
    refreshData();
  }, []);

  const refreshData = () => {
    setMembers(getMembers());
    setDonations(getDonations());
    setEmails(getSystemEmails());
  };

  const handleIssueCert = (memberId) => {
    const updated = issueCertificate(memberId);
    if (updated) {
      alert(`Certificate successfully issued for ${updated.fullName}! Certificate ID: ${updated.certificateId}`);
      refreshData();
    }
  };

  const handleToggleStatus = (memberId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Verified & Completed' : 'Active';
    updateMember(memberId, { status: newStatus });
    refreshData();
  };

  // Filter members
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.fullName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      m.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (m.college && m.college.toLowerCase().includes(searchFilter.toLowerCase()));
    const matchesRole = roleFilter === 'ALL' || m.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  // Calculate high-level financial and member stats
  const totalDonationsAmount = donations.reduce((sum, d) => sum + (Number(d.amount) || 0), 0);
  const totalVolunteers = members.filter(m => m.role === 'Volunteer').length;
  const totalInterns = members.filter(m => m.role === 'Intern').length;
  const totalMembers = members.filter(m => m.role === 'Member').length;
  const certificatesIssued = members.filter(m => m.certificateIssued).length;

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Pehchaan NGO Administrative Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-heading">
            NGO Operations & Credential Management
          </h1>
          <p className="text-blue-200 text-xs sm:text-sm mt-1">
            Directly manage registrations, generate certificates, issue ID badges, and track 80G tax donations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm transition shadow"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Registration</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Total Enrolled</span>
            <Users className="w-4 h-4 text-blue-800" />
          </div>
          <p className="text-2xl font-black text-slate-900 mt-2 font-heading">
            {members.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {totalVolunteers} Volunteers · {totalInterns} Interns · {totalMembers} Members
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>80G Tax Donations</span>
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700 mt-2 font-heading">
            ₹{totalDonationsAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {donations.length} Verified Razorpay Transactions
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Certificates Issued</span>
            <Award className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-2xl font-black text-amber-700 mt-2 font-heading">
            {certificatesIssued}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            MSW Authorized & QR Verifiable
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold uppercase">
            <span>Auto Emails Dispatched</span>
            <Mail className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-2xl font-black text-indigo-900 mt-2 font-heading">
            {emails.length}
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Welcome Alerts & 80G Receipts
          </p>
        </div>

      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-slate-200 gap-4 text-sm font-bold">
        <button
          onClick={() => setActiveTab('members')}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'members'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Members, Volunteers & Interns ({members.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('donations')}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'donations'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Heart className="w-4 h-4 text-rose-600" />
          <span>Donations & 80G Receipts ({donations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('emails')}
          className={`pb-3 px-1 border-b-2 transition flex items-center gap-2 ${
            activeTab === 'emails'
              ? 'border-blue-900 text-blue-900'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Mail className="w-4 h-4 text-indigo-600" />
          <span>Mail Outbox Logs ({emails.length})</span>
        </button>
      </div>

      {/* TAB CONTENT: MEMBERS */}
      {activeTab === 'members' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm space-y-4 p-6">
          
          {/* Controls bar */}
          <div className="flex flex-col sm:flex-row justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, ID, college or email..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Filter Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white focus:outline-none"
              >
                <option value="ALL">All Roles</option>
                <option value="Volunteer">Volunteers</option>
                <option value="Intern">Interns</option>
                <option value="Member">Members</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Candidate Details</th>
                  <th className="py-3 px-3">Role & ID</th>
                  <th className="py-3 px-3">Center / Institution</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Certificate</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {filteredMembers.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/70 transition">
                    
                    {/* Candidate */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={m.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                          alt={m.fullName}
                          className="w-9 h-9 rounded-xl object-cover border border-slate-200"
                        />
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{m.fullName}</p>
                          <p className="text-[11px] text-slate-500">{m.email} · {m.phone}</p>
                        </div>
                      </div>
                    </td>

                    {/* Role & ID */}
                    <td className="py-3.5 px-3">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        m.role === 'Volunteer' ? 'bg-blue-100 text-blue-800' :
                        m.role === 'Intern' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                      }`}>
                        {m.role}
                      </span>
                      <p className="font-mono text-[11px] text-slate-600 mt-0.5">{m.id}</p>
                    </td>

                    {/* Center / College */}
                    <td className="py-3.5 px-3">
                      <p className="text-slate-800 truncate max-w-[180px]">{m.center}</p>
                      {m.college && <p className="text-[10px] text-slate-400 truncate max-w-[180px]">{m.college}</p>}
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-3">
                      <button
                        onClick={() => handleToggleStatus(m.id, m.status)}
                        className={`text-[10px] font-bold px-2 py-1 rounded-md transition ${
                          m.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}
                        title="Click to toggle status"
                      >
                        ● {m.status || 'Active'}
                      </button>
                    </td>

                    {/* Certificate Status */}
                    <td className="py-3.5 px-3">
                      {m.certificateIssued ? (
                        <div>
                          <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Issued
                          </span>
                          <span className="font-mono text-[9px] text-slate-400">{m.certificateId}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleIssueCert(m.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-[11px] font-bold border border-amber-200 transition"
                        >
                          Issue Certificate
                        </button>
                      )}
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => downloadIdCardPdf(m)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 text-blue-900 transition"
                          title="Download ID Card (PDF)"
                        >
                          <CreditCard className="w-4 h-4" />
                        </button>

                        {m.certificateIssued && (
                          <button
                            onClick={() => downloadCertificatePdf(m)}
                            className="p-1.5 rounded-lg bg-slate-100 hover:bg-amber-100 text-amber-800 transition"
                            title="Download Certificate (PDF)"
                          >
                            <Award className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* TAB CONTENT: DONATIONS & 80G RECEIPTS */}
      {activeTab === 'donations' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">
              Crowdfunding Contributions & 80G Tax Log
            </h3>
            <span className="text-xs text-slate-500 font-semibold">
              Total Raised: <strong className="text-emerald-700 font-mono text-sm">₹{totalDonationsAmount.toLocaleString('en-IN')}</strong>
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Receipt & Date</th>
                  <th className="py-3 px-3">Donor Name</th>
                  <th className="py-3 px-3">PAN Number</th>
                  <th className="py-3 px-3">Campaign</th>
                  <th className="py-3 px-3">Amount (INR)</th>
                  <th className="py-3 px-3">Payment Gateway</th>
                  <th className="py-3 px-4 text-right">80G Receipt PDF</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {donations.map((d) => (
                  <tr key={d.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <p className="font-mono font-bold text-blue-900">{d.receiptNumber}</p>
                      <p className="text-[10px] text-slate-400">{d.date}</p>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="font-bold text-slate-900">{d.donorName}</p>
                      <p className="text-[10px] text-slate-500">{d.donorEmail}</p>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 bg-amber-50 text-amber-800 rounded border border-amber-200">
                        {d.panNumber || 'AWAITED'}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="truncate max-w-[180px] text-slate-800">{d.campaignTitle}</p>
                    </td>

                    <td className="py-3.5 px-3">
                      <span className="font-bold text-emerald-700 font-mono text-sm">
                        ₹{Number(d.amount).toLocaleString('en-IN')}
                      </span>
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="text-[11px] text-slate-600">{d.paymentMethod}</p>
                      <p className="font-mono text-[9px] text-slate-400">{d.transactionId}</p>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => download80GReceiptPdf(d)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-200 transition"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 80G</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB CONTENT: EMAILS LOG */}
      {activeTab === 'emails' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm p-6 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">
              Automated Outbox Email Notifications
            </h3>
            <span className="text-xs text-slate-400">
              Simulated SMTP & Webhook Dispatch Service
            </span>
          </div>

          <div className="space-y-3">
            {emails.length === 0 ? (
              <p className="text-center text-slate-400 text-xs py-6">No email records logged yet.</p>
            ) : (
              emails.map((email) => (
                <div key={email.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-blue-900">{email.subject}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{email.timestamp}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span>To: <strong>{email.to}</strong></span>
                    <span>·</span>
                    <span className="px-1.5 py-0.2 bg-blue-100 text-blue-800 rounded font-semibold text-[10px]">
                      {email.type}
                    </span>
                  </div>
                  <p className="text-slate-600 text-[11px] pt-1">
                    {email.content}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
}

