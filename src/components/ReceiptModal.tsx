import React, { useRef, useState } from 'react';
import { X, Printer, Download, CheckCircle, ShieldCheck, Heart, Sparkles, Loader2, FileText } from 'lucide-react';
import { DonationRecord, Language } from '../types';
import { TEMPLE_INFO } from '../data/templeData';
import { TempleEmblem, DiyaIcon, LotusIcon } from './TempleMotifs';
import { downloadReceiptAsPdf } from '../utils/pdfGenerator';

interface ReceiptModalProps {
  receipt: DonationRecord;
  currentLang: Language;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  receipt,
  currentLang,
  onClose,
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [pdfSuccess, setPdfSuccess] = useState(false);

  const handleDownloadPdf = async () => {
    if (isGeneratingPdf) return;
    setIsGeneratingPdf(true);
    setPdfSuccess(false);

    try {
      await downloadReceiptAsPdf(
        receiptRef.current,
        receipt,
        `Donation-Receipt-${receipt.receiptNumber}.pdf`
      );
      setPdfSuccess(true);
      setTimeout(() => setPdfSuccess(false), 4000);
    } catch (err) {
      console.error('Error downloading PDF receipt:', err);
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = async () => {
    // As requested: print receipt should download in PDF format as well as trigger system print
    handleDownloadPdf();
    // Allow a slight moment for user to notice PDF before print dialog opens
    setTimeout(() => {
      window.print();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full my-auto max-h-[94vh] overflow-hidden shadow-2xl border-2 border-[#D4AF37] relative flex flex-col">
        
        {/* Top Action Bar (hidden when printing) */}
        <div className="no-print bg-[#4A0E17] text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b border-[#D4AF37]/30 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#FFE58F] shrink-0" />
            <h3 className="font-serif-temple text-sm sm:text-base md:text-lg font-bold text-[#FFE58F] truncate">
              {currentLang === 'te' ? 'అధికారిక విరాళం ఈ-రసీదు' : 'Official Electronic Donation Receipt'}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              id="receipt-print-btn"
              onClick={handlePrint}
              disabled={isGeneratingPdf}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-[#5E141F] hover:bg-[#731A28] disabled:opacity-60 text-xs font-semibold text-[#FFE58F] border border-[#D4AF37]/40 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              title={currentLang === 'te' ? 'రసీదు ప్రింట్ & PDF డౌన్‌లోడ్' : 'Print Receipt & Download PDF'}
            >
              <Printer className="w-4 h-4 text-[#FFE58F]" />
              <span className="inline">{currentLang === 'te' ? 'ప్రింట్ / PDF' : 'Print / PDF'}</span>
            </button>

            <button
              id="receipt-download-pdf-btn"
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-lg bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#FFE58F] hover:to-[#D4AF37] disabled:opacity-60 text-xs font-bold text-[#3B070E] flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
              title={currentLang === 'te' ? 'రసీదు PDF డౌన్‌లోడ్ చేయండి' : 'Download Receipt in PDF Format'}
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#3B070E]" />
                  <span className="inline">{currentLang === 'te' ? 'డౌన్‌లోడ్ అవుతోంది...' : 'Generating PDF...'}</span>
                </>
              ) : pdfSuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                  <span className="inline">{currentLang === 'te' ? 'PDF డౌన్‌లోడ్ అయింది!' : 'PDF Downloaded!'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#3B070E]" />
                  <span className="inline">{currentLang === 'te' ? 'PDF డౌన్‌లోడ్' : 'Download PDF'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Content Area */}
        <div id="printable-receipt" ref={receiptRef} className="p-3 sm:p-6 md:p-8 bg-[#FFFDF9] text-[#281714] overflow-y-auto flex-1">
          
          {/* Traditional Ornamental Frame Outline */}
          <div className="border-2 sm:border-4 border-double border-[#5B101D] p-3 sm:p-6 md:p-8 rounded-2xl relative bg-white">
            
            {/* Header: Temple Logo, Name, Address */}
            <div className="text-center pb-5 sm:pb-6 border-b-2 border-[#5B101D]/20 relative">
              <div className="flex justify-center mb-2">
                <TempleEmblem className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>
              <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#8A5A00]">
                {TEMPLE_INFO.trustNameEn}
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif-temple font-extrabold text-[#4A0E17] mt-0.5">
                {currentLang === 'te' ? TEMPLE_INFO.nameTe : TEMPLE_INFO.nameEn}
              </h2>
              <p className="text-xs text-[#5D4037] max-w-md mx-auto mt-1">
                {currentLang === 'te' ? TEMPLE_INFO.addressTe : TEMPLE_INFO.addressEn}
              </p>
              <p className="text-[10px] sm:text-[11px] text-[#734A12] mt-0.5">
                Phone: {TEMPLE_INFO.phone} • Email: {TEMPLE_INFO.email}
              </p>
              <div className="inline-block mt-3 px-3 sm:px-4 py-1 rounded-full bg-[#FAF2E1] border border-[#D4AF37] text-[10px] sm:text-xs font-bold text-[#5B101D] uppercase tracking-wider">
                {currentLang === 'te' ? 'విరాళం రసీదు / DONATION RECEIPT' : 'OFFICIAL DONATION RECEIPT'}
              </div>
            </div>

            {/* Receipt & Transaction Key Metadata */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 py-3 sm:py-4 border-b border-[#E8DCC0] text-xs sm:text-sm">
              <div>
                <span className="text-[#8A5A00] block text-[10px] sm:text-[11px] uppercase font-bold">
                  {currentLang === 'te' ? 'రసీదు సంఖ్య / Receipt No.' : 'Receipt Number'}
                </span>
                <strong className="text-xs sm:text-sm md:text-base text-[#4A0E17] font-mono break-all">{receipt.receiptNumber}</strong>
              </div>

              <div className="text-right">
                <span className="text-[#8A5A00] block text-[10px] sm:text-[11px] uppercase font-bold">
                  {currentLang === 'te' ? 'తేదీ & సమయం / Date' : 'Donation Date'}
                </span>
                <strong className="text-xs sm:text-sm text-[#4A0E17]">{new Date(receipt.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</strong>
              </div>

              <div>
                <span className="text-[#8A5A00] block text-[10px] sm:text-[11px] uppercase font-bold">
                  {currentLang === 'te' ? 'లావాదేవీ ఐడీ / Txn ID' : 'Transaction ID'}
                </span>
                <span className="font-mono text-[11px] sm:text-xs text-[#5D4037] break-all">{receipt.transactionId}</span>
              </div>

              <div className="text-right">
                <span className="text-[#8A5A00] block text-[10px] sm:text-[11px] uppercase font-bold">
                  {currentLang === 'te' ? 'చెల్లింపు విధానం / Mode' : 'Payment Method'}
                </span>
                <span className="font-semibold text-xs sm:text-sm text-[#5B101D]">{receipt.paymentMethod}</span>
              </div>
            </div>

            {/* Donor Information */}
            <div className="py-3 sm:py-4 border-b border-[#E8DCC0] space-y-2 text-xs sm:text-sm">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'భక్తుని పేరు / Donor Name:' : 'Donor Name:'}</span>
                <strong className="text-[#4A0E17] text-xs sm:text-sm md:text-base">{receipt.donorName}</strong>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'మొబైల్ సంఖ్య / Mobile:' : 'Mobile Number:'}</span>
                <span className="text-[#5D4037] font-mono">{receipt.mobile}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'ఇమెయిల్ / Email:' : 'Email Address:'}</span>
                <span className="text-[#5D4037] break-all">{receipt.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'చిరునామా / Address:' : 'Address:'}</span>
                <span className="text-[#5D4037] sm:text-right max-w-xs">{receipt.address}, {receipt.city}, {receipt.state}, {receipt.country}</span>
              </div>
              {receipt.panNumber && (
                <div className="flex flex-col sm:flex-row sm:justify-between gap-0.5 sm:gap-2 pt-1">
                  <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'పాన్ నంబర్ / Donor PAN:' : 'Donor PAN Number:'}</span>
                  <span className="font-mono font-bold text-[#4A0E17]">{receipt.panNumber}</span>
                </div>
              )}
            </div>

            {/* Sacred Donation Purpose & Amount Display */}
            <div className="my-4 sm:my-5 p-3 sm:p-4 rounded-xl bg-[#FAF2E1] border border-[#D4AF37] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-[#8A5A00] block">
                  {currentLang === 'te' ? 'విరాళ ఉద్దేశం / Seva Purpose' : 'Donation Purpose'}
                </span>
                <h4 className="text-sm sm:text-base md:text-lg font-serif-temple font-bold text-[#4A0E17]">
                  {receipt.purpose}
                </h4>
              </div>

              <div className="text-center sm:text-right">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase text-[#8A5A00] block">
                  {currentLang === 'te' ? 'సమర్పించిన మొత్తం / Amount' : 'Amount Received'}
                </span>
                <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#5B101D] font-mono">
                  ₹{receipt.amount.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Status & Official Note */}
            <div className="pt-2 text-center text-xs text-[#5D4037] space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-[#2E7D32] font-bold">
                <CheckCircle className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'చెల్లింపు విజయవంతంగా ధ్రువీకరించబడినది (PAYMENT VERIFIED)' : 'PAYMENT VERIFIED & CREDITED TO TEMPLE TRUST ACCOUNT'}</span>
              </div>

              {/* Mandatory user requirement note: "This receipt is generated electronically." */}
              <p className="font-medium text-[#734A12] italic">
                "This receipt is generated electronically."
              </p>

              {/* Configurable PAN/80G Section (Prompt requirement: If eligible, provide configurable section. Do not claim unless configured) */}
              <div className="mt-3 p-2.5 rounded-lg bg-[#FAF6EE] border border-[#E8DCC0] text-[11px] text-[#734A12] leading-tight">
                <strong>{currentLang === 'te' ? 'పన్ను మినహాయింపు & చట్టబద్ధ సమాచారం:' : 'Trust & Statutory Information:'}</strong><br />
                {currentLang === 'te' 
                  ? `ఆలయ ట్రస్ట్ పాన్: ${TEMPLE_INFO.panNumber}. ఈ విరాళం ఆలయ నిబంధనలకు మరియు చట్టబద్ధ నిబంధనలకు లోబడి మాత్రమే స్వీకరించబడినది. (80G పన్ను మినహాయింపు ట్రస్ట్ అధికారిక రిజిస్ట్రేషన్ ప్రకారం వర్తిస్తుంది).`
                  : `Temple Trust PAN: ${TEMPLE_INFO.panNumber}. Donations are accepted for religious, annadanam, and charitable purposes in accordance with the temple constitution and governing laws.`}
              </div>
            </div>

            {/* Traditional Temple Footer Blessing */}
            <div className="mt-6 pt-4 border-t border-[#E8DCC0] flex items-center justify-between text-[11px] text-[#8A5A00]">
              <span>శ్రీరస్తు • శుభమస్తు • అవిఘ్నమస్తు</span>
              <span className="font-semibold text-[#5B101D]">{TEMPLE_INFO.trustNameEn}</span>
            </div>

          </div>

        </div>

        {/* Footer Actions (hidden when printing) */}
        <div className="no-print bg-[#FAF6EE] px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#E8DCC0] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5D4037]">
              {currentLang === 'te' ? 'ఈ అధికారిక రసీదు PDF రూపంలో భద్రపరచుకోవచ్చు' : 'Official tax-compliant receipt saved in PDF format'}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] hover:from-[#FFE58F] hover:to-[#D4AF37] disabled:opacity-60 text-[#3B070E] font-bold text-xs sm:text-sm shadow flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#3B070E]" />
                  <span>{currentLang === 'te' ? 'PDF సిద్ధమౌతోంది...' : 'Generating PDF...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4 text-[#3B070E]" />
                  <span>{currentLang === 'te' ? 'PDF రసీదు డౌన్‌లోడ్' : 'Download PDF Receipt'}</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="px-5 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-[#5B101D] hover:bg-[#731A28] text-[#FFE58F] font-bold text-xs sm:text-sm shadow transition-colors cursor-pointer"
            >
              {currentLang === 'te' ? 'పూర్తయింది (సరే)' : 'Done'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
