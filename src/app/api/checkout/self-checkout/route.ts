import { NextRequest, NextResponse } from 'next/server';

interface CheckoutSession {
  id: string;
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  gst: number;
  total: number;
  status: 'active' | 'completed' | 'abandoned';
  startTime: Date;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerId, items } = body;

    // Calculate totals
    const subtotal = items.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );
    const gst = subtotal * 0.05; // 5% GST for groceries
    const total = subtotal + gst;

    const session: CheckoutSession = {
      id: `checkout-${Date.now()}`,
      items,
      subtotal,
      gst,
      total,
      status: 'active',
      startTime: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: session,
      message: 'Self-checkout session created',
      qrCode: `https://qr.example.com/${session.id}`,
      instructions: [
        'Scan QR code on customer phone',
        'Customer adds items to cart',
        'Process payment via UPI/Card',
        'Generate receipt',
      ],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const sessionId = request.nextUrl.searchParams.get('sessionId');

    const mockSession: CheckoutSession = {
      id: sessionId || 'checkout-123',
      items: [
        { productId: '1', quantity: 2, price: 42 },
        { productId: '2', quantity: 1, price: 40 },
      ],
      subtotal: 124,
      gst: 6.2,
      total: 130.2,
      status: 'active',
      startTime: new Date(),
    };

    return NextResponse.json({
      success: true,
      data: mockSession,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch checkout session' },
      { status: 500 }
    );
  }
}
