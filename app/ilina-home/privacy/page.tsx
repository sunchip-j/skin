import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "공식 홈페이지 개인정보처리방침 | ILINA",
  description: "ILINA 공식 홈페이지의 정보 처리, 이메일 문의, 외부 서비스 이동에 관한 안내입니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/privacy` },
};

export default function BrandPrivacyPage() {
  return (
    <main className="py-12 sm:py-16">
      <h1 className="text-3xl font-black leading-tight tracking-tight">개인정보처리방침</h1>
      <p className="mt-4 text-sm leading-7 text-slate-500">적용 대상: ILINA 공식 홈페이지(ilina.kr)<br />시행일: 2026년 10월 8일</p>
      <div className="mt-8 space-y-9 text-base leading-8 text-slate-600">
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">1. 홈페이지에서 입력받는 정보</h2><p>ILINA가 운영하는 이 홈페이지는 브랜드와 공개 서비스를 안내하는 정보 페이지입니다. 회원가입, 로그인, 설문, 문의 입력 폼이 없으며, 이름·연락처·설문 응답을 홈페이지에서 입력받거나 저장하지 않습니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">2. 접속 정보와 브라우저 저장</h2><p>현재 홈페이지에는 방문 분석 도구와 광고 스크립트를 적용하지 않았습니다. 홈페이지 기능을 위해 쿠키나 브라우저 저장 공간에 이용자 정보를 저장하지 않습니다.</p><p className="mt-3">페이지를 전달하는 과정에서 호스팅·네트워크 제공자의 시스템에 IP 주소, 요청 주소, 접속 시각, 브라우저 정보 등의 접속 기록이 생성될 수 있습니다. 제공자 측 기록의 항목과 보관 기간은 운영 환경과 제공자의 정책에 따라 달라집니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">3. 이메일 문의</h2><p>문의 링크를 누르면 이용자의 이메일 앱이 열립니다. 직접 메일을 보내는 경우 발신 이메일 주소와 본문에 기재한 정보가 운영자에게 전달되며, 문의 확인과 답변에 사용합니다. 문의에 필요하지 않은 개인정보나 건강 정보는 보내지 마세요. 이메일은 홈페이지의 입력 폼이나 데이터베이스를 통해 수집되지 않으며, 송수신 과정에는 이메일 제공자의 처리 정책이 적용됩니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">4. 피부타입 서비스로 이동하는 경우</h2><p>검사나 가이드 링크를 선택하면 skin.ilina.kr로 이동합니다. 그곳에서 수행하는 설문과 결과 처리에는 피부타입 서비스의 별도 방침이 적용됩니다. 공식 홈페이지에서는 피부타입 설문 응답이나 결과를 처리하지 않습니다.</p><a className="mt-3 inline-flex min-h-11 items-center font-semibold text-emerald-700 underline underline-offset-4" href={`${siteConfig.url}/privacy`}>피부타입 서비스 개인정보처리방침</a></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">5. 문의 및 변경 안내</h2><p>이 홈페이지의 개인정보 처리에 관한 문의나 이메일로 전달한 정보의 삭제 요청은 <a className="break-all font-semibold text-emerald-700 underline underline-offset-4" href={`mailto:${siteConfig.privacyContactEmail}`}>{siteConfig.privacyContactEmail}</a>로 보낼 수 있습니다. 정보 처리 방식이나 광고·방문 분석 도구의 적용 여부가 바뀌면 이 페이지의 내용과 시행일을 갱신합니다.</p></section>
      </div>
    </main>
  );
}
