/** @type {import('next').NextConfig} */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.aspianet.com',
      },
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.ir-thr-at1.arvanstorage.ir',
      },
    ],
    deviceSizes: [480, 640, 768, 1024],
    imageSizes: [48, 64, 76, 100],
    formats: ['image/webp'],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, 'node_modules/tinymce'),
            to: path.join(__dirname, 'public/assets/libs/tinymce'),
          },
          {
            from: path.join(__dirname, 'src/styles/tinymce/custom-content.css'),
            to: path.join(__dirname, 'public/assets/libs/tinymce'),
          },
        ],
      })
    );
    return config;
  },
};

module.exports = nextConfig;
