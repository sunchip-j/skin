import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentSection, ContentShell } from "@/app/components/content-shell";
import { skinResults } from "@/features/skin-type/calculate";
import { getSkinTypeCareItems } from "@/features/skin-type/data/skin-type-care";
import { SKIN_TYPE_INFO_MAP, SKIN_TYPE_INFOS } from "@/features/skin-type/data/skin-type-info";
import type { SkinTypeCode } from "@/features/skin-type/types";

type PageProps = { params: Promise<{ type: string }> };

function parseType(value: string): SkinTypeCode | null {
  const code = value.toUpperCase();
  return /^[DO][SR][PN][WT]$/.test(code) ? (code as SkinTypeCode) : null;
}

export function generateStaticParams() {
  return SKIN_TYPE_INFOS.map(({ code }) => ({ type: code.toLowerCase() }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const code = parseType((await params).type);
  const result = code ? skinResults.find((item) => item.code === code) : null;
  if (!code || !result) return { title: "피부 타입 정보 | ILINA" };
  return {
    title: `${code} 피부 타입 특징과 관리법 | ILINA`,
    description: result.summary ?? `${code} 피부 타입의 특징, 관리 우선순위와 주의사항을 확인하세요.`,
    alternates: { canonical: `/skin-type/${code.toLowerCase()}` },
  };
}

export default async function SkinTypeInfoPage({ params }: PageProps) {
  const code = parseType((await params).type);
  const result = code ? skinResults.find((item) => item.code === code) : null;
  if (!code || !result) notFound();

  const info = SKIN_TYPE_INFO_MAP[code];
  const careItems = getSkinTypeCareItems(code);

  return (
    <ContentShell eyebrow="16 Skin Types" title={`${code} · ${result.title}`} description={result.summary ?? info.summary}>
      <ContentSection title="이 타입의 주요 특징">
        <ul className="grid gap-3 sm:grid-cols-2">
          {(result.features ?? []).map((feature) => <li key={feature} className="rounded-2xl bg-slate-50 px-4 py-3">{feature}</li>)}
        </ul>
      </ContentSection>

      <ContentSection title="관리 우선순위">
        <div className="flex flex-wrap gap-2">
          {info.priorities.map((priority) => <span key={priority} className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-black text-emerald-800">{priority}</span>)}
        </div>
        <div className="space-y-4 pt-2">
          {careItems.map((item, index) => (
            <div key={item.title} className="border-t border-slate-100 pt-4 first:border-0 first:pt-0">
              <h3 className="font-black text-slate-900">{String(index + 1).padStart(2, "0")} · {item.title}</h3>
              <p className="mt-1">{item.description}</p>
            </div>
          ))}
        </div>
      </ContentSection>

      <ContentSection title="주의해서 살펴볼 점">
        <p>{result.caution ?? "피부 반응을 살피며 새로운 제품은 한 번에 하나씩 추가하세요."}</p>
        <p className="rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-900">이 정보는 피부 특성을 이해하기 위한 일반적인 참고 자료이며 의학적 진단이나 처방을 대신하지 않습니다.</p>
      </ContentSection>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link href="/survey" className="flex min-h-14 items-center justify-center rounded-2xl bg-emerald-600 px-5 text-sm font-black text-white">내 피부 타입 검사하기</Link>
        <Link href="/guide" className="flex min-h-14 items-center justify-center rounded-2xl border border-emerald-200 bg-white px-5 text-sm font-black text-emerald-800">16가지 타입 전체 보기</Link>
      </div>
    </ContentShell>
  );
}
