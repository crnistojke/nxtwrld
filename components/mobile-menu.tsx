"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { ProtectedLink } from "./protected-link"

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
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
  }, [isOpen])

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <Button variant="ghost" size="sm" onClick={toggleMenu}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden">
          <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-white shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/images/logonxtwrld.png"
                    alt="NXT WRLD Logo"
                    width={30}
                    height={30}
                    className="object-contain"
                  />
                  <span className="text-lg font-bold text-gray-900">NXT WRLD</span>
                </div>
                <Button variant="ghost" size="sm" onClick={closeMenu}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <nav className="p-6">
              <ul className="space-y-6">
                <li>
                  <Link
                    href="/"
                    className="block text-xl font-medium text-gray-700 hover:text-purple-600 py-2"
                    onClick={closeMenu}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <ProtectedLink
                    href="/products"
                    className="block text-xl font-medium text-gray-700 hover:text-purple-600 py-2"
                    onClick={closeMenu}
                  >
                    Products
                  </ProtectedLink>
                </li>
                <li>
                  <ProtectedLink
                    href="/about"
                    className="block text-xl font-medium text-gray-700 hover:text-purple-600 py-2"
                    onClick={closeMenu}
                  >
                    About
                  </ProtectedLink>
                </li>
                <li>
                  <ProtectedLink
                    href="/drops"
                    className="block text-xl font-medium text-gray-700 hover:text-purple-600 py-2"
                    onClick={closeMenu}
                  >
                    Drops
                  </ProtectedLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
