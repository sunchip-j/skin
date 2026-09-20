import { createSkinResultFromScores } from "@/features/skin-type/calculate";
import type {
  SkinAssessmentResult,
  SkinScores,
  SkinTypeCode,
} from "@/features/skin-type/types";
import { DIMENSION_KEYS } from "@/features/skin-type/types";

const RESULT_SESSION_KEY = "ilina.skin-type.result.v1";

type StoredSkinResult = {
  version: 1;
  code: SkinTypeCode;
  scores: SkinScores;
};

export function saveSkinResultToSession(result: SkinAssessmentResult): void {
  const storedResult: StoredSkinResult = {
    version: 1,
    code: result.code,
    scores: result.scores,
  };

  sessionStorage.setItem(RESULT_SESSION_KEY, JSON.stringify(storedResult));
}

export function readSkinResultFromSession(): SkinAssessmentResult | null {
  const serializedResult = sessionStorage.getItem(RESULT_SESSION_KEY);

  if (!serializedResult) {
    return null;
  }

  try {
    const value = JSON.parse(serializedResult) as Partial<StoredSkinResult>;

    if (
      value.version !== 1 ||
      typeof value.code !== "string" ||
      !/^[DO][SR][PN][WT]$/.test(value.code) ||
      !value.scores ||
      DIMENSION_KEYS.some(
        (key) =>
          typeof value.scores?.[key] !== "number" ||
          !Number.isFinite(value.scores[key])
      )
    ) {
      return null;
    }

    return createSkinResultFromScores(
      value.code as SkinTypeCode,
      value.scores as SkinScores
    );
  } catch {
    return null;
  }
}
