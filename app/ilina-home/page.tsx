import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: siteConfig.brandUrl },
  openGraph: {
    title: "ILINA | 일상에 도움이 되는 웹서비스",
    description: "직접 기획하고 운영하는 ILINA의 웹서비스와 피부타입 결과 활용 방법을 소개합니다.",
    url: siteConfig.brandUrl,
    siteName: "ILINA",
    locale: "ko_KR",
    type: "website",
  },
};

const dimensions = [
  ["D · O", "건성 · 지성", "세안 뒤의 당김과 평소 유분감을 돌아봅니다. 번들거림과 건조함 중 어느 쪽을 더 자주 느끼는지 정리하는 기준입니다."],
  ["S · R", "민감성 · 저항성", "화장품이나 주변 환경이 바뀔 때 느끼는 반응을 살펴봅니다. 저항성으로 나와도 모든 성분에 자극이 없다는 뜻은 아닙니다."],
  ["P · N", "색소성 · 비색소성", "햇빛에 노출되거나 트러블이 지나간 뒤 흔적이 남는 경험을 돌아봅니다. 반점의 원인이나 피부 질환을 판단하는 기준은 아닙니다."],
  ["W · T", "주름형 · 탄력형", "주름과 탄력에 관한 경험, 생활습관을 함께 살펴봅니다. 피부 나이를 측정하거나 앞으로의 변화를 예측하는 결과는 아닙니다."],
] as const;

export default function IlinaHomePage() {
  return (
    <main className="pb-2">
      <header className="py-12 sm:py-16">
        <p className="text-xs font-bold tracking-widest text-emerald-700">일상에 도움이 되는 웹서비스</p>
        <h1 className="mt-4 max-w-xl text-3xl font-black leading-[1.35] tracking-tight text-slate-950 sm:text-4xl">나를 이해하는 질문에서,<br />일상에 필요한 도구까지.</h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-slate-600">ILINA는 일상에서 마주하는 질문을 스스로 살펴볼 수 있도록 웹서비스를 직접 기획하고 만들며 운영하는 브랜드입니다. 복잡한 정보를 읽기 쉬운 설명과 사용하기 편한 도구로 연결합니다.</p>
        <p className="mt-3 text-base leading-8 text-slate-600">현재 공개한 서비스는 피부타입입니다. 자신의 피부 경험을 정리하고 관리 방향을 생각해 볼 수 있는 설문과 가이드를 제공합니다.</p>
      </header>

      <section aria-labelledby="service-title" className="border-t border-emerald-100 py-10">
        <p className="text-xs font-bold tracking-widest text-emerald-700">공개 서비스</p>
        <h2 id="service-title" className="mt-3 text-2xl font-black tracking-tight">피부타입, 한 가지 특성보다 넓게 보기</h2>
        <div className="mt-5 space-y-4 text-base leading-8 text-slate-600">
          <p>피부가 지성이라고 느껴도 자극에 대한 반응이나 흔적이 남는 경향은 사람마다 다릅니다. ILINA 피부타입은 33개 문항으로 최근 3개월의 피부 상태와 생활 속 경험을 돌아보고, 네 가지 특성을 함께 정리하도록 돕습니다.</p>
          <p>각 특성에서 선택된 문자를 순서대로 조합하면 16개 유형 중 하나가 됩니다. 예를 들어 DSNT는 건성·민감성·비색소성·탄력형을 뜻합니다. 네 글자는 좋고 나쁨을 평가하는 등급이 아니라, 서로 다른 관리 관심사를 요약하는 표기입니다.</p>
        </div>
        <dl className="mt-7 divide-y divide-emerald-100">
          {dimensions.map(([code, title, description]) => (
            <div key={code} className="py-5 first:pt-0 sm:grid sm:grid-cols-[180px_1fr] sm:gap-6">
              <dt className="font-bold text-slate-900"><span className="mb-1 block text-xs tracking-widest text-emerald-700">{code}</span>{title}</dt>
              <dd className="mt-2 text-sm leading-7 text-slate-600 sm:mt-0">{description}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-base leading-8 text-slate-600">검사 결과에서는 내 유형과 네 축의 점수, 유형의 주요 특징, 관리 시 참고할 점을 확인할 수 있습니다. 유형에 맞춘 제품 목록도 살펴볼 수 있지만, 개별 제품이 자신에게 맞는지는 실제 반응과 사용 조건을 함께 고려해야 합니다.</p>
        <aside className="mt-6 border-l-2 border-emerald-300 pl-4 text-sm leading-7 text-slate-600">이 서비스는 자기 응답에 기반한 참고용 정보입니다. 의료적 진단이나 처방을 제공하지 않으며, 피부 질환의 유무나 특정 제품의 효과를 판정하지 않습니다.</aside>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={`${siteConfig.url}/survey`} className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-700 px-6 text-sm font-bold text-white hover:bg-emerald-800">피부타입 검사 시작</a>
          <a href={`${siteConfig.url}/guide`} className="inline-flex min-h-12 items-center justify-center rounded-xl border border-emerald-200 px-6 text-sm font-bold text-emerald-800 hover:bg-emerald-50">피부타입 가이드 보기</a>
        </div>
        <p className="mt-3 text-xs leading-6 text-slate-500">검사와 가이드는 ILINA 피부타입 서비스(skin.ilina.kr)에서 이용합니다.</p>
      </section>

      <section aria-labelledby="usage-title" className="border-t border-emerald-100 pt-10">
        <h2 id="usage-title" className="text-2xl font-black tracking-tight">결과를 일상의 관리 기준으로 활용하기</h2>
        <div className="mt-6 space-y-7 text-base leading-8 text-slate-600">
          <div><h3 className="mb-2 text-lg font-bold text-slate-900">유형과 실제 경험을 함께 살펴보세요</h3><p>네 글자만 기억하기보다 어떤 문항에서 당김이나 자극을 떠올렸는지 돌아보세요. 얼굴 부위별 상태, 계절, 최근 바꾼 제품에 따라 체감이 다를 수 있습니다. 결과 설명과 자신의 경험이 다르면 유형에 자신을 맞추기보다 현재 불편한 점을 먼저 정리하는 데 활용하세요.</p></div>
          <div><h3 className="mb-2 text-lg font-bold text-slate-900">관리에서 먼저 살펴볼 한 가지를 정하세요</h3><p>세안 뒤 당김이 주된 고민인지, 새로운 제품을 쓸 때의 반응이 고민인지 구분하면 관리 방향을 생각하기 쉽습니다. 지금 사용하는 세안제·보습제·자외선 차단제를 돌아보고, 제품을 고를 때는 유형뿐 아니라 성분, 사용감, 기존 제품과의 조합을 함께 확인하세요. 추천 목록은 선택을 위한 참고 자료입니다.</p></div>
          <div><h3 className="mb-2 text-lg font-bold text-slate-900">변화는 비교할 수 있는 만큼씩 살펴보세요</h3><p>여러 제품을 동시에 바꾸면 어떤 변화가 영향을 주었는지 구분하기 어렵습니다. 바꾼 항목과 사용 후 느낀 점을 따로 기록하면 다음 선택에 참고할 수 있습니다. 지속적인 불편이나 갑작스러운 변화가 있다면 온라인 유형 설명만으로 판단하지 말고 의료 전문가와 상담하세요.</p></div>
        </div>
      </section>
    </main>
  );
}
