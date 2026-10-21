import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Sparkles, 
  Building, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  UploadCloud, 
  CheckCircle2, 
  CreditCard 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerMember } from '../utils/storage';
import { downloadIdCardPdf } from '../utils/pdfGenerator';

export default function RegistrationModal({ isOpen, onClose, onRegisteredSuccess }) {
  const [role, setRole] = useState('Volunteer');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    college: '',
    center: 'Ghaziabad Sector 12 Center',
    bloodGroup: 'O+',
    skills: '',
    emergencyContact: '',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
  });

  const [registeredMember, setRegisteredMember] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newMember = registerMember({
        ...formData,
        role: role
      });

      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      setRegisteredMember(newMember);
      setIsSubmitting(false);

      if (onRegisteredSuccess) {
        onRegisteredSuccess(newMember);
      }
    }, 600);
  };

  const handleReset = () => {
    setRegisteredMember(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      college: '',
      center: 'Ghaziabad Sector 12 Center',
      bloodGroup: 'O+',
      skills: '',
      emergencyContact: '',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80'
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-8">
        
        {/* Header gradient bar */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 p-6 text-white relative">
          <button 
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="p-3 bg-amber-500/20 rounded-2xl border border-amber-400/30">
              <UserCheck className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                Pehchaan NGO Official Portal
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading">
                {registeredMember ? 'Registration Confirmed!' : 'Member, Volunteer & Intern Onboarding'}
              </h2>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {registeredMember ? (
            /* Success confirmation card */
            <div className="text-center py-4 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border-4 border-emerald-100 shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-800 font-heading">
                  Welcome to Pehchaan NGO, {registeredMember.fullName}!
                </h3>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your registration as an official <strong>{registeredMember.role}</strong> has been logged in our central database.
                </p>
              </div>

              {/* ID Badge summary card */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-slate-600 font-semibold uppercase">Assigned System ID</span>
                    <p className="text-lg font-mono font-bold text-blue-900 tracking-wider">
                      {registeredMember.id}
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                    {registeredMember.role}
                  </span>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-600 font-semibold">Center:</span>
                    <p className="font-semibold text-slate-800">{registeredMember.center}</p>
                  </div>
                  <div>
                    <span className="text-slate-600 font-semibold">Joined Date:</span>
                    <p className="font-semibold text-slate-800">{registeredMember.joinedDate}</p>
                  </div>
                </div>

                <div className="mt-3 text-[11px] text-emerald-800 bg-emerald-50 p-2.5 rounded-lg flex items-center gap-2">
                  <Sparkles className="w-4 h-4 shrink-0 text-emerald-600" />
                  <span>Confirmation email dispatched to <strong>{registeredMember.email}</strong>. Valid for university service-learning / MSW credit.</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap justify-center gap-3 pt-2">
                <button
                  onClick={() => downloadIdCardPdf(registeredMember)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-900 text-white font-bold text-sm shadow hover:bg-blue-800 transition"
                >
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <span>Download ID Badge (PDF)</span>
                </button>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition"
                >
                  Close & Explore Website
                </button>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Role selector tabs */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Your Intended Role
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['Volunteer', 'Intern', 'Member'].map((r) => (
                    <button
                      type="button"
                      key={r}
                      onClick={() => setRole(r)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition ${
                        role === r
                          ? 'bg-blue-900 text-white border-blue-900 shadow-md'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {r === 'Volunteer' && '🤝 '}
                      {r === 'Intern' && '🎓 '}
                      {r === 'Member' && '⭐ '}
                      {r}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-1.5">
                  {role === 'Volunteer' && 'Flexible teaching & weekend cloth drives. Certificate of Appreciation issued.'}
                  {role === 'Intern' && 'Structured 4-12 week college social internship with MSW authorized recommendation.'}
                  {role === 'Member' && 'Core organizational participation, community camps & project governance.'}
                </p>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Priyanshu Sharma"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9876543210"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {role === 'Intern' ? 'College / University *' : 'Occupation / College'}
                  </label>
                  <input
                    type="text"
                    name="college"
                    required={role === 'Intern'}
                    value={formData.college}
                    onChange={handleChange}
                    placeholder={role === 'Intern' ? 'e.g. Amity / DU / IPU' : 'e.g. Working Professional / Student'}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Assigned Center / Branch
                  </label>
                  <select
                    name="center"
                    value={formData.center}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-white"
                  >
                    <option value="Ghaziabad Sector 12 Center">Ghaziabad (Sector 12 Pratap Vihar HQ)</option>
                    <option value="Noida Sector 22 Center">Noida (Sector 22 Aditi / Pawan Center)</option>
                    <option value="Charan Singh Colony Center">Pratap Vihar (Charan Singh Colony Re-Use)</option>
                    <option value="Mahewa Etawah CHC">Mahewa Etawah (Ankur Pediatric Camp)</option>
                    <option value="Online / Remote Content & Tech">Online / Remote (Media, Tech & Service-Learning)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Blood Group (For Emergency ID)
                  </label>
                  <select
                    name="bloodGroup"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm bg-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Skills, Teaching Subjects or Areas of Interest
                </label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g. English, Primary Math, Health Camps, Photography, Web Design"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Emergency Contact Number
                </label>
                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="+91 Guardian / Alternate phone"
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-950 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-900/20 active:scale-[0.99] transition flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <span>Registering with Central NGO System...</span>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 text-amber-400" />
                      <span>Complete Dynamic Registration</span>
                    </>
                  )}
                </button>
                <p className="text-center text-[11px] text-slate-500 mt-2">
                  By registering, you agree to uphold the ethics and humanitarian goals of Pehchaan NGO.
                </p>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
}

