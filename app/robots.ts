import type { MetadataRoute } from "next"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://millstonecompliance.com"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/assessment/results",
          "/quiz/epr/results",
          "/quiz/simpler-recycling/results",
          "/epr-gap-analyser/results",
          "/ppt-gap-analyser/results",
          "/simpler-recycling-gap-analyser/results",
          "/api/",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
