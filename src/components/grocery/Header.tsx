'use client';

import { useState, useEffect } from 'react';
import { useGroceryStore } from '@/stores/groceryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollState } from '@/contexts/ScrollContext';

export function Header() {
  const {
    cart,
    wishlist,
    searchQuery,
    setSearchQuery,
    user,
    setCartOpen,
    setProfileOpen,
    setWishlistOpen,
    setSelectedCategory
  } = useGroceryStore();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const { scrolled, scrollProgress } = useScrollState();

  const announcements = [
    'Free Delivery on Orders Above INR 999',
    'Fresh Fruits & Vegetables Delivered Across Delhi/NCR Only',
    'Express Delivery Available Nationwide in India',
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { key: 'MANGOES', label: 'Mangoes' },
    { key: 'VEG & FRUITS', label: 'Veg & Fruits' },
    { key: 'ANCIENT FLOURS', label: 'Ancient Flours' },
    { key: 'HERITAGE RICE', label: 'Heritage Rice' },
    { key: 'PULSES', label: 'Pulses' },
    { key: 'AYURVEDA', label: 'Ayurveda' },
    { key: 'OIL & GHEE', label: 'Oil & Ghee' },
    { key: 'NUTS, SEEDS & SUPER FOODS', label: 'Nuts & Seeds' },
    { key: 'MILLETS & GLUTEN FREE', label: 'Millets' },
    { key: 'PLANT FORWARD & KETO', label: 'Plant Forward' },
    { key: 'PICKLES, SPICES & SWEETNERS', label: 'Pickles & Spices' },
    { key: 'BAKERY & BREAKFAST', label: 'Bakery' },
    { key: 'DEALS', label: 'Deals' },
  ];

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-500 ${
      scrolled 
        ? 'glass border-b border-primary/8 shadow-glow-green' 
        : 'bg-background border-b border-border-color'
    }`}>
      {/* Enhanced Scroll Progress Indicator — brand gradient */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* 1. Top Announcement Bar */}
      <motion.div 
        animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="w-full bg-surface text-foreground text-xs font-semibold tracking-wider relative flex items-center justify-between overflow-hidden border-b border-border-color"
        style={{ paddingTop: scrolled ? 0 : '0.5rem', paddingBottom: scrolled ? 0 : '0.5rem' }}
      >
        <div className="hidden lg:flex items-center gap-4 text-light-text font-medium px-4 py-2">
          <span className="cursor-pointer hover:underline">About Us</span>
          <span>•</span>
          <span className="cursor-pointer hover:underline">Gifting</span>
          <span>•</span>
          <span className="cursor-pointer hover:underline">Bulk Orders</span>
        </div>
        
        {/* Rotating Announcement */}
        <div className="flex-1 text-center font-bold text-primary py-2">
          <AnimatePresence mode="wait">
            <motion.span
              key={announcementIndex}
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              {announcements[announcementIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="hidden lg:flex items-center gap-2 text-light-text font-medium px-4 py-2">
          <span>📍 Sourced from organic farms</span>
        </div>
      </motion.div>

      {/* 2. Main Header Bar (Logo, search box, action icons) */}
      <div className={`max-w-7xl mx-auto px-4 flex items-center justify-between gap-4 transition-all duration-300 ${
        scrolled ? 'h-[64px]' : 'h-[80px]'
      }`}>
        {/* Mobile Hamburger Toggle */}
        <button
          className="lg:hidden p-2 rounded-xl hover:bg-black/5"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Brand Logo (Custom Leaf Design SVG) */}
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => setSelectedCategory('ALL')}>
          <div className="text-primary flex items-center justify-center">
            <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,8,4,16,4,16s4-2,9-5c-5,3-8,9-8,9S12,16,17,8z M12,2C12,2,3,6,3,12s9,10,9,10s9-4,9-10S12,2,12,2z" />
            </svg>
          </div>
          <div className="flex flex-col justify-start">
            <span className="text-xl sm:text-2xl font-black tracking-tight text-primary leading-none font-heading">Rootz</span>
            <span className="text-[8px] sm:text-[9px] font-semibold tracking-[0.25em] text-accent leading-none uppercase">ORGANICS</span>
          </div>
        </div>

        {/* Search Bar - Desktop */}
        <div className="hidden lg:flex flex-1 max-w-lg mx-8 relative">
          <input
            type="text"
            placeholder="Search for organic fruits, vegetables, ghee..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-12 h-[48px] border border-[#E5E7EB] bg-white rounded-[14px] text-[14px] outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-foreground placeholder:text-light-text font-sans shadow-sm hover:shadow-md"
          />
          <span className="absolute right-4 top-3 text-light-text">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        {/* Action Icons */}
        <div className="flex items-center gap-2 sm:gap-4 text-primary">
          {/* Mobile Search Toggle */}
          <button
            className="lg:hidden p-2 rounded-xl hover:bg-black/5"
            onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>

          {/* Wishlist */}
          <button
            onClick={() => setWishlistOpen(true)}
            className="p-2 rounded-xl hover:bg-primary/6 relative transition-all magnetic-btn"
            title="Wishlist"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {wishlist.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Profile */}
          <button
            onClick={() => setProfileOpen(true)}
            className="p-2 rounded-xl hover:bg-primary/6 flex items-center gap-1.5 transition-all magnetic-btn"
            title="Account"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            {user.isLoggedIn && (
              <span className="hidden sm:inline text-xs font-bold truncate max-w-[80px]">
                {user.name.split(' ')[0]}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            className="p-2 rounded-xl hover:bg-primary/6 relative transition-all magnetic-btn"
            title="Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {totalCartItems > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[9px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white shadow-sm animate-scale">
                {totalCartItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* 3. Mobile Search Expanding Bar */}
      <AnimatePresence>
        {isMobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden w-full bg-white border-t border-border-color px-4 py-2"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 h-[52px] border border-border-color rounded-[14px] text-[15px] outline-none text-foreground placeholder:text-light-text font-sans"
              />
              <span className="absolute right-4 top-4 text-light-text">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Navigation Menu Bar - Desktop (Premium Light styling, h-72px, green hover) */}
      <motion.nav 
        animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="hidden lg:block w-full bg-white border-t border-border-color overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-center flex-wrap gap-x-6 gap-y-2 py-4">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className="text-[14px] font-semibold tracking-[0.3px] text-foreground hover:text-secondary rounded transition-all cursor-pointer font-sans"
          >
            All Products
          </button>
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className="text-[14px] font-medium tracking-[0.3px] text-body-text hover:text-secondary rounded transition-all cursor-pointer font-sans"
            >
              {cat.label}
            </button>
          ))}
        </div>
      </motion.nav>

      {/* 5. Mobile Slide-in Drawer Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black z-50"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-background shadow-2xl z-50 flex flex-col text-foreground"
            >
              <div className="p-4 border-b border-border-color flex items-center justify-between bg-primary text-white">
                <span className="font-bold tracking-wide font-heading">SHOP BY CATEGORY</span>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 rounded-xl hover:bg-white/10">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-2">
                <button
                  onClick={() => {
                    setSelectedCategory('ALL');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-6 py-3 hover:bg-black/5 text-primary font-bold text-sm border-b border-border-color"
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => {
                      setSelectedCategory(cat.key);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-6 py-3 hover:bg-black/5 text-sm border-b border-border-color font-medium"
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              <div className="p-4 border-t border-border-color bg-surface space-y-2 text-xs font-semibold">
                <p className="cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>About Us</p>
                <p className="cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Gifting & Offerings</p>
                <p className="cursor-pointer hover:underline" onClick={() => setIsMobileMenuOpen(false)}>Bulk Orders</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
