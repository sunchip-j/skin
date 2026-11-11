import Link from "next/link";
import { serviceMetadata } from "@/config/seo";
import { EditorialShell } from "@/app/components/editorial-shell";
import { ArticleCard } from "@/app/components/article-card";
import { skinArticles } from "@/features/skin-content/articles";

export const metadata = serviceMetadata("/learn", "피부 관리 노트 | ILINA", "세안과 보습, 피부 관찰, 새 화장품 도입, 자외선 보호를 근거와 예시로 읽는 피부 관리 안내입니다.");

export default function LearnPage() {
  return <EditorialShell>
    <main className="mx-auto max-w-5xl px-5 py-10 sm:px-8 sm:py-16">
      <header className="max-w-3xl">
        <p className="text-xs font-black tracking-widest text-emerald-700">ILINA · 피부 관리 노트</p>
        <h1 className="mt-4 text-4xl font-black leading-tight tracking-tight">내 피부를 관찰하고,<br />다음 선택을 이해하는 글.</h1>
        <p className="mt-6 text-base leading-8 text-slate-600">검사 전에도, 결과를 받은 뒤에도 읽을 수 있습니다. 현재 사용하는 제품을 돌아보고, 달라진 반응을 기록하고, 필요한 정보를 확인하는 순서로 안내합니다.</p>
      </header>
      <section aria-labelledby="reading-path" className="mt-10 rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6">
        <h2 id="reading-path" className="text-lg font-black">지금 고민에서 시작하세요</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">무엇을 발라야 할지 모르겠다면 기본 관리, 타입과 느낌이 다르다면 피부 관찰, 구매를 앞두고 있다면 제품 선택, 외출을 준비한다면 자외선 보호 글부터 읽어보세요.</p>
      </section>
      <section aria-label="피부 관리 글 목록" className="mt-6 grid gap-5 md:grid-cols-2">
        {skinArticles.map((article, index) => <ArticleCard key={article.slug} article={article} number={index + 1} />)}
      </section>
      <section id="editorial-policy" className="mt-12 border-t border-emerald-100 pt-8 text-sm leading-7 text-slate-600">
        <h2 className="text-xl font-black text-slate-950">글을 만드는 기준</h2>
        <p className="mt-4">작성·관리 주체는 ILINA입니다. 미국피부과학회(AAD)와 NHS 등 공개 자료를 바탕으로 일반 관리 정보를 정리하고, 참고한 문단과 원문을 연결합니다. 비교표와 가상 사례는 이해를 돕기 위해 ILINA가 구성했으며 실제 사용 후기나 임상 시험 결과가 아닙니다.</p>
        <p className="mt-3">이 글은 AI의 도움을 받아 초안을 작성하고 출처와 서비스 동작을 대조해 구성했습니다. 의료 전문가의 감수를 받은 자료로 제공하지 않으며, 진단·처방을 대신하지 않습니다. 오류나 출처 변경이 확인되면 내용을 수정하고 수정일을 표시합니다.</p>
        <p className="mt-3">관리 노트 본문에는 제품 구매 제휴 링크를 넣지 않습니다. 별도의 제품 추천 화면에는 큐레이터 링크와 수수료 안내가 있으며, 해당 관계가 제품의 효과나 적합성을 보장하지 않습니다.</p>
        <Link href="https://ilina.kr/about#contact" className="mt-2 inline-flex min-h-11 items-center font-bold text-emerald-800 underline">내용 정정·출처 문의</Link>
      </section>
    </main>
  </EditorialShell>;
}
