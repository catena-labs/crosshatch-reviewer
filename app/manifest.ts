import { siteConfig } from "@/config/site"
import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
      { src: "/icon1.png", sizes: "16x16", type: "image/png" },
      { src: "/icon2.png", sizes: "32x32", type: "image/png" },
      { src: "/icon3.png", sizes: "192x192", type: "image/png" },
      { src: "/icon4.png", sizes: "512x512", type: "image/png" }
    ]
  }
}
