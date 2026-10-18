import Link from "next/link";
import { SKIN_TYPE_INFOS } from "@/features/skin-type/data/skin-type-info";

/** Server-rendered on the root host only; the skin screens remain intact. */
export function ServiceResources({ products = false }: { products?: boolean }) {
  return (
    <aside aria-labelledby="service-resources-title" className="bg-[#f7fbf8] px-5 py-8 text-slate-700">
      <div className="mx-auto max-w-3xl space-y-6">
        <h2 id="service-resources-title" className="text-xl font-black text-slate-950">검사와 결과를 이해하는 안내</h2>
        <p className="text-sm leading-7">ILINA의 33문항은 최근 3개월의 경험을 네 가지 피부 특성으로 정리하는 자기 응답 검사입니다. 원본 바우만 문진표와 동일한 검사나 의료적 진단으로 제공하지 않으며, 피부 질환이나 제품 효과를 판정하지 않습니다.</p>
        <nav aria-label="검사 방법과 결과 활용" className="grid gap-3 sm:grid-cols-2">
          {[
            ["/about#method", "33문항의 계산 방식과 한계"],
            ["/guides/four-dimensions", "네 가지 피부 특성 자세히 읽기"],
            ["/guides/how-to-use-results", "결과 해석과 관리 우선순위"],
            ["/about#recommendations", "제품 추천 기준과 표시 순서"],
            ["/guide", "16가지 유형과 제품 살펴보기"],
            ["/story/why-we-built-skin-type", "서비스 제작과 브라우저 저장 방식"],
          ].map(([href, label]) => <Link key={href} href={href} className="flex min-h-12 items-center rounded-2xl border border-emerald-100 bg-white px-4 py-3 text-sm font-bold text-emerald-800 hover:border-emerald-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">{label}</Link>)}
        </nav>
        {products && (
          <section aria-labelledby="type-products-title" className="space-y-4">
            <h3 id="type-products-title" className="text-lg font-bold text-slate-950">유형별 추천 제품을 검사 없이 확인하기</h3>
            <p className="text-sm leading-7">내 결과가 있으면 결과 화면에서 추천을 확인하세요. 아래 목록은 각 유형의 루틴과 추천 이유를 비교하기 위한 공개 예시입니다.</p>
            <nav aria-label="16유형별 추천 제품" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {SKIN_TYPE_INFOS.map(({ code }) => <Link key={code} href={`/skin-type/${code.toLowerCase()}/products`} className="flex min-h-12 items-center justify-center rounded-xl border border-emerald-100 bg-white p-3 text-sm font-bold text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-700">{code} 제품</Link>)}
            </nav>
          </section>
        )}
        <nav aria-label="서비스 운영 안내" className="flex flex-wrap gap-x-6 text-sm font-semibold text-emerald-800">
          <Link href="/company" className="inline-flex min-h-11 items-center">ILINA와 기존 안내 글</Link>
          <Link href="/about#contact" className="inline-flex min-h-11 items-center">운영자 문의</Link>
          <Link href="/privacy" className="inline-flex min-h-11 items-center">개인정보처리방침</Link>
        </nav>
      </div>
    </aside>
  );
}
