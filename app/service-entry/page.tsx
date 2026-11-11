import Link from "next/link";
import { serviceMetadata } from "@/config/seo";
import { EditorialShell } from "@/app/components/editorial-shell";
import { ArticleCard } from "@/app/components/article-card";
import { ServiceResources } from "@/app/components/service-resources";
import { skinArticles } from "@/features/skin-content/articles";

export const metadata = serviceMetadata("/", "ILINA | 피부를 이해하는 검사와 관리 노트", "33문항 피부타입 검사와 근거 있는 관리 노트. 세안·보습, 피부 관찰, 새 제품 선택과 자외선 보호를 설명과 비교표로 살펴보세요.");

export default function RootServiceHome() {
  return <EditorialShell>
    <main className="mx-auto max-w-5xl px-5 pb-10 sm:px-8">
      <section className="grid gap-8 border-b border-emerald-100 py-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center sm:py-16">
        <div>
          <p className="text-xs font-black tracking-[0.18em] text-emerald-700">관찰에서 시작하는 피부 관리</p>
          <h1 className="mt-5 text-4xl font-black leading-[1.3] tracking-tight text-slate-950 sm:text-5xl">내 피부를 이해하고,<br /><span className="text-emerald-700">다음 선택을 차분하게.</span></h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-slate-600">당김과 번들거림, 새 제품을 쓸 때의 반응. 흩어져 있던 경험을 질문으로 정리하고, 근거와 예시가 있는 글로 일상의 관리 방법을 살펴보세요.</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link href="/survey" className="inline-flex min-h-14 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-black text-white hover:bg-emerald-800">내 피부 경험 정리하기 →</Link>
            <Link href="/learn" className="inline-flex min-h-14 items-center justify-center rounded-xl border border-emerald-200 bg-white px-6 text-sm font-black text-emerald-800">피부 관리 노트 읽기</Link>
          </div>
          <p className="mt-4 text-xs leading-6 text-slate-500">33문항 · 약 3~5분 · 로그인 없이 이용 · 의료적 진단이 아닌 자기 응답 분류</p>
        </div>
        <aside aria-labelledby="start-with" className="rounded-[28px] border border-emerald-100 bg-white p-7 shadow-[0_18px_50px_rgba(15,118,110,0.05)]">
          <p className="text-xs font-bold tracking-widest text-emerald-700">오늘의 출발점</p>
          <h2 id="start-with" className="mt-3 text-2xl font-black leading-9">지금 가장 궁금한<br />한 가지가 있나요?</h2>
          <nav aria-label="고민별 읽기" className="mt-5 divide-y divide-emerald-100 text-sm font-bold text-slate-700">
            {[
              ["oily-but-tight", "번들거리는데 볼은 당겨요"],
              ["simple-skin-care-routine", "바르는 제품이 너무 많아요"],
              ["introducing-new-products", "새 화장품을 써도 될까요?"],
              ["sunscreen-label-and-use", "선크림은 무엇을 봐야 하나요?"],
            ].map(([slug, title]) => <Link key={slug} href={`/learn/${slug}`} className="flex min-h-14 items-center justify-between gap-3 py-3 hover:text-emerald-700"><span>{title}</span><span aria-hidden="true">↗</span></Link>)}
          </nav>
        </aside>
      </section>
      <section aria-labelledby="notes-title" className="py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-black tracking-widest text-emerald-700">피부 관리 노트</p><h2 id="notes-title" className="mt-3 text-3xl font-black tracking-tight">읽고 나면, 확인할 것이 분명해집니다.</h2></div><Link href="/learn" className="inline-flex min-h-11 items-center text-sm font-bold text-emerald-800 underline underline-offset-4">모든 글과 작성 기준</Link></div>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">공식 자료의 일반 안내에 ILINA의 비교표와 가상 사례를 더했습니다. 내 상황과 맞는 부분을 살피고, 다음에 확인할 한 가지를 정해보세요.</p>
        <div className="mt-7 grid gap-5 md:grid-cols-2">{skinArticles.map((article, i) => <ArticleCard key={article.slug} article={article} number={i + 1} />)}</div>
      </section>
      <section aria-labelledby="use-result" className="rounded-2xl bg-emerald-50 p-6 sm:p-8">
        <h2 id="use-result" className="text-2xl font-black tracking-tight">검사 결과는 어떻게 활용하나요?</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">{[
          ["01", "경험을 정리하기", "최근 3개월의 경험을 유수분·자극 반응·색소 흔적·주름 관련 네 축으로 정리합니다."],
          ["02", "응답과 설명 비교하기", "네 글자는 등급이 아닙니다. 경계 점수에서는 한 글자가 달라질 수 있으므로 실제 응답과 함께 읽습니다."],
          ["03", "한 가지부터 확인하기", "현재 제품과 생활 조건을 살펴보고, 관리 노트의 확인표로 다음 선택의 기준을 정합니다."],
        ].map(([number,title,body]) => <div key={number}><p className="text-xs font-black text-emerald-700">{number}</p><h3 className="mt-2 text-lg font-black">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{body}</p></div>)}</div>
        <Link href="/about#scoring" className="mt-5 inline-flex min-h-11 items-center text-sm font-bold text-emerald-800 underline">실제 33문항과 배점·분류 기준 보기</Link>
      </section>
      <section className="pt-10 text-sm leading-7 text-slate-600" aria-labelledby="home-editorial">
        <h2 id="home-editorial" className="text-xl font-black text-slate-950">출처와 한계를 함께 안내합니다</h2>
        <p className="mt-3">ILINA는 일반 관리 정보와 자체 설문의 해석을 구분합니다. 글마다 참고 자료와 수정일을 표시하고, 실제로 수행하지 않은 임상 검증이나 사용 후기를 제시하지 않습니다. 검사와 글은 진료를 대신하지 않습니다.</p>
        <Link href="/learn#editorial-policy" className="inline-flex min-h-11 items-center font-bold text-emerald-800 underline">작성·출처·정정 기준 읽기</Link>
      </section>
    </main>
    <ServiceResources />
  </EditorialShell>;
}
