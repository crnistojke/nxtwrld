"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Mail, MessageCircle, Instagram, Send } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

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

  if (!isOpen) return null

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:nxtwrld.wear@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    )}`
    window.open(mailtoLink, "_blank")
    onClose()
  }

  const handleDirectContact = (method: string) => {
    switch (method) {
      case "email":
        window.open("mailto:nxtwrld.wear@gmail.com", "_blank")
        break
      case "instagram":
        window.open("https://instagram.com/nxtwrld.wear", "_blank")
        break
      case "whatsapp":
        alert("WhatsApp coming soon!")
        break
    }
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="text-2xl font-light tracking-wide text-gray-900">Contact Us</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>

      <div className="p-6 space-y-8 max-w-4xl mx-auto">
        {/* Quick Contact Options */}
        <div>
          <h3 className="text-lg font-medium mb-4">Get in Touch</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button
              onClick={() => handleDirectContact("email")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-12"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
            <Button
              onClick={() => handleDirectContact("instagram")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-12"
            >
              <Instagram className="h-4 w-4" />
              Instagram
            </Button>
            <Button
              onClick={() => handleDirectContact("whatsapp")}
              variant="outline"
              className="flex items-center justify-center gap-2 h-12"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Button>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-lg font-medium mb-4">Send us a Message</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                value={formData.subject}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-black hover:bg-gray-800 text-white flex items-center justify-center gap-2"
            >
              <Send className="h-4 w-4" />
              Send Message
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="space-y-2 text-gray-600">
            <p>
              <strong>Email:</strong> nxtwrld.wear@gmail.com
            </p>
            <p>
              <strong>Instagram:</strong> @nxtwrld.wear
            </p>
            <p>
              <strong>Response Time:</strong> Within 24 hours
            </p>
            <p>
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM CET
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
