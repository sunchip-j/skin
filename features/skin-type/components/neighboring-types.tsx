import Link from "next/link";
import { skinDimensions } from "@/features/skin-type/calculate";
import type { SkinTypeCode } from "@/features/skin-type/types";

const comparisonNotes = [
  "건조감·유분감에 관한 응답 구간만 다릅니다. 얼굴 부위별 당김과 번들거림을 비교하고 나머지 세 축의 고민은 함께 살펴보세요.",
  "자극 반응에 관한 응답 구간만 다릅니다. S는 장벽 손상의 진단이 아니며 R도 새 제품의 안전성을 보장하지 않습니다.",
  "색소 흔적에 관한 응답 구간만 다릅니다. 기본 관리가 겹칠 수 있으며 P라는 이유만으로 미백 세럼을 추가할 필요는 없습니다.",
  "주름 관련 경험·생활습관의 응답 구간만 다릅니다. 현재 탄력이나 피부 나이가 다르다고 확정할 수 없고, 기능성 제품의 필요성도 따로 판단해야 합니다.",
];

export function NeighboringTypes({ code }: { code: SkinTypeCode }) {
  return <div className="space-y-4">
    <p>코드 한 글자가 달라져도 기본 관리나 제품 후보가 겹칠 수 있습니다. 아래 유형은 다른 세 축이 같으므로, 내 경험과 맞는 설명을 비교하기 좋습니다.</p>
    <ul className="space-y-4">{skinDimensions.map((dimension, index) => {
      const other = dimension.thresholds.find(t => t.result !== code[index])!;
      const neighbor = code.slice(0, index) + other.result + code.slice(index + 1);
      return <li key={dimension.id} className="rounded-xl bg-slate-50 p-4"><Link href={`/skin-type/${neighbor.toLowerCase()}`} className="inline-flex min-h-11 items-center font-bold text-emerald-800 underline">{code} ↔ {neighbor} · {dimension.title}</Link><p className="mt-1">{comparisonNotes[index]}</p></li>;
    })}</ul>
    <a href="https://ilina.kr/about#scoring" className="inline-flex min-h-11 items-center font-bold text-emerald-800 underline">실제 문항·배점과 경계값 확인하기</a>
  </div>;
}
