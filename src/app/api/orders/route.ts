import { NextResponse } from 'next/server';
import { orderService, type CreateOrderInput } from '@/lib/services/order.service';
import { createServerClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderId = searchParams.get('orderId');
  const orderNumber = searchParams.get('orderNumber');

  try {
    if (orderId) {
      const order = await orderService.getById(orderId);
      return NextResponse.json(order);
    }

    if (orderNumber) {
      const order = await orderService.getByOrderNumber(orderNumber);
      return NextResponse.json(order);
    }

    // List orders for authenticated user (if implemented)
    const supabase = await createServerClient();
    const { data, error } = await supabase
      .from('orders')
      .select('*, order_items(*)')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      items,
      customerInfo,
      shippingAddress,
      subtotal,
      shippingCost = 0,
      taxAmount = 0,
      total,
      paymentMethod,
      notes,
    } = body as CreateOrderInput;

    // Validate required fields
    if (!items || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    if (!customerInfo?.email || !customerInfo?.firstName || !customerInfo?.lastName) {
      return NextResponse.json({ error: 'Customer information is required' }, { status: 400 });
    }

    if (!shippingAddress?.address || !shippingAddress?.city || !shippingAddress?.country) {
      return NextResponse.json({ error: 'Shipping address is required' }, { status: 400 });
    }

    // Create order using service
    const order = await orderService.create({
      items,
      customerInfo,
      shippingAddress,
      subtotal,
      shippingCost,
      taxAmount,
      total,
      paymentMethod,
      notes,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    const message = error instanceof Error ? error.message : 'Invalid request body';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function PATCH(request: Request) {
  const supabase = await createServerClient();

  try {
    const body = await request.json();
    const { orderId, status, paymentStatus, paymentIntentId, shippingTrackingNumber } = body;

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 });
    }

    const updateData: Record<string, unknown> = {};

    if (status) {
      updateData.status = status;
    }

    if (paymentStatus) {
      updateData.payment_status = paymentStatus;
    }

    if (paymentIntentId) {
      updateData.payment_intent_id = paymentIntentId;
    }

    if (shippingTrackingNumber) {
      updateData.shipping_tracking_number = shippingTrackingNumber;
    }

    const { data, error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: 'Failed to update order' }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
