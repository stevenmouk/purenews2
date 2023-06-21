/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["www.ft.com", "cdn.theatlantic.com", "ai-images-library.s3.amazonaws.com"],
  },
};

module.exports = nextConfig;
