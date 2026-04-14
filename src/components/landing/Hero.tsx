'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'trial' | 'demo' | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Particle system for AI brain animation
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      targetX?: number;
      targetY?: number;
    }> = [];

    // Initialize particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    // Mouse tracking
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(248, 249, 250, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update particles
      particles.forEach((p, i) => {
        // Move towards mouse slowly
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 200) {
          p.vx += (dx / distance) * 0.5;
          p.vy += (dy / distance) * 0.5;
        }

        // Apply friction
        p.vx *= 0.98;
        p.vy *= 0.98;

        // Boundaries
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        p.x += p.vx;
        p.y += p.vy;

        // Draw connections
        particles.slice(i + 1).forEach((p2) => {
          const dx = p2.x - p.x;
          const dy = p2.y - p.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.strokeStyle = `rgba(46, 204, 113, ${0.3 * (1 - distance / 100)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });
      });

      // Draw particles
      particles.forEach((p) => {
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        gradient.addColorStop(0, `rgba(46, 204, 113, ${p.opacity})`);
        gradient.addColorStop(1, `rgba(39, 174, 96, ${p.opacity * 0.5})`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // GSAP animations
    const timeline = gsap.timeline();

    // Hero title animation
    timeline.fromTo(
      '.hero-title',
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    );

    timeline.fromTo(
      '.hero-subtitle',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    timeline.fromTo(
      '.hero-cta',
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out' },
      '-=0.4'
    );

    // Floating cards animation
    gsap.to('.data-card', {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      stagger: 0.2,
      ease: 'sine.inOut',
    });

    // Glow effect
    gsap.to('.glow-effect', {
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-white via-green-50 to-emerald-50"
    >
      {/* Premium Gradient Backdrop */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white opacity-40" />
      
      {/* Animated Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-green-400/20 to-emerald-400/10 rounded-full blur-3xl opacity-60" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-bl from-emerald-300/15 to-green-300/5 rounded-full blur-3xl opacity-50" />

      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      {/* Premium Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-5" />

      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col items-center justify-center px-4">
        {/* Main Title */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title text-6xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-green-500 via-emerald-500 to-green-400 drop-shadow-lg">
            The Store That Thinks
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-600 max-w-2xl mx-auto font-semibold">
            AI-Powered Grocery Management System with Dynamic Pricing, Smart
            Inventory, and Predictive Analytics
          </p>
        </motion.div>

        {/* Data Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          {[
            { label: 'Real-time Analytics', value: '24/7' },
            { label: 'AI Optimization', value: '99.9%' },
            { label: 'Profit Gain', value: '+42%' },
          ].map((card, i) => (
            <motion.div
              key={i}
              className="data-card relative backdrop-blur-lg bg-gradient-to-br from-green-50/90 via-white/50 to-emerald-50/60 border border-green-300/60 rounded-xl p-6 text-center hover:border-green-400/100 transition-all shadow-lg shadow-green-500/10 hover:shadow-xl hover:shadow-green-500/20"
              whileHover={{ scale: 1.05, borderColor: 'rgba(46, 204, 113, 1)' }}
            >
              {/* Inner gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent rounded-xl pointer-events-none" />
              <p className="relative text-green-700 text-sm mb-2 font-bold uppercase tracking-wide">{card.label}</p>
              <p className="relative text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500">{card.value}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4">
          <motion.button
            onClick={() => {
              setModalType('trial');
              setShowModal(true);
            }}
            className="px-8 py-4 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white font-bold rounded-lg shadow-lg shadow-green-500/40 hover:shadow-2xl hover:shadow-green-500/60 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 transition-all cursor-pointer uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ Start Free Trial
          </motion.button>
          <motion.button
            onClick={() => {
              setModalType('demo');
              setShowModal(true);
            }}
            className="px-8 py-4 border-2 bg-gradient-to-r from-green-50 to-emerald-50 border-green-500 text-green-700 font-bold rounded-lg text-green-600 hover:bg-gradient-to-r hover:from-green-100 hover:to-emerald-100 hover:border-emerald-500 hover:shadow-lg hover:shadow-green-500/20 transition-all cursor-pointer uppercase tracking-wide"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Watch Demo
          </motion.button>
        </div>

        {/* Glow Effects */}
        <div className="glow-effect absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/20 rounded-full blur-3xl" />
        <div className="glow-effect absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl" />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-green-500 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-green-500 rounded-full animate-bounce" />
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              {modalType === 'trial' ? '🚀 Start Your Free Trial' : '🎬 Watch Demo'}
            </h3>
            <p className="text-green-700 mb-6">
              {modalType === 'trial'
                ? 'Get 30 days free access to all features. No credit card required.'
                : 'See the Advanced Grocery System in action.'}
            </p>

            {modalType === 'trial' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Store Name"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ) : (
              <div className="bg-green-100 h-40 rounded-lg flex items-center justify-center text-green-700 font-semibold">
                🎥 Video Player Here
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={() => {
                  if (modalType === 'trial') {
                    setShowModal(false);
                    setTimeout(() => router.push('/dashboard'), 300);
                  } else {
                    setShowModal(false);
                  }
                }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {modalType === 'trial' ? 'Get Started' : 'Got It'}
              </motion.button>
              <motion.button
                onClick={() => setShowModal(false)}
                className="flex-1 border-2 border-green-500 text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Modal */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-green-800 mb-4">
              {modalType === 'trial' ? '🚀 Start Your Free Trial' : '🎬 Watch Demo'}
            </h3>
            <p className="text-green-700 mb-6">
              {modalType === 'trial'
                ? 'Get 30 days free access to all features. No credit card required.'
                : 'See the Advanced Grocery System in action.'}
            </p>

            {modalType === 'trial' ? (
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Store Name"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            ) : (
              <div className="bg-green-100 h-40 rounded-lg flex items-center justify-center text-green-700 font-semibold">
                🎥 Video Player Here
              </div>
            )}

            <div className="flex gap-4 mt-8">
              <motion.button
                onClick={() => {
                  if (modalType === 'trial') {
                    setShowModal(false);
                    setTimeout(() => router.push('/dashboard'), 300);
                  } else {
                    setShowModal(false);
                  }
                }}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold py-2 rounded-lg hover:shadow-lg transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {modalType === 'trial' ? 'Get Started' : 'Got It'}
              </motion.button>
              <motion.button
                onClick={() => setShowModal(false)}
                className="flex-1 border-2 border-green-500 text-green-600 font-semibold py-2 rounded-lg hover:bg-green-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-green-500 rounded-full flex items-center justify-center">
          <div className="w-1 h-2 bg-green-500 rounded-full animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
