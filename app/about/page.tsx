import type { Metadata } from "next";
import Link from "next/link";
import { ContentSection, ContentShell } from "@/app/components/content-shell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "서비스와 콘텐츠 소개 | ILINA",
  description: "ILINA 피부 타입 서비스의 목적, 콘텐츠 작성 원칙, 정보의 한계와 문의 방법을 안내합니다.",
};

export default function AboutPage() {
  return (
    <ContentShell eyebrow="About ILINA" title="피부를 이해하기 위한 출발점" description="ILINA 피부 타입은 사용자가 자신의 피부 경향을 네 가지 기준으로 살펴보고 일상적인 관리 방향을 정리하도록 돕는 정보 서비스입니다.">
      <ContentSection title="서비스의 목적">
        <p>33개 문항에 답하면 건성·지성, 민감성·저항성, 색소성·비색소성, 주름형·탄력형의 네 축을 조합해 16가지 피부 타입 중 하나를 안내합니다.</p>
        <p>결과는 제품을 많이 사용하도록 유도하기 위한 진단이 아니라 세안, 보습, 자외선 차단 등 기본 관리에서 무엇을 우선할지 생각하는 참고 자료입니다.</p>
      </ContentSection>

      <ContentSection title="콘텐츠 작성과 관리 원칙">
        <ul className="list-disc space-y-2 pl-5">
          <li>유형별 설명은 서로 다른 피부 특성과 관리 우선순위를 반영해 작성합니다.</li>
          <li>의학적 진단이나 치료 효과를 보장하는 표현을 사용하지 않습니다.</li>
          <li>제품 정보와 추천 기준은 피부 타입과 사용 목적을 구분해 설명합니다.</li>
          <li>내용과 제품 정보가 오래되지 않도록 정기적으로 점검하고 수정합니다.</li>
        </ul>
      </ContentSection>

      <ContentSection title="정보의 한계와 문의">
        <p>온라인 설문은 대면 진료를 대신할 수 없습니다. 갑작스러운 피부 변화, 통증, 염증 또는 지속적인 불편이 있다면 피부과 전문의와 상담하세요.</p>
        <p>콘텐츠 정정이나 개인정보 관련 문의는 <a className="font-bold text-emerald-700 underline" href={`mailto:${siteConfig.privacyContactEmail}`}>{siteConfig.privacyContactEmail}</a>로 보낼 수 있습니다.</p>
        <p><Link href="/privacy" className="font-bold text-emerald-700 underline">개인정보처리방침 확인하기</Link></p>
      </ContentSection>
    </ContentShell>
  );
}
