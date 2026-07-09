'use client';

import { motion } from 'framer-motion';

interface FraudAlertItem {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  timestamp: Date;
}

const mockAlerts: FraudAlertItem[] = [
  {
    id: '1',
    type: 'Unusual Refunds',
    severity: 'high',
    description: 'Staff processed 12 refunds in 30 minutes',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'Price Tampering',
    severity: 'medium',
    description: 'Manual override on 3 items',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'Discount Abuse',
    severity: 'high',
    description: 'Coupon applied multiple times',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
  },
];

const severityConfig = {
  low: { bg: 'bg-blue-500/5', border: 'border-blue-100', color: 'text-blue-800', icon: '🔵' },
  medium: { bg: 'bg-amber-500/5', border: 'border-amber-100', color: 'text-amber-700', icon: '🟡' },
  high: { bg: 'bg-orange-500/5', border: 'border-orange-200/50', color: 'text-orange-800', icon: '🔶' },
  critical: { bg: 'bg-rose-500/5', border: 'border-rose-100', color: 'text-rose-800', icon: '🔴' },
};

export function FraudDetectionPanel() {
  const criticalCount = mockAlerts.filter((a) => a.severity === 'critical').length;
  const totalRisk = mockAlerts.length > 0 ? 'MEDIUM' : 'LOW';

  return (
    <div className="space-y-4 font-sans text-foreground">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl sm:text-2xl font-black font-heading flex items-center gap-2">
          <span>🔍</span> Fraud Detection
        </h2>
        <div
          className={`px-3.5 py-1 rounded-full text-xs font-black border ${
            totalRisk === 'MEDIUM'
              ? 'bg-orange-500/10 border-orange-200/50 text-orange-800'
              : 'bg-primary/10 border-primary/10 text-primary'
          }`}
        >
          Risk: {totalRisk}
        </div>
      </div>

      {/* AI Confidence */}
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-4.5">
        <p className="text-primary font-black text-xs sm:text-sm mb-2">AI Confidence Score</p>
        <div className="w-full bg-bg-secondary rounded-full h-3 overflow-hidden border border-border-color">
          <motion.div
            className="bg-primary h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '87%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-primary font-black text-sm mt-2">87%</p>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {mockAlerts.map((alert, i) => {
          const config = severityConfig[alert.severity];
          return (
            <motion.div
              key={alert.id}
              className={`${config.bg} border ${config.border} rounded-2xl p-4 hover:shadow-premium transition-all duration-300`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{config.icon}</span>
                <div className="flex-1">
                  <p className="font-bold text-foreground text-sm sm:text-base">{alert.type}</p>
                  <p className="text-xs sm:text-sm text-body-text/90 mt-1 font-medium leading-relaxed">{alert.description}</p>
                  <p className="text-[10px] text-light-text font-bold tracking-wide uppercase mt-2">
                    {Math.floor(
                      (Date.now() - alert.timestamp.getTime()) / (1000 * 60)
                    )}{' '}
                    minutes ago
                  </p>
                </div>
                <motion.button
                  className="px-3 py-1.5 bg-primary/10 text-primary hover:bg-primary/15 border border-primary/5 rounded-lg text-xs font-bold cursor-pointer transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Review
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Recommendations */}
      <div className="bg-accent/5 border border-accent/15 rounded-2xl p-4.5">
        <h3 className="font-black text-sm text-accent-hover mb-3 flex items-center gap-1.5">
          <span>📋</span> Recommendations
        </h3>
        <ul className="space-y-2 text-xs sm:text-sm font-semibold text-body-text">
          <li className="flex items-center gap-1.5 text-emerald-800">✓ Review staff member transactions (ID: staff-id-5)</li>
          <li className="flex items-center gap-1.5 text-emerald-800">✓ Verify coupon usage with customer</li>
          <li className="flex items-center gap-1.5 text-emerald-800">✓ Enable transaction verification alerts</li>
        </ul>
      </div>
    </div>
  );
}
