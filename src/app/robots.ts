import type { MetadataRoute } from "next";
import { HAS_SANITY, IS_INDEXING_ENABLED, SITE_URL } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  if (!HAS_SANITY || !IS_INDEXING_ENABLED) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/studio/", "/api/", "/search"] },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
