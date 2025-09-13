/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fix for hanging builds
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  // Disable telemetry to prevent hanging
  telemetry: false,
  // Optimize for production builds
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

export default nextConfig;
