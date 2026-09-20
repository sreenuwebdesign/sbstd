import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';
import { 
  VaishnavaTirunamam, 
  SankhaIcon, 
  ChakraIcon, 
  LotusIcon, 
  DiyaIcon 
} from './TempleMotifs';

interface TopSlokaScrollerProps {
  currentLang: Language;
  onToggleLang?: () => void;
}

interface SlokaItem {
  id: number;
  slokaEn: string;
  slokaTe: string;
  iconType: 'tirunamam' | 'sankha' | 'chakra' | 'lotus' | 'diya';
}

// Concise, short, sacred verses of Lord Venkateswara
const VENKATESWARA_SLOKAS: SlokaItem[] = [
  {
    id: 1,
    slokaEn: 'kalyanadbhuta gatraya srinivasaya te namah ||',
    slokaTe: 'కల్యాణాద్భుత గాత్రాయ శ్రీనివాసాయ తే నమః ||',
    iconType: 'tirunamam',
  },
  {
    id: 2,
    slokaEn: 'suklambaradharam vishnum prasanna vadanam dhyayet ||',
    slokaTe: 'శుక్లాంబరధరం విష్ణుం ప్రసన్నవదనం ధ్యాయేత్ ||',
    iconType: 'sankha',
  },
  {
    id: 3,
    slokaEn: 'vina venkatesam na natho na nathah ||',
    slokaTe: 'వినా వేంకటేశం న నాథో న నాథః ||',
    iconType: 'chakra',
  },
  {
    id: 4,
    slokaEn: 'venkateso samo devo na bhuto na bhavishyati ||',
    slokaTe: 'వేంకటేశో సమో దేవో న భూతో న భవిష్యతి ||',
    iconType: 'lotus',
  },
  {
    id: 5,
    slokaEn: 'sri venkatanivasaya srinivasaya mangalam ||',
    slokaTe: 'శ్రీవేంకటనివాసాయ శ్రీనివాసాయ మంగళమ్ ||',
    iconType: 'diya',
  },
  {
    id: 6,
    slokaEn: 'om namo venkatesaya namo narayanaya ||',
    slokaTe: 'ఓం నమో వేంకటేశాయ నమో నారాయణాయ ||',
    iconType: 'tirunamam',
  },
];

export const TopSlokaScroller: React.FC<TopSlokaScrollerProps> = ({ 
  currentLang,
  onToggleLang,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-scroll one by one every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VENKATESWARA_SLOKAS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSloka = VENKATESWARA_SLOKAS[currentIndex];

  const renderIcon = (type: SlokaItem['iconType']) => {
    switch (type) {
      case 'tirunamam':
        return <VaishnavaTirunamam className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-95" />;
      case 'sankha':
        return <SankhaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-95" />;
      case 'chakra':
        return <ChakraIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-95" />;
      case 'lotus':
        return <LotusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-95" />;
      case 'diya':
        return <DiyaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-95" />;
      default:
        return <VaishnavaTirunamam className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-95" />;
    }
  };

  return (
    <div 
      id="top-header-bar"
      className="relative z-40 border-b border-[#D4AF37]/30 text-white select-none py-1 sm:py-1.5 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #5b0b17 0%, var(--primary-red) 50%, #5b0b17 100%)',
      }}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left Side: Sacred Sloka Slide */}
        <div 
          className="flex-1 min-w-0 flex items-center overflow-hidden cursor-default"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          role="region"
          aria-label="Venkateswara Swamy Sloka"
        >
          <div 
            key={activeSloka.id}
            className="inline-flex items-center gap-1.5 sm:gap-2 animate-sloka-fade transition-all duration-300 min-w-0"
          >
            {renderIcon(activeSloka.iconType)}
            <p className="font-poppins font-normal lowercase text-[10px] sm:text-[11.5px] md:text-xs text-[#f3d47a] tracking-normal leading-tight truncate">
              {currentLang === 'te' ? activeSloka.slokaTe : activeSloka.slokaEn}
            </p>
          </div>
        </div>

        {/* Right Side: Language Translator Switcher */}
        {onToggleLang && (
          <div className="shrink-0 flex items-center">
            <button
              id="top-language-switcher-btn"
              type="button"
              onClick={onToggleLang}
              className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-[#6A1220] hover:bg-[#831828] border border-[#D4AF37]/50 text-[10px] sm:text-[11px] font-medium text-[#FFE58F] hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#FFE58F]/50"
              aria-label={currentLang === 'en' ? 'Switch to Telugu language' : 'Switch to English language'}
              title={currentLang === 'en' ? 'తెలుగులోకి మార్చండి' : 'Switch to English'}
            >
              <Globe className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#F3CE72] shrink-0" />
              <span className="font-poppins tracking-wide">
                {currentLang === 'en' ? 'తెలుగు' : 'English'}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
