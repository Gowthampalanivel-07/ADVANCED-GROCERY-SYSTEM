'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const revenueData = [
  { name: 'Mon', revenue: 4000, profit: 2400 },
  { name: 'Tue', revenue: 3000, profit: 1398 },
  { name: 'Wed', revenue: 2800, profit: 9800 },
  { name: 'Thu', revenue: 2780, profit: 3908 },
  { name: 'Fri', revenue: 1890, profit: 4800 },
  { name: 'Sat', revenue: 2390, profit: 3800 },
  { name: 'Sun', revenue: 2490, profit: 4300 },
];

const categoryData = [
  { name: 'Dairy', value: 2500, color: '#2ECC71' },
  { name: 'Produce', value: 1800, color: '#27AE60' },
  { name: 'Bakery', value: 1200, color: '#F39C12' },
  { name: 'Frozen', value: 900, color: '#16A085' },
];

const COLORS = ['#2ECC71', '#27AE60', '#F39C12', '#16A085'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-2">
            📊 Analytics & Insights
          </h1>
          <p className="text-green-600 text-lg">
            Deep dive into your store performance metrics
          </p>
        </motion.div>

        {/* Time Range Selector */}
        <div className="flex gap-2 sm:gap-4 mb-8 overflow-x-auto pb-2">
          {['day', 'week', 'month', 'year'].map((range) => (
            <motion.button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                timeRange === range
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-green-700 border border-green-200 hover:border-green-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">💹 Revenue Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(46, 204, 113, 0.1)" />
                <XAxis stroke="rgba(46, 204, 113, 0.4)" />
                <YAxis stroke="rgba(46, 204, 113, 0.4)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(248, 249, 250, 0.98)',
                    border: '1px solid rgba(46, 204, 113, 0.6)',
                    color: '#2C3E50',
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="revenue" stroke="#2ECC71" strokeWidth={2} />
                <Line type="monotone" dataKey="profit" stroke="#27AE60" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Category Distribution */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">🥧 Sales by Category</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ₹${value}K`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={(entry) => setSelectedCategory(entry.name)}
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                      opacity={selectedCategory === null || selectedCategory === entry.name ? 1 : 0.5}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `₹${value}K`} />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Top Products */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">⭐ Top Products</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={[
                { name: 'Milk', sales: 450, rating: 4.8 },
                { name: 'Bread', sales: 380, rating: 4.6 },
                { name: 'Eggs', sales: 320, rating: 4.9 },
                { name: 'Cheese', sales: 290, rating: 4.7 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(46, 204, 113, 0.1)" />
                <XAxis stroke="rgba(46, 204, 113, 0.4)" />
                <YAxis stroke="rgba(46, 204, 113, 0.4)" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(248, 249, 250, 0.98)', border: '1px solid rgba(46, 204, 113, 0.6)' }} />
                <Bar dataKey="sales" fill="#2ECC71" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Key Metrics */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">📈 Key Metrics</h2>
            <div className="space-y-4">
              {[
                { label: 'Avg Order Value', value: '₹450', change: '+8%' },
                { label: 'Customer Satisfaction', value: '4.7/5', change: '+0.2' },
                { label: 'Repeat Purchase Rate', value: '68%', change: '+5%' },
                { label: 'Inventory Turnover', value: '4.2x', change: '+1.1x' },
              ].map((metric, i) => (
                <motion.div
                  key={i}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-all cursor-pointer"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div>
                    <p className="text-green-700 font-semibold text-sm">{metric.label}</p>
                    <p className="text-2xl font-bold text-green-900">{metric.value}</p>
                  </div>
                  <span className={`text-lg font-bold ${metric.change.includes('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                    {metric.change}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Insights Section */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-green-800 mb-6">💡 AI Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: 'Peak Hours Identified',
                desc: 'Sales spike 7-9 AM and 5-8 PM. Consider extra staff.',
                icon: '⏰',
                color: 'blue',
              },
              {
                title: 'Cross-Selling Opportunity',
                desc: 'Milk + Bread combos sell 40% more when placed together.',
                icon: '🔗',
                color: 'green',
              },
              {
                title: 'Inventory Optimization',
                desc: 'Reduce Frozen goods stock by 15%, increase Dairy by 20%.',
                icon: '📦',
                color: 'purple',
              },
              {
                title: 'Dynamic Pricing Opportunity',
                desc: 'Increase prices on premium products during peak hours.',
                icon: '💰',
                color: 'orange',
              },
            ].map((insight, i) => (
              <motion.div
                key={i}
                className={`p-4 rounded-lg border-2 bg-${insight.color}-50 border-${insight.color}-200`}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl">{insight.icon}</span>
                  <div className="flex-1">
                    <h3 className={`font-bold text-${insight.color}-900 mb-1`}>{insight.title}</h3>
                    <p className={`text-sm text-${insight.color}-700`}>{insight.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
