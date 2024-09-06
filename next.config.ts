import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"
import createMDX from "@next/mdx"

import type { NextConfig } from "next"
import "./env/client"
import "./env/server"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    mdxRs: true,
    turbo: {
      resolveExtensions: [".mdx", ".tsx", ".ts", ".jsx", ".js", ".mjs", ".json"]
    }
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"]
}

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    rehypePlugins: [],
    remarkPlugins: []
  }
})

if (process.env.NODE_ENV === "development") {
  void setupDevPlatform()
}

export default withMDX(nextConfig)
