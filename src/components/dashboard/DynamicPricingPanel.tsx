'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PriceData {
  productId: string;
  productName: string;
  basePrice: number;
  currentPrice: number;
  discount: number;
  reason: string;
  demandLevel: number;
  expiryDays: number;
}

export function DynamicPricingPanel() {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [appliedPrices, setAppliedPrices] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Mock data for demo
    const mockData: PriceData[] = [
      {
        productId: '1',
        productName: 'Milk',
        basePrice: 60,
        currentPrice: 42,
        discount: 30,
        reason: 'Expiring in 2 days',
        demandLevel: 0.8,
        expiryDays: 2,
      },
      {
        productId: '2',
        productName: 'Bread',
        basePrice: 40,
        currentPrice: 40,
        discount: 0,
        reason: 'Optimal price',
        demandLevel: 0.6,
        expiryDays: 5,
      },
      {
        productId: '3',
        productName: 'Eggs',
        basePrice: 25,
        currentPrice: 28.75,
        discount: -15,
        reason: 'High demand',
        demandLevel: 0.95,
        expiryDays: 14,
      },
    ];

    setTimeout(() => {
      setPrices(mockData);
      setLoading(false);
    }, 300);
  }, []);

  const handleApplyPrice = (productId: string) => {
    setAppliedPrices(new Set([...appliedPrices, productId]));
    setTimeout(() => {
      setAppliedPrices(new Set([...appliedPrices].filter(id => id !== productId)));
    }, 2000);
  };

  if (loading) {
    return <div className="p-4 text-center text-primary font-bold animate-pulse font-sans">Loading pricing data...</div>;
  }

  return (
    <div className="space-y-4 font-sans">
      <h2 className="text-xl sm:text-2xl font-black text-foreground mb-6 font-heading flex items-center gap-2">
        <span>💰</span> Dynamic Pricing Engine
      </h2>

      <div className="grid gap-4">
        {prices.map((price, i) => (
          <motion.div
            key={price.productId}
            className={`bg-surface border-2 rounded-[24px] p-5.5 hover:shadow-premium hover:border-primary/25 transition-all duration-300 cursor-pointer ${
              selectedProduct === price.productId ? 'border-primary' : 'border-border-color'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => setSelectedProduct(price.productId)}
            whileHover={{ scale: 1.01 }}
          >
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div className="flex-1">
                <h3 className="text-lg font-black text-foreground tracking-tight">
                  {price.productName}
                </h3>
                <p className="text-xs sm:text-sm text-body-text/80 font-bold mt-1">{price.reason}</p>
              </div>
              <motion.div
                className={`px-3 py-1.5 rounded-full text-xs font-black whitespace-nowrap ${
                  price.discount > 0
                    ? 'bg-emerald-500/10 text-emerald-700'
                    : price.discount < 0
                    ? 'bg-rose-500/10 text-rose-700'
                    : 'bg-primary/10 text-primary'
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {price.discount > 0 ? '-' : price.discount < 0 ? '+' : ''}
                {Math.abs(price.discount).toFixed(1)}%
              </motion.div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-bg-secondary p-3 rounded-[18px] border border-border-color">
                <p className="text-light-text text-[10px] font-bold uppercase tracking-wider">Base Price</p>
                <p className="text-base font-black text-foreground mt-1">₹{price.basePrice}</p>
              </div>
              <div className="bg-bg-secondary p-3 rounded-[18px] border border-border-color">
                <p className="text-light-text text-[10px] font-bold uppercase tracking-wider">Current Price</p>
                <p className="text-base font-black text-foreground mt-1">₹{price.currentPrice}</p>
              </div>
              <div className="bg-bg-secondary p-3 rounded-[18px] border border-border-color">
                <p className="text-light-text text-[10px] font-bold uppercase tracking-wider">Demand Level</p>
                <p className="text-base font-black text-foreground mt-1">{(price.demandLevel * 100).toFixed(0)}%</p>
              </div>
              <div className="bg-bg-secondary p-3 rounded-[18px] border border-border-color">
                <p className="text-light-text text-[10px] font-bold uppercase tracking-wider">Expiry</p>
                <p className="text-base font-black text-foreground mt-1">{price.expiryDays}d</p>
              </div>
            </div>

            {/* Demand Bar */}
            <div className="mb-4">
              <p className="text-xs text-body-text/80 font-bold mb-2">Demand Level</p>
              <div className="w-full bg-bg-secondary rounded-full h-2 overflow-hidden border border-border-color">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${price.demandLevel * 100}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 + 0.3 }}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  handleApplyPrice(price.productId);
                }}
                className={`flex-1 px-4 py-2.5 rounded-[14px] font-bold text-xs sm:text-sm tracking-wide transition-all text-white cursor-pointer ${
                  appliedPrices.has(price.productId)
                    ? 'bg-emerald-500 hover:bg-emerald-600 shadow-sm'
                    : 'bg-primary hover:bg-primary/95 shadow-sm'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {appliedPrices.has(price.productId) ? '✓ Applied' : 'Apply Price'}
              </motion.button>
              <motion.button
                className="px-4 py-2.5 bg-primary/10 text-primary border border-primary/5 rounded-[14px] font-bold text-xs sm:text-sm tracking-wide hover:bg-primary/15 transition-all cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Edit
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="p-4 bg-primary/5 border border-primary/10 rounded-[20px] mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <p className="text-primary font-bold text-xs sm:text-sm flex items-center gap-2">
          <span>💡</span>
          {appliedPrices.size > 0 ? `${appliedPrices.size} prices applied successfully!` : 'Smart pricing recommendations based on demand and inventory levels'}
        </p>
      </motion.div>
    </div>
  );
}
