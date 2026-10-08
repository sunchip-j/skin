import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "ILINA 소개 | ILINA",
  description: "웹서비스를 직접 기획하고 만들며 운영하는 ILINA의 방향과 문의 방법을 소개합니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/about` },
};

export default function BrandAboutPage() {
  return (
    <main className="py-12 sm:py-16">
      <h1 className="text-3xl font-black tracking-tight">ILINA 소개</h1>
      <div className="mt-8 space-y-9 text-base leading-8 text-slate-600">
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">질문을 살펴보고, 선택에 참고할 수 있도록</h2><p>ILINA는 일상에 필요한 웹서비스를 직접 기획하고 제작하며 운영하는 브랜드입니다. 사용자가 자신의 상황을 돌아보고 필요한 정보를 이해할 수 있도록, 도구와 설명을 함께 제공합니다. 주제는 달라져도 무엇을 알 수 있고 어디까지 참고할 수 있는지 분명하게 안내하는 방향을 지향합니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">현재 공개한 서비스</h2><p>피부타입 서비스는 설문으로 네 가지 피부 특성을 정리하고, 유형별 설명과 관리 방향을 살펴보는 도구입니다. 이 홈페이지는 ILINA의 운영 방향과 서비스 활용 맥락을 소개합니다. 설문과 유형별 상세 정보는 피부타입 서비스에서 제공합니다.</p><a className="mt-3 inline-flex min-h-11 items-center font-semibold text-emerald-700 underline underline-offset-4" href={`${siteConfig.url}/about`}>피부타입 서비스의 목적과 한계 보기</a></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">설명과 운영의 기준</h2><p>구현된 기능을 기준으로 이용 방법을 안내하고, 참고 정보와 판단의 한계를 함께 설명합니다. 피부타입 결과를 의료적 진단처럼 제시하거나 특정 제품의 효과를 보장하지 않습니다. 이용 과정에서 발견한 오류나 이해하기 어려운 설명은 문의 이메일로 알려주세요.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">운영 및 문의</h2><p>이 홈페이지와 피부타입 서비스는 ILINA가 운영합니다. 서비스 이용 문의, 오류 제보, 콘텐츠 정정 요청은 아래 이메일로 받습니다. 문의에는 필요한 내용만 적고, 설문 응답이나 민감한 건강 정보는 보내지 않도록 부탁드립니다.</p><a className="mt-3 inline-flex min-h-11 items-center break-all font-semibold text-emerald-700 underline underline-offset-4" href={`mailto:${siteConfig.privacyContactEmail}`}>{siteConfig.privacyContactEmail}</a></section>
      </div>
    </main>
  );
}
