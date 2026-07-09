'use client';

import { useState } from 'react';
import { useGroceryStore } from '@/stores/groceryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalPortal } from '@/components/grocery/ModalPortal';

export function CartDrawer() {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    isCartOpen,
    setCartOpen,
    setCheckoutOpen,
    appliedCoupon,
    discountPercentage,
    applyCoupon,
    removeCoupon,
    user,
    setProfileOpen
  } = useGroceryStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.currentPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercentage / 100));
  const deliveryCharge = subtotal >= 999 ? 0 : 70;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05); // 5% GST
  const finalTotal = subtotal - discountAmount + deliveryCharge + gstAmount;

  const freeDeliveryThreshold = 999;
  const progressPercent = Math.min((subtotal / freeDeliveryThreshold) * 100, 100);
  const amountToFreeDelivery = freeDeliveryThreshold - subtotal;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponError(false);
      setCouponInput('');
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 3000);
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    
    if (user.isLoggedIn) {
      setCheckoutOpen(true);
    } else {
      // Prompt profile sign in first so they have details
      setProfileOpen(true);
    }
  };

  return (
    <ModalPortal>
      <AnimatePresence>
        {isCartOpen && (
          <div key="cart-drawer" className="fixed inset-0 z-[200] overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          exit={{ opacity: 0 }}
          onClick={() => setCartOpen(false)}
          className="fixed inset-0 bg-black cursor-pointer"
        />

        {/* Drawer Panel */}
        <div className="fixed inset-y-0 right-0 max-w-md w-full flex">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="w-full bg-background border-l border-border-color shadow-2xl flex flex-col text-foreground"
          >
            {/* Header */}
            <div className="p-4 bg-primary text-white flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xl">🛍️</span>
                <span className="font-black tracking-wide uppercase text-sm">YOUR SHOPPING BAG</span>
                <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 rounded-md hover:bg-white/10 text-white cursor-pointer focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Empty Bag State */}
            {cart.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white">
                <span className="text-6xl animate-bounce">🛒</span>
                <h3 className="text-lg font-black text-primary mt-4 uppercase">Your Bag is Empty</h3>
                <p className="text-xs text-foreground/75 mt-1.5 max-w-xs leading-relaxed">
                  Looks like you haven't added any organic goodies to your cart yet. Explore our fresh categories and start healthy shopping!
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="mt-6 px-6 py-2.5 bg-primary hover:bg-accent text-white font-black text-xs rounded-lg shadow-md transition-all cursor-pointer"
                >
                  START SHOPPING NOW
                </button>
              </div>
            ) : (
              <>
                {/* 1. Free Shipping Tracker */}
                <div className="p-4 bg-surface border-b border-border-color/60">
                  <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                    <span className="text-primary font-black">
                      {subtotal >= freeDeliveryThreshold
                        ? '🎉 FREE DELIVERY UNLOCKED!'
                        : `Add ₹${amountToFreeDelivery} more for FREE delivery`}
                    </span>
                    <span className="text-foreground/70">Threshold: ₹999</span>
                  </div>
                  <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden shadow-inner">
                    <div
                      className={`h-full transition-all duration-500 rounded-full ${
                        subtotal >= freeDeliveryThreshold ? 'bg-success-color' : 'bg-accent'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>

                {/* 2. Scrollable Cart Items list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-surface">
                  {cart.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white border border-border-color rounded-xl p-3 flex gap-3 shadow-xs hover:border-primary/25 transition-all"
                    >
                      {/* Product Thumbnail Image */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden border border-border-color relative flex-shrink-0 bg-[#F4F7F2]">
                        <img 
                          src={item.product.imageUrl} 
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col min-w-0">
                        <h4 className="text-xs font-bold text-foreground truncate hover:underline cursor-pointer">
                          {item.product.name}
                        </h4>
                        <span className="text-[10px] text-foreground/60 font-semibold">{item.product.unit}</span>
                        <span className="text-xs font-bold text-primary mt-1.5">
                          ₹{item.product.currentPrice}
                        </span>
                      </div>

                      {/* Quantity Controller & Remove Bin */}
                      <div className="flex flex-col items-end justify-between gap-1.5">
                        {/* Remove Bin */}
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-foreground/60 hover:text-error-color p-0.5 rounded transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>

                        {/* Incrementers */}
                        <div className="flex items-center bg-primary/5 border border-primary/15 rounded-md h-7 overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            className="w-6 h-full hover:bg-primary/15 text-primary font-black text-xs cursor-pointer focus:outline-none"
                          >
                            -
                          </button>
                          <span className="px-2 text-[11px] font-bold text-primary">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                            className="w-6 h-full hover:bg-primary/15 text-primary font-black text-xs cursor-pointer focus:outline-none"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 3. Summary & Coupons Section */}
                <div className="p-4 bg-white border-t border-border-color shadow-lg space-y-4">
                  {/* Coupon entry */}
                  {!appliedCoupon ? (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter Promo Code (ROOTZAPP5)"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-border-color rounded-md text-xs uppercase outline-none focus:border-primary"
                      />
                      <button
                        type="submit"
                        className="px-4 py-1.5 bg-primary hover:bg-accent text-white font-bold text-xs rounded-md shadow-xs transition-all cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  ) : (
                    <div className="flex items-center justify-between bg-emerald-50 border border-emerald-250 rounded-lg p-2 text-xs">
                      <div className="flex items-center gap-1.5 text-success-color font-bold">
                        <span>✓</span>
                        <span>Coupon '{appliedCoupon}' Active (5% off)</span>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-error-color hover:underline font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-[10px] font-bold text-error-color uppercase">
                      ⚠ Invalid Promo Code. Try using "ROOTZAPP5".
                    </p>
                  )}

                  {/* Calculations */}
                  <div className="space-y-1.5 text-xs font-semibold text-foreground/80">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="text-primary font-bold">₹{subtotal}</span>
                    </div>

                    {appliedCoupon && (
                      <div className="flex justify-between text-success-color">
                        <span>Promo Discount</span>
                        <span>-₹{discountAmount}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Delivery Charges</span>
                      <span className="text-primary font-bold">
                        {deliveryCharge === 0 ? (
                          <span className="text-success-color font-bold">FREE</span>
                        ) : (
                          `₹${deliveryCharge}`
                        )}
                      </span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated GST (5%)</span>
                      <span className="text-primary font-bold">₹{gstAmount}</span>
                    </div>

                    <div className="flex justify-between text-sm font-black text-foreground border-t border-border-color pt-2 mt-1">
                      <span>Total Amount</span>
                      <span className="text-lg text-primary">₹{finalTotal}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full py-3 bg-primary hover:bg-accent text-white font-black text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-primary/10"
                  >
                    <span>PROCEED TO CHECKOUT</span>
                    <span>→</span>
                  </button>
                  
                  {!user.isLoggedIn && (
                    <p className="text-[10px] text-center font-bold text-foreground/60 uppercase">
                      * You will be prompted to login/register to complete order.
                    </p>
                  )}
                </div>
              </>
            )}
          </motion.div>
        </div>
          </div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}
