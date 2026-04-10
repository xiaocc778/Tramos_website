import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { createServerClient } from '@/lib/supabase/server';
import Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = await createServerClient();

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        // Find order by payment intent ID and update status
        const { data: order } = await supabase
          .from('orders')
          .select('id')
          .eq('payment_intent_id', paymentIntent.id)
          .single();

        if (order) {
          await supabase
            .from('orders')
            .update({
              payment_status: 'paid',
              status: 'processing',
            })
            .eq('id', order.id);

          console.log(`Order ${order.id} payment confirmed`);
        }
        break;
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;

        const { data: order } = await supabase
          .from('orders')
          .select('id')
          .eq('payment_intent_id', paymentIntent.id)
          .single();

        if (order) {
          await supabase
            .from('orders')
            .update({
              payment_status: 'failed',
            })
            .eq('id', order.id);

          console.log(`Order ${order.id} payment failed`);
        }
        break;
      }

      case 'charge.refunded': {
        const charge = event.data.object as Stripe.Charge;

        if (charge.payment_intent) {
          const { data: order } = await supabase
            .from('orders')
            .select('id')
            .eq('payment_intent_id', charge.payment_intent)
            .single();

          if (order) {
            await supabase
              .from('orders')
              .update({
                payment_status: 'refunded',
                status: 'refunded',
              })
              .eq('id', order.id);

            console.log(`Order ${order.id} refunded`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
