'use client';

import { useEffect } from 'react';
import { usePremiumPageEffects } from '@/hooks/usePremiumPageEffects';

import { Header } from '@/components/grocery/Header';
import { PromoBanner } from '@/components/grocery/PromoBanner';
import { Carousel } from '@/components/grocery/Carousel';
import { CategoryNav } from '@/components/grocery/CategoryNav';
import { Marquee } from '@/components/grocery/Marquee';
import { ProductList } from '@/components/grocery/ProductList';
import { Footer } from '@/components/grocery/Footer';
import { GroceryModals } from '@/components/grocery/GroceryModals';

export default function Home() {
  const { cursorGlowRef } = usePremiumPageEffects();

  return (
    <main className="flex flex-col min-h-screen w-full bg-mesh-gradient relative overflow-hidden">
      {/* Premium Cursor Glow (follows cursor) */}
      <div
        ref={cursorGlowRef}
        className="cursor-glow fixed pointer-events-none hidden md:block"
      />

      {/* Morphing Blob Backgrounds */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div
          className="blob blob-primary"
          style={{ width: '800px', height: '800px', top: '-200px', right: '-200px' }}
        />
        <div
          className="blob blob-accent"
          style={{ width: '600px', height: '600px', top: '60%', left: '-150px' }}
        />
        <div
          className="blob blob-primary"
          style={{ width: '500px', height: '500px', bottom: '-100px', right: '10%', animationDelay: '-4s' }}
        />
      </div>

      {/* Absolute Floating Natural Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div className="absolute top-[350px] left-[4%] animate-float-slow opacity-20 text-3xl">🍃</div>
        <div className="absolute top-[750px] right-[6%] animate-float-fast opacity-15 text-4xl">🍊</div>
        <div className="absolute top-[1200px] left-[8%] animate-float-slow opacity-20 text-2xl">🌿</div>
        <div className="absolute top-[1650px] right-[5%] animate-float-fast opacity-12 text-3xl">🍅</div>
        <div className="absolute top-[2100px] left-[5%] animate-float-slow opacity-15 text-3xl">🍃</div>
        <div className="absolute top-[2500px] right-[8%] animate-float-slow opacity-15 text-4xl">🥭</div>
        <div className="absolute top-[3100px] left-[6%] animate-float-fast opacity-15 text-3xl">🍋</div>
      </div>

      <div className="relative z-10 w-full flex flex-col">
        {/* 1. Header Navigation */}
        <Header />

        {/* 2. Announcement Banner Countdown */}
        <PromoBanner />

        <div className="reveal reveal-up">
          <Carousel />
        </div>

        <div className="reveal reveal-up">
          <CategoryNav />
        </div>

        <Marquee />

        <div className="reveal reveal-up">
          <ProductList />
        </div>

        <div className="reveal reveal-up">
          <Footer />
        </div>
      </div>

      <GroceryModals />
    </main>
  );
}
