import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "ILINA가 로그인 없는 33문항 피부타입 서비스를 만든 이유 | ILINA",
  description:
    "회원가입과 서버 데이터베이스 없이 브라우저 내 계산 방식으로 33문항 피부타입 설문을 직접 기획하고 구현한 기술적 배경과 서비스 운영 철학을 공유합니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/story/why-we-built-skin-type` },
  openGraph: {
    title: "ILINA가 로그인 없는 33문항 피부타입 서비스를 만든 이유 | ILINA",
    description:
      "상업적 마케팅 대신 투명성과 개인정보 보호를 택한 ILINA 피부타입 서비스의 기획 및 개발 이야기입니다.",
    url: `${siteConfig.brandUrl}/story/why-we-built-skin-type`,
    siteName: "ILINA",
    locale: "ko_KR",
    type: "article",
  },
};

export default function WhyWeBuiltSkinTypeStoryPage() {
  return (
    <article className="py-12 sm:py-16">
      <header className="border-b border-emerald-100 pb-8">
        <p className="text-xs font-bold tracking-widest text-emerald-700">
          제작 이야기
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
          ILINA가 로그인 없는 33문항 피부타입 서비스를 만든 이유
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          인터넷에서 마주하는 수많은 자가 진단 서비스는 몇 가지 질문 뒤에
          &ldquo;결과를 보려면 회원가입을 하세요&rdquo;라거나 &ldquo;맞춤 제품을 위해
          로그인하세요&rdquo;라는 안내로 이어지는 경우가 흔합니다. 때로는 피부에 대한
          진지한 고민이 특정 상품 구매를 유도하기 위한 마케팅 수단처럼 느껴지기도
          합니다.
        </p>
        <p className="mt-3 text-base leading-8 text-slate-600">
          ILINA는 일상에서 마주하는 물음들을 스스로 살펴볼 수 있도록 작고 실용적인
          웹서비스를 직접 기획하고 운영하는 브랜드입니다.
        </p>
        <p className="mt-3 text-base leading-8 text-slate-600">
          우리가 첫 번째 공개 서비스로 &lsquo;피부타입 분석&rsquo;을 선보이면서, 왜
          회원가입과 서버 데이터베이스 없이 33문항의 브라우저 계산 방식을
          채택했는지 그 기술적 구조와 제작 배경을 공유합니다.
        </p>
      </header>

      <div className="mt-10 space-y-12 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            1. 단편적인 분류를 넘어 다각도로 피부를 관찰할 기준이 필요했습니다
          </h2>
          <p className="mt-4 text-slate-600">
            화장품 광고나 일상 대화에서 피부를 설명하는 기준은 오랫동안
            &ldquo;건성인가, 지성인가&rdquo;라는 이분법에 머물러 있었습니다. 그 결과
            유분이 돌면서도 당김과 붉어짐을 겪는 복합적인 상태를 설명하지 못해
            피부에 맞지 않는 스킨케어를 반복하는 일이 잦았습니다.
          </p>
          <p className="mt-3 text-slate-600">
            우리는 사용자가 자신의 피부를 다면적으로 돌아볼 수 있는 체계적인 틀이
            필요하다고 판단했습니다.
          </p>
          <p className="mt-3 text-slate-600">
            그 기초로 삼은 것이 미국 피부과 전문의 레슬리 바우만(Leslie Baumann,
            M.D.) 박사가 제안한 피부 분류 체계였습니다. 유수분(D/O), 민감도(S/R),
            색소 침착(P/N), 주름/탄력(W/T)이라는 4개 축을 독립적으로 살펴보고
            16가지 유형으로 해석하는 방식은, 서로 다른 피부 특성의 조합을
            이해하는 데 유용한 지침이 될 수 있었습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            2. 33문항: 관찰의 깊이와 이용 편의성의 균형
          </h2>
          <p className="mt-4 text-slate-600">
            바우만 박사의 원본 설문 문진표는 60문항이 넘는 방대한 질문으로 구성되어
            있습니다. 의료 기관의 대면 환경에서는 적합하지만, 모바일
            웹브라우저로 접속한 이용자가 지나치게 많은 문항을 마주할 경우
            집중도가 떨어져 중도에 포기하기 쉽습니다. 반대로 질문 수를
            5~10문항으로 과도하게 줄이면 피부를 입체적으로 돌아보는 본래의 장점이
            사라집니다.
          </p>
          <p className="mt-3 text-slate-600">
            ILINA는 4개 축의 핵심적인 생리적 관찰 항목을 추려 총 33문항으로
            설문을 재구성했습니다.
          </p>
          <div className="mt-5 grid gap-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                유수분 경향 (D/O)
              </p>
              <h3 className="mt-1 font-bold text-slate-900">총 6문항</h3>
              <p className="mt-1 text-sm text-slate-600">
                세안 후 당김, T존 유분감, 보습제 도포 후 시간 경과에 따른 체감
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                반응성 경향 (S/R)
              </p>
              <h3 className="mt-1 font-bold text-slate-900">총 9문항</h3>
              <p className="mt-1 text-sm text-slate-600">
                화장품 교체 시 붉어짐이나 가려움, 트러블 경험, 환경 변화에 대한 반응
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 sm:border-t-0">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                색소 침착 경향 (P/N)
              </p>
              <h3 className="mt-1 font-bold text-slate-900">총 7문항</h3>
              <p className="mt-1 text-sm text-slate-600">
                햇빛 노출 후 태닝 반응, 트러블 후 갈색 자국 지속 여부, 잡티 경향
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4 sm:border-t-0">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-700">
                탄력 및 광노화 경향 (W/T)
              </p>
              <h3 className="mt-1 font-bold text-slate-900">총 11문항</h3>
              <p className="mt-1 text-sm text-slate-600">
                평소 야외 자외선 노출 빈도, 표정 주름 체감, 일상 생활습관
              </p>
            </div>
          </div>
          <p className="mt-4 text-slate-600">
            33문항은 약 3~5분 정도의 시간이 소요됩니다. 가벼운 퀴즈처럼
            순식간에 끝나지는 않지만, 최근 몇 달간 내 피부가 보낸 신호들을
            차분히 돌아보기에 적절한 분량이라고 판단했습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            3. 원본 체계와의 차이점: ILINA가 자체 설계한 영역
          </h2>
          <p className="mt-4 text-slate-600">
            ILINA 피부타입 서비스는 기존 이론을 그대로 옮겨놓은 것이 아니라,
            웹 환경에서 이용자가 직관적으로 이해할 수 있도록 자체 설계한
            부분들이 있습니다.
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                1. 일상적인 언어로 다듬은 질문 표현
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                원문의 질문을 기계적으로 번역하지 않고, 국내 사용자들이 세안하고
                화장품을 사용할 때 실제로 느끼는 체감 표현(예: &lsquo;속당김&rsquo;,
                &lsquo;번들거림&rsquo;, &lsquo;갈색 흔적&rsquo;)을 반영해 문항과
                선택지를 다듬었습니다.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                2. 독립된 16개 유형별 관리 가이드 구성
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                단순히 4글자 알파벳만 제시하는 데 그치지 않고, 16가지 유형 각각에
                대해 네 특성의 상호작용을 고려한 3가지 핵심 관리 포인트를
                작성하여 정적 데이터로 수록했습니다.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                3. 정적 제품 매핑 및 루틴 중요도 설계
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                추천 제품 정보는 외부 동적 입찰이나 광고 네트워크 연동 없이,
                정적 데이터 파일에 피부타입과의 적합 매핑(focusTraits)과
                카테고리별 우선순위(order)를 정의하는 구조로 관리됩니다. 또한
                클렌저·토너·세럼·보습제·자외선 차단제의 5단계 루틴에 대해
                필수·권장·선택의 가이드를 함께 제공합니다.
              </p>
            </div>
          </div>
          <aside className="mt-6 border-l-2 border-emerald-300 pl-4 text-sm leading-7 text-slate-600">
            <strong className="text-slate-900">투명한 안내:</strong> 본 서비스의 33문항 점수 계산 및 임계값
            판정은 웹 환경에서 사용자 경향을 파악하기 위해 구성된 자체 모델입니다.
            이는 전문 의료 기관의 임상 장비 검사와 동일한 의학적 정확도를 담보하는
            것은 아니며, 일상 스킨케어를 돕는 보조 참고 도구로 정의됩니다.
          </aside>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            4. 회원가입과 데이터베이스 없이 동작하는 아키텍처
          </h2>
          <p className="mt-4 text-slate-600">
            ILINA 피부타입 서비스를 설계하며 가장 중요하게 고려한 기술적 원칙은
            &ldquo;불필요한 사용자 데이터를 서버에 남기지 않는다&rdquo;는 점이었습니다.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
            <li>
              <strong className="text-slate-900">로그인 불필요:</strong> 이메일,
              전화번호, 이름 등 어떠한 개인정보도 요구하지 않습니다.
            </li>
            <li>
              <strong className="text-slate-900">서버 DB 미저장:</strong> 33개
              문항에 응답한 내용과 결과 점수는 서버 데이터베이스로 전송되지
              않습니다.
            </li>
            <li>
              <strong className="text-slate-900">브라우저 내 즉시 계산:</strong> 모든
              점수 합산과 16타입 판정은 사용자의 기기(스마트폰/PC) 웹브라우저
              JavaScript 메모리에서만 즉시 처리됩니다.
            </li>
            <li>
              <strong className="text-slate-900">임시 세션 유지:</strong> 브라우저
              탭에서 결과 페이지를 새로고침할 때 결과가 사라지지 않도록, 탭 단위
              임시 저장소(sessionStorage)에만 점수 요약이 머물며, 탭을 닫으면 완전히
              소멸합니다.
            </li>
          </ul>
          <p className="mt-4 text-slate-600">
            피부 상태나 생활 습관은 민감할 수 있는 개인의 정보입니다. 이를
            데이터베이스에 수집해 관리하는 방식 대신, 서버 부담이나 유출 우려
            없이 언제든 편안하게 접속해 스스로를 돌아볼 수 있는 순수한 도구를
            만드는 데 집중했습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            5. ILINA가 지향하는 도구의 방향
          </h2>
          <p className="mt-4 text-slate-600">
            ILINA는 앞으로도 일상에서 마주하는 여러 물음들에 대해, 불필요한
            번거로움 없이 본질적인 기능을 제공하는 웹서비스들을 하나씩 만들어
            나갈 계획입니다.
          </p>
          <div className="mt-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <p className="font-bold text-slate-900">우리가 만드는 도구는:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6 text-slate-600">
              <li>불필요한 개인정보 입력을 요구하지 않습니다.</li>
              <li>제공하는 정보의 유용성과 함께 한계점도 솔직하게 안내합니다.</li>
              <li>
                복잡한 정보를 이해하기 쉬운 언어로 풀어내어 이용자 스스로
                판단할 수 있도록 돕습니다.
              </li>
            </ul>
          </div>
          <p className="mt-4 text-slate-600">
            피부타입 서비스가 매일 아침 거울 앞에서 자신의 피부를 조금 더
            편안하게 이해하는 작은 길잡이가 되기를 바랍니다.
          </p>
        </section>
      </div>

      <aside className="mt-12 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
        <h2 className="text-base font-bold text-emerald-950">
          피부타입 설문 바로 시작하기
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          로그인 없이 33문항 설문을 통해 4가지 피부 특성과 나만의 피부 타입을
          직접 확인해 보세요.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`${siteConfig.url}/survey`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800"
          >
            피부타입 설문 시작
          </a>
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            ILINA 브랜드 소개 보기
          </Link>
        </div>
      </aside>

      <nav aria-label="관련 콘텐츠" className="mt-10 border-t border-emerald-100 pt-8">
        <p className="text-xs font-bold tracking-widest text-emerald-700">관련 글</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            href="/guides/four-dimensions"
            className="block rounded-xl border border-slate-100 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm"
          >
            <p className="text-xs font-bold text-emerald-700">피부 가이드</p>
            <p className="mt-1 text-base font-bold text-slate-900">
              피부타입을 결정하는 4가지 기준: 건성·지성 너머의 입체적 분류
            </p>
          </Link>
          <Link
            href="/guides/how-to-use-results"
            className="block rounded-xl border border-slate-100 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm"
          >
            <p className="text-xs font-bold text-emerald-700">피부 가이드</p>
            <p className="mt-1 text-base font-bold text-slate-900">
              피부타입 결과를 일상의 스킨케어 기준으로 활용하는 5가지 원칙
            </p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
