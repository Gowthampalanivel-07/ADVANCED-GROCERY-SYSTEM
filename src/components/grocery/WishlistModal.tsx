'use client';

import { useGroceryStore } from '@/stores/groceryStore';
import { motion, AnimatePresence } from 'framer-motion';
import { ModalPortal } from '@/components/grocery/ModalPortal';

export function WishlistModal() {
  const {
    isWishlistOpen,
    setWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    addToCart,
    setQuickViewProduct
  } = useGroceryStore();

  // Retrieve full product objects for IDs in wishlist
  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <ModalPortal>
      <AnimatePresence>
        {isWishlistOpen && (
          <div key="wishlist-modal" className="fixed inset-0 z-[200] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          onClick={() => setWishlistOpen(false)}
          className="fixed inset-0 bg-black cursor-pointer"
        />

        {/* Modal content sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', duration: 0.4 }}
          className="bg-background border border-border-color rounded-3xl shadow-2xl overflow-hidden max-w-md w-full max-h-[80vh] flex flex-col relative z-10 text-foreground"
        >
          {/* Close button */}
          <button
            onClick={() => setWishlistOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/85 hover:bg-white text-primary hover:scale-105 active:scale-95 transition-all shadow-sm z-20 cursor-pointer focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Header */}
          <div className="p-4 bg-primary text-white flex items-center gap-2 shadow-sm font-black text-sm uppercase tracking-wide">
            <span>❤️ MY WISHLIST ({wishlistedProducts.length})</span>
          </div>

          <div className="overflow-y-auto p-4 flex-1 bg-surface">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 px-4 bg-white border border-border-color rounded-2xl">
                <span className="text-5xl">❤️</span>
                <h3 className="text-sm font-black text-primary mt-3 uppercase">Your Wishlist is Empty</h3>
                <p className="text-xs text-foreground/70 mt-1 max-w-xs mx-auto">
                  Save your favorite items here to purchase them later. Click on the heart icon of any product card!
                </p>
                <button
                  onClick={() => setWishlistOpen(false)}
                  className="mt-4 px-5 py-2 bg-primary hover:bg-accent text-white font-bold text-xs rounded-md shadow-xs transition-all cursor-pointer"
                >
                  BROWSE ORGANICS
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {wishlistedProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white border border-border-color rounded-xl p-3 flex gap-3 shadow-xs items-center"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setWishlistOpen(false);
                        setQuickViewProduct(product);
                      }}
                      className="w-12 h-12 rounded-lg overflow-hidden border border-border-color flex-shrink-0 cursor-pointer bg-[#F4F7F2]"
                    >
                      <img 
                        src={product.imageUrl} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4
                        onClick={() => {
                          setWishlistOpen(false);
                          setQuickViewProduct(product);
                        }}
                        className="text-xs font-bold text-foreground truncate hover:underline cursor-pointer"
                      >
                        {product.name}
                      </h4>
                      <span className="text-[10px] text-foreground/60 font-semibold block">{product.unit}</span>
                      <span className="text-xs font-bold text-primary mt-1 block">
                        ₹{product.currentPrice}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
                      <button
                        onClick={() => addToCart(product, 1)}
                        className="px-3 py-1.5 bg-primary hover:bg-accent text-white text-[10px] font-black rounded-lg transition-all shadow-xs uppercase cursor-pointer"
                      >
                        + BAG
                      </button>
                      <button
                        onClick={() => toggleWishlist(product.id)}
                        className="text-red-500 hover:text-red-650 hover:scale-105 p-1 rounded transition-all cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                ))}
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
