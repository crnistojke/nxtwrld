// Ta datoteka bo vsebovala vse skupne tipe za vašo aplikacijo.

export interface Product {
  id: number;
  name: string;
  images: string[];
  price: string;
  category: string;
  description: string;
  sizes: string[];
  details: string[];
}

export interface CheckoutDetails {
  product: Product;
  selectedSize: string;
  finalPrice: string;
  promoApplied: boolean;
}
