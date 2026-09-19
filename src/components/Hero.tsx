import React from 'react';
import { ChevronRight, Image as ImageIcon } from 'lucide-react';
import { Language } from '../types';
import { TEMPLE_INFO } from '../data/templeData';
import { DiyaIcon, OrnamentalDivider, VaishnavaTirunamam } from './TempleMotifs';
import { HangingBell } from './HangingBell';

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
}) => {
  const handleAboutAction = onExploreAbout || (() => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  const handleGalleryAction = onExploreGallery || (() => {
    const el = document.getElementById('gallery');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });

  return (
    <section 
      id="hero-section" 
      className="relative min-h-[75vh] sm:min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#1E0306] via-[#35070D] to-[#180205] text-white py-8 sm:py-14"
    >
      {/* Background Lord Sri Venkateswara Swamy Divine Sanctum Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none transition-opacity duration-700"
        style={{
          backgroundImage: `url('/images/venkateswara-hero-bg.png')`,
          filter: 'saturate(1.2) contrast(1.08)',
          opacity: 0.52,
        }}
      />

      {/* Atmospheric Sacred Gradients ensuring High Legibility */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[#180205]/85 via-[#260408]/65 to-[#160205]/92 pointer-events-none" />
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(40,5,10,0.35)_0%,rgba(18,2,4,0.82)_80%)] pointer-events-none" />

      {/* Divine Golden Sanctum Radial Aura & Rays */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] bg-[radial-gradient(circle,rgba(243,206,114,0.18)_0%,rgba(180,30,45,0.14)_45%,transparent_70%)] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.14)_0%,transparent_60%)] pointer-events-none" />

      {/* Hanging Sacred Temple Bells on Left and Right (Compact Responsive Sizing) */}
      <HangingBell position="left" currentLang={currentLang} />
      <HangingBell position="right" currentLang={currentLang} />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-4xl mx-auto px-3.5 sm:px-6 text-center pt-1 sm:pt-2">
        
        {/* Sacred Vaishnava Tirunamam Motif with Golden Radiance */}
        <div className="flex flex-col items-center justify-center mb-2 sm:mb-2.5">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-[#F3CE72]/20 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
            <VaishnavaTirunamam className="w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_3px_10px_rgba(0,0,0,0.6)]" />
          </div>
        </div>

        {/* Sacred Invocation Badge */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-0.5 sm:py-1 rounded-full bg-gradient-to-r from-[#4A0B14]/90 via-[#68101E]/90 to-[#4A0B14]/90 border border-[#F3CE72]/50 text-[#FFE58F] text-[10px] sm:text-xs font-medium tracking-[0.12em] sm:tracking-[0.15em] uppercase mb-3 sm:mb-4 shadow-md backdrop-blur-sm">
          <DiyaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFE58F] shrink-0" />
          <span>{currentLang === 'te' ? 'ఓం నమో వేంకటేశాయ' : 'OM NAMO VENKATESAYA'}</span>
          <DiyaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FFE58F] shrink-0" />
        </div>

        {/* Temple Name / Title - Balanced Proper Size (Not Big) */}
        <h1 
          id="hero-temple-heading"
          className="text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-serif-temple font-semibold text-white tracking-wide leading-snug mb-1.5 sm:mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]"
        >
          <span className="block bg-gradient-to-b from-[#FFFDF7] via-[#FFEBB3] to-[#F3CE72] bg-clip-text text-transparent">
            {currentLang === 'te' ? TEMPLE_INFO.nameTe : TEMPLE_INFO.nameEn}
          </span>
        </h1>

        {/* Presiding Deity Subtitle with Classical Flourish */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-[15px] font-serif-temple text-[#F3CE72] max-w-2xl mx-auto mb-1.5 font-medium tracking-wide">
          <span className="text-[#D4AF37] opacity-80 text-xs">꧁</span>
          <p className="drop-shadow-sm font-medium">
            {currentLang === 'te' ? TEMPLE_INFO.deityNameTe : TEMPLE_INFO.deityNameEn}
          </p>
          <span className="text-[#D4AF37] opacity-80 text-xs">꧂</span>
        </div>

        <OrnamentalDivider className="my-2.5 sm:my-3.5" />

        {/* Catchphrase & Spiritual Welcome */}
        <p className="text-[#E5D7C2] text-xs sm:text-sm md:text-[14.5px] max-w-xl mx-auto mb-5 sm:mb-6 leading-relaxed font-normal drop-shadow-sm px-2">
          {currentLang === 'te'
            ? 'శ్రీవారి దివ్య క్షేత్రానికి స్వాగతం. శతాబ్దాల ఆధ్యాత్మిక సంప్రదాయాలు, నిత్య పూజా కైంకర్యాలు మరియు అఖండ భక్తితో పునీతులవ్వండి.'
            : 'Welcome to the holy sanctuary of divine grace. Experience the transcendent serenity, Vedic rituals, and eternal blessings of the Lord.'}
        </p>

        {/* Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3.5 mb-2 sm:mb-3">
          <button
            id="hero-explore-about-btn"
            onClick={handleAboutAction}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-gradient-to-r from-[#F3C472] via-[#E5B839] to-[#C9971D] hover:from-[#FFE082] hover:to-[#D4A325] text-[#28050A] font-serif-temple font-semibold text-xs sm:text-sm shadow-md border border-[#FFECA8] transition-all duration-200 flex items-center gap-1.5 group active:scale-95"
          >
            <span>{currentLang === 'te' ? 'ఆలయ విశేషాలు & చరిత్ర' : 'Explore Temple History'}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#28050A] group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            id="hero-explore-gallery-btn"
            onClick={handleGalleryAction}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-[#4A0E17]/85 hover:bg-[#631420] border border-[#F3CE72]/60 text-[#FFE58F] font-serif-temple font-medium text-xs sm:text-sm shadow-md transition-all duration-200 flex items-center gap-1.5 active:scale-95 hover:border-[#FFE58F]"
          >
            <ImageIcon className="w-3.5 h-3.5 text-[#FFE58F]" />
            <span>{currentLang === 'te' ? 'దివ్య చిత్రమాలిక' : 'Sacred Photo Gallery'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Gold Border Accent */}
      <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4AF37]/70 to-transparent" />
    </section>
  );
};
