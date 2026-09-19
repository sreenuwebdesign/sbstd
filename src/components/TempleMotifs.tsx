import React from 'react';

export const TempleBellIcon: React.FC<{ className?: string; animated?: boolean }> = ({ className = 'w-6 h-6', animated = false }) => (
  <svg 
    viewBox="0 0 48 48" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className={`${className} ${animated ? 'animate-bell' : ''}`}
  >
    {/* Hanging ring & chain */}
    <circle cx="24" cy="6" r="3.5" stroke="#D4AF37" strokeWidth="2.5" />
    <path d="M24 9.5V14" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
    {/* Bell dome */}
    <path 
      d="M14 26C14 18 18 14 24 14C30 14 34 18 34 26C34 30 38 33 39 35C39.5 36 38.5 37 37 37H11C9.5 37 8.5 36 9 35C10 33 14 30 14 26Z" 
      fill="url(#goldBellGrad)" 
      stroke="#996515" 
      strokeWidth="1.5"
    />
    {/* Decorative belt rings */}
    <path d="M12.5 33C16 34.5 32 34.5 35.5 33" stroke="#8A5A00" strokeWidth="1.5" />
    {/* Clapper hanging below */}
    <circle cx="24" cy="40" r="3" fill="#B8860B" stroke="#664600" strokeWidth="1" />
    <path d="M24 37V39" stroke="#664600" strokeWidth="2" />
    
    <defs>
      <linearGradient id="goldBellGrad" x1="12" y1="14" x2="36" y2="37" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE082" />
        <stop offset="0.4" stopColor="#E5B839" />
        <stop offset="0.8" stopColor="#D4AF37" />
        <stop offset="1" stopColor="#A67C1E" />
      </linearGradient>
    </defs>
  </svg>
);

export const DiyaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Flame glow */}
    <ellipse cx="24" cy="15" rx="5" ry="9" fill="url(#flameGlow)" opacity="0.4" />
    {/* Flame */}
    <path 
      d="M24 5C24 5 18 14 18 19C18 22.3 20.7 25 24 25C27.3 25 30 22.3 30 19C30 14 24 5 24 5Z" 
      fill="url(#flameGrad)" 
    />
    {/* Inner flame core */}
    <path 
      d="M24 12C24 12 21 16 21 19C21 20.7 22.3 22 24 22C25.7 22 27 20.7 27 19C27 16 24 12 24 12Z" 
      fill="#FFF9E6" 
    />
    {/* Clay / Brass Lamp Base */}
    <path 
      d="M8 26C10 35 18 39 24 39C30 39 38 35 40 26C36 29 28 31 24 31C20 31 12 29 8 26Z" 
      fill="url(#brassLampGrad)" 
      stroke="#8B4513" 
      strokeWidth="1.2"
    />
    <ellipse cx="24" cy="26" rx="16" ry="3.5" fill="#5C2C16" />
    {/* Stand */}
    <path d="M21 39H27V43H21V39Z" fill="#8B4513" />
    <path d="M16 43H32C32 44.5 30 46 24 46C18 46 16 44.5 16 43Z" fill="#5C2C16" />

    <defs>
      <radialGradient id="flameGlow" cx="24" cy="15" r="9" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFA000" stopOpacity="0.9" />
        <stop offset="1" stopColor="#FF6F00" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="flameGrad" x1="24" y1="5" x2="24" y2="25" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF176" />
        <stop offset="0.5" stopColor="#FF9800" />
        <stop offset="1" stopColor="#E65100" />
      </linearGradient>
      <linearGradient id="brassLampGrad" x1="8" y1="26" x2="40" y2="39" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E5B839" />
        <stop offset="0.5" stopColor="#C59B27" />
        <stop offset="1" stopColor="#8A6414" />
      </linearGradient>
    </defs>
  </svg>
);

