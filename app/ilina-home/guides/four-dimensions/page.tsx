import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "피부 설문의 네 가지 축과 해석의 한계 | ILINA",
  description: "D/O, S/R, P/N, W/T가 어떤 응답을 정리하는지, 점수가 바뀌었을 때 무엇을 비교해야 하는지 안내합니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/guides/four-dimensions` },
  openGraph: { title: "피부 설문의 네 가지 축과 해석의 한계 | ILINA", url: `${siteConfig.brandUrl}/guides/four-dimensions`, type: "article", locale: "ko_KR", siteName: "ILINA" },
};

const dimensions = [
  { title: "D/O · 건조감과 유분감", question: "세안 뒤 당김, 시간에 따른 번들거림, 화장 후 상태 등을 묻습니다.", meaning: "D는 건조감을, O는 유분감을 보고하는 쪽에 가까운 응답 조합입니다. 피지 분비량과 피부 수분량을 기기로 측정한 결과가 아닙니다.", compare: "이마와 볼의 느낌이 다르면 부위를 나누어 기록하세요. 평소 사용하는 제품과 환경을 유지한 상태에서 당김과 번들거림을 살펴보면 응답 이유를 설명하기 쉽습니다. 확인을 위해 보습을 일부러 오래 미루거나 불편을 참을 필요는 없습니다." },
  { title: "S/R · 경험한 자극 반응", question: "제품을 사용하거나 환경이 바뀔 때 붉어짐, 따가움 등의 경험을 묻습니다.", meaning: "S는 이런 반응을 더 많이 보고한 쪽, R은 상대적으로 덜 보고한 쪽입니다. S만으로 피부 장벽 손상을 진단하지 않으며, R도 모든 성분에 안전하다는 뜻은 아닙니다.", compare: "어떤 제품을 사용했고 언제 어떤 반응이 있었는지 함께 적으세요. 새 제품을 여러 개 동시에 도입하면 반응의 원인을 구분하기 어렵습니다. 반복되거나 심한 불편은 설문 코드로 원인을 판단하지 말고 진료로 확인하세요." },
  { title: "P/N · 색소 흔적에 관한 응답", question: "트러블 뒤 남는 갈색 자국, 햇빛 노출 뒤 색 변화 등의 경험을 묻습니다.", meaning: "P와 N은 응답 점수의 두 구간입니다. 멜라닌 생성량, 기미의 진단, 색소 치료의 필요성을 측정하지 않습니다. N도 자외선 차단을 생략해도 된다는 뜻은 아닙니다.", compare: "붉은 기와 갈색 흔적을 같은 현상으로 단정하지 말고 보이는 색과 지속 기간을 기록하세요. P라는 결과만으로 미백 제품이 반드시 필요하거나 특정 세럼이 맞는다고 판단하지 않습니다." },
  { title: "W/T · 주름 관련 경험과 생활습관", question: "주름에 대한 체감, 햇빛 노출과 관련 생활습관 등을 함께 묻습니다.", meaning: "W와 T는 이 문항들의 합계 구간입니다. 피부 나이, 현재 콜라겐 양, 실제 탄력이나 미래 노화 확률을 뜻하지 않습니다. T를 탄력이 검증된 상태로 해석하지 마세요.", compare: "코드가 달라졌다면 어떤 응답이 바뀌었는지 먼저 살펴보세요. 생활습관 응답의 변화와 실제 피부 변화는 같은 뜻이 아닙니다. 기능성 제품의 필요성은 코드 하나로 결정하지 않습니다." },
];

export default function FourDimensionsGuidePage() {
  return <main className="py-12 sm:py-16">
    <header className="border-b border-emerald-100 pb-8"><p className="text-xs font-bold tracking-widest text-emerald-700">검사 해석 가이드</p><h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">네 가지 글자는 무엇을 설명할까요?</h1><p className="mt-4 leading-8 text-slate-600">ILINA는 33개 응답을 네 축으로 정리합니다. 아래 설명은 이 서비스에서 글자를 읽는 방법이며, 피부의 생리적 상태를 직접 측정한 결과가 아닙니다.</p><p className="mt-3 text-sm text-slate-500">작성·관리: ILINA · 수정: 2026-11-12 · 의료 전문가 검토를 받은 자료로 제공하지 않습니다.</p></header>
    <div className="mt-10 space-y-8">{dimensions.map(d => <section key={d.title} className="rounded-2xl border border-emerald-100 bg-white p-6"><h2 className="text-xl font-black text-slate-950">{d.title}</h2><div className="mt-4 space-y-3 leading-8 text-slate-600"><p><strong>무엇을 묻나요? </strong>{d.question}</p><p><strong>어디까지 알 수 있나요? </strong>{d.meaning}</p><p><strong>내 경험과 비교하기: </strong>{d.compare}</p></div></section>)}</div>
    <section className="mt-10 space-y-4 leading-8 text-slate-600"><h2 className="text-2xl font-black text-slate-950">같은 세 글자, 다른 한 글자 비교하기</h2><p>DSPT와 DSNT는 세 축이 같고 P/N만 다릅니다. 두 유형의 기본 관리가 크게 겹치는 것은 자연스럽습니다. 달라지는 것은 색소 흔적에 관한 응답과 추가로 살펴볼 고민이며, 모든 제품을 다른 것으로 바꿔야 한다는 뜻은 아닙니다.</p><p>DRNT와 DRNW는 W/T가 다릅니다. 이 차이만으로 실제 탄력 차이나 주름 개선 제품의 필요성을 확정할 수 없습니다. 각 유형 페이지에서 한 글자만 다른 유형과 분류 구간을 비교할 수 있습니다.</p></section>
    <section className="mt-8 rounded-2xl bg-emerald-50 p-6 leading-8 text-slate-700"><h2 className="text-xl font-black">응답과 실제 피부 상태가 다르게 느껴진다면</h2><p className="mt-3">최근 3개월의 경험을 기준으로 답했는지, 특정 부위의 일시적인 반응만으로 답하지 않았는지 확인하세요. 경계값에서는 작은 응답 차이로 글자가 달라집니다. 결과를 정답처럼 맞추기보다 어떤 경험 때문에 그 점수가 나왔는지 살펴보세요.</p><nav aria-label="관련 안내" className="mt-3 flex flex-wrap gap-x-6 font-bold text-emerald-800"><Link className="inline-flex min-h-11 items-center underline" href="/about#scoring">전체 문항·배점·경계값</Link><Link className="inline-flex min-h-11 items-center underline" href="/guides/how-to-use-results">결과 활용과 제품 사용 전 확인</Link><Link className="inline-flex min-h-11 items-center underline" href="/guide">16가지 유형 비교</Link></nav></section>
  </main>;
}
