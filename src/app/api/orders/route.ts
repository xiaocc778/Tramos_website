import { NextResponse } from 'next/server';

// Mock orders data
interface Order {
  id: string;
  orderNumber: string;
  items: unknown[];
  customerInfo: unknown;
  shippingAddress: unknown;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: string;
  createdAt: string;
  updatedAt?: string;
}

const orders: Order[] = [];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');

  if (orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json(order);
  }

  // In production, filter by userId from Supabase
  return NextResponse.json(orders);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const { items, customerInfo, shippingAddress, total } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Generate order number
    const orderNumber = `HT${Date.now()}${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    const newOrder = {
      id: Date.now().toString(),
      orderNumber,
      items,
      customerInfo,
      shippingAddress,
      subtotal: total,
      shipping: 0,
      tax: 0,
      total,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    orders.push(newOrder);

    // In production, save to Supabase
    // const supabase = createClient();
    // const { data, error } = await supabase.from('orders').insert(newOrder);

    return NextResponse.json(newOrder, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderId, status } = body;

    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex === -1) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      updatedAt: new Date().toISOString()
    };

    return NextResponse.json(orders[orderIndex]);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
