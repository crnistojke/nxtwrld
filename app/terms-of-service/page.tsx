"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileText } from "lucide-react"
import { NotificationBanner } from "@/components/notification-banner"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { ContactModal } from "@/components/contact-modal"
import { WishlistModal } from "@/components/wishlist-modal"
import { useWishlist } from "@/hooks/use-wishlist"
import { ProtectedLink } from "@/components/protected-link"

export default function TermsOfServicePage() {
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
      <section className="py-16 bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400 mt-16 md:mt-0">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <FileText className="h-12 w-12 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">Terms of Service</h1>
          </div>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">General terms and conditions for NXT WRLD website</p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-sm text-gray-600 mb-0">
                <strong>Last updated:</strong> January 2025
              </p>
            </div>

            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Provisions</h2>
                <p className="text-gray-600 mb-4">
                  These terms of service govern the use of the NXT WRLD website (hereinafter "website"). By accessing
                  the website, you agree to these terms of service.
                </p>
                <p className="text-gray-600">
                  NXT WRLD reserves the right to change these terms at any time without prior notice. Changes take
                  effect upon publication on the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Website Usage</h2>
                <p className="text-gray-600 mb-4">
                  The website is intended for the presentation and sale of NXT WRLD brand clothing. Users undertake to
                  use the website in accordance with applicable law.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Use of the website for illegal purposes is prohibited</li>
                  <li>Damaging the operation of the website is prohibited</li>
                  <li>Copying content without permission is prohibited</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Shopping</h2>
                <p className="text-gray-600 mb-4">
                  Purchases are currently made through contact channels (email, Instagram, WhatsApp). Prices are listed
                  in euros and include VAT.
                </p>
                <p className="text-gray-600">
                  Free shipping applies to orders over €50. Returns are possible within 60 days of purchase.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  All website content, including designs, logos, texts and images, is protected by copyright and belongs
                  to NXT WRLD.
                </p>
                <p className="text-gray-600">
                  Reproduction, distribution or public display of content without written permission is prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy</h2>
                <p className="text-gray-600 mb-4">
                  We process your personal data in accordance with applicable personal data protection legislation. Data
                  is used exclusively for the provision of services.
                </p>
                <p className="text-gray-600">Contact details: nxtwrld.wear@gmail.com, @nxtwrld.wear</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  NXT WRLD is not liable for any damage that may arise from the use of the website, except in cases
                  determined by law.
                </p>
                <p className="text-gray-600">The website is available "as is" without any warranties.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Dispute Resolution</h2>
                <p className="text-gray-600 mb-4">
                  Slovenian law and Slovenian courts have jurisdiction for dispute resolution.
                </p>
                <p className="text-gray-600">Before legal proceedings, we strive for peaceful dispute resolution.</p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Contact</h2>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-gray-700 mb-2">
                    <strong>NXT WRLD</strong>
                  </p>
                  <p className="text-gray-600 mb-1">Email: nxtwrld.wear@gmail.com</p>
                  <p className="text-gray-600">Instagram: @nxtwrld.wear</p>
                </div>
              </section>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-200 text-center">
              <Link href="/">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
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
