"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"
import { Product } from "@/types" // <-- KLJUČEN POPRAVEK: Uvozite pravilen tip

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

// Ta datoteka definira in izvaža SAMO ProductCard komponento
export function ProductCard({ product, onProductClick, onToggleWishlist, isInWishlist }: ProductCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden group">
      <div className="relative">
        <div 
          onClick={() => onProductClick(product)}
          className="relative aspect-[4/5] w-full overflow-hidden cursor-pointer"
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:opacity-75 transition-opacity"
          />
        </div>
        <div className="absolute top-3 right-3">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-white/80 hover:bg-white"
            onClick={() => onToggleWishlist(product)}
          >
            <Heart className={`h-5 w-5 ${isInWishlist ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
          </Button>
        </div>
      </div>
      <div className="p-4 text-center">
        <h3 
          onClick={() => onProductClick(product)} 
          className="text-lg font-bold text-gray-900 cursor-pointer"
        >
          {product.name}
        </h3>
        <p className="mt-2 text-gray-600">{product.price}</p>
      </div>
    </div>
  )
}
