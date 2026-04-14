'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

export default function AdminPage() {
  const [selectedMetric, setSelectedMetric] = useState('revenue');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-green-800 mb-2">
            🛃 Admin Panel
          </h1>
          <p className="text-green-600 text-lg">
            Advanced store management and configuration
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Stores', value: '12', icon: '🏪' },
            { label: 'Active Users', value: '2,450', icon: '👥' },
            { label: 'Revenue (This Month)', value: '₹12.5M', icon: '💸' },
            { label: 'System Health', value: '99.8%', icon: '🔧' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6 hover:shadow-lg transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedMetric(stat.label.toLowerCase())}
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-green-600 text-sm font-semibold">{stat.label}</p>
              <p className="text-3xl font-bold text-green-900 mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Admin Dashboard */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AdminDashboard />
        </motion.div>

        {/* Admin Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">⚙️ Settings</h2>
            <div className="space-y-4">
              {[
                { label: 'Store Configuration', desc: 'Manage store details' },
                { label: 'User Management', desc: 'Add/remove staff' },
                { label: 'Payment Settings', desc: 'Configure payment methods' },
                { label: 'API Access', desc: 'Manage API keys' },
              ].map((item, i) => (
                <motion.button
                  key={i}
                  className="w-full p-4 text-left bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg transition-all"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="font-semibold text-green-800">{item.label}</p>
                  <p className="text-sm text-green-600">{item.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Reports */}
          <motion.div
            className="bg-white/80 backdrop-blur-sm border border-green-200 rounded-xl p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-green-800 mb-6">📋 Reports</h2>
            <div className="space-y-4">
              {[
                { label: 'Daily Sales Report', date: 'Today' },
                { label: 'Monthly Performance', date: 'This Month' },
                { label: 'Inventory Report', date: 'Real-time' },
                { label: 'Customer Analytics', date: 'Last 7 days' },
              ].map((report, i) => (
                <motion.button
                  key={i}
                  className="w-full p-4 text-left bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-all"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-blue-900">{report.label}</p>
                      <p className="text-sm text-blue-600">{report.date}</p>
                    </div>
                    <span className="text-xl">📊</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
