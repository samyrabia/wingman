/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
    ],
  },
  // TypeScript type checking is now enabled
  typescript: {
    // We want to see TypeScript errors during build
    ignoreBuildErrors: false,
  },
  // ESLint checking is now enabled
  eslint: {
    // We want to see ESLint errors during build
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
