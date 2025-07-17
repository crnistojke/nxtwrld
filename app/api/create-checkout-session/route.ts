import { NextResponse } from 'next/server';
// Inicializiramo Stripe z našim skrivnim ključem
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Definiramo tip za izdelek, ki ga pričakujemo od frontenda
interface Product {
  name: string;
  images: string[];
  price: string; // Pričakujemo ceno v formatu "$XX.XX"
}

export async function POST(request: Request) {
  try {
    const { product, selectedSize, finalPrice } = await request.json();

    if (!product || !selectedSize || !finalPrice) {
      return NextResponse.json({ error: 'Missing product information' }, { status: 400 });
    }

    // Pretvorimo ceno v cente za Stripe API
    // Odstranimo vse, kar ni številka ali pika, in pomnožimo s 100
    const priceInCents = Math.round(parseFloat(finalPrice.replace(/[^0-9.]/g, '')) * 100);

    if (isNaN(priceInCents)) {
        return NextResponse.json({ error: 'Invalid price format' }, { status: 400 });
    }

    // Ustvarimo Stripe Checkout sejo
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'paypal'], // Dodajte plačilne metode, ki jih želite podpreti
      line_items: [
        {
          price_data: {
            currency: 'usd', // Valuta (npr. 'eur')
            product_data: {
              name: product.name,
              images: [product.images[0]], // Stripe bo prikazal prvo sliko
              metadata: {
                  size: selectedSize, // Dodatni podatki
              }
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // URL-ja, na katera bo Stripe preusmeril uporabnika po plačilu
      success_url: `${request.headers.get('origin')}/?payment_success=true`,
      cancel_url: `${request.headers.get('origin')}/?payment_canceled=true`,
    });

    // Vrnemo ID seje na frontend
    return NextResponse.json({ sessionId: session.id });

  } catch (err: any) {
    console.error('Error creating Stripe session:', err);
    return NextResponse.json({ error: 'Error creating checkout session' }, { status: 500 });
  }
}
