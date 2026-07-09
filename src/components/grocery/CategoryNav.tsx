'use client';

import { useGroceryStore } from '@/stores/groceryStore';
import { motion } from 'framer-motion';

export function CategoryNav() {
  const { selectedCategory, setSelectedCategory } = useGroceryStore();

  const categories = [
    { key: 'ALL', label: 'All Products', emoji: '🛒' },
    { key: 'MANGOES', label: 'Mangoes', emoji: '🥭' },
    { key: 'VEG & FRUITS', label: 'Veg & Fruits', emoji: '🥦' },
    { key: 'ANCIENT FLOURS', label: 'Ancient Flours', emoji: '🌾' },
    { key: 'HERITAGE RICE', label: 'Heritage Rice', emoji: '🍚' },
    { key: 'PULSES', label: 'Pulses', emoji: '🫘' },
    { key: 'AYURVEDA', label: 'Ayurveda', emoji: '🌿' },
    { key: 'OIL & GHEE', label: 'Oil & Ghee', emoji: '🏺' },
    { key: 'NUTS, SEEDS & SUPER FOODS', label: 'Nuts & Seeds', emoji: '🥜' },
    { key: 'MILLETS & GLUTEN FREE', label: 'Millets', emoji: '🌻' },
    { key: 'PLANT FORWARD & KETO', label: 'Plant Forward', emoji: '🥗' },
    { key: 'PICKLES, SPICES & SWEETNERS', label: 'Pickles & Spices', emoji: '🫙' },
    { key: 'BAKERY & BREAKFAST', label: 'Bakery', emoji: '🍞' },
    { key: 'DEALS', label: 'Deals', emoji: '🏷️' },
  ];

  return (
    <div className="w-full py-6 border-b border-border-color bg-surface/60 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-nowrap md:flex-wrap items-center justify-start md:justify-center overflow-x-auto gap-2 pb-2 md:pb-0 scrollbar-none">
          {categories.map((cat, i) => {
            const isActive = selectedCategory === cat.key;
            return (
              <motion.button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`relative flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium tracking-wide whitespace-nowrap cursor-pointer transition-all duration-300 focus:outline-none bento-card ${
                  isActive
                    ? 'bg-primary text-white shadow-glow-green font-bold'
                    : 'bg-surface/80 text-body-text hover:bg-primary/8 hover:text-primary border border-border-color hover:border-primary/15'
                }`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.03,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-base leading-none">{cat.emoji}</span>
                <span>{cat.label}</span>

                {isActive && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 rounded-full bg-primary -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
