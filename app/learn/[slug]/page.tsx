import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { serviceMetadata } from "@/config/seo";
import { siteConfig } from "@/config/site";
import { EditorialShell } from "@/app/components/editorial-shell";
import { ArticleCard } from "@/app/components/article-card";
import { SkinObservationSheet } from "@/app/components/skin-observation-sheet";
import { getSkinArticle, skinArticles } from "@/features/skin-content/articles";

type PageProps = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return skinArticles.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = getSkinArticle((await params).slug);
  if (!article) return { title: "글을 찾을 수 없습니다 | ILINA", robots: { index: false } };
  const base = serviceMetadata(`/learn/${article.slug}`, `${article.title} | ILINA`, article.description);
  return { ...base, openGraph: { ...base.openGraph, type: "article", publishedTime: article.publishedAt, modifiedTime: article.updatedAt } };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = getSkinArticle((await params).slug);
  if (!article) notFound();
  const sourceMap = Object.fromEntries(article.sources.map(source => [source.id, source]));
  const schema = {
    "@context": "https://schema.org", "@type": "Article",
    headline: article.title, description: article.description,
    datePublished: article.publishedAt, dateModified: article.updatedAt,
    author: { "@type": "Organization", name: "ILINA", url: `${siteConfig.brandUrl}/about` },
    publisher: { "@type": "Organization", name: "ILINA" },
    mainEntityOfPage: `${siteConfig.brandUrl}/learn/${article.slug}`,
  };
  return <EditorialShell>
    <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
      <article>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
        <header className="border-b border-emerald-100 pb-8">
          <Link href="/learn" className="inline-flex min-h-11 items-center text-sm font-bold text-emerald-800">← 피부 관리 노트</Link>
          <p className="mt-4 text-xs font-bold tracking-widest text-emerald-700">{article.category}</p>
          <h1 className="mt-3 text-3xl font-black leading-snug tracking-tight text-slate-950 sm:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{article.subtitle}</p>
          <p className="mt-5 text-xs leading-6 text-slate-500">작성·관리 ILINA · 작성 {article.publishedAt} · 수정 {article.updatedAt}</p>
          <p className="mt-1 text-xs leading-6 text-slate-500">일반 정보 · 의료 전문가 감수 자료가 아닙니다. <Link href="/learn#editorial-policy" className="underline underline-offset-4">작성 기준</Link></p>
        </header>
        <aside aria-label="핵심 안내" className="mt-7 rounded-2xl border-l-4 border-emerald-600 bg-emerald-50 p-5 text-base font-semibold leading-8 text-emerald-950">{article.takeaway}</aside>
        <nav aria-label="글 목차" className="my-9 rounded-2xl border border-emerald-100 bg-white p-5">
          <p className="mb-2 text-sm font-black text-slate-900">이 글에서 살펴볼 내용</p>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-emerald-800">{article.sections.map(section => <li key={section.id}><a className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={`#${section.id}`}>{section.title}</a></li>)}</ol>
        </nav>
        <div className="space-y-12">{article.sections.map((section, index) => <section key={section.id} id={section.id} className="scroll-mt-6">
          <p aria-hidden="true" className="text-xs font-black tracking-widest text-emerald-600">{String(index + 1).padStart(2, "0")}</p>
          <h2 className="mt-2 text-2xl font-black leading-snug tracking-tight text-slate-950">{section.title}</h2>
          <div className="mt-5 space-y-4 text-base leading-8 text-slate-700">{section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</div>
          {section.sourceIds.length > 0 && <p className="mt-3 text-xs leading-6 text-slate-500">관련 근거: {section.sourceIds.map((id, i) => <span key={id}>{i > 0 && " · "}<a href={sourceMap[id].url} className="text-emerald-800 underline underline-offset-4">{sourceMap[id].title}</a></span>)}</p>}
          {section.table && <div className="mt-6 overflow-x-auto rounded-xl border border-emerald-100 bg-white" role="region" aria-label={section.table.caption} tabIndex={0}>
            <table className="w-full min-w-[460px] text-left text-sm leading-7">
              <caption className="p-4 text-left font-bold text-slate-900">{section.table.caption}</caption>
              <thead className="bg-emerald-50"><tr>{section.table.columns.map(column => <th scope="col" key={column} className="p-4 font-bold">{column}</th>)}</tr></thead>
              <tbody>{section.table.rows.map((row, i) => <tr key={i} className="border-t border-emerald-100">{row.map((cell, j) => j === 0 ? <th scope="row" key={j} className="p-4 font-semibold text-slate-900">{cell}</th> : <td key={j} className="p-4 text-slate-600">{cell}</td>)}</tr>)}</tbody>
            </table>
          </div>}
        </section>)}</div>
        {article.worksheet && <SkinObservationSheet />}
        <section className="mt-12 rounded-2xl bg-emerald-50 p-6">
          <h2 className="text-xl font-black">읽고 나서 확인할 것</h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-700">{article.checklist.map(item => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-emerald-700">✓</span><span>{item}</span></li>)}</ul>
        </section>
        <section className="mt-10"><h2 className="text-2xl font-black">함께 궁금할 수 있는 질문</h2><div className="mt-5 space-y-3">{article.faq.map(item => <details key={item.q} className="rounded-xl border border-emerald-100 bg-white p-5"><summary className="cursor-pointer text-base font-bold leading-7">{item.q}</summary><p className="mt-4 text-sm leading-7 text-slate-600">{item.a}</p></details>)}</div></section>
        <section id="sources" className="mt-10 border-t border-emerald-100 pt-7 text-sm leading-7 text-slate-600">
          <h2 className="text-xl font-black text-slate-950">출처와 적용 범위</h2>
          <p className="mt-4">공개 자료 확인일: {article.updatedAt}. 근거가 되는 일반 안내는 문단 아래에 연결했습니다. 비교표와 사례는 ILINA가 구성했으며 진단 도구나 실사용 후기가 아닙니다. 증상이 지속되거나 심하면 온라인 설명만으로 판단하지 마세요.</p>
          <ul className="mt-4 space-y-2">{article.sources.map(source => <li key={source.id}><a className="inline-flex min-h-11 items-center text-emerald-800 underline underline-offset-4" href={source.url}>{source.title}</a></li>)}</ul>
          <Link href="https://ilina.kr/about#contact" className="inline-flex min-h-11 items-center font-bold text-emerald-800 underline">이 글의 오류·출처 변경 알리기</Link>
        </section>
      </article>
      <aside className="mt-12 border-t border-emerald-100 pt-8" aria-label="이어서 읽기">
        <h2 className="text-2xl font-black">다음 선택에 도움이 되는 글</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">{article.related.map(slug => <ArticleCard key={slug} article={getSkinArticle(slug)!} />)}</div>
        <div className="mt-6 flex flex-wrap gap-x-6 text-sm font-bold text-emerald-800"><Link href="/survey" className="inline-flex min-h-11 items-center underline">내 경험을 33문항으로 정리하기</Link><Link href="https://ilina.kr/about#scoring" className="inline-flex min-h-11 items-center underline">문항·배점과 결과의 한계</Link></div>
      </aside>
    </main>
  </EditorialShell>;
}
