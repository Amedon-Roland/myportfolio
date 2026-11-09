import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: about half the weight of JPEG for the same screenshot.
    formats: ["image/avif", "image/webp"],
    qualities: [70],
    deviceSizes: [390, 640, 828, 1080, 1440],
    imageSizes: [256, 320, 384],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    // One styled 404 for unmatched URLs, since the site has two root layouts.
    globalNotFound: true,
  },
  compress: true,
  poweredByHeader: false,
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
