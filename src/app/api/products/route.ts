import { NextRequest, NextResponse } from 'next/server';

// Mock database - in production, use a real database like MongoDB or PostgreSQL
interface Product {
  id: string;
  name: string;
  basePrice: number;
  currentPrice: number;
  stock: number;
}

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Milk',
    basePrice: 60,
    currentPrice: 42, // 30% discount for expiry
    stock: 45,
  },
  { id: '2', name: 'Bread', basePrice: 40, currentPrice: 40, stock: 120 },
  { id: '3', name: 'Eggs', basePrice: 25, currentPrice: 25, stock: 200 },
];

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      success: true,
      data: mockProducts,
      message: 'Products fetched successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newProduct: Product = {
      id: Date.now().toString(),
      name: body.name,
      basePrice: body.basePrice,
      currentPrice: body.currentPrice || body.basePrice,
      stock: body.stock,
    };

    return NextResponse.json({
      success: true,
      data: newProduct,
      message: 'Product created successfully',
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
