import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  return (
    <footer
      data-skin-site-footer
      className="border-t border-emerald-100/70 bg-[#f7fbf8] px-5 py-5 text-slate-600"
    >
      <div className="mx-auto flex w-full max-w-3xl flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-semibold">
        <span className="font-black tracking-[0.12em] text-emerald-700/80">
          {siteConfig.name}
        </span>
        <span aria-hidden="true" className="text-emerald-200">
          ·
        </span>
        <Link
          href="/guide"
          className="inline-flex min-h-11 items-center transition hover:text-emerald-700"
        >
          피부 가이드
        </Link>
        <span aria-hidden="true" className="text-emerald-200">
          ·
        </span>
        <Link
          href="/about"
          className="inline-flex min-h-11 items-center transition hover:text-emerald-700"
        >
          서비스 소개
        </Link>
        <span aria-hidden="true" className="text-emerald-200">
          ·
        </span>
        <Link
          href="/privacy"
          className="inline-flex min-h-11 items-center transition hover:text-emerald-700"
        >
          개인정보처리방침
        </Link>
        <span aria-hidden="true" className="text-emerald-200">
          ·
        </span>
        <span>© 2026 {siteConfig.name}</span>
      </div>
    </footer>
  );
}
