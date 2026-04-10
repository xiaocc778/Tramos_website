import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not defined');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
});

export interface CreatePaymentIntentInput {
  amount: number;
  currency?: string;
  metadata?: Record<string, string>;
}

export const stripeService = {
  async createPaymentIntent(input: CreatePaymentIntentInput) {
    const paymentIntent = await stripe.paymentIntents.create({
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
    return stripe.paymentIntents.retrieve(paymentIntentId);
  },

  async confirmPaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.confirm(paymentIntentId);
  },

  async cancelPaymentIntent(paymentIntentId: string) {
    return stripe.paymentIntents.cancel(paymentIntentId);
  },

  async createRefund(paymentIntentId: string, amount?: number) {
    return stripe.refunds.create({
      payment_intent: paymentIntentId,
      amount: amount ? Math.round(amount * 100) : undefined,
    });
  },
};
