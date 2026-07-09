'use client';

import { useEffect, useRef } from 'react';
import { useScrollState } from '@/contexts/ScrollContext';

interface UsePremiumPageEffectsOptions {
  revealDeps?: unknown[];
}

function setupRevealObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    },
    { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
  );

  document.querySelectorAll('.reveal, .reveal-stagger, .img-zoom-scroll').forEach((el) => {
    observer.observe(el);
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.05 && rect.bottom > 0) {
      el.classList.add('is-visible');
    }
  });

  return observer;
}

export function usePremiumPageEffects(options: UsePremiumPageEffectsOptions = {}) {
  const { revealDeps = [] } = options;
  const revealTrigger = revealDeps.map(String).join('|');
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const { scrollProgress, scrolled } = useScrollState();

  useEffect(() => {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = 0;

    const updateTarget = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animateGlow = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.left = `${currentX}px`;
        cursorGlowRef.current.style.top = `${currentY}px`;
      }
      rafId = requestAnimationFrame(animateGlow);
    };

    window.addEventListener('mousemove', updateTarget);
    rafId = requestAnimationFrame(animateGlow);

    return () => {
      window.removeEventListener('mousemove', updateTarget);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const observer = setupRevealObserver();
    return () => observer.disconnect();
  }, [revealTrigger]);

  return { cursorGlowRef, scrollProgress, scrolled };
}
