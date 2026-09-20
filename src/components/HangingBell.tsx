import React, { useState } from 'react';
import { templeAudio } from '../utils/audio';
import { Language } from '../types';

interface HangingBellProps {
  position: 'left' | 'right';
  currentLang?: Language;
  className?: string;
}

export const HangingBell: React.FC<HangingBellProps> = ({
  position,
  currentLang = 'en',
  className = '',
}) => {
  const [isRinging, setIsRinging] = useState(false);

  const handleRing = () => {
    setIsRinging(true);
    templeAudio.playTempleBell();
    setTimeout(() => {
      setIsRinging(false);
    }, 2200);
  };

  const isLeft = position === 'left';

  return (
    <div
      className={`absolute top-0 z-20 flex flex-col items-center pointer-events-auto select-none ${
        isLeft 
          ? 'left-1 sm:left-4 md:left-6 lg:left-10' 
          : 'right-1 sm:right-4 md:right-6 lg:right-10'
      } ${className}`}
    >
      {/* Top Ceiling Hook / Brass Fastener */}
      <div className="w-2 h-0.5 sm:w-2.5 sm:h-1 md:w-3 md:h-1 lg:w-3.5 lg:h-1.5 bg-gradient-to-b from-[#8C5C0B] via-[#E5B839] to-[#6A4005] rounded-b-sm shadow-sm border-t border-[#FFE58F]/50 shrink-0" />
      
      {/* Suspended Pendulum: Brass Chain + Sacred Bell (Smooth and slow devotional sway from left to right) */}
      <div
        className={`flex flex-col items-center origin-top transition-transform ${
          isRinging 
            ? 'animate-bell-ring' 
            : isLeft 
              ? 'animate-bell-devotional' 
              : 'animate-bell-devotional-offset'
        }`}
      >
        {/* Brass Chain with Detailed Metallic Links */}
        <div className="flex flex-col items-center">
          <div className="w-[1.2px] sm:w-[1.5px] md:w-[1.8px] h-2 sm:h-4 md:h-6 lg:h-8 bg-gradient-to-b from-[#8C5C0B] via-[#FFE58F] to-[#8C5C0B] shadow-sm relative">
            <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,#6A4005_0px,#6A4005_2px,#FFE58F_3px,#E5B839_4px)] opacity-90" />
          </div>
        </div>

        {/* Bell Structure (Click to Ring) */}
        <button
          type="button"
          onClick={handleRing}
          aria-label={currentLang === 'te' ? 'ఆలయ గంట మ్రోగించండి' : 'Ring Sacred Temple Bell'}
          title={currentLang === 'te' ? 'ఆలయ గంట మ్రోగించండి' : 'Click to Ring Temple Bell'}
          className="group relative flex flex-col items-center cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#FFE58F] rounded-b-full p-0.5 transition-transform duration-300 hover:scale-105 active:scale-95"
        >
          {/* Divine Golden Glow on Hover / Ring */}
          <div 
            className={`absolute -inset-1 sm:-inset-2 md:-inset-2.5 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#FFA000]/30 to-[#FFE58F]/20 blur-sm pointer-events-none transition-opacity duration-500 ${
              isRinging ? 'opacity-100 scale-110' : 'opacity-0 group-hover:opacity-75'
            }`} 
          />

          {/* Sound Wave Ripple Effect when Ringing */}
          {isRinging && (
            <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="w-6 h-6 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full border border-[#FFE58F] animate-ping opacity-60" />
            </span>
          )}

          {/* Hanging Ring Top Loop */}
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 lg:w-3 lg:h-3 rounded-full border border-[#E5B839] bg-[#5B101D] shadow-inner mb-[-1px]" />

          {/* Authentic South Indian Temple Brass Bell SVG */}
          <svg 
            viewBox="0 0 100 120" 
            className="w-3.5 h-4.5 sm:w-5 sm:h-6 md:w-7 md:h-8.5 lg:w-8.5 lg:h-10.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]"
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Polished Bell Brass Gradient */}
              <linearGradient id={`bellGoldGrad-${position}`} x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#8C5C0B" />
                <stop offset="18%" stopColor="#D4AF37" />
                <stop offset="35%" stopColor="#FFE89E" />
                <stop offset="65%" stopColor="#F5C544" />
                <stop offset="85%" stopColor="#B37D14" />
                <stop offset="100%" stopColor="#5E3802" />
              </linearGradient>

              {/* Inner Dark Depth Gradient */}
              <linearGradient id={`bellInnerGrad-${position}`} x1="50" y1="95" x2="50" y2="115" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#2E0407" />
                <stop offset="100%" stopColor="#150103" />
              </linearGradient>

              {/* Clapper Highlight */}
              <linearGradient id={`clapperGrad-${position}`} x1="45" y1="100" x2="55" y2="118" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#FFE89E" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#784C07" />
              </linearGradient>
            </defs>

            {/* Bell Crown Finial / Kalasa Crown */}
            <path 
              d="M44 8 C44 4 56 4 56 8 L55 18 C58 19 60 21 60 24 L40 24 C40 21 42 19 45 18 Z" 
              fill={`url(#bellGoldGrad-${position})`} 
              stroke="#5E3802" 
              strokeWidth="1" 
            />
            <circle cx="50" cy="7" r="3.5" fill="#FFE89E" stroke="#8C5C0B" strokeWidth="0.8" />

            {/* Upper Neck Band */}
            <path 
              d="M38 24 C38 23 62 23 62 24 L65 34 L35 34 Z" 
              fill={`url(#bellGoldGrad-${position})`} 
              stroke="#6A4005" 
              strokeWidth="1" 
            />
            {/* Decorative Bead Dots on Neck */}
            <circle cx="43" cy="29" r="1.5" fill="#FFE89E" />
            <circle cx="50" cy="29" r="1.5" fill="#FFE89E" />
            <circle cx="57" cy="29" r="1.5" fill="#FFE89E" />

            {/* Main Bell Body Dome with Graceful Classical Flare */}
            <path 
              d="M35 34 C35 52 24 72 16 86 C12 93 10 97 10 100 C10 102 14 104 50 104 C86 104 90 102 90 100 C90 97 88 93 84 86 C76 72 65 52 65 34 Z" 
              fill={`url(#bellGoldGrad-${position})`} 
              stroke="#6A4005" 
              strokeWidth="1.2" 
            />

            {/* Horizontal Embossed Accent Bands */}
            <path d="M28 58 Q50 63 72 58" stroke="#784C07" strokeWidth="1.5" fill="none" />
            <path d="M28 60 Q50 65 72 60" stroke="#FFE89E" strokeWidth="0.8" fill="none" />

            <path d="M20 76 Q50 82 80 76" stroke="#784C07" strokeWidth="1.8" fill="none" />
            <path d="M20 78 Q50 84 80 78" stroke="#FFE89E" strokeWidth="1" fill="none" />

            {/* Lotus Petal Engravings along the Body */}
            <path d="M34 68 Q50 74 66 68" stroke="#9E6B0B" strokeWidth="1" strokeDasharray="3 3" fill="none" />

            {/* Heavy Bottom Brass Rim Lip */}
            <ellipse cx="50" cy="100" rx="40" ry="6" fill={`url(#bellGoldGrad-${position})`} stroke="#5E3802" strokeWidth="1.5" />
            <ellipse cx="50" cy="101" rx="36" ry="4.5" fill={`url(#bellInnerGrad-${position})`} />

            {/* Heavy Brass Clapper / Tongue (స్వర్ణ ఘంటా లోలకం) */}
            <g className={isRinging ? 'animate-ping' : ''}>
              <line x1="50" y1="96" x2="50" y2="114" stroke="#8C5C0B" strokeWidth="3" strokeLinecap="round" />
              <circle cx="50" cy="114" r="6" fill={`url(#clapperGrad-${position})`} stroke="#5E3802" strokeWidth="1" />
              <circle cx="48.5" cy="112.5" r="1.8" fill="#FFF8ED" />
            </g>
          </svg>

          {/* Small "Ring" / "మోగించండి" Devotional Label Pill */}
          <span className="mt-0.5 px-1 sm:px-1.5 py-0.2 rounded-full bg-[#3B070E]/85 border border-[#D4AF37]/50 text-[7px] sm:text-[9px] font-serif-temple font-bold text-[#FFE58F] tracking-wider uppercase opacity-80 group-hover:opacity-100 group-hover:bg-[#5E141F] transition-all shadow-sm flex items-center gap-0.5">
            <span className="hidden xs:inline">{currentLang === 'te' ? 'మోగించండి' : 'Ring'}</span>
            <span className="text-[#E5B839] text-[7px] sm:text-[8px]">🔔</span>
          </span>
        </button>
      </div>
    </div>
  );
};
