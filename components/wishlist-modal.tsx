"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Product } from "@/types" // <-- KLJUČEN POPRAVEK: Uvozite pravilen tip

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
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-[70] flex justify-end">
      <div className="bg-white w-full max-w-md h-full flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold">Your Wishlist</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {wishlistItems.length === 0 ? (
            <p className="text-gray-600 text-center mt-8">Your wishlist is empty.</p>
          ) : (
            <ul className="space-y-4">
              {wishlistItems.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-md overflow-hidden cursor-pointer flex-shrink-0"
                    onClick={() => {
                      onClose();
                      onProductClick(item);
                    }}
                  >
                    <Image src={item.images[0]} alt={item.name} width={80} height={80} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex-1">
                    <p 
                      className="font-semibold cursor-pointer hover:underline"
                      onClick={() => {
                        onClose();
                        onProductClick(item);
                      }}
                    >
                      {item.name}
                    </p>
                    <p className="text-gray-500">{item.price}</p>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => onRemoveFromWishlist(item.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
