'use client';

import { create } from 'zustand';

export interface GroceryProduct {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  currentPrice: number;
  stock: number;
  unit: string;
  rating: number;
  reviewsCount: number;
  description: string;
  benefits: string[];
  dietaryTags: ('organic' | 'gluten-free' | 'vegan' | 'natural')[];
  imageColor: string; // SVG background color gradient
  imageEmoji: string; // Product representation
  imageUrl: string; // High-resolution product image
}

export interface CartItem {
  product: GroceryProduct;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryCharge: number;
  gst: number;
  total: number;
  address: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  paymentMethod: string;
  status: 'Order Placed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: string[];
  isLoggedIn: boolean;
}

interface GroceryStore {
  products: GroceryProduct[];
  cart: CartItem[];
  wishlist: string[]; // Product IDs
  searchQuery: string;
  selectedCategory: string;
  appliedCoupon: string | null;
  discountPercentage: number;
  user: UserProfile;
  orders: Order[];
  quickViewProduct: GroceryProduct | null;
  isCartOpen: boolean;
  isCheckoutOpen: boolean;
  isProfileOpen: boolean;
  isWishlistOpen: boolean;
  
  // Actions
  addToCart: (product: GroceryProduct, qty?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  registerUser: (name: string, email: string, phone: string) => void;
  loginUser: (email: string) => boolean;
  logoutUser: () => void;
  placeOrder: (address: Order['address'], paymentMethod: string) => Order | null;
  setQuickViewProduct: (product: GroceryProduct | null) => void;
  setCartOpen: (open: boolean) => void;
  setCheckoutOpen: (open: boolean) => void;
  setProfileOpen: (open: boolean) => void;
  setWishlistOpen: (open: boolean) => void;
}

// Curated organic products
const initialProducts: GroceryProduct[] = [
  // --- MANGOES ---
  {
    id: 'm1',
    name: 'Devgad Alphonso Mango (Hapus)',
    category: 'MANGOES',
    basePrice: 420,
    currentPrice: 380,
    stock: 50,
    unit: '1 Dozen (approx 3kg)',
    rating: 4.9,
    reviewsCount: 142,
    description: 'Naturally ripened Devgad Alphonso Mangoes, rich in aroma, flavor, and texture. Chemical-free and sourced directly from GI-tagged farms in Devgad, Maharashtra.',
    benefits: ['Naturally Ripened', 'No Carbide Used', 'Sweet & Saffron-Colored Pulp', 'Rich in Vitamin A & C'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-400 to-orange-500',
    imageEmoji: '🥭',
    imageUrl: '/images/alphonso_mango.png',
  },
  {
    id: 'm2',
    name: 'Organic Banganpalli Mango',
    category: 'MANGOES',
    basePrice: 190,
    currentPrice: 165,
    stock: 80,
    unit: '1 kg',
    rating: 4.7,
    reviewsCount: 89,
    description: 'Large-sized, delicious Banganpalli mangoes, famous for their unique shape and sweet, fiberless pulp. Certified organic and grown without synthetic sprays.',
    benefits: ['Fiberless Pulp', 'Naturally Sweetened', 'Certified Organic', 'Excellent for smoothies and slicing'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-yellow-300 to-amber-500',
    imageEmoji: '🥭',
    imageUrl: 'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'm3',
    name: 'Organic Kesar Mango',
    category: 'MANGOES',
    basePrice: 280,
    currentPrice: 240,
    stock: 65,
    unit: '1 kg',
    rating: 4.8,
    reviewsCount: 74,
    description: 'Known as the Queen of Mangoes, our Gir Kesar mangoes are sweet, saffron-tinted, and intensely fragrant. Sourced from orchards in Junagadh, Gujarat.',
    benefits: ['Gir Valley Authenticity', 'Rich Aroma', 'Ripened Naturally', 'Chemical-Free'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-yellow-400 to-orange-400',
    imageEmoji: '🥭',
    imageUrl: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'm4',
    name: 'Premium Langra Mango',
    category: 'MANGOES',
    basePrice: 180,
    currentPrice: 150,
    stock: 45,
    unit: '1 kg',
    rating: 4.6,
    reviewsCount: 38,
    description: 'Fleshy, sweet, and aromatic Langra mangoes. Retains its green color even when fully ripe. Sourced from organic orchards in Uttar Pradesh.',
    benefits: ['Intensely Sweet', 'Fleshy & Juicy Texture', 'Organic Farming certified', 'Ripened without chemical accelerators'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-green-300 to-yellow-500',
    imageEmoji: '🥭',
    imageUrl: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'm5',
    name: 'Organic Dasheri Mango',
    category: 'MANGOES',
    basePrice: 220,
    currentPrice: 185,
    stock: 50,
    unit: '1 kg',
    rating: 4.8,
    reviewsCount: 57,
    description: 'Famous sweet and fiberless Dasheri mangoes from Malihabad. Characterized by their long shape and unique, sweet aroma.',
    benefits: ['GI tagged region authenticity', 'Super sweet pulp', 'Naturally matured on trees', 'Chemical-free crop protection'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-yellow-200 to-orange-400',
    imageEmoji: '🥭',
    imageUrl: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=600&auto=format&fit=crop',
  },

  // --- VEG & FRUITS ---
  {
    id: 'vf1',
    name: 'Fresh Organic Spinach (Palak)',
    category: 'VEG & FRUITS',
    basePrice: 45,
    currentPrice: 35,
    stock: 30,
    unit: '250g Bunch',
    rating: 4.6,
    reviewsCount: 52,
    description: 'Freshly harvested spinach greens, packed with iron and trace minerals. Grown using natural composting methods, free from artificial pesticide sprays.',
    benefits: ['Harvested Daily', 'Iron Rich', 'Thoroughly Cleaned', '100% Pesticide Free'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-green-400 to-emerald-600',
    imageEmoji: '🥬',
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vf2',
    name: 'Locally Grown Organic Tomatoes',
    category: 'VEG & FRUITS',
    basePrice: 60,
    currentPrice: 48,
    stock: 120,
    unit: '500g',
    rating: 4.5,
    reviewsCount: 110,
    description: 'Juicy, vine-ripened organic tomatoes with a tangy, sweet flavour profile. Sourced from local organic farms around Delhi/NCR.',
    benefits: ['Vine-Ripened', 'High Lycopene Content', 'No Chemical Preservatives', 'Perfect for curries and salads'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-red-400 to-red-600',
    imageEmoji: '🍅',
    imageUrl: 'https://images.unsplash.com/photo-1595855759920-86582396756a?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vf3',
    name: 'Premium Organic Bananas',
    category: 'VEG & FRUITS',
    basePrice: 90,
    currentPrice: 75,
    stock: 90,
    unit: '1 Dozen',
    rating: 4.8,
    reviewsCount: 95,
    description: 'Naturally grown Robusta bananas, sweet, firm, and chemical-free. A healthy snack choice for instant energy.',
    benefits: ['Potassium Rich', 'Natural Ripening', 'Sourced from organic orchards', 'Pesticide Free'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-yellow-200 to-yellow-400',
    imageEmoji: '🍌',
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vf4',
    name: 'Organic Sweet Potatoes (Shakarkand)',
    category: 'VEG & FRUITS',
    basePrice: 80,
    currentPrice: 65,
    stock: 45,
    unit: '1 kg',
    rating: 4.7,
    reviewsCount: 38,
    description: 'Earthy, sweet, and nutrient-dense organic sweet potatoes. High in dietary fiber and beta-carotene.',
    benefits: ['High Fiber', 'Beta-Carotene Rich', 'Grown in healthy, living soil', 'Non-GMO'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-orange-300 to-amber-700',
    imageEmoji: '🍠',
    imageUrl: 'https://images.unsplash.com/photo-1596097635121-14b63b7a0c19?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vf5',
    name: 'Fresh Organic Hass Avocado',
    category: 'VEG & FRUITS',
    basePrice: 290,
    currentPrice: 245,
    stock: 35,
    unit: '1 Piece (approx 200g)',
    rating: 4.9,
    reviewsCount: 62,
    description: 'Buttery, rich, and perfectly textured organic Hass avocados. Hand-picked at peak maturity and packed with healthy monounsaturated fats.',
    benefits: ['Rich in Healthy Fats', 'High in Dietary Fiber', 'Pesticide Free import', 'Perfect for guacamole and toasts'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-emerald-700 to-green-900',
    imageEmoji: '🥑',
    imageUrl: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vf6',
    name: 'Fresh Organic Broccoli',
    category: 'VEG & FRUITS',
    basePrice: 120,
    currentPrice: 95,
    stock: 40,
    unit: '1 head (approx 400g)',
    rating: 4.7,
    reviewsCount: 41,
    description: 'Crisp, dark green organic broccoli crowns. Rich in Vitamin C, K, and antioxidants. Cultivated without synthetic liquid spray fertilizers.',
    benefits: ['High in Vitamin C & K', 'Crisp florets', 'Clean soil grown', 'Non-toxic pest management'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-green-500 to-emerald-800',
    imageEmoji: '🥦',
    imageUrl: 'https://images.unsplash.com/photo-1453904300235-df521a8e1215?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vf7',
    name: 'Sweet Organic Strawberries',
    category: 'VEG & FRUITS',
    basePrice: 190,
    currentPrice: 160,
    stock: 30,
    unit: '200g Box',
    rating: 4.8,
    reviewsCount: 78,
    description: 'Juicy, deep red organic strawberries with a rich, natural sweetness. Picked daily and immediately cooled to preserve freshness.',
    benefits: ['Antioxidant Powerhouse', 'Sweet & Fragrant', 'No synthetic wax coating', 'Pesticide residue free'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-red-500 to-rose-600',
    imageEmoji: '🍓',
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?q=80&w=600&auto=format&fit=crop',
  },

  // --- ANCIENT FLOURS ---
  {
    id: 'af1',
    name: 'Organic Emmer Wheat Flour (Khapli Atta)',
    category: 'ANCIENT FLOURS',
    basePrice: 150,
    currentPrice: 130,
    stock: 40,
    unit: '1 kg',
    rating: 4.9,
    reviewsCount: 204,
    description: 'Traditionally stone-ground Emmer wheat (Khapli) flour. High in dietary fiber, low glycemic index, and easy to digest. Ideal for diabetic-friendly chapatis.',
    benefits: ['Stone Ground (Chakki Fresh)', 'Low Glycemic Index', 'Easy to Digest', 'Ancient Heirloom Grain'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-200 to-amber-400',
    imageEmoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1574325131876-a7999373de5f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'af2',
    name: 'Sprouted Ragi Flour (Finger Millet)',
    category: 'ANCIENT FLOURS',
    basePrice: 120,
    currentPrice: 99,
    stock: 55,
    unit: '500g',
    rating: 4.8,
    reviewsCount: 112,
    description: 'Sprouted and stone-ground ragi flour. Sprouting increases calcium bioavailability and neutralizes phytates. Perfect for baby food and nutritious porridge.',
    benefits: ['Sprouted for nutrient absorption', 'Extremely high in Calcium', 'Gluten-Free by nature', 'Great for porridge and rotis'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-amber-700 to-stone-800',
    imageEmoji: '🥣',
    imageUrl: 'https://images.unsplash.com/photo-1608797178974-15b35a61d121?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'af3',
    name: 'Gluten-Free Multigrain Flour',
    category: 'ANCIENT FLOURS',
    basePrice: 180,
    currentPrice: 160,
    stock: 35,
    unit: '1 kg',
    rating: 4.6,
    reviewsCount: 67,
    description: 'A special blend of sorghum, amaranth, water chestnut, and tapioca. Formulated specifically for individuals with gluten sensitivities or celiac disease.',
    benefits: ['100% Gluten-Free Certified', 'Nutrient-Rich Blend', 'High Fiber Content', 'Soft Rotis and Breads'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-yellow-100 to-amber-300',
    imageEmoji: '🍞',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'af4',
    name: 'Organic Amaranth Flour (Rajgira)',
    category: 'ANCIENT FLOURS',
    basePrice: 140,
    currentPrice: 120,
    stock: 30,
    unit: '500g',
    rating: 4.7,
    reviewsCount: 45,
    description: 'Stone-ground organic Amaranth (Rajgira) seeds. Rich in protein, lysine, and calcium. Gluten-free by nature and widely used during fasting.',
    benefits: ['High in Lysine Protein', 'Rich in Iron & Calcium', '100% Gluten Free', 'Wood-milled fresh'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-amber-100 to-yellow-300',
    imageEmoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1595231712425-60418471f654?q=80&w=600&auto=format&fit=crop',
  },

  // --- HERITAGE RICE ---
  {
    id: 'hr1',
    name: 'Indrayani Semi-Brown Rice',
    category: 'HERITAGE RICE',
    basePrice: 125,
    currentPrice: 110,
    stock: 70,
    unit: '1 kg',
    rating: 4.7,
    reviewsCount: 83,
    description: 'Fragrant, sticky heritage rice from the valleys of Maharashtra. Semi-polished to retain the bran and essential minerals while remaining soft to chew.',
    benefits: ['Rich Natural Aroma', 'High Mineral Retention', 'Semi-Polished Bran', 'Sourced from cooperative farms'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-orange-100 to-amber-200',
    imageEmoji: '🍚',
    imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'hr2',
    name: 'Gobindobhog Aromatic Rice',
    category: 'HERITAGE RICE',
    basePrice: 160,
    currentPrice: 145,
    stock: 60,
    unit: '1 kg',
    rating: 4.9,
    reviewsCount: 115,
    description: 'Short-grained, white, aromatic rice from West Bengal. Famously used for making payesh, khichdi, and offerings. Sweet buttery flavor.',
    benefits: ['Intense Buttery Aroma', 'Short-Grain Cultivar', 'Chemical-Free Cultivation', 'Tradition in every grain'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-stone-100 to-stone-300',
    imageEmoji: '🍚',
    imageUrl: 'https://images.unsplash.com/photo-1536304997881-a372c179924b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'hr3',
    name: 'Premium Basmati Rice (Organic)',
    category: 'HERITAGE RICE',
    basePrice: 220,
    currentPrice: 195,
    stock: 80,
    unit: '1 kg',
    rating: 4.8,
    reviewsCount: 92,
    description: 'Long-grained, aged organic Basmati rice. Delivers long, fluffy, non-sticky grains with a rich classic basmati aroma upon cooking.',
    benefits: ['Aged for 2 Years', 'Extra Long Fluffy Grain', 'Authentic Aroma', 'Pesticide Free crop'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-50 to-stone-200',
    imageEmoji: '🍚',
    imageUrl: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'hr4',
    name: 'Black Kavuni Rice (Heritage)',
    category: 'HERITAGE RICE',
    basePrice: 260,
    currentPrice: 230,
    stock: 40,
    unit: '1 kg',
    rating: 4.9,
    reviewsCount: 73,
    description: 'Nutrient-rich, unpolished black rice famously grown in Southern India. High in anthocyanin antioxidants, iron, and dietary fiber.',
    benefits: ['Packed with Anthocyanin', 'Rich in Iron & Fiber', 'Unpolished Heritage Grain', 'Low glycemic load'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-stone-800 to-stone-950',
    imageEmoji: '🍚',
    imageUrl: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=600&auto=format&fit=crop',
  },

  // --- PULSES ---
  {
    id: 'p1',
    name: 'Organic Unpolished Toor Dal',
    category: 'PULSES',
    basePrice: 195,
    currentPrice: 175,
    stock: 60,
    unit: '1 kg',
    rating: 4.8,
    reviewsCount: 122,
    description: 'Premium quality organic Toor Dal (arhar dal). Unpolished to retain its natural dietary fibers, protein, and authentic earthy taste. No color additives.',
    benefits: ['High Protein & Fiber', 'Unpolished & Natural', 'No synthetic polishing', 'Essential daily nutrient source'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-yellow-500 to-amber-500',
    imageEmoji: '🍲',
    imageUrl: 'https://images.unsplash.com/photo-1547058886-53df25914619?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p2',
    name: 'Premium Organic Kabuli Chana',
    category: 'PULSES',
    basePrice: 170,
    currentPrice: 148,
    stock: 55,
    unit: '500g',
    rating: 4.7,
    reviewsCount: 81,
    description: 'Selected large-sized organic Kabuli Chana (white chickpeas). Cleaned and packed in pristine conditions. Excellent for delicious Chole and salads.',
    benefits: ['Rich in Iron & Protein', 'Easy to boil and soft', 'Sourced from organic farming', '100% natural and clean'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-stone-300 to-stone-400',
    imageEmoji: '🧆',
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p3',
    name: 'Organic Chana Dal (Split)',
    category: 'PULSES',
    basePrice: 120,
    currentPrice: 99,
    stock: 70,
    unit: '1 kg',
    rating: 4.6,
    reviewsCount: 54,
    description: 'Split baby chickpeas grown on chemical-free organic farms. Stone split, high in vegetarian protein, and highly digestible.',
    benefits: ['Traditional split method', 'High vegan protein', 'Low fat index', 'Rich in folate'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-yellow-400 to-amber-550',
    imageEmoji: '🍲',
    imageUrl: 'https://images.unsplash.com/photo-1515942400758-c34e1ad1592c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p4',
    name: 'Organic Whole Moong Beans',
    category: 'PULSES',
    basePrice: 160,
    currentPrice: 135,
    stock: 65,
    unit: '500g',
    rating: 4.8,
    reviewsCount: 63,
    description: 'Green whole mung beans, sourced from organic growers. Perfect for sprouting or making nutritious dals and stews.',
    benefits: ['Ideal for nutrient rich sprouts', 'Easy to digest', 'Pesticide free growth', 'High dietary fiber'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-green-600 to-emerald-800',
    imageEmoji: '🍲',
    imageUrl: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'p5',
    name: 'Premium Organic Masoor Dal',
    category: 'PULSES',
    basePrice: 150,
    currentPrice: 128,
    stock: 90,
    unit: '1 kg',
    rating: 4.7,
    reviewsCount: 88,
    description: 'Split red lentils, unpolished and chemical-free. Quick cooking, high in protein, and ideal for tasty, comforting soups.',
    benefits: ['Cooks in 15 minutes', 'High protein content', 'No coloring dyes used', 'Grown in certified organic fields'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-orange-400 to-red-500',
    imageEmoji: '🍲',
    imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?q=80&w=600&auto=format&fit=crop',
  },

  // --- AYURVEDA ---
  {
    id: 'ay1',
    name: 'Organic Chyawanprash (Special Formula)',
    category: 'AYURVEDA',
    basePrice: 480,
    currentPrice: 425,
    stock: 40,
    unit: '500g Glass Jar',
    rating: 4.9,
    reviewsCount: 154,
    description: 'Prepared using organic fresh Amla pulp and a blend of 40+ potent Ayurvedic herbs. Strengthens immunity, enhances digestion, and boosts energy levels.',
    benefits: ['40+ Ayurvedic Herbs blend', 'Fresh Organic Amla source', 'Boosts natural immunity', 'Preserved in heavy glass jars'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-800 to-stone-900',
    imageEmoji: '🏺',
    imageUrl: 'https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ay2',
    name: 'Premium Ashwagandha Root Powder',
    category: 'AYURVEDA',
    basePrice: 240,
    currentPrice: 199,
    stock: 70,
    unit: '100g',
    rating: 4.8,
    reviewsCount: 92,
    description: 'Fine ground, single-origin organic Ashwagandha (Withania somnifera) root powder. Known for stress relief, vitality, and relaxing properties.',
    benefits: ['100% Pure Root Powder', 'Adapto-gen stress support', 'Zero fillers or binders', 'Natural energy and vitality'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-stone-400 to-amber-700',
    imageEmoji: '🌿',
    imageUrl: 'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ay3',
    name: 'Organic Lakadong Turmeric Powder',
    category: 'AYURVEDA',
    basePrice: 180,
    currentPrice: 150,
    stock: 85,
    unit: '150g Jar',
    rating: 4.9,
    reviewsCount: 110,
    description: 'Sourced from the hills of Lakadong, Meghalaya. Known to have exceptionally high curcumin content (above 7%). Rich flavor and healing color.',
    benefits: ['High Curcumin (>7%)', 'Strong Anti-inflammatory properties', 'Single origin farms', 'Non-irradiated'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-amber-50 to-yellow-600',
    imageEmoji: '🍯',
    imageUrl: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ay4',
    name: 'Organic Triphala Powder',
    category: 'AYURVEDA',
    basePrice: 130,
    currentPrice: 110,
    stock: 50,
    unit: '100g',
    rating: 4.6,
    reviewsCount: 48,
    description: 'Ayurvedic herbal blend of three dry fruits: Amla, Bibhitaki, and Haritaki. Promotes digestive wellness, body cleansing, and colon health.',
    benefits: ['Three organic dry fruits mix', 'Supports healthy digestion', 'Natural colon cleanser', 'Zero chemical additives'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-stone-500 to-stone-800',
    imageEmoji: '🌿',
    imageUrl: 'https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ay5',
    name: 'Premium Amla Juice (Cold-Pressed)',
    category: 'AYURVEDA',
    basePrice: 220,
    currentPrice: 180,
    stock: 60,
    unit: '500 ml Bottle',
    rating: 4.7,
    reviewsCount: 65,
    description: 'Cold-pressed juice made from fresh wild Indian gooseberries (Amla). Powerhouse of natural Vitamin C and immunity building antioxidants.',
    benefits: ['Cold-pressed without heat', 'Supercharged with Vitamin C', 'No added sugar or dilution', 'Boosts skin and hair health'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-lime-600 to-green-800',
    imageEmoji: '🍾',
    imageUrl: 'https://images.unsplash.com/photo-1622484211148-7164ffbfdf8b?q=80&w=600&auto=format&fit=crop',
  },

  // --- OIL & GHEE ---
  {
    id: 'og1',
    name: 'A2 Desi Cow Ghee (Bilona Method)',
    category: 'OIL & GHEE',
    basePrice: 999,
    currentPrice: 890,
    stock: 45,
    unit: '500 ml Glass Jar',
    rating: 5.0,
    reviewsCount: 248,
    description: 'Hand-churned A2 ghee made from the milk of grass-fed Gir cows using the traditional Vedic Bilona method. Packed in glass jars to preserve nutritive values.',
    benefits: ['Gir Cow A2 Milk Source', 'Traditional Bilona (Bi-directional Churning)', 'Grainy texture & rich aroma', 'Boosts Immunity & Digestive Health'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-yellow-400 to-amber-600',
    imageEmoji: '🏺',
    imageUrl: '/images/desi_ghee.png',
  },
  {
    id: 'og2',
    name: 'Cold Pressed Yellow Mustard Oil',
    category: 'OIL & GHEE',
    basePrice: 240,
    currentPrice: 215,
    stock: 90,
    unit: '1 Litre Bottle',
    rating: 4.8,
    reviewsCount: 137,
    description: 'Cold-pressed in wood mortar (Kachi Ghani) at low temperatures. Retains original pungency, nutrients, and fatty acid balance. Non-deodorized.',
    benefits: ['Wood-Pressed (Kachi Ghani)', 'Low Temperature Extraction', 'Rich in Omega-3 & 6', 'Zero Additives/Preservatives'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-amber-500 to-yellow-600',
    imageEmoji: '🍾',
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'og3',
    name: 'Cold Pressed Virgin Coconut Oil',
    category: 'OIL & GHEE',
    basePrice: 380,
    currentPrice: 340,
    stock: 55,
    unit: '500 ml Bottle',
    rating: 4.9,
    reviewsCount: 104,
    description: 'Extracted from fresh organic coconut milk under cold conditions. Preserves delicate antioxidants, light aroma, and medium-chain fatty acids (Lauric acid).',
    benefits: ['100% Raw Virgin Coconut Milk source', 'High in Lauric Acid', 'Zero heat chemical extraction', 'Perfect for keto diet & hair care'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-200 to-stone-400',
    imageEmoji: '🍾',
    imageUrl: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'og4',
    name: 'Cold Pressed Sesame Oil',
    category: 'OIL & GHEE',
    basePrice: 340,
    currentPrice: 295,
    stock: 60,
    unit: '500 ml Bottle',
    rating: 4.7,
    reviewsCount: 52,
    description: 'Traditionally extracted cold pressed sesame (til) oil. Nutty aroma, high smoke point, and loaded with sesamol and sesamin antioxidants.',
    benefits: ['Wood-pressed sesame seeds', 'Rich in sesamol antioxidant', 'Highly stable for cooking', 'No chemical refine process'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-amber-600 to-yellow-700',
    imageEmoji: '🍾',
    imageUrl: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop',
  },

  // --- NUTS, SEEDS & SUPER FOODS ---
  {
    id: 'ns1',
    name: 'Raw Organic Almonds (Badam)',
    category: 'NUTS, SEEDS & SUPER FOODS',
    basePrice: 380,
    currentPrice: 340,
    stock: 75,
    unit: '250g',
    rating: 4.8,
    reviewsCount: 165,
    description: 'Premium quality California-style organic almonds, sun-dried and unsalted. Source of healthy fats, protein, and Vitamin E.',
    benefits: ['Sun-dried & Raw', 'Zero Additive/Salt', 'Rich in Vitamin E & Magnesium', 'Excellent for soaking'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-400 to-amber-800',
    imageEmoji: '🧆',
    imageUrl: 'https://images.unsplash.com/photo-1508840526849-14b9c8db67a3?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ns2',
    name: 'Raw Organic Chia Seeds',
    category: 'NUTS, SEEDS & SUPER FOODS',
    basePrice: 150,
    currentPrice: 120,
    stock: 110,
    unit: '150g',
    rating: 4.7,
    reviewsCount: 78,
    description: 'High-quality organic chia seeds, high in dietary fiber, protein, and plant-based Omega-3 fatty acids. Ideal for puddings and refreshing drinks.',
    benefits: ['Omega-3 Superfood', 'High Dietary Fiber', 'Pesticide-Free farming', 'Excellent swelling ratio'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-500 to-stone-700',
    imageEmoji: '🥤',
    imageUrl: 'https://images.unsplash.com/photo-1599307767316-776533bb941c?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ns3',
    name: 'Organic Walnut Kernels',
    category: 'NUTS, SEEDS & SUPER FOODS',
    basePrice: 420,
    currentPrice: 380,
    stock: 45,
    unit: '200g',
    rating: 4.8,
    reviewsCount: 89,
    description: 'Half-broken organic walnut kernels, raw and preservative-free. Rich in plant-based Omega-3 alpha-linolenic acid (ALA) for brain health.',
    benefits: ['Rich in Omega-3 ALA', 'Raw & Untouched halves', 'Brain health support', 'Vacuum packed for freshness'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-amber-800 to-stone-800',
    imageEmoji: '🧆',
    imageUrl: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ns4',
    name: 'Organic Raw Cashews',
    category: 'NUTS, SEEDS & SUPER FOODS',
    basePrice: 340,
    currentPrice: 299,
    stock: 65,
    unit: '250g',
    rating: 4.7,
    reviewsCount: 72,
    description: 'Premium quality raw, unsalted organic cashew nuts. Creamy, nutrient-rich, and free from processing sulfur.',
    benefits: ['Preservative & Sulfur free', 'Creamy raw texture', 'Rich in iron and zinc', 'Perfect dairy-free base'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-300 to-amber-200',
    imageEmoji: '🧆',
    imageUrl: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ns5',
    name: 'Raw Organic Pumpkin Seeds',
    category: 'NUTS, SEEDS & SUPER FOODS',
    basePrice: 160,
    currentPrice: 135,
    stock: 80,
    unit: '150g',
    rating: 4.6,
    reviewsCount: 50,
    description: 'Shelled raw pumpkin seeds, organically grown. Superb source of plant protein, magnesium, zinc, and healthy fatty acids.',
    benefits: ['Excellent Zinc & Magnesium source', 'High in plant protein', 'Shell-free raw kernels', 'Great salad topper'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-50 to-green-800',
    imageEmoji: '🥤',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600&auto=format&fit=crop',
  },

  // --- MILLETS & GLUTEN FREE ---
  {
    id: 'mg1',
    name: 'Unpolished Foxtail Millet Rice',
    category: 'MILLETS & GLUTEN FREE',
    basePrice: 140,
    currentPrice: 125,
    stock: 80,
    unit: '1 kg',
    rating: 4.6,
    reviewsCount: 64,
    description: '100% unpolished, nutrient-dense Foxtail Millet. High in dietary fiber, iron, and minerals. Perfect substitute for regular white rice.',
    benefits: ['100% Unpolished', 'Low Glycemic Index', 'Gluten-Free grain', 'Rich in fiber and minerals'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-yellow-200 to-amber-500',
    imageEmoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'mg2',
    name: 'Premium Pearl Millet (Bajra)',
    category: 'MILLETS & GLUTEN FREE',
    basePrice: 110,
    currentPrice: 89,
    stock: 90,
    unit: '1 kg',
    rating: 4.7,
    reviewsCount: 52,
    description: 'Organic whole grains of Pearl Millet (Bajra). Excellent winter crop, rich in iron, magnesium, and essential amino acids. Sourced from Rajasthan.',
    benefits: ['Vast Iron & Magnesium source', 'Traditional winter crop grain', 'Low carb index', 'Certified organic origin'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-400 to-amber-550',
    imageEmoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'mg3',
    name: 'Organic Sorghum Millet (Jowar)',
    category: 'MILLETS & GLUTEN FREE',
    basePrice: 120,
    currentPrice: 99,
    stock: 75,
    unit: '1 kg',
    rating: 4.8,
    reviewsCount: 46,
    description: 'Cleaned, whole grain organic Sorghum (Jowar). Heart-friendly grain high in fiber and calcium. Excellent for grinding fresh at home.',
    benefits: ['High in Dietary Fiber & Calcium', 'Promotes heart health', '100% natural, clean grains', 'Gluten free grain substitute'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-yellow-100 to-stone-400',
    imageEmoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1607623814075-e51df1bdc82f?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'mg4',
    name: 'Whole Finger Millet (Ragi Grains)',
    category: 'MILLETS & GLUTEN FREE',
    basePrice: 115,
    currentPrice: 95,
    stock: 85,
    unit: '1 kg',
    rating: 4.9,
    reviewsCount: 84,
    description: 'Pristine organic whole Finger Millet (Ragi) grains. Naturally loaded with calcium and easy to sprout. Superb food for infants and elders.',
    benefits: ['Extremely high calcium content', 'Sprout friendly seeds', 'Infant and elder superfood', 'Pesticide free farming crop'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-amber-850 to-stone-900',
    imageEmoji: '🌾',
    imageUrl: 'https://images.unsplash.com/photo-1615485290947-9f6e520037a3?q=80&w=600&auto=format&fit=crop',
  },

  // --- PLANT FORWARD & KETO ---
  {
    id: 'vk1',
    name: 'Vegan Cashew Butter (Creamy)',
    category: 'PLANT FORWARD & KETO',
    basePrice: 320,
    currentPrice: 280,
    stock: 30,
    unit: '200g Jar',
    rating: 4.8,
    reviewsCount: 43,
    description: 'Creamy cashew butter made purely from roasted organic cashews. Dairy-free, sugar-free, and oil-free. Highly keto-friendly.',
    benefits: ['100% Cashews Only', 'Dairy-Free & Vegan', 'Sugar-Free & Keto Friendly', 'Rich creamy texture'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-amber-100 to-orange-200',
    imageEmoji: '🥜',
    imageUrl: 'https://images.unsplash.com/photo-1590005354167-6da97870c913?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vk2',
    name: 'Organic Creamy Peanut Butter',
    category: 'PLANT FORWARD & KETO',
    basePrice: 180,
    currentPrice: 145,
    stock: 70,
    unit: '350g Jar',
    rating: 4.7,
    reviewsCount: 92,
    description: 'High-protein peanut butter made with 100% slow-roasted organic peanuts and a pinch of pink salt. Unsweetened and oil-separation natural.',
    benefits: ['No added sugar or palm oil', 'Excellent keto fat source', 'Packed with plant protein', 'Grown chemical free'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-orange-400 to-amber-700',
    imageEmoji: '🥜',
    imageUrl: 'https://images.unsplash.com/photo-1568644391225-47525b31df63?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vk3',
    name: 'Unsweetened Almond Butter',
    category: 'PLANT FORWARD & KETO',
    basePrice: 450,
    currentPrice: 399,
    stock: 25,
    unit: '200g Jar',
    rating: 4.8,
    reviewsCount: 51,
    description: 'Stone ground premium almond butter. Made from raw roasted organic almonds with skin to preserve dietary fiber and Vitamin E.',
    benefits: ['Stone ground raw almonds', 'Zero emulsifiers or sugar', 'Rich in Vitamin E & magnesium', 'Low net carb keto fuel'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-450 to-amber-800',
    imageEmoji: '🥜',
    imageUrl: 'https://images.unsplash.com/photo-1551224151-51224151a1ea?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'vk4',
    name: 'Vegan Organic Coconut Butter',
    category: 'PLANT FORWARD & KETO',
    basePrice: 280,
    currentPrice: 240,
    stock: 40,
    unit: '200g Jar',
    rating: 4.6,
    reviewsCount: 33,
    description: 'Pureed organic coconut flesh, stone-milled into a rich, creamy, melt-in-your-mouth spread. High in MCTs and completely fiber-rich.',
    benefits: ['Whole coconut pureed texture', 'MCT oil & fiber loaded', 'Dairy free coconut butter cream', 'Zero added sweeteners'],
    dietaryTags: ['organic', 'gluten-free', 'vegan', 'natural'],
    imageColor: 'from-stone-100 to-stone-300',
    imageEmoji: '🥜',
    imageUrl: 'https://images.unsplash.com/photo-1600189020840-e9db18f1d7b5?q=80&w=600&auto=format&fit=crop',
  },

  // --- PICKLES, SPICES & SWEETNERS ---
  {
    id: 'ps1',
    name: 'Traditional Organic Raw Honey',
    category: 'PICKLES, SPICES & SWEETNERS',
    basePrice: 390,
    currentPrice: 325,
    stock: 70,
    unit: '350g Glass Bottle',
    rating: 4.9,
    reviewsCount: 180,
    description: 'Unpasteurized, unfiltered honey collected from deep forest beehives. Retains natural pollens, enzymes, and antioxidants.',
    benefits: ['Raw & Unpasteurized', 'Deep Forest Multi-floral source', 'No Added Sugar Syrup', 'Antioxidant Rich'],
    dietaryTags: ['organic', 'gluten-free', 'natural'],
    imageColor: 'from-amber-300 to-orange-600',
    imageEmoji: '🍯',
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ps2',
    name: 'Homemade Spicy Mango Pickle',
    category: 'PICKLES, SPICES & SWEETNERS',
    basePrice: 180,
    currentPrice: 155,
    stock: 85,
    unit: '400g Glass Jar',
    rating: 4.7,
    reviewsCount: 92,
    description: 'Traditional home-style sun-dried mango pickle, prepared in cold-pressed mustard oil with organic hand-ground spices. No artificial preservatives.',
    benefits: ['Sun-dried traditionally', 'Cold Pressed Mustard Oil preservation', 'No artificial color or preservatives', 'Authentic Grandma recipe'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-yellow-600 to-red-700',
    imageEmoji: '🌶️',
    imageUrl: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ps3',
    name: 'Homemade Tangy Lemon Pickle',
    category: 'PICKLES, SPICES & SWEETNERS',
    basePrice: 170,
    currentPrice: 140,
    stock: 60,
    unit: '400g Glass Jar',
    rating: 4.6,
    reviewsCount: 43,
    description: 'Oil-free, spiced lemon pickle aged naturally under the sun. Soft, tangy skins mixed with cumin, carom seeds, and organic spices.',
    benefits: ['Oil-free sun matured', 'Tangy & digestive support', 'Zesty classic lemon peel', '100% preservative free'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-yellow-550 to-yellow-700',
    imageEmoji: '🌶️',
    imageUrl: 'https://images.unsplash.com/photo-1604152135912-04a022e23696?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ps4',
    name: 'Organic Jaggery Powder (Gud)',
    category: 'PICKLES, SPICES & SWEETNERS',
    basePrice: 90,
    currentPrice: 75,
    stock: 120,
    unit: '500g',
    rating: 4.8,
    reviewsCount: 156,
    description: 'Made from organic sugarcane juice, evaporated and powdered. Unrefined, rich in iron, minerals, and free from processing sulfur.',
    benefits: ['Unrefined Sugarcane Sweetener', 'Rich in Iron & minerals', 'Sulfur free processing', 'Healthy sugar alternative'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-amber-400 to-orange-700',
    imageEmoji: '🍯',
    imageUrl: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'ps5',
    name: 'Homemade Garlic & Chili Pickle',
    category: 'PICKLES, SPICES & SWEETNERS',
    basePrice: 190,
    currentPrice: 165,
    stock: 55,
    unit: '300g Glass Jar',
    rating: 4.8,
    reviewsCount: 54,
    description: 'Pungent garlic cloves and hot green chilies pickled with mustard seeds and cold-pressed mustard oil. Perfect pairing for parathas.',
    benefits: ['Strong savory garlic kick', 'Aged with spicy chilies', 'Cold-pressed oil preservation', 'Natural taste and color'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-red-600 to-yellow-800',
    imageEmoji: '🌶️',
    imageUrl: 'https://images.unsplash.com/photo-1540120059648-51842d3ad363?q=80&w=600&auto=format&fit=crop',
  },

  // --- BAKERY & BREAKFAST ---
  {
    id: 'bb1',
    name: 'Artisanal Organic Sourdough Bread',
    category: 'BAKERY & BREAKFAST',
    basePrice: 130,
    currentPrice: 115,
    stock: 15,
    unit: '400g Loaf',
    rating: 4.8,
    reviewsCount: 76,
    description: 'Freshly baked artisanal bread made using wild sourdough starter and stone-ground flour. 36-hour fermentation makes it incredibly soft and gut-friendly.',
    benefits: ['36-hour Fermentation', 'No Commercial Yeast', 'Gut Friendly & Easily Digestible', 'Baked to Order Daily'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-300 to-amber-900',
    imageEmoji: '🍞',
    imageUrl: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'bb2',
    name: 'Organic Oats & Honey Granola',
    category: 'BAKERY & BREAKFAST',
    basePrice: 280,
    currentPrice: 245,
    stock: 45,
    unit: '350g Pack',
    rating: 4.7,
    reviewsCount: 59,
    description: 'Crispy clusters of organic rolled oats, almonds, and pumpkin seeds baked with wild forest honey and virgin coconut oil.',
    benefits: ['Rich in whole rolled oats', 'Baked with honey & coconut oil', 'Magnesium & fiber dense', 'No refined sugar syrups'],
    dietaryTags: ['organic', 'gluten-free', 'natural'],
    imageColor: 'from-orange-200 to-amber-600',
    imageEmoji: '🥣',
    imageUrl: 'https://images.unsplash.com/photo-1517093602195-b40af9688b46?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'bb3',
    name: 'Multigrain Toasting Bread',
    category: 'BAKERY & BREAKFAST',
    basePrice: 90,
    currentPrice: 75,
    stock: 35,
    unit: '400g Loaf',
    rating: 4.5,
    reviewsCount: 88,
    description: 'Fresh baked sandwich loaf using stone ground wheat, rye, flax, sunflower, and sesame seeds. Rich, hearty, and full of fiber.',
    benefits: ['Packed with 5 organic seeds', 'High dietary fiber loaf', 'Freshly baked daily', 'No chemical dough conditioners'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-200 to-yellow-600',
    imageEmoji: '🍞',
    imageUrl: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'bb4',
    name: 'Fresh Baked Butter Croissant',
    category: 'BAKERY & BREAKFAST',
    basePrice: 120,
    currentPrice: 99,
    stock: 20,
    unit: 'Pack of 2',
    rating: 4.8,
    reviewsCount: 64,
    description: 'Traditional french style laminated croissants, baked to a golden crisp using organic butter and stone ground flour. Flaky, light, and delicious.',
    benefits: ['Laminated with organic butter', 'Flaky golden crust', 'Baked fresh every morning', 'No trans fats'],
    dietaryTags: ['natural'],
    imageColor: 'from-yellow-300 to-amber-500',
    imageEmoji: '🥐',
    imageUrl: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'bb5',
    name: 'Sprouted Ragi Digestives (Cookies)',
    category: 'BAKERY & BREAKFAST',
    basePrice: 140,
    currentPrice: 120,
    stock: 50,
    unit: '200g Pack',
    rating: 4.6,
    reviewsCount: 42,
    description: 'Healthy cookies baked with sprouted ragi flour, organic jaggery, and ghee. High in calcium and completely free from refined white flour (maida).',
    benefits: ['Zero Maida (Refined Flour)', 'Sweetened with organic jaggery', 'Sprouted Ragi high calcium', 'Aged cow ghee richness'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-700 to-stone-850',
    imageEmoji: '🍪',
    imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop',
  },

  // --- DEALS ---
  {
    id: 'dl1',
    name: 'Immunity Builder Combo',
    category: 'DEALS',
    basePrice: 1540,
    currentPrice: 1299,
    stock: 20,
    unit: 'Combo Pack (3 Items)',
    rating: 4.9,
    reviewsCount: 38,
    description: 'A curated health pack containing 1x Raw Honey (350g), 1x Gir Cow Ghee (500ml), and 1x Lakadong Turmeric Powder (150g). Sourced with care.',
    benefits: ['Over 15% Combo Savings', 'Antioxidant & Ayurvedic boosters', 'Premium quality, certified items', 'Perfect gifting pack'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-emerald-400 to-teal-700',
    imageEmoji: '🎁',
    imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'dl2',
    name: 'Weekly Organic Vegetable Basket',
    category: 'DEALS',
    basePrice: 480,
    currentPrice: 380,
    stock: 40,
    unit: '5kg Assorted Basket',
    rating: 4.7,
    reviewsCount: 99,
    description: 'A weekly staple assortment containing potatoes (1.5kg), onions (1.5kg), tomatoes (1kg), and seasonal leafy greens (1kg). Direct-from-farm fresh.',
    benefits: ['Save 20% on retail prices', 'Farm-fresh daily sorting', 'Delhi/NCR next-day morning drop', 'Eco-friendly jute bag package'],
    dietaryTags: ['organic', 'vegan', 'natural'],
    imageColor: 'from-green-500 to-lime-500',
    imageEmoji: '🧺',
    imageUrl: '/images/fresh_vegetables.png',
  },
  {
    id: 'dl3',
    name: 'Healthy Morning Breakfast Combo',
    category: 'DEALS',
    basePrice: 500,
    currentPrice: 410,
    stock: 35,
    unit: 'Combo Pack (2 Items)',
    rating: 4.8,
    reviewsCount: 29,
    description: 'Save big with this breakfast combo containing 1x Oats & Honey Granola (350g) and 1x Artisanal Sourdough Bread (400g). Perfect for wholesome breakfasts.',
    benefits: ['Save 18% on retail prices', 'Freshly baked bread', 'Nutritious honey oats clusters', 'Healthy start for the family'],
    dietaryTags: ['organic', 'natural'],
    imageColor: 'from-amber-250 to-orange-450',
    imageEmoji: '🎁',
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=600&auto=format&fit=crop',
  }
];

export const useGroceryStore = create<GroceryStore>((set, get) => ({
  products: initialProducts,
  cart: [],
  wishlist: [],
  searchQuery: '',
  selectedCategory: 'ALL',
  appliedCoupon: null,
  discountPercentage: 0,
  user: {
    name: '',
    email: '',
    phone: '',
    addresses: [],
    isLoggedIn: false,
  },
  orders: [],
  quickViewProduct: null,
  isCartOpen: false,
  isCheckoutOpen: false,
  isProfileOpen: false,
  isWishlistOpen: false,

  addToCart: (product, qty = 1) => {
    const { cart } = get();
    const existingIndex = cart.findIndex((item) => item.product.id === product.id);

    if (existingIndex > -1) {
      const newCart = [...cart];
      newCart[existingIndex].quantity += qty;
      set({ cart: newCart });
    } else {
      set({ cart: [...cart, { product, quantity: qty }] });
    }
  },

  removeFromCart: (productId) => {
    const { cart } = get();
    set({ cart: cart.filter((item) => item.product.id !== productId) });
  },

  updateCartQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
      return;
    }
    const { cart } = get();
    const newCart = cart.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ cart: newCart });
  },

  clearCart: () => set({ cart: [] }),

  toggleWishlist: (productId) => {
    const { wishlist } = get();
    const isWishlisted = wishlist.includes(productId);
    if (isWishlisted) {
      set({ wishlist: wishlist.filter((id) => id !== productId) });
    } else {
      set({ wishlist: [...wishlist, productId] });
    }
  },

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedCategory: (category) => set({ selectedCategory: category }),

  applyCoupon: (code) => {
    const cleanCode = code.toUpperCase().trim();
    if (cleanCode === 'ROOTZAPP5') {
      set({ appliedCoupon: 'ROOTZAPP5', discountPercentage: 5 });
      return true;
    }
    return false;
  },

  removeCoupon: () => set({ appliedCoupon: null, discountPercentage: 0 }),

  registerUser: (name, email, phone) => {
    set({
      user: {
        name,
        email,
        phone,
        addresses: ['12, Golf Links Rd, New Delhi, 110003'],
        isLoggedIn: true,
      },
    });
  },

  loginUser: (email) => {
    if (email.includes('@')) {
      set({
        user: {
          name: 'Gowtham Palanivel',
          email,
          phone: '+91 98765 43210',
          addresses: ['12, Golf Links Rd, New Delhi, 110003'],
          isLoggedIn: true,
        },
      });
      return true;
    }
    return false;
  },

  logoutUser: () => {
    set({
      user: {
        name: '',
        email: '',
        phone: '',
        addresses: [],
        isLoggedIn: false,
      },
      orders: [],
    });
  },

  placeOrder: (address, paymentMethod) => {
    const { cart, discountPercentage } = get();
    if (cart.length === 0) return null;

    const subtotal = cart.reduce((acc, item) => acc + item.product.currentPrice * item.quantity, 0);
    const discount = Math.round(subtotal * (discountPercentage / 100));
    const deliveryCharge = subtotal >= 999 ? 0 : 70;
    const gst = Math.round((subtotal - discount) * 0.05); // 5% GST
    const total = subtotal - discount + deliveryCharge + gst;

    const newOrder: Order = {
      id: 'RTZ-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      items: [...cart],
      subtotal,
      discount,
      deliveryCharge,
      gst,
      total,
      address,
      paymentMethod,
      status: 'Order Placed',
      trackingNumber: 'IN-' + Math.floor(10000000 + Math.random() * 90000000) + '-RTZ',
    };

    set((state) => ({
      orders: [newOrder, ...state.orders],
      cart: [],
      appliedCoupon: null,
      discountPercentage: 0,
    }));

    return newOrder;
  },

  setQuickViewProduct: (product) => set({ quickViewProduct: product }),
  setCartOpen: (open) => set({ isCartOpen: open }),
  setCheckoutOpen: (open) => set({ isCheckoutOpen: open }),
  setProfileOpen: (open) => set({ isProfileOpen: open }),
  setWishlistOpen: (open) => set({ isWishlistOpen: open }),
}));
