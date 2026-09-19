import React, { useState } from 'react';
import { 
  MapPin, Phone, Clock, Send, CheckCircle, AlertCircle, 
  ExternalLink, ShieldCheck, MessageSquare 
} from 'lucide-react';
import { Language, ContactMessage } from '../types';
import { TEMPLE_INFO } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon } from './TempleMotifs';

interface ContactPageProps {
  currentLang: Language;
  onSendMessage?: (msg: ContactMessage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang, onSendMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  
  // Basic spam protection (honeypot + math challenge)
  const [honeypot, setHoneypot] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const mathChallenge = { num1: 5, num2: 4, expected: 9 };

  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Spam protection check
    if (honeypot.trim() !== '') {
      // Bot detected via honeypot
      return;
    }

    if (parseInt(captchaAnswer.trim(), 10) !== mathChallenge.expected) {
      setFormError(
        currentLang === 'te'
          ? 'దయచేసి స్పామ్ రక్షణ గణనను సరిగ్గా పూరించండి (5 + 4 = 9).'
          : 'Please enter the correct answer for the security verification (5 + 4 = 9).'
      );
      return;
    }

    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormError(
        currentLang === 'te'
          ? 'దయచేసి అవసరమైన అన్ని వివరాలను నమోదు చేయండి.'
          : 'Please complete all required fields.'
      );
      return;
    }

