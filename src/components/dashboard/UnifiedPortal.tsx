'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { usePremiumPageEffects } from '@/hooks/usePremiumPageEffects';

interface PortalShellProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  revealDeps?: unknown[];
}

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { href: '/analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { href: '/admin', label: 'Admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
];

function NavIcon({ d }: { d: string }) {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d={d} />
    </svg>
  );
}

export function UnifiedPortal({ children, title, subtitle, revealDeps = [] }: PortalShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cursorGlowRef, scrollProgress, scrolled } = usePremiumPageEffects({ revealDeps });

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="min-h-screen bg-mesh-gradient text-foreground flex font-sans relative">
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div ref={cursorGlowRef} className="cursor-glow fixed pointer-events-none hidden md:block z-0" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="blob blob-primary" style={{ width: '800px', height: '800px', top: '-200px', right: '-200px' }} />
        <div className="blob blob-accent" style={{ width: '600px', height: '600px', top: '60%', left: '-150px' }} />
        <div className="blob blob-primary" style={{ width: '500px', height: '500px', bottom: '-100px', right: '10%', animationDelay: '-4s' }} />
      </div>

      {/* Slim icon rail — desktop */}
      <aside className="hidden lg:flex flex-col items-center w-[72px] glass-glow border-r border-primary/10 sticky top-0 h-screen z-30 py-5 gap-2">
        <Link href="/" className="mb-4 p-2 rounded-xl text-primary hover:bg-primary/8 transition-colors" title="Rootz Store">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17,8C8,8,4,16,4,16s4-2,9-5c-5,3-8,9-8,9S12,16,17,8z M12,2C12,2,3,6,3,12s9,10,9,10s9-4,9-10S12,2,12,2z" />
          </svg>
        </Link>

        {NAV.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href} title={link.label}>
              <div
                className={`relative p-3 rounded-xl transition-all cursor-pointer ${
                  isActive ? 'bg-primary text-white shadow-glow-green' : 'text-body-text hover:bg-primary/8 hover:text-primary'
                }`}
              >
                <NavIcon d={link.icon} />
              </div>
            </Link>
          );
        })}

        <div className="mt-auto flex flex-col items-center gap-2">
          <Link href="/" title="Back to Store">
            <div className="p-3 rounded-xl text-body-text hover:bg-primary/8 hover:text-primary transition-all cursor-pointer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Top command bar */}
        <header
          className={`sticky top-0 z-20 transition-all duration-500 ${
            scrolled ? 'glass border-b border-primary/8 shadow-glow-green' : 'bg-background/70 backdrop-blur-md border-b border-border-color'
          }`}
        >
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 hover:bg-primary/6 text-primary rounded-xl magnetic-btn"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-light-text uppercase tracking-widest font-sans truncate">{today}</p>
                <h1 className="text-lg sm:text-xl font-black text-primary font-heading truncate">{title}</h1>
              </div>
            </div>

            <div className="hidden md:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-light-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search orders, products, reports..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 h-10 bg-white/80 border border-border-color rounded-xl text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 font-sans"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-700 font-sans">Live</span>
              </div>
              <button className="relative p-2.5 rounded-xl hover:bg-primary/6 text-primary transition-colors magnetic-btn" aria-label="Notifications">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full border border-white" />
              </button>
              <Link href="/">
                <button className="px-3 sm:px-4 py-2 bg-primary hover:bg-secondary text-white text-xs font-bold rounded-xl shadow-sm magnetic-btn font-sans">
                  Store
                </button>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1400px] w-full mx-auto pb-20">
          {/* Hero strip */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary via-secondary to-primary p-6 sm:p-8 text-white shadow-glow-green">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 80% 20%, #E6A817 0%, transparent 50%)' }} />
              <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <p className="text-white/70 text-xs font-semibold uppercase tracking-wider font-sans">Rootz Command Center</p>
                  <h2 className="text-2xl sm:text-3xl font-black font-heading mt-1">{subtitle}</h2>
                  <p className="text-white/80 text-sm mt-2 font-sans max-w-lg">Monitor sales, inventory, pricing &amp; store health — all in one place.</p>
                </div>
                <div className="flex gap-3">
                  <div className="glass-glow rounded-2xl px-4 py-3 text-center min-w-[100px]">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-primary font-sans">Orders</p>
                    <p className="text-2xl font-black text-primary font-heading">156</p>
                  </div>
                  <div className="glass-glow rounded-2xl px-4 py-3 text-center min-w-[100px]">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-primary font-sans">Uptime</p>
                    <p className="text-2xl font-black text-primary font-heading">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {children}
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              className="fixed inset-y-0 left-0 max-w-xs w-full glass z-50 flex flex-col p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-lg font-black text-primary font-heading">Rootz Portal</span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-1 text-primary rounded-xl">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="flex-1 space-y-2">
                {NAV.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                      <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold font-sans ${isActive ? 'bg-primary text-white' : 'text-body-text hover:bg-primary/5'}`}>
                        <NavIcon d={link.icon} />
                        {link.label}
                      </div>
                    </Link>
                  );
                })}
              </nav>
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-body-text hover:bg-primary/5 font-sans">
                  Back to Store
                </div>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
