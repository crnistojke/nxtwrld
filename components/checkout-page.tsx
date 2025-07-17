"use client"
import React, { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { loadStripe } from '@stripe/stripe-js';
import { Truck, RefreshCw, Headphones } from "lucide-react"

// Naložimo Stripe.js z javnim ključem
// To je najbolje narediti izven komponente, da se ne ponavlja ob vsakem renderju
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface Product {
  name: string;
  images: string[];
  price: string;
}
interface CheckoutDetails {
  product: Product;
  selectedSize: string;
  finalPrice: string;
  promoApplied: boolean;
}

interface CheckoutPageProps {
  details: CheckoutDetails | null;
  isOpen: boolean;
  onBack: () => void;
}

export function CheckoutPage({ details, isOpen, onBack }: CheckoutPageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !details) return null;

  const handleCheckout = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // 1. Kličemo naš backend, da ustvari Stripe sejo
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(details), // Pošljemo podrobnosti o naročilu
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // 2. Pridobimo Stripe instanco
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe.js has not loaded yet.');
      }

      // 3. Preusmerimo uporabnika na Stripe Checkout stran
      const { error } = await stripe.redirectToCheckout({
        sessionId: session.sessionId,
      });

      if (error) {
        // Ta del se izvede samo, če pride do napake pri preusmeritvi (npr. blokada brskalnika)
        console.error('Stripe redirection error:', error);
        setError(error.message || 'An unexpected error occurred.');
      }
    } catch (err: any) {
      console.error('Checkout error:', err);
      setError(err.message || 'Failed to initiate payment.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-[80] overflow-y-auto">
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} disabled={isLoading} className="flex items-center gap-2">
          <ChevronLeft /><span>Back</span>
        </Button>
      </div>
      <div className="max-w-2xl mx-auto p-4 md:p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Confirm Your Order</h2>
            <div className="bg-gray-50 border rounded-lg p-4 flex gap-4 items-center">
              <img src={details.product.images[0]} alt={details.product.name} className="w-24 h-24 rounded-md object-cover bg-white" />
              <div className="space-y-1">
                <p className="font-bold text-gray-800">{details.product.name}</p>
                <p className="text-sm text-gray-600">Size: <span className="font-medium text-gray-800">{details.selectedSize}</span></p>
                {details.promoApplied && <p className="text-sm text-green-600 font-medium">"SUMMER15" code applied</p>}
                <p className="text-lg font-bold text-purple-600 pt-1">{details.finalPrice}</p>
              </div>
            </div>
          </div>
          
          <div className="pt-4">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <Button 
              size="lg" 
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700" 
              onClick={handleCheckout} 
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : `Proceed to Payment (${details.finalPrice})`}
            </Button>
            <p className="text-center text-xs text-gray-500 mt-4">
              You will be redirected to Stripe's secure payment page.
            </p>
          </div>
          
          <div className="border-t pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center flex items-center gap-4 md:flex-col md:gap-2">
                <Truck className="h-8 w-8 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">Free Shipping</h3>
                  <p className="text-gray-600 text-sm">On all orders over $50</p>
                </div>
              </div>
              <div className="text-center flex items-center gap-4 md:flex-col md:gap-2">
                <RefreshCw className="h-8 w-8 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">60-Day Returns</h3>
                  <p className="text-gray-600 text-sm">Hassle-free return policy</p>
                </div>
              </div>
              <div className="text-center flex items-center gap-4 md:flex-col md:gap-2">
                <Headphones className="h-8 w-8 text-cyan-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold">24/7 Support</h3>
                  <p className="text-gray-600 text-sm">We're here to help</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
