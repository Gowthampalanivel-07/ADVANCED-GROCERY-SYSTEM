'use client';

import { CartDrawer } from '@/components/grocery/CartDrawer';
import { CheckoutModal } from '@/components/grocery/CheckoutModal';
import { UserAccountModal } from '@/components/grocery/UserAccountModal';
import { WishlistModal } from '@/components/grocery/WishlistModal';
import { QuickViewModal } from '@/components/grocery/QuickViewModal';

export function GroceryModals() {
  return (
    <>
      <CartDrawer />
      <CheckoutModal />
      <UserAccountModal />
      <WishlistModal />
      <QuickViewModal />
    </>
  );
}