export const LotusIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Central Petal */}
    <path 
      d="M24 8C20 18 20 28 24 36C28 28 28 18 24 8Z" 
      fill="url(#lotusGradCenter)" 
    />
    {/* Inner Left Petal */}
    <path 
      d="M24 16C16 20 13 29 18 36C21 32 23 25 24 16Z" 
      fill="url(#lotusGradSide)" 
    />
    {/* Inner Right Petal */}
    <path 
      d="M24 16C32 20 35 29 30 36C27 32 25 25 24 16Z" 
      fill="url(#lotusGradSide)" 
    />
    {/* Outer Left Petal */}
    <path 
      d="M18 24C9 28 6 34 11 39C16 38 18 32 18 24Z" 
      fill="url(#lotusGradOuter)" 
    />
    {/* Outer Right Petal */}
    <path 
      d="M30 24C39 28 42 34 37 39C32 38 30 32 30 24Z" 
      fill="url(#lotusGradOuter)" 
    />
    {/* Base Calyx */}
    <path d="M16 38C20 40 28 40 32 38C30 42 18 42 16 38Z" fill="#2E7D32" />

    <defs>
      <linearGradient id="lotusGradCenter" x1="24" y1="8" x2="24" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF80AB" />
        <stop offset="0.7" stopColor="#F50057" />
        <stop offset="1" stopColor="#C51162" />
      </linearGradient>
      <linearGradient id="lotusGradSide" x1="24" y1="16" x2="24" y2="36" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF4081" />
        <stop offset="1" stopColor="#AD1457" />
      </linearGradient>
      <linearGradient id="lotusGradOuter" x1="24" y1="24" x2="24" y2="39" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F48FB1" />
        <stop offset="1" stopColor="#880E4F" />
      </linearGradient>
    </defs>
  </svg>
);

export const TempleEmblem: React.FC<{ className?: string; alt?: string }> = ({ 
  className = 'w-10 h-10', 
  alt = 'Sri Sridevi Bhudevi Sametha Sri Thirumalanadha Swamy Devasthanam Logo' 
}) => (
  <img 
    src="/images/logo-new.png" 
    onError={(e) => {
      (e.target as HTMLImageElement).src = '/images/sbst-logo.png';
    }}
    alt={alt} 
    className={`${className} object-contain filter drop-shadow-md select-none`}
    referrerPolicy="no-referrer"
    loading="eager"
  />
);

export const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-r from-transparent to-[#D4AF37]" />
    <span className="text-[#F3CE72] text-xs">✦</span>
    <DiyaIcon className="w-5 h-5 text-[#D4AF37]" />
    <span className="text-[#F3CE72] text-xs">✦</span>
    <div className="h-[1px] w-12 sm:w-24 bg-gradient-to-l from-transparent to-[#D4AF37]" />
  </div>
);

export const VaishnavaTirunamam: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Golden Halo Behind */}
    <circle cx="50" cy="50" r="42" fill="url(#haloGrad)" opacity="0.25" />
    
    {/* Left White Sacred Urdhva Pundra Streak */}
    <path 
      d="M32 18 C32 18 26 36 28 58 C30 68 38 78 44 82 L44 68 C39 65 35 58 35 48 C35 36 38 24 38 20 Z" 
      fill="url(#sacredWhiteGrad)" 
      stroke="#D4AF37" 
      strokeWidth="1.2" 
    />

    {/* Right White Sacred Urdhva Pundra Streak */}
    <path 
      d="M68 18 C68 18 74 36 72 58 C70 68 62 78 56 82 L56 68 C61 65 65 58 65 48 C65 36 62 24 62 20 Z" 
      fill="url(#sacredWhiteGrad)" 
      stroke="#D4AF37" 
      strokeWidth="1.2" 
    />

    {/* Center Sacred Sri Lakshmi Kasturi Red Tilak (సిందూర తిలకం) */}
    <path 
      d="M48 24 C48 24 46 45 47 62 C48 72 50 86 50 86 C50 86 52 72 53 62 C54 45 52 24 52 24 Z" 
      fill="url(#sindoorRedGrad)" 
      stroke="#FFD54F" 
      strokeWidth="0.8" 
    />

    {/* Gold Base Lotus Paduka */}
    <path 
      d="M42 82 Q50 88 58 82 L55 86 Q50 90 45 86 Z" 
      fill="#F3CE72" 
      stroke="#AA820A" 
      strokeWidth="1" 
    />

    <defs>
      <radialGradient id="haloGrad" cx="50" cy="50" r="40" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE082" />
        <stop offset="1" stopColor="#B8860B" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sacredWhiteGrad" x1="0" y1="20" x2="0" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="0.8" stopColor="#F5EDE0" />
        <stop offset="1" stopColor="#E6D3B3" />
      </linearGradient>
      <linearGradient id="sindoorRedGrad" x1="50" y1="24" x2="50" y2="86" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF1744" />
        <stop offset="0.5" stopColor="#D50000" />
        <stop offset="1" stopColor="#8A0010" />
      </linearGradient>
    </defs>
  </svg>
);

