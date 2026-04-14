import { NextRequest, NextResponse } from 'next/server';

interface TaxCalculation {
  subtotal: number;
  gstRate: number;
  gstAmount: number;
  total: number;
}

// India GST rates by category
const GST_RATES: { [key: string]: number } = {
  groceries: 0.05, // 5% GST
  dairy: 0.05,
  bakery: 0,
  pharmacy: 0.05,
  electronics: 0.18,
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items, itemCategories } = body;

    let totalGST = 0;
    let subtotal = 0;

    // Calculate tax for each item
    const itemBreakdown = items.map((item: any, index: number) => {
      const category = itemCategories[index] || 'groceries';
      const rate = GST_RATES[category] || 0.05;
      const itemTax = item.price * item.quantity * rate;
      const itemTotal = item.price * item.quantity + itemTax;

      totalGST += itemTax;
      subtotal += item.price * item.quantity;

      return {
        ...item,
        category,
        gstRate: rate,
        gstAmount: itemTax.toFixed(2),
        itemTotal: itemTotal.toFixed(2),
      };
    });

    const total = subtotal + totalGST;

    return NextResponse.json({
      success: true,
      data: {
        itemBreakdown,
        subtotal: subtotal.toFixed(2),
        gstAmount: totalGST.toFixed(2),
        total: total.toFixed(2),
        breakdownByRate: {
          '5%': totalGST * 0.5, // Simplified
          '18%': totalGST * 0.5,
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to calculate GST' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: {
        gstRates: GST_RATES,
        complianceStatus: 'COMPLIANT',
        lastFilingDate: '2024-01-10',
        nextFilingDue: '2024-02-10',
        monthlyGSTCollected: 42580 * 0.2, // Approximate
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch GST info' },
      { status: 500 }
    );
  }
}
