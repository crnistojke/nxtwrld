"use client"
import React, { useState, useEffect } from "react"
import { X, ChevronLeft, ChevronRight, Heart, CheckCircle } from "lucide-react"

// --- Type Definitions (Interfaces) ---
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

interface CheckoutDetails {
  product: Product
  selectedSize: string
  finalPrice: string
  promoApplied: boolean
}

// --- UI Helper Components (since we don't have access to @/components/ui) ---
const Button = ({ children, onClick, variant = 'default', size = 'md', className = '', disabled = false }: { children: React.ReactNode, onClick?: () => void, variant?: string, size?: string, className?: string, disabled?: boolean }) => {
  const baseStyle = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"
  const variants = {
    default: "bg-gray-900 text-white hover:bg-gray-800",
    ghost: "hover:bg-gray-100 hover:text-gray-900",
  }
  const sizes = {
    sm: "h-9 px-3",
    md: "h-10 px-4 py-2",
    lg: "h-11 rounded-md px-8",
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${baseStyle} ${variants[variant] || variants.default} ${sizes[size] || sizes.md} ${className}`}>
      {children}
    </button>
  )
}

// --- Payment Method Icons ---
const PaypalIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5.6c.3 0 .6.1.8.4l5.4 9.4c.2.4.2.9 0 1.3l-5.4 9.4c-.2.3-.5.4-.8.4H4.8c-.3 0-.6-.1-.8-.4L-1.4 11.7c-.2-.4-.2-.9 0-1.3L4 .6c.2-.3.5-.4.8-.4h9.7z"/><path d="M6.3 16v-8h2c.6 0 1.1.2 1.5.5.4.3.6.8.6 1.4 0 .6-.2 1-.5 1.3-.3.3-.8.5-1.4.5h-1v3.3h-1.2zm2.1-5.8c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-.8v2h.8zM12 16l-1-8h1.2l.5 4.1.5-4.1h1.1l.5 4.1.5-4.1h1.2l-1 8h-1.2l-.6-4-1.2 4h-1z"/></svg>
const MastercardIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}><circle cx="8" cy="12" r="7" fill="#EA001B"/><circle cx="16" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/></svg>
const BankIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 21h18M5 18v-8h14v8M5 10V5l7-4 7 4v5M3 21h18"/></svg>
const BitcoinIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.5 7.5h2.4c.8 0 1.5.3 2 .8s.8 1.2.8 2.2c0 1-.3 1.7-.8 2.2s-1.2.8-2 .8h-2.4v-6zm0 1.5v3h2.4c.4 0 .8-.1 1-.4s.4-.6.4-1.1c0-.5-.1-.9-.4-1.1s-.6-.4-1-.4h-2.4zM12 21C6.5 21 2 16.5 2 12S6.5 3 12 3s10 4.5 10 9-4.5 9-10 9zM8 11v-1.5M8 15v-1.5m8-2v-1.5m0 4.5v-1.5"/></svg>
const ApplePayIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8.3,6.2C9.2,6.3,10,7,10.5,8c0.5,1-0.2,2.5-1.2,3.5c-0.9,1-2.3,1.5-3.3,1.2C5,12.5,4.2,11.8,3.8,11C3.2,9.8,4,8.2,5,7.2C6,6.2,7.3,6,8.3,6.2z"/><path d="M12.2,6.5c-0.1,0-0.3,0-0.4,0C10.2,6.2,8.8,7,8.2,8.2c-0.2,0.3-0.3,0.6-0.4,0.9c-0.8,0.2-1.5,0.6-2.1,1.2c-1.3,1.4-1.5,3.4-0.5,5 c0.5,0.8,1.2,1.4,2,1.8c1,0.5,2.1,0.5,3.1,0.2c0.3,0.8,0.8,1.5,1.5,2c0.8,0.6,1.8,0.8,2.8,0.5c0.1,0,0.2,0,0.3,0 c1.5-0.2,2.8-1.2,3.5-2.5c0.1-0.3,0.2-0.6,0.2-0.9c0.8-0.3,1.5-0.8,2-1.5c1.1-1.4,1-3.4-0.2-4.8c-0.6-0.8-1.5-1.3-2.4-1.5 c-0.2-1-0.8-1.8-1.8-2.5C14.8,6.8,13.5,6.5,12.2,6.5z"/></svg>
const GooglePayIcon = (props) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M12.3,10.3H18c0,1.2-0.2,2.4-0.6,3.5c-1,2.8-3.5,4.8-6.4,4.8c-3.9,0-7-3.1-7-7s3.1-7,7-7c1.9,0,3.6,0.8,4.8,2l-1.8,1.8 C13.3,8.6,12.2,8,11,8c-2.2,0-4,1.8-4,4s1.8,4,4,4c2.5,0,3.6-1.7,3.8-2.5h-3.8V10.3z"/></svg>

// --- COMPONENT: ProductModal ---
function ProductModal({ product, isOpen, onClose, onBuy, onToggleWishlist, isInWishlist }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedSize, setSelectedSize] = useState("")
  const [promoCode, setPromoCode] = useState("")
  const [discountedPrice, setDiscountedPrice] = useState(null)
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
      const finalPrice = discountedPrice || product.price;
      const promoApplied = !!discountedPrice;
      onBuy(product, selectedSize, finalPrice, promoApplied);
  }

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
      <div className="flex justify-between items-center p-4 border-b">
        <Button variant="ghost" size="sm" onClick={() => onToggleWishlist(product)} className="flex items-center gap-2">
          <Heart className={`h-5 w-5 ${isInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"}`} />
          <span>{isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={onClose}><X className="h-6 w-6" /></Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="p-6 space-y-4 bg-gray-50">
          <div className="relative aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
            <img src={product.images[currentImageIndex]} alt={product.name} className="object-cover w-full h-full" />
            {product.images.length > 1 && (
              <>
                <Button variant="ghost" className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90" onClick={() => setCurrentImageIndex((p) => (p - 1 + product.images.length) % product.images.length)}><ChevronLeft /></Button>
                <Button variant="ghost" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90" onClick={() => setCurrentImageIndex((p) => (p + 1) % product.images.length)}><ChevronRight /></Button>
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
              <div className="grid grid-cols-4 gap-2">
                {product.sizes.map(size => (
                  <button key={size} onClick={() => setSelectedSize(size)} className={`px-3 py-2 border rounded-lg font-medium text-sm transition-colors ${selectedSize === size ? "border-purple-500 bg-purple-50" : "border-gray-300"}`}>{size}</button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Promo Code</h3>
              <div className="flex items-start gap-2">
                <div className="flex-grow">
                  <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter code" className="w-full px-3 py-2 border rounded-lg text-sm border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500" />
                  {promoError && <p className="text-red-500 text-sm mt-1">{promoError}</p>}
                </div>
                <Button onClick={handleApplyPromoCode} className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-lg">Apply</Button>
              </div>
            </div>
            <div className="pt-4 pb-4">
              <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3" onClick={handleBuyClick} disabled={!selectedSize}>{selectedSize ? "Buy Now" : "Select a Size"}</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- COMPONENT: CheckoutPage ---
function CheckoutPage({ details, isOpen, onBack }) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)
  
  const paymentMethods = [
    { id: 'paypal', name: 'PayPal', icon: PaypalIcon },
    { id: 'mastercard', name: 'Mastercard', icon: MastercardIcon },
    { id: 'bank', name: 'Bank Transfer', icon: BankIcon },
    { id: 'bitcoin', name: 'Bitcoin', icon: BitcoinIcon },
    { id: 'applepay', name: 'Apple Pay', icon: ApplePayIcon },
    { id: 'googlepay', name: 'Google Pay', icon: GooglePayIcon },
  ];

  useEffect(() => {
    if (!isOpen) {
      setSelectedPaymentMethod(null)
      setIsLoading(false)
      setPaymentSuccess(false)
    }
  }, [isOpen])

  if (!isOpen || !details) return null

  const handlePayment = () => {
    if (!selectedPaymentMethod) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPaymentSuccess(true);
    }, 2000);
  }

  return (
    <div className="fixed inset-0 bg-white z-[70] overflow-y-auto">
      <div className="flex items-center p-4 border-b">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-2"><ChevronLeft /><span>Back</span></Button>
      </div>
      <div className="max-w-2xl mx-auto p-8">
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
            <div className="bg-gray-50 border rounded-lg p-4 flex gap-4">
              <img src={details.product.images[0]} alt={details.product.name} className="w-24 h-24 rounded-md object-cover" />
              <div className="space-y-1">
                <p className="font-bold">{details.product.name}</p>
                <p className="text-sm text-gray-600">Size: <span className="font-medium text-gray-800">{details.selectedSize}</span></p>
                {details.promoApplied && <p className="text-sm text-green-600 font-medium">"SUMMER15" code applied</p>}
                <p className="text-lg font-bold text-purple-600 pt-1">{details.finalPrice}</p>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Select Payment Method</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {paymentMethods.map(method => (
                <button key={method.id} onClick={() => setSelectedPaymentMethod(method.id)} className={`flex flex-col items-center justify-center gap-2 p-4 border rounded-lg h-28 ${selectedPaymentMethod === method.id ? "border-purple-500 bg-purple-50" : "border-gray-300"}`}>
                  <method.icon className="h-8 w-8" />
                  <span className="text-sm font-medium">{method.name}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="pt-4">
            <Button size="lg" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white" onClick={handlePayment} disabled={!selectedPaymentMethod || isLoading}>
              {isLoading ? "Processing..." : `Pay Now (${details.finalPrice})`}
            </Button>
          </div>
        </div>
      </div>
      {paymentSuccess && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-8 text-center space-y-4 max-w-sm">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold">Payment Successful!</h3>
            <p className="text-gray-600">Thank you for your purchase.</p>
            <Button onClick={() => { setPaymentSuccess(false); onBack(); }} className="w-full bg-gray-800 text-white">Continue Shopping</Button>
          </div>
        </div>
      )}
    </div>
  )
}

// --- MAIN APPLICATION COMPONENT: App ---
export default function App() {
  // Sample product data. In a real app, this would come from an API.
  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Summer 'Sunshine' Dress",
      images: [
        "https://placehold.co/600x600/EAD9F2/333?text=Dress+1",
        "https://placehold.co/600x600/DFB8E8/333?text=Dress+2",
        "https://placehold.co/600x600/D497DD/333?text=Dress+3",
      ],
      price: "$49.99",
      category: "Dresses",
      description: "A light and airy summer dress, perfect for warm days. Made from 100% organic cotton.",
      sizes: ["XS", "S", "M", "L", "XL"],
      details: ["100% Organic Cotton", "Machine Washable", "Made in the EU"],
    },
    {
      id: 2,
      name: "Classic Denim Jacket",
      images: [
        "https://placehold.co/600x600/A9C5E8/333?text=Jacket+1",
        "https://placehold.co/600x600/87A9D0/333?text=Jacket+2",
      ],
      price: "$89.99",
      category: "Jackets",
      description: "A timeless denim jacket that pairs with anything. A wardrobe essential.",
      sizes: ["S", "M", "L"],
      details: ["98% Cotton, 2% Elastane", "Durable Stitching", "Classic Fit"],
    }
  ]);

  // State management for the entire application
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [checkoutDetails, setCheckoutDetails] = useState<CheckoutDetails | null>(null)
  const [wishlist, setWishlist] = useState<number[]>([])

  // Event Handlers
  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
  }

  const handleCloseModal = () => {
    setSelectedProduct(null);
  }

  const handleToggleWishlist = (p: Product) => {
    setWishlist(current => current.includes(p.id) ? current.filter(id => id !== p.id) : [...current, p.id])
  }

  const handleBuyNow = (prod: Product, size: string, price: string, promo: boolean) => {
    setCheckoutDetails({
      product: prod,
      selectedSize: size,
      finalPrice: price,
      promoApplied: promo,
    })
    setSelectedProduct(null); // Close the product modal
    setIsCheckoutOpen(true); // Open the checkout page
  }

  const handleBackFromCheckout = () => {
    setIsCheckoutOpen(false);
    setCheckoutDetails(null);
  }

  return (
    <div className="font-sans bg-gray-100 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Our Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img className="w-full h-64 object-cover" src={product.images[0]} alt={product.name} />
              <div className="p-6">
                <div className="uppercase tracking-wide text-sm text-purple-600 font-semibold">{product.category}</div>
                <h2 className="block mt-1 text-lg leading-tight font-bold text-black">{product.name}</h2>
                <p className="mt-2 text-gray-500">{product.price}</p>
                <Button onClick={() => handleProductSelect(product)} className="mt-4 w-full bg-purple-600 text-white">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <ProductModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={handleCloseModal}
        onBuy={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isInWishlist={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
      />

      <CheckoutPage
        details={checkoutDetails}
        isOpen={isCheckoutOpen}
        onBack={handleBackFromCheckout}
      />
    </div>
  )
}
