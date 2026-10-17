// Site constants and configuration
export const SITE_CONFIG = {
  companyName: "Millstone Compliance",
  companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "07762 270 113",
  companyEmail: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@millstonecompliance.com",
  bookingLink: process.env.NEXT_PUBLIC_BOOKING_LINK || "#",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://millstonecompliance.com",
} as const

export const CONTACT_INFO = {
  phone: SITE_CONFIG.companyPhone,
  email: SITE_CONFIG.companyEmail,
  mailto: `mailto:${SITE_CONFIG.companyEmail}`,
  tel: `tel:+447762270113`,
} as const

