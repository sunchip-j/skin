import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "공식 홈페이지 개인정보처리방침 | ILINA",
  description: "ILINA 공식 홈페이지와 피부타입 서비스의 설문 처리, 브라우저 임시 저장, 이메일 문의에 관한 안내입니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/privacy` },
  openGraph: { title: "개인정보처리방침 | ILINA", description: "설문 응답의 브라우저 처리와 결과 임시 저장, 접속 기록 및 문의 안내입니다.", url: `${siteConfig.brandUrl}/privacy`, type: "website", locale: "ko_KR", siteName: "ILINA" },
};

function PreviousBrandPrivacyPolicy() {
  return (
    <div>
      <h2 className="text-xl font-bold">이전 개인정보처리방침</h2>
      <p className="mt-4 text-sm leading-7 text-slate-500">적용 대상: ILINA 공식 홈페이지(ilina.kr)<br />시행일: 2026년 10월 8일</p>
      <div className="mt-8 space-y-9 text-base leading-8 text-slate-600">
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">1. 홈페이지에서 입력받는 정보</h2><p>ILINA가 운영하는 이 홈페이지는 브랜드와 공개 서비스를 안내하는 정보 페이지입니다. 회원가입, 로그인, 설문, 문의 입력 폼이 없으며, 이름·연락처·설문 응답을 홈페이지에서 입력받거나 저장하지 않습니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">2. 접속 정보와 브라우저 저장</h2><p>현재 홈페이지에는 방문 분석 도구와 광고 스크립트를 적용하지 않았습니다. 홈페이지 기능을 위해 쿠키나 브라우저 저장 공간에 이용자 정보를 저장하지 않습니다.</p><p className="mt-3">페이지를 전달하는 과정에서 호스팅·네트워크 제공자의 시스템에 IP 주소, 요청 주소, 접속 시각, 브라우저 정보 등의 접속 기록이 생성될 수 있습니다. 제공자 측 기록의 항목과 보관 기간은 운영 환경과 제공자의 정책에 따라 달라집니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">3. 이메일 문의</h2><p>문의 링크를 누르면 이용자의 이메일 앱이 열립니다. 직접 메일을 보내는 경우 발신 이메일 주소와 본문에 기재한 정보가 운영자에게 전달되며, 문의 확인과 답변에 사용합니다. 문의에 필요하지 않은 개인정보나 건강 정보는 보내지 마세요. 이메일은 홈페이지의 입력 폼이나 데이터베이스를 통해 수집되지 않으며, 송수신 과정에는 이메일 제공자의 처리 정책이 적용됩니다.</p></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">4. 피부타입 서비스로 이동하는 경우</h2><p>검사나 가이드 링크를 선택하면 skin.ilina.kr로 이동합니다. 그곳에서 수행하는 설문과 결과 처리에는 피부타입 서비스의 별도 방침이 적용됩니다. 공식 홈페이지에서는 피부타입 설문 응답이나 결과를 처리하지 않습니다.</p><a className="mt-3 inline-flex min-h-11 items-center font-semibold text-emerald-700 underline underline-offset-4" href={`${siteConfig.url}/privacy`}>피부타입 서비스 개인정보처리방침</a></section>
        <section><h2 className="mb-3 text-xl font-bold text-slate-900">5. 문의 및 변경 안내</h2><p>이 홈페이지의 개인정보 처리에 관한 문의나 이메일로 전달한 정보의 삭제 요청은 <a className="break-all font-semibold text-emerald-700 underline underline-offset-4" href={`mailto:${siteConfig.privacyContactEmail}`}>{siteConfig.privacyContactEmail}</a>로 보낼 수 있습니다. 정보 처리 방식이나 광고·방문 분석 도구의 적용 여부가 바뀌면 이 페이지의 내용과 시행일을 갱신합니다.</p></section>
      </div>
    </div>
  );
}


