'use client';

import { useGroceryStore } from '@/stores/groceryStore';

export function Footer() {
  const { setSelectedCategory } = useGroceryStore();

  const shopLinks = [
    { label: 'Fresh Mangoes', category: 'MANGOES' },
    { label: 'Veg & Fruits', category: 'VEG & FRUITS' },
    { label: 'Heritage Rice', category: 'HERITAGE RICE' },
    { label: 'Ancient Flours', category: 'ANCIENT FLOURS' },
    { label: 'Pure Cow Ghee', category: 'OIL & GHEE' },
    { label: 'Superfoods', category: 'NUTS, SEEDS & SUPER FOODS' },
  ];

  const infoLinks = ['About Us', 'Bulk Orders', 'Gifting catalogue', 'Farm Partners', 'Terms & Conditions', 'Privacy Policy'];

  return (
    <footer className="w-full bg-white text-foreground border-t border-border-color pt-12 pb-8 px-4 relative overflow-hidden select-none">
      
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary rounded-full blur-3xl" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-1 cursor-pointer" onClick={() => setSelectedCategory('ALL')}>
              <div className="text-primary flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17,8C8,8,4,16,4,16s4-2,9-5c-5,3-8,9-8,9S12,16,17,8z M12,2C12,2,3,6,3,12s9,10,9,10s9-4,9-10S12,2,12,2z" />
                </svg>
              </div>
              <div className="flex flex-col justify-start">
                <span className="text-lg font-black tracking-tight text-primary leading-none">ROOTZ</span>
                <span className="text-[8px] font-semibold tracking-[0.25em] text-accent leading-none uppercase">ORGANICS</span>
              </div>
            </div>
            <p className="text-xs text-foreground/80 leading-relaxed">
              Shop online organic groceries in India for clean, gluten-free, millet, vegan foods, fresh bakery, baby food & daily essentials—pure, honest nutrition.
            </p>
            <div className="text-xs font-bold text-primary">
              📞 Helpline: +91 98765 43210
            </div>
          </div>

          {/* Shopper Links Column */}
          <div>
            <h4 className="text-xs font-black text-primary uppercase tracking-wider mb-3">Shop Categories</h4>
            <ul className="space-y-2 text-xs">
              {shopLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => setSelectedCategory(link.category)}
                    className="hover:text-accent hover:underline transition-colors font-medium cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information Links Column */}
          <div>
            <h4 className="text-xs font-black text-primary uppercase tracking-wider mb-3">Information</h4>
            <ul className="space-y-2 text-xs text-foreground/80">
              {infoLinks.map((item) => (
                <li key={item}>
                  <button className="hover:text-accent hover:underline transition-colors font-medium cursor-pointer">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter / Verification Column */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-primary uppercase tracking-wider mb-3">Pure & Certified</h4>
            <p className="text-xs text-foreground/80 leading-relaxed">
              Our products are certified by PGS-India, NPOP, and USDA Organic standards. Assured quality control and daily lab tests.
            </p>
            
            {/* Payment badge mocks */}
            <div className="pt-2">
              <span className="text-[9px] font-bold text-foreground/50 block uppercase mb-1">We Accept Secure Payments</span>
              <div className="flex gap-2 text-xl filter grayscale opacity-60">
                <span>💳</span>
                <span>📱</span>
                <span>🏦</span>
                <span>📦</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom copyright details */}
        <div className="border-t border-border-color pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-semibold text-foreground/60 gap-4">
          <p>© 2026 Rootz Organics Private Limited. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-accent">Facebook</span>
            <span className="cursor-pointer hover:text-accent">Instagram</span>
            <span className="cursor-pointer hover:text-accent">WhatsApp</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
