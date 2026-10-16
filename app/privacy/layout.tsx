import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Millstone Compliance',
  description: 'How Millstone Compliance collects, uses and protects your personal information.',
  alternates: { canonical: 'https://millstonecompliance.com/privacy' },
}

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children
}
