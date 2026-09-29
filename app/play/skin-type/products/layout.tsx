import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "맞춤 제품 추천 | BAUMANN SKIN TYPE",
  description: "피부 특성을 고려한 기본 스킨케어 루틴과 추천 제품입니다.",
  robots: { index: false, follow: true },
};

export default function ProductsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
