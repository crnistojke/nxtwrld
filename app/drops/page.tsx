"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Clock, Star } from "lucide-react"
import { NotificationBanner } from "@/components/notification-banner"
import { MobileNavigation } from "@/components/mobile-navigation"
import { DesktopNavigation } from "@/components/desktop-navigation"
import { ContactModal } from "@/components/contact-modal"
import { WishlistModal } from "@/components/wishlist-modal"
import { useWishlist } from "@/hooks/use-wishlist"
import { ProtectedLink } from "@/components/protected-link"

export default function DropsPage() {
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

  const upcomingDrops = [
    {
      id: 1,
      name: "Metamorphosis Collection",
      description: "Limited edition pieces inspired by transformation and growth",
      releaseDate: "February 15, 2025",
      image: "/placeholder.svg?height=400&width=400",
      status: "coming-soon",
      price: "€39.99 - €69.99",
    },
    {
      id: 2,
      name: "Cosmic Butterflies",
      description: "Exclusive space-themed designs with holographic elements",
      releaseDate: "March 1, 2025",
      image: "/placeholder.svg?height=400&width=400",
      status: "coming-soon",
      price: "€44.99 - €74.99",
    },
  ]

  const pastDrops = [
    {
      id: 3,
      name: "Genesis Collection",
      description: "Our very first limited drop - completely sold out",
      releaseDate: "January 1, 2025",
      image: "/images/nxtwrldtshirtwhite.webp",
      status: "sold-out",
      price: "€29.99 - €59.99",
    },
  ]

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
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">Exclusive Drops</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Limited edition collections that push the boundaries of design and creativity. Each drop is a unique journey
            into the NXT WRLD.
          </p>
        </div>
      </section>

      {/* Upcoming Drops */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Drops</h2>
            <p className="text-xl text-gray-600">Get ready for these exclusive releases</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {upcomingDrops.map((drop) => (
              <Card key={drop.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg bg-gradient-to-br from-purple-100 to-blue-100">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Clock className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                        <p className="text-purple-600 font-semibold">Coming Soon</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-semibold text-purple-600 uppercase">Exclusive</span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{drop.name}</h3>
                    <p className="text-gray-600 mb-4">{drop.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Release Date:</span>
                      <span className="font-semibold">{drop.releaseDate}</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Price Range:</span>
                      <span className="font-bold text-purple-600">{drop.price}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Notify Me
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Drops */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Past Drops</h2>
            <p className="text-xl text-gray-600">Missed these? Stay tuned for restocks</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastDrops.map((drop) => (
              <Card key={drop.id} className="group hover:shadow-lg transition-shadow opacity-75">
                <CardContent className="p-0">
                  <div className="aspect-square relative overflow-hidden rounded-t-lg">
                    <Image
                      src={drop.image || "/placeholder.svg"}
                      alt={drop.name}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-4 py-2 rounded-full font-bold">SOLD OUT</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2">{drop.name}</h3>
                    <p className="text-gray-600 mb-4">{drop.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm text-gray-500">Released:</span>
                      <span className="font-semibold">{drop.releaseDate}</span>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent" disabled>
                      Sold Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Never Miss a Drop</h2>
          <p className="text-xl text-white/90 mb-8">
            Subscribe to get notified about exclusive releases and early access
          </p>
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
