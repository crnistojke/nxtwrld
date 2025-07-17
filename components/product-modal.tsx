"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Heart } from "lucide-react"

interface Product {
  id: number
  name: string
  images: string[]
  price: string
  category: string
  description: string
  sizes: string[]
  details: string[]
}

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onBuy: () => void
  onToggleWishlist: (product: Product) => void
  isInWishlist: boolean
}

export function ProductModal({ product, isOpen, onClose, onBuy, onToggleWishlist, isInWishlist }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [discountedPrice, setDiscountedPrice] = useState<string | null>(null)
  const [promoError, setPromoError] = useState("")

  // Reset state when product changes or modal closes
  useEffect(() => {
    if (isOpen) {
      // When a new product is opened, reset the state
      setCurrentImageIndex(0)
      setSelectedSize("")
      setPromoCode("")
      setDiscountedPrice(null)
      setPromoError("")
    }
  }, [isOpen, product])


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

  if (!isOpen || !product) return null

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
  }

  const handleClose = () => {
    onClose()
  }

  const handleApplyPromoCode = () => {
    if (promoCode.toUpperCase() === "SUMMER15") {
      // Assuming price is in format like "$99.99" or "€99.99"
      const numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
      if (!isNaN(numericPrice)) {
        const newPrice = numericPrice * 0.85;
        const currencySymbol = product.price.match(/[^0-9.]/)?.[0] || '$';
        setDiscountedPrice(`${currencySymbol}${newPrice.toFixed(2)}`);
        setPromoError("");
      } else {
        setPromoError("Invalid price format.");
      }
    } else {
      setPromoError("Invalid promo code.");
      setDiscountedPrice(null);
    }
  };


  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <Button variant="ghost" size="sm" onClick={() => onToggleWishlist(product)} className="flex items-center gap-2">
          <Heart
            className={`h-5 w-5 ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"}`}
          />
          <span className="text-sm">{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 min-h-[calc(100vh-5rem)]">
        {/* Image Gallery - Left Side */}
        <div className="p-4 md:p-6 space-y-4 bg-gray-50 overflow-y-auto">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
            <Image
              src={product.images[currentImageIndex] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
            {product.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-md"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2 justify-center overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 ${
                    currentImageIndex === index ? "border-purple-500" : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={80}
                    height={80}
                    className="object-cover w-full h-full"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info - Right Side */}
        <div className="p-4 md:p-6 overflow-y-auto">
          <div className="space-y-4 md:space-y-6 max-w-2xl">
            <div>
              <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full uppercase font-semibold mb-2">
                {product.category}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
              <div className="flex items-baseline gap-2">
                <p className={`text-2xl md:text-3xl font-bold ${discountedPrice ? 'text-gray-400 line-through' : 'text-purple-600'}`}>
                    {product.price}
                </p>
                {discountedPrice && (
                    <p className="text-2xl md:text-3xl font-bold text-purple-600">
                        {discountedPrice}
                    </p>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600 text-sm md:text-base">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Size</h3>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 py-2 border rounded-lg font-medium text-sm transition-colors ${
                      selectedSize === size
                        ? "border-purple-500 bg-purple-50 text-purple-700"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Promo Code Section */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Promo Code</h3>
              <div className="flex items-start gap-2">
                <div className="flex-grow">
                    <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => {
                            setPromoCode(e.target.value);
                            setPromoError(""); // Clear error on typing
                        }}
                        placeholder="Enter code"
                        className="w-full px-3 py-2 border rounded-lg font-medium text-sm transition-colors border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                     {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
                </div>
                <Button onClick={handleApplyPromoCode} className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg">Apply</Button>
              </div>
            </div>


            <div>
              <h3 className="text-lg font-semibold mb-2">Product Details</h3>
              <ul className="space-y-1 text-gray-600 text-sm md:text-base">
                {product.details.map((detail, index) => (
                  <li key={index}>• {detail}</li>
                ))}
              </ul>
            </div>

            <div className="pt-4 pb-4">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3"
                onClick={onBuy}
                disabled={!selectedSize}
              >
                {selectedSize ? "Buy Now" : "Select Size First"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
