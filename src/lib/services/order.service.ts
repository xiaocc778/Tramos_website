import { createServerClient } from '@/lib/supabase/server';

export interface CreateOrderInput {
  items: Array<{
    productId: string;
    name: string;
    nameZh?: string;
    price: number;
    quantity: number;
    image?: string;
    specifications?: Record<string, string | number>;
  }>;
  customerInfo?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
  };
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phone?: string;
  };
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
  paymentMethod?: string;
  notes?: string;
}

export const orderService = {
  async create(input: CreateOrderInput) {
    const supabase = await createServerClient();

    const { items, customerInfo, shippingAddress, subtotal, shippingCost, taxAmount, total, paymentMethod, notes } = input;

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: null,
        guest_email: customerInfo?.email,
        guest_first_name: customerInfo?.firstName,
        guest_last_name: customerInfo?.lastName,
        guest_phone: customerInfo?.phone,
        guest_company: customerInfo?.company,
        shipping_address_line1: shippingAddress.address,
        shipping_city: shippingAddress.city,
        shipping_state: shippingAddress.state,
        shipping_postal_code: shippingAddress.zipCode,
        shipping_country: shippingAddress.country,
        shipping_phone: shippingAddress.phone,
        subtotal,
        shipping_cost: shippingCost,
        tax_amount: taxAmount,
        total,
        payment_method: paymentMethod,
        notes,
        status: 'pending',
        payment_status: 'pending',
      })
      .select()
      .single();

    if (orderError || !order) {
      throw new Error(orderError?.message || 'Failed to create order');
    }

    // Create order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      product_id: item.productId,
      name: item.name,
      name_zh: item.nameZh,
      price: item.price,
      quantity: item.quantity,
      specifications: item.specifications || {},
      image_url: item.image,
      subtotal: item.price * item.quantity,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) {
      throw new Error('Failed to create order items');
    }

    return order;
  },

  async getById(orderId: string) {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('id', orderId)
      .single();

    if (error || !data) {
      throw new Error('Order not found');
    }

    return data;
  },

  async getByOrderNumber(orderNumber: string) {
    const supabase = await createServerClient();

    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        order_items(*)
      `)
      .eq('order_number', orderNumber)
      .single();

    if (error || !data) {
      throw new Error('Order not found');
    }

    return data;
  },
};
