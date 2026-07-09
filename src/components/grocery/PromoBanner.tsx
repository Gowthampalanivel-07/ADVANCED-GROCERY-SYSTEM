'use client';

import { useState, useEffect } from 'react';
import { useGroceryStore } from '@/stores/groceryStore';
import { motion } from 'framer-motion';

export function PromoBanner() {
  const { applyCoupon } = useGroceryStore();
  const [timeLeft, setTimeLeft] = useState({
    days: '01',
    hours: '14',
    minutes: '45',
    seconds: '22',
  });
  const [copied, setCopied] = useState(false);

  // Countdown timer calculation
  useEffect(() => {
    // Set expiry to 2 days from now initially
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 2);
    targetDate.setHours(targetDate.getHours() + 5);

    const interval = setInterval(() => {
      const difference = +targetDate - +new Date();
      
      if (difference <= 0) {
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: days.toString().padStart(2, '0'),
        hours: hours.toString().padStart(2, '0'),
        minutes: minutes.toString().padStart(2, '0'),
        seconds: seconds.toString().padStart(2, '0'),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText('ROOTZAPP5');
    applyCoupon('ROOTZAPP5'); // auto apply for the user to be nice!
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-background px-4 py-2">
      <div className="max-w-7xl mx-auto bg-primary/5 border border-primary/15 rounded-xl p-4 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Coupon Info */}
        <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left flex-1">
          <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center text-2xl">
            🏷️
          </div>
          <div>
            <h4 className="text-primary font-black text-sm sm:text-base leading-tight uppercase">
              Exclusive Shopper Offer!
            </h4>
            <p className="text-xs text-foreground mt-0.5">
              Enjoy <span className="font-bold text-white bg-accent px-1.5 py-0.5 rounded text-[10px] sm:text-xs">5% EXTRA OFF</span> on all organic items.
            </p>
          </div>
        </div>

        {/* Coupon Code Block */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex items-center bg-white border border-border-color rounded-lg overflow-hidden shadow-sm h-10">
            <span className="px-3 text-primary font-bold text-xs uppercase tracking-wider bg-surface h-full flex items-center border-r border-border-color">
              CODE
            </span>
            <span className="px-4 text-foreground font-black text-sm tracking-wider uppercase select-all">
              ROOTZAPP5
            </span>
            <button
              onClick={handleCopy}
              className="px-4 h-full bg-primary text-white hover:bg-accent hover:text-white transition-all text-xs font-bold flex items-center gap-1 cursor-pointer focus:outline-none"
            >
              {copied ? 'Applied! ✓' : 'Copy & Apply'}
            </button>
          </div>

          <div className="text-[10px] text-foreground/70 font-semibold uppercase sm:hidden">
            Expires soon!
          </div>
        </div>

        {/* Ticking Countdown Timer */}
        <div className="flex items-center gap-3 bg-accent text-white px-4 py-2 rounded-xl shadow-sm">
          <span className="text-[11px] font-black tracking-wider uppercase">ENDS IN:</span>
          
          <div className="flex items-center gap-1 font-mono font-black text-sm text-foreground">
            <div className="flex items-center">
              <span className="bg-white/95 px-1.5 py-0.5 rounded shadow-sm">{timeLeft.days}</span>
              <span className="text-[10px] font-sans font-bold ml-0.5 mr-1 text-white">d</span>
            </div>
            <span className="text-white">:</span>
            <div className="flex items-center">
              <span className="bg-white/95 px-1.5 py-0.5 rounded shadow-sm">{timeLeft.hours}</span>
              <span className="text-[10px] font-sans font-bold ml-0.5 mr-1 text-white">h</span>
            </div>
            <span className="text-white">:</span>
            <div className="flex items-center">
              <span className="bg-white/95 px-1.5 py-0.5 rounded shadow-sm">{timeLeft.minutes}</span>
              <span className="text-[10px] font-sans font-bold ml-0.5 mr-1 text-white">m</span>
            </div>
            <span className="text-white">:</span>
            <div className="flex items-center">
              <span className="bg-white/95 px-1.5 py-0.5 rounded shadow-sm text-error-color animate-pulse">{timeLeft.seconds}</span>
              <span className="text-[10px] font-sans font-bold ml-0.5 text-white">s</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
