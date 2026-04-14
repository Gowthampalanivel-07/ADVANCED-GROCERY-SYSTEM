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
  low: { bg: 'bg-blue-500/10', border: 'border-blue-400/30', icon: '⚪' },
  medium: { bg: 'bg-yellow-500/10', border: 'border-yellow-400/30', icon: '🟡' },
  high: { bg: 'bg-orange-500/10', border: 'border-orange-400/30', icon: '🔶' },
  critical: { bg: 'bg-red-500/10', border: 'border-red-400/30', icon: '🔴' },
};

export function FraudDetectionPanel() {
  const criticalCount = mockAlerts.filter((a) => a.severity === 'critical').length;
  const totalRisk = mockAlerts.length > 0 ? 'MEDIUM' : 'LOW';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">🔍 Fraud Detection</h2>
        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            totalRisk === 'MEDIUM'
              ? 'bg-orange-500/20 text-orange-300'
              : 'bg-green-500/20 text-green-300'
          }`}
        >
          Risk: {totalRisk}
        </div>
      </div>

      {/* AI Confidence */}
      <div className="backdrop-blur-md bg-white/5 border border-blue-400/20 rounded-lg p-4">
        <p className="text-blue-300 text-sm mb-2">AI Confidence Score</p>
        <div className="w-full bg-gray-700 rounded-full h-3">
          <motion.div
            className="bg-linear-to-r from-purple-500 to-pink-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '87%' }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
        <p className="text-white font-bold mt-2">87%</p>
      </div>

      {/* Alerts */}
      <div className="space-y-3">
        {mockAlerts.map((alert, i) => {
          const config = severityConfig[alert.severity];
          return (
            <motion.div
              key={alert.id}
              className={`${config.bg} border ${config.border} rounded-lg p-4`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl">{config.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold text-white">{alert.type}</p>
                  <p className="text-sm text-gray-300">{alert.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {Math.floor(
                      (Date.now() - alert.timestamp.getTime()) / (1000 * 60)
                    )}{' '}
                    minutes ago
                  </p>
                </div>
                <motion.button
                  className="px-3 py-1 bg-white/10 rounded text-sm font-semibold text-white hover:bg-white/20 transition-all"
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
      <div className="backdrop-blur-md bg-linear-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/20 rounded-lg p-4">
        <h3 className="font-semibold text-white mb-3">📋 Recommendations</h3>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>✓ Review staff member transactions (ID: staff-id-5)</li>
          <li>✓ Verify coupon usage with customer</li>
          <li>✓ Enable transaction verification alerts</li>
        </ul>
      </div>
    </div>
  );
}
