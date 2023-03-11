/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: 'api.exchange.cryptomkt.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
};

const withMDX = require('@next/mdx');
module.exports = nextConfig;
