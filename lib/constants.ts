// Site constants and configuration
export const SITE_CONFIG = {
  companyName: "Millstone Compliance",
  companyPhone: process.env.NEXT_PUBLIC_COMPANY_PHONE || "+44YOURPHONE",
  companyEmail: process.env.NEXT_PUBLIC_COMPANY_EMAIL || "hello@millstonecompliance.com",
  bookingLink: process.env.NEXT_PUBLIC_BOOKING_LINK || "#",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://millstonecompliance.com",
} as const

export const NAVIGATION_LINKS = {
  home: "/",
  assessment: "/assessment",
  results: "/assessment/results",
} as const

export const CONTACT_INFO = {
  phone: SITE_CONFIG.companyPhone,
  email: SITE_CONFIG.companyEmail,
  mailto: `mailto:${SITE_CONFIG.companyEmail}`,
  tel: `tel:${SITE_CONFIG.companyPhone}`,
  emailWithTemplate: `mailto:${SITE_CONFIG.companyEmail}?subject=PPT Assessment Results - Strategy Request&body=Hi there,%0D%0A%0D%0AI've just completed the PPT compliance assessment and would like to discuss the recommended solution.%0D%0A%0D%0AMy main compliance concerns are:%0D%0A[Please describe your situation]%0D%0A%0D%0AI'm interested in:%0D%0A[ ] Understanding the gaps in detail%0D%0A[ ] Getting a custom compliance strategy%0D%0A[ ] Learning about your services%0D%0A%0D%0ABest time to reach me:%0D%0A[Please specify]%0D%0A%0D%0AThanks,%0D%0A[Your name]`,
} as const

