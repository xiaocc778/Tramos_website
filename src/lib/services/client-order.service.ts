import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { CustomerInfo, ShippingInfo, OrderItem } from '@/types';

const API_BASE = '/api';

export const orderService = {
  async create(input: {
    items: OrderItem[];
    customerInfo: CustomerInfo;
    shippingAddress: ShippingInfo;
    total: number;
    paymentMethod?: string;
  }) {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error('Failed to create order');
    }

    return response.json();
  },

  async getById(orderId: string) {
    const response = await fetch(`${API_BASE}/orders?orderId=${orderId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return response.json();
  },

  async getByOrderNumber(orderNumber: string) {
    const response = await fetch(`${API_BASE}/orders?orderNumber=${orderNumber}`);

    if (!response.ok) {
      throw new Error('Failed to fetch order');
    }

    return response.json();
  },

  async updateStatus(orderId: string, status: string) {
    const response = await fetch(`${API_BASE}/orders`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId, status }),
    });

    if (!response.ok) {
      throw new Error('Failed to update order status');
    }

    return response.json();
  },
};

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: Parameters<typeof orderService.create>[0]) => orderService.create(input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}
