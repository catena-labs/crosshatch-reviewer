import type { MetadataRoute } from "next"
import { fullURL } from "@/lib/utils/url-fns/full-url"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      changeFrequency: "daily",
      lastModified: new Date(),
      priority: 1,
      url: fullURL().toString()
    }
  ]
}
