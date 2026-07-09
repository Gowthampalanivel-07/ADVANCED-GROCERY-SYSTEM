'use client';

import { useState } from 'react';
import { useGroceryStore, Order } from '@/stores/groceryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalPortal } from '@/components/grocery/ModalPortal';

export function CheckoutModal() {
  const {
    isCheckoutOpen,
    setCheckoutOpen,
    cart,
    discountPercentage,
    appliedCoupon,
    placeOrder,
    user
  } = useGroceryStore();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: user.name || 'Gowtham Palanivel',
    street: user.addresses[0] || '12, Golf Links Rd',
    city: 'New Delhi',
    state: 'Delhi',
    zipCode: '110003',
    phone: user.phone || '+91 98765 43210',
  });

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.product.currentPrice * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (discountPercentage / 100));
  const deliveryCharge = subtotal >= 999 ? 0 : 70;
  const gstAmount = Math.round((subtotal - discountAmount) * 0.05);
  const finalTotal = subtotal - discountAmount + deliveryCharge + gstAmount;

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.street || !formData.city || !formData.zipCode || !formData.phone) {
      alert('Please fill out all address fields.');
      return;
    }
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'card' && (!cardNumber || !cardExpiry || !cardCvv)) {
      alert('Please complete credit/debit card details.');
      return;
    }

    setIsSubmitting(true);

    // Simulate database write / checkout api delay
    setTimeout(() => {
      const order = placeOrder(formData, paymentMethod === 'cod' ? 'Cash on Delivery' : paymentMethod === 'upi' ? 'UPI / NetBanking' : 'Credit/Debit Card');
      if (order) {
        setPlacedOrder(order);
        setStep('success');
      } else {
        alert('Failed to place order. Your cart might be empty.');
        setCheckoutOpen(false);
      }
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <ModalPortal>
      <AnimatePresence>
        {isCheckoutOpen && (
          <div key="checkout-modal" className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => step !== 'success' && setCheckoutOpen(false)}
          className="fixed inset-0 bg-black cursor-pointer"
        />

        {/* Modal Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-background border border-border-color rounded-3xl shadow-2xl overflow-hidden max-w-lg w-full max-h-[90vh] flex flex-col relative z-10 text-foreground"
        >
          {/* Close button */}
          {step !== 'success' && (
            <button
              onClick={() => setCheckoutOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/85 hover:bg-white text-primary hover:scale-105 active:scale-95 transition-all shadow-sm z-20 cursor-pointer focus:outline-none"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* Stepper Status Indicator Header */}
          <div className="p-4 bg-primary text-white flex items-center justify-between text-xs font-bold shadow-sm">
            <span>SECURE CHECKOUT 🔒</span>
            {step !== 'success' && (
              <div className="flex items-center gap-1.5 font-semibold text-[10px] tracking-wider">
                <span className={step === 'details' ? 'text-accent' : 'opacity-65'}>1. DETAILS</span>
                <span>→</span>
                <span className={step === 'payment' ? 'text-accent' : 'opacity-65'}>2. PAYMENT</span>
              </div>
            )}
          </div>

          <div className="overflow-y-auto p-6 flex-1 bg-surface">
            {/* Loading Overlay */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex flex-col items-center justify-center z-30">
                <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                <p className="mt-4 font-black text-primary text-sm uppercase tracking-wider animate-pulse">
                  Placing your organic order...
                </p>
              </div>
            )}

            {/* STEP 1: Billing & Delivery Details Form */}
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  1. Delivery Address Information
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                      Street Address / House No.
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        ZIP / Postal Code
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.zipCode}
                        onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-foreground/70 mb-1">
                        Mobile Phone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2 border border-border-color bg-white rounded-md text-xs outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-border-color pt-4 mt-6 flex justify-between items-center text-xs bg-white p-3 rounded-xl">
                  <span className="font-bold text-primary">Total: ₹{finalTotal}</span>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-primary hover:bg-accent text-white font-black rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    CONTINUE TO PAYMENT
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Payment Selection */}
            {step === 'payment' && (
              <div className="space-y-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-primary">
                  2. Choose Payment Method
                </h3>

                <div className="space-y-3">
                  {/* COD */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-border-color rounded-xl cursor-pointer hover:border-primary transition-all shadow-xs">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-primary"
                    />
                    <div>
                      <span className="text-xs font-bold text-foreground block">
                        Cash on Delivery (COD)
                      </span>
                      <span className="text-[10px] text-foreground/70 block mt-0.5">
                        Pay with cash or digital options when your order arrives.
                      </span>
                    </div>
                  </label>

                  {/* UPI */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-border-color rounded-xl cursor-pointer hover:border-primary transition-all shadow-xs">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'upi'}
                      onChange={() => setPaymentMethod('upi')}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-foreground block">
                        Instant UPI Scan (Simulated QR)
                      </span>
                      <span className="text-[10px] text-foreground/70 block mt-0.5">
                        Scan the QR code to transfer directly using GPay, PhonePe, Paytm.
                      </span>
                      {paymentMethod === 'upi' && (
                        <div className="mt-3 flex flex-col items-center p-3 bg-stone-50 border border-border-color rounded-lg">
                          {/* Simulated QR Code Visual */}
                          <div className="w-32 h-32 bg-white p-2 border border-stone-200 flex items-center justify-center relative shadow-inner">
                            {/* SVG mockup QR code */}
                            <svg className="w-full h-full text-primary" viewBox="0 0 100 100" fill="currentColor">
                              <path d="M5,5 h30 v30 h-30 z M15,15 h10 v10 h-10 z M65,5 h30 v30 h-30 z M75,15 h10 v10 h-10 z M5,65 h30 v30 h-30 z M15,75 h10 v10 h-10 z" />
                              <path d="M45,10 h10 v20 h-10 z M45,45 h15 v15 h-15 z M10,45 h20 v10 h-20 z M70,45 h20 v20 h-20 z M45,70 h30 v10 h-30 z M70,80 h15 v10 h-15 z" />
                            </svg>
                            <span className="absolute inset-0 m-auto w-8 h-8 rounded-full bg-accent border border-white flex items-center justify-center text-xs shadow">
                              🌱
                            </span>
                          </div>
                          <span className="text-[9px] font-black text-primary mt-2 uppercase tracking-wide">
                            UPI ID: rootzorganics@okaxis
                          </span>
                        </div>
                      )}
                    </div>
                  </label>

                  {/* Card Details */}
                  <label className="flex items-start gap-3 p-3 bg-white border border-border-color rounded-xl cursor-pointer hover:border-primary transition-all shadow-xs">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-primary"
                    />
                    <div className="flex-1">
                      <span className="text-xs font-bold text-foreground block">
                        Credit / Debit Card
                      </span>
                      <span className="text-[10px] text-foreground/70 block mt-0.5">
                        Accepts Visa, Mastercard, RuPay.
                      </span>

                      {paymentMethod === 'card' && (
                        <div className="mt-3 space-y-2">
                          <input
                            type="text"
                            placeholder="Card Number (e.g. 4321 8765 9812 4321)"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full px-3 py-1.5 border border-border-color bg-white rounded-md text-[11px] outline-none"
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              placeholder="MM/YY"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="px-3 py-1.5 border border-border-color bg-white rounded-md text-[11px] outline-none"
                            />
                            <input
                              type="password"
                              placeholder="CVV"
                              maxLength={3}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="px-3 py-1.5 border border-border-color bg-white rounded-md text-[11px] outline-none"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>

                <div className="border-t border-border-color pt-4 mt-6 flex justify-between items-center text-xs">
                  <button
                    onClick={() => setStep('details')}
                    className="text-xs font-bold text-foreground/70 hover:underline cursor-pointer focus:outline-none"
                  >
                    ← Back to Address
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    className="px-6 py-2.5 bg-primary hover:bg-accent text-white font-black rounded-lg shadow-md transition-all cursor-pointer"
                  >
                    PLACE ORDER (₹{finalTotal})
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Order Success Screen */}
            {step === 'success' && placedOrder && (
              <div className="text-center space-y-5 py-4">
                <div className="w-16 h-16 rounded-full bg-success-color/10 border border-success-color/30 flex items-center justify-center text-4xl mx-auto text-success-color animate-bounce">
                  ✓
                </div>
                <div>
                  <h3 className="text-lg font-black text-primary uppercase tracking-tight">
                    Order Placed Successfully!
                  </h3>
                  <p className="text-xs text-foreground/80 mt-1 max-w-sm mx-auto font-medium">
                    Thank you for choosing Rootz Organics! Your fresh organic items are being prepared for delivery.
                  </p>
                </div>

                {/* Order Details Receipt block */}
                <div className="bg-white border border-border-color rounded-2xl p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between font-bold text-primary">
                    <span>ORDER ID</span>
                    <span>{placedOrder.id}</span>
                  </div>
                  <div className="flex justify-between text-foreground/80 font-semibold">
                    <span>DATE</span>
                    <span>{placedOrder.date}</span>
                  </div>
                  <div className="flex justify-between text-foreground/80 font-semibold">
                    <span>TRACKING ID</span>
                    <span className="font-mono text-[11px] bg-stone-50 border border-border-color px-1.5 py-0.5 rounded text-foreground font-bold">
                      {placedOrder.trackingNumber}
                    </span>
                  </div>
                  <div className="flex justify-between text-foreground/80 font-semibold">
                    <span>PAYMENT METHOD</span>
                    <span>{placedOrder.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between font-bold text-primary border-t border-border-color pt-2 mt-2">
                    <span>TOTAL PAID</span>
                    <span>₹{placedOrder.total}</span>
                  </div>
                </div>

                {/* Visual Order Status Tracker */}
                <div className="pt-2 text-left bg-white p-4 rounded-2xl border border-border-color">
                  <p className="text-[10px] font-black text-primary uppercase tracking-wider mb-3">
                    DELIVERY STATUS TRACKER
                  </p>
                  
                  <div className="flex justify-between items-start text-center relative px-2">
                    {/* Progress Bar line */}
                    <div className="absolute top-2.5 left-8 right-8 h-0.5 bg-stone-200 z-0">
                      <div className="w-1/4 h-full bg-success-color" />
                    </div>

                    {[
                      { status: 'Placed', active: true, emoji: '📝' },
                      { status: 'Packed', active: false, emoji: '📦' },
                      { status: 'Shipped', active: false, emoji: '🚛' },
                      { status: 'Delivered', active: false, emoji: '🏠' },
                    ].map((stepInfo, idx) => (
                      <div key={idx} className="flex flex-col items-center gap-1.5 relative z-10 w-12">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs border shadow-xs ${
                            stepInfo.active
                              ? 'bg-success-color text-white border-success-color font-bold scale-110'
                              : 'bg-white text-stone-450 border-stone-200'
                          }`}
                        >
                          {stepInfo.emoji}
                        </div>
                        <span className={`text-[9px] font-bold uppercase tracking-tight ${stepInfo.active ? 'text-success-color' : 'text-stone-400'}`}>
                          {stepInfo.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-6">
                  <button
                    onClick={() => {
                      setCheckoutOpen(false);
                      // reset back to initial checkout details tab
                      setStep('details');
                    }}
                    className="w-full py-3 bg-primary hover:bg-accent text-white font-black text-xs rounded-xl shadow-md transition-all cursor-pointer border border-primary/10"
                  >
                    CONTINUE HEALTHY SHOPPING
                  </button>
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
