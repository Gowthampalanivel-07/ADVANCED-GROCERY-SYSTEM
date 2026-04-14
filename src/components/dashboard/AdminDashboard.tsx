'use client';

import { motion } from 'framer-motion';

export function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-emerald-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold text-green-800 mb-2">Store Dashboard</h1>
          <p className="text-green-600">Real-time management of all store operations</p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Today's Revenue", value: '₹42,580', change: '+12.5%', icon: '💰' },
            { label: 'Profit Margin', value: '28.3%', change: '+2.1%', icon: '📈' },
            { label: 'Active Orders', value: '156', change: '+8.3%', icon: '🛒' },
            { label: 'Inventory Value', value: '₹285,420', change: '-3.2%', icon: '📦' },
          ].map((kpi, i) => (
            <motion.div
              key={i}
              className="backdrop-blur-md bg-green-50/80 border border-green-300/40 rounded-xl p-6 hover:border-green-400/70 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-600 text-sm font-semibold">{kpi.label}</p>
                  <p className="text-3xl font-bold text-green-800 mt-2">{kpi.value}</p>
                  <p className={kpi.change.includes('+') ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'}>
                    {kpi.change}
                  </p>
                </div>
                <span className="text-3xl">{kpi.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pricing & Inventory */}
          <div className="lg:col-span-2 space-y-8">
            {/* Dynamic Pricing */}
            <motion.div
              className="backdrop-blur-md bg-green-50/80 border border-green-300/40 rounded-xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-bold text-green-800 mb-6">💰 Dynamic Pricing</h2>
              <div className="space-y-4">
                {[
                  { name: 'Milk', base: 60, current: 42, disc: '-30%', reason: '2d expiry' },
                  { name: 'Bread', base: 40, current: 40, disc: '0%', reason: 'Optimal' },
                  { name: 'Eggs', base: 25, current: 29, disc: '+14%', reason: 'High demand' },
                ].map((p, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center justify-between p-3 bg-green-50 border border-green-200/50 rounded-lg"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div>
                      <p className="font-semibold text-green-800">{p.name}</p>
                      <p className="text-xs text-green-600">{p.reason}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-green-800 font-semibold">₹{p.current}</p>
                      <p className={p.disc.includes('-') ? 'text-emerald-600' : 'text-red-500'}>
                        {p.disc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Inventory */}
            <motion.div
              className="backdrop-blur-md bg-green-50/80 border border-green-300/40 rounded-xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-green-800 mb-6">📦 Smart Inventory</h2>
              <div className="space-y-4">
                {[
                  { name: 'Milk', stock: 25, level: 50, status: 'critical' },
                  { name: 'Bread', stock: 85, level: 60, status: 'normal' },
                  { name: 'Eggs', stock: 180, level: 100, status: 'normal' },
                ].map((item, i) => {
                  const pct = (item.stock / (item.level + 30)) * 100;
                  return (
                    <motion.div key={i} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-green-900 font-semibold">{item.name}</span>
                        <span className="text-green-600 font-medium">{item.stock}/{item.level}</span>
                      </div>
                      <div className="w-full bg-green-200 rounded-full h-2">
                        <motion.div
                          className={`h-2 rounded-full ${
                            item.status === 'critical'
                              ? 'bg-red-500'
                              : 'bg-gradient-to-r from-green-500 to-emerald-500'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(pct, 100)}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Fraud Detection */}
            <motion.div
              className="backdrop-blur-md bg-green-50/80 border border-green-300/40 rounded-xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-xl font-bold text-green-900 mb-4">🔍 Fraud Detection</h2>
              <div className="space-y-3">
                {[
                  { type: 'Unusual Refunds', severity: 'high' },
                  { type: 'Price Tampering', severity: 'medium' },
                  { type: 'Discount Abuse', severity: 'high' },
                ].map((alert, i) => (
                  <motion.div
                    key={i}
                    className={`p-3 rounded-lg ${
                      alert.severity === 'high'
                        ? 'bg-red-500/10 border border-red-400/30'
                        : 'bg-yellow-500/10 border border-yellow-400/30'
                    }`}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <p className="text-sm font-semibold text-green-900">{alert.type}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              className="backdrop-blur-md bg-green-50/80 border border-green-300/40 rounded-xl p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-xl font-bold text-green-900 mb-4">⚡ Quick Actions</h2>
              <div className="space-y-2">
                {['Create Promotion', 'Generate Report', 'View Heatmap', 'Check Sales'].map((action, i) => (
                  <motion.button
                    key={i}
                    className="w-full py-2 px-3 bg-gradient-to-r from-green-500/30 to-emerald-500/30 text-green-700 rounded-lg hover:from-green-500/50 hover:to-emerald-500/50 transition-all border border-green-400/50 text-sm font-semibold"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {action}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
