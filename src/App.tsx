import React, { useState } from 'react';
import { Language, ContactMessage, DonationRecord } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutTemple } from './components/AboutTemple';
import { Gallery } from './components/Gallery';
import { DonationSection } from './components/DonationSection';
import { DonationPage } from './components/DonationPage';
import { ReceiptModal } from './components/ReceiptModal';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<'home' | 'donation'>('home');
  const [selectedReceipt, setSelectedReceipt] = useState<DonationRecord | null>(null);

  // Toggle Language between English and Telugu
  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  // Scroll to section or change view
  const handleNavigate = (sectionId: string) => {
    if (sectionId === 'donation') {
      setCurrentView('donation');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView === 'donation') {
      setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 100);
      return;
    }

    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero-section') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle successful donation record
  const handleDonationSuccess = (record: DonationRecord) => {
    console.log('Donation completed successfully:', record);
  };

  // Save new contact message
  const handleSendMessage = (msg: ContactMessage) => {
    console.log('Contact inquiry received:', msg);
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#3E2723] font-sans antialiased selection:bg-[#FFE29F] selection:text-[#5B101D]">
      
      {/* Sticky Header with Navigation, Bell Synthesizer & Donation CTA */}
      <Header
        currentLang={currentLang}
        onToggleLang={handleToggleLang}
        activeSection={currentView === 'donation' ? 'donation' : undefined}
        onNavigate={handleNavigate}
      />

      {/* Main Content Area */}
      <main>
        {currentView === 'donation' ? (
          /* Full Dedicated Sacred Donation Page with Razorpay Integration */
          <DonationPage
            currentLang={currentLang}
            onBackToHome={() => {
              setCurrentView('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDonationSuccess={handleDonationSuccess}
            onViewReceipt={(receipt) => setSelectedReceipt(receipt)}
          />
        ) : (
          /* Home View Sections */
          <>
            {/* 1. Hero Section */}
            <Hero
              currentLang={currentLang}
              onExploreAbout={() => handleNavigate('about')}
              onExploreGallery={() => handleNavigate('gallery')}
            />

            {/* 2. About Temple: History, Vedic Architecture, Mission & Trust */}
            <AboutTemple currentLang={currentLang} />

            {/* 3. Photo Gallery with Lightbox */}
            <Gallery currentLang={currentLang} />

            {/* 4. Sacred Donation Section (e-Hundi Callout) */}
            <DonationSection
              currentLang={currentLang}
              onOpenDonationPage={() => {
                setCurrentView('donation');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* 5. Contact Section: Timings, Directions, Map, Protected Form */}
            <ContactPage
              currentLang={currentLang}
              onSendMessage={handleSendMessage}
            />
          </>
        )}
      </main>

      {/* Official Electronic Receipt Modal */}
      {selectedReceipt && (
        <ReceiptModal
          receipt={selectedReceipt}
          currentLang={currentLang}
          onClose={() => setSelectedReceipt(null)}
        />
      )}

      {/* Comprehensive Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
