import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe(): Stripe {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not defined');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2026-02-25.clover',
      typescript: true,
    });
  }

  return stripeClient;
}

export interface CreatePaymentIntentInput {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}

export const stripeService = {
  async createPaymentIntent(input: CreatePaymentIntentInput) {
    const paymentIntent = await getStripe().paymentIntents.create({
      amount: Math.round(input.amount * 100), // Convert to cents
      currency: input.currency || 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: input.metadata || {},
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  },

  async retrievePaymentIntent(paymentIntentId: string) {
    return getStripe().paymentIntents.retrieve(paymentIntentId);
  },

  async confirmPaymentIntent(paymentIntentId: string) {
    return getStripe().paymentIntents.confirm(paymentIntentId);
  },

  async cancelPaymentIntent(paymentIntentId: string) {
    return getStripe().paymentIntents.cancel(paymentIntentId);
  },

  async createRefund(paymentIntentId: string, amount?: number) {
    return getStripe().refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });
  },
};
