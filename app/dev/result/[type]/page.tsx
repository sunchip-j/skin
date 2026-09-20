import { notFound } from "next/navigation";
import { SkinTypeResultContent } from "@/app/result/page";
import { createSkinResultFromScores } from "@/features/skin-type/calculate";
import {
  getPreviewScoresForSkinType,
  parsePreviewSkinTypeCode,
} from "@/features/skin-type/dev-preview";

type PreviewResultPageProps = {
  params: Promise<{ type: string }>;
};

export default async function PreviewResultPage({
  params,
}: PreviewResultPageProps) {
  const { type } = await params;
  const skinType = parsePreviewSkinTypeCode(type);

  if (!skinType) {
    notFound();
  }

  const result = createSkinResultFromScores(
    skinType,
    getPreviewScoresForSkinType(skinType)
  );

  if (!result) {
    notFound();
  }

  return (
    <SkinTypeResultContent
      result={result}
      productHref={`/skin-type/${skinType}/products`}
    />
  );
}
