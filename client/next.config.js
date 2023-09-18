/** @type {import('next').NextConfig} */
/* eslint-env node */
const nextConfig = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true
  }
};

module.exports = nextConfig;
