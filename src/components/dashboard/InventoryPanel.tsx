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
  critical: { bg: 'bg-rose-500/5', border: 'border-rose-200/50', color: 'text-rose-700', label: '⚠️ Critical' },
  warning: { bg: 'bg-amber-500/5', border: 'border-amber-200/50', color: 'text-amber-700', label: '⚡ Warning' },
  normal: { bg: 'bg-primary/5', border: 'border-primary/10', color: 'text-primary', label: '✓ Normal' },
};

export function InventoryPanel() {
  const criticalCount = mockInventory.filter((i) => i.status === 'critical').length;

  return (
    <div className="space-y-4 font-sans">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-black text-foreground font-heading flex items-center gap-2">
          <span>📦</span> Smart Inventory
        </h2>
        {criticalCount > 0 && (
          <motion.div
            className="px-3.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-700 border border-rose-200/40"
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
              className={`${config.bg} border ${config.border} rounded-2xl p-4.5 hover:shadow-premium transition-all duration-350`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-foreground text-sm sm:text-base">{item.name}</p>
                  <p className={`text-xs font-bold ${config.color} mt-0.5`}>{config.label}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-foreground leading-none">{item.stock}</p>
                  <p className="text-[10px] text-light-text font-bold tracking-wide uppercase mt-1">in stock</p>
                </div>
              </div>

              {/* Stock Level Bar */}
              <div className="mb-3">
                <div className="flex justify-between text-xs text-body-text/80 font-medium mb-1.5">
                  <span>Stock Level</span>
                  <span>Reorder at {item.reorderLevel}</span>
                </div>
                <div className="w-full bg-bg-secondary rounded-full h-2 overflow-hidden border border-border-color">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(stockPercent, 100)}%` }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                  />
                </div>
              </div>

              {/* Info */}
              <div className="flex justify-between items-center text-xs">
                <span className="text-body-text/80 font-semibold">Expiry: {item.expiryDays} days</span>
                {item.status === 'critical' && (
                  <motion.button
                    className="px-3 py-1 bg-rose-500/10 text-rose-700 hover:bg-rose-500/25 border border-rose-500/20 rounded-lg text-xs font-bold cursor-pointer transition-all"
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
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4.5">
        <p className="text-primary font-black text-sm flex items-center gap-1.5 mb-1">
          <span>🤖</span> Auto-Supplier Integration
        </p>
        <p className="text-foreground text-xs font-bold mb-2">Status: Active</p>
        <p className="text-[11px] font-medium leading-relaxed text-body-text/90">
          When stock drops below reorder level, automatic purchase orders are created with the best supplier.
        </p>
      </div>
    </div>
  );
}
