import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // allow requests from this origin during dev (avoids cross‑origin warning)
  // adjust the port if you run dev server on a different one
  allowedDevOrigins: [
    "192.168.10.68",
    "192.168.0.134",
  ],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // The JSON data files are for crawlers and language models, not for search result pages
      {
        source: '/:file(knowledge|profiles|entities).json',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex' }],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/profile/:path*",
        destination: "/students/:path*",
        permanent: true,
      },
      // Googlebot reads "$" and "&" out of the inline React Server Component payload
      // (self.__next_f.push) as if they were relative links and reports /$ and /& as 404.
      // They are not real pages; send them home so Search Console stops flagging them.
      {
        source: "/:junk(\\$|&|%24|%26)",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
