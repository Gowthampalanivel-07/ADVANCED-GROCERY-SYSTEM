import { NextRequest, NextResponse } from 'next/server';

interface InventoryItem {
  productId: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  supplier: string;
  lastRestockDate: string;
  daysUntilExpiry: number;
}

const mockInventory: InventoryItem[] = [
  {
    productId: '1',
    productName: 'Milk',
    currentStock: 25,
    reorderLevel: 50,
    supplier: 'Fresh Dairy Co',
    lastRestockDate: '2024-01-10',
    daysUntilExpiry: 2,
  },
  {
    productId: '2',
    productName: 'Bread',
    currentStock: 85,
    reorderLevel: 60,
    supplier: 'Local Bakery',
    lastRestockDate: '2024-01-11',
    daysUntilExpiry: 5,
  },
  {
    productId: '3',
    productName: 'Eggs',
    currentStock: 180,
    reorderLevel: 100,
    supplier: 'Farm Fresh',
    lastRestockDate: '2024-01-09',
    daysUntilExpiry: 14,
  },
];

export async function GET(request: NextRequest) {
  try {
    const filter = request.nextUrl.searchParams.get('filter');

    let filtered = mockInventory;
    if (filter === 'low-stock') {
      filtered = mockInventory.filter((item) => item.currentStock <= item.reorderLevel);
    } else if (filter === 'expiring-soon') {
      filtered = mockInventory.filter((item) => item.daysUntilExpiry <= 5);
    }

    return NextResponse.json({
      success: true,
      data: {
        items: filtered,
        stats: {
          totalItems: mockInventory.length,
          lowStockCount: mockInventory.filter((i) => i.currentStock <= i.reorderLevel)
            .length,
          expiringCount: mockInventory.filter((i) => i.daysUntilExpiry <= 5).length,
          totalValue: 285420,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch inventory' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check if auto-reorder should be triggered
    const shouldReorder =
      body.currentStock <= body.reorderLevel;

    if (shouldReorder) {
      // Create purchase order automatically
      console.log('Creating auto purchase order for:', body.productId);
    }

    return NextResponse.json({
      success: true,
      autoReorderTriggered: shouldReorder,
      message: 'Inventory updated',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update inventory' },
      { status: 500 }
    );
  }
}
