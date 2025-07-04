"use client"

import { useState, useEffect } from "react"
import { X } from "lucide-react"

export function NotificationBanner() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  const notifications = [
    "🔥 Free worldwide shipping on orders over €50!",
    "✨ New drops coming soon - stay tuned!",
    "💫 Transform your style with NXT WRLD",
    "🌍 Join thousands in the transformation journey",
    "🎯 Limited edition pieces available now",
    "💎 Premium quality, sustainable fashion",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % notifications.length)
    }, 10000) // Change every 10 seconds

    return () => clearInterval(interval)
  }, [notifications.length])

  if (!isVisible) return null

  return (
    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 px-4 relative z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center">
          <p className="text-sm md:text-base font-medium animate-fade-in">{notifications[currentTextIndex]}</p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-4 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
