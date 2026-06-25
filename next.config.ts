import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Upstream images are already CDN-resized (Cloudinary w_450, ceflix
    // thumbnails), so we serve them directly instead of re-processing every
    // image through the Next optimizer (which is slow without `sharp`).
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
