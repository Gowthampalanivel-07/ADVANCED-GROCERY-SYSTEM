'use client';

import { useGroceryStore } from '@/stores/groceryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalPortal } from '@/components/grocery/ModalPortal';

export function QuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    updateCartQuantity,
    cart
  } = useGroceryStore();

  const qtyInCart = quickViewProduct
    ? cart.find((item) => item.product.id === quickViewProduct.id)?.quantity || 0
    : 0;
  const discount = quickViewProduct
    ? Math.round(
        ((quickViewProduct.basePrice - quickViewProduct.currentPrice) / quickViewProduct.basePrice) * 100
      )
    : 0;

  return (
    <ModalPortal>
      <AnimatePresence>
        {quickViewProduct && (
          <div key="quick-view-modal" className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => setQuickViewProduct(null)}
          className="fixed inset-0 bg-black"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-background border border-border-color rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full max-h-[90vh] flex flex-col relative z-10 text-foreground"
        >
          {/* Close button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/90 hover:bg-white text-primary hover:scale-105 active:scale-95 transition-all shadow-xs z-20 cursor-pointer focus:outline-none border border-border-color/30"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="overflow-y-auto p-6 sm:p-8 flex flex-col md:flex-row gap-6 bg-white">
            
            {/* Left: Product Visual */}
            <div className="md:w-1/2 flex flex-col items-center justify-center bg-[#F4F7F2] border border-border-color rounded-2xl p-4 relative min-h-[220px] overflow-hidden">
              {discount > 0 && (
                <span className="absolute top-3 left-3 bg-accent text-white text-[10px] font-black px-2.5 py-1 rounded-full z-10">
                  {discount}% OFF
                </span>
              )}
              <div className={`absolute inset-0 bg-gradient-to-br ${quickViewProduct.imageColor} opacity-10 blur-xl`} />
              
              {/* Product Image */}
              <img 
                src={quickViewProduct.imageUrl} 
                alt={quickViewProduct.name}
                className="w-full h-48 object-cover rounded-xl shadow-sm z-10"
              />

              <span className="text-[10px] font-bold text-light-text mt-4 uppercase tracking-widest bg-background px-3 py-1.5 rounded-lg border border-border-color shadow-xs font-sans z-10">
                {quickViewProduct.unit}
              </span>
            </div>

            {/* Right: Product Meta */}
            <div className="md:w-1/2 flex flex-col">
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase font-sans">
                {quickViewProduct.category.charAt(0) + quickViewProduct.category.slice(1).toLowerCase()}
              </span>
              
              <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight mt-1 leading-tight font-heading">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-1.5 text-xs text-light-text mt-1 mb-3 font-semibold font-sans">
                <span className="text-accent text-sm">★</span>
                <span>{quickViewProduct.rating}</span>
                <span>•</span>
                <span className="underline">{quickViewProduct.reviewsCount} verified reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[22px] font-bold text-primary font-sans leading-none">
                  ₹{quickViewProduct.currentPrice}
                </span>
                {quickViewProduct.basePrice > quickViewProduct.currentPrice && (
                  <span className="text-sm text-[#94A3B8] line-through font-semibold font-sans">
                    ₹{quickViewProduct.basePrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-[15px] font-normal text-light-text leading-relaxed mb-4 font-sans">
                {quickViewProduct.description}
              </p>

              {/* Benefits Bullet Points */}
              <div className="mb-5 space-y-1.5 bg-primary/5 border border-primary/10 rounded-xl p-4 text-xs font-medium text-foreground font-sans">
                <p className="font-bold text-xs text-primary mb-1 font-heading uppercase tracking-wide">Product Highlights:</p>
                {quickViewProduct.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <span className="text-primary font-bold">✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Dietary Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {quickViewProduct.dietaryTags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[9px] font-bold uppercase tracking-wider text-primary bg-primary/5 border border-primary/10 px-2 py-0.5 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Add to Bag Action */}
              <div className="mt-auto">
                {qtyInCart === 0 ? (
                  <button
                    onClick={() => addToCart(quickViewProduct, 1)}
                    disabled={quickViewProduct.stock <= 0}
                    className={`w-full py-3.5 bg-primary hover:bg-[#2E7D32] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-primary/10 font-sans ${
                      quickViewProduct.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {quickViewProduct.stock <= 0 ? 'Sold Out' : 'Add to Shopping Bag 🛍️'}
                  </button>
                ) : (
                  <div className="flex items-center justify-between bg-primary/5 border border-primary/15 rounded-xl h-12 overflow-hidden shadow-xs">
                    <button
                      onClick={() => updateCartQuantity(quickViewProduct.id, qtyInCart - 1)}
                      className="w-14 h-full hover:bg-primary/10 text-primary font-black text-lg flex items-center justify-center cursor-pointer focus:outline-none"
                    >
                      -
                    </button>
                    <span className="font-bold text-primary text-sm font-sans">
                      {qtyInCart} in your bag
                    </span>
                    <button
                      onClick={() => updateCartQuantity(quickViewProduct.id, qtyInCart + 1)}
                      disabled={qtyInCart >= quickViewProduct.stock}
                      className="w-14 h-full hover:bg-primary/10 text-primary font-black text-lg flex items-center justify-center cursor-pointer focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

            </div>
          </div>
        </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ModalPortal>
  );
}
