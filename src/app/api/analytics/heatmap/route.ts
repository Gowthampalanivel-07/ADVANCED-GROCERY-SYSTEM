import { NextRequest, NextResponse } from 'next/server';

interface HeatmapData {
  zoneId: string;
  trafficScore: number;
  avgDurationSeconds: number;
  timestamp: Date;
}

const mockHeatmapData: HeatmapData[] = [
  {
    zoneId: 'entrance',
    trafficScore: 95,
    avgDurationSeconds: 8,
    timestamp: new Date(),
  },
  {
    zoneId: 'dairy',
    trafficScore: 85,
    avgDurationSeconds: 120,
    timestamp: new Date(),
  },
  {
    zoneId: 'produce',
    trafficScore: 72,
    avgDurationSeconds: 180,
    timestamp: new Date(),
  },
  {
    zoneId: 'checkout',
    trafficScore: 65,
    avgDurationSeconds: 240,
    timestamp: new Date(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const dayOfWeek = new Date().getDay();
    const hour = new Date().getHours();

    return NextResponse.json({
      success: true,
      data: {
        zones: mockHeatmapData,
        insights: [
          'Peak traffic in dairy zone (85% of store traffic)',
          'Customers spend avg 2 min in produce section',
          'Checkout zone needs another counter (avg wait 240s)',
          'Entrance zone is high-traffic but low-dwell area',
        ],
        recommendations: [
          'Place impulse-buy items near checkout',
          'Cross-merchandise dairy with produce nearby',
          'Add promotional signage in high-dwell zones',
        ],
        dayOfWeek,
        hour,
        timestamp: new Date(),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch heatmap data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, zoneId, durationSeconds, productsViewed } = body;

    // Process and store heatmap data
    console.log('Recording heatmap data:', {
      customerId,
      zoneId,
      durationSeconds,
      productsViewed,
    });

    return NextResponse.json({
      success: true,
      message: 'Heatmap data recorded',
      recordedAt: new Date(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to record heatmap data' },
      { status: 500 }
    );
  }
}
