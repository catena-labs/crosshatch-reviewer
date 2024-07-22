import { fullURL } from "@/lib/url-fns/full-url"
import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: fullURL().toString(),
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1
    }
  ]
}
