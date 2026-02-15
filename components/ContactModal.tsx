"use client"

import React, { useState } from "react"
import { X, Mail, Building, User, MessageSquare, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    message: "",
    preferredDate: ""
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create mailto link with form data
    const subject = encodeURIComponent("Compliance Consultation Request")
    const body = encodeURIComponent(
      `Hello Millstone Compliance,\n\n` +
      `I would like to discuss compliance assistance.\n\n` +
      `Name: ${formData.name}\n` +
      `Company: ${formData.company}\n` +
      `What I need help with: ${formData.message}\n` +
      `Preferred contact date and time: ${formData.preferredDate}\n\n` +
      `Thank you.`
    )
    
    window.location.href = `mailto:info@millstonecompliance.com?subject=${subject}&body=${body}`
    
    // Reset form and close modal
    setFormData({ name: "", company: "", message: "", preferredDate: "" })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-emerald-900/40 backdrop-blur-xl"
        onClick={onClose}
      ></div>
      
      {/* Modal container */}
      <div className="relative w-full max-w-2xl animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close contact form"
          className="absolute -top-4 -right-4 z-10 w-12 h-12 rounded-full bg-white border border-emerald-100 flex items-center justify-center group/close hover:bg-emerald-50 transition-all duration-300 hover:scale-110 hover:rotate-90 shadow-lg"
        >
          <X className="w-6 h-6 text-emerald-600 group-hover/close:text-emerald-700 transition-colors duration-300" />
        </button>

        {/* Modal content */}
        <div className="relative bg-white rounded-3xl border border-emerald-100 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-8 py-6 text-white">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h2 className="poppins-bold text-2xl">Contact Us</h2>
                <p className="text-sm text-emerald-50">We'll get back to you within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-8 py-6 space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="flex items-center gap-2 poppins-medium text-sm text-emerald-900 mb-2">
                <User className="w-4 h-4 text-emerald-600" />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Smith"
                className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all poppins-regular text-sm"
              />
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="flex items-center gap-2 poppins-medium text-sm text-emerald-900 mb-2">
                <Building className="w-4 h-4 text-emerald-600" />
                Company Name
              </label>
              <input
                type="text"
                id="company"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Your Company Ltd"
                className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all poppins-regular text-sm"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="flex items-center gap-2 poppins-medium text-sm text-emerald-900 mb-2">
                <MessageSquare className="w-4 h-4 text-emerald-600" />
                What do you need help with?
              </label>
              <textarea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your compliance needs..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all poppins-regular text-sm resize-none"
              />
            </div>

            {/* Preferred Date/Time */}
            <div>
              <label htmlFor="preferredDate" className="flex items-center gap-2 poppins-medium text-sm text-emerald-900 mb-2">
                <Calendar className="w-4 h-4 text-emerald-600" />
                Preferred contact date and time
              </label>
              <input
                type="text"
                id="preferredDate"
                required
                value={formData.preferredDate}
                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                placeholder="e.g., Next Monday at 2pm"
                className="w-full px-4 py-3 rounded-xl border border-emerald-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all poppins-regular text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white poppins-semibold py-6 text-base shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Send Message
                <Mail className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Info text */}
            <p className="text-xs text-center text-emerald-600 poppins-regular">
              This will open your email client with the information pre-filled
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
