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
    { href: '/admin', label: 'Admin' },
    { href: '/analytics', label: 'Analytics' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-green-200/30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              className="text-2xl font-bold text-green-700 group-hover:text-green-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              🧠 AGS
            </motion.div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  className={`relative font-medium transition-colors ${
                    isActive(link.href)
                      ? 'text-green-700'
                      : 'text-green-600 hover:text-green-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-green-600"
                      layoutId="navbar"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-green-700 hover:bg-green-50 rounded-lg transition-colors"
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
            className="md:hidden pb-4 space-y-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <motion.div
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2 rounded-lg font-medium transition-all ${
                    isActive(link.href)
                      ? 'bg-green-100 text-green-700'
                      : 'text-green-600 hover:bg-green-50'
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
