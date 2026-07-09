'use client';

import { useRef, useCallback } from 'react';
import { useGroceryStore } from '@/stores/groceryStore';
import { motion, AnimatePresence } from 'framer-motion';

// 3D Tilt card hook
function useTilt() {
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) scale(1.02)`;
  }, []);

  const onMouseLeave = useCallback(() => {
    if (ref.current) {
      ref.current.style.transform =
        'perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)';
    }
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}

function ProductCard({
  product,
  idx,
}: {
  product: ReturnType<typeof useGroceryStore.getState>['products'][0];
  idx: number;
}) {
  const { cart, wishlist, addToCart, updateCartQuantity, toggleWishlist, setQuickViewProduct } =
    useGroceryStore();

  const { ref, onMouseMove, onMouseLeave } = useTilt();

  const qtyInCart = cart.find((item) => item.product.id === product.id)?.quantity ?? 0;
  const isWishlisted = wishlist.includes(product.id);
  const discount = Math.round(
    ((product.basePrice - product.currentPrice) / product.basePrice) * 100
  );

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: idx * 0.04 }}
    >
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="bg-white border border-border-color rounded-[24px] overflow-hidden flex flex-col group relative cursor-default tilt-card"
        style={{
          transition: 'transform 0.15s ease, box-shadow 0.4s ease',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
        }}
      >
        {/* Discount Badge */}
        {discount > 0 && (
          <span className="absolute top-4 left-4 bg-accent text-white text-[10px] font-black px-2.5 py-1 rounded-full z-10 shadow-sm tracking-wider">
            {discount}% OFF
          </span>
        )}

        {/* Wishlist Icon */}
        <motion.button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-rose-500 transition-all shadow-sm z-10 focus:outline-none cursor-pointer border border-border-color/30 magnetic-btn"
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <svg
            className="w-4.5 h-4.5"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </motion.button>

        {/* Image Container — zoom on scroll + hover */}
        <div
          onClick={() => setQuickViewProduct(product)}
          className="w-full h-52 relative cursor-pointer overflow-hidden rounded-t-[24px] bg-bg-secondary img-zoom-scroll is-visible"
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${product.imageColor} opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
          />
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-black/12 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
            <span className="px-5 py-2.5 bg-white text-primary font-bold text-xs rounded-xl shadow-md hover:bg-primary hover:text-white transition-all font-sans border border-border-color">
              Quick View 👁️
            </span>
          </div>
        </div>

        {/* Details */}
        <div className="p-5 flex-1 flex flex-col bg-white">
          {/* Dietary Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {product.dietaryTags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[8px] font-bold uppercase tracking-widest text-primary bg-primary/6 px-2 py-0.5 rounded-md border border-primary/10"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Name */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-[17px] font-bold text-foreground hover:text-primary cursor-pointer line-clamp-1 font-heading leading-snug mb-0.5"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-[13px] text-body-text line-clamp-1 font-sans mb-2">
            {product.description}
          </p>

          {/* Weight & Rating */}
          <div className="flex items-center justify-between text-xs text-light-text mb-3 font-medium font-sans">
            <span>{product.unit}</span>
            <span className="flex items-center gap-0.5">
              <span className="text-accent">★</span>
              <span className="text-foreground font-bold">{product.rating}</span>
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4">
            <span className="text-[20px] font-bold text-primary font-sans leading-none">
              ₹{product.currentPrice}
            </span>
            {product.basePrice > product.currentPrice && (
              <span className="text-xs text-light-text line-through font-medium font-sans">
                ₹{product.basePrice}
              </span>
            )}
          </div>

          {/* Add to Cart */}
          <div className="mt-auto">
            {qtyInCart === 0 ? (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product, 1);
                }}
                disabled={product.stock <= 0}
                className={`w-full py-3 bg-primary hover:bg-secondary text-white font-bold text-sm rounded-[14px] transition-all flex items-center justify-center gap-1.5 shadow-glow-green cursor-pointer border border-primary/10 font-sans magnetic-btn ${
                  product.stock <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={product.stock > 0 ? { scale: 1.03 } : {}}
                whileTap={product.stock > 0 ? { scale: 0.96 } : {}}
              >
                {product.stock <= 0 ? 'Sold Out' : '+ Add to Bag'}
              </motion.button>
            ) : (
              <div className="flex items-center justify-between bg-primary/6 border border-primary/15 rounded-[14px] h-11 overflow-hidden">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCartQuantity(product.id, qtyInCart - 1);
                  }}
                  className="w-11 h-full hover:bg-primary/10 text-primary font-black text-lg flex items-center justify-center cursor-pointer focus:outline-none transition-colors"
                  whileTap={{ scale: 0.85 }}
                >
                  −
                </motion.button>
                <span className="font-bold text-primary text-xs font-sans">{qtyInCart} in bag</span>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateCartQuantity(product.id, qtyInCart + 1);
                  }}
                  disabled={qtyInCart >= product.stock}
                  className="w-11 h-full hover:bg-primary/10 text-primary font-black text-lg flex items-center justify-center cursor-pointer focus:outline-none transition-colors"
                  whileTap={{ scale: 0.85 }}
                >
                  +
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function ProductList() {
  const { products, searchQuery, selectedCategory, setSelectedCategory } = useGroceryStore();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'ALL' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="w-full py-12 min-h-[500px]" style={{ background: 'transparent' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-border-color pb-5 mb-8 gap-3 reveal reveal-up">
          <div>
            <h2 className="text-2xl sm:text-[34px] font-bold text-foreground tracking-tight font-heading">
              {selectedCategory === 'ALL'
                ? 'Our Organic Store'
                : selectedCategory.charAt(0) + selectedCategory.slice(1).toLowerCase()}
            </h2>
            <p className="text-sm text-light-text mt-1 font-medium font-sans">
              Showing {filteredProducts.length} healthy and clean items
            </p>
          </div>

          {(selectedCategory !== 'ALL' || searchQuery !== '') && (
            <motion.button
              onClick={() => {
                setSelectedCategory('ALL');
                useGroceryStore.setState({ searchQuery: '' });
              }}
              className="text-xs font-semibold text-error-color hover:bg-rose-50 border border-rose-200 px-4 py-2 rounded-xl transition-all cursor-pointer font-sans magnetic-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
            >
              ✕ Clear Filters
            </motion.button>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-20 px-4 glow-card rounded-[24px]"
          >
            <span className="text-6xl">🔍</span>
            <h3 className="text-lg font-bold text-primary mt-4 font-heading">No Products Found</h3>
            <p className="text-sm text-light-text mt-2 max-w-md mx-auto font-sans">
              We couldn&apos;t find any products matching &ldquo;{searchQuery}&rdquo;. Try another category or check
              your spelling.
            </p>
            <motion.button
              onClick={() => {
                setSelectedCategory('ALL');
                useGroceryStore.setState({ searchQuery: '' });
              }}
              className="mt-6 px-6 py-3 bg-primary text-white font-semibold text-sm rounded-xl shadow-glow-green transition-all font-sans magnetic-btn"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Browse All Products
            </motion.button>
          </motion.div>
        )}

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, idx) => (
              <ProductCard key={product.id} product={product} idx={idx} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
