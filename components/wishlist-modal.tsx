"use client"

import { useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, Heart, ShoppingBag } from "lucide-react"

interface Product {
  id: number
  name: string
  images: string[]
  price: string
  category: string
}

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
  wishlistItems: Product[]
  onRemoveFromWishlist: (productId: number) => void
  onProductClick: (product: Product) => void
}

export function WishlistModal({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onProductClick,
}: WishlistModalProps) {
  // Lock body scroll when modal is open
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-red-500" />
          <h2 className="text-2xl font-light tracking-wide text-gray-900">Wishlist ({wishlistItems.length})</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-6">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
            <p className="text-gray-600 mb-6">Start adding products you love to your wishlist</p>
            <Button onClick={onClose} className="bg-black hover:bg-gray-800 text-white">
              Continue Shopping
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="group hover:shadow-lg transition-shadow bg-white rounded-lg border border-gray-200 overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      onRemoveFromWishlist(product.id)
                    }}
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md"
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                  </Button>
                </div>
                <div className="p-4">
                  <div className="mb-2">
                    <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                      {product.category}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">{product.price}</span>
                    <Button
                      size="sm"
                      onClick={() => onProductClick(product)}
                      className="bg-black hover:bg-gray-800 text-white"
                    >
                      <ShoppingBag className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
