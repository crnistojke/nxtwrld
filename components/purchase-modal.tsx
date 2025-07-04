"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Mail, MessageCircle, Instagram, CreditCard } from "lucide-react"
import { TermsAgreementModal } from "./terms-agreement-modal"

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  productName: string
}

export function PurchaseModal({ isOpen, onClose, productName }: PurchaseModalProps) {
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<string | null>(null)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen || showTermsModal) {
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
  }, [isOpen, showTermsModal])

  useEffect(() => {
    // Check if user has already accepted terms in this session
    const accepted = sessionStorage.getItem("termsAccepted")
    if (accepted === "true") {
      setHasAcceptedTerms(true)
    }
  }, [])

  if (!isOpen) return null

  const handleActionClick = (action: string) => {
    if (!hasAcceptedTerms) {
      setPendingAction(action)
      setShowTermsModal(true)
    } else {
      executeAction(action)
    }
  }

  const executeAction = (action: string) => {
    switch (action) {
      case "gmail":
        window.open(`mailto:nxtwrld.wear@gmail.com?subject=Purchase Inquiry - ${productName}`, "_blank")
        break
      case "instagram":
        window.open("https://instagram.com/nxtwrld.wear", "_blank")
        break
      case "whatsapp":
        alert("Not Yet")
        break
      case "paypal":
        alert("Not Yet")
        break
    }
    onClose()
  }

  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true)
    sessionStorage.setItem("termsAccepted", "true")
    setShowTermsModal(false)
    if (pendingAction) {
      executeAction(pendingAction)
      setPendingAction(null)
    }
  }

  const handleCloseTermsModal = () => {
    setShowTermsModal(false)
    setPendingAction(null)
  }

  const handleClose = () => {
    setShowTermsModal(false)
    setPendingAction(null)
    onClose()
  }

  return (
    <>
      <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-light tracking-wide text-gray-900">Buy via</h2>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] p-6">
          <div className="w-full max-w-md space-y-4">
            <Button
              onClick={() => handleActionClick("gmail")}
              className="w-full flex items-center justify-center gap-3 h-16 bg-red-500 hover:bg-red-600 text-lg"
            >
              <Mail className="h-6 w-6" />
              Gmail - nxtwrld.wear@gmail.com
            </Button>

            <Button
              onClick={() => handleActionClick("whatsapp")}
              className="w-full flex items-center justify-center gap-3 h-16 bg-green-500 hover:bg-green-600 text-lg"
            >
              <MessageCircle className="h-6 w-6" />
              WhatsApp
            </Button>

            <Button
              onClick={() => handleActionClick("instagram")}
              className="w-full flex items-center justify-center gap-3 h-16 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-lg"
            >
              <Instagram className="h-6 w-6" />
              Instagram - @nxtwrld.wear
            </Button>

            <Button
              onClick={() => handleActionClick("paypal")}
              className="w-full flex items-center justify-center gap-3 h-16 bg-blue-500 hover:bg-blue-600 text-lg"
            >
              <CreditCard className="h-6 w-6" />
              PayPal
            </Button>

            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-500">Master Card, Bitcoin & Bank Coming Soon...</p>
            </div>
          </div>
        </div>
      </div>

      <TermsAgreementModal
        isOpen={showTermsModal}
        onClose={handleCloseTermsModal}
        onAccept={handleAcceptTerms}
        targetUrl=""
      />
    </>
  )
}
