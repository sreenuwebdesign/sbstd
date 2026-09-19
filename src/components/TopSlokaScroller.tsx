import React, { useState, useEffect } from 'react';
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

export const TopSlokaScroller: React.FC<TopSlokaScrollerProps> = ({ currentLang }) => {
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
        return <VaishnavaTirunamam className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-90" />;
      case 'sankha':
        return <SankhaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-90" />;
      case 'chakra':
        return <ChakraIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-90" />;
      case 'lotus':
        return <LotusIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-90" />;
      case 'diya':
        return <DiyaIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-90" />;
      default:
        return <VaishnavaTirunamam className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 opacity-90" />;
    }
  };

  return (
    <div 
      id="top-sloka-scroller"
      className="relative z-40 border-b border-[#D4AF37]/25 text-white sm:text-[#f3d47a] select-none py-0.5 sm:py-1 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #5b0b17 0%, var(--primary-red) 50%, #5b0b17 100%)',
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Venkateswara Swamy Sloka"
    >
      <div className="max-w-5xl mx-auto px-2 sm:px-4 flex items-center justify-center">
        {/* Center: Concise short sloka, icon beside it, small regular font, no arrows, no slide numbers */}
        <div className="w-full text-center overflow-hidden">
          <div 
            key={activeSloka.id}
            className="inline-flex items-center justify-center gap-1.5 animate-sloka-fade transition-all duration-300 max-w-full px-2"
          >
            {renderIcon(activeSloka.iconType)}
            <p className="font-poppins font-normal lowercase text-[9.5px] xs:text-[10px] sm:text-[11px] text-white sm:text-[#f3d47a] tracking-normal leading-tight truncate sm:whitespace-normal">
              {currentLang === 'te' ? activeSloka.slokaTe : activeSloka.slokaEn}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
