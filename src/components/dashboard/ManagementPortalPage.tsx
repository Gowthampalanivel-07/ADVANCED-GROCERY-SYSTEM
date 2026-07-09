'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart
} from 'recharts';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';
import { DynamicPricingPanel } from '@/components/dashboard/DynamicPricingPanel';
import { InventoryPanel } from '@/components/dashboard/InventoryPanel';
import { UnifiedPortal } from '@/components/dashboard/UnifiedPortal';

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
  { name: 'Dairy', value: 2500 },
  { name: 'Produce', value: 1800 },
  { name: 'Bakery', value: 1200 },
  { name: 'Frozen', value: 900 },
];

const CHART_COLORS = ['#1E4D2B', '#2E7D32', '#E6A817', '#A8CFA2'];

const TABS = [
  { id: 'overview', label: 'Overview', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
  { id: 'pricing', label: 'Pricing', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'inventory', label: 'Inventory', icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' },
  { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { id: 'admin', label: 'Admin', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
] as const;

type Tab = (typeof TABS)[number]['id'];

const ROUTE_TAB: Record<string, Tab> = {
  '/dashboard': 'overview',
  '/analytics': 'analytics',
  '/admin': 'admin',
};

const ORDER_PIPELINE = [
  { stage: 'Placed', count: 42, color: 'bg-primary' },
  { stage: 'Packed', count: 28, color: 'bg-secondary' },
  { stage: 'Shipped', count: 56, color: 'bg-accent' },
  { stage: 'Delivered', count: 30, color: 'bg-emerald-600' },
];

const RECENT_ORDERS = [
  { id: 'RTZ-482910', customer: 'Gowtham P.', items: 5, total: 2840, status: 'Packed' },
  { id: 'RTZ-482905', customer: 'Priya S.', items: 3, total: 1299, status: 'Shipped' },
  { id: 'RTZ-482898', customer: 'Arjun M.', items: 8, total: 4520, status: 'Delivered' },
  { id: 'RTZ-482891', customer: 'Meera K.', items: 2, total: 890, status: 'Placed' },
];

const ACTIVITY_FEED = [
  { time: '2m ago', event: 'New order RTZ-482910 placed', type: 'order' },
  { time: '8m ago', event: 'Milk stock dropped below threshold', type: 'alert' },
  { time: '15m ago', event: 'Dynamic price updated for 3 SKUs', type: 'pricing' },
  { time: '32m ago', event: 'Daily sales report generated', type: 'report' },
];

function useCounter(end: number, duration = 1600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function TabIcon({ d }: { d: string }) {
  return (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.75" d={d} />
    </svg>
  );
}

function SectionHeader({ title, action }: { title: string; action?: string }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-lg font-black text-foreground font-heading">{title}</h2>
      {action && (
        <button className="text-xs font-bold text-primary hover:text-secondary transition-colors font-sans">{action}</button>
      )}
    </div>
  );
}

export default function ManagementPortalPage() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<Tab>(ROUTE_TAB[pathname] ?? 'overview');
  const [timeRange, setTimeRange] = useState('week');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [countersStarted, setCountersStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const revenue = useCounter(42580, 1800, countersStarted);
  const profit = useCounter(283, 1600, countersStarted);
  const orders = useCounter(156, 1400, countersStarted);
  const inventory = useCounter(285, 2000, countersStarted);
  const avgOrder = useCounter(450, 1400, countersStarted);
  const satisfaction = useCounter(47, 1600, countersStarted);
  const repeatRate = useCounter(68, 1800, countersStarted);
  const turnover = useCounter(42, 2000, countersStarted);

  useEffect(() => {
    setActiveTab(ROUTE_TAB[pathname] ?? 'overview');
  }, [pathname]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target === statsRef.current) {
            setCountersStarted(true);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  const kpiCards = [
    { label: "Today's Revenue", value: countersStarted ? `₹${revenue.toLocaleString('en-IN')}` : '—', change: '+12.5%', positive: true, accent: 'border-l-primary', spark: [40, 55, 45, 70, 60, 85, 75] },
    { label: 'Profit Margin', value: countersStarted ? `${(profit / 10).toFixed(1)}%` : '—', change: '+2.1%', positive: true, accent: 'border-l-secondary', spark: [30, 45, 50, 48, 62, 58, 70] },
    { label: 'Active Orders', value: countersStarted ? orders.toString() : '—', change: '+8.3%', positive: true, accent: 'border-l-accent', spark: [50, 40, 65, 55, 80, 70, 90] },
    { label: 'Inventory Value', value: countersStarted ? `₹${inventory}K` : '—', change: '-3.2%', positive: false, accent: 'border-l-rose-400', spark: [70, 65, 60, 55, 50, 48, 45] },
  ];

  const analyticsMetrics = [
    { label: 'Avg Order Value', value: countersStarted ? `₹${avgOrder}` : '—', change: '+8%', positive: true },
    { label: 'Customer Satisfaction', value: countersStarted ? `${(satisfaction / 10).toFixed(1)}/5` : '—', change: '+0.2', positive: true },
    { label: 'Repeat Purchase Rate', value: countersStarted ? `${repeatRate}%` : '—', change: '+5%', positive: true },
    { label: 'Inventory Turnover', value: countersStarted ? `${(turnover / 10).toFixed(1)}x` : '—', change: '+1.1x', positive: true },
  ];

  const quickActions = [
    { label: 'New Promo', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7', color: 'bg-primary/10 text-primary' },
    { label: 'Reports', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'bg-secondary/10 text-secondary' },
    { label: 'Staff', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: 'bg-accent/15 text-accent-hover' },
    { label: 'Insights', icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z', color: 'bg-primary/10 text-primary' },
  ];

  return (
    <UnifiedPortal
      title="Operations Portal"
      subtitle="Store management & analytics"
      revealDeps={[activeTab]}
    >
      <div className="space-y-6">
        {/* KPI strip */}
        <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {kpiCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`glow-card rounded-2xl p-5 border-l-4 ${stat.accent} group`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-light-text text-[11px] font-bold uppercase tracking-wider font-sans">{stat.label}</p>
                  <p className="text-2xl sm:text-3xl font-black text-foreground mt-1 font-heading">{stat.value}</p>
                  <span className={`inline-flex mt-2 text-[11px] font-bold px-2 py-0.5 rounded-md font-sans ${stat.positive ? 'bg-primary/10 text-primary' : 'bg-rose-500/10 text-rose-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="flex items-end gap-0.5 h-10">
                  {stat.spark.map((h, j) => (
                    <div
                      key={j}
                      className={`w-1.5 rounded-full transition-all ${stat.positive ? 'bg-primary/30 group-hover:bg-primary/60' : 'bg-rose-300 group-hover:bg-rose-400'}`}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab bar — underline style */}
        <div className="border-b border-border-color">
          <div className="flex gap-1 overflow-x-auto scrollbar-none -mb-px">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap transition-colors cursor-pointer font-sans ${
                  activeTab === tab.id ? 'text-primary' : 'text-light-text hover:text-body-text'
                }`}
              >
                <TabIcon d={tab.icon} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="portalTabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
          {/* Main panel */}
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    {/* Order pipeline */}
                    <div className="glow-card rounded-2xl p-6">
                      <SectionHeader title="Order Pipeline" action="View all →" />
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {ORDER_PIPELINE.map((stage, i) => (
                          <motion.div
                            key={stage.stage}
                            className="relative overflow-hidden rounded-xl bg-bg-secondary border border-border-color p-4 text-center"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.08 }}
                          >
                            <div className={`absolute top-0 left-0 right-0 h-1 ${stage.color}`} />
                            <p className="text-2xl font-black text-foreground font-heading">{stage.count}</p>
                            <p className="text-xs font-bold text-light-text mt-1 font-sans">{stage.stage}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Mini revenue chart + recent orders */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Revenue This Week" />
                        <ResponsiveContainer width="100%" height={200}>
                          <AreaChart data={revenueData}>
                            <defs>
                              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#1E4D2B" stopOpacity={0.3} />
                                <stop offset="100%" stopColor="#1E4D2B" stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,77,43,0.06)" />
                            <XAxis dataKey="name" stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12, border: '1px solid rgba(30,77,43,0.1)' }} />
                            <Area type="monotone" dataKey="revenue" stroke="#1E4D2B" strokeWidth={2.5} fill="url(#revGrad)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Recent Orders" action="See all →" />
                        <div className="space-y-2">
                          {RECENT_ORDERS.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary border border-border-color hover:border-primary/15 transition-all">
                              <div className="min-w-0">
                                <p className="text-sm font-bold text-foreground font-sans truncate">{order.id}</p>
                                <p className="text-xs text-light-text font-sans">{order.customer} · {order.items} items</p>
                              </div>
                              <div className="text-right shrink-0 ml-3">
                                <p className="text-sm font-black text-primary font-sans">₹{order.total.toLocaleString('en-IN')}</p>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{order.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Category performance */}
                    <div className="glow-card rounded-2xl p-6">
                      <SectionHeader title="Category Performance" />
                      <div className="space-y-4">
                        {[
                          { name: 'Dairy & Ghee', pct: 32, revenue: '₹4.2L' },
                          { name: 'Fresh Produce', pct: 24, revenue: '₹3.1L' },
                          { name: 'Ancient Grains', pct: 18, revenue: '₹2.4L' },
                          { name: 'Ayurveda', pct: 14, revenue: '₹1.8L' },
                        ].map((cat) => (
                          <div key={cat.name}>
                            <div className="flex justify-between text-sm mb-1.5 font-sans">
                              <span className="font-bold text-foreground">{cat.name}</span>
                              <span className="font-bold text-primary">{cat.revenue}</span>
                            </div>
                            <div className="h-2 bg-bg-secondary rounded-full overflow-hidden border border-border-color">
                              <motion.div
                                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${cat.pct}%` }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'pricing' && (
                  <div className="glow-card rounded-2xl p-6">
                    <DynamicPricingPanel />
                  </div>
                )}

                {activeTab === 'inventory' && (
                  <div className="glow-card rounded-2xl p-6">
                    <InventoryPanel />
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-6">
                    <div className="flex gap-2 overflow-x-auto scrollbar-none">
                      {['day', 'week', 'month', 'year'].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-4 py-2 rounded-lg text-xs font-bold capitalize transition-all font-sans ${
                            timeRange === range ? 'bg-primary text-white' : 'bg-bg-secondary text-body-text hover:bg-primary/5'
                          }`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Revenue Trend" />
                        <ResponsiveContainer width="100%" height={260}>
                          <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,77,43,0.06)" />
                            <XAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                            <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                            <Line type="monotone" dataKey="revenue" stroke="#1E4D2B" strokeWidth={2.5} dot={false} />
                            <Line type="monotone" dataKey="profit" stroke="#E6A817" strokeWidth={2.5} dot={false} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Sales by Category" />
                        <ResponsiveContainer width="100%" height={260}>
                          <PieChart>
                            <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value" onClick={(e) => setSelectedCategory(e.name)}>
                              {categoryData.map((entry, index) => (
                                <Cell key={entry.name} fill={CHART_COLORS[index % CHART_COLORS.length]} opacity={selectedCategory === null || selectedCategory === entry.name ? 1 : 0.35} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(v) => `₹${v}K`} contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Top Products" />
                        <ResponsiveContainer width="100%" height={260}>
                          <BarChart data={[{ name: 'Milk', sales: 450 }, { name: 'Bread', sales: 380 }, { name: 'Eggs', sales: 320 }, { name: 'Ghee', sales: 290 }]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(30,77,43,0.06)" />
                            <XAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#94A3B8" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ borderRadius: 12, fontSize: 12 }} />
                            <Bar dataKey="sales" fill="#1E4D2B" radius={[6, 6, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Key Metrics" />
                        <div className="space-y-2">
                          {analyticsMetrics.map((m) => (
                            <div key={m.label} className="flex items-center justify-between p-3 rounded-xl bg-bg-secondary border border-border-color">
                              <div>
                                <p className="text-[11px] font-bold text-light-text uppercase font-sans">{m.label}</p>
                                <p className="text-xl font-black text-foreground font-heading">{m.value}</p>
                              </div>
                              <span className="text-xs font-bold px-2 py-1 rounded-md bg-primary/10 text-primary">{m.change}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="glow-card rounded-2xl p-6">
                      <SectionHeader title="AI Insights" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          { title: 'Peak Hours', desc: '7–9 AM & 5–8 PM — add staff during rush.', tag: 'Operations' },
                          { title: 'Cross-Sell', desc: 'Milk + Bread combos up 40% when paired.', tag: 'Merchandising' },
                          { title: 'Stock Alert', desc: 'Reduce Frozen 15%, increase Dairy 20%.', tag: 'Inventory' },
                          { title: 'Pricing', desc: 'Premium items +8% margin at peak hours.', tag: 'Revenue' },
                        ].map((insight) => (
                          <div key={insight.title} className="p-4 rounded-xl border border-border-color bg-bg-secondary hover:border-primary/15 transition-all">
                            <span className="text-[10px] font-bold uppercase tracking-wide text-primary font-sans">{insight.tag}</span>
                            <h3 className="font-black text-sm text-foreground mt-1 font-heading">{insight.title}</h3>
                            <p className="text-xs text-body-text mt-1 font-sans leading-relaxed">{insight.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'admin' && (
                  <div className="space-y-6">
                    <div className="glow-card rounded-2xl p-6">
                      <AdminDashboard />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Settings" />
                        <div className="space-y-2">
                          {['Store Configuration', 'User Management', 'Payment Settings', 'API Access'].map((item) => (
                            <button key={item} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-bg-secondary border border-border-color hover:border-primary/15 hover:bg-primary/5 transition-all text-left group">
                              <span className="text-sm font-bold text-foreground font-sans">{item}</span>
                              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="glow-card rounded-2xl p-6">
                        <SectionHeader title="Reports" />
                        <div className="space-y-2">
                          {[
                            { label: 'Daily Sales', meta: 'Today' },
                            { label: 'Monthly Performance', meta: 'This month' },
                            { label: 'Inventory Snapshot', meta: 'Real-time' },
                            { label: 'Customer Analytics', meta: 'Last 7 days' },
                          ].map((r) => (
                            <button key={r.label} className="w-full flex items-center justify-between p-3.5 rounded-xl bg-primary/5 border border-primary/10 hover:bg-primary/10 transition-all text-left">
                              <div>
                                <p className="text-sm font-bold text-primary font-sans">{r.label}</p>
                                <p className="text-xs text-primary/60 font-sans">{r.meta}</p>
                              </div>
                              <svg className="w-5 h-5 text-primary/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                              </svg>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right command panel */}
          <div className="space-y-4">
            <div className="glow-card rounded-2xl p-5">
              <SectionHeader title="Quick Actions" />
              <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action) => (
                  <button
                    key={action.label}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl ${action.color} hover:scale-[1.03] transition-transform magnetic-btn`}
                  >
                    <TabIcon d={action.icon} />
                    <span className="text-[11px] font-bold font-sans">{action.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="glow-card rounded-2xl p-5">
              <SectionHeader title="Live Activity" />
              <div className="space-y-3">
                {ACTIVITY_FEED.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex gap-3"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                  >
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                      item.type === 'alert' ? 'bg-accent' : item.type === 'order' ? 'bg-primary' : 'bg-secondary'
                    }`} />
                    <div>
                      <p className="text-xs font-semibold text-foreground font-sans leading-snug">{item.event}</p>
                      <p className="text-[10px] text-light-text font-sans mt-0.5">{item.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="glow-card rounded-2xl p-5">
              <SectionHeader title="Alerts" />
              <div className="space-y-2">
                {[
                  { msg: 'New order received', level: 'info' },
                  { msg: 'Low milk stock — 25 units', level: 'warn' },
                  { msg: '3 prices auto-adjusted', level: 'ok' },
                ].map((alert) => (
                  <div
                    key={alert.msg}
                    className={`p-3 rounded-xl text-xs font-bold font-sans ${
                      alert.level === 'warn' ? 'bg-accent/10 text-accent-hover border border-accent/20'
                      : alert.level === 'ok' ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/15'
                      : 'bg-primary/5 text-primary border border-primary/10'
                    }`}
                  >
                    {alert.msg}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </UnifiedPortal>
  );
}
