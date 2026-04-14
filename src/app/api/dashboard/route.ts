import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const today = new Date().toLocaleDateString();

    const dashboardData = {
      kpis: {
        todayRevenue: 42580,
        todayProfit: 12025,
        profitMargin: 28.3,
        customerCount: 1284,
        averageTransaction: 33.15,
        inventoryValue: 285420,
      },
      topProducts: [
        { id: '1', name: 'Milk', sales: 450, revenue: 18900, margin: 33.3 },
        { id: '2', name: 'Bread', sales: 380, revenue: 15200, margin: 35.0 },
        { id: '3', name: 'Eggs', sales: 320, revenue: 8000, margin: 18.0 },
        { id: '4', name: 'Cheese', sales: 290, revenue: 12180, margin: 42.1 },
      ],
      alerts: [
        {
          type: 'Low Stock',
          severity: 'warning',
          message: 'Milk stock below reorder level',
          action: 'Create PO',
        },
        {
          type: 'Expiry Alert',
          severity: 'critical',
          message: '12 items expiring in 2 days',
          action: 'Apply discount',
        },
        {
          type: 'Fraud Detected',
          severity: 'critical',
          message: 'Unusual refund pattern detected',
          action: 'Review',
        },
      ],
      performance: {
        dayVsYesterday: '+12.5%',
        weekVsLastWeek: '+8.3%',
        monthVsLastMonth: '+15.2%',
      },
      zones: [
        { name: 'Entrance', traffic: 95, efficiency: 85 },
        { name: 'Dairy', traffic: 85, efficiency: 92 },
        { name: 'Produce', traffic: 72, efficiency: 78 },
        { name: 'Checkout', traffic: 65, efficiency: 70 },
      ],
      timestamp: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
