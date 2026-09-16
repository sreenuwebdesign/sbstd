import React, { useState } from 'react';
import { Clock, IndianRupee, Users, Gift, Info, CheckCircle2, X, ChevronRight, HeartHandshake } from 'lucide-react';
import { Language, SevaItem } from '../types';
import { POOJA_SEVAS } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon, LotusIcon } from './TempleMotifs';

interface PoojaSevaProps {
  currentLang: Language;
  onSelectSevaForDonation: (sevaName: string, amount: number) => void;
}

export const PoojaSeva: React.FC<PoojaSevaProps> = ({
  currentLang,
  onSelectSevaForDonation,
}) => {
  const [selectedSeva, setSelectedSeva] = useState<SevaItem | null>(null);

  return (
    <section id="pooja" className="py-20 bg-[#FAF6EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD8BA] text-[#5B101D] text-xs font-semibold tracking-wider uppercase mb-3">
            <DiyaIcon className="w-4 h-4" />
            <span>{currentLang === 'te' ? 'నిత్యార్చనలు & పూజా సేవలు' : 'Sacred Poojas & Seva Timings'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-temple font-bold text-[#4A0E17] tracking-tight">
            {currentLang === 'te' ? 'ఆలయ పూజలు & సేవలు' : 'Daily Pooja & Seva Schedule'}
          </h2>
          <OrnamentalDivider />
          <p className="text-[#5D4037] text-base sm:text-lg leading-relaxed">
            {currentLang === 'te'
              ? 'స్వామివారి అనుగ్రహం కొరకు భక్తులు వివిధ రకాల నిత్య పూజలు, అభిషేకాలు మరియు సహస్ర నామార్చనలలో పాల్గొనవచ్చు.'
              : 'Participate in divine rituals conducted according to sacred Shastras. Devotees may book individual sevas or sponsor sacred archanas for their family.'}
          </p>
        </div>

        {/* Pooja Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {POOJA_SEVAS.map((seva) => (
            <div
              key={seva.id}
              id={`seva-card-${seva.id}`}
              className="rounded-2xl bg-white border border-[#E8DCC0] hover:border-[#D4AF37] shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1"
            >
              {/* Card Top Image Banner */}
              {seva.imageUrl && (
                <div className="relative h-44 w-full overflow-hidden bg-[#200407]">
                  <img
                    src={seva.imageUrl}
                    alt={currentLang === 'te' ? seva.nameTe : seva.nameEn}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 filter brightness-95"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#200407]/90 via-[#200407]/30 to-transparent" />
                  
                  {/* Seva Timing Badge on Image */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-full bg-[#3D0A11]/90 backdrop-blur-sm border border-[#D4AF37]/50 text-[#FFE58F] text-[11px] font-bold">
                      {currentLang === 'te' ? 'నిత్య సేవ' : 'Sanctum Seva'}
                    </span>
                    <div className="px-3 py-1 rounded-full bg-[#FAF2E1] border border-[#D4AF37] text-[#5B101D] font-extrabold text-sm shadow-md">
                      ₹{seva.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              )}

              <div className="p-6">
                
                {/* Header: Seva Name */}
                <div className="mb-3">
                  <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17] group-hover:text-[#8B1D2C] transition-colors leading-snug">
                    {currentLang === 'te' ? seva.nameTe : seva.nameEn}
                  </h3>
                </div>

                {/* Timing Strip */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#664600] bg-[#FFF8E7] px-3 py-2 rounded-lg border border-[#FFE29F] mb-4">
                  <Clock className="w-4 h-4 text-[#C25E00] shrink-0" />
                  <span>{seva.time}</span>
                </div>

                {/* Seva Short Description */}
                <p className="text-[#5D4037] text-sm leading-relaxed mb-4 line-clamp-3">
                  {currentLang === 'te' ? seva.descriptionTe : seva.descriptionEn}
                </p>

                {/* Prasadam Preview */}
                <div className="flex items-center gap-2 text-xs text-[#734A12] bg-[#FAF6EE] p-2.5 rounded-lg border border-[#E8DCC0]">
                  <Gift className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">
                    <strong>{currentLang === 'te' ? 'ప్రసాదం: ' : 'Prasadam: '}</strong>
                    {currentLang === 'te' ? seva.prasadamTe : seva.prasadamEn}
                  </span>
                </div>

              </div>

              {/* Card Footer Actions */}
              <div className="p-3 sm:p-4 bg-[#FAF6EE]/70 border-t border-[#E8DCC0] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2">
                <button
                  id={`view-details-${seva.id}`}
                  onClick={() => setSelectedSeva(seva)}
                  className="px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold text-[#4A0E17] hover:bg-[#EAD8BA] transition-colors flex items-center justify-center gap-1.5"
                >
                  <Info className="w-4 h-4 text-[#D4AF37]" />
                  <span>{currentLang === 'te' ? 'వివరాలు చూడండి' : 'View Details'}</span>
                </button>

                <button
                  id={`book-seva-${seva.id}`}
                  onClick={() => onSelectSevaForDonation(currentLang === 'te' ? seva.nameTe : seva.nameEn, seva.price)}
                  className="px-4 py-2 rounded-lg bg-[#5B101D] hover:bg-[#781525] text-[#FFE58F] text-xs sm:text-sm font-bold shadow transition-all flex items-center justify-center gap-1 hover:shadow-md"
                >
                  <HeartHandshake className="w-3.5 h-3.5" />
                  <span>{currentLang === 'te' ? 'సేవ బుక్ చేయండి' : 'Sponsor Seva'}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Notice on Seva Booking & Sankalpam */}
        <div className="mt-12 p-5 rounded-2xl bg-white border border-[#D4AF37]/30 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-sm text-[#5D4037]">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D32] shrink-0" />
            <span>
              {currentLang === 'te'
                ? 'భక్తులు తమ గోత్ర నామాలతో పూజలను ఆన్‌లైన్ ద్వారా సంకల్పం చేయించుకోవచ్చు. తీర్థ ప్రసాదాలు రిజిస్టర్డ్ చిరునామాకు కూడా పంపబడతాయి.'
                : 'Devotees unable to attend in person can book Archana & Abhishekam online with their Gotra & Nakshatra for direct remote Sankalpam.'}
            </span>
          </div>
          <a
            href="#donations"
            className="shrink-0 text-xs sm:text-sm font-bold text-[#5B101D] hover:underline flex items-center gap-1"
          >
            <span>{currentLang === 'te' ? 'సేవా నిధికి సమర్పించండి' : 'Contribute to Pooja Fund'}</span>
            <ChevronRight className="w-4 h-4" />
          </a>
        </div>

      </div>

      {/* Modal: Detailed Seva Information */}
      {selectedSeva && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full my-auto max-h-[90vh] flex flex-col overflow-hidden shadow-2xl border-2 border-[#D4AF37] relative">
            
            {/* Modal Image & Header */}
            {selectedSeva.imageUrl && (
              <div className="relative h-36 sm:h-44 w-full overflow-hidden bg-[#200407] shrink-0">
                <img
                  src={selectedSeva.imageUrl}
                  alt={selectedSeva.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A0E17] via-[#4A0E17]/50 to-transparent" />
                <button
                  onClick={() => setSelectedSeva(null)}
                  className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-[#FFE58F] hover:bg-black/80 transition-colors z-10"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Modal Title Bar */}
            <div className="bg-[#4A0E17] text-white p-4 sm:p-6 relative shrink-0">
              {!selectedSeva.imageUrl && (
                <button
                  onClick={() => setSelectedSeva(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-full bg-[#5E141F] text-[#FFE58F] hover:bg-[#731A28] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
              <div className="flex items-center gap-2 text-xs font-semibold text-[#FFE58F] uppercase tracking-wider mb-1">
                <DiyaIcon className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'సేవా వివరాలు' : 'Seva Protocol & Guidelines'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif-temple font-bold text-[#FFF2C6]">
                {currentLang === 'te' ? selectedSeva.nameTe : selectedSeva.nameEn}
              </h3>
              <p className="text-xs text-[#E8DCC0] mt-1 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#E5B839]" />
                <span>{selectedSeva.time}</span>
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
              <div>
                <h4 className="text-xs font-bold uppercase text-[#8A5A00] tracking-wider mb-1">
                  {currentLang === 'te' ? 'సేవా ప్రాముఖ్యత' : 'Spiritual Significance'}
                </h4>
                <p className="text-sm text-[#4A0E17] leading-relaxed">
                  {currentLang === 'te' ? selectedSeva.descriptionTe : selectedSeva.descriptionEn}
                </p>
              </div>

              {/* Seva Specifications */}
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                  <div className="flex items-center gap-1.5 text-xs text-[#8A5A00] font-semibold mb-1">
                    <IndianRupee className="w-3.5 h-3.5 text-[#C25E00]" />
                    <span>{currentLang === 'te' ? 'సేవా రుసుము' : 'Seva Kanuka'}</span>
                  </div>
                  <div className="text-base font-bold text-[#4A0E17]">
                    ₹{selectedSeva.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                  <div className="flex items-center gap-1.5 text-xs text-[#8A5A00] font-semibold mb-1">
                    <Clock className="w-3.5 h-3.5 text-[#C25E00]" />
                    <span>{currentLang === 'te' ? 'వ్యవధి' : 'Duration'}</span>
                  </div>
                  <div className="text-base font-bold text-[#4A0E17]">
                    {selectedSeva.duration || '30-45 mins'}
                  </div>
                </div>

                <div className="col-span-2 p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                  <div className="flex items-center gap-1.5 text-xs text-[#8A5A00] font-semibold mb-1">
                    <Users className="w-3.5 h-3.5 text-[#C25E00]" />
                    <span>{currentLang === 'te' ? 'భక్తుల అనుమతి' : 'Devotees Permitted'}</span>
                  </div>
                  <div className="text-sm font-medium text-[#4A0E17]">
                    {selectedSeva.devoteesAllowed || 'Individual or Family'}
                  </div>
                </div>
              </div>

              {/* Prasadam Blessed Offerings */}
              <div className="p-3.5 rounded-xl bg-[#FFF9E6] border border-[#FFE58F]">
                <div className="flex items-center gap-2 text-xs font-bold text-[#8A5A00] mb-1">
                  <Gift className="w-4 h-4 text-[#C25E00]" />
                  <span>{currentLang === 'te' ? 'అందించబడు ప్రసాదం' : 'Blessed Prasadam Provided'}</span>
                </div>
                <p className="text-xs text-[#5D4037]">
                  {currentLang === 'te' ? selectedSeva.prasadamTe : selectedSeva.prasadamEn}
                </p>
              </div>

              {/* Traditional Rules */}
              <div className="text-xs text-[#5D4037] space-y-1 bg-[#FAF6EE] p-3 rounded-xl border border-[#E8DCC0]">
                <p className="font-semibold text-[#4A0E17]">
                  {currentLang === 'te' ? 'ముఖ్య నియమాలు:' : 'Important Instructions:'}
                </p>
                <p>• {currentLang === 'te' ? 'సేవకు 20 నిమిషాల ముందుగా ఆలయ మండపానికి చేరుకోవలెను.' : 'Report to the inner Mandapam 20 minutes before scheduled start time.'}</p>
                <p>• {currentLang === 'te' ? 'సాంప్రదాయ వస్త్రాలు (ధోవతి / చీర) తప్పనిసరి.' : 'Traditional dress code applies. Bring valid booking acknowledgment.'}</p>
              </div>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 bg-[#FAF6EE] border-t border-[#E8DCC0] flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2 sm:gap-3 shrink-0">
              <button
                onClick={() => setSelectedSeva(null)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-[#5D4037] hover:bg-gray-200 transition-colors text-center"
              >
                {currentLang === 'te' ? 'మూసివేయి' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const sName = currentLang === 'te' ? selectedSeva.nameTe : selectedSeva.nameEn;
                  const price = selectedSeva.price;
                  setSelectedSeva(null);
                  onSelectSevaForDonation(sName, price);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C58000] text-[#360910] font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'ఇప్పుడే సమర్పించండి / బుక్' : 'Sponsor / Book Online'}</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
