import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import DonationGateway from './components/DonationGateway';
import VerificationPortal from './components/VerificationPortal';
import CertificateGenerator from './components/CertificateGenerator';
import IdCardGenerator from './components/IdCardGenerator';
import AdminDashboard from './components/AdminDashboard';
import RegistrationModal from './components/RegistrationModal';
import { initStorage } from './utils/storage';
import { 
  Heart, 
  UserPlus, 
  ShieldCheck, 
  Sparkles,
  Award,
  CreditCard
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    initStorage();
  }, []);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleOpenDonate = () => {
    setActiveTab('campaigns');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans">
      
      {/* Main Responsive Navigation Bar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        onOpenRegister={handleOpenRegister}
        onOpenDonate={handleOpenDonate}
      />

      {/* Secondary Fast-Access Tools Bar */}
      <div className="bg-white border-b border-slate-200 py-2.5 px-4 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 shrink-0 text-slate-500">
            <span className="uppercase text-[10px] tracking-wider font-bold">Fast Tools:</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('certificates')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'certificates'
                  ? 'bg-amber-100 text-amber-900 font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Generate Certificate</span>
            </button>

            <button
              onClick={() => setActiveTab('idcards')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'idcards'
                  ? 'bg-blue-100 text-blue-900 font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-blue-700" />
              <span>Generate ID Badge</span>
            </button>

            <button
              onClick={() => setActiveTab('verify')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'verify'
                  ? 'bg-emerald-100 text-emerald-900 font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verify Candidate</span>
            </button>

            <button
              onClick={() => setActiveTab('campaigns')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'campaigns'
                  ? 'bg-rose-100 text-rose-900 font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Heart className="w-3.5 h-3.5 text-rose-600" />
              <span>Donate & 80G Receipt</span>
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-xl transition flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-purple-100 text-purple-900 font-bold'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Dynamic View Controller */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <Home 
            setActiveTab={setActiveTab}
            onOpenRegister={handleOpenRegister}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {activeTab === 'about' && (
          <AboutUs 
            onOpenRegister={handleOpenRegister}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {activeTab === 'projects' && (
          <Projects 
            onOpenRegister={handleOpenRegister}
            onOpenDonate={handleOpenDonate}
          />
        )}

        {activeTab === 'campaigns' && (
          <DonationGateway 
            onClose={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'verify' && (
          <VerificationPortal />
        )}

        {activeTab === 'certificates' && (
          <CertificateGenerator />
        )}

        {activeTab === 'idcards' && (
          <IdCardGenerator />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard 
            onOpenRegister={handleOpenRegister}
          />
        )}
      </main>

      {/* Footer */}
      <Footer 
        setActiveTab={setActiveTab}
        onOpenRegister={handleOpenRegister}
        onOpenDonate={handleOpenDonate}
      />

      {/* Global Modals */}
      <RegistrationModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onRegisteredSuccess={(member) => {
          // Keep modal open on success or redirect
        }}
      />

    </div>
  );
}

