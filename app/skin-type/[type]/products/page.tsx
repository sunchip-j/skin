import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SkinTypeProductsContent } from "@/app/play/skin-type/products/page";
import type { SkinTypeCode } from "@/features/skin-type/types";

type LegacySkinTypeProductsPageProps = {
  params: Promise<{
    type: string;
  }>;
};

function parseSkinTypeCode(value: string) {
  const code = value.toUpperCase();

  if (!/^[DO][SR][PN][WT]$/.test(code)) {
    return null;
  }

  return code as SkinTypeCode;
}

export default async function LegacySkinTypeProductsPage({
  params,
}: LegacySkinTypeProductsPageProps) {
  const { type } = await params;
  const skinType = parseSkinTypeCode(type);

  if (!skinType) {
    notFound();
  }

  return <SkinTypeProductsContent skinType={skinType} />;
}

export async function generateMetadata({
  params,
}: LegacySkinTypeProductsPageProps): Promise<Metadata> {
  const { type } = await params;
  const skinType = parseSkinTypeCode(type);

  if (!skinType) {
    return { title: "맞춤 제품 추천 | BAUMANN SKIN TYPE" };
  }

  return {
    title: `${skinType} 맞춤 제품 추천 | BAUMANN SKIN TYPE`,
    description: `${skinType} 피부 특성을 고려한 기본 스킨케어 루틴과 단계별 추천 제품을 확인해보세요.`,
  };
}
