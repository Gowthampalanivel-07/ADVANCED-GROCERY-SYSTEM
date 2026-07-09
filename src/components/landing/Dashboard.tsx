'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { motion } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';

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
  { name: 'Entrance', value: 100, color: '#1E4D2B' },
  { name: 'Dairy', value: 85, color: '#2E7D32' },
  { name: 'Produce', value: 72, color: '#A8CFA2' },
  { name: 'Checkout', value: 65, color: '#E6A817' },
];

const topProducts = [
  { name: 'Milk', sales: 450, margin: 22 },
  { name: 'Bread', sales: 380, margin: 35 },
  { name: 'Eggs', sales: 320, margin: 18 },
  { name: 'Cheese', sales: 290, margin: 42 },
];

const COLORS = ['#1E4D2B', '#2E7D32', '#E6A817', '#A8CFA2'];

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
      className="w-full bg-mesh-gradient py-20 px-4 relative overflow-hidden"
    >
      {/* Premium Gradient Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/10 to-transparent rounded-full blur-3xl" />
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
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-2 font-heading tracking-tight">
            Live Dashboard
          </h2>
          <p className="text-lg bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary/80 font-bold font-sans">
            Real-time analytics and insights
          </p>
        </motion.div>

        {/* Top Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              label: "Today's Revenue",
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
              className="metric-card glow-card bento-card rounded-[24px] p-6 hover:shadow-premium cursor-default"
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-light-text text-xs font-bold uppercase tracking-wider mb-2 font-sans">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-black text-foreground mb-3 font-sans tracking-tight">
                    {metric.value}
                  </p>
                  <span
                    className={`text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full ${
                      metric.change.includes('+')
                        ? 'bg-primary/10 text-primary'
                        : 'bg-accent/15 text-accent-hover'
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>
                <span className="text-3xl bg-bg-secondary p-2 rounded-xl border border-border-color">
                  {metric.icon}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Revenue Chart */}
          <motion.div
            className="chart-container glow-card rounded-[24px] p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-black text-foreground mb-4 font-heading">
              Revenue & Profit Trend
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 77, 43, 0.06)" />
                <XAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid rgba(30, 77, 43, 0.10)',
                    borderRadius: '14px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  }}
                />
                <Legend iconType="circle" wrapperStyle={{ fontSize: '12px' }} />
                <Line type="monotone" dataKey="revenue" name="Revenue" stroke="#1E4D2B" strokeWidth={3} dot={{ fill: '#1E4D2B', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="profit" name="Profit" stroke="#E6A817" strokeWidth={3} dot={{ fill: '#E6A817', strokeWidth: 0, r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Products */}
          <motion.div
            className="chart-container glow-card rounded-[24px] p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-black text-foreground mb-4 font-heading">
              Top Selling Products
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={topProducts}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(30, 77, 43, 0.06)" />
                <XAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} dataKey="name" />
                <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid rgba(30, 77, 43, 0.10)',
                    borderRadius: '14px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  }}
                />
                <Bar dataKey="sales" name="Sales Unit" fill="#1E4D2B" radius={[8, 8, 0, 0]} />
                <Bar dataKey="margin" name="Margin %" fill="#E6A817" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Heatmap */}
          <motion.div
            className="chart-container glow-card rounded-[24px] p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-black text-foreground mb-4 font-heading">
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
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.96)',
                    border: '1px solid rgba(30, 77, 43, 0.10)',
                    borderRadius: '14px',
                    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.08)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Alerts */}
          <motion.div
            className="chart-container glow-card rounded-[24px] p-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-black text-foreground mb-4 font-heading">
              Smart Alerts
            </h3>
            <div className="space-y-3 font-sans">
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
                  className={`p-3.5 rounded-xl border ${
                    alert.severity === 'critical'
                      ? 'bg-rose-500/10 border-rose-500/20 text-rose-700'
                      : alert.severity === 'warning'
                      ? 'bg-accent/15 border-accent/20 text-accent-hover'
                      : 'bg-primary/6 border-primary/15 text-primary'
                  }`}
                >
                  <p className="font-bold text-sm">
                    {alert.type}
                  </p>
                  <p className="text-xs text-body-text mt-0.5 font-medium">{alert.message}</p>
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
            className="px-8 py-4 bg-primary hover:bg-secondary text-white font-bold rounded-2xl shadow-glow-green hover:shadow-premium transition-all cursor-pointer magnetic-btn border border-primary/10"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
          >
            View Full Dashboard
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
