import React, { useState, useEffect } from 'react';
import { Menu, X, HeartHandshake, Bell, Volume2, VolumeX, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { TEMPLE_INFO } from '../data/templeData';
import { TempleEmblem, TempleBellIcon } from './TempleMotifs';
import { templeAudio } from '../utils/audio';

interface HeaderProps {
  currentLang?: Language;
  onLanguageChange?: (lang: Language) => void;
  onToggleLang?: () => void;
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
  onOpenDonate: () => void;
  onOpenAdminRecords?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang = 'en',
  onLanguageChange,
  activeSection = '',
  onNavigate,
  onOpenDonate,
  onOpenAdminRecords,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [bellRinging, setBellRinging] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRingBell = () => {
    setBellRinging(true);
    templeAudio.playTempleBell();
    setTimeout(() => setBellRinging(false), 2500);
  };

  const navItems = [
    { id: 'about', labelEn: 'About Temple', labelTe: 'ఆలయ విశేషాలు' },
    { id: 'gallery', labelEn: 'Gallery', labelTe: 'చిత్రమాలిక' },
    { id: 'contact', labelEn: 'Contact', labelTe: 'సంప్రదించండి' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-temple-header"
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#3A0A10]/95 backdrop-blur-md shadow-xl border-b border-[#D4AF37]/30'
          : 'bg-[#4A0E17] border-b border-[#D4AF37]/20'
      }`}
    >
      {/* Sacred Top Banner: Timings & Auspicious Notice */}
      <div className="bg-[#2E070B] text-[#F3E5AB] text-xs py-1.5 px-4 border-b border-[#D4AF37]/15 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="text-[#E5B839]">☀️</span>
              <span className="text-[#E8DCC0]">
                {currentLang === 'te' ? 'ఉదయం దర్శనం:' : 'Morning Darshan:'}{' '}
                <strong className="text-[#FFE29F]">{TEMPLE_INFO.darshanTimings.morning}</strong>
              </span>
            </span>
            <span className="text-[#D4AF37]/40">|</span>
            <span className="flex items-center gap-1.5">
              <span className="text-[#E5B839]">🌙</span>
              <span className="text-[#E8DCC0]">
                {currentLang === 'te' ? 'సాయంత్రం దర్శనం:' : 'Evening Darshan:'}{' '}
                <strong className="text-[#FFE29F]">{TEMPLE_INFO.darshanTimings.evening}</strong>
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenAdminRecords}
              className="text-[#E8DCC0]/80 hover:text-[#FFE29F] flex items-center gap-1 transition-colors"
              title="View Devotee Records & Trust E-Receipts"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5B839]" />
              <span>{currentLang === 'te' ? 'ట్రస్ట్ రికార్డులు' : 'Trust Records'}</span>
            </button>
            <span className="text-[#D4AF37]/40">|</span>
            <span className="text-[#FFD54F] font-medium tracking-wide">
              {currentLang === 'te' ? 'శుభ ముహూర్తం • సర్వేజనాః సుఖినోభవంతు' : 'Om Namo Bhagavate Vasudevaya'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left: Temple Logo & Name */}
          <button
            id="header-temple-brand"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3.5 text-left group focus:outline-none"
          >
            <div className="relative">
              <TempleEmblem className="w-12 h-12 transition-transform duration-300 group-hover:scale-105 filter drop-shadow-md" />
              {bellRinging && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFE58F] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#D4AF37]"></span>
                </span>
              )}
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-[#E5B839] font-medium">
                {currentLang === 'te' ? 'పుణ్యక్షేత్రం' : 'Sacred Hindu Devasthanam'}
              </span>
              <h1 className="text-xl sm:text-2xl font-serif-temple font-bold text-white tracking-wide group-hover:text-[#FFE58F] transition-colors leading-tight">
                {currentLang === 'te' ? TEMPLE_INFO.nameTe : TEMPLE_INFO.nameEn}
              </h1>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-2" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#FFE58F] bg-[#5E141F]'
                      : 'text-[#F3E5AB] hover:text-white hover:bg-[#5E141F]/60'
                  }`}
                >
                  {currentLang === 'te' ? item.labelTe : item.labelEn}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[#D4AF37] to-[#FFE58F]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Sacred Bell & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Temple Bell Sound Button */}
            <button
              id="ring-temple-bell-btn"
              onClick={handleRingBell}
              title={currentLang === 'te' ? 'ఆలయ గంట మ్రోగించండి (గంట నాదం)' : 'Ring the sacred temple bell'}
              className="relative p-2 rounded-full bg-[#5E141F] hover:bg-[#731A28] border border-[#D4AF37]/40 text-[#FFE58F] transition-all hover:scale-105 active:scale-95 shadow-sm"
              aria-label="Ring Temple Bell"
            >
              <TempleBellIcon className="w-5 h-5" animated={bellRinging} />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-[#F3E5AB] hover:text-white hover:bg-[#5E141F] focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#3A0A10] border-t border-[#D4AF37]/30 px-4 pt-3 pb-6 space-y-3 shadow-2xl">
          <div className="flex flex-col gap-1.5 pb-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-[#731A28] text-[#FFE58F] font-semibold border border-[#D4AF37]/30'
                      : 'text-[#F3E5AB] hover:bg-[#5E141F]'
                  }`}
                >
                  {currentLang === 'te' ? item.labelTe : item.labelEn}
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-[#D4AF37]/20 flex items-center justify-between text-xs text-[#E8DCC0]">
            <div>
              <span>{currentLang === 'te' ? 'దర్శనం సమయాలు:' : 'Darshan Hours:'} </span>
              <strong className="text-[#FFE58F]">{TEMPLE_INFO.darshanTimings.morning}</strong>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('contact');
              }}
              className="text-[#FFE58F] underline hover:text-white"
            >
              {currentLang === 'te' ? 'సంప్రదించండి' : 'Contact Us'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
