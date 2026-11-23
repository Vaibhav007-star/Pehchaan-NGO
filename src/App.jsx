import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Projects from './pages/Projects';
import DonationGateway from './components/DonationGateway';
import VerificationPortal from './components/VerificationPortal';
import AdminDashboard from './components/AdminDashboard';
import AdminLoginGate from './components/AdminLoginGate';
import RegistrationModal from './components/RegistrationModal';
import { initStorage } from './utils/storage';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('pehchaan_admin_auth') === 'true';
    }
    return false;
  });

  useEffect(() => {
    initStorage();
  }, []);

  const handleOpenRegister = () => setIsRegisterOpen(true);
  const handleOpenDonate = () => {
    setActiveTab('campaigns');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAdminLogout = () => {
    sessionStorage.removeItem('pehchaan_admin_auth');
    setIsAdminAuthenticated(false);
    setActiveTab('home');
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

        {(activeTab === 'admin' || activeTab === 'certificates' || activeTab === 'idcards') && (
          isAdminAuthenticated ? (
            <AdminDashboard 
              onOpenRegister={handleOpenRegister}
              onLogout={handleAdminLogout}
              initialTab={activeTab === 'idcards' ? 'idcards' : (activeTab === 'certificates' ? 'certificates' : 'members')}
            />
          ) : (
            <AdminLoginGate 
              onAuthenticated={() => {
                setIsAdminAuthenticated(true);
                sessionStorage.setItem('pehchaan_admin_auth', 'true');
              }}
              onCancel={() => setActiveTab('home')}
            />
          )
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

