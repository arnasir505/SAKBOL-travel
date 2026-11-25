import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // All photos live in /public. Optimized copies (WebP, resized) are cached for a week;
    // if you replace a photo, give the file a new name so visitors get the new one immediately.
    minimumCacheTTL: 604800,
    // Compression quality for every photo. Next's default of 75 made tour photos look soft;
    // with only 90 allowed, all <Image> requests are served at 90.
    qualities: [90],
  },
};

export default nextConfig;
