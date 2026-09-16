import React from 'react';
import { HeartHandshake, ShieldCheck, FileText, ChevronRight, Gift } from 'lucide-react';
import { Language } from '../types';
import { OrnamentalDivider, DiyaIcon, LotusIcon } from './TempleMotifs';

interface DonationSectionProps {
  currentLang: Language;
  onOpenDonationPage: () => void;
}

export const DonationSection: React.FC<DonationSectionProps> = ({
  currentLang,
  onOpenDonationPage,
}) => {
  return (
    <section className="py-16 bg-gradient-to-r from-[#3B0A11] via-[#4D0E18] to-[#2B060A] text-white relative overflow-hidden">
      {/* Background Decorative Temple Halo */}
      <div className="absolute -left-12 -bottom-12 opacity-10 pointer-events-none">
        <LotusIcon className="w-80 h-80 text-[#FFE58F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5E141F] border border-[#D4AF37]/40 text-[#FFE58F] text-xs font-semibold uppercase tracking-wider">
              <DiyaIcon className="w-4 h-4" />
              <span>{currentLang === 'te' ? 'ఆలయ పుణ్య కార్యములు' : 'Sacred Giving'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif-temple font-bold text-[#FFF2C6] leading-tight">
              {currentLang === 'te' ? 'Support the Temple (ఆలయ సేవ)' : 'Support the Temple'}
            </h2>

            {/* User Requested Telugu Heading */}
            <p className="text-xl sm:text-2xl font-telugu text-[#FFD54F] font-bold">
              "మీ భక్తి సమర్పణ ఆలయ సేవకు తోడ్పడుతుంది"
            </p>

            {/* User Requested English Description */}
            <p className="text-[#E8DCC0] text-sm sm:text-base max-w-2xl leading-relaxed">
              {currentLang === 'te'
                ? 'మీ ఉదార సమర్పణ ఆలయ నిర్వహణ, నిత్య పూజలు, అన్నదానం, ఆధ్యాత్మిక కార్యక్రమాలు, ఉత్సవాలు మరియు సేవా కార్యక్రమాలకు తోడ్పడుతుంది.'
                : 'Your generous contribution helps support temple maintenance, daily poojas, annadanam, spiritual activities, festivals and charitable initiatives.'}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#E5B839]">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#FFE58F]" />
                <span>{currentLang === 'te' ? '100% సురక్షిత డిజిటల్ సమర్పణ' : '100% Secure Digital Giving'}</span>
              </span>
              <span className="text-[#D4AF37]/50">•</span>
              <span className="flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-[#FFE58F]" />
                <span>{currentLang === 'te' ? 'తక్షణ అధికారిక ఈ-రసీదు' : 'Instant Official E-Receipt'}</span>
              </span>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
            {/* Sacred Temple Darshan Mini Card */}
            <div className="mb-4 w-full max-w-xs rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-xl bg-[#280408]/80 backdrop-blur-sm p-3 flex items-center gap-3">
              <img
                src="/images/god-venkateswara.svg"
                alt="Lord Venkateswara Swamy Blessings"
                referrerPolicy="no-referrer"
                className="w-14 h-14 rounded-xl object-cover border border-[#FFE58F]/40 shrink-0"
              />
              <div className="text-left">
                <span className="text-[10px] uppercase font-bold text-[#E5B839] tracking-wider">
                  {currentLang === 'te' ? 'దివ్య ఆశీస్సులు' : 'Divine Sanctum'}
                </span>
                <p className="text-xs font-semibold text-[#FFF2C6] leading-tight">
                  {currentLang === 'te' ? 'స్వామివారి నిత్య అన్నదాన & పూజా సేవ' : 'Nitya Annadanam & Temple Seva'}
                </p>
              </div>
            </div>

            <button
              id="cta-donate-now-btn"
              onClick={onOpenDonationPage}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-[#E5B839] to-[#D48806] hover:from-[#FFE29F] hover:to-[#C58000] text-[#360910] font-bold text-lg shadow-2xl hover:shadow-[#FFE58F]/20 transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3 border border-[#FFF5CC]"
            >
              <HeartHandshake className="w-6 h-6 text-[#360910]" />
              <span>{currentLang === 'te' ? 'Donate Now (విరాళం)' : 'Donate Now'}</span>
              <ChevronRight className="w-5 h-5 text-[#360910]" />
            </button>
            <span className="text-[11px] text-[#D4AF37]/80 mt-2 font-medium">
              {currentLang === 'te' ? 'UPI, కార్డ్, నెట్ బ్యాంకింగ్ సదుపాయం' : 'UPI, Cards & Net Banking Accepted'}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};
