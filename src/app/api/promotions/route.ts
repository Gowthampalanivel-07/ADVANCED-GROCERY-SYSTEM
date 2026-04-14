import { NextRequest, NextResponse } from 'next/server';

interface Promotion {
  id: string;
  type: string;
  description: string;
  discount: number;
  applicableProducts: string[];
  minPurchase: number;
  maxRedemptions: number;
  currentRedemptions: number;
  validFrom: Date;
  validTo: Date;
  status: string;
}

const mockPromotions: Promotion[] = [
  {
    id: 'promo-1',
    type: 'Buy 2 Get 1 (Milk)',
    description: 'Buy 2 milk cartons, get 1 free',
    discount: 50,
    applicableProducts: ['1'],
    minPurchase: 84,
    maxRedemptions: 100,
    currentRedemptions: 23,
    validFrom: new Date(),
    validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: 'promo-2',
    type: 'Combo Discount',
    description: 'Milk + Bread + Eggs = 15% off',
    discount: 15,
    applicableProducts: ['1', '2', '3'],
    minPurchase: 105,
    maxRedemptions: 150,
    currentRedemptions: 45,
    validFrom: new Date(),
    validTo: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
  {
    id: 'promo-3',
    type: 'Seasonal Bundle',
    description: 'All dairy items 20% off',
    discount: 20,
    applicableProducts: ['1', '4', '5'],
    minPurchase: 200,
    maxRedemptions: 200,
    currentRedemptions: 89,
    validFrom: new Date(),
    validTo: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    status: 'active',
  },
];

export async function GET(request: NextRequest) {
  try {
    const status = request.nextUrl.searchParams.get('status') || 'active';

    const filtered = mockPromotions.filter((p) => p.status === status);

    return NextResponse.json({
      success: true,
      data: {
        promotions: filtered,
        stats: {
          activeCount: mockPromotions.filter((p) => p.status === 'active')
            .length,
          totalRedemptions: mockPromotions.reduce((sum, p) => sum + p.currentRedemptions, 0),
          totalDiscount: mockPromotions.reduce((sum, p) => sum + p.discount, 0),
          suggestions: [
            'Create weekend flash sale (highest traffic)',
            'Bundle slow-moving items with popular ones',
            'Time-based discounts for off-peak hours',
          ],
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch promotions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, description, discount, applicableProducts, minPurchase } = body;

    const newPromo: Promotion = {
      id: `promo-${Date.now()}`,
      type,
      description,
      discount,
      applicableProducts,
      minPurchase,
      maxRedemptions: 100,
      currentRedemptions: 0,
      validFrom: new Date(),
      validTo: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'active',
    };

    return NextResponse.json({
      success: true,
      data: newPromo,
      message: 'Promotion created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create promotion' },
      { status: 500 }
    );
  }
}
