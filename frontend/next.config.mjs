/** @type {import('next').NextConfig} */
const nextConfig = {
  // the backend runs on port 4000 in development
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:4000/:path*',
      },
    ];
  },
};

export default nextConfig;
