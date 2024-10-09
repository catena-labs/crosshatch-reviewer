import { setupDevPlatform } from "@cloudflare/next-on-pages/next-dev"

import type { NextConfig } from "next"
import "./env/client"
import "./env/server"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  }
}

if (process.env.NODE_ENV === "development") {
  void setupDevPlatform()
}

export default nextConfig
