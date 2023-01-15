/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    remotePatterns: [{ hostname: 'rickandmortyapi.com' }],
  },
};

module.exports = nextConfig;
