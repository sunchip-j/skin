"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ResultShare } from "@/features/skin-type/components/result-share";
import { getSkinTypeCards } from "@/features/skin-type/data/skin-type-info";
import { getSkinTypeCareItems } from "@/features/skin-type/data/skin-type-care";
import { readSkinResultFromSession } from "@/features/skin-type/result-session";
import {
  DIMENSION_KEYS,
  type DimensionKey,
  type SkinAssessmentResult,
} from "@/features/skin-type/types";

type DimensionDisplay = {
  leftEn: string;
  leftKo: string;
  leftCode: string;
  rightEn: string;
  rightKo: string;
  rightCode: string;
};

const DIMENSION_DISPLAY: Record<DimensionKey, DimensionDisplay> = {
  dry_oily: {
    leftEn: "DRY",
    leftKo: "건성",
    leftCode: "D",
    rightEn: "OILY",
    rightKo: "지성",
    rightCode: "O",
  },
  sensitive_resistant: {
    leftEn: "RESISTANT",
    leftKo: "저항성",
    leftCode: "R",
    rightEn: "SENSITIVE",
    rightKo: "민감성",
    rightCode: "S",
  },
  pigmented_nonpigmented: {
    leftEn: "NON-PIGMENTED",
    leftKo: "비색소성",
    leftCode: "N",
    rightEn: "PIGMENTED",
    rightKo: "색소성",
    rightCode: "P",
  },
  wrinkled_tight: {
    leftEn: "TIGHT",
    leftKo: "탄력",
    leftCode: "T",
    rightEn: "WRINKLED",
    rightKo: "주름",
    rightCode: "W",
  },
};

const iconStyles = [
  { bg: "bg-drnt-100", text: "text-[#173404]" },
  { bg: "bg-drnt-200", text: "text-[#173404]" },
  { bg: "bg-drnt-300", text: "text-[#173404]" },
  { bg: "bg-drnt-400", text: "text-[#EAF3DE]" },
];

