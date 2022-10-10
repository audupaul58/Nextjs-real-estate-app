/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

   images: {
    domains: ['realprops.herokuapp.com', 'res.cloudinary.com'],
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig
