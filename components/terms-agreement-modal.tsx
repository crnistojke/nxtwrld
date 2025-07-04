"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { X, FileText } from "lucide-react"
import Link from "next/link"

interface TermsAgreementModalProps {
  isOpen: boolean
  onClose: () => void
  onAccept: () => void
  targetUrl: string
}

export function TermsAgreementModal({ isOpen, onClose, onAccept, targetUrl }: TermsAgreementModalProps) {
  // Lock body scroll when modal is open and prevent scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.style.position = "fixed"
      document.body.style.top = "0"
      document.body.style.left = "0"
      document.body.style.right = "0"
    } else {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.top = "unset"
      document.body.style.left = "unset"
      document.body.style.right = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
      document.body.style.position = "unset"
      document.body.style.top = "unset"
      document.body.style.left = "unset"
      document.body.style.right = "unset"
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <Card className="max-w-md w-full mx-4">
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <h2 className="text-xl font-bold text-gray-900">Terms of Service</h2>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4 mb-6">
            <p className="text-gray-600">By using this service, you agree to NXT WRLD's terms of service.</p>
            <p className="text-sm text-gray-500">
              Please read our terms of service before continuing.{" "}
              <Link
                href="/terms-of-service"
                className="text-purple-600 hover:text-purple-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read More
              </Link>
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              onClick={onAccept}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              I Agree to Terms
            </Button>
            <Button onClick={onClose} variant="outline" className="w-full bg-transparent">
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
