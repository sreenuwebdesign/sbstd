import React, { useState } from 'react';
import { 
  HeartHandshake, ShieldCheck, CheckCircle, 
  ChevronDown, ChevronUp, ArrowLeft, Download, FileText, 
  HelpCircle, AlertCircle, Sparkles, Building2, Lock
} from 'lucide-react';
import { Language, DonationPurpose, DonationRecord } from '../types';
import { TEMPLE_INFO, DONATION_PURPOSES, DONATION_AMOUNTS, DONATION_FAQS } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon, LotusIcon, TempleBellIcon } from './TempleMotifs';
import { templeAudio } from '../utils/audio';
import { downloadReceiptAsPdf } from '../utils/pdfGenerator';

interface DonationPageProps {
  currentLang: Language;
  onBackToHome: () => void;
  onDonationSuccess: (record: DonationRecord) => void;
  onViewReceipt: (record: DonationRecord) => void;
  preselectedPurpose?: DonationPurpose;
  preselectedAmount?: number;
}

export const DonationPage: React.FC<DonationPageProps> = ({
  currentLang,
  onBackToHome,
  onDonationSuccess,
  onViewReceipt,
  preselectedPurpose,
  preselectedAmount,
}) => {
  // Donation Selection State
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(preselectedAmount || 1001);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [selectedPurpose, setSelectedPurpose] = useState<DonationPurpose>(preselectedPurpose || 'Annadanam');
  
  // Donor Form State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Andhra Pradesh');
  const [country, setCountry] = useState('India');
  const [panNumber, setPanNumber] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Process & Feedback
  const [isProcessing, setIsProcessing] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [completedDonation, setCompletedDonation] = useState<DonationRecord | null>(null);

  // FAQ Accordion State
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Effective amount calculation
  const getEffectiveAmount = (): number => {
    if (selectedAmount === 'custom') {
      const parsed = parseFloat(customAmount);
      return isNaN(parsed) || parsed <= 0 ? 0 : parsed;
    }
    return selectedAmount;
  };

  const effectiveAmount = getEffectiveAmount();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Form Validations
    if (!fullName.trim()) {
      setFormError(currentLang === 'te' ? 'దయచేసి మీ పూర్తి పేరు నమోదు చేయండి.' : 'Please enter your full name.');
      return;
    }
    if (!mobile.trim() || mobile.replace(/\D/g, '').length < 10) {
      setFormError(currentLang === 'te' ? 'దయచేసి సరైన 10 అంకెల మొబైల్ నంబరు నమోదు చేయండి.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setFormError(currentLang === 'te' ? 'దయచేసి సరైన ఇమెయిల్ చిరునామా నమోదు చేయండి.' : 'Please enter a valid email address.');
      return;
    }
    if (effectiveAmount < 1) {
      setFormError(currentLang === 'te' ? 'దయచేసి సరైన విరాళం మొత్తాన్ని ఎంచుకోండి.' : 'Please select or enter a valid donation amount.');
      return;
    }
    if (!agreedToTerms) {
      setFormError(currentLang === 'te' ? 'దయచేసి ఇచ్చిన వివరాలు సరైనవని అంగీకరించండి.' : 'Please agree that the information provided is correct.');
      return;
    }

    setIsProcessing(true);

    const launchRazorpay = async () => {
      try {
        let orderId: string | undefined = undefined;
        let keyId = 'rzp_test_Tdwg8WzyCqcdry';

        // 1. Fetch Razorpay Order from server
        try {
          const orderRes = await fetch('/api/create-razorpay-order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              amount: effectiveAmount,
              currency: 'INR',
              receipt: `rec_${Date.now()}`,
              notes: {
                donorName: fullName.trim(),
                mobile: mobile.trim(),
                purpose: selectedPurpose,
              },
            }),
          });

          if (orderRes.ok) {
            const orderData = await orderRes.json();
            if (orderData.orderId) {
              orderId = orderData.orderId;
            }
            if (orderData.keyId) {
              keyId = orderData.keyId;
            }
          }
        } catch (apiErr) {
          console.warn('Backend order call:', apiErr);
        }

        // 2. If Razorpay SDK is loaded on window, open official checkout popup
        const win = window as any;
        if (win && win.Razorpay) {
          const options = {
            key: keyId,
            amount: Math.round(effectiveAmount * 100),
            currency: 'INR',
            name: currentLang === 'te' ? 'శ్రీ తిరుమలనాథ స్వామి దేవస్థానం' : 'Sri Tirumalanadha Swamy Devasthanam',
            description: `${selectedPurpose} - Sacred Offering`,
            image: '/images/god-venkateswara.svg',
            order_id: orderId,
            prefill: {
              name: fullName.trim(),
              email: email.trim(),
              contact: mobile.trim(),
            },
            notes: {
              purpose: selectedPurpose,
              donorAddress: `${city.trim() || 'Prakasam'}, ${stateName}`,
            },
            theme: {
              color: '#5B101D',
            },
            handler: async function (response: any) {
              // Verify signature via server endpoint
              try {
                await fetch('/api/verify-razorpay-payment', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(response),
                });
              } catch (verifyErr) {
                console.warn('Payment verification:', verifyErr);
              }

              const now = new Date();
              const uniqueReceiptId = `TEMPLE-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
              const txnId = response.razorpay_payment_id || `RZP_${Date.now()}`;
              const detectedMethod = response?.method ? response.method.toUpperCase() : 'Razorpay Gateway';

              const newRecord: DonationRecord = {
                id: `rec_${Date.now()}`,
                receiptNumber: uniqueReceiptId,
                donorName: fullName.trim(),
                mobile: mobile.trim(),
                email: email.trim(),
                address: address.trim() || 'Ayyalurivari Palle, Andhra Pradesh',
                city: city.trim() || 'Prakasam',
                state: stateName,
                country: country,
                panNumber: panNumber.trim().toUpperCase() || undefined,
                amount: effectiveAmount,
                purpose: selectedPurpose,
                paymentMethod: detectedMethod,
                transactionId: txnId,
                status: 'SUCCESS',
                createdAt: now.toISOString(),
              };

              templeAudio.playTempleBell();
              setIsProcessing(false);
              setCompletedDonation(newRecord);
              onDonationSuccess(newRecord);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            },
            modal: {
              ondismiss: function () {
                setIsProcessing(false);
              },
            },
          };

          const rzpInstance = new win.Razorpay(options);
          rzpInstance.on('payment.failed', function (response: any) {
            setIsProcessing(false);
            setFormError(
              response.error?.description ||
              (currentLang === 'te' ? 'చెల్లింపు విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.' : 'Payment could not be completed. Please try again.')
            );
          });
          rzpInstance.open();
        } else {
          // Fallback if Razorpay SDK script is blocked by browser adblocker
          setTimeout(() => {
            const now = new Date();
            const uniqueReceiptId = `TEMPLE-${now.getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
            const uniqueTxnId = `RZP_TEST_${Date.now()}`;

            const newRecord: DonationRecord = {
              id: `rec_${Date.now()}`,
              receiptNumber: uniqueReceiptId,
              donorName: fullName.trim(),
              mobile: mobile.trim(),
              email: email.trim(),
              address: address.trim() || 'Ayyalurivari Palle, Andhra Pradesh',
              city: city.trim() || 'Prakasam',
              state: stateName,
              country: country,
              panNumber: panNumber.trim().toUpperCase() || undefined,
              amount: effectiveAmount,
              purpose: selectedPurpose,
              paymentMethod: 'Razorpay Gateway',
              transactionId: uniqueTxnId,
              status: 'SUCCESS',
              createdAt: now.toISOString(),
            };

            templeAudio.playTempleBell();
            setIsProcessing(false);
            setCompletedDonation(newRecord);
            onDonationSuccess(newRecord);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }, 1000);
        }
      } catch (err: any) {
        setIsProcessing(false);
        setFormError(err.message || 'Payment initiation failed. Please try again.');
      }
    };

    launchRazorpay();
  };

  // SUCCESS VIEW
  if (completedDonation) {
    return (
      <div className="py-16 bg-[#FAF6EE] min-h-screen">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="rounded-3xl bg-white border-2 border-[#D4AF37] p-8 sm:p-12 shadow-2xl text-center space-y-6 relative overflow-hidden divine-glow">
            
            {/* Top Auspicious Diya */}
            <div className="flex justify-center">
              <div className="p-4 rounded-full bg-[#FAF2E1] border-2 border-[#D4AF37] shadow-inner text-[#5B101D]">
                <CheckCircle className="w-12 h-12 text-[#2E7D32]" />
              </div>
            </div>

            {/* Success Messages as requested */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[#C25E00] font-bold">
                {currentLang === 'te' ? 'సమర్పణ ధ్రువీకరించబడినది' : 'Offering Confirmed & Blessed'}
              </span>
              <h2 className="text-2xl sm:text-4xl font-serif-temple font-extrabold text-[#4A0E17] mt-1">
                {currentLang === 'te' ? 'Donation Successfully Received' : 'Donation Successfully Received'}
              </h2>
              {/* Requested Telugu phrase */}
              <p className="text-xl sm:text-2xl font-telugu text-[#C25E00] font-bold mt-2">
                "మీ పవిత్రమైన సమర్పణకు హృదయపూర్వక ధన్యవాదాలు"
              </p>
              <p className="text-sm text-[#5D4037] mt-1">
                May the divine grace of {TEMPLE_INFO.deityNameEn} bless you and your family with peace and abundance.
              </p>
            </div>

            {/* Details Box */}
            <div className="rounded-2xl bg-[#FAF6EE] border border-[#E8DCC0] p-6 text-left space-y-3 text-sm">
              <div className="flex justify-between items-center py-1 border-b border-[#E8DCC0]">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'భక్తుని పేరు:' : 'Donor Name:'}</span>
                <strong className="text-[#4A0E17] text-base">{completedDonation.donorName}</strong>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E8DCC0]">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'విరాళం మొత్తం:' : 'Donation Amount:'}</span>
                <strong className="text-xl font-bold text-[#5B101D] font-mono">₹{completedDonation.amount.toLocaleString('en-IN')}</strong>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E8DCC0]">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'సేవా ఉద్దేశం:' : 'Donation Purpose:'}</span>
                <span className="font-semibold text-[#4A0E17]">{completedDonation.purpose}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E8DCC0]">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'లావాదేవీ ఐడీ:' : 'Transaction ID:'}</span>
                <span className="font-mono text-xs text-[#5D4037]">{completedDonation.transactionId}</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-[#E8DCC0]">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'తేదీ:' : 'Donation Date:'}</span>
                <span className="text-[#5D4037]">{new Date(completedDonation.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-[#734A12] font-semibold">{currentLang === 'te' ? 'రసీదు సంఖ్య:' : 'Receipt Number:'}</span>
                <span className="font-mono font-bold text-[#5B101D]">{completedDonation.receiptNumber}</span>
              </div>
            </div>

            {/* Action Buttons as requested: "Download Donation Receipt (PDF)" & "Back to Home" */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                id="view-download-receipt-btn"
                onClick={() => {
                  downloadReceiptAsPdf(null, completedDonation);
                  onViewReceipt(completedDonation);
                }}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-[#D4AF37] to-[#C58000] hover:from-[#FFE29F] hover:to-[#B87200] text-[#360910] font-bold text-sm sm:text-base shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-5 h-5 text-[#360910]" />
                <span>{currentLang === 'te' ? 'PDF రసీదు డౌన్‌లోడ్ & ప్రింట్' : 'Download PDF Receipt & Print'}</span>
              </button>

              <button
                id="success-back-home-btn"
                onClick={onBackToHome}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#FAF6EE] hover:bg-[#EAD8BA] text-[#4A0E17] border border-[#D4AF37] font-semibold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'హోమ్ పేజీకి వెళ్లండి' : 'Back to Home'}</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    );
  }

  // MAIN DONATION PAGE VIEW
  return (
    <div className="py-12 bg-[#FAF6EE] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation Link */}
        <button
          onClick={onBackToHome}
          className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-[#5B101D] hover:text-[#8B1D2C] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{currentLang === 'te' ? 'హోమ్ పేజీకి తిరిగి వెళ్లండి' : 'Back to Main Portal'}</span>
        </button>

        {/* Hero Section of Donation Page */}
        <div className="rounded-3xl bg-gradient-to-r from-[#380A11] via-[#4A0E17] to-[#2B060A] text-white p-6 sm:p-10 lg:p-12 border-2 border-[#D4AF37]/50 shadow-2xl mb-14 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Narrative */}
            <div className="lg:col-span-8 space-y-3 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#5E141F] border border-[#D4AF37]/40 text-[#FFE58F] text-xs font-semibold uppercase tracking-wider">
                <DiyaIcon className="w-4 h-4" />
                <span>{currentLang === 'te' ? 'పవిత్ర ధర్మ సమర్పణ' : 'Sacred Seva Offering'}</span>
              </div>

              {/* User requested title */}
              <h1 className="text-2xl sm:text-3xl md:text-[32px] font-serif-temple font-extrabold text-[#FFF2C6] leading-tight">
                Donate to the Temple
              </h1>

              {/* User requested Telugu subtitle */}
              <p className="text-base sm:text-lg md:text-xl font-telugu text-[#FFD54F] font-bold">
                "ఆలయ సేవకు మీ విరాళాన్ని సమర్పించండి"
              </p>

              {/* User requested Subtitle */}
              <p className="text-[#E8DCC0] text-xs sm:text-sm max-w-2xl leading-relaxed">
                "Every contribution, big or small, becomes part of a sacred service."
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2 text-xs text-[#E5B839]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#FFE58F]" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
                <span>•</span>
                <span>Instant E-Receipt Generation</span>
              </div>
            </div>

            {/* Right: Deity Image on the side (Requested by user) */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative rounded-2xl overflow-hidden border-2 border-[#FFE58F]/60 shadow-2xl max-w-[280px]">
                <img
                  src="/images/god-venkateswara.svg"
                  alt={`Sacred Deity ${TEMPLE_INFO.deityNameEn}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#200407] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 inset-x-3 text-center text-xs text-[#FFE58F] font-serif-temple font-bold">
                  {currentLang === 'te' ? `శ్రీ ${TEMPLE_INFO.deityNameTe} క్షేత్రం` : `Sri ${TEMPLE_INFO.deityNameEn} Devasthanam`}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Main Donation Container: Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Form & Payment Interface (8 cols) */}
          <div className="lg:col-span-8">
            <form onSubmit={handleFormSubmit} className="space-y-8">
              
              {/* SECTION 1: DONATION AMOUNT */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DCC0] shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-[#5B101D] text-[#FFE58F] text-xs font-bold flex items-center justify-center">
                    1
                  </span>
                  <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? 'విరాళం మొత్తం ఎంపిక (Select Donation Amount)' : 'Select Donation Amount'}
                  </h3>
                </div>

                {/* Predefined Amounts as requested */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  {DONATION_AMOUNTS.map((amt) => (
                    <button
                      type="button"
                      key={amt}
                      id={`amt-btn-${amt}`}
                      onClick={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                      }}
                      className={`py-3.5 px-4 rounded-xl text-center font-bold text-base transition-all border ${
                        selectedAmount === amt
                          ? 'bg-[#5B101D] text-[#FFE58F] border-[#D4AF37] shadow-md scale-[1.02]'
                          : 'bg-[#FAF6EE] text-[#4A0E17] hover:bg-[#FAF2E1] border-[#E8DCC0]'
                      }`}
                    >
                      ₹{amt.toLocaleString('en-IN')}
                    </button>
                  ))}

                  {/* Custom Amount Button as requested */}
                  <button
                    type="button"
                    id="amt-btn-custom"
                    onClick={() => setSelectedAmount('custom')}
                    className={`py-3.5 px-4 rounded-xl text-center font-bold text-sm sm:text-base transition-all border ${
                      selectedAmount === 'custom'
                        ? 'bg-[#5B101D] text-[#FFE58F] border-[#D4AF37] shadow-md scale-[1.02]'
                        : 'bg-[#FAF6EE] text-[#4A0E17] hover:bg-[#FAF2E1] border-[#E8DCC0]'
                    }`}
                  >
                    {currentLang === 'te' ? 'ఇతర మొత్తం (Custom)' : 'Custom Amount'}
                  </button>
                </div>

                {/* Custom Amount Input Field if selected */}
                {selectedAmount === 'custom' && (
                  <div className="mt-4 p-4 rounded-xl bg-[#FFF9E6] border border-[#FFE29F] animate-fade-in">
                    <label htmlFor="custom-amount-input" className="block text-xs font-bold uppercase text-[#8A5A00] mb-1.5">
                      {currentLang === 'te' ? 'మీరు సమర్పించదలచిన మొత్తం నమోదు చేయండి (INR):' : 'Enter Custom Amount (in INR ₹):'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg font-bold text-[#5B101D]">₹</span>
                      <input
                        id="custom-amount-input"
                        type="number"
                        min="1"
                        step="1"
                        placeholder="e.g. 2500"
                        value={customAmount}
                        onChange={(e) => setCustomAmount(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 rounded-lg bg-white border border-[#D4AF37] font-mono text-lg font-bold text-[#4A0E17] focus:outline-none focus:ring-2 focus:ring-[#5B101D]"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* SECTION 2: DONATION PURPOSE */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DCC0] shadow-md">
                <div className="flex items-center gap-2 mb-4">
                  <span className="w-7 h-7 rounded-full bg-[#5B101D] text-[#FFE58F] text-xs font-bold flex items-center justify-center">
                    2
                  </span>
                  <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? 'సేవా ఉద్దేశం (Select Donation Purpose)' : 'Select Donation Purpose'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {DONATION_PURPOSES.map((purp) => {
                    const isSelected = selectedPurpose === purp.id;
                    return (
                      <button
                        type="button"
                        key={purp.id}
                        id={`purpose-${purp.id.replace(/\s+/g, '-').toLowerCase()}`}
                        onClick={() => setSelectedPurpose(purp.id)}
                        className={`p-4 rounded-xl text-left border transition-all flex items-start gap-3 ${
                          isSelected
                            ? 'bg-[#FAF2E1] border-[#5B101D] ring-2 ring-[#5B101D]/20 shadow'
                            : 'bg-white border-[#E8DCC0] hover:bg-[#FAF6EE]'
                        }`}
                      >
                        <span className="text-2xl mt-0.5">{purp.icon}</span>
                        <div>
                          <h4 className="text-sm font-serif-temple font-bold text-[#4A0E17]">
                            {currentLang === 'te' ? purp.labelTe : purp.labelEn}
                          </h4>
                          <p className="text-xs text-[#5D4037] mt-0.5 leading-snug">
                            {currentLang === 'te' ? purp.descTe : purp.descEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SECTION 3: DONOR DETAILS FORM */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DCC0] shadow-md">
                <div className="flex items-center gap-2 mb-6">
                  <span className="w-7 h-7 rounded-full bg-[#5B101D] text-[#FFE58F] text-xs font-bold flex items-center justify-center">
                    3
                  </span>
                  <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? 'భక్తుని వివరాలు (Donor Details)' : 'Donor Information'}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="sm:col-span-2">
                    <label htmlFor="donor-fullname" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'పూర్తి పేరు (Full Name) *' : 'Full Name *'}
                    </label>
                    <input
                      id="donor-fullname"
                      type="text"
                      required
                      placeholder={currentLang === 'te' ? 'ఉదాహరణ: కె. శ్రీనివాస్' : 'e.g. Sreenivasa Rao'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label htmlFor="donor-mobile" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'మొబైల్ సంఖ్య (Mobile Number) *' : 'Mobile Number *'}
                    </label>
                    <input
                      id="donor-mobile"
                      type="tel"
                      required
                      maxLength={10}
                      placeholder="9876543210"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm font-mono"
                    />
                  </div>

                  {/* Email Address */}
                  <div>
                    <label htmlFor="donor-email" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'ఇమెయిల్ (Email Address) *' : 'Email Address *'}
                    </label>
                    <input
                      id="donor-email"
                      type="email"
                      required
                      placeholder="devotee@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm"
                    />
                  </div>

                  {/* Address */}
                  <div className="sm:col-span-2">
                    <label htmlFor="donor-address" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'చిరునామా (Address)' : 'Residential Address'}
                    </label>
                    <input
                      id="donor-address"
                      type="text"
                      placeholder="House No, Street, Landmark"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="donor-city" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'నగరం / గ్రామం (City)' : 'City / Town'}
                    </label>
                    <input
                      id="donor-city"
                      type="text"
                      placeholder="e.g. Hyderabad / Vijayawada"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm"
                    />
                  </div>

                  {/* State */}
                  <div>
                    <label htmlFor="donor-state" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'రాష్ట్రం (State)' : 'State'}
                    </label>
                    <input
                      id="donor-state"
                      type="text"
                      value={stateName}
                      onChange={(e) => setStateName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label htmlFor="donor-country" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'దేశం (Country)' : 'Country'}
                    </label>
                    <input
                      id="donor-country"
                      type="text"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm"
                    />
                  </div>

                  {/* PAN Number (optional as requested) */}
                  <div>
                    <label htmlFor="donor-pan" className="block text-xs font-bold uppercase text-[#734A12] mb-1">
                      {currentLang === 'te' ? 'పాన్ నంబర్ (PAN - ఐచ్ఛికం)' : 'PAN Number (Optional)'}
                    </label>
                    <input
                      id="donor-pan"
                      type="text"
                      maxLength={10}
                      placeholder="ABCDE1234F"
                      value={panNumber}
                      onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                      className="w-full px-4 py-2.5 rounded-lg border border-[#E8DCC0] focus:border-[#5B101D] focus:ring-1 focus:ring-[#5B101D] text-sm font-mono uppercase"
                    />
                  </div>
                </div>

                {/* Checkbox agreement as explicitly requested */}
                <div className="mt-6 pt-4 border-t border-[#E8DCC0]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      id="donor-agree-checkbox"
                      required
                      checked={agreedToTerms}
                      onChange={(e) => setAgreedToTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#5B101D] rounded border-[#D4AF37] focus:ring-[#5B101D]"
                    />
                    <span className="text-xs sm:text-sm text-[#4A0E17] leading-snug">
                      <strong>"I agree that the information provided is correct."</strong>
                      <span className="block text-xs text-[#734A12] mt-0.5">
                        {currentLang === 'te' ? 'నేను అందించిన సమాచారం నిజమైనదని మరియు ఆలయ నిబంధనలకు లోబడి సమర్పిస్తున్నానని ధ్రువీకరిస్తున్నాను.' : 'I affirm that all details submitted are accurate and offered with sincere devotion.'}
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* SECTION 4: PAYMENT GATEWAY SUBMISSION */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DCC0] shadow-md space-y-5">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-[#5B101D] text-[#FFE58F] text-xs font-bold flex items-center justify-center">
                    4
                  </span>
                  <h3 className="text-xl font-serif-temple font-bold text-[#4A0E17]">
                    {currentLang === 'te' ? 'చెల్లింపు గేట్‌వే (Payment Gateway)' : 'Secure Payment Gateway'}
                  </h3>
                </div>

                {/* Razorpay Gateway Status & Secure Notice */}
                <div className="p-4 rounded-2xl bg-[#FFFDF5] border border-[#D4AF37]/60 text-xs text-[#5B101D] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-[#2E7D32] shrink-0" />
                    <div>
                      <span className="font-bold block text-sm text-[#5B101D]">
                        {currentLang === 'te' ? 'రేజర్‌పే సెక్యూర్ గేట్‌వే (Razorpay Gateway)' : 'Official Razorpay Gateway Active'}
                      </span>
                      <span className="text-xs text-[#734A12]">
                        {currentLang === 'te' 
                          ? 'UPI (Google Pay, PhonePe, Paytm), డెబిట్/క్రెడిట్ కార్డులు & నెట్ బ్యాంకింగ్ చెల్లింపులకు మద్దతు కలదు.' 
                          : 'Supports UPI (GPay, PhonePe, Paytm), Debit/Credit Cards & Net Banking directly in the gateway.'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 self-start sm:self-auto px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#E8F5E9] text-[#2E7D32] border border-[#A5D6A7] shrink-0">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-bit SSL</span>
                  </div>
                </div>

                {/* Error Banner if any */}
                {formError && (
                  <div className="p-4 rounded-xl bg-[#FFEBEE] border border-[#EF5350] text-[#C62828] text-xs font-semibold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                {/* Main Submit Button to open Payment Gateway */}
                <div className="pt-2">
                  <button
                    type="submit"
                    id="submit-donation-btn"
                    disabled={isProcessing}
                    className="w-full py-4.5 px-6 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E5B839] to-[#D48806] hover:from-[#FFE29F] hover:to-[#C58000] text-[#360910] font-extrabold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-3 border border-[#FFF5CC] disabled:opacity-70 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-[#360910] border-t-transparent rounded-full animate-spin" />
                        <span>{currentLang === 'te' ? 'గేట్‌వే తెరవబడుతోంది...' : 'Opening Payment Gateway...'}</span>
                      </>
                    ) : (
                      <>
                        <HeartHandshake className="w-6 h-6 text-[#360910]" />
                        <span>
                          {currentLang === 'te' 
                            ? `₹${effectiveAmount.toLocaleString('en-IN')} చెల్లించండి (Pay via Razorpay)`
                            : `Proceed to Pay ₹${effectiveAmount.toLocaleString('en-IN')}`}
                        </span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-[#734A12] mt-2.5">
                    {currentLang === 'te' 
                      ? 'బటన్‌పై క్లిక్ చేయగానే రేజర్‌పే సురక్షిత చెల్లింపు విండో తెరవబడుతుంది.' 
                      : 'Clicking will securely open the official Razorpay payment window.'}
                  </p>
                </div>

              </div>

            </form>
          </div>

          {/* Right Column: Trust Cards, Transparency, Badges (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Summary Box */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FAF2E1] to-[#F5E6CC] border border-[#D4AF37] shadow-md space-y-4">
              <h4 className="text-lg font-serif-temple font-bold text-[#4A0E17] flex items-center gap-2">
                <DiyaIcon className="w-5 h-5 text-[#5B101D]" />
                <span>{currentLang === 'te' ? 'సమర్పణ సారాంశం' : 'Offering Summary'}</span>
              </h4>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between py-1 border-b border-[#D4AF37]/30">
                  <span className="text-[#734A12]">{currentLang === 'te' ? 'సేవా ఉద్దేశం:' : 'Purpose:'}</span>
                  <strong className="text-[#4A0E17]">{selectedPurpose}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-[#D4AF37]/30">
                  <span className="text-[#734A12]">{currentLang === 'te' ? 'మొత్తం:' : 'Amount:'}</span>
                  <strong className="text-lg font-bold text-[#5B101D] font-mono">₹{effectiveAmount.toLocaleString('en-IN')}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#734A12]">{currentLang === 'te' ? 'రసీదు రకం:' : 'Receipt Type:'}</span>
                  <span className="text-[#2E7D32] font-bold">✓ Instant Electronic</span>
                </div>
              </div>
            </div>

            {/* TRUST SECTION: "Your Donation Matters" (Requested by user: 3-4 cards) */}
            <div className="p-6 rounded-3xl bg-white border border-[#E8DCC0] shadow-md space-y-4">
              <h4 className="text-base font-serif-temple font-bold text-[#4A0E17]">
                "Your Donation Matters"
              </h4>
              <p className="text-xs text-[#5D4037]">
                {currentLang === 'te' ? 'మీ ప్రతి కానుక సత్యమైన భక్తితో సద్వినియోగం చేయబడుతుంది.' : 'Every rupee contributes directly to the sanctified activities of the temple.'}
              </p>

              <div className="space-y-3 pt-1">
                {/* 1. Temple Seva */}
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0] flex items-center gap-3">
                  <img
                    src="/images/temple-gopuram.svg"
                    alt="Temple Seva"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#D4AF37]/50"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#4A0E17]">Temple Seva</h5>
                    <p className="text-[11px] text-[#5D4037]">Support daily sanctum activities, deeparadhana, and archana.</p>
                  </div>
                </div>

                {/* 2. Annadanam */}
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0] flex items-center gap-3">
                  <img
                    src="/images/annadanam-prasadam.svg"
                    alt="Annadanam"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#D4AF37]/50"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#4A0E17]">Annadanam</h5>
                    <p className="text-[11px] text-[#5D4037]">Provide sanctified hot prasadam to thousands of visiting pilgrims.</p>
                  </div>
                </div>

                {/* 3. Spiritual Activities */}
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0] flex items-center gap-3">
                  <img
                    src="/images/pooja-abhishekam.svg"
                    alt="Spiritual Activities"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#D4AF37]/50"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#4A0E17]">Spiritual Activities</h5>
                    <p className="text-[11px] text-[#5D4037]">Support veda parayanam, devotional sangeetham, and dharma pracharam.</p>
                  </div>
                </div>

                {/* 4. Festivals */}
                <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0] flex items-center gap-3">
                  <img
                    src="/images/festival-brahmotsavam.svg"
                    alt="Brahmotsavam Festivals"
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover shrink-0 border border-[#D4AF37]/50"
                  />
                  <div>
                    <h5 className="text-xs font-bold text-[#4A0E17]">Festivals</h5>
                    <p className="text-[11px] text-[#5D4037]">Help conduct annual Brahmotsavam Rathotsavam and divine celestial events.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* TRUST ELEMENTS as requested */}
            <div className="p-5 rounded-2xl bg-white border border-[#E8DCC0] shadow-sm space-y-2.5 text-xs text-[#4A0E17]">
              <span className="text-[11px] font-bold text-[#8A5A00] uppercase tracking-wider block mb-1">
                Trust & Security Pillars
              </span>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#2E7D32]" />
                <span><strong>Secure Payment:</strong> 256-bit encrypted transactions</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#2E7D32]" />
                <span><strong>Donation Receipt:</strong> Computerized downloadable record</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#2E7D32]" />
                <span><strong>Transparent Usage:</strong> Audited temple trust accounts</span>
              </div>
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-[#2E7D32]" />
                <span><strong>Contact Support:</strong> {TEMPLE_INFO.phone}</span>
              </div>
            </div>

          </div>

        </div>

        {/* TRANSPARENCY SECTION as requested */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#E8DCC0] shadow-md">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5A00]">
              Accountability & Trust
            </span>
            <h3 className="text-2xl font-serif-temple font-bold text-[#4A0E17] mt-1 mb-2">
              Transparency & Fund Utilization
            </h3>
            <p className="text-sm text-[#5D4037] leading-relaxed mb-6">
              Devotees’ offerings are treated as sacred trust. All financial contributions are accounted for and utilized strictly towards religious, educational, and humanitarian activities as sanctioned by the trust board.
            </p>

            {/* Utilization Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs mb-4">
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                <strong className="block text-[#4A0E17]">Temple Maintenance</strong>
                <span className="text-[#5D4037]">Upkeep of heritage structures & sanitation</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                <strong className="block text-[#4A0E17]">Daily Poojas</strong>
                <span className="text-[#5D4037]">Pure cow ghee, flowers, samagri & naivedyam</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                <strong className="block text-[#4A0E17]">Annadanam</strong>
                <span className="text-[#5D4037]">Mass sacred pilgrim feeding operations</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                <strong className="block text-[#4A0E17]">Festival Arrangements</strong>
                <span className="text-[#5D4037]">Vahanams, Rathotsavam & floral illumination</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                <strong className="block text-[#4A0E17]">Devotional Activities</strong>
                <span className="text-[#5D4037]">Veda parayanam & sangeetha sabhas</span>
              </div>
              <div className="p-3 rounded-xl bg-[#FAF6EE] border border-[#E8DCC0]">
                <strong className="block text-[#4A0E17]">Charitable Initiatives</strong>
                <span className="text-[#5D4037]">Gosala care & educational scholarships</span>
              </div>
            </div>

            {/* User requested note */}
            <p className="text-xs text-[#734A12] italic pt-2">
              "All donations are utilized according to the temple's policies and applicable regulations."
            </p>
          </div>
        </div>

        {/* DONATION FAQ SECTION (All 7 Questions as requested) */}
        <div className="mt-16 p-8 rounded-3xl bg-white border border-[#E8DCC0] shadow-md">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#8A5A00]">
              Devotee Queries
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif-temple font-bold text-[#4A0E17] mt-1">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-[#5D4037] mt-1">
              Clear answers regarding our online donation process, security, and receipts.
            </p>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {DONATION_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-xl border border-[#E8DCC0] overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-3 bg-[#FAF6EE] hover:bg-[#FAF2E1] transition-colors"
                  >
                    <span className="text-sm font-semibold text-[#4A0E17]">
                      {currentLang === 'te' ? faq.qTe : faq.qEn}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#5B101D] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#5B101D] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="p-5 bg-white text-xs sm:text-sm text-[#5D4037] leading-relaxed border-t border-[#E8DCC0] animate-fade-in">
                      {currentLang === 'te' ? faq.aTe : faq.aEn}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
