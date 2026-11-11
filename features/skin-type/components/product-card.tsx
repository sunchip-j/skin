import evidenceData from "@/features/skin-type/data/product-evidence.json";
import type { ResolvedRecommendedProduct } from "@/features/skin-type/types";

const CATEGORY_LABELS = {
  cleanser: "클렌저",
  toner: "토너",
  serum: "세럼",
  moisturizer: "로션·크림",
  sunscreen: "선크림",
};

type ProductCardProps = {
  recommendation: ResolvedRecommendedProduct;
};

export function ProductCard({ recommendation }: ProductCardProps) {
  const { product } = recommendation;
  const evidence = (evidenceData as Record<string, { reviewedAt: string; basis: string; caution: string; sourceUrl: string; purchaseReady: boolean }>)[product.id];
  const isAffiliate = product.oliveYoungUrl ? new URL(product.oliveYoungUrl).hostname === "oy.run" : false;

  return (
    <article className="rounded-[18px] border border-slate-100 bg-white p-4 shadow-[0_5px_16px_rgba(15,23,42,0.045)]">
      <div className="flex gap-3.5">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-[4.5rem] w-[4.5rem] shrink-0 rounded-[14px] bg-slate-50 object-cover"
          />
        ) : null}

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[0.68rem] font-black tracking-[0.06em] text-emerald-700">
                {product.brand}
              </p>

              <h3 className="mt-0.5 text-base font-black leading-6 tracking-tight text-slate-950">
                {product.name}
              </h3>
            </div>

            <span className="shrink-0 text-xs font-bold text-slate-600">
              {CATEGORY_LABELS[product.category]}
            </span>
          </div>

          {product.tags.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {product.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <p className="mt-3 text-sm font-semibold leading-6 text-slate-600">
        {recommendation.recommendation.reason}
      </p>

      {evidence && <details className="mt-3 rounded-xl bg-slate-50 p-3 text-sm leading-6 text-slate-600">
        <summary className="min-h-11 cursor-pointer content-center font-bold text-emerald-800">선정 근거와 확인할 점</summary>
        <p className="mt-2">{evidence.basis}</p><p className="mt-2">{evidence.caution}</p>
        <p className="mt-2 text-xs">공개 상품정보 검토: {evidence.reviewedAt}. 직접 사용 후기나 임상 비교가 아닙니다. 현재 성분·옵션·재고는 달라질 수 있습니다.</p>
        {evidence.purchaseReady && <a href={evidence.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center font-bold text-emerald-700 underline">검토에 사용한 상품정보</a>}
      </details>}
      {evidence && !evidence.purchaseReady && <p className="mt-3 rounded-xl bg-amber-50 p-3 text-sm leading-6 text-amber-900">상품 정보 재확인 중으로 구매 연결을 보류합니다. 적합하지 않다는 판정은 아닙니다.</p>}
      {product.oliveYoungUrl && evidence?.purchaseReady ? (
        <a
          href={product.oliveYoungUrl}
          target="_blank"
          rel={isAffiliate ? "sponsored noopener noreferrer" : "noopener noreferrer"}
          className="mt-3 inline-flex min-h-11 items-center text-xs font-black text-emerald-700 transition hover:text-emerald-600"
        >
          올리브영에서 제품 보기
          <span aria-hidden="true" className="ml-1">
            →
          </span>
        </a>
      ) : null}
    </article>
  );
}
