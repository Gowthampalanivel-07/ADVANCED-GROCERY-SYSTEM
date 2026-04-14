import { NextRequest, NextResponse } from 'next/server';

interface ProfitReport {
  productId: string;
  productName: string;
  revenue: number;
  costOfGoodsSold: number;
  profit: number;
  profitMargin: number;
  unitsSold: number;
}

export async function GET(request: NextRequest) {
  try {
    const period = request.nextUrl.searchParams.get('period') || 'daily';

    const mockReports: ProfitReport[] = [
      {
        productId: '1',
        productName: 'Milk',
        revenue: 18900,
        costOfGoodsSold: 12600,
        profit: 6300,
        profitMargin: 33.3,
        unitsSold: 450,
      },
      {
        productId: '2',
        productName: 'Bread',
        revenue: 15200,
        costOfGoodsSold: 9880,
        profit: 5320,
        profitMargin: 35.0,
        unitsSold: 380,
      },
      {
        productId: '3',
        productName: 'Eggs',
        revenue: 8000,
        costOfGoodsSold: 6560,
        profit: 1440,
        profitMargin: 18.0,
        unitsSold: 320,
      },
      {
        productId: '4',
        productName: 'Cheese',
        revenue: 12180,
        costOfGoodsSold: 7050,
        profit: 5130,
        profitMargin: 42.1,
        unitsSold: 290,
      },
    ];

    const totalRevenue = mockReports.reduce((sum, r) => sum + r.revenue, 0);
    const totalProfit = mockReports.reduce((sum, r) => sum + r.profit, 0);
    const avgMargin = (totalProfit / totalRevenue * 100).toFixed(1);

    return NextResponse.json({
      success: true,
      data: {
        period,
        reports: mockReports,
        summary: {
          totalRevenue,
          totalCost: totalRevenue - totalProfit,
          totalProfit,
          averageMargin: parseFloat(avgMargin),
          topProductByProfit: mockReports[0],
          topProductByMargin: mockReports[3],
        },
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch profit reports' },
      { status: 500 }
    );
  }
}
