import { NextRequest, NextResponse } from 'next/server';

interface FraudAlert {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: Date;
  affectedRecords: string[];
}

const mockAlerts: FraudAlert[] = [
  {
    id: 'alert-1',
    type: 'Unusual Refunds',
    severity: 'high',
    description: 'Staff member processed 12 refunds in 30 minutes (avg 2 per day)',
    detectedAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    affectedRecords: ['staff-id-5', 'txn-2024-001', 'txn-2024-002'],
  },
  {
    id: 'alert-2',
    type: 'Price Tampering',
    severity: 'medium',
    description: 'Manual price override on 3 items in past 24 hours',
    detectedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    affectedRecords: ['product-1', 'product-2', 'product-3'],
  },
  {
    id: 'alert-3',
    type: 'Discount Abuse',
    severity: 'high',
    description: 'Customer applied coupon multiple times for same transaction',
    detectedAt: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    affectedRecords: ['txn-2024-150', 'coupon-XYZ123'],
  },
];

export async function GET(request: NextRequest) {
  try {
    const severity = request.nextUrl.searchParams.get('severity');
    const resolved = request.nextUrl.searchParams.get('resolved');

    let filtered = mockAlerts;

    if (severity) {
      filtered = filtered.filter((a) => a.severity === severity);
    }

    return NextResponse.json({
      success: true,
      data: {
        alerts: filtered,
        stats: {
          totalAlerts: mockAlerts.length,
          criticalCount: mockAlerts.filter((a) => a.severity === 'critical')
            .length,
          highCount: mockAlerts.filter((a) => a.severity === 'high').length,
          fraudProbability: 'MEDIUM',
          aiConfidence: 0.87,
        },
        recommendations: [
          'Review staff member transactions (ID: staff-id-5)',
          'Verify coupon usage with customer',
          'Audit manual price overrides',
          'Enable transaction verification alerts',
        ],
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch fraud alerts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, description, affectedRecords } = body;

    const newAlert: FraudAlert = {
      id: `alert-${Date.now()}`,
      type,
      severity: 'medium',
      description,
      detectedAt: new Date(),
      affectedRecords,
    };

    console.log('Fraud alert recorded:', newAlert);

    return NextResponse.json({
      success: true,
      data: newAlert,
      message: 'Fraud alert recorded and logged',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to record fraud alert' },
      { status: 500 }
    );
  }
}
