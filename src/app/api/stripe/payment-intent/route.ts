import { NextResponse } from 'next/server';
import { stripeService } from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, currency, metadata } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      );
    }

    const result = await stripeService.createPaymentIntent({
      amount,
      currency: currency || 'usd',
      metadata: {
        ...metadata,
        source: 'heater_shop',
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
