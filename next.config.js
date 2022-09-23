/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['adrian-profile.s3.ir-thr-at1.arvanstorage.com'],
  },
};

module.exports = nextConfig;
