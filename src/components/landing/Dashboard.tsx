'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data
const revenueData = [
  { name: 'Mon', revenue: 4000, profit: 2400 },
  { name: 'Tue', revenue: 3000, profit: 1398 },
  { name: 'Wed', revenue: 2000, profit: 9800 },
  { name: 'Thu', revenue: 2780, profit: 3908 },
  { name: 'Fri', revenue: 1890, profit: 4800 },
  { name: 'Sat', revenue: 2390, profit: 3800 },
  { name: 'Sun', revenue: 2490, profit: 4300 },
];

const heatmapData = [
  { name: 'Entrance', value: 100, color: '#2ECC71' },
  { name: 'Dairy', value: 85, color: '#27AE60' },
  { name: 'Produce', value: 72, color: '#16A085' },
  { name: 'Checkout', value: 65, color: '#F39C12' },
];

const topProducts = [
  { name: 'Milk', sales: 450, margin: 22 },
  { name: 'Bread', sales: 380, margin: 35 },
  { name: 'Eggs', sales: 320, margin: 18 },
  { name: 'Cheese', sales: 290, margin: 42 },
];

const COLORS = ['#2ECC71', '#27AE60', '#F39C12', '#16A085'];

export function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate metric cards
    gsap.from('.metric-card', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out',
    });

    // Animate chart containers
    gsap.from('.chart-container', {
      opacity: 0,
      scale: 0.95,
      stagger: 0.15,
      duration: 0.8,
      ease: 'back.out',
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full bg-gradient-to-b from-white via-emerald-50/30 to-white py-20 px-4 relative overflow-hidden"
    >
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-green-400/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-emerald-300/15 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 mb-2">
            Live Dashboard
          </h2>
          <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-green-700 to-emerald-600 font-semibold">Real-time analytics and insights</p>
        </motion.div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: 'Today\'s Revenue',
              value: '₹42,580',
              change: '+12.5%',
              icon: '💰',
            },
            {
              label: 'Profit Margin',
              value: '28.3%',
              change: '+2.1%',
              icon: '📈',
            },
            {
              label: 'Active Customers',
              value: '1,284',
              change: '+8.3%',
              icon: '👥',
            },
            {
              label: 'Inventory Value',
              value: '₹285,420',
              change: '-3.2%',
              icon: '📦',
            },
          ].map((metric, i) => (
            <motion.div
              key={i}
              className="metric-card relative backdrop-blur-lg bg-gradient-to-br from-green-50/90 via-white/60 to-emerald-50/80 border-2 border-green-300/60 rounded-xl p-6 hover:border-green-400/100 transition-all group shadow-lg shadow-green-500/10 hover:shadow-xl hover:shadow-green-500/20"
              whileHover={{ scale: 1.02, borderColor: 'rgba(46, 204, 113, 1)' }}
            >
              {/* Inner gradient accent */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-400/5 to-transparent rounded-xl pointer-events-none" />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-green-700 text-sm mb-2 font-bold uppercase tracking-wide">{metric.label}</p>
                  <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 mb-3">
                    {metric.value}
                  </p>
                  <span
                    className={`text-sm font-bold uppercase tracking-wide ${
                      metric.change.includes('+')
                        ? 'text-green-500'
                        : 'text-red-400'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <span className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity">
                  {metric.icon}
                </span>
              </div>
              <div className="mt-4 h-1 bg-gradient-to-r from-green-500/70 to-emerald-500/70 rounded-full" />
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            className="chart-container backdrop-blur-md bg-green-50/70 border border-green-300/30 rounded-xl p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Revenue & Profit Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(46, 204, 113, 0.15)" />
                <XAxis stroke="rgba(46, 204, 113, 0.4)" />
                <YAxis stroke="rgba(46, 204, 113, 0.4)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(248, 249, 250, 0.98)', border: '1px solid rgba(46, 204, 113, 0.6)', color: '#2C3E50' }} />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#2ECC71" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#27AE60" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Products */}
          <motion.div
            className="chart-container backdrop-blur-md bg-green-50/70 border border-green-300/30 rounded-xl p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Top Selling Products
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(46, 204, 113, 0.15)" />
                <XAxis stroke="rgba(46, 204, 113, 0.4)" dataKey="name" />
                <YAxis stroke="rgba(46, 204, 113, 0.4)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(248, 249, 250, 0.98)', border: '1px solid rgba(46, 204, 113, 0.6)', color: '#2C3E50' }} />
                <Bar dataKey="sales" fill="#2ECC71" />
                <Bar dataKey="margin" fill="#27AE60" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Heatmap */}
          <motion.div
            className="chart-container backdrop-blur-md bg-green-50/70 border border-green-300/30 rounded-xl p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Store Zone Traffic
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={heatmapData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {heatmapData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: 'rgba(248, 249, 250, 0.98)', border: '1px solid rgba(46, 204, 113, 0.6)', color: '#2C3E50' }} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Alerts */}
          <motion.div
            className="chart-container backdrop-blur-md bg-green-50/70 border border-green-300/30 rounded-xl p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold text-green-800 mb-4">
              Smart Alerts
            </h3>
            <div className="space-y-3">
              {[
                {
                  type: 'Low Stock',
                  message: 'Milk stock below reorder level',
                  severity: 'warning',
                },
                {
                  type: 'Expiry Alert',
                  message: '12 items expiring in 2 days',
                  severity: 'critical',
                },
                {
                  type: 'Price Update',
                  message: 'Dynamic pricing adjusted 3 items',
                  severity: 'info',
                },
                {
                  type: 'Fraud Detection',
                  message: 'Unusual refund pattern detected',
                  severity: 'critical',
                },
              ].map((alert, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg border ${
                    alert.severity === 'critical'
                      ? 'bg-red-500/10 border-red-400/30'
                      : alert.severity === 'warning'
                      ? 'bg-amber-500/10 border-amber-400/30'
                      : 'bg-green-500/10 border-green-400/30'
                  }`}
                >
                  <p className="font-semibold text-green-900 text-sm">
                    {alert.type}
                  </p>
                  <p className="text-xs text-green-700">{alert.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Dashboard
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
