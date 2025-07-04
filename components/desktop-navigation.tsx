"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, Heart, X } from "lucide-react"
import { ProtectedLink } from "./protected-link"

interface DesktopNavigationProps {
  onContactClick: () => void
  onWishlistClick: () => void
  wishlistCount: number
}

export function DesktopNavigation({ onContactClick, onWishlistClick, wishlistCount }: DesktopNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Lock body scroll when desktop menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = "0"
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.width = "100%"
    } else {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.top = "unset"
      document.body.style.left = "unset"
      document.body.style.right = "unset"
      document.body.style.width = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.top = "unset"
      document.body.style.left = "unset"
      document.body.style.right = "unset"
      document.body.style.width = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Desktop Navigation Bar - Louis Vuitton Style */}
      <nav className="hidden md:block bg-white border-b border-gray-200 relative z-40">
        <div className="container mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Menu Button - Left */}
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={toggleMenu}
                className="flex items-center gap-2 text-black hover:bg-transparent p-0 h-auto font-normal"
              >
                <Menu className="h-5 w-5" strokeWidth={1} />
                <span className="text-sm tracking-wide">Menu</span>
              </Button>
            </div>

            {/* Centered Brand Text Only - Bold */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <span className="text-xl font-bold tracking-[0.3em] text-black">NXT WRLD</span>
            </Link>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
              <Button
                variant="ghost"
                onClick={onContactClick}
                className="text-black hover:bg-transparent p-0 h-auto font-normal"
              >
                <span className="text-sm tracking-wide">Contact Us</span>
              </Button>
              <Button
                variant="ghost"
                onClick={onWishlistClick}
                className="text-black hover:bg-transparent p-0 h-auto relative"
              >
                <Heart className="h-5 w-5" strokeWidth={1} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Menu Sidebar - Louis Vuitton Style */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 hidden md:block">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/40" onClick={closeMenu} />

          {/* Menu Sidebar Panel */}
          <div
            className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            style={{ width: "400px" }}
          >
            {/* Close Button */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <span className="text-lg font-bold tracking-wide">Menu</span>
              <Button variant="ghost" onClick={closeMenu} className="text-black hover:bg-gray-100 p-2 rounded-full">
                <X className="h-5 w-5" strokeWidth={1} />
              </Button>
            </div>

            {/* Menu Content */}
            <div className="p-6 h-full overflow-y-auto">
              <nav className="space-y-8">
                {/* Navigation Section */}
                <div>
                  <h3 className="font-medium text-lg mb-4 tracking-wide text-gray-900">Navigation</h3>
                  <ul className="space-y-4">
                    <li>
                      <Link
                        href="/"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <ProtectedLink
                        href="/products"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        Products
                      </ProtectedLink>
                    </li>
                    <li>
                      <ProtectedLink
                        href="/about"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        About
                      </ProtectedLink>
                    </li>
                    <li>
                      <ProtectedLink
                        href="/drops"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        Drops
                      </ProtectedLink>
                    </li>
                  </ul>
                </div>

                {/* Collections Section */}
                <div>
                  <h3 className="font-medium text-lg mb-4 tracking-wide text-gray-900">Collections</h3>
                  <ul className="space-y-4">
                    <li>
                      <ProtectedLink
                        href="/products"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        T-Shirts
                      </ProtectedLink>
                    </li>
                    <li>
                      <ProtectedLink
                        href="/products"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        Hoodies
                      </ProtectedLink>
                    </li>
                    <li>
                      <ProtectedLink
                        href="/drops"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        Limited Drops
                      </ProtectedLink>
                    </li>
                  </ul>
                </div>

                {/* Support Section */}
                <div>
                  <h3 className="font-medium text-lg mb-4 tracking-wide text-gray-900">Support</h3>
                  <ul className="space-y-4">
                    <li>
                      <button
                        onClick={() => {
                          closeMenu()
                          onContactClick()
                        }}
                        className="block text-gray-700 hover:text-black transition-colors text-left text-base py-2"
                      >
                        Contact Us
                      </button>
                    </li>
                    <li>
                      <Link
                        href="/terms-of-service"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                        onClick={closeMenu}
                      >
                        Terms of Service
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Follow Us Section */}
                <div>
                  <h3 className="font-medium text-lg mb-4 tracking-wide text-gray-900">Follow Us</h3>
                  <ul className="space-y-4">
                    <li>
                      <a
                        href="https://instagram.com/nxtwrld.wear"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                      >
                        Instagram
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:nxtwrld.wear@gmail.com"
                        className="block text-gray-700 hover:text-black transition-colors text-base py-2"
                      >
                        Email
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>

              {/* Bottom Contact Info */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="space-y-2 text-gray-600">
                  <p className="text-sm">Can we help you?</p>
                  <p className="text-sm font-medium">nxtwrld.wear@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
