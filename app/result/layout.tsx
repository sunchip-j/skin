import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "피부 타입 결과 | BAUMANN SKIN TYPE",
  description: "내 바우만 피부 타입 결과를 확인해보세요.",
  robots: { index: false, follow: true },
};

export default function ResultLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
