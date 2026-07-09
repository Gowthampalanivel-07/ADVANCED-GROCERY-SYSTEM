'use client';

import { motion } from 'framer-motion';

export function AdminDashboard() {
  return (
    <div className="w-full font-sans">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Stores', value: '12', icon: '🏪', change: '+1 store this month', changeColor: 'text-primary' },
          { label: 'Active Users', value: '2,450', icon: '👥', change: '+14% active today', changeColor: 'text-primary' },
          { label: 'Revenue (This Month)', value: '₹12.5M', icon: '💸', change: '+8.3% increase', changeColor: 'text-primary' },
          { label: 'System Health', value: '99.8%', icon: '🔧', change: 'All systems online', changeColor: 'text-emerald-700' },
        ].map((kpi, i) => (
          <motion.div
            key={i}
            className="bg-surface border border-border-color rounded-[24px] p-6 shadow-xs hover:shadow-premium transition-all duration-300 relative overflow-hidden group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-light-text text-xs font-bold tracking-wider uppercase">{kpi.label}</p>
                <p className="text-2xl sm:text-3xl font-black text-foreground mt-2 tracking-tight">{kpi.value}</p>
                <p className={`text-xs font-bold mt-2 ${kpi.changeColor}`}>
                  {kpi.change}
                </p>
              </div>
              <span className="text-3xl bg-bg-secondary p-2.5 rounded-2xl group-hover:scale-110 transition-transform duration-300">{kpi.icon}</span>
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
            className="bg-surface border border-border-color rounded-[24px] p-6 shadow-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-6 font-heading flex items-center gap-2">
              <span>💰</span> Dynamic Pricing recommendations
            </h2>
            <div className="space-y-4">
              {[
                { name: 'Milk', base: 60, current: 42, disc: '-30%', reason: '2d expiry' },
                { name: 'Bread', base: 40, current: 40, disc: '0%', reason: 'Optimal' },
                { name: 'Eggs', base: 25, current: 29, disc: '+14%', reason: 'High demand' },
              ].map((p, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-4 bg-bg-secondary border border-border-color rounded-[18px] hover:border-primary/10 transition-all cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <p className="font-bold text-foreground text-sm sm:text-base">{p.name}</p>
                    <p className="text-xs text-body-text/80 mt-0.5 font-semibold">{p.reason}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-foreground font-black text-base">₹{p.current}</p>
                    <p className={`text-xs font-bold mt-1 ${p.disc.includes('-') ? 'text-emerald-700' : p.disc.includes('+') ? 'text-rose-700' : 'text-primary'}`}>
                      {p.disc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Inventory */}
          <motion.div
            className="bg-surface border border-border-color rounded-[24px] p-6 shadow-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
          >
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-6 font-heading flex items-center gap-2">
              <span>📦</span> Smart Inventory Levels
            </h2>
            <div className="space-y-4">
              {[
                { name: 'Milk', stock: 25, level: 50, status: 'critical' },
                { name: 'Bread', stock: 85, level: 60, status: 'normal' },
                { name: 'Eggs', stock: 180, level: 100, status: 'normal' },
              ].map((item, i) => {
                const pct = (item.stock / (item.level + 30)) * 100;
                return (
                  <motion.div key={i} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-foreground font-bold">{item.name}</span>
                      <span className="text-body-text font-bold">{item.stock} / {item.level}</span>
                    </div>
                    <div className="w-full bg-bg-secondary rounded-full h-2 overflow-hidden border border-border-color">
                      <motion.div
                        className={`h-2 rounded-full ${
                          item.status === 'critical'
                            ? 'bg-rose-500'
                            : 'bg-primary'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(pct, 100)}%` }}
                        transition={{ duration: 0.8, delay: i * 0.08 }}
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
            className="bg-surface border border-border-color rounded-[24px] p-6 shadow-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-6 font-heading flex items-center gap-2">
              <span>🔍</span> Fraud Alerts
            </h2>
            <div className="space-y-3">
              {[
                { type: 'Unusual Refunds', severity: 'high' },
                { type: 'Price Tampering', severity: 'medium' },
                { type: 'Discount Abuse', severity: 'high' },
              ].map((alert, i) => (
                <motion.div
                  key={i}
                  className={`p-4 rounded-[18px] border ${
                    alert.severity === 'high'
                      ? 'bg-rose-500/5 border-rose-100 text-rose-800'
                      : 'bg-amber-500/5 border-amber-100 text-amber-800'
                  }`}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <p className="text-sm font-bold leading-tight">{alert.type}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="bg-surface border border-border-color rounded-[24px] p-6 shadow-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <h2 className="text-lg sm:text-xl font-black text-foreground mb-6 font-heading flex items-center gap-2">
              <span>⚡</span> Management Actions
            </h2>
            <div className="space-y-3">
              {['Create Promotion', 'Generate Report', 'View Heatmap', 'Check Sales'].map((action, i) => (
                <motion.button
                  key={i}
                  className="w-full py-3 px-4 bg-primary hover:bg-primary/95 text-white rounded-xl text-xs sm:text-sm font-bold cursor-pointer transition-all border border-primary/10 shadow-xs"
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
  );
}