export const SankhaIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sacred Panchajanya Conch Shell */}
    <ellipse cx="24" cy="24" rx="16" ry="16" fill="url(#sankhaGlow)" opacity="0.25" />
    <path
      d="M14 26 C12 21 16 13 24 11 C31 9 37 13 37 19 C37 25 32 30 26 34 C21 37 15 37 12 34 C10 32 10 29 12 27 C14 25 18 25 21 27 C24 29 27 28 29 26 C31 23 31 19 28 17 C25 15 20 16 17 19 C15 21 14 24 14 26 Z"
      fill="url(#sankhaGrad)"
      stroke="#D4AF37"
      strokeWidth="1.2"
    />
    <path d="M24 11 C26 14 28 18 29 23" stroke="#F3CE72" strokeWidth="1" strokeLinecap="round" />
    <path d="M19 16 C22 19 23 23 23 28" stroke="#F3CE72" strokeWidth="0.8" strokeLinecap="round" />
    <circle cx="36" cy="18" r="1.5" fill="#FFE58F" />
    <defs>
      <radialGradient id="sankhaGlow" cx="24" cy="24" r="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFE082" />
        <stop offset="1" stopColor="#B8860B" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="sankhaGrad" x1="12" y1="11" x2="36" y2="35" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFFFFF" />
        <stop offset="0.6" stopColor="#FFF4D6" />
        <stop offset="1" stopColor="#E0B85C" />
      </linearGradient>
    </defs>
  </svg>
);

export const ChakraIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sudarshana Chakra */}
    <circle cx="24" cy="24" r="18" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="24" cy="24" r="14" fill="url(#chakraGrad)" stroke="#FFE58F" strokeWidth="1.2" />
    <circle cx="24" cy="24" r="5" fill="#5B101D" stroke="#FFE58F" strokeWidth="1" />
    <circle cx="24" cy="24" r="2" fill="#FFE58F" />
    {/* Flame Spokes / Serrations */}
    <path d="M24 6 L26 10 L24 10 Z" fill="#FFC107" />
    <path d="M24 42 L22 38 L24 38 Z" fill="#FFC107" />
    <path d="M6 24 L10 22 L10 24 Z" fill="#FFC107" />
    <path d="M42 24 L38 26 L38 24 Z" fill="#FFC107" />
    <path d="M11 11 L15 13 L13 15 Z" fill="#FFC107" />
    <path d="M37 37 L33 35 L35 33 Z" fill="#FFC107" />
    <path d="M37 11 L35 15 L33 13 Z" fill="#FFC107" />
    <path d="M11 37 L13 33 L15 35 Z" fill="#FFC107" />
    <defs>
      <radialGradient id="chakraGrad" cx="24" cy="24" r="14" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFF59D" />
        <stop offset="0.6" stopColor="#F5B041" />
        <stop offset="1" stopColor="#B7791F" />
      </radialGradient>
    </defs>
  </svg>
);