export function SkinTypeResultContent({
  result,
  productHref = "/play/skin-type/products",
}: Readonly<{ result: SkinAssessmentResult; productHref?: string }>) {
  const summary =
    result.resultType.summary ??
    result.resultType.description ??
    result.resultType.subtitle ??
    "";
  const skinTypeCards = getSkinTypeCards(result.code);

  const basicCareItems = getSkinTypeCareItems(result.code);
  return (
    <main className="flex min-h-screen justify-center bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-5 text-slate-900">
      <section className="w-full max-w-lg overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-[0_18px_44px_rgba(15,118,110,0.10)]">
        {/* RESULT HERO */}
        <header className="px-5 pb-6 pt-7 text-center sm:px-7">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.24em] text-emerald-600">
            BAUMANN SKIN TYPE
          </p>

          <p className="mt-4 text-[3.25rem] font-black leading-none tracking-[-0.06em] text-emerald-700">
            {result.code}
          </p>

          <h1 className="mt-4 text-[1.65rem] font-black leading-tight tracking-[-0.035em] text-slate-950">
            {result.resultType.title}
          </h1>

          {summary ? (
            <p className="mx-auto mt-3 max-w-[24rem] text-sm font-medium leading-6 text-slate-600">
              {summary}
            </p>
          ) : null}
        </header>

        {/* PERSONAL ANALYSIS */}
        <section className="border-t border-slate-100 px-5 py-4 sm:px-7">
          <div>
            {skinTypeCards.map((card, index) => (
              <div
                key={card.code}
                className={`flex items-center gap-4 py-3.5 ${
                  index !== skinTypeCards.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-[1.35rem] font-black leading-none ${iconStyles[index].bg} ${iconStyles[index].text}`}
                >
                  {card.code}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-[0.95rem] font-black text-slate-950">
                    {card.title}
                  </h3>

                  <p className="mt-1 text-sm font-medium leading-6 text-slate-600">
                    {card.description}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 AXES */}
        <section className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-7">
          <div className="space-y-5">
            {DIMENSION_KEYS.map((key, index) => {
              const score = result.scores[key];
              const maxScore = result.maxScores[key];
              const display = DIMENSION_DISPLAY[key];

              const markerPosition = Math.max(
                0,
                Math.min(100, (score / maxScore) * 100)
              );

              const selectedCode = result.code[index];

              const isLeftSelected = selectedCode === display.leftCode;
              const isRightSelected = selectedCode === display.rightCode;

              return (
                <div key={key}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p
                        className={`whitespace-nowrap text-[0.7rem] font-black tracking-[0.035em] ${
                          isLeftSelected
                            ? "text-emerald-700"
                            : "text-slate-500"
                        }`}
                      >
                        {display.leftEn}
                      </p>

                      <p
                        className={`mt-0.5 text-[0.68rem] font-semibold ${
                          isLeftSelected
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {display.leftKo}
                      </p>
                    </div>

                    <div className="text-right">
                      <p
                        className={`whitespace-nowrap text-[0.7rem] font-black tracking-[0.035em] ${
                          isRightSelected
                            ? "text-emerald-700"
                            : "text-slate-500"
                        }`}
                      >
                        {display.rightEn}
                      </p>

                      <p
                        className={`mt-0.5 text-[0.68rem] font-semibold ${
                          isRightSelected
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }`}
                      >
                        {display.rightKo}
                      </p>
                    </div>
                  </div>

                  <div className="relative mt-2.5 h-1.5 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${markerPosition}%` }}
                    />

                    <div
                      className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-emerald-600 shadow-[0_1px_4px_rgba(5,150,105,0.35)]"
                      style={{ left: `${markerPosition}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BASIC CARE */}
        <section className="border-t border-slate-100 px-5 py-6 sm:px-7">
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            이렇게 관리해보세요
          </h2>

          <div className="mt-3">
            {basicCareItems.map((item, index) => (
              <div
                key={item.title}
                className={`flex gap-4 py-4 ${
                  index !== basicCareItems.length - 1
                    ? "border-b border-slate-100"
                    : ""
                }`}
              >
                <span className="pt-0.5 text-[0.9rem] font-bold tabular-nums text-emerald-600">
                  0{index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-bold text-slate-950">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-base font-medium leading-[1.6] text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* PRODUCT CTA */}
          <div className="mt-6 border-t border-slate-100 pt-5">
            <h3 className="text-2xl font-bold tracking-tight text-slate-950">
              내 피부에 맞는 제품
            </h3>

            <p className="mt-2 text-[0.8125rem] font-medium text-slate-500">
              {result.code} 피부 특성을 고려한 제품을 확인해보세요.
            </p>

            <Link
              href={productHref}
              className="mt-4 flex h-[3.5rem] w-full items-center justify-center rounded-[18px] bg-emerald-600 text-base font-bold text-white shadow-[0_10px_24px_rgba(5,150,105,0.18)] transition hover:bg-emerald-500"
            >
              추천 제품 보기
              <span aria-hidden="true" className="ml-1.5">
                →
              </span>
            </Link>

            <ResultShare
              shareText={
                result.resultType.shareText ??
                `내 피부의 MBTI(?)는 ${result.code}`
              }
              title={result.resultType.title}
            />
          </div>
        </section>

        {/* SHARE + FOOTER */}
        <footer className="border-t border-slate-100 px-5 pb-6 pt-6 sm:px-7">
          <Link
            href="/"
            className="mx-auto flex h-10 w-fit items-center justify-center px-4 text-sm font-semibold text-slate-500 transition hover:text-emerald-700"
          >
            다시 검사하기
          </Link>

          <p className="mx-auto mt-4 max-w-sm text-center text-[0.68rem] font-medium leading-5 text-slate-400">
            설문 결과는 피부 타입 경향을 파악하기 위한 참고용이며 의학적 진단을
            대체하지 않습니다.
          </p>
        </footer>
      </section>
    </main>
  );
}

export default function SkinTypeResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<SkinAssessmentResult | null>(null);

  useEffect(() => {
    const storedResult = readSkinResultFromSession();

    if (!storedResult) {
      router.replace("/survey");
      return;
    }

    // sessionStorage is a browser-only external source and is read after hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setResult(storedResult);
  }, [router]);

  if (!result) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 text-sm font-semibold text-slate-500">
        결과를 불러오는 중...
      </main>
    );
  }

  return <SkinTypeResultContent result={result} />;
}
