import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
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
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 300) {
        setActiveTab('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', labelEn: 'Home', labelTe: 'ప్రారంభం', target: 'hero-section' },
    { id: 'about', labelEn: 'About Temple', labelTe: 'ఆలయ విశేషాలు', target: 'about' },
    { id: 'gallery', labelEn: 'Gallery', labelTe: 'చిత్రమాలిక', target: 'gallery' },
    { id: 'contact', labelEn: 'Contact & Timings', labelTe: 'దర్శనం & వివరాలు', target: 'contact' },
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
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#2B060A]/95 backdrop-blur-md shadow-2xl border-b border-[#D4AF37]/40'
          : 'bg-gradient-to-r from-[#2B060A] via-[#3D0A10] to-[#200407] border-b border-[#D4AF37]/30'
      }`}
    >
      {/* Venkateswara Swamy Sloka Top Scroller (One by One with Swamy Icons) */}
      <TopSlokaScroller currentLang={currentLang} />

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
              <TempleEmblem className="w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 transition-transform duration-300 group-hover:scale-105" />
            </div>

            {/* 3-Tier Devasthanam Typographic Lockup */}
            <div className="flex flex-col justify-center min-w-0">
              {/* Line 1: Sri Sridevi Bhudevi Sametha */}
              <span className="font-poppins text-[#F3CE72] font-semibold text-[11px] sm:text-xs md:text-xs lg:text-[13px] tracking-[0.04em] sm:tracking-[0.08em] uppercase leading-tight truncate">
                {currentLang === 'te' ? 'శ్రీ శ్రీదేవి భూదేవి సమేత' : 'Sri Sridevi Bhudevi Sametha'}
              </span>

              {/* Line 2: Thirumalanadha Swamy (middle - white color) */}
              <span className="font-poppins font-black text-white text-[15px] sm:text-base md:text-lg lg:text-xl tracking-[0.02em] sm:tracking-[0.05em] uppercase leading-tight my-0.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)] truncate">
                {currentLang === 'te' ? 'తిరుమలనాథ స్వామి' : 'Thirumalanadha Swamy'}
              </span>

              {/* Line 3: Devasthanam */}
              <div className="flex items-center gap-1 sm:gap-1.5">
                <div className="h-[1px] w-2.5 sm:w-5 lg:w-7 bg-gradient-to-r from-transparent via-[#D4AF37] to-[#F3CE72]" />
                <span className="font-poppins font-bold text-[#F3CE72] text-[11px] sm:text-[11px] md:text-[11.5px] tracking-[0.14em] sm:tracking-[0.2em] uppercase whitespace-nowrap">
                  {currentLang === 'te' ? 'దేవస్థానం' : 'Devasthanam'}
                </span>
                <div className="h-[1px] w-2.5 sm:w-5 lg:w-7 bg-gradient-to-l from-transparent via-[#D4AF37] to-[#F3CE72]" />
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links (Compact Font Size & Refined Spacing) */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item)}
                  className={`px-2.5 py-1.5 rounded-lg text-[11.5px] xl:text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-[#5B101D] text-[#FFE58F] border border-[#D4AF37]/50 shadow-inner'
                      : 'text-[#F5EDE0] hover:text-[#FFE58F] hover:bg-[#5B101D]/50'
                  }`}
                >
                  {currentLang === 'te' ? item.labelTe : item.labelEn}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Language Switcher & Mobile Toggle (Bell Removed as Requested) */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Switcher */}
            {onToggleLang && (
              <button
                id="language-switcher-btn"
                onClick={onToggleLang}
                className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-[#5B101D] hover:bg-[#731A28] border border-[#D4AF37]/50 text-[10.5px] sm:text-xs font-semibold text-[#FFE58F] transition-all shadow-md active:scale-95"
                aria-label="Toggle Language"
              >
                <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5B839] shrink-0" />
                <span className="hidden sm:inline">{currentLang === 'en' ? 'తెలుగు' : 'English'}</span>
                <span className="sm:hidden uppercase tracking-wider text-[10px] font-bold">{currentLang === 'en' ? 'తె' : 'EN'}</span>
              </button>
            )}

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

      {/* Mobile & Tablet Drawer Menu with Smaller Responsive Font Size */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#240407] border-t border-[#D4AF37]/30 px-3 py-2.5 space-y-1 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item)}
                className={`w-full text-left px-3 py-2 rounded-lg text-[11.5px] sm:text-xs font-semibold transition-colors flex items-center justify-between ${
                  isActive
                    ? 'bg-[#5B101D] text-[#FFE58F] border-l-4 border-[#D4AF37]'
                    : 'text-[#F5EDE0] hover:bg-[#5B101D]/60 hover:text-[#FFE58F]'
                }`}
              >
                <span>{currentLang === 'te' ? item.labelTe : item.labelEn}</span>
                {isActive && <span className="text-[9px] text-[#FFE58F]">●</span>}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
