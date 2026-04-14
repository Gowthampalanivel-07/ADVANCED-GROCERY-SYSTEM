import { NextRequest, NextResponse } from 'next/server';

// Dynamic Pricing Engine
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { productId, demand, expiryDaysLeft, timeOfDay } = body;

    // Calculate dynamic price
    let discountPercent = 0;

    // Expiry discount: 30% off if expiring within 2 days
    if (expiryDaysLeft <= 2) {
      discountPercent = 30;
    } else if (expiryDaysLeft <= 5) {
      discountPercent = 15;
    }

    // Demand multiplier (simplified)
    const demandMultiplier = demand > 0.8 ? 1.2 : demand < 0.3 ? 0.85 : 1.0;

    // Time of day discount
    const timeDiscounts: { [key: string]: number } = {
      morning: 0, // 6am-12pm
      afternoon: 0, // 12pm-5pm
      evening: 10, // 5pm-10pm - evening discounts
      night: 5, // 10pm-6am
    };

    const timeDiscount = timeDiscounts[timeOfDay] || 0;

    const totalDiscount = Math.min(discountPercent + timeDiscount, 40); // Max 40% discount

    return NextResponse.json({
      success: true,
      data: {
        productId,
        discountPercent: totalDiscount,
        demandMultiplier,
        reasoning: {
          expiryDays: expiryDaysLeft,
          expiryDiscount: discountPercent,
          timeDiscount,
          demand,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate pricing' },
      { status: 500 }
    );
  }
}
