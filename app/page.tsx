"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Truck, RefreshCw, Headphones } from "lucide-react"
import { ProductModal } from "@/components/product-modal"
import { CheckoutPage } from "@/components/checkout-page" // NOVO: Uvoz strani za plačilo
import { NotificationBanner } from "@/components/notification-banner"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { ContactModal } from "@/components/contact-modal"
import { WishlistModal } from "@/components/wishlist-modal"
import { ProductCard } from "@/components/product-card"
import { ProtectedLink } from "@/components/protected-link"
import { useWishlist } from "@/hooks/use-wishlist"

interface Product {
  id: number
  name: string
  images: string[]
  price: string
  category: string
  description: string
  sizes: string[]
  details: string[]
}

// NOVO: Tip za podrobnosti o plačilu
interface CheckoutDetails {
  product: Product;
  selectedSize: string;
  finalPrice: string;
  promoApplied: boolean;
}

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false)
  
  // NOVO: Stanja za upravljanje procesa plačila
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null)

  const { wishlistItems, toggleWishlist, isInWishlist, wishlistCount, removeFromWishlist } = useWishlist()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products: Product[] = [
    {
      id: 1,
      name: "NXT WRLD Globe Tee - White",
      images: ["/images/nxtwrldtshirtwhite.webp", "/images/nxtwrldtshirtwhite2.webp"],
      price: "$29.99",
      category: "t-shirt",
      description:
        "Classic white tee featuring our iconic globe and butterflies design. Made from premium cotton blend for ultimate comfort and durability.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      details: [
        "100% Premium Cotton",
        "Screen-printed design",
        "Pre-shrunk fabric",
        "Reinforced seams",
        "Machine washable",
        "Unisex fit",
      ],
    },
    {
      id: 2,
      name: "NXT WRLD Globe Tee - Black",
      images: ["/images/nxtwrldtshirt.webp", "/images/nxtwrldtshirt2.webp"],
      price: "$29.99",
      category: "t-shirt",
      description:
        "Bold black tee with our signature transformation design. Perfect for making a statement while staying comfortable.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      details: [
        "100% Premium Cotton",
        "Screen-printed design",
        "Pre-shrunk fabric",
        "Reinforced seams",
        "Machine washable",
        "Unisex fit",
      ],
    },
    {
      id: 3,
      name: "NXT WRLD Globe Hoodie",
      images: ["/images/nxtwrldhoodie2.webp", "/images/nxtwrldhoodie.webp"],
      price: "$54.99",
      category: "hoodie",
      description:
        "Premium hoodie featuring our transformative globe design. Cozy and stylish, perfect for any season.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      details: [
        "80% Cotton, 20% Polyester",
        "Fleece-lined interior",
        "Adjustable drawstring hood",
        "Kangaroo pocket",
        "Ribbed cuffs and hem",
        "Machine washable",
      ],
    },
  ]

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  // NOVO: Posodobljena funkcija za nakup
  const handleBuyNow = (details: CheckoutDetails) => {
    setCheckoutDetails(details);
    setIsProductModalOpen(false);
    setIsCheckoutOpen(true);
  }
  
  const handleBackFromCheckout = () => {
      setIsCheckoutOpen(false);
      setCheckoutDetails(null);
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
    setSelectedProduct(null)
  }

  const handleContactClick = () => {
    setIsContactModalOpen(true)
  }

  const closeContactModal = () => {
    setIsContactModalOpen(false)
  }

  const handleWishlistClick = () => {
    setIsWishlistModalOpen(true)
  }

  const closeWishlistModal = () => {
    setIsWishlistModalOpen(false)
  }

  return (
    <div className="page-wrapper">
      <div className="content-wrapper">
        <NotificationBanner />
        <MobileNavigation
          onContactClick={handleContactClick}
          onWishlistClick={handleWishlistClick}
          wishlistCount={wishlistCount}
        />
        <DesktopNavigation
          onContactClick={handleContactClick}
          onWishlistClick={handleWishlistClick}
          wishlistCount={wishlistCount}
        />

        <section className="relative h-[70vh] md:h-[80vh] bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 overflow-hidden mt-16 md:mt-0">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative container mx-auto px-4 h-full flex items-center justify-center text-center z-10">
            <div className="max-w-4xl w-full">
              <Image
                src="/images/logonxtwrld.png"
                alt="NXT WRLD Logo"
                width={120}
                height={120}
                className="mx-auto mb-8 object-contain"
              />
              <h1 className="hero-text text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-4 md:mb-6">NXT WRLD</h1>
              <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-white/90 mb-6 md:mb-8 px-4">
                Transform Your Style, Transform Your World
              </p>
              <ProtectedLink href="/products">
                <Button
                  size="lg"
                  className="bg-white text-gray-900 hover:bg-gray-100 text-base md:text-lg px-6 md:px-8 py-2 md:py-3 z-50 relative"
                >
                  Shop Collection
                </Button>
              </ProtectedLink>
            </div>
          </div>
        </section>

        <section className="section-padding py-12 md:py-20 bg-gray-50 relative z-10 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">New Arrivals</h2>
              <p className="text-lg md:text-xl text-gray-600">Discover our latest designs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onProductClick={handleProductClick}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist(product.id)}
                />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
                <p className="text-gray-600">Free worldwide shipping on all orders over €50</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <RefreshCw className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">60-Day Returns</h3>
                <p className="text-gray-600">Easy returns within 60 days of purchase</p>
              </div>

              <div className="text-center">
                <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headphones className="h-8 w-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-gray-600">Customer support available around the clock</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
            <p className="text-xl text-white/90 mb-8">Get the latest updates on new arrivals and exclusive drops</p>
            <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white/50 w-full"
              />
              <Button className="bg-white text-purple-600 hover:bg-gray-100 px-8 w-full sm:w-auto">Subscribe</Button>
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-white border-t border-gray-200 py-6 md:py-8 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/images/logonxtwrld.png"
                  alt="NXT WRLD Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
                <span className="text-2xl font-bold text-gray-900">NXT WRLD</span>
              </div>
              <p className="text-gray-600 mb-4 md:mb-6 max-w-md">
                Transform your style, transform your world. Premium streetwear designed for the next generation.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/nxtwrld.wear"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.418-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.875 1.418 2.026 1.418 3.323s-.49 2.448-1.418 3.244c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.781c-.49 0-.928-.438-.928-.928s.438-.928.928-.928.928.438.928.928-.438.928-.928.928zm-3.323 9.781c-2.448 0-4.474-2.026-4.474-4.474s2.026-4.474 4.474-4.474 4.474 2.026 4.474 4.474-2.026 4.474-4.474 4.474z" />
                  </svg>
                </a>
                <a
                  href="mailto:nxtwrld.wear@gmail.com"
                  className="text-gray-400 hover:text-purple-600 transition-colors"
                >
                  <span className="sr-only">Email</span>
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 md:mb-4">Quick Links</h4>
              <ul className="space-y-1 md:space-y-2">
                <li><Link href="/" className="text-gray-600 hover:text-purple-600">Home</Link></li>
                <li><ProtectedLink href="/products" className="text-gray-600 hover:text-purple-600">Products</ProtectedLink></li>
                <li><ProtectedLink href="/about" className="text-gray-600 hover:text-purple-600">About</ProtectedLink></li>
                <li><ProtectedLink href="/drops" className="text-gray-600 hover:text-purple-600">Drops</ProtectedLink></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3 md:mb-4">Support</h4>
              <ul className="space-y-1 md:space-y-2">
                <li><Link href="/terms-of-service" className="text-gray-600 hover:text-purple-600">Terms of Service</Link></li>
                <li><span className="text-gray-600">nxtwrld.wear@gmail.com</span></li>
                <li><span className="text-gray-600">@nxtwrld.wear</span></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-4 md:pt-6 text-center">
            <p className="text-gray-500 text-sm md:text-base">&copy; 2025 NXT WRLD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProductModal
        product={selectedProduct}
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        onBuy={handleBuyNow}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
      />
      
      {/* NOVO: Stran za plačilo */}
      <CheckoutPage 
        isOpen={isCheckoutOpen}
        details={checkoutDetails}
        onBack={handleBackFromCheckout}
      />

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />

      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={closeWishlistModal}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={removeFromWishlist}
        onProductClick={handleProductClick}
      />
    </div>
  )
}
