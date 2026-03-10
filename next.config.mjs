import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
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
