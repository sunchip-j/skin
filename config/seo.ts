import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

/** Shared pages on both hosts consolidate to one explicit public URL. */
export function serviceMetadata(path: string, title: string, description: string): Metadata {
  const url = new URL(path, siteConfig.serviceCanonicalUrl).toString();
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: "ILINA", locale: "ko_KR", type: "website" },
  };
}
