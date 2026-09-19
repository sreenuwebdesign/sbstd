import React, { useState, useEffect, useCallback } from 'react';
import { Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2, Filter } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import { GALLERY_ITEMS } from '../data/templeData';
import { OrnamentalDivider, DiyaIcon } from './TempleMotifs';

interface GalleryProps {
  currentLang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ currentLang }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', labelEn: 'All Photos', labelTe: 'అన్నీ' },
    { id: 'temple', labelEn: 'Temple Architecture', labelTe: 'ఆలయ వాస్తు & గోపురాలు' },
    { id: 'deity', labelEn: 'Deity Sanctum', labelTe: 'దేవతామూర్తి' },
    { id: 'festivals', labelEn: 'Festivals & Rathotsavam', labelTe: 'ఉత్సవాలు & రథోత్సవం' },
    { id: 'poojas', labelEn: 'Poojas & Abhishekam', labelTe: 'పూజలు & అభిషేకాలు' },
    { id: 'decorations', labelEn: 'Floral Alankaram', labelTe: 'పుష్పాలంకరణ' },
    { id: 'devotees', labelEn: 'Devotee Gatherings', labelTe: 'భక్తజన సందోహం' },
  ];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage]);

  return (
    <section id="gallery" className="py-20 bg-[#FAF6EE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EAD8BA] text-[#5B101D] text-xs font-semibold tracking-wider uppercase mb-3">
            <DiyaIcon className="w-4 h-4" />
            <span>{currentLang === 'te' ? 'దివ్య చిత్రమాలిక' : 'Sacred Photo Gallery'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-temple font-bold text-[#4A0E17] tracking-tight">
            {currentLang === 'te' ? 'ఆలయ దర్శన చిత్రాలు' : 'Temple Darshan Gallery'}
          </h2>
          <OrnamentalDivider />
          <p className="text-[#5D4037] text-base sm:text-lg leading-relaxed">
            {currentLang === 'te'
              ? 'ఆలయ వాస్తు శిల్పకళ, మూలవిరాట్ దివ్య మంగళ స్వరూపం, ఉత్సవాలు మరియు భక్తుల సేవలకు సంబంధించిన పవిత్ర చిత్రాలు.'
              : 'Glimpses of sacred Sanctum Sanctorum, celestial Brahmotsavams, temple architecture, and soulful devotional moments.'}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`gallery-filter-${cat.id}`}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat.id
                  ? 'bg-[#5B101D] text-[#FFE58F] shadow-md border border-[#D4AF37]/50'
                  : 'bg-white text-[#5D4037] hover:bg-[#FAF2E1] border border-[#E8DCC0]'
              }`}
            >
              {currentLang === 'te' ? cat.labelTe : cat.labelEn}
            </button>
          ))}
        </div>

        {/* Gallery Grid - 2 columns on mobile, 2 on sm, 3 on md, 4 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              id={`gallery-thumb-${item.id}`}
              onClick={() => openLightbox(index)}
              className="relative group rounded-xl sm:rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer bg-white border border-[#E8DCC0] aspect-square"
            >
              <img
                src={item.imageUrl}
                alt={item.titleEn}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />

              {/* Gradient Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E070B]/90 via-[#2E070B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 sm:p-4 text-white">
                <span className="text-[9px] sm:text-[10px] uppercase font-bold tracking-widest text-[#FFE58F] mb-0.5 sm:mb-1">
                  {currentLang === 'te' ? 'వివరంగా వీక్షించండి' : 'Click to View'}
                </span>
                <h4 className="font-serif-temple text-xs sm:text-base font-bold text-white line-clamp-1 sm:line-clamp-2">
                  {currentLang === 'te' ? item.titleTe : item.titleEn}
                </h4>
                <div className="mt-1 sm:mt-2 flex items-center justify-between text-[10px] sm:text-xs text-[#E8DCC0]">
                  <span className="capitalize">{item.category}</span>
                  <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FFE58F]" />
                </div>
              </div>

              {/* Corner Auspicious Tag */}
              <div className="absolute top-2 left-2 sm:top-3 sm:left-3 px-1.5 sm:px-2 py-0.5 rounded bg-black/45 backdrop-blur-sm text-[8.5px] sm:text-[10px] text-white/90 font-medium truncate max-w-[85%]">
                {currentLang === 'te' ? item.titleTe : item.titleEn}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4 animate-fade-in">
          
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 z-50 p-2 sm:p-2.5 rounded-full bg-white/15 hover:bg-white/30 text-white transition-colors"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-50 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white border border-white/20 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Active Image Box */}
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center px-8 sm:px-12">
            <img
              src={filteredItems[lightboxIndex].imageUrl}
              alt={filteredItems[lightboxIndex].titleEn}
              referrerPolicy="no-referrer"
              className="max-h-[55vh] sm:max-h-[68vh] w-auto max-w-full rounded-xl shadow-2xl object-contain border border-[#D4AF37]/40"
            />
            
            {/* Caption Strip */}
            <div className="mt-2 sm:mt-4 p-3 sm:p-4 rounded-xl bg-[#280408]/90 border border-[#D4AF37]/30 text-center max-w-2xl w-full overflow-y-auto max-h-[22vh]">
              <h3 className="text-base sm:text-lg font-serif-temple font-bold text-[#FFE58F]">
                {currentLang === 'te'
                  ? filteredItems[lightboxIndex].titleTe
                  : filteredItems[lightboxIndex].titleEn}
              </h3>
              <p className="text-xs sm:text-sm text-[#F5EDE0] mt-1 leading-relaxed">
                {currentLang === 'te'
                  ? filteredItems[lightboxIndex].captionTe
                  : filteredItems[lightboxIndex].captionEn}
              </p>
              <span className="text-[10px] sm:text-[11px] text-[#D4AF37] mt-1 sm:mt-2 block font-medium">
                {lightboxIndex + 1} / {filteredItems.length}
              </span>
            </div>
          </div>

        </div>
      )}

    </section>
  );
};
