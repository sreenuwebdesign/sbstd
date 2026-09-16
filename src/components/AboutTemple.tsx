import React from 'react';
import { History, Sparkles, BookOpen, Compass, Heart, Shield, Award } from 'lucide-react';
import { Language } from '../types';
import { TEMPLE_INFO } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon, LotusIcon } from './TempleMotifs';

interface AboutTempleProps {
  currentLang: Language;
}

export const AboutTemple: React.FC<AboutTempleProps> = ({ currentLang }) => {
  return (
    <section id="about" className="py-20 bg-[#FAF6EE] relative overflow-hidden">
      {/* Decorative Traditional Border Motifs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD8BA] text-[#5B101D] text-xs font-semibold tracking-wider uppercase mb-3">
            <DiyaIcon className="w-4 h-4" />
            <span>{currentLang === 'te' ? 'ఆలయ చరిత్ర & వైభవం' : 'Sacred Heritage & History'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-temple font-bold text-[#4A0E17] tracking-tight">
            {currentLang === 'te' ? 'ఆలయ విశేషాలు & ప్రాశస్త్యం' : 'About The Sacred Temple'}
          </h2>
          <OrnamentalDivider />
          <p className="text-[#5D4037] text-base sm:text-lg leading-relaxed">
            {currentLang === 'te' 
              ? `${TEMPLE_INFO.nameTe} శతాబ్దాల నాటి దివ్య సంప్రదాయాలకు, వేద మంత్రోచ్ఛారణలకు మరియు భక్తుల నిశ్చల విశ్వాసానికి పవిత్ర నిలయం.`
              : `${TEMPLE_INFO.nameEn} stands as an eternal beacon of Sanatana Dharma, welcoming millions of devotees into an oasis of serenity and divine grace.`}
          </p>
        </div>

        {/* Two-Column Grid: Image with Golden Ornamentation & Main Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          
          {/* Left: Attractive Temple Imagery with Traditional Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-[#D4AF37]/40 group">
              <img
                src="/images/temple-garbhagriha.svg"
                alt="Sacred South Indian Temple Architecture"
                referrerPolicy="no-referrer"
                className="w-full h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#36080F]/90 via-[#36080F]/20 to-transparent" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#2D060B]/85 backdrop-blur-md border border-[#D4AF37]/50 text-white">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#5E141F] text-[#FFE29F]">
                    <LotusIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-serif-temple text-base font-bold text-[#FFE58F]">
                      {currentLang === 'te' ? 'దివ్య క్షేత్ర మహత్యం' : 'Ancient Sanctum Sanctorum'}
                    </h4>
                    <p className="text-xs text-[#E8DCC0]">
                      {currentLang === 'te' ? 'ఆగమ శాస్త్రోక్త నిత్య పూజలు & సర్వ శుభప్రదం' : 'Consecrated in accordance with Pancharatra Agama'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corner Decorative Accent */}
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-xl pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-[#D4AF37] rounded-br-xl pointer-events-none hidden sm:block" />
          </div>

          {/* Right: Detailed Temple Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Temple History */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#E8DCC0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#5B101D] text-[#FFE29F] shrink-0 mt-1">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-temple font-bold text-[#4A0E17] mb-2">
                    {currentLang === 'te' ? 'ఆలయ పురాతన చరిత్ర' : 'Temple History & Origin'}
                  </h3>
                  <p className="text-[#5D4037] text-sm sm:text-base leading-relaxed">
                    {currentLang === 'te'
                      ? `పూర్వీకులచే ప్రతిష్ఠించబడిన ${TEMPLE_INFO.nameTe}, రాజాస్థానాల నుండి ప్రస్తుత తరం వరకు భక్తి ప్రపత్తులతో సంరక్షించబడుతున్న మహోన్నత ఆలయం. ఇక్కడ పూజలు అందుకుంటున్న దేవతామూర్తి భక్తుల కోర్కెలను ఈడేర్చే కల్పవృక్షంగా ఖ్యాతి పొందారు.`
                      : `Erected with profound devotion and consecrated by venerable sages of antiquity, ${TEMPLE_INFO.nameEn} has preserved unbroken sacred rituals for generations. Devotees from far and wide revere the temple as a sanctified haven where silent prayers manifest as divine blessings.`}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Spiritual Significance */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#E8DCC0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#C25E00] text-[#FFF2C6] shrink-0 mt-1">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-temple font-bold text-[#4A0E17] mb-2">
                    {currentLang === 'te' ? 'ఆధ్యాత్మిక ప్రాధాన్యత' : 'Spiritual Significance'}
                  </h3>
                  <p className="text-[#5D4037] text-sm sm:text-base leading-relaxed">
                    {currentLang === 'te'
                      ? 'ఈ పుణ్యభూమిలో అడుగుపెట్టగానే మనస్సు ప్రశాంతతను పొందుతుంది. క్షేత్రపాలకుని అనుగ్రహం ద్వారా నవగ్రహ దోషాలు, మానసిక ఆందోళనలు తొలగి సకల ఐశ్వర్యాలు లభిస్తాయని భక్తుల దృఢ విశ్వాసం.'
                      : 'The sanctum is charged with centuries of continuous Vedic vibration. devotions offered here are believed to dispel mental distress, bestow spiritual enlightenment, and bring harmony to households.'}
                  </p>
                </div>
              </div>
            </div>

            {/* 3. Temple Traditions & Daily Rituals */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#E8DCC0] shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#5B101D] text-[#FFE29F] shrink-0 mt-1">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif-temple font-bold text-[#4A0E17] mb-2">
                    {currentLang === 'te' ? 'నిత్య సాంప్రదాయాలు & ఆగమ విధి' : 'Temple Traditions & Sacred Agama'}
                  </h3>
                  <p className="text-[#5D4037] text-sm sm:text-base leading-relaxed">
                    {currentLang === 'te'
                      ? 'శ్రీక్షేత్రంలో ఉదయం సుప్రభాత సేవ నుండి రాత్రి ఏకాంత సేవ వరకు అన్ని ఆచారాలు నిర్దిష్ట ఆగమ శాస్త్రాల ప్రకారం వేద పండితులచే సమర్పించబడతాయి.'
                      : 'From the dawn Suprabhatam to the serene Ekanta Seva at nightfall, all six-fold daily worships (Shatkala Pooja) are executed with immaculate adherence to authentic Vedic traditions.'}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Sacred Complex Architecture Visual Grid */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-xl sm:text-2xl font-serif-temple font-bold text-[#4A0E17]">
              {currentLang === 'te' ? 'దివ్య క్షేత్ర ప్రాకార విహంగమం' : 'Sacred Temple Complex & Sacred Sites'}
            </h3>
            <p className="text-xs sm:text-sm text-[#734A12] mt-1">
              {currentLang === 'te' ? 'పురాణ ప్రాశస్త్యం గల పవిత్ర గోపురాలు, పుష్కరిణి మరియు మంటపాలు' : 'Ancient gopurams, sacred waters, and heritage pillared halls'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow bg-white group">
              <div className="h-36 overflow-hidden">
                <img
                  src="/images/temple-gopuram.svg"
                  alt="Sri Rajagopuram"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="font-serif-temple font-bold text-xs sm:text-sm text-[#4A0E17]">
                  {currentLang === 'te' ? 'శ్రీ రాజగోపురం' : 'Grand Rajagopuram'}
                </h4>
                <p className="text-[11px] text-[#734A12]">
                  {currentLang === 'te' ? 'సప్త స్వర్ణ కలశాలతో' : '7 Golden Kalashas'}
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow bg-white group">
              <div className="h-36 overflow-hidden">
                <img
                  src="/images/temple-garbhagriha.svg"
                  alt="Garbhagriha Sanctum"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="font-serif-temple font-bold text-xs sm:text-sm text-[#4A0E17]">
                  {currentLang === 'te' ? 'ఆనంద నిలయం' : 'Ananda Nilayam'}
                </h4>
                <p className="text-[11px] text-[#734A12]">
                  {currentLang === 'te' ? 'గర్భగృహ విమాన శిఖరం' : 'Sanctum Sanctorum'}
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow bg-white group">
              <div className="h-36 overflow-hidden">
                <img
                  src="/images/temple-pushkarini.svg"
                  alt="Swami Pushkarini"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="font-serif-temple font-bold text-xs sm:text-sm text-[#4A0E17]">
                  {currentLang === 'te' ? 'స్వామి పుష్కరిణి' : 'Sacred Pushkarini'}
                </h4>
                <p className="text-[11px] text-[#734A12]">
                  {currentLang === 'te' ? 'పాపనాశన పుణ్య తీర్థం' : 'Holy Cleansing Waters'}
                </p>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#D4AF37]/40 shadow bg-white group">
              <div className="h-36 overflow-hidden">
                <img
                  src="/images/temple-mandapam.svg"
                  alt="Ranga Mandapam"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-3 text-center">
                <h4 className="font-serif-temple font-bold text-xs sm:text-sm text-[#4A0E17]">
                  {currentLang === 'te' ? 'రంగ మండపం' : 'Ranga Mandapam'}
                </h4>
                <p className="text-[11px] text-[#734A12]">
                  {currentLang === 'te' ? 'చారిత్రక శిలా స్తంభాలు' : 'Carved Stone Pillars'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Two Highlights: Importance to Devotees & Temple Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Importance to Devotees */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#FAF2E1] to-[#F5E6CC] border border-[#D4AF37]/40 shadow-sm relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-full bg-[#5B101D] text-[#FFE58F]">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                {currentLang === 'te' ? 'భక్తులకు ఆలయ ప్రాముఖ్యత' : 'Importance to Devotees'}
              </h3>
            </div>
            <p className="text-[#5D4037] text-sm sm:text-base leading-relaxed mb-4">
              {currentLang === 'te'
                ? 'కుటుంబ క్షేమం, వివాహ సాఫల్యం, విద్య, ఉద్యోగ ప్రాప్తి కొరకు భక్తులు శ్రీ స్వామివారిని దర్శించుకుంటారు. ఇక్కడ సమర్పించే ప్రతి పూజ భక్తుల హృదయాలను భగవత్ సన్నిధికి చేరుస్తుంది.'
                : 'For thousands of families, the temple is an anchor of faith during times of celebration and solace during life trials. Special prayers for health, children prosperity, and gratitude bring devotees together in unified devotion.'}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4A0E17] font-medium">
              <li className="flex items-center gap-2">
                <span className="text-[#C25E00]">✦</span>
                <span>{currentLang === 'te' ? 'అన్నార్తులకు నిత్యాన్నదాన ప్రసాద వితరణ' : 'Nitya Annadanam serving free daily meals'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C25E00]">✦</span>
                <span>{currentLang === 'te' ? 'సకల మనోరథ ఫలప్రదమైన నవగ్రహ అర్చనలు' : 'Spiritual sanctuary for deep prayer & meditation'}
                </span>
              </li>
            </ul>
          </div>

          {/* Temple Mission & Charitable Vision */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-[#FDF8EE] to-[#F6EDE0] border border-[#D4AF37]/40 shadow-sm relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2.5 rounded-full bg-[#C25E00] text-[#FFE58F]">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                {currentLang === 'te' ? 'ఆలయ ధ్యేయం & సమాజ సేవ' : "The Temple's Mission"}
              </h3>
            </div>
            <p className="text-[#5D4037] text-sm sm:text-base leading-relaxed mb-4">
              {currentLang === 'te'
                ? 'భారతీయ వేద సంస్కృతిని కాపాడుతూ, పేదలకు ఉచిత అన్నదానం, వేద విద్యార్థులకు ఆశ్రయం, దేశీ ఆవుల సంరక్షణ మరియు సేవా కార్యక్రమాలను నిరంతరం కొనసాగించడమే మా లక్ష్యం.'
                : 'Our sacred mission is to uphold Sanatana Dharma, preserve Vedic learning through our Veda Patashala, provide loving shelter to sacred Desi cows (Go Seva), and feed the hungry with compassionate Annadanam.'}
            </p>
            <ul className="space-y-2 text-xs sm:text-sm text-[#4A0E17] font-medium">
              <li className="flex items-center gap-2">
                <span className="text-[#C25E00]">✦</span>
                <span>{currentLang === 'te' ? 'ఆలయ గోశాలలో 100+ దేశీ గోవుల పోషణ' : 'Active Gosala protecting 100+ sacred Desi cows'}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#C25E00]">✦</span>
                <span>{currentLang === 'te' ? 'వేద విద్యను భవిష్యత్ తరాలకు అందించే నిబద్ధత' : 'Endowing traditional scholarship & spiritual education'}
                </span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
};
