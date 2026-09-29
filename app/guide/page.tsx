import type { Metadata } from "next";
import Link from "next/link";
import { ContentSection, ContentShell } from "@/app/components/content-shell";
import { SKIN_TYPE_INFOS } from "@/features/skin-type/data/skin-type-info";

export const metadata: Metadata = {
  title: "피부 타입 가이드 | ILINA",
  description: "건성·지성, 민감성·저항성, 색소성·비색소성, 주름형·탄력형의 의미와 16가지 피부 타입을 알아보세요.",
};

const dimensions = [
  ["D / O", "건성 · 지성", "세안 후 당김, 유분감, 계절에 따른 변화를 살펴 피부의 유수분 경향을 이해합니다."],
  ["S / R", "민감성 · 저항성", "화장품과 환경 변화에 대한 피부 반응을 살펴 자극 관리의 우선순위를 정합니다."],
  ["P / N", "색소성 · 비색소성", "자외선 노출이나 트러블 뒤 색소 흔적이 남는 경향을 구분합니다."],
  ["W / T", "주름형 · 탄력형", "현재의 탄력뿐 아니라 자외선, 생활습관과 관련된 노화 경향을 함께 살펴봅니다."],
] as const;

export default function GuidePage() {
  return (
    <ContentShell eyebrow="Skin Type Guide" title="피부 타입을 이해하는 네 가지 기준" description="피부는 한 단어로 설명하기 어렵습니다. ILINA는 네 가지 축을 함께 살펴 현재 피부 특성을 16가지 조합으로 이해하도록 돕습니다.">
      <ContentSection title="네 가지 축은 무엇을 의미하나요?">
        <div className="grid gap-4 sm:grid-cols-2">
          {dimensions.map(([code, title, description]) => (
            <div key={code} className="rounded-2xl bg-emerald-50/70 p-5">
              <p className="text-xs font-black tracking-[0.16em] text-emerald-700">{code}</p>
              <h3 className="mt-1 text-lg font-black text-slate-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="16가지 피부 타입">
        <p>각 타입은 네 축에서 선택된 문자를 순서대로 조합합니다. 유형을 선택하면 특징, 관리 우선순위, 주의할 점을 검사 없이도 확인할 수 있습니다.</p>
        <div className="grid gap-3 pt-2 sm:grid-cols-2">
          {SKIN_TYPE_INFOS.map((type) => (
            <Link key={type.code} href={`/skin-type/${type.code.toLowerCase()}`} className="rounded-2xl border border-slate-100 px-5 py-4 transition hover:border-emerald-300 hover:bg-emerald-50/50">
              <div className="flex items-center justify-between gap-3">
                <strong className="text-lg font-black text-emerald-700">{type.code}</strong>
                <span className="text-xs font-bold text-slate-400">자세히 보기 →</span>
              </div>
              <p className="mt-1 text-sm font-bold text-slate-700">{type.traits.join(" · ")}</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">{type.summary}</p>
            </Link>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="결과를 활용하는 방법">
        <p>피부 타입은 고정된 진단명이 아니라 현재 경향을 이해하는 참고 도구입니다. 계절, 생활환경, 복용 약물과 피부 상태에 따라 체감은 달라질 수 있습니다.</p>
        <p>한꺼번에 많은 제품을 바꾸기보다 세안·보습·자외선 차단의 기본 루틴을 유지하면서 한 가지씩 조정하고 반응을 관찰하는 것이 좋습니다. 통증, 심한 가려움, 염증이 지속되면 자가 관리보다 피부과 전문의의 진료를 권합니다.</p>
      </ContentSection>
    </ContentShell>
  );
}
