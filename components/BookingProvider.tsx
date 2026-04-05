"use client"

import React, { createContext, useContext, useState, useCallback } from "react"
import { EmailTemplateModal } from "@/components/EmailTemplateModal"

type ServiceId = "discovery" | "snapshot" | "setup"

interface BookingContextValue {
  openBooking: (service?: ServiceId) => void
}

const BookingContext = createContext<BookingContextValue>({ openBooking: () => {} })

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen]   = useState(false)
  const [service, setService] = useState<ServiceId>("discovery")

  const openBooking = useCallback((s: ServiceId = "discovery") => {
    setService(s)
    setIsOpen(true)
  }, [])

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <EmailTemplateModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        defaultService={service}
      />
    </BookingContext.Provider>
  )
}

export function useBooking() {
  return useContext(BookingContext)
}
