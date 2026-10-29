"use client";

import { useRouter } from "next/navigation";
import { readSkinResultFromSession } from "@/features/skin-type/result-session";
import type { SkinTypeCode } from "@/features/skin-type/types";

export function ResultBackButton({ skinType }: { skinType: SkinTypeCode }) {
  const router = useRouter();

  function handleReturn() {
    let hasResult = false;
    try {
      hasResult = Boolean(readSkinResultFromSession());
    } catch {
      // Unavailable browser storage is equivalent to having no saved result.
    }
    router.push(hasResult ? "/result" : `/skin-type/${skinType.toLowerCase()}`);
  }

  return (
    <button
      type="button"
      className="inline-flex min-h-11 items-center text-sm font-black text-slate-500 transition hover:text-emerald-700"
      onClick={handleReturn}
    >
      <span aria-hidden="true" className="mr-1.5">
        ←
      </span>
      결과로 돌아가기
    </button>
  );
}
