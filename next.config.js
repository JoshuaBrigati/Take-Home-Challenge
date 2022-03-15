/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  env: {
    JWT_KEY: 'Test123',
  },
  ...nextConfig
}