export default function BrandPrivacyPage() {
  return (
    <main className="py-12 sm:py-16">
      <h1 className="text-3xl font-black leading-tight tracking-tight">개인정보처리방침</h1>
      <p className="mt-4 text-sm leading-7 text-slate-500">적용 대상: ILINA 공식 홈페이지 및 피부타입 서비스(ilina.kr)<br />시행일: 2026년 10월 18일</p>
      <div className="mt-8 space-y-9 text-base leading-8 text-slate-600">
        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">1. 홈페이지와 피부타입 설문</h2>
          <p>이 홈페이지는 ILINA 소개, 가이드와 함께 33문항 피부타입 검사와 제품 추천을 제공합니다. 회원가입, 로그인, 문의 입력 폼은 없으며 이름이나 연락처를 입력받지 않습니다. 설문 응답은 이용 중인 브라우저 안에서 계산하며, 응답이나 결과를 서버 또는 데이터베이스로 전송하거나 저장하지 않습니다.</p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">2. 결과 복원을 위한 브라우저 임시 저장</h2>
          <p>같은 탭에서 결과와 추천 제품을 확인하고 결과 페이지를 새로고침할 수 있도록, 피부타입 코드와 네 가지 분석 축의 점수만 sessionStorage에 임시 저장합니다. 저장 키는 ilina.skin-type.result.v1이며 개별 문항 응답은 저장하지 않습니다. 설문 진행 중 응답은 화면의 메모리에서 관리합니다.</p>
          <p className="mt-3">결과는 해당 브라우저 탭의 세션 동안 유지되며 결과 URL에 포함되지 않습니다. 브라우저의 사이트 데이터를 삭제하면 저장된 결과를 지울 수 있습니다. ilina.kr과 skin.ilina.kr은 서로 다른 출처이므로 결과 저장소를 공유하지 않습니다. 결과가 없는 상태에서 결과 또는 세션 기반 추천 페이지를 열면 같은 도메인의 설문으로 이동합니다.</p>
          <p className="mt-3">설문 응답이나 결과 저장에 쿠키 또는 localStorage를 사용하지 않으며, 현재 별도의 방문 분석 도구와 광고 스크립트는 적용하지 않았습니다. 향후 광고나 분석 도구를 도입하면 처리 방식과 이 방침을 갱신합니다.</p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">3. 접속 기록과 외부 링크</h2>
          <p>페이지를 전달하는 과정에서 호스팅·네트워크 제공자의 시스템에 IP 주소, 요청 주소, 접속 시각, 브라우저 정보 등의 접속 기록이 생성될 수 있습니다. 제공자 측 기록의 항목과 보관 기간은 운영 환경과 제공자의 정책에 따라 달라집니다.</p>
          <p className="mt-3">검사부터 결과와 추천 제품 목록까지 이 도메인 안에서 이용할 수 있습니다. 제품의 판매처 링크 등을 선택하면 외부 사이트로 이동하며 해당 사이트의 개인정보처리방침이 적용됩니다. skin.ilina.kr도 기존 서비스를 계속 제공하며 별도의 <a className="font-semibold text-emerald-700 underline" href={`${siteConfig.url}/privacy`}>피부타입 서비스 개인정보처리방침</a>을 확인할 수 있습니다.</p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">4. 이메일 문의</h2>
          <p>문의 링크를 누르면 이용자의 이메일 앱이 열립니다. 직접 메일을 보내는 경우 발신 이메일 주소와 본문에 기재한 정보가 운영자에게 전달되며 문의 확인과 답변에 사용합니다. 문의에 필요하지 않은 개인정보나 건강 정보는 보내지 마세요. 이메일은 홈페이지의 입력 폼이나 데이터베이스를 통해 수집되지 않으며 송수신 과정에는 이메일 제공자의 처리 정책이 적용됩니다.</p>
        </section>
        <section>
          <h2 className="mb-3 text-xl font-bold text-slate-900">5. 문의 및 변경 안내</h2>
          <p>개인정보 처리 문의나 이메일로 전달한 정보의 삭제 요청은 <a className="break-all font-semibold text-emerald-700 underline" href={`mailto:${siteConfig.privacyContactEmail}`}>{siteConfig.privacyContactEmail}</a>로 보낼 수 있습니다. 정보 처리 방식이 바뀌면 이 페이지의 내용과 시행일을 갱신합니다. 2026년 10월 18일 개정에서는 루트 도메인의 검사 제공과 결과 임시 저장 방식을 반영했습니다.</p>
        </section>
        <details className="border-t border-emerald-100 pt-6">
          <summary className="cursor-pointer font-semibold text-emerald-700">이전 방침 보기 · 2026년 10월 8일</summary>
          <div className="mt-6"><PreviousBrandPrivacyPolicy /></div>
        </details>
      </div>
    </main>
  );
}
