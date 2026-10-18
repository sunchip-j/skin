import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export function GET() {
  return new Response(
    `User-Agent: *\nAllow: /\nDisallow: /ilina-home\nDisallow: /dev\nDisallow: /service-entry\n\nSitemap: ${siteConfig.brandUrl}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } },
  );
}
