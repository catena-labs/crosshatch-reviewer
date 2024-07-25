import createMDX from "@next/mdx"
import type { NextConfig } from "next"
import "./env/client"
import "./env/server"

const nextConfig: NextConfig = {
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
    remarkPlugins: [],
    rehypePlugins: []
  }
})

export default withMDX(nextConfig)
