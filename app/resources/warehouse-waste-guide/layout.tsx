import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Warehouse Waste Duty of Care & Simpler Recycling Guide 2026',
  description: 'Practical guide for warehouse operators on Waste Duty of Care, Simpler Recycling, correct waste segregation, and choosing authorised contractors.',
  keywords: [
    'warehouse waste duty of care',
    'simpler recycling warehouses',
    'warehouse waste management',
    'waste transfer note warehouse',
    'waste duty of care uk',
    'warehouse recycling compliance',
    'waste carrier authorised',
    'environmental protection act warehouse',
    'warehouse waste segregation',
    'simpler recycling 2025 businesses',
    'waste compliance warehouse',
    'warehouse cardboard recycling',
  ],
  openGraph: {
    title: 'Warehouse Waste Duty of Care & Simpler Recycling: A Practical Guide',
    description: 'Legal obligations, Simpler Recycling reforms, and practical setup steps for warehouse operators. Avoid unlimited fines and criminal prosecution.',
    type: 'article',
    locale: 'en_GB',
    siteName: 'Millstone Compliance',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Warehouse Waste Duty of Care & Simpler Recycling: A Practical Guide',
    description: 'Legal obligations, Simpler Recycling reforms, and practical setup steps for warehouse operators. Avoid unlimited fines and criminal prosecution.',
  },
}

export default function WarehouseWasteGuideLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
