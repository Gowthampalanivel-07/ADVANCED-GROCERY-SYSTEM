'use client';

import { useState } from 'react';
import { useGroceryStore } from '@/stores/groceryStore';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ModalPortal } from '@/components/grocery/ModalPortal';

export function UserAccountModal() {
  const {
    isProfileOpen,
    setProfileOpen,
    user,
    orders,
    loginUser,
    registerUser,
    logoutUser,
    setCheckoutOpen
  } = useGroceryStore();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    const loggedIn = loginUser(emailInput);
    if (loggedIn) {
      setEmailInput('');
      // If profile was opened from checking out, proceed to checkout
      const cart = useGroceryStore.getState().cart;
      if (cart.length > 0) {
        setProfileOpen(false);
        setCheckoutOpen(true);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPhone) {
      alert('Please complete all registration fields.');
      return;
    }
    registerUser(regName, regEmail, regPhone);
    setRegName('');
    setRegEmail('');
    setRegPhone('');
    
    // If profile was opened from checking out, proceed to checkout
    const cart = useGroceryStore.getState().cart;
    if (cart.length > 0) {
      setProfileOpen(false);
      setCheckoutOpen(true);
    }
  };

  return (
    <ModalPortal>
      <AnimatePresence>
        {isProfileOpen && (
          <div key="user-account-modal" className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setProfileOpen(false)}
              className="fixed inset-0 bg-black cursor-pointer"
            />

            {/* Modal content sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-background border border-border-color rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col relative z-10 text-foreground"
        >
          {/* Close button */}
          <button
            onClick={() => setProfileOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/85 hover:bg-white text-primary hover:scale-105 active:scale-95 transition-all shadow-sm z-20 cursor-pointer focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-4 bg-primary text-white flex items-center gap-2 shadow-sm font-black text-sm uppercase tracking-wide">
            <span>👤 CUSTOMER ACCOUNT</span>
          </div>

          <div className="overflow-y-auto p-6 flex-1 bg-surface">
            {/* LOUGED OUT VIEW */}
            {!user.isLoggedIn ? (
              <div className="space-y-6">
                {/* Form Tabs */}
                <div className="flex border-b border-border-color/60">
                  <button
                    onClick={() => setActiveTab('login')}
                    className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeTab === 'login'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-foreground/50 hover:text-foreground'
                    }`}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setActiveTab('register')}
                    className={`flex-1 py-2.5 text-xs font-black uppercase tracking-wider border-b-2 transition-all cursor-pointer ${
                      activeTab === 'register'
                        ? 'border-primary text-primary'
                        : 'border-transparent text-foreground/50 hover:text-foreground'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Login Tab */}
                {activeTab === 'login' && (
                  <form onSubmit={handleLoginSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. gowtham@example.com"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary hover:bg-accent text-white font-black text-xs rounded-lg transition-all shadow-sm cursor-pointer border border-primary/10"
                    >
                      LOGIN
                    </button>

                    <div className="text-center pt-2">
                      <p className="text-[10px] text-foreground/60 font-semibold uppercase">
                        Quick Demo: Enter any email with '@' to login instantly.
                      </p>
                    </div>
                  </form>
                )}

                {/* Register Tab */}
                {activeTab === 'register' && (
                  <form onSubmit={handleRegisterSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Gowtham Palanivel"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. gowtham@example.com"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98765 43210"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-primary hover:bg-accent text-white font-black text-xs rounded-lg transition-all shadow-sm cursor-pointer border border-primary/10"
                    >
                      CREATE ACCOUNT & JOIN
                    </button>
                  </form>
                )}
              </div>
            ) : (
              /* LOGGED IN PROFILE & ORDERS HISTORY VIEW */
              <div className="space-y-6">
                
                {/* 1. Account Details Overview */}
                <div className="p-4 bg-white border border-border-color rounded-2xl shadow-xs space-y-2 relative">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wide">
                    Profile Summary
                  </h4>
                  <div className="text-xs space-y-1.5 font-medium">
                    <p className="font-bold text-foreground text-sm">{user.name}</p>
                    <p className="text-foreground/80">📧 {user.email}</p>
                    <p className="text-foreground/80">📞 {user.phone}</p>
                    <p className="text-foreground/80">📍 {user.addresses[0]}</p>
                  </div>
                  
                  {/* Logout */}
                  <button
                    onClick={logoutUser}
                    className="absolute top-4 right-4 text-[10px] font-bold text-error-color hover:underline cursor-pointer"
                  >
                    Logout
                  </button>
                </div>

                {/* 2. Admin switch buttons for reviewer */}
                <div className="p-3 bg-accent/10 border border-accent/25 rounded-[18px] space-y-2">
                  <h5 className="text-[10px] font-black uppercase text-primary tracking-wider">
                    🛠️ Developer / Reviewer Controls
                  </h5>
                  <div className="grid grid-cols-3 gap-2">
                    <Link
                      href="/admin"
                      onClick={() => setProfileOpen(false)}
                      className="py-2 text-center bg-primary hover:bg-accent text-white font-bold text-[9px] sm:text-[10px] rounded-xl uppercase shadow-sm transition-all magnetic-btn"
                    >
                      Admin
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setProfileOpen(false)}
                      className="py-2 text-center bg-primary hover:bg-accent text-white font-bold text-[9px] sm:text-[10px] rounded-xl uppercase shadow-sm transition-all magnetic-btn"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/analytics"
                      onClick={() => setProfileOpen(false)}
                      className="py-2 text-center bg-primary hover:bg-accent text-white font-bold text-[9px] sm:text-[10px] rounded-xl uppercase shadow-sm transition-all magnetic-btn"
                    >
                      Analytics
                    </Link>
                  </div>
                </div>

                {/* 3. Orders History */}
                <div className="space-y-3">
                  <h4 className="text-xs font-black text-primary uppercase tracking-wide">
                    Order History ({orders.length})
                  </h4>

                  {orders.length === 0 ? (
                    <div className="text-center py-8 bg-white border border-border-color rounded-xl">
                      <span className="text-3xl">📦</span>
                      <p className="text-xs font-semibold text-foreground/70 mt-2">
                        No orders placed yet.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="bg-white border border-border-color rounded-xl p-3 shadow-xs space-y-2 hover:border-primary/20 transition-all text-xs"
                        >
                          <div className="flex justify-between items-center border-b border-border-color pb-2">
                            <span className="font-bold text-primary">{order.id}</span>
                            <span className="font-bold text-success-color bg-success-color/5 px-2 py-0.5 rounded text-[10px] border border-success-color/10">
                              {order.status}
                            </span>
                          </div>
                          
                          {/* Item Snippet */}
                          <div className="text-[11px] text-foreground/80 space-y-1">
                            {order.items.map((item) => (
                              <div key={item.product.id} className="flex justify-between">
                                <span className="truncate max-w-[200px]">
                                  {item.product.name} (x{item.quantity})
                                </span>
                                <span>₹{item.product.currentPrice * item.quantity}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center border-t border-border-color pt-2 mt-1 text-[11px] font-bold text-foreground">
                            <span>Tracking: <span className="font-mono text-primary">{order.trackingNumber}</span></span>
                            <span>Total Paid: ₹{order.total}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

              </div>
            )}
          </div>
        </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}
