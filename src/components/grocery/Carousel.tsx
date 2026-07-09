'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Word-by-word reveal split
function WordReveal({ text, delay = 0 }: { text: string; delay?: number }) {
  const words = text.split(' ');
  return (
    <span aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.2em]">
          <motion.span
            className="inline-block"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: delay + i * 0.06,
              duration: 0.55,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      id: 1,
      title: 'Royal Devgad',
      subtitle: 'Alphonso Mangoes',
      description:
        'Naturally ripened, chemical-free Hapus mangoes sourced directly from GI-tagged farms in Devgad, Maharashtra.',
      emoji: '🥭',
      imageUrl: '/images/alphonso_mango.png',
      bgGradient: 'from-amber-500 via-orange-500 to-yellow-500',
      badge: 'SEASON SPECIAL',
      accentColor: 'text-amber-100',
      buttonText: 'Shop Mangoes',
      category: 'MANGOES',
    },
    {
      id: 2,
      title: 'Vedic Bilona Ghee',
      subtitle: 'Pure Desi A2 Cow Ghee',
      description:
        'Traditionally hand-churned from A2 milk of grass-fed Gir cows in clay pots. Loaded with healing benefits.',
      emoji: '🏺',
      imageUrl: '/images/desi_ghee.png',
      bgGradient: 'from-primary via-[#15803d] to-[#22c55e]',
      badge: '100% VEDIC',
      accentColor: 'text-accent',
      buttonText: 'Shop Oil & Ghee',
      category: 'OIL & GHEE',
    },
    {
      id: 3,
      title: 'Farm Fresh Organics',
      subtitle: 'Soil to Doorstep Daily Drop',
      description:
        'Pesticide-free organic vegetables & fruits harvested daily and cleaned thoroughly. Express home drop.',
      emoji: '🥦',
      imageUrl: '/images/fresh_vegetables.png',
      bgGradient: 'from-emerald-600 via-green-600 to-lime-500',
      badge: 'DAILY FRESH',
      accentColor: 'text-green-100',
      buttonText: 'Shop Veg & Fruits',
      category: 'VEG & FRUITS',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Parallax scroll effect on the container
  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const offset = -rect.top * 0.2;
        setScrollY(offset);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % slides.length);

  return (
    <div className="w-full bg-transparent py-4 px-4 overflow-hidden relative select-none">
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto relative h-[260px] sm:h-[360px] md:h-[420px] rounded-[28px] overflow-hidden shadow-glow-green"
        style={{ border: '1px solid rgba(30, 77, 43, 0.12)' }}
      >
        {/* Slides */}
        <AnimatePresence mode="wait">
          {slides.map((slide, idx) => {
            if (idx !== currentSlide) return null;
            return (
              <motion.div
                key={slide.id}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.03 }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient} flex flex-col md:flex-row items-center justify-between p-6 sm:p-12 md:px-16 text-white`}
              >
                {/* Parallax Background Layer */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    transform: `translateY(${scrollY}px)`,
                    background:
                      'radial-gradient(ellipse at 80% 50%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  }}
                />

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left space-y-2 sm:space-y-4 max-w-xl z-10 relative">
                  <motion.span
                    className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase border border-white/20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.4 }}
                  >
                    {slide.badge}
                  </motion.span>

                  <h1 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold leading-[1.1] tracking-[-1px] drop-shadow-sm font-heading">
                    <WordReveal text={slide.title} delay={0.15} />
                  </h1>

                  <motion.p
                    className={`text-base sm:text-xl md:text-2xl font-semibold ${slide.accentColor}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35, duration: 0.5 }}
                  >
                    {slide.subtitle}
                  </motion.p>

                  <motion.p
                    className="text-xs sm:text-sm md:text-[16px] font-normal text-white/90 leading-[1.8] max-w-md hidden sm:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.5 }}
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    className="pt-2 sm:pt-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.5 }}
                  >
                    <button className="px-6 py-3 sm:px-8 sm:py-4 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl border border-white/30 backdrop-blur-md transition-all hover:scale-105 active:scale-95 text-xs sm:text-sm shadow-lg magnetic-btn">
                      {slide.buttonText} →
                    </button>
                  </motion.div>
                </div>

                {/* Product Image */}
                <motion.div
                  className="flex-shrink-0 flex items-center justify-center relative w-28 h-28 sm:w-48 sm:h-48 md:w-64 md:h-64 mt-4 md:mt-0 z-10 img-zoom-scroll is-visible"
                  initial={{ opacity: 0, x: 30, rotate: -5 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Spinning ring */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
                    className="absolute inset-0 rounded-full border border-white/15 pointer-events-none"
                  />
                  <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/20 shadow-2xl bg-white/10 backdrop-blur-sm">
                    <motion.img
                      src={slide.imageUrl}
                      alt={slide.title}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
                      className="w-full h-full object-cover select-none"
                    />
                  </div>
                </motion.div>

                {/* Glassmorphism edge overlay */}
                <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-white/5 backdrop-blur-[2px] skew-x-12 origin-top-right pointer-events-none hidden md:block" />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Nav Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer border border-white/20 focus:outline-none"
          aria-label="Previous slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/35 text-white backdrop-blur-md flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-20 cursor-pointer border border-white/20 focus:outline-none"
          aria-label="Next slide"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicator Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-400 ${
                idx === currentSlide ? 'bg-white w-6' : 'bg-white/40 w-2 hover:bg-white/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
