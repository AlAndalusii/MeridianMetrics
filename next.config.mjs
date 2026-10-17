import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Old pages from previous offers were removed. Send old links to the closest current page.
  async redirects() {
    return [
      { source: '/cleans', destination: '/', permanent: true },
      { source: '/cleans/:path*', destination: '/', permanent: true },
      { source: '/millstone-cleans.html', destination: '/', permanent: true },
      { source: '/care-homes', destination: '/', permanent: true },
      { source: '/templates', destination: '/services', permanent: true },
      { source: '/templates/:path*', destination: '/services', permanent: true },
      { source: '/assessment', destination: '/free-check', permanent: true },
      { source: '/assessment/:path*', destination: '/free-check', permanent: true },
      { source: '/quiz/epr', destination: '/quiz', permanent: true },
      { source: '/quiz/epr/:path*', destination: '/quiz', permanent: true },
      { source: '/quiz/simpler-recycling', destination: '/quiz', permanent: true },
      { source: '/quiz/simpler-recycling/:path*', destination: '/quiz', permanent: true },
      { source: '/clinical-waste-analyser', destination: '/free-check', permanent: true },
      { source: '/clinical-waste-analyser/:path*', destination: '/free-check', permanent: true },
      { source: '/duty-of-care-analyser', destination: '/free-check', permanent: true },
      { source: '/duty-of-care-analyser/:path*', destination: '/free-check', permanent: true },
      { source: '/simpler-recycling-gap-analyser', destination: '/free-check', permanent: true },
      { source: '/simpler-recycling-gap-analyser/:path*', destination: '/free-check', permanent: true },
      { source: '/ppt-gap-analyser', destination: '/free-check', permanent: true },
      { source: '/ppt-gap-analyser/:path*', destination: '/free-check', permanent: true },
      { source: '/epr-gap-analyser', destination: '/free-check', permanent: true },
      { source: '/epr-gap-analyser/:path*', destination: '/free-check', permanent: true },
      { source: '/print/:path*', destination: '/', permanent: true },
      { source: '/admin', destination: '/', permanent: true },
      { source: '/admin/:path*', destination: '/', permanent: true },
      { source: '/resources/duty-of-care-waste', destination: '/guides/waste-transfer-notes', permanent: true },
      { source: '/resources/waste-packaging-documentation', destination: '/guides/waste-transfer-notes', permanent: true },
      { source: '/resources/:slug', destination: '/resources', permanent: true },
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
