import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const path = request.nextUrl.pathname;
  // Internal brand paths are never public URLs, on either domain.
  if (path === "/ilina-home" || path.startsWith("/ilina-home/")) {
    const suffix = path.slice("/ilina-home".length) || "/";
    return NextResponse.redirect(new URL(suffix + request.nextUrl.search, siteConfig.brandUrl), 308);
  }
  if (host === "www.ilina.kr") {
    return NextResponse.redirect(new URL(path + request.nextUrl.search, siteConfig.brandUrl), 308);
  }
  if (host !== "ilina.kr") return NextResponse.next();

  // Keep skin content and functional routes on their existing domain.
  if (/^\/(guide|survey|result|skin-type|play|dev)(\/|$)/.test(path)) {
    return NextResponse.redirect(new URL(path + request.nextUrl.search, siteConfig.url), 308);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
