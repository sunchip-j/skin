import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "ILINA 소개 | ILINA",
  description: "웹서비스를 직접 기획하고 만들며 운영하는 ILINA의 방향과 문의 방법을 소개합니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/about` },
  openGraph: { title: "ILINA 소개와 검사·추천 기준", description: "33문항의 처리 방식, 결과의 한계, 제품 추천 기준과 운영자 문의를 안내합니다.", url: `${siteConfig.brandUrl}/about`, type: "website", locale: "ko_KR", siteName: "ILINA" },
};

export default function BrandAboutPage() {
  return (
    <main className="py-12 sm:py-16">
      <h1 className="text-3xl font-black tracking-tight">ILINA 소개</h1>
      <div className="mt-8 space-y-9 text-base leading-8 text-slate-600">
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">질문을 살펴보고, 선택에 참고할 수 있도록</h2><p>ILINA는 일상에 필요한 웹서비스를 직접 기획하고 제작하며 운영하는 브랜드입니다. 사용자가 자신의 상황을 돌아보고 필요한 정보를 이해할 수 있도록, 도구와 설명을 함께 제공합니다. 주제는 달라져도 무엇을 알 수 있고 어디까지 참고할 수 있는지 분명하게 안내하는 방향을 지향합니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">현재 공개한 서비스</h2><p>피부타입 서비스는 설문으로 네 가지 피부 특성을 정리하고, 유형별 설명과 관리 방향을 살펴보는 도구입니다. ilina.kr에서 검사부터 결과와 제품 추천까지 이용할 수 있으며 기존 skin.ilina.kr도 같은 검사 기능을 제공합니다.</p><a className="mt-3 inline-flex min-h-11 items-center font-semibold text-emerald-700 underline underline-offset-4" href="/guide">피부 특성과 16가지 유형 살펴보기</a></section>
        <section id="method" className="scroll-mt-6">
          <h2 className="mb-3 text-xl font-bold text-slate-900">33문항의 검사 방식과 결과 해석</h2>
          <p>최근 3개월의 경험을 기준으로 유수분 6문항, 민감도 9문항, 색소 경향 7문항, 주름·탄력 경향 11문항에 답합니다. 각 선택지의 점수를 축별로 합산하고 ILINA 설문 데이터에 정한 구간에 따라 D/O, S/R, P/N, W/T 중 한 글자씩 선택해 16개 유형 중 하나로 표시합니다.</p>
          <p className="mt-3">원본 바우만 문진표를 그대로 제공하는 검사가 아니라 ILINA가 구성한 33문항과 배점·임계값을 사용합니다. 결과의 임상 진단 정확도나 제품 효과를 보장하지 않습니다. 결과 화면의 네 축 게이지는 해당 축의 점수 위치이며 질환 확률, 피부 나이 또는 다른 이용자와 비교한 백분위가 아닙니다.</p>
          <p className="mt-3">같은 유형이라도 계절, 얼굴 부위와 최근 사용 제품에 따라 체감이 다를 수 있습니다. 유형의 주요 특징과 세 가지 관리 포인트를 자신의 경험과 함께 읽고, 먼저 살펴볼 관리 항목을 정하는 참고 자료로 사용하세요.</p>
          <div className="mt-3 flex flex-wrap gap-x-5"><a href="/guides/four-dimensions" className="inline-flex min-h-11 items-center font-semibold text-emerald-700 underline">네 가지 특성의 의미</a><a href="/guides/how-to-use-results" className="inline-flex min-h-11 items-center font-semibold text-emerald-700 underline">결과를 활용하는 방법</a><a href="/survey" className="inline-flex min-h-11 items-center font-semibold text-emerald-700 underline">33문항 검사 시작</a></div>
        </section>
        <section id="recommendations" className="scroll-mt-6">
          <h2 className="mb-3 text-xl font-bold text-slate-900">제품 추천 기준과 표시 순서</h2>
          <p>추천은 미리 등록한 제품 데이터와 16유형별 매핑으로 구성합니다. 활성 상태인 제품 중 결과 유형에 매핑된 항목을 고르고, 해당 유형의 루틴에 맞는 카테고리로 나눈 뒤 등록된 추천 순서에 따라 표시합니다. 같은 순서에서는 제품 식별자를 기준으로 정렬합니다.</p>
          <p className="mt-3">각 제품에는 유형의 어떤 특성을 고려했는지 설명하는 추천 이유가 있습니다. 첫 제품 외에 추가 항목이 있는 카테고리는 ‘다른 추천 보기’로 펼칠 수 있습니다. 모든 제품을 구매해야 한다는 뜻은 아니며, 선택 단계는 현재 고민과 사용 중인 제품에 맞춰 판단하세요.</p>
          <p className="mt-3">목록은 전체 판매 제품의 비교 평가나 실시간 판매 순위가 아닙니다. 설문 응답·결과를 광고 입찰이나 구매 이력 조회에 전달하지 않습니다. 판매처의 성분·가격·재고는 변경될 수 있으므로 실제 판매 페이지를 확인해야 하며, 구매와 결제는 외부 판매처에서 이루어집니다.</p>
          <a href="/guide#type-products-title" className="mt-3 inline-flex min-h-11 items-center font-semibold text-emerald-700 underline">16유형별 루틴과 제품 예시 비교하기</a>
        </section>
        <section id="limitations" className="scroll-mt-6"><h2 className="mb-3 text-xl font-bold text-slate-900">서비스의 한계와 면책 안내</h2><p>검사와 콘텐츠는 자기 응답에 기반한 일반 참고 정보이며 의료적 진단·처방·치료를 대신하지 않습니다. 특정 질환 여부나 알레르기, 개별 제품의 적합성을 판정하지 않습니다. 증상이 지속되거나 갑자기 악화되는 경우 온라인 결과만으로 판단하지 말고 의료 전문가에게 확인하세요.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">설명과 운영의 기준</h2><p>구현된 기능을 기준으로 이용 방법을 안내하고, 참고 정보와 판단의 한계를 함께 설명합니다. 피부타입 결과를 의료적 진단처럼 제시하거나 특정 제품의 효과를 보장하지 않습니다. 이용 과정에서 발견한 오류나 이해하기 어려운 설명은 문의 이메일로 알려주세요.</p></section>
        <section id="contact" className="scroll-mt-6"><h2 className="mb-3 text-xl font-bold text-slate-900">운영 및 문의</h2><p>이 홈페이지와 피부타입 서비스는 ILINA가 운영합니다. 서비스 이용 문의, 오류 제보, 콘텐츠 정정 요청은 아래 이메일로 받습니다. 문의에는 필요한 내용만 적고, 설문 응답이나 민감한 건강 정보는 보내지 않도록 부탁드립니다.</p><a className="mt-3 inline-flex min-h-11 items-center break-all font-semibold text-emerald-700 underline underline-offset-4" href={`mailto:${siteConfig.privacyContactEmail}`}>{siteConfig.privacyContactEmail}</a></section>
      </div>
    </main>
  );
}
