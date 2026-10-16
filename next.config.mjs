import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      { source: '/cleans', destination: '/cleans/index.html' },
    ]
  },
  // Pages from the old offer that don't match the digital waste tracking plan.
  // Kept online, but asked not to appear in Google so it sees one clear business.
  async headers() {
    const offPlan = [
      '/care-homes',
      '/templates',
      '/templates/:path*',
      '/assessment',
      '/assessment/:path*',
      '/quiz/epr',
      '/quiz/epr/:path*',
      '/quiz/simpler-recycling',
      '/quiz/simpler-recycling/:path*',
      '/clinical-waste-analyser',
      '/clinical-waste-analyser/:path*',
      '/duty-of-care-analyser',
      '/duty-of-care-analyser/:path*',
      '/simpler-recycling-gap-analyser',
      '/simpler-recycling-gap-analyser/:path*',
      '/print/:path*',
      '/admin',
      '/admin/:path*',
      '/resources/care-home-waste-compliance-checklist',
      '/resources/care-home-waste-costs',
      '/resources/clinical-waste-quick-check',
      '/resources/duty-of-care-waste',
      '/resources/epr-packaging',
      '/resources/hmo-recycling-fines',
      '/resources/hmo-waste-compliance-checklist',
      '/resources/how-businesses-save-money-on-waste',
      '/resources/landlord-fly-tipping-fines',
      '/resources/outsourced-compliance-team',
      '/resources/partner-check',
      '/resources/plastic-packaging-tax',
      '/resources/plastic-packaging-tax-2027',
      '/resources/plastic-packaging-tax-explained',
      '/resources/ppt-hmrc-audit-mistakes',
      '/resources/simpler-recycling-2025',
      '/resources/simpler-recycling-businesses',
      '/resources/warehouse-waste-guide',
      '/resources/waste-packaging-documentation',
    ]
    return offPlan.map((source) => ({
      source,
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, follow' }],
    }))
  },
  async redirects() {
    return [
      // Packaging pages → nearest waste equivalent (permanent: false preserves old pages)
      { source: '/resources/plastic-packaging-tax-explained', destination: '/resources/duty-of-care-waste',                      permanent: false },
      { source: '/resources/plastic-packaging-tax',           destination: '/resources/waste-packaging-documentation',           permanent: false },
      { source: '/resources/ppt-hmrc-audit-mistakes',         destination: '/resources/hmo-recycling-fines',                    permanent: false },
      { source: '/resources/plastic-packaging-tax-2027',      destination: '/resources/simpler-recycling-businesses',           permanent: false },
      { source: '/resources/epr-packaging',                   destination: '/resources/care-home-waste-compliance-checklist',   permanent: false },
      { source: '/resources/outsourced-compliance-team',      destination: '/resources/duty-of-care-waste',                    permanent: false },
      // Old packaging tools → new waste tools
      { source: '/ppt-gap-analyser',                           destination: '/duty-of-care-analyser',                            permanent: false },
      { source: '/ppt-gap-analyser/:path*',                    destination: '/duty-of-care-analyser',                            permanent: false },
      { source: '/epr-gap-analyser',                           destination: '/clinical-waste-analyser',                          permanent: false },
      { source: '/epr-gap-analyser/:path*',                    destination: '/clinical-waste-analyser',                          permanent: false },
    ]
  },
  // Fix for multiple lockfiles warning
  outputFileTracingRoot: path.join(__dirname),
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  compress: true,
  poweredByHeader: false,
  
  // Performance optimizations
  reactStrictMode: true,
  
  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
}

export default nextConfig
