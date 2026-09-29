import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { SKIN_TYPE_INFOS } from "@/features/skin-type/data/skin-type-info";

export default function sitemap(): MetadataRoute.Sitemap {
  const typePages: MetadataRoute.Sitemap = SKIN_TYPE_INFOS.map(({ code }) => ({
    url: `${siteConfig.url}/skin-type/${code.toLowerCase()}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    {
      url: siteConfig.url,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/guide`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/about`,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteConfig.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...typePages,
  ];
}