    const newMsg: ContactMessage = {
      id: `msg_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      subject,
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    if (onSendMessage) {
      onSendMessage(newMsg);
    }

    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF6EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD8BA] text-[#5B101D] text-xs font-semibold tracking-wider uppercase mb-3">
            <DiyaIcon className="w-4 h-4" />
            <span>{currentLang === 'te' ? 'ఆలయ సంప్రదింపులు & మార్గదర్శకత్వం' : 'Temple Location & Helpdesk'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-[32px] font-serif-temple font-bold text-[#4A0E17] tracking-tight">
            {currentLang === 'te' ? 'ఆలయాన్ని సంప్రదించండి' : 'Contact The Temple'}
          </h2>
          <OrnamentalDivider />
          <p className="text-[#5D4037] text-xs sm:text-sm md:text-[14.5px] leading-relaxed">
            {currentLang === 'te'
              ? 'దర్శనం, విశేష సేవల వివరాలు, వసతి మరియు విరాళాల సంబంధిత సమాచారం కొరకు ఆలయ కార్యాలయాన్ని సంప్రదించవచ్చు.'
              : 'Our devoted temple trust administrators and priests are here to assist you with pilgrimage planning, seva bookings, and devotional inquiries.'}
          </p>
        </div>

        {/* Info Cards Grid: Address, Phone, Timings (3 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-14">
          
          {/* 1. Temple Address */}
          <div className="p-6 rounded-2xl bg-white border border-[#E8DCC0] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2E1] border border-[#D4AF37] flex items-center justify-center text-[#5B101D] mb-4">
              <MapPin className="w-5 h-5 text-[#C25E00]" />
            </div>
            <h3 className="font-serif-temple text-base font-bold text-[#4A0E17] mb-1">
              {currentLang === 'te' ? 'ఆలయ చిరునామా' : 'Temple Address'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
              {currentLang === 'te' ? TEMPLE_INFO.addressTe : TEMPLE_INFO.addressEn}
            </p>
          </div>

          {/* 2. Phone Helpline */}
          <div className="p-6 rounded-2xl bg-white border border-[#E8DCC0] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2E1] border border-[#D4AF37] flex items-center justify-center text-[#5B101D] mb-4">
              <Phone className="w-5 h-5 text-[#C25E00]" />
            </div>
            <h3 className="font-serif-temple text-base font-bold text-[#4A0E17] mb-1">
              {currentLang === 'te' ? 'ఫోన్ నంబర్లు' : 'Phone Numbers'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5D4037] font-mono leading-relaxed">
              Main Office: {TEMPLE_INFO.phone}<br />
              Priest Helpline: +91 94400 00000<br />
              <span className="text-[11px] text-[#8A5A00] font-sans">08:00 AM - 08:00 PM IST</span>
            </p>
          </div>

          {/* 3. Temple Timings */}
          <div className="p-6 rounded-2xl bg-white border border-[#E8DCC0] shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-xl bg-[#FAF2E1] border border-[#D4AF37] flex items-center justify-center text-[#5B101D] mb-4">
              <Clock className="w-5 h-5 text-[#C25E00]" />
            </div>
            <h3 className="font-serif-temple text-base font-bold text-[#4A0E17] mb-1">
              {currentLang === 'te' ? 'దర్శనం సమయాలు' : 'Darshan Timings'}
            </h3>
            <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed">
              <strong>Morning:</strong> {TEMPLE_INFO.darshanTimings.morning}<br />
              <strong>Evening:</strong> {TEMPLE_INFO.darshanTimings.evening}<br />
              <span className="text-[11px] text-[#C25E00]">Harathi: {TEMPLE_INFO.darshanTimings.mahaMangalaHarathi}</span>
            </p>
          </div>

        </div>

        {/* Two Columns: Google Maps Section & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Google Maps Section as requested */}
          <div className="lg:col-span-6 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-[#E8DCC0] shadow-md overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[11px] font-bold uppercase text-[#8A5A00] tracking-wider">
                    {currentLang === 'te' ? 'దివ్య క్షేత్ర స్థానం' : 'Location Map'}
                  </span>
                  <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? 'ఆలయ ప్రదేశం & గూగుల్ మ్యాప్' : 'Google Maps & Directions'}
                  </h3>
                </div>

                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#FAF2E1] text-[#5B101D] hover:bg-[#EAD8BA] text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Map Canvas Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E8DCC0] h-80 bg-[#E5E3DF] flex items-center justify-center">
                {/* Visual Devotional Map Graphic */}
                <div 
                  className="absolute inset-0 bg-cover bg-center opacity-75"
                  style={{
                    backgroundImage: `url('/images/temple-gopuram.svg')`
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2E070B]/85 via-black/20 to-transparent" />
                
                {/* Pin & Card Overlay */}
                <div className="relative z-10 p-4 rounded-xl bg-white/95 backdrop-blur-md border border-[#D4AF37] shadow-xl text-center max-w-xs mx-4">
                  <div className="w-10 h-10 mx-auto rounded-full bg-[#5B101D] text-[#FFE58F] flex items-center justify-center mb-2 shadow">
                    <MapPin className="w-5 h-5 text-[#FFE58F]" />
                  </div>
                  <h4 className="font-serif-temple text-sm font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? TEMPLE_INFO.nameTe : TEMPLE_INFO.nameEn}
                  </h4>
                  <p className="text-[11px] text-[#5D4037] mt-1">
                    {currentLang === 'te' ? TEMPLE_INFO.addressTe : TEMPLE_INFO.addressEn}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Thirumalakonda,+Ayyalurivari+Palle,+C.+S.+Puram,+Prakasam+District,+Andhra+Pradesh+523112"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#C25E00] hover:underline"
                  >
                    <span>{currentLang === 'te' ? 'గూగుల్ మ్యాప్స్ దిశానిర్దేశం' : 'Get Driving Directions'}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form as requested */}
          <div className="lg:col-span-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DCC0] shadow-md">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-5 h-5 text-[#5B101D]" />
                <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                  {currentLang === 'te' ? 'సందేశం పంపండి' : 'Send Devotional Inquiry'}
                </h3>
              </div>

              {submitted ? (
                <div className="p-8 text-center rounded-2xl bg-[#FFFDF7] border border-[#D4AF37] space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#FAF2E1] border border-[#D4AF37] flex items-center justify-center text-[#2E7D32] mx-auto">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h4 className="font-serif-temple text-xl font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? 'మీ సందేశం విజయవంతంగా అందింది' : 'Message Successfully Received'}
                  </h4>
                  <p className="text-xs sm:text-sm text-[#5D4037] leading-relaxed max-w-sm mx-auto">
                    {currentLang === 'te'
                      ? 'మీ విచారణకు ఆలయ కార్యాలయ ప్రతినిధులు త్వరలోనే స్పందిస్తారు. ఓం నమో వేంకటేశాయ.'
                      : 'Thank you for reaching out. Our temple trust office will respond to your query at the earliest.'}
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-5 py-2 rounded-xl bg-[#5B101D] text-[#FFE58F] text-xs font-bold shadow"
                  >
                    {currentLang === 'te' ? 'మరొక సందేశం పంపండి' : 'Send Another Message'}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Honeypot field for bot protection (hidden from humans) */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="website_honeypot_field"
                      tabIndex={-1}
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-name" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'మీ పేరు (Your Name) *' : 'Your Name *'}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder={currentLang === 'te' ? 'శ్రీకాంత్' : 'e.g. Srikant Sharma'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                        {currentLang === 'te' ? 'ఇమెయిల్ (Email) *' : 'Email Address *'}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] text-sm"
                      />
                    </div>

                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                        {currentLang === 'te' ? 'ఫోన్ నంబర్ (Phone)' : 'Phone Number'}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-subject" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'విషయం (Subject)' : 'Inquiry Subject'}
                    </label>
                    <select
                      id="contact-subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] bg-white text-sm font-medium text-[#4A0E17]"
                    >
                      <option>General Temple Inquiry</option>
                      <option>Seva & Pooja Booking Guidance</option>
                      <option>Annadanam Sponsorship Query</option>
                      <option>Kalyanotsavam Availability</option>
                      <option>Donation & Receipt Verification</option>
                      <option>Pilgrim Accommodation</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'మీ సందేశం (Message) *' : 'Your Message *'}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder={currentLang === 'te' ? 'మీ ప్రశ్న లేదా సందేశం ఇక్కడ రాయండి...' : 'Please describe your query or pilgrimage request...'}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] text-sm"
                    />
                  </div>

                  {/* Basic Spam Protection Math Challenge as requested */}
                  <div className="p-3.5 rounded-xl bg-[#FAF2E1] border border-[#D4AF37]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-xs text-[#5B101D] font-semibold">
                      <ShieldCheck className="w-4 h-4 text-[#C25E00]" />
                      <span>Security Verification: What is 5 + 4?</span>
                    </div>
                    <input
                      type="number"
                      required
                      placeholder="Answer (e.g. 9)"
                      value={captchaAnswer}
                      onChange={(e) => setCaptchaAnswer(e.target.value)}
                      className="w-full sm:w-28 px-3 py-1.5 rounded-lg bg-white border border-[#D4AF37] text-center text-sm font-bold text-[#4A0E17]"
                    />
                  </div>

                  {/* Error Notification */}
                  {formError && (
                    <div className="p-3 rounded-xl bg-[#FFEBEE] border border-[#EF5350] text-xs text-[#C62828] flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="w-full py-3 rounded-xl bg-[#5B101D] hover:bg-[#731A28] text-[#FFE58F] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{currentLang === 'te' ? 'సందేశం పంపండి' : 'Send Message'}</span>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
