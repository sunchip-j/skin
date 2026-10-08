import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/four-dimensions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/how-to-use-results", changeFrequency: "monthly", priority: 0.8 },
    { path: "/story/why-we-built-skin-type", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  ];

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.brandUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
