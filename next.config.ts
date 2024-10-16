import type { NextConfig } from "next"
import "./env/client"
import "./env/server"

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true
  }
}

export default nextConfig
