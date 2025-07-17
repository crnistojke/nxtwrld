"use client"
import React, { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Product {
  id: number;
  name: string;
  images: string[];
  price: string;
  category: string;
  description: string;
  sizes: string[];
  details: string[];
}

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onBuy: (details: { product: Product, selectedSize: string, finalPrice: string, promoApplied: boolean }) => void;
  onToggleWishlist: (product: Product) => void;
  isInWishlist: boolean;
}

export function ProductModal({ product, isOpen, onClose, onBuy, onToggleWishlist, isInWishlist }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [discountedPrice, setDiscountedPrice] = useState<string | null>(null)
  const [promoError, setPromoError] = useState("")

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => { document.body.style.overflow = "unset" }
  }, [isOpen])

  // Reset state when a new product is selected
  useEffect(() => {
    if (product) {
      setCurrentImageIndex(0)
      setSelectedSize("")
      setPromoCode("")
      setDiscountedPrice(null)
      setPromoError("")
    }
  }, [product])

  if (!isOpen || !product) return null

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === "SUMMER15") {
      const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''))
      if (!isNaN(numericPrice)) {
        const newPrice = numericPrice * 0.85
        const currencySymbol = product.price.match(/[^0-9.]/)?.[0] || '$'
        setDiscountedPrice(`${currencySymbol}${newPrice.toFixed(2)}`)
        setPromoError("")
      }
    } else {
      setPromoError("Invalid promo code.")
      setDiscountedPrice(null)
    }
  }

  const handleBuyClick = () => {
    if (!selectedSize) return;
    const finalPrice = discountedPrice || product.price;
    const promoApplied = !!discountedPrice;
    onBuy({
        product,
        selectedSize,
        finalPrice,
        promoApplied
    });
  }

  return (
    <div className="fixed inset-0 bg-white z-[70] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => onToggleWishlist(product)} className="flex items-center gap-2">
          <Heart className={`h-5 w-5 ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"}`} />
          <span>{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}><X className="h-6 w-6" /></Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 space-y-4 bg-gray-50">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
            <Image src={product.images[currentImageIndex]} alt={product.name} layout="fill" className="object-cover" />
            {product.images.length > 1 && (
              <>
                <Button variant="ghost" size="icon" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white" onClick={() => setCurrentImageIndex((p) => (p - 1 + product.images.length) % product.images.length)}><ChevronLeft /></Button>
                <Button variant="ghost" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white" onClick={() => setCurrentImageIndex((p) => (p + 1) % product.images.length)}><ChevronRight /></Button>
              </>
            )}
          </div>
        </div>
        <div className="p-6 overflow-y-auto">
          <div className="space-y-6 max-w-2xl">
            <div>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full uppercase font-semibold mb-2">{product.category}</span>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <div className="flex items-baseline gap-2">
                <p className={`text-3xl font-bold ${discountedPrice ? 'text-gray-400 line-through' : 'text-purple-600'}`}>{product.price}</p>
                {discountedPrice && <p className="text-3xl font-bold text-purple-600">{discountedPrice}</p>}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-2 border rounded-lg font-medium text-sm transition-colors ${selectedSize === size ? "border-purple-500 bg-purple-50 text-purple-700" : "border-gray-300 hover:border-gray-400"}`}>{size}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Promo Code</h3>
              <div className="flex items-start gap-2">
                <div className="flex-grow">
                  <input type="text" value={promoCode} onChange={(e) => { setPromoCode(e.target.value); setPromoError(''); }} placeholder="Enter code" className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
                </div>
                <Button onClick={handleApplyPromoCode} className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg">Apply</Button>
              </div>
            </div>
            <div className="pt-4 pb-4">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 hover:from-purple-700 hover:to-blue-700" onClick={handleBuyClick} disabled={!selectedSize}>{selectedSize ? "Buy Now" : "Select a Size"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
