/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'picsum.photos',
          },
          {
            protocol: 'https',
            hostname: 'queerty-prodweb.s3.amazonaws.com',
          }
        ],
      },
}

module.exports = nextConfig
