'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

interface Feature {
  title: string;
  description: string;
  icon: string;
  metrics: { label: string; value: string }[];
  gradient: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Dynamic Pricing Engine',
    description:
      'Automatically adjusts prices based on demand, expiry dates, and time of day. Milk near expiry gets 30% off instantly.',
    icon: '💰',
    metrics: [
      { label: 'Waste Reduced', value: '45%' },
      { label: 'Profit Growth', value: '+38%' },
    ],
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Smart Store Layout',
    description:
      'AI analyzes customer buying patterns and suggests optimal product placement. Frequently bought together items positioned nearby.',
    icon: '📍',
    metrics: [
      { label: 'Impulse Buys', value: '+52%' },
      { label: 'Zone Efficiency', value: '+68%' },
    ],
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'Customer Behavior Heatmap',
    description:
      'Real-time visualization of customer movement patterns, dwell times, and product interest. Data-driven store design.',
    icon: '🧠',
    metrics: [
      { label: 'Data Accuracy', value: '98%' },
      { label: 'Insights/Week', value: '200+' },
    ],
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    title: 'Auto Supplier Integration',
    description:
      'Automatically creates purchase orders when stock is low. Compares supplier prices and delivery times in real-time.',
    icon: '📦',
    metrics: [
      { label: 'Manual Work', value: '-90%' },
      { label: 'Cost Savings', value: '14%' },
    ],
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    title: 'Profit Intelligence System',
    description:
      'Track actual profit per product, not just revenue. Calculate cost vs selling price margins automatically.',
    icon: '💵',
    metrics: [
      { label: 'Margin Clarity', value: '100%' },
      { label: 'Decision Speed', value: '10x' },
    ],
    gradient: 'from-red-500 to-pink-500',
  },
  {
    title: 'GST & Tax Automation',
    description:
      'India-specific GST calculation, tax reports generation, and monthly compliance summaries. Real-world ready.',
    icon: '🧾',
    metrics: [
      { label: 'Compliance', value: '100%' },
      { label: 'Time Saved', value: '20hrs/mo' },
    ],
    gradient: 'from-indigo-500 to-blue-500',
  },
  {
    title: 'Self-Checkout Mode',
    description:
      'Customers scan items via phone, pay directly, and walk out without queues. Ultra-modern supermarket experience.',
    icon: '📱',
    metrics: [
      { label: 'Queue Time', value: '-100%' },
      { label: 'Satisfaction', value: '+95%' },
    ],
    gradient: 'from-cyan-500 to-teal-500',
  },
  {
    title: 'Smart Promotion Engine',
    description:
      'Auto-generates "Buy 2 Get 1" and combo offers based on sales velocity and inventory levels.',
    icon: '🎯',
    metrics: [
      { label: 'Manual Creation', value: '-85%' },
      { label: 'Revenue Boost', value: '+23%' },
    ],
    gradient: 'from-lime-500 to-green-500',
  },
];

export function ScrollStories() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const features = gsap.utils.toArray<HTMLElement>('.feature-card');

    features.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        {
          opacity: 0,
          y: 100,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: feature,
            start: 'top 80%',
            end: 'top 30%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    // Parallax effect
    gsap.to('.parallax-bg', {
      y: 200,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-b from-emerald-50/50 via-white to-green-50/50 py-32 px-4 relative"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-300/15 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Background Parallax */}
      <div className="parallax-bg absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-grid" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-600 via-emerald-500 to-green-400 drop-shadow-sm">
            24 Extreme Features
          </h2>
          <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-600 font-semibold">
            From chaos to intelligence. Scroll through the transformation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card group"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative h-full backdrop-blur-xl bg-gradient-to-br from-white/90 via-green-50/40 to-emerald-50/30 border-2 border-green-300/50 rounded-2xl p-8 hover:border-green-400/100 transition-all overflow-hidden group-hover:shadow-2xl group-hover:shadow-green-500/20 group-hover:from-white/95 group-hover:via-green-50/60 group-hover:to-emerald-50/50">
                {/* Gradient background */}
                <div
                  className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-full blur-3xl`}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="text-5xl mb-4">{feature.icon}</div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-green-900 mb-3">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-green-700 mb-6 text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    {feature.metrics.map((metric, i) => (
                      <div
                        key={i}
                        className="bg-green-50/90 rounded-lg p-3 border border-green-200/60"
                      >
                        <p className="text-xs text-green-600 font-semibold">{metric.label}</p>
                        <p className="text-lg font-bold text-green-700">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <motion.button
                    onClick={() => {
                      setSelectedFeature(feature);
                      setShowModal(true);
                    }}
                    className="mt-6 w-full py-2 rounded-lg bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-700 text-sm font-semibold hover:from-green-500/50 hover:to-emerald-500/50 transition-all border border-green-400/50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More →
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Tier Features */}
        <motion.div
          className="mt-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative bg-gradient-to-br from-amber-50/80 via-orange-50/40 to-amber-50/60 border-2 border-amber-400/60 rounded-2xl p-12 text-center shadow-lg shadow-amber-500/15 hover:shadow-2xl hover:shadow-amber-500/25 transition-all overflow-hidden group">
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/5 to-orange-400/5 rounded-2xl" />
            <h3 className="relative text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-orange-600 mb-4">
              🏆 Gold Tier Features
            </h3>
            <p className="relative text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-600 font-semibold mb-6 max-w-2xl mx-auto">
              Advanced capabilities including Drone Delivery Integration, Emotion-Based Offers,
              Blockchain Billing, and Smart Budget Shopping Mode for next-level operations.
            </p>
            <motion.button
              className="relative px-8 py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white font-bold rounded-lg shadow-lg shadow-amber-500/40 hover:shadow-2xl hover:shadow-amber-500/60 hover:from-amber-600 hover:via-orange-600 hover:to-amber-700 transition-all uppercase tracking-wide"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✨ Explore Gold Tier
            </motion.button>
          </div>\n        </motion.div>
      </div>

      {/* Feature Details Modal */}
      {showModal && selectedFeature && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setShowModal(false)}
        >
          <motion.div
            className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedFeature.icon}</div>
                <div>
                  <h2 className="text-3xl font-bold text-green-900">{selectedFeature.title}</h2>
                  <p className="text-green-600 mt-1">Feature Details</p>
                </div>
              </div>
              <motion.button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>

            {/* Description */}
            <p className="text-gray-700 mb-6 text-lg leading-relaxed">
              {selectedFeature.description}
            </p>

            {/* Metrics Grid */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-green-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-4">
                {selectedFeature.metrics.map((metric, i) => (
                  <motion.div
                    key={i}
                    className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="text-sm text-green-600 font-semibold">{metric.label}</p>
                    <p className="text-2xl font-bold text-green-700">{metric.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Gradient Background */}
            <div
              className={`absolute -top-32 -right-32 w-64 h-64 bg-gradient-to-br ${selectedFeature.gradient} opacity-5 rounded-full blur-3xl pointer-events-none`}
            />

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Try This Feature
              </motion.button>
              <motion.button
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
