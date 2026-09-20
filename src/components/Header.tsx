import React, { useState, useEffect } from 'react';
import { Menu, X, HeartHandshake, Home, Landmark, Images, Clock } from 'lucide-react';
import { Language } from '../types';
import { TempleEmblem } from './TempleMotifs';
import { TopSlokaScroller } from './TopSlokaScroller';

interface HeaderProps {
  currentLang?: Language;
  onToggleLang?: () => void;
  activeSection?: string;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang = 'en',
  onToggleLang,
  activeSection,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState(activeSection || 'home');

  useEffect(() => {
    if (activeSection) {
      setActiveTab(activeSection);
    }
  }, [activeSection]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 300 && activeSection !== 'donation') {
        setActiveTab('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelTe: 'ప్రారంభం', target: 'hero-section', icon: Home },
    { id: 'about', labelEn: 'About Temple', labelTe: 'ఆలయ విశేషాలు', target: 'about', icon: Landmark },
    { id: 'gallery', labelEn: 'Gallery', labelTe: 'చిత్రమాలిక', target: 'gallery', icon: Images },
    { id: 'contact', labelEn: 'Contact & Timings', labelTe: 'దర్శనం & వివరాలు', target: 'contact', icon: Clock },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    setActiveTab(item.id);
    setMobileMenuOpen(false);
    if (item.target) {
      onNavigate(item.target);
    }
  };

  return (
    <header
      id="main-temple-header"
      className={`sticky top-0 z-50 transition-all duration-300 border-b border-[#D4AF37]/35 ${
        isScrolled ? 'shadow-2xl' : 'shadow-lg'
      }`}
      style={{
        background: 'linear-gradient(135deg, #5b0b17 0%, var(--primary-red) 50%, #5b0b17 100%)',
      }}
    >
      {/* Top Header Bar: Left Sloka Slide & Right Language Translator */}
      <TopSlokaScroller currentLang={currentLang} onToggleLang={onToggleLang} />

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[62px] sm:min-h-[76px] py-1.5 sm:py-2">
          
          {/* Left: Temple Identity & Logo UI (Responsive 3-Tier Devasthanam Typographic Lockup) */}
          <button
            id="header-temple-brand"
            onClick={() => {
              setActiveTab('home');
              onNavigate('hero-section');
            }}
            className="flex items-center gap-2 sm:gap-3 text-left group focus:outline-none min-w-0 pr-1.5"
          >
            {/* Sacred Temple Emblem */}
            <div className="p-0.5 sm:p-1 rounded-full bg-[#5B101D]/40 border border-[#D4AF37]/40 shrink-0 shadow-md">
              <TempleEmblem className="w-7 h-7 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105" />
            </div>

            {/* 3-Tier Devasthanam Typographic Lockup */}
            <div className="flex flex-col justify-center min-w-0">
              {/* Line 1: Sri Sridevi Bhudevi Sametha (Decreased by 2px on mobile: 8px vs 10px) */}
              <span className="font-poppins text-[#F3CE72] font-semibold text-[8px] sm:text-[10px] md:text-xs lg:text-[13px] tracking-[0.05em] sm:tracking-[0.08em] uppercase leading-tight truncate">
                {currentLang === 'te' ? 'శ్రీ శ్రీదేవి భూదేవి సమేత' : 'Sri Sridevi Bhudevi Sametha'}
              </span>

              {/* Line 2: Thirumalanadha Swamy (middle - decreased by 2px on mobile: 11px vs 13px) */}
              <span className="font-poppins font-black text-white text-[11px] sm:text-base md:text-lg lg:text-xl tracking-[0.03em] sm:tracking-[0.05em] uppercase leading-tight my-0.5 truncate">
                {currentLang === 'te' ? 'తిరుమలనాథ స్వామి' : 'Thirumalanadha Swamy'}
              </span>

              {/* Line 3: Devasthanam (Decreased by 2px on mobile: 7.5px vs 9.5px) */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="h-[1px] w-2 sm:w-5 lg:w-7 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#F3CE72]" />
                <span className="font-poppins font-bold text-[#F3CE72] text-[7.5px] sm:text-[9.5px] md:text-[10.5px] tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
                  {currentLang === 'te' ? 'దేవస్థానం' : 'Devasthanam'}
                </span>
                <div className="h-[1px] w-2 sm:w-5 lg:w-7 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#F3CE72]" />
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links (Spacious, Breathable Spacing Between Menu Links with Poppins Font) */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3.5 2xl:gap-5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item)}
                  className={`font-poppins px-2.5 xl:px-3.5 py-1.5 rounded-lg text-xs xl:text-[13px] font-medium tracking-normal transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#5B101D] text-[#f3d47a] border border-[#f3d47a]/60 shadow-inner'
                      : 'text-white hover:text-[#fff0be] hover:bg-[#5B101D]/50'
                  }`}
                >
                  {currentLang === 'te' ? item.labelTe : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Donation Button & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Direct Donation CTA Button - Compact on Mobile */}
            <button
              id="header-donate-btn"
              onClick={() => {
                setActiveTab('donation');
                setMobileMenuOpen(false);
                onNavigate('donation');
              }}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-4 py-1 sm:py-2 rounded-md sm:rounded-lg bg-gradient-to-r from-[#D4AF37] via-[#E5B839] to-[#D48806] hover:from-[#FFE29F] hover:to-[#C58000] text-[#360910] text-[10.5px] sm:text-sm font-bold transition-all shadow-md active:scale-95 border border-[#FFF5CC]"
              aria-label="Make a Sacred Donation"
            >
              <HeartHandshake className="w-3 h-3 sm:w-4 sm:h-4 text-[#360910] shrink-0" />
              <span>{currentLang === 'te' ? 'విరాళం' : 'Donate'}</span>
            </button>

            {/* Mobile/Tablet Menu Toggle Button */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 sm:p-2 rounded-lg text-[#F3E5AB] hover:text-white hover:bg-[#5B101D] focus:outline-none transition-colors active:scale-95"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu with Related Icons for Each Item (Mobile Only) */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden border-t border-[#D4AF37]/30 px-3 py-2.5 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200"
          style={{
            background: 'linear-gradient(135deg, #5b0b17 0%, var(--primary-red) 50%, #5b0b17 100%)',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item)}
                className={`font-poppins w-full text-left px-3 py-2.5 rounded-lg text-xs sm:text-[13px] font-medium transition-colors flex items-center justify-between group ${
                  isActive
                    ? 'bg-[#5B101D] text-[#f3d47a] border-l-4 border-[#f3d47a] shadow-inner'
                    : 'text-white hover:bg-[#5B101D]/60 hover:text-[#fff0be]'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconComponent 
                    className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                      isActive 
                        ? 'text-[#f3d47a]' 
                        : 'text-white group-hover:text-[#fff0be]'
                    }`} 
                  />
                  <span className="truncate">{currentLang === 'te' ? item.labelTe : item.labelEn}</span>
                </div>
                {isActive && <span className="text-[10px] text-[#f3d47a] font-bold">●</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
