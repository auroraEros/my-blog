/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "tender-electra-auroraeros-a2c6771e.koyeb.app",
        pathname: "/uploads/**",
      },
    ],
    domains: ["localhost", "tender-electra-auroraeros-a2c6771e.koyeb.app"],
  },
};

export default nextConfig;
