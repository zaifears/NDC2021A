import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // allow requests from this origin during dev (avoids cross‑origin warning)
  // adjust the port if you run dev server on a different one
  allowedDevOrigins: [
    "http://192.168.0.134:3000",
  ],
};

export default nextConfig;
