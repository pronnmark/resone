import type { NextConfig } from 'next';

// Static export: `next build` writes plain HTML to out/, served by nginx.
const config: NextConfig = {
  output: 'export',
  images: { unoptimized: true }, // the JPEGs are already cut to size (≤1400px, q82)
  trailingSlash: false,
  reactStrictMode: true,
  outputFileTracingRoot: process.cwd(),
};

export default config;
