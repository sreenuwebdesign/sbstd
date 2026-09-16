import React, { useState } from 'react';
import { Calendar, Sparkles, Check, X, ChevronRight, Share2, Info } from 'lucide-react';
import { Language, FestivalItem } from '../types';
import { FESTIVALS } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon, LotusIcon } from './TempleMotifs';

interface FestivalsProps {
  currentLang: Language;
  onOpenDonate: () => void;
}

export const Festivals: React.FC<FestivalsProps> = ({ currentLang, onOpenDonate }) => {
  const [selectedFestival, setSelectedFestival] = useState<FestivalItem | null>(null);

  return (
    <section id="festivals" className="py-20 bg-gradient-to-b from-[#FAF6EE] to-[#F5EBD9] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD8BA] text-[#5B101D] text-xs font-semibold tracking-wider uppercase mb-3">
            <LotusIcon className="w-4 h-4 text-[#C25E00]" />
            <span>{currentLang === 'te' ? 'ఆలయ మహోత్సవాలు & పర్వదినాలు' : 'Sacred Utsavams & Celebrations'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-temple font-bold text-[#4A0E17] tracking-tight">
            {currentLang === 'te' ? 'రాబోయే పండుగలు & ఉత్సవాలు' : 'Upcoming Temple Festivals'}
          </h2>
          <OrnamentalDivider />
          <p className="text-[#5D4037] text-base sm:text-lg leading-relaxed">
            {currentLang === 'te'
              ? 'ఆలయంలో జరిగే వైభవోపేత బ్రహ్మోత్సవాలు, రథోత్సవాలు మరియు దివ్య తిరుకళ్యాణ మహోత్సవాలలో పాల్గొని పునీతులు కండి.'
              : 'Join in the timeless spiritual splendor of annual temple Brahmotsavams, divine chariot processions, and special celestial pujas.'}
          </p>
        </div>

        {/* Festival Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {FESTIVALS.map((fest) => (
            <div
              key={fest.id}
              id={`festival-card-${fest.id}`}
              className="rounded-2xl bg-white border border-[#E8DCC0] hover:border-[#D4AF37] shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Festival Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={fest.imageUrl}
                    alt={fest.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2E070B]/80 via-transparent to-transparent" />
                  
                  {/* Tithi / Date Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#5B101D]/90 backdrop-blur-sm border border-[#FFE29F]/40 text-[#FFE58F] text-xs font-semibold flex items-center gap-1.5 shadow-md">
                    <Calendar className="w-3.5 h-3.5 text-[#E5B839]" />
                    <span>{fest.auspiciousTithi}</span>
                  </div>
                </div>

                {/* Festival Info */}
                <div className="p-5">
                  <span className="text-[11px] font-bold text-[#C25E00] uppercase tracking-wider block mb-1">
                    {currentLang === 'te' ? fest.dateTe : fest.dateEn}
                  </span>
                  <h3 className="text-lg font-serif-temple font-bold text-[#4A0E17] group-hover:text-[#8B1D2C] transition-colors leading-snug mb-2.5">
                    {currentLang === 'te' ? fest.nameTe : fest.nameEn}
                  </h3>
                  <p className="text-[#5D4037] text-xs sm:text-sm leading-relaxed line-clamp-3 mb-4">
                    {currentLang === 'te' ? fest.descriptionTe : fest.descriptionEn}
                  </p>

                  {/* Highlights Bullet Previews */}
                  <div className="space-y-1 text-xs text-[#734A12]">
                    {(currentLang === 'te' ? fest.highlightsTe : fest.highlightsEn).slice(0, 2).map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="text-[#D4AF37]">✦</span>
                        <span className="truncate">{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-4 bg-[#FAF6EE] border-t border-[#E8DCC0]">
                <button
                  id={`view-festival-${fest.id}`}
                  onClick={() => setSelectedFestival(fest)}
                  className="w-full py-2.5 rounded-xl bg-white hover:bg-[#5B101D] text-[#4A0E17] hover:text-[#FFE58F] border border-[#D4AF37]/50 text-xs sm:text-sm font-bold shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
                >
                  <Info className="w-4 h-4" />
                  <span>{currentLang === 'te' ? 'వివరాలు చూడండి' : 'View Details'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Festival Sponsorship Banner */}
        <div className="mt-14 rounded-2xl bg-gradient-to-r from-[#4A0E17] via-[#5B101D] to-[#36080F] p-6 sm:p-8 text-white border-2 border-[#D4AF37]/40 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-xs uppercase tracking-widest text-[#E5B839] font-bold">
              {currentLang === 'te' ? 'ఉత్సవ సేవా భాగస్వామ్యం' : 'Festival Utsava Sponsorship'}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif-temple font-bold text-[#FFF2C6]">
              {currentLang === 'te' ? 'ఆలయ ఉత్సవాలకు మీ తోడ్పాటును అందించండి' : 'Support Sacred Temple Festival Celebrations'}
            </h3>
            <p className="text-xs sm:text-sm text-[#E8DCC0] max-w-2xl">
              {currentLang === 'te'
                ? 'పుష్పాలంకరణ, రథోత్సవం, విద్యుత్ దీపాలంకరణ మరియు ఉత్సవ అన్నదానానికి భక్తులు విరాళాలు సమర్పించవచ్చు.'
                : 'Devotees are invited to contribute towards floral decorations, rathotsavam, golden vahanams, and festival feasts.'}
            </p>
          </div>

          <button
            onClick={onOpenDonate}
            className="shrink-0 px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C58000] hover:from-[#FFE29F] hover:to-[#B87200] text-[#360910] font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>{currentLang === 'te' ? 'ఉత్సవ విరాళం ఇవ్వండి' : 'Contribute to Festival'}</span>
          </button>
        </div>

      </div>

      {/* Festival Details Modal */}
      {selectedFestival && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full my-auto max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-2 border-[#D4AF37] relative">
            
            {/* Modal Image Header */}
            <div className="relative h-40 sm:h-48 w-full shrink-0">
              <img
                src={selectedFestival.imageUrl}
                alt={selectedFestival.nameEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#36080F] via-transparent to-transparent" />
              <button
                onClick={() => setSelectedFestival(null)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-3 left-4 right-4 sm:bottom-4 sm:left-6 sm:right-6 text-white">
                <span className="text-[11px] sm:text-xs uppercase tracking-widest text-[#FFE58F] font-bold">
                  {currentLang === 'te' ? selectedFestival.dateTe : selectedFestival.dateEn}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif-temple font-bold text-white">
                  {currentLang === 'te' ? selectedFestival.nameTe : selectedFestival.nameEn}
                </h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#8A5A00] tracking-wider mb-1">
                  {currentLang === 'te' ? 'ఉత్సవ ప్రాశస్త్యం' : 'Festival Overview & History'}
                </h4>
                <p className="text-sm text-[#4A0E17] leading-relaxed">
                  {currentLang === 'te' ? selectedFestival.descriptionTe : selectedFestival.descriptionEn}
                </p>
              </div>

              {/* Auspicious Tithi */}
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0] flex items-center justify-between text-xs sm:text-sm">
                <span className="font-semibold text-[#8A5A00]">
                  {currentLang === 'te' ? 'శుభ తిథి / ముహూర్తం:' : 'Auspicious Muhurtham / Tithi:'}
                </span>
                <span className="font-bold text-[#4A0E17]">{selectedFestival.auspiciousTithi}</span>
              </div>

              {/* Key Ceremonial Highlights */}
              <div>
                <h4 className="text-xs font-bold uppercase text-[#8A5A00] tracking-wider mb-2">
                  {currentLang === 'te' ? 'ప్రధాన ఉత్సవ కార్యక్రమాలు' : 'Key Ceremonies & Highlights'}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(currentLang === 'te' ? selectedFestival.highlightsTe : selectedFestival.highlightsEn).map((hl, i) => (
                    <div key={i} className="p-2.5 rounded-lg bg-[#FFF9E6] border border-[#FFE29F] text-xs font-medium text-[#5D4037] flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#2E7D32] shrink-0" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="p-4 bg-[#FAF6EE] border-t border-[#E8DCC0] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setSelectedFestival(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm text-[#5D4037] hover:bg-gray-200 transition-colors text-center"
              >
                {currentLang === 'te' ? 'మూసివేయి' : 'Close'}
              </button>
              <button
                onClick={() => {
                  setSelectedFestival(null);
                  onOpenDonate();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C58000] text-[#360910] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'ఉత్సవ విరాళం సమర్పించండి' : 'Sponsor this Festival'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
