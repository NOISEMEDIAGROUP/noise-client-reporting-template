import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Compile scripts, dynamic imports and fonts for the same public path as images.
  basePath: process.env.NEXT_PUBLIC_REPORT_BASE_PATH ?? "",
};

export default nextConfig;
