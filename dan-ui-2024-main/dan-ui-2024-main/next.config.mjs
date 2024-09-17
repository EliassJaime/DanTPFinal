/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    basePath: '/ui',
    async rewrites() {
      return [
        {
          source: '/api/:path*',
          destination: 'http://localhost:6080/api/:path*', // Redirige todas las solicitudes a la URL completa del backend
        },
      ];
    },
  };
  
  export default nextConfig;
  