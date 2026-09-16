import React from 'react';
import { 
  HeartHandshake, MapPin, Phone, Mail, Clock, ShieldCheck, 
  ChevronRight, ExternalLink, Share2, MessageCircle
} from 'lucide-react';
import { Language } from '../types';
import { TEMPLE_INFO } from '../data/templeData';
import { TempleEmblem, DiyaIcon, LotusIcon } from './TempleMotifs';

interface FooterProps {
  currentLang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onNavigate,
  onOpenDonate,
}) => {
  return (
    <footer className="bg-gradient-to-b from-[#2B060A] via-[#200407] to-[#140204] text-white pt-16 pb-8 border-t-2 border-[#D4AF37]/40 relative overflow-hidden">
      
      {/* Background Decorative Motif */}
      <div className="absolute right-0 top-0 opacity-5 pointer-events-none">
        <LotusIcon className="w-96 h-96 text-[#FFE58F]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Footer Banner: Deity & Temple Identity */}
        <div className="pb-12 border-b border-[#5B101D] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="p-2 rounded-full bg-[#5B101D]/40 border border-[#D4AF37]/30">
              <TempleEmblem className="w-14 h-14" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E5B839] font-bold">
                {currentLang === 'te' ? 'దివ్య పుణ్యక్షేత్రం' : 'Sacred Hindu Devasthanam'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-temple font-bold text-[#FFF2C6]">
                {currentLang === 'te' ? TEMPLE_INFO.nameTe : TEMPLE_INFO.nameEn}
              </h3>
              <p className="text-xs text-[#E8DCC0]">
                {currentLang === 'te' ? `మూలవిరాట్: ${TEMPLE_INFO.deityNameTe}` : `Presiding Deity: ${TEMPLE_INFO.deityNameEn}`}
              </p>
            </div>
          </div>

          {/* Quick Offering Button */}
          <button
            onClick={onOpenDonate}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C58000] hover:from-[#FFE29F] hover:to-[#B87200] text-[#360910] font-bold text-sm shadow-lg transition-all flex items-center gap-2"
          >
            <HeartHandshake className="w-4 h-4" />
            <span>{currentLang === 'te' ? 'ఆలయ సేవకు విరాళం' : 'Offer Temple Seva Donation'}</span>
          </button>
        </div>

        {/* 4-Column Grid: Quick Links, Timings, Contact, Social / Trust */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 py-12 text-xs sm:text-sm">
          
          {/* Column 1: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-serif-temple text-base font-bold text-[#FFE58F] border-b border-[#D4AF37]/30 pb-2">
              {currentLang === 'te' ? 'ముఖ్య లింకులు' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-[#E8DCC0]">
              {[
                { id: 'about', labelEn: 'About Temple & Deity', labelTe: 'ఆలయ చరిత్ర & ప్రాశస్త్యం' },
                { id: 'poojas', labelEn: 'Daily Poojas & Sevas', labelTe: 'నిత్య పూజలు & సేవలు' },
                { id: 'festivals', labelEn: 'Upcoming Festivals', labelTe: 'పండుగలు & ఉత్సవాలు' },
                { id: 'gallery', labelEn: 'Sacred Photo Gallery', labelTe: 'దివ్య చిత్రమాలిక' },
                { id: 'devotional', labelEn: 'Daily Slokas & Mantras', labelTe: 'శ్లోకాలు & భజనలు' },
                { id: 'contact', labelEn: 'Timings & Directions', labelTe: 'సమయాలు & మార్గదర్శకత్వం' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="hover:text-[#FFE58F] transition-colors flex items-center gap-1.5 text-left py-0.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{currentLang === 'te' ? link.labelTe : link.labelEn}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Daily Pooja Timings Summary */}
          <div className="space-y-4">
            <h4 className="font-serif-temple text-base font-bold text-[#FFE58F] border-b border-[#D4AF37]/30 pb-2 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#E5B839]" />
              <span>{currentLang === 'te' ? 'నిత్య సమయ పట్టిక' : 'Daily Pooja Timings'}</span>
            </h4>
            <ul className="space-y-2 text-[#E8DCC0]">
              <li className="flex justify-between border-b border-[#5B101D]/50 pb-1">
                <span>{currentLang === 'te' ? 'సుప్రభాత సేవ:' : 'Suprabhatam:'}</span>
                <strong className="text-white">05:30 AM</strong>
              </li>
              <li className="flex justify-between border-b border-[#5B101D]/50 pb-1">
                <span>{currentLang === 'te' ? 'నిత్య అభిషేకం:' : 'Nitya Abhishekam:'}</span>
                <strong className="text-white">06:30 AM</strong>
              </li>
              <li className="flex justify-between border-b border-[#5B101D]/50 pb-1">
                <span>{currentLang === 'te' ? 'సర్వదర్శనం (ఉదయం):' : 'Sarva Darshanam:'}</span>
                <strong className="text-white">{TEMPLE_INFO.darshanTimings.morning}</strong>
              </li>
              <li className="flex justify-between border-b border-[#5B101D]/50 pb-1">
                <span>{currentLang === 'te' ? 'మధ్యాహ్న నివేదన:' : 'Madhyahna Naivedyam:'}</span>
                <strong className="text-white">12:30 PM</strong>
              </li>
              <li className="flex justify-between border-b border-[#5B101D]/50 pb-1">
                <span>{currentLang === 'te' ? 'సాయంకాల దర్శనం:' : 'Evening Darshan:'}</span>
                <strong className="text-white">{TEMPLE_INFO.darshanTimings.evening}</strong>
              </li>
              <li className="flex justify-between">
                <span>{currentLang === 'te' ? 'ఏకాంత సేవ / ద్వారబంధం:' : 'Ekanta Seva / Closing:'}</span>
                <strong className="text-white">08:45 PM</strong>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-4">
            <h4 className="font-serif-temple text-base font-bold text-[#FFE58F] border-b border-[#D4AF37]/30 pb-2">
              {currentLang === 'te' ? 'ఆలయ కార్యాలయం' : 'Devasthanam Office'}
            </h4>
            <div className="space-y-3 text-[#E8DCC0]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{currentLang === 'te' ? TEMPLE_INFO.addressTe : TEMPLE_INFO.addressEn}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="font-mono">{TEMPLE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span className="break-all">{TEMPLE_INFO.email}</span>
              </div>
              <div className="pt-2 text-xs text-[#E5B839]">
                <strong>Trust PAN:</strong> <span className="font-mono">{TEMPLE_INFO.panNumber}</span>
              </div>
            </div>
          </div>

          {/* Column 4: WhatsApp / Social / Trust Statement */}
          <div className="space-y-4">
            <h4 className="font-serif-temple text-base font-bold text-[#FFE58F] border-b border-[#D4AF37]/30 pb-2">
              {currentLang === 'te' ? 'భక్త బృందం & సమాచారం' : 'Devotee Connect'}
            </h4>
            <p className="text-xs text-[#E8DCC0] leading-relaxed">
              {currentLang === 'te'
                ? 'ఆలయ సమాచారం, నిత్య పూజల విశేషాలు మరియు పండుగల ముహూర్తాల నోటిఫికేషన్లు పొందడానికి వాట్సాప్ గ్రూపులో చేరండి.'
                : 'Receive daily suprabhatam slokas, sankalpam reminders, and upcoming festival schedules via our official channel.'}
            </p>

            {/* WhatsApp Community Button */}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#128C7E] hover:bg-[#075E54] text-white font-bold text-xs shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{currentLang === 'te' ? 'వాట్సాప్ అప్‌డేట్స్ పొందండి' : 'Join WhatsApp Channel'}</span>
            </a>

            {/* Trust Statement */}
            <div className="pt-2">
              <div className="p-3 rounded-xl bg-[#3B090F] border border-[#D4AF37]/30 text-[11px] text-[#E8DCC0]">
                <span className="text-[#FFE58F] font-bold block mb-1">
                  {currentLang === 'te' ? 'విశ్వసనీయత & పవిత్రత' : 'Divine Trust Statement'}
                </span>
                {currentLang === 'te'
                  ? 'సమర్పించిన ప్రతి పైసా శాస్త్రోక్తమైన ఆలయ నిత్య సేవలకు మరియు అన్నదాన పుణ్యకార్యాలకు మాత్రమే వినియోగించబడుతుంది.'
                  : 'Every sacred offering is deployed with utmost integrity towards Vedic worship, pilgrim welfare, and charitable food distribution.'}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Legalese Bar */}
        <div className="pt-8 border-t border-[#5B101D] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A89088]">
          <div className="text-center sm:text-left">
            <p>© {new Date().getFullYear()} {TEMPLE_INFO.trustNameEn}. All Sacred Rights Reserved.</p>
            <p className="text-[11px] text-[#8C6D65] mt-0.5">
              Designed with timeless South Indian Hindu spiritual architecture.
            </p>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
              {currentLang === 'te' ? 'ట్రస్ట్ నిబంధనలు' : 'Trust Bylaws'}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
              {currentLang === 'te' ? 'సహాయ కేంద్రం' : 'Help & Support'}
            </button>
            <span>•</span>
            <button onClick={onOpenDonate} className="hover:text-white transition-colors">
              {currentLang === 'te' ? 'ఈ-విరాళ విధానం' : 'Online Donation Policy'}
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
