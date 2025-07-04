"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  images: string[]
  price: string
  category: string
  description?: string
}

interface ProductCardProps {
  product: Product
  onProductClick: (product: Product) => void
  onToggleWishlist: (product: Product) => void
  isInWishlist: boolean
}

export function ProductCard({ product, onProductClick, onToggleWishlist, isInWishlist }: ProductCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-shadow cursor-pointer relative">
      <CardContent className="p-0">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
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
              onToggleWishlist(product)
            }}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white shadow-md"
          >
            <Heart
              className={`h-4 w-4 ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"}`}
            />
          </Button>
        </div>
        <div className="p-6" onClick={() => onProductClick(product)}>
          {product.category && (
            <div className="mb-2">
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full uppercase font-semibold">
                {product.category}
              </span>
            </div>
          )}
          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
          {product.description && <p className="text-gray-600 text-sm mb-4">{product.description}</p>}
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-gray-900">{product.price}</span>
            <Button>View Details</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
