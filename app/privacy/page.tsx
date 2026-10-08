import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  alternates: { canonical: "https://skin.ilina.kr/privacy" },
  title: "개인정보처리방침 | ILINA",
  description: "ILINA 피부타입 서비스의 개인정보처리방침입니다.",
};

const GOOGLE_AD_SETTINGS_URL = "https://adssettings.google.com/";
const GOOGLE_AD_PRIVACY_URL = "https://policies.google.com/technologies/ads";

function PolicySection({
  title,
  children,
}: Readonly<{
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="border-t border-slate-100 py-6 first:border-t-0 first:pt-0">
      <h2 className="text-lg font-black tracking-tight text-slate-950">
        {title}
      </h2>
      <div className="mt-3 space-y-3 text-sm font-medium leading-6 text-slate-600">
        {children}
      </div>
    </section>
  );
}

export default function PrivacyPage() {
  return (
    <main className="bg-[linear-gradient(180deg,#f7fbf8_0%,#eef7f4_100%)] px-4 py-6 text-slate-900 sm:py-10">
      <article className="mx-auto w-full max-w-2xl overflow-hidden rounded-[28px] border border-emerald-100 bg-white px-5 py-7 shadow-[0_18px_44px_rgba(15,118,110,0.08)] sm:px-8 sm:py-9">
        <header className="mb-7">
          <p className="text-[0.68rem] font-black uppercase tracking-[0.2em] text-emerald-700">
            {siteConfig.serviceName}
          </p>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950">
            개인정보처리방침
          </h1>
          <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
            이 방침은 피부타입 분석 서비스에서 이용자 정보가 어떻게 처리되는지
            안내하기 위한 것입니다.
          </p>
        </header>

        <PolicySection title="1. 방침의 목적">
          <p>
            이 개인정보처리방침은 {siteConfig.serviceName} 이용 과정에서 처리될 수
            있는 정보와 이용자가 이를 관리할 수 있는 방법을 투명하게 안내하는 것을
            목적으로 합니다.
          </p>
        </PolicySection>

        <PolicySection title="2. 서비스가 직접 수집하는 개인정보">
          <p>
            현재 서비스에는 회원가입이나 로그인이 없으며, 이름·이메일·전화번호
            등의 개인정보를 입력받거나 별도로 수집하지 않습니다.
          </p>
        </PolicySection>

        <PolicySection title="3. 설문 응답과 피부타입 결과">
          <p>
            설문 응답은 이용 중인 브라우저 안에서만 처리되며 서버나 데이터베이스에
            저장되지 않습니다. 피부타입 결과 또한 서버나 데이터베이스에 저장되지
            않습니다.
          </p>
          <p>
            결과 화면을 표시하고 같은 탭에서 새로고침할 때 결과를 복원하기 위해
            피부타입 코드와 4개 분석 축의 점수를 브라우저의 sessionStorage에
            임시로 저장합니다. 개별 문항 응답은 저장하지 않습니다. 이 정보는 해당
            탭의 세션 동안만 유지되며 결과 페이지 URL에는 포함되지 않습니다.
          </p>
        </PolicySection>

        <PolicySection title="4. 자동 생성 정보와 쿠키">
          <p>
            현재 서비스는 위 결과 복원 목적의 sessionStorage 외에 localStorage나
            쿠키를 사용해 설문 응답 또는 결과를 저장하지 않으며, 별도의 방문 분석
            도구도 사용하지 않습니다.
          </p>
          <p>
            다만 웹서비스에 접속하는 과정에서 호스팅·네트워크 제공자의 시스템에
            IP 주소, 브라우저 및 기기 정보, 접속 시각, 요청 URL 같은 접속정보가
            통상적인 서버 로그로 생성될 수 있습니다. 이러한 정보의 구체적인 처리
            범위와 보관 기간은 실제 운영 환경의 설정 및 해당 제공자의 정책에 따라
            달라질 수 있습니다.
          </p>
        </PolicySection>

        <PolicySection title="5. Google AdSense 광고">
          <p>
            서비스는 향후 Google AdSense를 통해 광고를 제공할 수 있습니다. 광고가
            적용되면 Google을 포함한 제3자 광고 사업자가 광고 제공, 노출 빈도 제한,
            부정 이용 방지, 광고 성과 측정 등을 위해 쿠키 또는 이와 유사한 기술을
            사용할 수 있습니다.
          </p>
          <p>
            Google과 그 파트너는 이용자의 이 서비스 또는 다른 웹사이트 방문 정보
            등을 바탕으로 맞춤형 광고를 제공할 수 있습니다. 서비스는 설문 응답이나
            피부타입 결과를 맞춤형 광고의 선택 또는 타기팅에 사용하지 않습니다.
            맞춤형 광고 사용 여부와 실제 데이터 처리는 이용자의 설정, 지역 및
            Google의 정책에 따라 달라질 수 있습니다.
          </p>
          <p>
            이용자는
            {" "}
            <a
              href={GOOGLE_AD_SETTINGS_URL}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-600"
            >
              Google 광고 설정
            </a>
            에서 맞춤형 광고를 관리할 수 있습니다. Google의 광고 관련 쿠키 및
            정보 처리에 관한 자세한 내용은
            {" "}
            <a
              href={GOOGLE_AD_PRIVACY_URL}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-emerald-700 underline decoration-emerald-200 underline-offset-4 hover:text-emerald-600"
            >
              Google 광고 개인정보 보호 안내
            </a>
            에서 확인할 수 있습니다. 맞춤형 광고를 사용 중지하더라도 현재 보고
            있는 페이지의 내용이나 대략적인 위치 등 문맥에 따른 광고는 표시될 수
            있습니다.
          </p>
        </PolicySection>

        <PolicySection title="6. 문의">
          {siteConfig.privacyContactEmail ? (
            <p>
              개인정보 관련 문의: {" "}
              <a
                href={`mailto:${siteConfig.privacyContactEmail}`}
                className="font-bold text-emerald-700 underline decoration-emerald-200 underline-offset-4"
              >
                {siteConfig.privacyContactEmail}
              </a>
            </p>
          ) : (
            <p>
              개인정보 관련 문의 채널은 현재 준비 중입니다. 운영자는 서비스 공개
              전에 문의 이메일을 설정하고 이 항목을 갱신합니다.
            </p>
          )}
        </PolicySection>

        <PolicySection title="7. 시행일">
          <p>이 개인정보처리방침은 2026년 9월 20일부터 시행합니다.</p>
        </PolicySection>

        <div className="border-t border-slate-100 pt-6">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center text-sm font-black text-emerald-700 transition hover:text-emerald-600"
          >
            <span aria-hidden="true" className="mr-1.5">
              ←
            </span>
            피부타입 서비스로 돌아가기
          </Link>
        </div>
      </article>
    </main>
  );
}
