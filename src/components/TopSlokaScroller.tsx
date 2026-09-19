import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { Language } from '../types';
import { 
  VaishnavaTirunamam, 
  SankhaIcon, 
  ChakraIcon, 
  LotusIcon, 
  DiyaIcon 
} from './TempleMotifs';
import { chantAudio } from '../utils/chantAudio';

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
  const [isChantPlaying, setIsChantPlaying] = useState(false);

  // Sync with audio engine state
  useEffect(() => {
    setIsChantPlaying(chantAudio.isChantPlaying());
    const unsub = chantAudio.addListener((playing) => {
      setIsChantPlaying(playing);
    });
    return unsub;
  }, []);

  // Auto-scroll one by one every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % VENKATESWARA_SLOKAS.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const activeSloka = VENKATESWARA_SLOKAS[currentIndex];

  const handleToggleChant = () => {
    chantAudio.toggleChant();
  };

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
      className="relative z-40 bg-gradient-to-r from-[#170204] via-[#280509] to-[#170204] border-b border-[#D4AF37]/20 text-[#E8DCC0] select-none py-0.5 sm:py-1 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Venkateswara Swamy Sloka"
    >
      <div className="max-w-6xl mx-auto px-2 sm:px-4 flex items-center justify-between gap-1.5">
        
        {/* Placeholder spacer for visual balance */}
        <div className="w-12 sm:w-16 hidden xs:block" />

        {/* Center: Concise short sloka, icon beside it, small regular font */}
        <div className="flex-1 min-w-0 text-center overflow-hidden">
          <div 
            key={activeSloka.id}
            className="inline-flex items-center justify-center gap-1.5 animate-sloka-fade transition-all duration-300 max-w-full px-1"
          >
            {renderIcon(activeSloka.iconType)}
            <p className="font-poppins font-normal lowercase text-[9.5px] xs:text-[10px] sm:text-[11px] text-[#EDE0CB] tracking-normal leading-tight truncate sm:whitespace-normal">
              {currentLang === 'te' ? activeSloka.slokaTe : activeSloka.slokaEn}
            </p>
          </div>
        </div>

        {/* Right: Low Sound Background Music (Om Namo Venkatesaya Chant) */}
        <div className="shrink-0">
          <button
            onClick={handleToggleChant}
            className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-[#4A0B14]/70 hover:bg-[#68101E] border border-[#D4AF37]/35 text-[#FFE58F] text-[9px] sm:text-[10px] font-normal transition-colors"
            title={isChantPlaying ? 'Pause Chant Music' : 'Play Om Namo Venkatesaya Chant (Low Sound)'}
            aria-label="Toggle Om Namo Venkatesaya Chant Music"
          >
            {isChantPlaying ? (
              <>
                <Volume2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFE58F] animate-pulse" />
                <span className="hidden xs:inline">{currentLang === 'te' ? 'జపం చాలు' : 'chant on'}</span>
              </>
            ) : (
              <>
                <VolumeX className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#FFE58F]/60" />
                <span className="hidden xs:inline">{currentLang === 'te' ? 'జప సంగీతం' : 'chant'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
