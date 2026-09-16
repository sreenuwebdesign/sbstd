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

export const TempleEmblem: React.FC<{ className?: string }> = ({ className = 'w-10 h-10' }) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Sacred Circle with Sun Rays */}
    <circle cx="32" cy="32" r="30" stroke="#D4AF37" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="32" cy="32" r="27" fill="#4A0E17" stroke="#E5B839" strokeWidth="1.5" />
    
    {/* Gopuram Silhouette in Gold */}
    {/* Kalasha crest */}
    <path d="M32 10L33 13H31L32 10Z" fill="#FFE58F" />
    <circle cx="32" cy="13.5" r="1.5" fill="#FFE58F" />
    {/* Tier 1 */}
    <path d="M28 15H36L35 19H29L28 15Z" fill="#D4AF37" />
    {/* Tier 2 */}
    <path d="M25 19H39L38 24H26L25 19Z" fill="#E5B839" />
    {/* Tier 3 */}
    <path d="M22 24H42L41 30H23L22 24Z" fill="#D4AF37" />
    {/* Tier 4 */}
    <path d="M19 30H45L44 38H20L19 30Z" fill="#C59B27" />
    {/* Gateway arch */}
    <path d="M16 38H48V50H16V38Z" fill="#B8860B" />
    <path d="M27 50V43C27 40.5 29.5 39 32 39C34.5 39 37 40.5 37 43V50H27Z" fill="#36080F" />

    {/* Flanking Namam / Conches symbol */}
    <circle cx="21" cy="44" r="1.5" fill="#FFE58F" />
    <circle cx="43" cy="44" r="1.5" fill="#FFE58F" />
  </svg>
);

export const OrnamentalDivider: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center justify-center gap-3 my-4 ${className}`}>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-[#D4AF37]" />
    <span className="text-[#D4AF37] text-sm">✦</span>
    <DiyaIcon className="w-5 h-5 text-[#D4AF37]" />
    <span className="text-[#D4AF37] text-sm">✦</span>
    <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-[#D4AF37]" />
  </div>
);
