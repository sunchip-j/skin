import Link from "next/link";
import type { SkinArticle } from "@/features/skin-content/articles";

export function ArticleCard({ article, number }: { article: SkinArticle; number?: number }) {
  return (
    <article className="rounded-2xl border border-emerald-100 bg-white p-6 transition hover:border-emerald-400 sm:p-7">
      <div className="flex items-center justify-between gap-3 text-xs font-bold tracking-wide text-emerald-700">
        <span>{article.category}</span>
        {number !== undefined && <span aria-hidden="true" className="text-2xl font-light text-emerald-300">{String(number).padStart(2, "0")}</span>}
      </div>
      <h3 className="mt-4 text-xl font-black leading-8 tracking-tight text-slate-950">
        <Link href={`/learn/${article.slug}`} className="decoration-emerald-300 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">{article.title}</Link>
      </h3>
      <p className="mt-3 text-sm leading-7 text-slate-600">{article.description}</p>
      <p className="mt-5 text-xs leading-6 text-slate-500">공식 자료 출처 · 비교 예시 · 확인표</p>
    </article>
  );
}
