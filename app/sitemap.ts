import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

// Shared service pages canonicalize to ilina.kr. These legacy pages have
// different content from the root brand pages and remain self-canonical.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${siteConfig.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteConfig.url}/privacy`, changeFrequency: "yearly", priority: 0.3 },
  ];
}
