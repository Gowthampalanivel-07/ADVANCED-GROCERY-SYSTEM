'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';

interface ScrollContextValue {
  scrollY: number;
  scrollProgress: number;
  scrolled: boolean;
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollY: 0,
  scrollProgress: 0,
  scrolled: false,
});

export function useScrollState() {
  return useContext(ScrollContext);
}

const lenisEasing = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: lenisEasing,
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.15,
      lerp: 0.075,
      autoRaf: false,
    });

    lenisRef.current = lenis;
    document.documentElement.classList.add('lenis', 'lenis-smooth');

    lenis.on('scroll', ({ scroll }) => {
      setScrollY(scroll);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (scroll / total) * 100 : 0);
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, []);

  useEffect(() => {
    lenisRef.current?.scrollTo(0, {
      duration: 1.1,
      easing: lenisEasing,
    });
  }, [pathname]);

  return (
    <ScrollContext.Provider
      value={{
        scrollY,
        scrollProgress,
        scrolled: scrollY > 60,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
}
