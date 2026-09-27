/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This is a pure JS project — node:sqlite returns untyped query results,
    // causing false-positive TS errors in Vercel's stricter build environment.
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    "192.168.1.58",
    "192.168.1.*",
    "localhost:3000",
    "*.local",
  ],
};

export default nextConfig;
