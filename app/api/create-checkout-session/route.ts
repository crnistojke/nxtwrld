import { NextResponse } from 'next/server';
// Inicializiramo Stripe z našim skrivnim ključem
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Definiramo tip za izdelek, ki ga pričakujemo od frontenda
interface Product {
  name: string;
  images: string[];
  price: string;
}

export async function POST(request: Request) {
  try {
    const { product, selectedSize, finalPrice } = await request.json();

    if (!product || !selectedSize || !finalPrice) {
      return NextResponse.json({ error: 'Missing product information' }, { status: 400 });
    }

    // Pretvorimo ceno v cente za Stripe API
    const priceInCents = Math.round(parseFloat(finalPrice.replace(/[^0-9.]/g, '')) * 100);

    if (isNaN(priceInCents)) {
        return NextResponse.json({ error: 'Invalid price format' }, { status: 400 });
    }

    // POPRAVEK: Ustvarimo polno pot do slike
    const origin = request.headers.get('origin') || 'https://nxtwrldoff.vercel.app';
    const imageUrl = product.images[0].startsWith('/') 
      ? `${origin}${product.images[0]}` 
      : product.images[0];

    // Ustvarimo Stripe Checkout sejo
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'],
      line_items: [
        {
          price_data: {
            // POPRAVEK: Spremenimo valuto v EUR
            currency: 'eur',
            product_data: {
              name: product.name,
              // POPRAVEK: Uporabimo polno pot do slike
              images: [imageUrl],
              metadata: {
                  size: selectedSize,
              }
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // URL-ja, na katera bo Stripe preusmeril uporabnika po plačilu
      success_url: `${origin}/?payment_success=true`,
      cancel_url: `${origin}/?payment_canceled=true`,
    });

    // Vrnemo ID seje na frontend
    return NextResponse.json({ sessionId: session.id });

  } catch (err: any) {
    // To nam bo dalo boljši vpogled v napako v Vercel logih
    console.error('Stripe API Error:', err.message);
    return NextResponse.json({ error: 'Error creating checkout session. Check server logs.' }, { status: 500 });
  }
}
