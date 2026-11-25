import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photos live in /public. Optimized copies (WebP, resized) are cached for a week;
    // if you replace a photo, give the file a new name so visitors get the new one immediately.
    minimumCacheTTL: 604800,
  },
};

export default nextConfig;
