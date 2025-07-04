"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { TermsAgreementModal } from "./terms-agreement-modal"

interface ProtectedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export function ProtectedLink({ href, children, className, onClick }: ProtectedLinkProps) {
  const [showTermsModal, setShowTermsModal] = useState(false)
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false)

  useEffect(() => {
    // Check if user has already accepted terms in this session
    const accepted = sessionStorage.getItem("termsAccepted")
    if (accepted === "true") {
      setHasAcceptedTerms(true)
    }
  }, [])

  const handleClick = (e: React.MouseEvent) => {
    if (!hasAcceptedTerms && href !== "/terms-of-service") {
      e.preventDefault()
      e.stopPropagation()
      setShowTermsModal(true)
      return false
    } else if (onClick) {
      onClick()
    }
  }

  const handleAcceptTerms = () => {
    setHasAcceptedTerms(true)
    sessionStorage.setItem("termsAccepted", "true")
    setShowTermsModal(false)
    // Navigate to the intended destination
    window.location.href = href
  }

  const handleCloseModal = () => {
    setShowTermsModal(false)
  }

  return (
    <>
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
      <TermsAgreementModal
        isOpen={showTermsModal}
        onClose={handleCloseModal}
        onAccept={handleAcceptTerms}
        targetUrl={href}
      />
    </>
  )
}
