"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Mail, Heart } from "lucide-react"
import { ProtectedLink } from "./protected-link"

interface MobileNavigationProps {
  onContactClick: () => void
  onWishlistClick: () => void
  wishlistCount: number
}

export function MobileNavigation({ onContactClick, onWishlistClick, wishlistCount }: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = "0"
      document.body.style.left = "0"
      document.body.style.right = "0"
      document.body.style.width = "100%"
      document.body.style.height = "100%"
    } else {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.top = "unset"
      document.body.style.left = "unset"
      document.body.style.right = "unset"
      document.body.style.width = "unset"
      document.body.style.height = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.top = "unset"
      document.body.style.left = "unset"
      document.body.style.right = "unset"
      document.body.style.width = "unset"
      document.body.style.height = "unset"
    }
  }, [isMenuOpen])

  return (
    <>
      {/* Mobile Navigation Bar - Louis Vuitton Style */}
      <nav className="md:hidden bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center h-16 px-4">
          {/* Hamburger Menu - Left */}
          <Button variant="ghost" size="sm" onClick={toggleMenu} className="p-2">
            <Menu className="h-6 w-6 text-black" strokeWidth={1.5} />
          </Button>

          {/* Centered Brand Text - Moved towards right (contact/wishlist icons) */}
          <div className="flex-1 flex justify-center items-center pl-8">
            <Link href="/">
              <span className="text-lg font-bold tracking-[0.2em] text-black">NXT WRLD</span>
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onWishlistClick} className="p-2 relative">
              <Heart className="h-6 w-6 text-black" strokeWidth={1.5} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={onContactClick} className="p-2">
              <Mail className="h-6 w-6 text-black" strokeWidth={1.5} />
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Full Screen with No Scroll */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Full Screen Menu - Fixed Height */}
          <div className="fixed inset-0 bg-white" style={{ height: "100vh", overflow: "hidden" }}>
            {/* Menu Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
              <span className="text-lg font-bold tracking-[0.2em] text-black">NXT WRLD</span>
              <Button variant="ghost" size="sm" onClick={closeMenu} className="p-2">
                <X className="h-6 w-6 text-black" strokeWidth={1.5} />
              </Button>
            </div>

            {/* Menu Items - Fixed positioning with exact height */}
            <div
              style={{ height: "calc(100vh - 4rem)", overflow: "hidden" }}
              className="flex items-start justify-center pt-12"
            >
              <nav className="text-center w-full">
                <ul className="space-y-5 px-6">
                  <li>
                    <Link
                      href="/"
                      className="block text-2xl font-light text-black hover:text-gray-600 transition-colors py-2"
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <ProtectedLink
                      href="/products"
                      className="block text-2xl font-light text-black hover:text-gray-600 transition-colors py-2"
                      onClick={closeMenu}
                    >
                      Products
                    </ProtectedLink>
                  </li>
                  <li>
                    <ProtectedLink
                      href="/about"
                      className="block text-2xl font-light text-black hover:text-gray-600 transition-colors py-2"
                      onClick={closeMenu}
                    >
                      About
                    </ProtectedLink>
                  </li>
                  <li>
                    <ProtectedLink
                      href="/drops"
                      className="block text-2xl font-light text-black hover:text-gray-600 transition-colors py-2"
                      onClick={closeMenu}
                    >
                      Drops
                    </ProtectedLink>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        closeMenu()
                        onWishlistClick()
                      }}
                      className="block text-2xl font-light text-black hover:text-gray-600 transition-colors py-2 w-full"
                    >
                      Wishlist ({wishlistCount})
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        closeMenu()
                        onContactClick()
                      }}
                      className="block text-2xl font-light text-black hover:text-gray-600 transition-colors py-2 w-full"
                    >
                      Contact
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
