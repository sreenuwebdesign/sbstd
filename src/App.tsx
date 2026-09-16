import React, { useState, useEffect } from 'react';
import { Language, DonationPurpose, DonationRecord, ContactMessage } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { DeitySection } from './components/DeitySection';
import { AboutTemple } from './components/AboutTemple';
import { PoojaSeva } from './components/PoojaSeva';
import { Festivals } from './components/Festivals';
import { Gallery } from './components/Gallery';
import { DevotionalContent } from './components/DevotionalContent';
import { DonationSection } from './components/DonationSection';
import { DonationPage } from './components/DonationPage';
import { ReceiptModal } from './components/ReceiptModal';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [activeView, setActiveView] = useState<'home' | 'donate'>('home');
  const [preselectedPurpose, setPreselectedPurpose] = useState<DonationPurpose>('Annadanam');
  const [preselectedAmount, setPreselectedAmount] = useState<number>(1001);
  const [activeReceipt, setActiveReceipt] = useState<DonationRecord | null>(null);

  // Toggle Language between English and Telugu
  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  // Open the dedicated donation page
  const handleOpenDonate = (purpose?: DonationPurpose, amount?: number) => {
    if (purpose) setPreselectedPurpose(purpose);
    if (amount) setPreselectedAmount(amount);
    setActiveView('donate');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back to home view
  const handleBackToHome = () => {
    setActiveView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Scroll to section in home view
  const handleNavigate = (sectionId: string) => {
    if (activeView !== 'home') {
      setActiveView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Handle donation completion
  const handleDonationSuccess = (record: DonationRecord) => {
    // Keep record ready for receipt inspection
    console.log('Sacred offering confirmed:', record);
  };

  // Save new contact message
  const handleSendMessage = (msg: ContactMessage) => {
    console.log('Contact inquiry received:', msg);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#3E2723] font-sans antialiased selection:bg-[#FFE29F] selection:text-[#5B101D]">
      
      {/* Sticky Header with Navigation & Bell Synthesizer */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        onNavigate={handleNavigate}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Main Content Area */}
      <main>
        {activeView === 'donate' ? (
          /* Dedicated Full-Screen Donation Page */
          <DonationPage
            currentLang={currentLang}
            onBackToHome={handleBackToHome}
            onDonationSuccess={handleDonationSuccess}
            onViewReceipt={(record) => setActiveReceipt(record)}
            preselectedPurpose={preselectedPurpose}
            preselectedAmount={preselectedAmount}
          />
        ) : (
          /* Standard Temple Home Portal View */
          <>
            {/* 1. Hero Section */}
            <Hero
              currentLang={currentLang}
              onExploreDarshan={() => handleNavigate('deity')}
              onOpenDonate={() => handleOpenDonate()}
            />

            {/* 2. Deity Section: Sanctum, Alankaram, Timings */}
            <DeitySection
              currentLang={currentLang}
              onOpenDonate={() => handleOpenDonate('Pooja & Seva', 501)}
            />

            {/* 3. About Temple: History, Vedic Architecture, Mission & Trust */}
            <AboutTemple currentLang={currentLang} />

            {/* 4. Poojas & Sevas: Timings, Categories, Booking Guidance */}
            <PoojaSeva
              currentLang={currentLang}
              onBookSeva={(seva) => handleOpenDonate('Pooja & Seva', seva.price)}
            />

            {/* 5. Upcoming Festivals & Utsavams */}
            <Festivals
              currentLang={currentLang}
              onOpenDonate={() => handleOpenDonate('Festival Contributions', 2001)}
            />

            {/* 6. Photo Gallery with Lightbox */}
            <Gallery currentLang={currentLang} />

            {/* 7. Devotional Treasury: Slokas, Bhajans, Announcements */}
            <DevotionalContent currentLang={currentLang} />

            {/* 8. In-Page Prominent Donation Call to Action */}
            <DonationSection
              currentLang={currentLang}
              onOpenDonationPage={() => handleOpenDonate()}
            />

            {/* 9. Contact Section: Timings, Directions, Map, Protected Form */}
            <ContactPage
              currentLang={currentLang}
              onSendMessage={handleSendMessage}
            />
          </>
        )}
      </main>

      {/* Comprehensive Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
        onOpenDonate={() => handleOpenDonate()}
      />

      {/* Printable Electronic Donation Receipt Modal */}
      {activeReceipt && (
        <ReceiptModal
          receipt={activeReceipt}
          currentLang={currentLang}
          onClose={() => setActiveReceipt(null)}
        />
      )}

    </div>
  );
}
