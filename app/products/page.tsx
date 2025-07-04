"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { ProductModal } from "@/components/product-modal"
import { PurchaseModal } from "@/components/purchase-modal"
import { NotificationBanner } from "@/components/notification-banner"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { ContactModal } from "@/components/contact-modal"
import { WishlistModal } from "@/components/wishlist-modal"
import { ProductCard } from "@/components/product-card"
import { useWishlist } from "@/hooks/use-wishlist"
import { ProductFilter } from "@/components/product-filter"
import { ProtectedLink } from "@/components/protected-link"

export default function ProductsPage() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false)

  const { wishlistItems, toggleWishlist, isInWishlist, wishlistCount, removeFromWishlist } = useWishlist()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const products = [
    {
      id: 1,
      name: "NXT WRLD Globe Tee - White",
      images: ["/images/nxtwrldtshirtwhite.webp", "/images/nxtwrldtshirtwhite2.webp"],
      price: "€29.99",
      category: "t-shirt",
      description:
        "Classic white tee featuring our iconic globe and butterflies design. Made from premium cotton blend for comfort.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      details: ["100% premium cotton", "Screen-printed design", "Pre-shrunk fabric", "Unisex fit", "Machine washable"],
    },
    {
      id: 2,
      name: "NXT WRLD Globe Tee - Black",
      images: ["/images/nxtwrldtshirt.webp", "/images/nxtwrldtshirt2.webp"],
      price: "€29.99",
      category: "t-shirt",
      description:
        "Bold black tee with our signature transformation design. Perfect for making a statement while staying comfortable.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      details: ["100% premium cotton", "Screen-printed design", "Pre-shrunk fabric", "Unisex fit", "Machine washable"],
    },
    {
      id: 3,
      name: "NXT WRLD Globe Hoodie",
      images: ["/images/nxtwrldhoodie2.webp", "/images/nxtwrldhoodie.webp"],
      price: "€59.99",
      category: "hoodie",
      description:
        "Premium hoodie featuring our transformative globe design. Cozy and stylish, perfect for any season.",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      details: [
        "80% cotton / 20% polyester",
        "Fleece-lined interior",
        "Kangaroo pocket",
        "Ribbed cuffs & hem",
        "Machine washable",
      ],
    },
  ]

  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleFilterClick = () => {
    setIsFilterOpen(true)
  }

  const closeFilter = () => {
    setIsFilterOpen(false)
  }

  const handleApplyFilters = (filters) => {
    let filtered = [...products]

    // Apply category filter
    if (filters.category.length > 0) {
      filtered = filtered.filter((product) => filters.category.includes(product.category))
    }

    // Apply price filter
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split("-").map((p) => p.replace("+", ""))
      filtered = filtered.filter((product) => {
        const price = Number.parseFloat(product.price.replace("€", ""))
        if (max) {
          return price >= Number.parseFloat(min) && price <= Number.parseFloat(max)
        } else {
          return price >= Number.parseFloat(min)
        }
      })
    }

    // Apply sorting
    if (filters.sortBy === "price-low") {
      filtered.sort((a, b) => Number.parseFloat(a.price.replace("€", "")) - Number.parseFloat(b.price.replace("€", "")))
    } else if (filters.sortBy === "price-high") {
      filtered.sort((a, b) => Number.parseFloat(b.price.replace("€", "")) - Number.parseFloat(a.price.replace("€", "")))
    } else if (filters.sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name))
    }

    setFilteredProducts(filtered)
  }

  const openProductModal = (product) => {
    setSelectedProduct(product)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setIsProductModalOpen(false)
  }

  const openPurchaseModal = () => {
    setIsPurchaseModalOpen(true)
    setIsProductModalOpen(false)
  }

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false)
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
    <div className="min-h-screen no-scroll-x">
      {/* Notification Banner */}
      <NotificationBanner />

      {/* Mobile Navigation */}
      <MobileNavigation
        onContactClick={handleContactClick}
        onWishlistClick={handleWishlistClick}
        wishlistCount={wishlistCount}
      />

      {/* Desktop Navigation */}
      <DesktopNavigation
        onContactClick={handleContactClick}
        onWishlistClick={handleWishlistClick}
        wishlistCount={wishlistCount}
      />

      {/* Header */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 mt-16 md:mt-0">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-white mb-4">Our Collection</h1>
          <p className="text-xl text-white/90">Discover the perfect piece for your transformation</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">All Products</h2>
            <Button variant="outline" size="sm" onClick={handleFilterClick}>
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onProductClick={openProductModal}
                onToggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist(product.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform?</h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands who've already started their journey to the NXT WRLD
          </p>
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
            Start Shopping
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-12 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
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
              <p className="text-gray-600 mb-6 max-w-md">
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

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <ProtectedLink href="/products" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Products
                  </ProtectedLink>
                </li>
                <li>
                  <ProtectedLink href="/about" className="text-gray-600 hover:text-purple-600 transition-colors">
                    About
                  </ProtectedLink>
                </li>
                <li>
                  <ProtectedLink href="/drops" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Drops
                  </ProtectedLink>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-gray-900 mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/terms-of-service" className="text-gray-600 hover:text-purple-600 transition-colors">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <span className="text-gray-600">nxtwrld.wear@gmail.com</span>
                </li>
                <li>
                  <span className="text-gray-600">@nxtwrld.wear</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8 text-center">
            <p className="text-gray-500">&copy; 2025 NXT WRLD. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <ProductModal
        isOpen={isProductModalOpen}
        onClose={closeProductModal}
        product={selectedProduct}
        onBuy={openPurchaseModal}
        onToggleWishlist={toggleWishlist}
        isInWishlist={selectedProduct ? isInWishlist(selectedProduct.id) : false}
      />
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={closePurchaseModal}
        productName={selectedProduct?.name || ""}
      />
      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={closeWishlistModal}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={removeFromWishlist}
        onProductClick={openProductModal}
      />
      <ProductFilter isOpen={isFilterOpen} onClose={closeFilter} onApplyFilters={handleApplyFilters} />
    </div>
  )
}
