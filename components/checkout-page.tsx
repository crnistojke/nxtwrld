"use client"
import React, { useState, useEffect } from "react"
import { ChevronLeft, CheckCircle } from "lucide-react"

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

const PaypalIcon = (props) => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5.6c.3 0 .6.1.8.4l5.4 9.4c.2.4.2.9 0 1.3l-5.4 9.4c-.2.3-.5.4-.8.4H4.8c-.3 0-.6-.1-.8-.4L-1.4 11.7c-.2-.4-.2-.9 0-1.3L4 .6c.2-.3.5-.4.8-.4h9.7z"/><path d="M6.3 16v-8h2c.6 0 1.1.2 1.5.5.4.3.6.8.6 1.4 0 .6-.2 1-.5 1.3-.3.3-.8.5-1.4.5h-1v3.3h-1.2zm2.1-5.8c.3 0 .5-.1.7-.3.2-.2.3-.4.3-.7s-.1-.5-.3-.7c-.2-.2-.4-.3-.7-.3h-.8v2h.8zM12 16l-1-8h1.2l.5 4.1.5-4.1h1.1l.5 4.1.5-4.1h1.2l-1 8h-1.2l-.6-4-1.2 4h-1z"/></svg>
const MastercardIcon = (props) => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" {...props}><circle cx="8" cy="12" r="7" fill="#EA001B"/><circle cx="16" cy="12" r="7" fill="#F79E1B" fillOpacity="0.8"/></svg>
const BankIcon = (props) => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M3 21h18M5 18v-8h14v8M5 10V5l7-4 7 4v5M3 21h18"/></svg>
const BitcoinIcon = (props) => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10.5 7.5h2.4c.8 0 1.5.3 2 .8s.8 1.2.8 2.2c0 1-.3 1.7-.8 2.2s-1.2.8-2 .8h-2.4v-6zm0 1.5v3h2.4c.4 0 .8-.1 1-.4s.4-.6.4-1.1c0-.5-.1-.9-.4-1.1s-.6-.4-1-.4h-2.4zM12 21C6.5 21 2 16.5 2 12S6.5 3 12 3s10 4.5 10 9-4.5 9-10 9zM8 11v-1.5M8 15v-1.5m8-2v-1.5m0 4.5v-1.5"/></svg>
const ApplePayIcon = (props) => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}><path d="M8.3,6.2C9.2,6.3,10,7,10.5,8c0.5,1-0.2,2.5-1.2,3.5c-0.9,1-2.3,1.5-3.3,1.2C5,12.5,4.2,11.8,3.8,11C3.2,9.8,4,8.2,5,7.2C6,6.2,7.3,6,8.3,6.2z"/><path d="M12.2,6.5c-0.1,0-0.3,0-0.4,0C10.2,6.2,8.8,7,8.2,8.2c-0.2,0.3-0.3,0.6-0.4,0.9c-0.8,0.2-1.5,0.6-2.1,1.2c-1.3,1.4-1.5,3.4-0.5,5 c0.5,0.8,1.2,1.4,2,1.8c1,0.5,2.1,0.5,3.1,0.2c0.3,0.8,0.8,1.5,1.5,2c0.8,0.6,1.8,0.8,2.8,0.5c0.1,0,0.2,0,0.3,0 c1.5-0.2,2.8-1.2,3.5-2.5c0.1-0.3,0.2-0.6,0.2-0.9c0.8-0.3,1.5-0.8,2-1.5c1.1-1.4,1-3.4-0.2-4.8c-0.6-0.8-1.5-1.3-2.4-1.5 c-0.2-1-0.8-1.8-1.8-2.5C14.8,6.8,13.5,6.5,12.2,6.5z"/></svg>
const GooglePayIcon = (props) => <svg xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}><path d="M12.3,10.3H18c0,1.2-0.2,2.4-0.6,3.5c-1,2.8-3.5,4.8-6.4,4.8c-3.9,0-7-3.1-7-7s3.1-7,7-7c1.9,0,3.6,0.8,4.8,2l-1.8,1.8 C13.3,8.6,12.2,8,11,8c-2.2,0-4,1.8-4,4s1.8,4,4,4c2.5,0,3.6-1.7,3.8-2.5h-3.8V10.3z"/></svg>

interface CheckoutDetails {
  product: {
    name: string;
    images: string[];
  };
  selectedSize: string;
  finalPrice: string;
  promoApplied: boolean;
}

interface CheckoutPageProps {
  details: CheckoutDetails | null;
  isOpen: boolean;
  onBack: () => void;
}

export function CheckoutPage({ details, isOpen, onBack }: CheckoutPageProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null)
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
