import type { MetadataRoute } from "next";
import { SKIN_TYPE_INFOS } from "@/features/skin-type/data/skin-type-info";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string; changeFrequency: "weekly" | "monthly"; priority: number }[] = [
    // Public service and editorial URLs share the root search identity.
    { path: "/", changeFrequency: "weekly", priority: 1.0 },
    { path: "/guide", changeFrequency: "monthly", priority: 0.9 },
    { path: "/company", changeFrequency: "weekly", priority: 1.0 },
    { path: "/about", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/four-dimensions", changeFrequency: "monthly", priority: 0.8 },
    { path: "/guides/how-to-use-results", changeFrequency: "monthly", priority: 0.8 },
    { path: "/story/why-we-built-skin-type", changeFrequency: "monthly", priority: 0.7 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
  ];

  for (const { code } of SKIN_TYPE_INFOS) {
    routes.push({ path: `/skin-type/${code.toLowerCase()}`, changeFrequency: "monthly", priority: 0.7 });
    routes.push({ path: `/skin-type/${code.toLowerCase()}/products`, changeFrequency: "monthly", priority: 0.5 });
  }

  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${siteConfig.brandUrl}${path}`,
    changeFrequency,
    priority,
  }));
}
