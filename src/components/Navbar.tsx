'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter, usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/dashboard', label: 'Dashboard' },
  ];

  const isActive = (href: string) => pathname === href;
  const isManagementRoute =
    pathname === '/dashboard' || pathname === '/admin' || pathname === '/analytics';

  if (
    pathname === '/' ||
    pathname === '/dashboard' ||
    pathname === '/admin' ||
    pathname === '/analytics'
  ) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 glass border-b border-primary/8 shadow-glow-green transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1.5 group">
            <motion.div
              className="text-primary flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,8,4,16,4,16s4-2,9-5c-5,3-8,9-8,9S12,16,17,8z M12,2C12,2,3,6,3,12s9,10,9,10s9-4,9-10S12,2,12,2z" />
              </svg>
            </motion.div>
            <div className="flex flex-col justify-start">
              <span className="text-lg font-black tracking-tight text-primary leading-none font-heading">Rootz</span>
              <span className="text-[7px] font-semibold tracking-[0.25em] text-accent leading-none uppercase">ORGANICS</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className={`relative font-semibold text-sm transition-colors py-1 cursor-pointer font-sans magnetic-btn ${
                    isActive(link.href) || (link.href === '/dashboard' && isManagementRoute)
                      ? 'text-primary'
                      : 'text-body-text hover:text-primary'
                  }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {link.label}
                  {isActive(link.href) || (link.href === '/dashboard' && isManagementRoute) ? (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary"
                      layoutId="navbar"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  ) : null}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-primary hover:bg-primary/5 rounded-xl transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="md:hidden pb-4 space-y-2 border-t border-border-color pt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary'
                      : 'text-body-text hover:bg-primary/5'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {link.label}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </nav>
  );
}
