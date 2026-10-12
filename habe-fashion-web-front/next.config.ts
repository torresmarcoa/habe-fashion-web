import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    /**
     * Cloudinary is the selected media provider (ADR-003).
     *
     * The host is allowed explicitly rather than using `remotePatterns: [{ protocol: "https", hostname: "**" }]`,
     * which would let any HTTPS host be optimized and optimized through the
     * Next.js image endpoint (REQ-SEC-004, REQ-MEDIA-003).
     */
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
