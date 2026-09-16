import React, { useState } from 'react';
import { Sparkles, Clock, ChevronRight, Image as ImageIcon, MapPin } from 'lucide-react';
import { Language } from '../types';
import { TEMPLE_INFO } from '../data/templeData';
import { TempleBellIcon, DiyaIcon, LotusIcon } from './TempleMotifs';
import { templeAudio } from '../utils/audio';

interface HeroProps {
  currentLang?: Language;
  onExploreAbout?: () => void;
  onExploreGallery?: () => void;
  onExploreDarshan?: () => void;
  onOpenDonate?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  currentLang = 'en',
  onExploreAbout,
  onExploreGallery,
  onExploreDarshan,
}) => {
  const [bellRinging, setBellRinging] = useState(false);
  const handleAboutAction = onExploreAbout || onExploreDarshan || (() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const handleGalleryAction = onExploreGallery || (() => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const handleHeroBellRing = () => {
    setBellRinging(true);
    templeAudio.playTempleBell();
    setTimeout(() => setBellRinging(false), 2500);
  };

  return (
    <section id="hero-section" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#2D060B]">
      {/* Background Sacred Architecture Image with Rich Maroon & Golden Vignette */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 scale-105"
        style={{
          backgroundImage: `url('/images/temple-gopuram.svg')`,
          filter: 'brightness(0.38) saturate(1.2)'
        }}
      />

      {/* Divine Aura & Soft Radial Golden Halo Glow */}
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#280408] via-[#4A0E17]/65 to-[#280408]/85" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-gradient-to-r from-[#D4AF37]/15 to-[#FF9800]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Divine Sparkles / Light Particles */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[15%] text-[#FFE58F] text-xl animate-sparkle opacity-60">✦</div>
        <div className="absolute top-1/3 right-[18%] text-[#FFE58F] text-sm animate-sparkle opacity-40 delay-700">✦</div>
        <div className="absolute bottom-1/4 left-[25%] text-[#E5B839] text-2xl animate-sparkle opacity-75 delay-1000">✦</div>
        <div className="absolute top-1/2 right-[12%] text-[#FFD54F] text-base animate-sparkle opacity-50 delay-500">✦</div>
        <div className="absolute bottom-1/3 right-[28%] text-[#FFE58F] text-xs animate-sparkle opacity-80 delay-1200">✦</div>
      </div>

      {/* Flanking Temple Bells (hanging from the heavens) */}
      <div className="absolute top-0 left-6 sm:left-14 z-10 hidden sm:flex flex-col items-center cursor-pointer group" onClick={handleHeroBellRing}>
        <div className="w-[1.5px] h-20 bg-gradient-to-b from-[#8A5A00] to-[#E5B839]" />
        <div className="p-2 rounded-full bg-[#3D0A11]/60 group-hover:bg-[#5E141F] transition-all">
          <TempleBellIcon className="w-8 h-8 text-[#FFE58F]" animated={bellRinging} />
        </div>
        <span className="text-[10px] text-[#E5B839]/80 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {currentLang === 'te' ? 'మోగించండి' : 'Ring'}
        </span>
      </div>

      <div className="absolute top-0 right-6 sm:right-14 z-10 hidden sm:flex flex-col items-center cursor-pointer group" onClick={handleHeroBellRing}>
        <div className="w-[1.5px] h-24 bg-gradient-to-b from-[#8A5A00] to-[#E5B839]" />
        <div className="p-2 rounded-full bg-[#3D0A11]/60 group-hover:bg-[#5E141F] transition-all">
          <TempleBellIcon className="w-9 h-9 text-[#FFE58F]" animated={bellRinging} />
        </div>
        <span className="text-[10px] text-[#E5B839]/80 uppercase tracking-widest mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
          {currentLang === 'te' ? 'మోగించండి' : 'Ring'}
        </span>
      </div>

      {/* Hero Content Box */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Sacred Deity Medallion / Consecrated Darshan Frame */}
        <div className="relative mb-5 group cursor-pointer" onClick={handleAboutAction}>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] via-[#FFF2C6] to-[#E5B839] shadow-2xl ring-4 ring-[#D4AF37]/35 group-hover:scale-105 transition-transform duration-500">
            <div className="w-full h-full rounded-full overflow-hidden relative bg-[#200407]">
              <img
                src="/images/god-venkateswara.svg"
                alt={`Divine Sanctum ${TEMPLE_INFO.deityNameEn}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center filter brightness-105 contrast-105 group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#200407]/60 via-transparent to-transparent" />
            </div>
          </div>

          {/* Floating Auspicious Badge */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#3D0A11] border border-[#FFE58F] text-[10px] sm:text-xs font-semibold text-[#FFE58F] whitespace-nowrap shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#FFE58F]" />
            <span>{currentLang === 'te' ? 'దివ్య దర్శనం' : 'Divine Sanctum'}</span>
          </div>
        </div>

        {/* Sacred Chanting Mantra Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#56131D]/85 border border-[#D4AF37]/50 text-[#FFE58F] text-xs sm:text-sm font-medium shadow-md mb-6 backdrop-blur-sm">
          <DiyaIcon className="w-4 h-4 text-[#FFE58F]" />
          <span>
            {currentLang === 'te' 
              ? '॥ నమో భగవతే తిరుమలనాథాయ ॥ శ్రీక్షేత్ర దర్శనం'
              : '॥ Om Namo Bhagavate Tirumalanadhaya ॥ Divine Sanctum'}
          </span>
          <LotusIcon className="w-4 h-4 text-[#FF80AB]" />
        </div>

        {/* Hero Main Heading with Gold Gradient */}
        <h1 
          id="hero-temple-title"
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-serif-temple font-extrabold text-white tracking-wide leading-tight mb-4 drop-shadow-lg"
        >
          {currentLang === 'te' ? (
            <span className="text-[#FFF2C6] block">{TEMPLE_INFO.nameTe}</span>
          ) : (
            <span className="text-[#FFF2C6] block">{TEMPLE_INFO.nameEn}</span>
          )}
        </h1>

        {/* Traditional Devotional Quotation (Requested by user) */}
        <p className="text-xl sm:text-2xl md:text-3xl font-telugu text-[#FFD54F] font-semibold tracking-wide mb-3 max-w-3xl drop-shadow">
          "భక్తితో పిలిస్తే... భగవంతుడు తప్పక పలుకుతాడు"
        </p>

        {/* English Subtitle (Requested by user) */}
        <p className="text-base sm:text-xl text-[#F5EDE0]/90 font-light tracking-wide max-w-2xl mb-8 leading-relaxed">
          Experience Divine Grace, Devotion & Peace
        </p>

        {/* Action Buttons: "ఆలయ విశేషాలు" & "చిత్రమాలిక" */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* About Temple Button */}
          <button
            id="hero-about-details-btn"
            onClick={handleAboutAction}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5B839] to-[#D48806] hover:from-[#FFE29F] hover:to-[#C58000] text-[#360910] font-bold text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2.5 border border-[#FFF5CC]"
          >
            <Clock className="w-5 h-5 text-[#360910]" />
            <span>{currentLang === 'te' ? 'ఆలయ విశేషాలు & దర్శనం' : 'About Temple & Darshan'}</span>
            <ChevronRight className="w-4 h-4 text-[#360910]" />
          </button>

          {/* Photo Gallery Button */}
          <button
            id="hero-gallery-btn"
            onClick={handleGalleryAction}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#420B12]/80 hover:bg-[#5E141F] text-[#FFE29F] border-2 border-[#D4AF37] font-semibold text-base shadow-lg hover:shadow-[#D4AF37]/20 transition-all duration-300 flex items-center justify-center gap-2 group backdrop-blur-sm"
          >
            <ImageIcon className="w-5 h-5 text-[#E5B839] group-hover:scale-110 transition-transform" />
            <span>{currentLang === 'te' ? 'దివ్య చిత్రమాలిక' : 'Sacred Photo Gallery'}</span>
          </button>
        </div>

        {/* Quick Auspicious Info Strip */}
        <div className="mt-12 pt-6 border-t border-[#D4AF37]/25 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-[#F3E5AB] text-xs sm:text-sm">
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-lg bg-[#380A11]/60">
            <Clock className="w-4 h-4 text-[#E5B839]" />
            <span>
              {currentLang === 'te' ? 'నిత్య దర్శనం:' : 'Daily Darshan:'}{' '}
              <strong className="text-white">05:30 AM - 09:00 PM</strong>
            </span>
          </div>
          
          <div className="flex items-center justify-center gap-2.5 p-2 rounded-lg bg-[#380A11]/60">
            <span className="text-base">🍚</span>
            <span>
              {currentLang === 'te' ? 'నిత్య అన్నదానం:' : 'Nitya Annadanam:'}{' '}
              <strong className="text-white">12:30 PM - 03:00 PM</strong>
            </span>
          </div>

          <div className="flex items-center justify-center gap-2.5 p-2 rounded-lg bg-[#380A11]/60">
            <MapPin className="w-4 h-4 text-[#E5B839]" />
            <span>
              {currentLang === 'te' ? 'పవిత్ర క్షేత్రం:' : 'Sacred Kshetram:'}{' '}
              <strong className="text-white">Tirupati District</strong>
            </span>
          </div>
        </div>

      </div>

      {/* Decorative Bottom Arch Transition */}
      <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-[#FAF6EE] to-transparent z-10" />
    </section>
  );
};
