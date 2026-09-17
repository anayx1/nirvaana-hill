/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: [
    "192.168.1.58",
    "192.168.1.*",
    "localhost:3000",
    "*.local",
  ],
};

export default nextConfig;
