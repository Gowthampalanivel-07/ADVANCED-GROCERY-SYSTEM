'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DynamicPricingPanel } from '@/components/dashboard/DynamicPricingPanel';
import { InventoryPanel } from '@/components/dashboard/InventoryPanel';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    revenue: 42580,
    profit: 28.3,
    orders: 156,
    inventory: 285420,
  });

  const [activeTab, setActiveTab] = useState('overview');

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
            📊 Store Dashboard
          </h1>
          <p className="text-green-600 text-lg">
            Real-time overview of your store operations
          </p>
        </motion.div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          {[
            {
              label: "Today's Revenue",
              value: `₹${stats.revenue.toLocaleString()}`,
              change: '+12.5%',
              icon: '💰',
              color: 'from-green-500 to-emerald-500',
            },
            {
              label: 'Profit Margin',
              value: `${stats.profit}%`,
              change: '+2.1%',
              icon: '📈',
              color: 'from-blue-500 to-cyan-500',
            },
            {
              label: 'Active Orders',
              value: stats.orders.toString(),
              change: '+8.3%',
              icon: '🛒',
              color: 'from-purple-500 to-pink-500',
            },
            {
              label: 'Inventory Value',
              value: `₹${(stats.inventory / 1000).toFixed(0)}K`,
              change: '-3.2%',
              icon: '📦',
              color: 'from-orange-500 to-red-500',
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-green-600 text-sm font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold text-green-900 mt-2">{stat.value}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
              <div className={`inline-block px-3 py-1 bg-gradient-to-r ${stat.color} bg-opacity-20 rounded-full`}>
                <span className={`text-sm font-semibold ${stat.change.includes('+') ? 'text-emerald-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 overflow-x-auto">
          {['overview', 'pricing', 'inventory', 'analytics'].map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                  : 'bg-white text-green-700 border border-green-200 hover:border-green-400'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-2xl font-bold text-green-800 mb-4">📌 Quick Overview</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-semibold">Store Status</span>
                    <span className="px-4 py-2 bg-emerald-500 text-white rounded-full text-sm font-semibold">
                      ✓ Online & Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-semibold">Today's Sales</span>
                    <span className="text-2xl font-bold text-emerald-600">↑ 18%</span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-green-700 font-semibold">Items Sold</span>
                    <span className="text-2xl font-bold text-emerald-600">2,450</span>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pricing' && (
              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <DynamicPricingPanel />
              </motion.div>
            )}

            {activeTab === 'inventory' && (
              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <InventoryPanel />
              </motion.div>
            )}

            {activeTab === 'analytics' && (
              <motion.div
                className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-2xl font-bold text-green-800 mb-4">📊 Analytics</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-blue-700 font-semibold mb-2">Peak Hours</p>
                    <p className="text-blue-600">7 AM - 9 AM, 5 PM - 8 PM</p>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <p className="text-purple-700 font-semibold mb-2">Top Category</p>
                    <p className="text-purple-600">Dairy Products (32% of sales)</p>
                  </div>
                  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <p className="text-orange-700 font-semibold mb-2">Customer Traffic</p>
                    <p className="text-orange-600">~1,850 visitors today</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Alerts */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-green-800 mb-4">🔔 Alerts</h3>
              <div className="space-y-3">
                {[
                  { msg: 'New order received', color: 'blue' },
                  { msg: 'Low milk stock (25 units)', color: 'red' },
                  { msg: 'Pricing adjusted for 3 items', color: 'green' },
                ].map((alert, i) => (
                  <motion.div
                    key={i}
                    className={`p-3 rounded-lg border border-${alert.color}-200 bg-${alert.color}-50`}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <p className={`text-sm text-${alert.color}-700 font-semibold`}>{alert.msg}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-lg font-bold text-green-800 mb-4">⚡ Quick Actions</h3>
              <div className="space-y-2">
                {['Create Promotion', 'Generate Report', 'Manage Staff', 'View Analytics'].map((action, i) => (
                  <motion.button
                    key={i}
                    className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
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
