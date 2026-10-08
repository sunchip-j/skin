import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.brandUrl),
  title: "ILINA | 일상에 도움이 되는 웹서비스",
  description: "ILINA는 일상의 질문을 살펴볼 수 있는 웹서비스를 직접 기획하고 운영합니다. 피부타입 서비스의 목적과 결과 활용 방법을 확인하세요.",
};

export default function BrandLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f7fbf8] text-slate-900">
      <style>{`footer[data-skin-site-footer] { display: none; }`}</style>
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <header className="flex min-h-20 items-center justify-between gap-4 border-b border-emerald-100">
          <Link href="/" className="inline-flex min-h-11 items-center text-sm font-black tracking-[0.22em] text-emerald-700" aria-label="ILINA 홈">ILINA</Link>
          <nav aria-label="브랜드 메뉴">
            <Link href="/about" className="inline-flex min-h-11 items-center text-sm font-semibold text-slate-600 hover:text-emerald-700">ILINA 소개</Link>
          </nav>
        </header>
        {children}
        <footer className="mt-14 border-t border-emerald-100 py-6 text-xs leading-6 text-slate-500">
          <nav aria-label="운영 정보" className="flex flex-wrap gap-x-5">
            <Link href="/about" className="inline-flex min-h-11 items-center hover:text-emerald-700">ILINA 소개</Link>
            <Link href="/privacy" className="inline-flex min-h-11 items-center hover:text-emerald-700">개인정보처리방침</Link>
            <a href={`mailto:${siteConfig.privacyContactEmail}`} className="inline-flex min-h-11 items-center hover:text-emerald-700">문의</a>
          </nav>
          <p>© 2026 ILINA</p>
        </footer>
      </div>
    </div>
  );
}
