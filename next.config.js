/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Exclude industries/ folder from compilation - they are standalone apps
  webpack: (config) => {
    config.watchOptions = {
      ...config.watchOptions,
      ignored: ['**/industries/**', '**/node_modules/**'],
    }
    return config
  },
  // Exclude industries from TypeScript/ESLint checking
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'scripts', 'subagents'],
  },
}

module.exports = nextConfig
