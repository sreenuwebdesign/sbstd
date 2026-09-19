import React, { useState } from 'react';
import { BookOpen, Music, Bell, Sparkles, Volume2, Play, Pause, AlertCircle, CheckCircle } from 'lucide-react';
import { Language, DevotionalSloka, BhajanItem, TempleAnnouncement } from '../types';
import { DEVOTIONAL_SLOKAS, BHAJANS, ANNOUNCEMENTS, TEMPLE_INFO } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon, LotusIcon } from './TempleMotifs';
import { templeAudio } from '../utils/audio';

interface DevotionalContentProps {
  currentLang: Language;
}

export const DevotionalContent: React.FC<DevotionalContentProps> = ({ currentLang }) => {
  const [activeTab, setActiveTab] = useState<'slokas' | 'bhajans' | 'announcements'>('slokas');
  const [activeBhajanPlaying, setActiveBhajanPlaying] = useState<string | null>(null);

  const handlePlayBhajan = (id: string) => {
    if (activeBhajanPlaying === id) {
      setActiveBhajanPlaying(null);
    } else {
      setActiveBhajanPlaying(id);
      templeAudio.playTempleBell();
    }
  };

  return (
    <section id="devotional" className="py-20 bg-gradient-to-b from-[#F5EBD9] via-[#FAF6EE] to-[#FAF6EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD8BA] text-[#5B101D] text-xs font-semibold tracking-wider uppercase mb-3">
            <DiyaIcon className="w-4 h-4" />
            <span>{currentLang === 'te' ? 'నిత్య ధ్యానం & ఆధ్యాత్మిక సంపద' : 'Daily Devotional Treasury'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif-temple font-bold text-[#4A0E17] tracking-tight">
            {currentLang === 'te' ? 'స్తోత్రాలు, భజనలు & ఆలయ ప్రకటనలు' : 'Slokas, Mantras & Bhajans'}
          </h2>
          <OrnamentalDivider />
          <p className="text-[#5D4037] text-xs sm:text-sm md:text-[14.5px] leading-relaxed">
            {currentLang === 'te'
              ? 'ప్రతిరోజూ పారాయణ చేయవలసిన పవిత్ర శ్లోకాలు, భజనా గీతాలు మరియు ఆలయ తాజా సమాచారం.'
              : 'Enrich your spiritual journey with daily uplifting slokas, sanctified mantras, bhajans, and official temple updates.'}
          </p>
        </div>

        {/* Daily Devotional Message Hero Banner */}
        <div className="mb-14 rounded-3xl bg-gradient-to-r from-[#4A0E17] via-[#5B101D] to-[#36080F] text-white p-6 sm:p-10 border-2 border-[#D4AF37]/50 shadow-xl relative overflow-hidden">
          {/* Authentic Temple Sanctum Background Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-right opacity-15 pointer-events-none"
            style={{
              backgroundImage: `url('/images/temple-garbhagriha.svg')`
            }}
          />
          <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
            <LotusIcon className="w-64 h-64 text-[#FFE58F]" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            <div className="md:col-span-9">
              <div className="flex items-center gap-2.5 text-xs uppercase font-bold tracking-widest text-[#E5B839] mb-2">
                <Sparkles className="w-4 h-4 text-[#FFE58F]" />
                <span>{currentLang === 'te' ? 'నేటి ఆధ్యాత్మిక సందేశం' : "Today's Sacred Devotional Message"}</span>
              </div>
              
              <h3 className="text-xl sm:text-2xl md:text-3xl font-telugu text-[#FFE58F] font-bold leading-relaxed mb-3">
                {currentLang === 'te'
                  ? '"సకల జీవులలో భగవంతుని దర్శించడమే నిజమైన భక్తి. స్వార్థరహిత సేవా భావమే పరమ మోక్షానికి రాజమార్గం."'
                  : '"Perceiving divinity in all living beings is true devotion. Selfless service to humanity is the supreme pathway to eternal peace."'}
              </h3>

              <p className="text-xs sm:text-sm text-[#E8DCC0] font-light leading-relaxed">
                {currentLang === 'te'
                  ? `${TEMPLE_INFO.nameTe} ప్రధాన అర్చకుల ఆశీర్వచనములు • సత్కర్మలు మరియు భగవన్నామ స్మరణతో ఈ రోజును ధన్యము చేసుకోండి.`
                  : `Blessed guidance from the Chief Archaka of ${TEMPLE_INFO.nameEn}. May this sacred day be illuminated with peace, compassion, and divine grace.`}
              </p>
            </div>

            {/* Sacred Deity Medallion on Message */}
            <div className="md:col-span-3 hidden md:flex justify-center">
              <div className="relative w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-[#D4AF37] to-[#FFF2C6] shadow-xl">
                <img
                  src="/images/god-venkateswara.svg"
                  alt="Temple Sanctum Blessing"
                  referrerPolicy="no-referrer"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center justify-start sm:justify-center flex-nowrap sm:flex-wrap overflow-x-auto no-scrollbar gap-2 sm:gap-3 mb-8 sm:mb-10 pb-2 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            id="tab-slokas"
            onClick={() => setActiveTab('slokas')}
            className={`shrink-0 whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 ${
              activeTab === 'slokas'
                ? 'bg-[#5B101D] text-[#FFE58F] shadow-lg border border-[#D4AF37]/50'
                : 'bg-white text-[#5D4037] hover:bg-[#FAF2E1] border border-[#E8DCC0]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{currentLang === 'te' ? 'పవిత్ర శ్లోకాలు' : 'Sacred Slokas'}</span>
          </button>

          <button
            id="tab-bhajans"
            onClick={() => setActiveTab('bhajans')}
            className={`shrink-0 whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 ${
              activeTab === 'bhajans'
                ? 'bg-[#5B101D] text-[#FFE58F] shadow-lg border border-[#D4AF37]/50'
                : 'bg-white text-[#5D4037] hover:bg-[#FAF2E1] border border-[#E8DCC0]'
            }`}
          >
            <Music className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{currentLang === 'te' ? 'భజనలు & సంకీర్తనలు' : 'Bhajans & Kirtans'}</span>
          </button>

          <button
            id="tab-announcements"
            onClick={() => setActiveTab('announcements')}
            className={`shrink-0 whitespace-nowrap px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5 sm:gap-2 ${
              activeTab === 'announcements'
                ? 'bg-[#5B101D] text-[#FFE58F] shadow-lg border border-[#D4AF37]/50'
                : 'bg-white text-[#5D4037] hover:bg-[#FAF2E1] border border-[#E8DCC0]'
            }`}
          >
            <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>{currentLang === 'te' ? 'ఆలయ ప్రకటనలు' : 'Announcements'}</span>
          </button>
        </div>

        {/* Tab 1: Sacred Slokas & Mantras */}
        {activeTab === 'slokas' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEVOTIONAL_SLOKAS.map((sloka) => (
              <div
                key={sloka.id}
                className="p-6 rounded-2xl bg-white border border-[#E8DCC0] hover:border-[#D4AF37] shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-bold text-[#C25E00] uppercase tracking-wider">
                      {sloka.deity}
                    </span>
                    <button
                      onClick={() => templeAudio.playTempleBell()}
                      title="Chant with Bell resonance"
                      className="p-1.5 rounded-full bg-[#FAF2E1] text-[#8A5A00] hover:bg-[#FFE29F] transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <h4 className="text-lg font-serif-temple font-bold text-[#4A0E17] mb-4">
                    {currentLang === 'te' ? sloka.titleTe : sloka.titleEn}
                  </h4>

                  {/* Sacred Telugu Sloka Script */}
                  <div className="p-4 rounded-xl bg-[#FFF9E6] border border-[#FFE29F] text-[#4A0E17] font-telugu font-semibold text-sm sm:text-base whitespace-pre-line leading-relaxed mb-4">
                    {sloka.slokaTe}
                  </div>

                  {/* Transliteration */}
                  <div className="text-xs text-[#734A12] italic whitespace-pre-line mb-4 border-l-2 border-[#D4AF37] pl-3">
                    {sloka.slokaEn}
                  </div>

                  {/* Spiritual Meaning */}
                  <div>
                    <span className="text-[11px] font-bold uppercase text-[#8A5A00] block mb-1">
                      {currentLang === 'te' ? 'తాత్పర్యం / భావం:' : 'Spiritual Meaning:'}
                    </span>
                    <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
                      {currentLang === 'te' ? sloka.meaningTe : sloka.meaningEn}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E8DCC0] flex items-center justify-between text-xs text-[#8A5A00]">
                  <span>{currentLang === 'te' ? 'నిత్య పారాయణ శ్లోకం' : 'Daily Recitation'}</span>
                  <span className="text-[#2E7D32] font-semibold">✓ {currentLang === 'te' ? 'ప్రామాణికం' : 'Authentic'}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Bhajans & Kirtans */}
        {activeTab === 'bhajans' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {BHAJANS.map((bhajan) => {
              const isPlaying = activeBhajanPlaying === bhajan.id;
              return (
                <div
                  key={bhajan.id}
                  className="p-6 rounded-2xl bg-white border border-[#E8DCC0] hover:border-[#D4AF37] shadow-md hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <span className="text-[11px] font-bold text-[#C25E00] uppercase tracking-wider">
                        {currentLang === 'te' ? `రాగం: ${bhajan.raga}` : `Raga: ${bhajan.raga}`}
                      </span>
                      <h4 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                        {currentLang === 'te' ? bhajan.titleTe : bhajan.titleEn}
                      </h4>
                    </div>

                    <button
                      onClick={() => handlePlayBhajan(bhajan.id)}
                      className={`p-3 rounded-full shadow-md transition-all flex items-center justify-center ${
                        isPlaying
                          ? 'bg-[#C25E00] text-white scale-105'
                          : 'bg-[#5B101D] text-[#FFE58F] hover:bg-[#731A28]'
                      }`}
                    >
                      {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                    </button>
                  </div>

                  {isPlaying && (
                    <div className="mb-4 p-3 rounded-xl bg-[#FFF9E6] border border-[#FFE29F] flex items-center justify-between text-xs text-[#8A5A00] animate-pulse">
                      <span>🎵 {currentLang === 'te' ? 'భక్తి గీతం ఆలపిస్తున్నారు...' : 'Playing sacred devotional melody...'}</span>
                      <span className="font-bold">{bhajan.duration}</span>
                    </div>
                  )}

                  {/* Lyrics Box */}
                  <div className="p-4 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0] text-[#4A0E17] font-telugu text-sm leading-relaxed whitespace-pre-line mb-3">
                    {bhajan.lyricsTe}
                  </div>

                  <div className="text-xs text-[#5D4037] italic whitespace-pre-line border-l-2 border-[#D4AF37] pl-3">
                    {bhajan.lyricsEn}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 3: Temple Announcements */}
        {activeTab === 'announcements' && (
          <div className="space-y-4 max-w-4xl mx-auto">
            {ANNOUNCEMENTS.map((ann) => (
              <div
                key={ann.id}
                className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E8DCC0] shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row items-start justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF2E1] text-[#8A5A00] border border-[#FFE29F]">
                      {ann.date}
                    </span>
                    {ann.isUrgent && (
                      <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#FFEBEE] text-[#C62828] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {currentLang === 'te' ? 'ముఖ్య సూచన' : 'Important Notice'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-lg font-serif-temple font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? ann.titleTe : ann.titleEn}
                  </h4>

                  <p className="text-sm text-[#5D4037] leading-relaxed">
                    {currentLang === 'te' ? ann.contentTe : ann.contentEn}
                  </p>
                </div>

                <div className="shrink-0 self-end sm:self-center">
                  <span className="text-xs text-[#8A5A00] font-semibold bg-[#FAF6EE] px-3 py-1.5 rounded-lg border border-[#E8DCC0]">
                    {currentLang === 'te' ? 'ఆలయ కార్యాలయం' : 'Temple Trust Office'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
