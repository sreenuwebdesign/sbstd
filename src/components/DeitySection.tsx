import React, { useState } from 'react';
import { Sparkles, Sun, Moon, Flame, Shield, Flower2, HeartHandshake, Eye } from 'lucide-react';
import { Language } from '../types';
import { TEMPLE_INFO, DEITY_PROFILES } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon, LotusIcon } from './TempleMotifs';

interface DeitySectionProps {
  currentLang: Language;
  onOpenPooja: () => void;
  onOpenDonate: () => void;
}

export const DeitySection: React.FC<DeitySectionProps> = ({
  currentLang,
  onOpenPooja,
  onOpenDonate,
}) => {
  const [selectedDeityIndex, setSelectedDeityIndex] = useState(0);
  const activeDeity = DEITY_PROFILES[selectedDeityIndex] || DEITY_PROFILES[0];

  return (
    <section id="deity" className="py-20 bg-gradient-to-b from-[#2E070B] via-[#420B12] to-[#2B060A] text-[#FDF8F0] relative overflow-hidden">
      {/* Background Sacred Ambient Lights */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#FF9800]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5E141F] border border-[#D4AF37]/40 text-[#FFE58F] text-xs font-semibold tracking-wider uppercase mb-3">
            <LotusIcon className="w-4 h-4 text-[#FF80AB]" />
            <span>{currentLang === 'te' ? 'దేవతామూర్తుల దివ్య దర్శనం' : 'Sacred Deity Sanctum'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif-temple font-bold text-[#FFF2C6] tracking-tight">
            {currentLang === 'te' ? `శ్రీ ${TEMPLE_INFO.deityNameTe} క్షేత్రం` : `Sri ${TEMPLE_INFO.deityNameEn}`}
          </h2>
          <OrnamentalDivider />
          <p className="text-[#E8DCC0] text-xs sm:text-sm md:text-[14.5px] leading-relaxed">
            {currentLang === 'te'
              ? 'కలియుగ ప్రత్యక్ష దైవమైన శ్రీ వేంకటేశ్వర స్వామి మరియు జగన్మాత శ్రీ పద్మావతి దేవి దివ్య మంగళ స్వరూపాల దర్శన భాగ్యం.'
              : 'Revered as the supreme benevolent guardians, granting peace, protection, and prosperity upon all devout seekers who surrender with a pure heart.'}
          </p>

          {/* Deity Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-8">
            {DEITY_PROFILES.map((deity, idx) => (
              <button
                key={deity.id}
                id={`deity-tab-${deity.id}`}
                onClick={() => setSelectedDeityIndex(idx)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center gap-2 border ${
                  selectedDeityIndex === idx
                    ? 'bg-gradient-to-r from-[#D4AF37] to-[#E5B839] text-[#360910] border-[#FFF5CC] shadow-lg scale-105'
                    : 'bg-[#3D0A11]/80 hover:bg-[#5E141F] text-[#FFE29F] border-[#D4AF37]/40'
                }`}
              >
                <DiyaIcon className={`w-3.5 h-3.5 ${selectedDeityIndex === idx ? 'text-[#360910]' : 'text-[#FFE58F]'}`} />
                <span>{currentLang === 'te' ? deity.nameTe.split(' ')[0] + ' ' + (deity.nameTe.split(' ')[1] || '') : deity.nameEn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Large Premium Devotional Card */}
        <div className="rounded-3xl bg-gradient-to-br from-[#380A11]/90 via-[#4A0E17]/80 to-[#2A060A]/95 border-2 border-[#D4AF37]/50 shadow-2xl overflow-hidden p-6 sm:p-10 lg:p-12 relative divine-glow-lg">
          
          {/* Subtle Golden Pattern Background Overlay */}
          <div className="absolute inset-0 pattern-temple-border opacity-5 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Consecrated Deity Visual Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#FFE58F]/60 shadow-2xl group">
                <img
                  src={activeDeity.imageUrl}
                  alt={currentLang === 'te' ? activeDeity.nameTe : activeDeity.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-72 sm:h-[420px] lg:h-[500px] object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-95 contrast-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-transparent to-transparent opacity-80" />

                {/* Floating Mantra Banner */}
                <div className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-[#280408]/90 backdrop-blur-md border border-[#D4AF37]/40 text-center shadow-lg">
                  <p className="text-[10px] sm:text-xs uppercase tracking-widest text-[#E5B839] font-medium mb-1">
                    {currentLang === 'te' ? 'దివ్య నామ సంకీర్తన' : 'Maha Moola Mantra'}
                  </p>
                  <p className="font-serif-temple text-sm sm:text-base font-bold text-[#FFE58F] leading-snug">
                    "{currentLang === 'te' ? activeDeity.mantraTe : activeDeity.mantraEn}"
                  </p>
                </div>
              </div>

              {/* Deity Mini-Thumbnail Previews */}
              <div className="grid grid-cols-3 gap-2.5 mt-4">
                {DEITY_PROFILES.map((deity, idx) => (
                  <button
                    key={`thumb-${deity.id}`}
                    onClick={() => setSelectedDeityIndex(idx)}
                    className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all group ${
                      selectedDeityIndex === idx
                        ? 'border-[#FFE58F] ring-2 ring-[#E5B839] scale-105'
                        : 'border-[#D4AF37]/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={deity.imageUrl}
                      alt={deity.nameEn}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-1.5">
                      <span className="text-[10px] text-[#FFE58F] font-semibold truncate w-full text-center">
                        {currentLang === 'te' ? deity.nameTe.split(' ')[1] || deity.nameTe : deity.nameEn.split(' ')[1] || deity.nameEn}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: Detailed Spiritual Information */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Deity Title & Spiritual Description */}
              <div>
                <span className="text-xs uppercase tracking-widest text-[#E5B839] font-bold">
                  {currentLang === 'te' ? activeDeity.titleTe : activeDeity.titleEn}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif-temple font-bold text-[#FFF5CC] mt-1 mb-3">
                  {currentLang === 'te' ? activeDeity.nameTe : activeDeity.nameEn}
                </h3>
                <p className="text-[#E8DCC0] text-sm sm:text-base leading-relaxed">
                  {currentLang === 'te' ? activeDeity.significanceTe : activeDeity.significanceEn}
                </p>
              </div>

              {/* Sacred Alankaram Highlight Strip */}
              <div className="p-4 rounded-xl bg-[#2A060B]/80 border border-[#D4AF37]/40 flex items-start gap-3">
                <div className="p-2 rounded-lg bg-[#5E141F] text-[#FFE58F] shrink-0 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs uppercase font-bold text-[#FFE58F] tracking-wider mb-1">
                    {currentLang === 'te' ? 'దివ్య అలంకారం & ఆభరణాలు' : 'Sacred Alankaram & Adornments'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#F0E6D2]">
                    {currentLang === 'te' ? activeDeity.alankaramTe : activeDeity.alankaramEn}
                  </p>
                </div>
              </div>

              {/* Worship Pillars in 2-Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                
                {/* 1. Daily Worship Details */}
                <div className="p-4 rounded-xl bg-[#2A060B]/70 border border-[#D4AF37]/30">
                  <div className="flex items-center gap-2.5 mb-2 text-[#FFE58F]">
                    <Sun className="w-4 h-4 text-[#FFD54F]" />
                    <h4 className="font-serif-temple text-sm font-bold uppercase tracking-wide">
                      {currentLang === 'te' ? 'నిత్య పూజా విధులు' : 'Daily Worship Rituals'}
                    </h4>
                  </div>
                  <ul className="text-xs text-[#E0D3BC] space-y-1.5">
                    <li>• {currentLang === 'te' ? 'ఉదయం సుప్రభాత సేవ & తోమాల సేవ' : '05:30 AM - Suprabhatam & Awakening'}</li>
                    <li>• {currentLang === 'te' ? 'నిత్య సహస్ర పుష్పార్చన & క్షీరాభిషేకం' : '07:30 AM - Kshirabhishekam with holy cow milk'}</li>
                    <li>• {currentLang === 'te' ? 'మధ్యాహ్న రాజభోగ నివేదన & హారతి' : '12:00 PM - Rajabhoga Naivedyam offering'}</li>
                    <li>• {currentLang === 'te' ? 'రాత్రి ఏకాంత పవళింపు సేవ' : '08:45 PM - Ekanta Shayana Seva at night'}</li>
                  </ul>
                </div>

                {/* 2. Special Poojas & Alankaram */}
                <div className="p-4 rounded-xl bg-[#2A060B]/70 border border-[#D4AF37]/30">
                  <div className="flex items-center gap-2.5 mb-2 text-[#FFE58F]">
                    <Flower2 className="w-4 h-4 text-[#FF80AB]" />
                    <h4 className="font-serif-temple text-sm font-bold uppercase tracking-wide">
                      {currentLang === 'te' ? 'విశేష అలంకారాలు & ఉత్సవాలు' : 'Special Alankarams & Utsavams'}
                    </h4>
                  </div>
                  <ul className="text-xs text-[#E0D3BC] space-y-1.5">
                    <li>• {currentLang === 'te' ? 'ప్రతి శుక్రవారం నిజపాద దర్శనం' : 'Every Friday: Nijapada Darshanam (Sacred Feet)'}</li>
                    <li>• {currentLang === 'te' ? 'ఏకాదశి నాడు స్వర్ణ కవచ అలంకారం' : 'Ekadasi: Golden Kavacha Alankaram'}</li>
                    <li>• {currentLang === 'te' ? 'పౌర్ణమి నాడు సహస్ర కలశాభిషేకం' : 'Pournami: Sahasra Kalashabhishekam'}</li>
                    <li>• {currentLang === 'te' ? 'ప్రతి శనివారం విశేష ఊంజల్ సేవ' : 'Every Saturday: Grand Unjal (Swing) Seva'}</li>
                  </ul>
                </div>

              </div>

              {/* Important Devotional Instructions */}
              <div className="p-4 rounded-xl bg-[#56121C]/50 border border-[#E5B839]/30 text-xs text-[#F5EDE0]">
                <strong className="text-[#FFE58F] block mb-1">
                  {currentLang === 'te' ? 'భక్తులకు ముఖ్య సూచనలు:' : 'Devotional Guidelines for Sanctum Entry:'}
                </strong>
                <span>
                  {currentLang === 'te'
                    ? 'స్వామివారి గర్భగుడి వద్ద మౌనాన్ని పాటించండి. సాంప్రదాయ వస్త్రధారణ తప్పనిసరి. మొబైల్ ఫోన్లు నిశ్శబ్ద స్థితిలో ఉంచవలెను.'
                    : 'Devotees are humbly requested to maintain silence inside the sanctum sanctorum. Traditional modest attire is mandatory. Photography and mobile phone usage are strictly prohibited inside the inner temple.'}
                </span>
              </div>

              {/* Direct Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  id="deity-view-poojas-btn"
                  onClick={onOpenPooja}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#5E141F] hover:bg-[#731A28] text-[#FFE29F] border border-[#D4AF37] text-sm font-semibold transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <DiyaIcon className="w-4 h-4 text-[#FFE58F]" />
                  <span>{currentLang === 'te' ? 'పూజా సేవల వివరాలు' : 'Explore All Pooja & Sevas'}</span>
                </button>

                <button
                  id="deity-sponsor-seva-btn"
                  onClick={onOpenDonate}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5B839] to-[#D48806] hover:from-[#FFE29F] hover:to-[#C58000] text-[#360910] text-sm font-bold transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <HeartHandshake className="w-4 h-4 text-[#360910]" />
                  <span>{currentLang === 'te' ? 'సేవకు సమర్పణ చేయండి' : 'Sponsor Seva / Donate'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
