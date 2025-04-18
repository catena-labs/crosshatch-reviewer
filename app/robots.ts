import type { MetadataRoute } from "next"
import { fullURL } from "@/lib/utils/url-fns/full-url"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*"
    },
    sitemap: fullURL("/sitemap.xml").toString()
  }
}
