import React, { useState } from 'react';
import { templeAudio } from '../utils/audio';
import { Language } from '../types';

interface HeroDeepamProps {
  position: 'left' | 'right';
  currentLang?: Language;
  className?: string;
}

export const HeroDeepam: React.FC<HeroDeepamProps> = ({
  position,
  currentLang = 'en',
  className = '',
}) => {
  const [isBlessed, setIsBlessed] = useState(false);
  const isLeft = position === 'left';

  const handleDeepamClick = () => {
    setIsBlessed(true);
    templeAudio.playTempleBell();
    setTimeout(() => {
      setIsBlessed(false);
    }, 2000);
  };

  return (
    <div
      className={`absolute bottom-0 z-20 flex flex-col items-center justify-end pointer-events-auto select-none ${
        isLeft 
          ? 'left-2 sm:left-4 md:left-6 lg:left-10' 
          : 'right-2 sm:right-4 md:right-6 lg:right-10'
      } ${className}`}
    >
      {/* Interactive Tooltip & Click Wrapper */}
      <button
        type="button"
        onClick={handleDeepamClick}
        aria-label={currentLang === 'te' ? 'అఖండ దీపం' : 'Sacred Diya'}
        title={currentLang === 'te' ? 'అఖండ దీపం' : 'Sacred Diya / Deepam'}
        className={`group relative flex flex-col items-center justify-end p-0 m-0 cursor-pointer focus:outline-none transition-transform duration-300 ${
          isBlessed ? 'scale-115 origin-bottom' : 'hover:scale-110 active:scale-95 origin-bottom'
        }`}
      >
        {/* Delicate Floating Sparks / Embers */}
        <div className="absolute -top-4 sm:-top-5 flex justify-center w-full pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFE58F] shadow-[0_0_6px_#FFA000] animate-diya-sparkle-1" />
          <span className="w-1 h-1 rounded-full bg-[#FFD54F] shadow-[0_0_5px_#FF6F00] animate-diya-sparkle-2 ml-2" />
        </div>

        {/* Ambient Golden Radial Aura */}
        <div 
          className={`absolute -top-3 sm:-top-4.5 w-11 h-11 sm:w-15 sm:h-15 rounded-full pointer-events-none transition-all duration-500 ${
            isBlessed 
              ? 'bg-[radial-gradient(circle,rgba(255,215,0,0.65)_0%,rgba(255,140,0,0.38)_45%,transparent_75%)] blur-md scale-125' 
              : 'bg-[radial-gradient(circle,rgba(255,200,60,0.45)_0%,rgba(255,120,0,0.22)_50%,transparent_75%)] blur-sm animate-diya-aura'
          }`}
        />

        {/* Authentic Temple Brass Deepam SVG - Touching Bottom */}
        <svg
          viewBox="0 0 100 125"
          className="block w-5.5 h-7 sm:w-7.5 sm:h-9.5 md:w-9 md:h-11.5 drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Outer Flame Gradient */}
            <linearGradient id={`flameOuterGrad-${position}`} x1="50" y1="10" x2="50" y2="58" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF9C4" />
              <stop offset="25%" stopColor="#FFD54F" />
              <stop offset="60%" stopColor="#FF9800" />
              <stop offset="85%" stopColor="#E65100" />
              <stop offset="100%" stopColor="#BF360C" />
            </linearGradient>

            {/* Mid Flame Core Gradient */}
            <linearGradient id={`flameMidGrad-${position}`} x1="50" y1="20" x2="50" y2="56" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="40%" stopColor="#FFF59D" />
              <stop offset="75%" stopColor="#FFB74D" />
              <stop offset="100%" stopColor="#FF9800" />
            </linearGradient>

            {/* Inner Incandescent White Flame */}
            <linearGradient id={`flameInnerGrad-${position}`} x1="50" y1="28" x2="50" y2="55" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#FFFDE7" />
              <stop offset="100%" stopColor="#FFE082" />
            </linearGradient>

            {/* Brass Metal Gradient - Highlighted Gold */}
            <linearGradient id={`brassGoldGrad-${position}`} x1="15" y1="55" x2="85" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE58F" />
              <stop offset="25%" stopColor="#E5B839" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="75%" stopColor="#996515" />
              <stop offset="100%" stopColor="#5E3804" />
            </linearGradient>

            {/* Brass Shadow Gradient */}
            <linearGradient id={`brassDarkGrad-${position}`} x1="50" y1="58" x2="50" y2="125" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8C5C0B" />
              <stop offset="50%" stopColor="#5B3803" />
              <stop offset="100%" stopColor="#3A2101" />
            </linearGradient>

            {/* Ghee Pool Gradient */}
            <linearGradient id={`gheeGrad-${position}`} x1="30" y1="60" x2="70" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8A5A00" />
              <stop offset="30%" stopColor="#E5A91A" />
              <stop offset="50%" stopColor="#FFE58F" />
              <stop offset="70%" stopColor="#E5A91A" />
              <stop offset="100%" stopColor="#8A5A00" />
            </linearGradient>

            {/* Radial Flame Blur Filter */}
            <filter id={`glowFilter-${position}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* ================= FLAME (ANIMATED) ================= */}
          <g className={isLeft ? 'animate-diya-flame' : 'animate-diya-flame-alt'}>
            {/* Outer Flame Glow Halo */}
            <ellipse cx="50" cy="38" rx="14" ry="22" fill="#FFA000" opacity="0.25" filter={`url(#glowFilter-${position})`} />
            
            {/* Outer Flame Contour (Classic Teardrop Leaf) */}
            <path
              d="M50 8 C48 18 36 28 36 42 C36 51 42 57 50 57 C58 57 64 51 64 42 C64 28 52 18 50 8 Z"
              fill={`url(#flameOuterGrad-${position})`}
              filter={`url(#glowFilter-${position})`}
            />

            {/* Mid Flame Layer */}
            <path
              d="M50 18 C48 24 41 31 41 42 C41 48 45 53 50 53 C55 53 59 48 59 42 C59 31 52 24 50 18 Z"
              fill={`url(#flameMidGrad-${position})`}
              className="animate-flame-core"
            />

            {/* Inner Core Flame (Hottest White-Gold Core) */}
            <path
              d="M50 28 C49 32 45 37 45 44 C45 47 47 50 50 50 C53 50 55 47 55 44 C55 37 51 32 50 28 Z"
              fill={`url(#flameInnerGrad-${position})`}
            />

            {/* Sacred Wick (Thiri) soaked in oil */}
            <line x1="50" y1="46" x2="50" y2="58" stroke="#3E2723" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="50" cy="46" r="1.5" fill="#212121" />
          </g>

          {/* ================= BRASS LAMP BODY (AGAL / SAMAY) ================= */}
          {/* Ghee / Oil Reservoir (Inner Basin Oval) */}
          <ellipse cx="50" cy="59" rx="28" ry="7" fill={`url(#gheeGrad-${position})`} />
          <ellipse cx="50" cy="59" rx="25" ry="5.5" fill="#C58000" opacity="0.6" />

          {/* Main Ornate Brass Oil Bowl Rim & Body */}
          <path
            d="M20 59 C20 72 34 81 50 81 C66 81 80 72 80 59 C74 65 62 67 50 67 C38 67 26 65 20 59 Z"
            fill={`url(#brassGoldGrad-${position})`}
            stroke="#6A4005"
            strokeWidth="1.2"
          />

          {/* Decorative Engravings / Scalloped Petals on Rim */}
          <path
            d="M24 64 Q30 70 36 65 Q43 71 50 65 Q57 71 64 65 Q70 70 76 64"
            stroke="#FFE58F"
            strokeWidth="1.5"
            fill="none"
            opacity="0.8"
          />
          <circle cx="36" cy="69" r="1.2" fill="#FFE58F" />
          <circle cx="50" cy="71" r="1.5" fill="#FFE58F" />
          <circle cx="64" cy="69" r="1.2" fill="#FFE58F" />

          {/* Middle Tiered Pillar / Stem */}
          <rect x="44" y="80" width="12" height="10" fill={`url(#brassDarkGrad-${position})`} />
          <path d="M42 84 H58" stroke="#FFE58F" strokeWidth="1.2" />

          {/* Middle Ring / Moldings */}
          <ellipse cx="50" cy="90" rx="14" ry="4" fill={`url(#brassGoldGrad-${position})`} stroke="#6A4005" strokeWidth="1" />
          <rect x="46" y="90" width="8" height="12" fill={`url(#brassDarkGrad-${position})`} />

          {/* Tiered Stepped Pedestal Base */}
          <ellipse cx="50" cy="102" rx="20" ry="5" fill={`url(#brassGoldGrad-${position})`} stroke="#6A4005" strokeWidth="1" />
          <path d="M30 102 L24 116 H76 L70 102 Z" fill={`url(#brassDarkGrad-${position})`} />

          {/* Bottom Broad Pedestal Stand (Traditional Indian Fluted Base) */}
          <ellipse cx="50" cy="116" rx="36" ry="9" fill={`url(#brassGoldGrad-${position})`} stroke="#6A4005" strokeWidth="1.2" />
          <ellipse cx="50" cy="118" rx="34" ry="7" fill="#422502" opacity="0.7" />

          {/* Base Golden Highlight Band */}
          <path
            d="M22 115 Q50 123 78 115"
            stroke="#FFE58F"
            strokeWidth="1.6"
            fill="none"
            opacity="0.9"
          />
        </svg>

        {/* Bottom Subtle Warm Illumination on the Hero Border Line */}
        <div className="absolute bottom-0 w-8 sm:w-12 h-1 rounded-full bg-gradient-to-r from-transparent via-[#FFB300]/80 to-transparent blur-[1px] pointer-events-none" />
      </button>
    </div>
  );
};
