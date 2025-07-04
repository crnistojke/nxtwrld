"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NotificationBanner } from "@/components/notification-banner"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { ContactModal } from "@/components/contact-modal"
import { WishlistModal } from "@/components/wishlist-modal"
import { useWishlist } from "@/hooks/use-wishlist"
import { ProtectedLink } from "@/components/protected-link"

export default function AboutPage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false)

  const { wishlistItems, wishlistCount, removeFromWishlist } = useWishlist()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 mt-16 md:mt-0">
        <div className="container mx-auto px-4 text-center">
          <Image
            src="/images/logonxtwrld.png"
            alt="NXT WRLD Logo"
            width={150}
            height={150}
            className="mx-auto mb-8 object-contain"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">About NXT WRLD</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Where fashion meets transformation, and style becomes a statement of change
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-600 mb-6">
                  NXT WRLD was born from a vision of transformation - not just in fashion, but in how we see ourselves
                  and our world. Our iconic butterfly and globe design represents the beautiful metamorphosis that
                  happens when we embrace change and growth.
                </p>
                <p className="text-lg text-gray-600 mb-6">
                  Each piece in our collection tells a story of evolution, of breaking free from limitations, and of
                  spreading your wings to explore new possibilities. We believe that what you wear should inspire you to
                  become the next version of yourself.
                </p>
                <p className="text-lg text-gray-600">
                  From our carefully crafted t-shirts to our cozy hoodies, every item is designed to remind you that
                  transformation is beautiful, and your journey to the next world - your NXT WRLD - starts with a single
                  step.
                </p>
              </div>
              <div className="relative">
                <Image
                  src="/images/nxtwrldtshirtwhite.webp"
                  alt="NXT WRLD Design"
                  width={500}
                  height={500}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">What drives us every day</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🦋</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Transformation</h3>
              <p className="text-gray-600">
                We believe in the power of change and growth. Every design inspires personal evolution and the courage
                to become who you're meant to be.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Global Unity</h3>
              <p className="text-gray-600">
                Our world design represents connection across all boundaries. Fashion is a universal language that
                brings people together.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Quality</h3>
              <p className="text-gray-600">
                Every piece is crafted with attention to detail and made to last. Quality isn't just about materials -
                it's about the experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-8">Our Mission</h2>
            <p className="text-xl text-white/90 mb-8">
              To create clothing that doesn't just look good, but makes you feel empowered to transform your world.
              We're not just selling apparel - we're selling the confidence to embrace change, the courage to be
              different, and the inspiration to create your own NXT WRLD.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Shop Our Collection
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              >
                Join Our Community
              </Button>
            </div>
          </div>
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

      <ContactModal isOpen={isContactModalOpen} onClose={closeContactModal} />
      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={closeWishlistModal}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={removeFromWishlist}
        onProductClick={() => {}}
      />
    </div>
  )
}
