'use client';

import { motion } from 'framer-motion';

interface InventoryItem {
  id: string;
  name: string;
  stock: number;
  reorderLevel: number;
  expiryDays: number;
  status: 'critical' | 'warning' | 'normal';
}

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'Milk', stock: 25, reorderLevel: 50, expiryDays: 2, status: 'critical' },
  { id: '2', name: 'Bread', stock: 85, reorderLevel: 60, expiryDays: 5, status: 'normal' },
  { id: '3', name: 'Eggs', stock: 180, reorderLevel: 100, expiryDays: 14, status: 'normal' },
  { id: '4', name: 'Cheese', stock: 35, reorderLevel: 40, expiryDays: 10, status: 'warning' },
];

const statusConfig = {
  critical: { bg: 'bg-red-500/10', border: 'border-red-400/30', color: 'text-red-400', label: '⚠️ Critical' },
  warning: { bg: 'bg-yellow-500/10', border: 'border-yellow-400/30', color: 'text-yellow-400', label: '⚡ Warning' },
  normal: { bg: 'bg-green-500/10', border: 'border-green-400/30', color: 'text-green-400', label: '✓ Normal' },
};

export function InventoryPanel() {
  const criticalCount = mockInventory.filter((i) => i.status === 'critical').length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">📦 Smart Inventory</h2>
        {criticalCount > 0 && (
          <motion.div
            className="px-3 py-1 rounded-full text-sm font-semibold bg-red-500/20 text-red-300"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            {criticalCount} Critical
          </motion.div>
        )}
      </div>

      <div className="space-y-3">
        {mockInventory.map((item, i) => {
          const config = statusConfig[item.status];
          const stockPercent = (item.stock / (item.reorderLevel + 50)) * 100;

          return (
            <motion.div
              key={item.id}
              className={`${config.bg} border ${config.border} rounded-lg p-4`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className={`text-xs ${config.color}`}>{config.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-white">{item.stock}</p>
                  <p className="text-xs text-gray-400">in stock</p>
                </div>
              </div>

              {/* Stock Level Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-400 mb-1">
                  <span>Stock Level</span>
                  <span>Reorder at {item.reorderLevel}</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <motion.div
                    className="bg-linear-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(stockPercent, 100)}%` }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex justify-between text-xs">
                <span className="text-gray-400">Expiry: {item.expiryDays} days</span>
                {item.status === 'critical' && (
                  <motion.button
                    className="px-2 py-1 bg-red-500/30 text-red-300 rounded hover:bg-red-500/50 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Create PO
                  </motion.button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Auto-Reorder Status */}
      <div className="backdrop-blur-md bg-linear-to-r from-blue-500/10 to-cyan-500/10 border border-blue-400/20 rounded-lg p-4">
        <p className="text-blue-300 text-sm mb-2">🤖 Auto-Supplier Integration</p>
        <p className="text-white font-semibold mb-2">Status: Active</p>
        <p className="text-xs text-gray-300">
          When stock drops below reorder level, automatic purchase orders are created with the best supplier.
        </p>
      </div>
    </div>
  );
}
