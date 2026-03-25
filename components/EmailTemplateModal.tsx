"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { X, Mail, Calendar, Clock, Send, Copy } from "lucide-react"
import { CONTACT_INFO } from "@/lib/constants"

interface EmailTemplateModalProps {
  isOpen: boolean
  onClose: () => void
}

export function EmailTemplateModal({ isOpen, onClose }: EmailTemplateModalProps) {
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [contactName, setContactName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [additionalNotes, setAdditionalNotes] = useState("")

  const generateEmailTemplate = () => {
    const currentDate = new Date().toLocaleDateString('en-GB')
    const subject = "Compliance Audit Enquiry"

    const body = `Dear Millstone Compliance Team,

I am writing to enquire about booking a compliance audit for my organisation.

**Our Details:**
• Organisation: ${companyName || '[Your Organisation Name]'}
• Contact: ${contactName || '[Your Name]'}
• Phone: ${phoneNumber || '[Your Phone Number]'}

**Preferred Appointment:**
${selectedDate && selectedTime ? `• Date: ${selectedDate} at ${selectedTime}` : '• Please suggest your available dates and times'}

${additionalNotes ? `**Additional Notes:**
${additionalNotes}

` : ''}Please let me know the next steps to get our audit booked.

Thank you,
${contactName || '[Your Name]'}

---
Sent via Millstone Compliance Contact Form
${currentDate}`

    return { subject, body }
  }

  const handleCopyToClipboard = async () => {
    const { subject, body } = generateEmailTemplate()
    const fullEmail = `Subject: ${subject}\n\n${body}`
    
    try {
      await navigator.clipboard.writeText(fullEmail)
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  const handleOpenEmailClient = () => {
    const { subject, body } = generateEmailTemplate()
    const mailtoLink = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(mailtoLink)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center animate-fade-in overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-emerald-900/40 backdrop-blur-xl"
        onClick={onClose}
      ></div>

      {/* Modal container */}
      <div className="relative w-full max-w-lg mx-4 my-4 sm:my-6 animate-scale-in">
        {/* Modal card */}
        <div className="relative bg-white/95 backdrop-blur-2xl rounded-2xl border border-emerald-100/50 shadow-[0_24px_64px_rgba(6,95,70,0.2)] overflow-hidden max-h-[90vh] flex flex-col">

          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-50 to-emerald-100/50 px-4 py-3 border-b border-emerald-100/50 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <h3 className="poppins-semibold text-base text-emerald-900">Book a Compliance Audit</h3>
                  <p className="text-xs text-emerald-600">Fill in your details and send directly to us</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors duration-200"
              >
                <X className="w-4 h-4 text-emerald-600" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-4 space-y-4 overflow-y-auto flex-1">
            {/* Contact Information Form */}
            <div className="space-y-3">
              <h4 className="poppins-semibold text-sm text-emerald-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Your Information
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-emerald-700 mb-1">Company Name</label>
                  <Input
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Your Company Name"
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-emerald-700 mb-1">Your Name</label>
                  <Input
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Your Full Name"
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-emerald-700 mb-1">Phone Number</label>
                  <Input
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Your Phone Number"
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-emerald-700 mb-1">Preferred Date</label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 h-9 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-emerald-700 mb-1">Preferred Time</label>
                  <Input
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 h-9 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-emerald-700 mb-1">Additional Notes (Optional)</label>
                  <Textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Any specific questions or requirements..."
                    className="border-emerald-200 focus:border-emerald-400 focus:ring-emerald-400 min-h-[60px] text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Email Preview */}
            <div className="space-y-2">
              <h4 className="poppins-semibold text-sm text-emerald-900 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                Email Preview
              </h4>

              <Card className="border-emerald-200 bg-emerald-50/50">
                <CardContent className="p-3">
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Subject</label>
                      <p className="text-xs text-emerald-900 font-medium">Compliance Audit Enquiry</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-emerald-600 uppercase tracking-wide">To</label>
                      <p className="text-xs text-emerald-900">{CONTACT_INFO.email}</p>
                    </div>
                    <div>
                      <label className="text-xs font-medium text-emerald-600 uppercase tracking-wide">Message Preview</label>
                      <div className="mt-1 p-2 bg-white rounded-lg border border-emerald-200 max-h-24 overflow-y-auto">
                        <pre className="text-xs text-emerald-800 whitespace-pre-wrap font-mono">
                          {generateEmailTemplate().body.substring(0, 200)}...
                        </pre>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-emerald-100">
              <Button
                onClick={handleOpenEmailClient}
                className="flex-1 bg-emerald-700 hover:bg-emerald-800 text-white poppins-semibold py-2 px-4 text-sm transition-all duration-300 hover:scale-105"
              >
                <Send className="w-4 h-4 mr-2" />
                Open Email Client
              </Button>
              <Button
                onClick={handleCopyToClipboard}
                variant="outline"
                className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50 poppins-semibold py-2 px-4 text-sm transition-all duration-300"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Template
              </Button>
            </div>

            <div className="text-center pb-1">
              <p className="text-xs text-emerald-600">
                The template will open in your default email client with all information pre-filled
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
