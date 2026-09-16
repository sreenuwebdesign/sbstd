import React, { useState } from 'react';
import { Language, ContactMessage } from './types';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutTemple } from './components/AboutTemple';
import { Gallery } from './components/Gallery';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('en');

  // Toggle Language between English and Telugu
  const handleToggleLang = () => {
    setCurrentLang((prev) => (prev === 'en' ? 'te' : 'en'));
  };

  // Scroll to section in home view
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
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
      />

      {/* Main Content Area */}
      <main>
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

        {/* 4. Contact Section: Timings, Directions, Map, Protected Form */}
        <ContactPage
          currentLang={currentLang}
          onSendMessage={handleSendMessage}
        />
      </main>

      {/* Comprehensive Footer */}
      <Footer
        currentLang={currentLang}
        onNavigate={handleNavigate}
      />

    </div>
  );
}
