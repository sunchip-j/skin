import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();
  const path = request.nextUrl.pathname;
  if (path === "/service-entry" || path.startsWith("/service-entry/")) {
    const publicPath = path.slice("/service-entry".length) || "/";
    return NextResponse.redirect(new URL(publicPath + request.nextUrl.search, siteConfig.brandUrl), 308);
  }
  // Internal brand paths are never public URLs, on either domain.
  if (path === "/ilina-home" || path.startsWith("/ilina-home/")) {
    const isBrandHost = host === "ilina.kr" || host === "www.ilina.kr";
    const suffix = path.slice("/ilina-home".length) || (isBrandHost ? "/company" : "/");
    return NextResponse.redirect(new URL(suffix + request.nextUrl.search, siteConfig.brandUrl), 308);
  }
  if (host === "www.ilina.kr") {
    return NextResponse.redirect(new URL(path + request.nextUrl.search, siteConfig.brandUrl), 308);
  }
  if (host !== "ilina.kr") return NextResponse.next();

  // Public service routes use the shared app tree and keep the same origin.
  // Developer tools retain their existing routing.
  if (/^\/dev(\/|$)/.test(path)) {
    return NextResponse.redirect(new URL(path + request.nextUrl.search, siteConfig.url), 308);
  }
  // Canonical/OG now live in shared HTML metadata; no conflicting HTTP Link.
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/).*)"],
};
