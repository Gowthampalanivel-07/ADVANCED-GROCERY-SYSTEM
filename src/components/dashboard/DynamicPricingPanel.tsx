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
    return <div className="p-4 text-center text-green-600 font-semibold animate-pulse">Loading pricing data...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-green-900 mb-6">💰 Dynamic Pricing Engine</h2>

      <div className="grid gap-4">
        {prices.map((price, i) => (
          <motion.div
            key={price.productId}
            className={`bg-gradient-to-br ${selectedProduct === price.productId ? 'from-green-50 to-emerald-50' : 'from-white to-green-50/50'} border-2 ${selectedProduct === price.productId ? 'border-green-400' : 'border-green-200'} rounded-lg p-6 hover:border-green-400 transition-all cursor-pointer`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setSelectedProduct(price.productId)}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900">
                  {price.productName}
                </h3>
                <p className="text-sm text-green-600 font-medium">{price.reason}</p>
              </div>
              <motion.div
                className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ${
                  price.discount > 0
                    ? 'bg-emerald-100 text-emerald-700'
                    : price.discount < 0
                    ? 'bg-red-100 text-red-700'
                    : 'bg-blue-100 text-blue-700'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {price.discount > 0 ? '-' : '+'}
                {Math.abs(price.discount).toFixed(1)}%
              </motion.div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-green-600 text-xs font-semibold">Base Price</p>
                <p className="text-lg font-bold text-green-900">₹{price.basePrice}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-green-600 text-xs font-semibold">Current Price</p>
                <p className="text-lg font-bold text-green-900">₹{price.currentPrice}</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-green-600 text-xs font-semibold">Demand Level</p>
                <p className="text-lg font-bold text-green-900">{(price.demandLevel * 100).toFixed(0)}%</p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-green-200">
                <p className="text-green-600 text-xs font-semibold">Expiry</p>
                <p className="text-lg font-bold text-green-900">{price.expiryDays}d</p>
              </div>
            </div>

            {/* Demand Bar */}
            <div className="mb-4">
              <p className="text-xs text-green-600 font-semibold mb-2">Demand Level</p>
              <div className="w-full bg-green-200 rounded-full h-2">
                <motion.div
                  className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
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
                className={`flex-1 px-4 py-2 rounded-lg font-semibold transition-all text-white ${
                  appliedPrices.has(price.productId)
                    ? 'bg-emerald-500 shadow-lg'
                    : 'bg-green-500 hover:bg-green-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {appliedPrices.has(price.productId) ? '✓ Applied' : 'Apply Price'}
              </motion.button>
              <motion.button
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg font-semibold hover:bg-green-200 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Edit
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-300 rounded-lg mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-green-900 font-semibold">
          💡 {appliedPrices.size > 0 ? `${appliedPrices.size} prices applied successfully!` : 'Smart pricing recommendations based on demand and inventory levels'}
        </p>
      </motion.div>
    </div>
  );
}
