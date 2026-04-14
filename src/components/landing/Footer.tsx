'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-emerald-50/50 via-white to-white border-t-2 border-green-300/50 py-16 px-4 relative overflow-hidden">
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-300/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 mb-4">
              🧠 Advanced Grocery
            </h3>
            <p className="text-green-700 text-sm font-semibold">
              The AI-powered store management system that thinks for you.
            </p>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-bold text-green-700 mb-4 uppercase tracking-wide">Product</h4>
            <ul className="space-y-2 text-green-700/70 text-sm">
              {['Features', 'Pricing', 'Demo', 'API'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-green-600 transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-bold text-green-700 mb-4 uppercase tracking-wide">Company</h4>
            <ul className="space-y-2 text-green-700/70 text-sm">
              {['About', 'Blog', 'Careers', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-green-600 transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-bold text-green-700 mb-4 uppercase tracking-wide">Legal</h4>
            <ul className="space-y-2 text-green-700/70 text-sm">
              {['Privacy', 'Terms', 'Security', 'Compliance'].map((item) => (
                <li key={item}>
                  <Link href="#" className="hover:text-green-600 transition-colors font-medium">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t-2 border-green-300/50 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-green-700 font-semibold text-sm">
            © 2024 Advanced Grocery System. All rights reserved.
          </p>
          <div className="flex gap-6 mt-6 md:mt-0">
            {['Twitter', 'LinkedIn', 'GitHub'].map((social) => (
              <Link
                key={social}
                href="#"
                className="text-green-700 hover:text-green-600 hover:font-bold transition-all text-sm font-semibold"
              >
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
