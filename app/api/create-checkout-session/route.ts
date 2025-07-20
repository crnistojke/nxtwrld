import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// ✅ Uporabi eksplicitni import za Stripe (boljši TS support)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-04-10', // 🔁 uporabi trenutno različico API-ja
});

// ✅ Tip za vhodne podatke
interface Product {
  name: string;
  images: string[];
  price: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { product, selectedSize, finalPrice }: { product: Product; selectedSize: string; finalPrice: string } = body;

    if (!product || !selectedSize || !finalPrice) {
      return NextResponse.json({ error: 'Missing product information' }, { status: 400 });
    }

    // ✅ Pretvori ceno v cente (za Stripe je obvezno celo število v centih)
    const numericPrice = parseFloat(finalPrice.replace(/[^0-9.]/g, ''));
    const priceInCents = Math.round(numericPrice * 100);

    if (isNaN(priceInCents) || priceInCents <= 0) {
      return NextResponse.json({ error: 'Invalid price format' }, { status: 400 });
    }

    // ✅ Stripe session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // ⚠️ 'paypal' trenutno ni uradno podprt v Stripe Checkout
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              images: [product.images[0]],
              metadata: {
                size: selectedSize,
              },
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${request.headers.get('origin')}/?payment_success=true`,
      cancel_url: `${request.headers.get('origin')}/?payment_canceled=true`,
    });

    return NextResponse.json({ sessionId: session.id });

  } catch (err: any) {
    console.error('Error creating Stripe session:', err.message);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}