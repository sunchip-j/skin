import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "피부타입을 결정하는 4가지 기준 | ILINA",
  description:
    "유수분, 자극 반응성, 색소 침착, 탄력과 광노화 경향까지. 피부를 4가지 독립된 축으로 나누어 입체적으로 이해하는 기준과 일상 관찰 방법을 안내합니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/guides/four-dimensions` },
  openGraph: {
    title: "피부타입을 결정하는 4가지 기준 | ILINA",
    description:
      "단일 건·지성 구분을 넘어 유수분, 반응성, 색소, 탄력의 4개 축으로 피부를 관찰하는 입체적인 기준을 소개합니다.",
    url: `${siteConfig.brandUrl}/guides/four-dimensions`,
    siteName: "ILINA",
    locale: "ko_KR",
    type: "article",
  },
};

export default function FourDimensionsGuidePage() {
  return (
    <article className="py-12 sm:py-16">
      <header className="border-b border-emerald-100 pb-8">
        <p className="text-xs font-bold tracking-widest text-emerald-700">
          피부 가이드
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
          피부타입을 결정하는 4가지 기준: 건성·지성 너머의 입체적 분류
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          화장품을 고를 때 &ldquo;나는 건성일까, 지성일까?&rdquo;라는 단순한 질문
          앞에서 고민해 본 경험이 누구나 있을 것입니다. T존에는 번들거림이
          쉽게 올라오는데 볼 주변은 세안 후 당김이 심하거나, 지성용 피지 조절
          제품을 썼더니 붉은 자극과 좁쌀 모양의 불편감이 뒤따르는 경우가 적지
          않습니다.
        </p>
        <p className="mt-3 text-base leading-8 text-slate-600">
          피부는 유분의 많고 적음 하나만으로 단순하게 규정하기 어렵습니다.
          피지 분비량뿐 아니라 외부 자극에 얼마나 민감하게 반응하는지,
          트러블이나 햇빛 노출 뒤 흔적이 오래 남는지, 그리고 일상 자외선 노출과
          시간의 경과에 따라 탄력 저하를 얼마나 체감하는지가 사람마다 제각기
          다르기 때문입니다.
        </p>
      </header>

      <div className="mt-10 space-y-12 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            1. 제1축: 건성(Dry) vs 지성(Oily) — 피지 분비와 수분 유지 경향
          </h2>
          <p className="mt-4 text-slate-600">
            첫 번째 기준은 피부 표면의 유분감과 세안 후 느껴지는 보습 상태를
            관찰하는 유수분 경향입니다.
          </p>
          <div className="mt-5 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                건성 (Dry, D)
              </h3>
              <p className="mt-1 text-slate-600">
                피지 분비량이 상대적으로 적어 피부 표면의 유분막 형성이
                더딥니다. 수분이 외부로 쉽게 증발하기 때문에 세안 직후 얼굴
                전반, 특히 볼과 입가 주변에서 당김을 느끼기 쉽습니다. 건조한
                환절기나 겨울철에는 하얗게 각질이 일어나는 현상이 자주
                관찰됩니다.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-lg font-bold text-slate-900">
                지성 (Oily, O)
              </h3>
              <p className="mt-1 text-slate-600">
                피지 분비가 활발하여 이마, 코 등 T존을 비롯한 얼굴 전반에
                번들거림이 자주 나타납니다. 모공이 상대적으로 눈에 잘 띄며,
                시간이 지나면서 피지로 인해 화장이 지워지기 쉽습니다. 다만 유분이
                많다고 해서 각질층 내부의 수분 유지력까지 항상 충분한 것은
                아니므로, 유수분 상태를 분리해 관찰할 필요가 있습니다.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50/70 p-4 text-sm leading-7 text-emerald-950">
            <p className="font-bold text-emerald-800">일상 관찰 팁</p>
            <p className="mt-1">
              세안 후 기초 제품을 바르지 않은 상태로 평소 생활 환경에서 1~2시간가량
              머물러 보세요. 시간이 지나면서 얼굴 전반에 자연스러운 유분감이 돌고
              당김이 거의 느껴지지 않는다면 지성(O)에 가깝고, 볼이나 눈가
              주변이 뻣뻣하게 당기고 건조함이 계속된다면 건성(D) 경향이
              우세하다고 볼 수 있습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            2. 제2축: 민감성(Sensitive) vs 저항성(Resistant) — 자극에 대한 피부 반응성
          </h2>
          <p className="mt-4 text-slate-600">
            두 번째 축은 새로운 화장품 성분이나 환경 변화에 노출되었을 때
            피부가 얼마나 쉽게 반응(붉어짐, 가려움, 따가움 등)을 나타내는지를
            살펴봅니다.
          </p>
          <div className="mt-5 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                민감성 (Sensitive, S)
              </h3>
              <p className="mt-1 text-slate-600">
                피부 장벽의 방어 기능이 약화되어 있거나 외부 자극에 반응하는
                역치가 낮은 상태입니다. 새로운 제품을 사용했을 때 일시적인
                따가움이나 붉어짐을 겪기 쉬우며, 환절기 기온 차나 건조한
                환경에서도 피부 불편감을 자주 호소합니다.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-lg font-bold text-slate-900">
                저항성 (Resistant, R)
              </h3>
              <p className="mt-1 text-slate-600">
                외부 자극에 대해 피부가 견디는 역치가 상대적으로 높아, 대부분의
                스킨케어 제품을 큰 불편 없이 편안하게 사용하는 편입니다. 다만
                저항성 피부라고 해서 피부 손상이 전혀 발생하지 않는 것은
                아닙니다. 즉각적인 붉어짐이나 자극 신호가 뚜렷하지 않더라도,
                과도한 마찰이나 자외선 누적은 피부에 부담을 줄 수 있으므로
                기본적인 보호 관리는 여전히 필요합니다.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50/70 p-4 text-sm leading-7 text-emerald-950">
            <p className="font-bold text-emerald-800">일상 관찰 팁</p>
            <p className="mt-1">
              기초 화장품을 바꾸거나 환절기 기후가 변할 때의 피부 반응을 돌아보세요.
              제품 교체 시 붉은 기, 가려움, 화끈거림을 자주 경험하여 성분 선택에
              각별한 주의가 필요하다면 민감성(S) 성향이고, 새로운 제품을 써도
              별다른 불편 없이 대체로 잘 적응해왔다면 저항성(R) 경향으로 이해할 수
              있습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            3. 제3축: 색소성(Pigmented) vs 비색소성(Non-pigmented) — 자극 후 흔적과 멜라닌 반응
          </h2>
          <p className="mt-4 text-slate-600">
            세 번째 축은 자외선 노출이나 트러블이 지나간 뒤 피부에 갈색 색소
            흔적이 남는 경향성을 살펴봅니다.
          </p>
          <div className="mt-5 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                색소성 (Pigmented, P)
              </h3>
              <p className="mt-1 text-slate-600">
                피부 표피의 멜라닌 형성 반응이 상대적으로 활발합니다. 햇빛에
                노출되었을 때 쉽게 타거나 잡티가 짙어지며, 뾰루지나 여드름 같은
                염증이 가라앉은 뒤 갈색 자국(염증 후 색소 침착)이 오래도록
                머무는 경향이 있습니다. 평소 자외선 차단에 신경을 쓰는 것이
                관리의 중요한 축이 됩니다.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-lg font-bold text-slate-900">
                비색소성 (Non-pigmented, N)
              </h3>
              <p className="mt-1 text-slate-600">
                햇빛에 노출되거나 트러블이 지나간 뒤에도 짙은 갈색 흔적으로
                고착되는 빈도가 상대적으로 낮습니다. 붉은 기가 가라앉으면
                비교적 본래 피부 톤을 되찾는 편입니다. 그러나 색소 침착이
                적다고 해서 자외선에 의한 광노화 영향까지 없는 것은 아니므로,
                자외선 차단제 사용은 동일하게 권장됩니다.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50/70 p-4 text-sm leading-7 text-emerald-950">
            <p className="font-bold text-emerald-800">일상 관찰 팁</p>
            <p className="mt-1">
              여드름이나 뾰루지가 아물고 난 뒤 남는 자국을 관찰해 보세요. 염증이
              가라앉은 뒤에도 갈색 흔적이 수개월 이상 지속된다면 색소성(P)
              경향이며, 붉은 기운이 가라앉은 후 별다른 짙은 흔적 없이 비교적
              빠르게 원래 톤으로 돌아온다면 비색소성(N)에 가깝습니다.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            4. 제4축: 주름형(Wrinkled) vs 탄력형(Tight) — 광노화 노출과 탄력 관리 경향
          </h2>
          <p className="mt-4 text-slate-600">
            네 번째 축은 현재의 나이만을 의미하는 것이 아니라, 평소 자외선
            노출 정도와 생활습관, 그리고 피부 탄력 저하에 대한 취약성을 복합적으로
            평가하는 기준입니다.
          </p>
          <div className="mt-5 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                주름형 (Wrinkled, W)
              </h3>
              <p className="mt-1 text-slate-600">
                야외 활동으로 인한 자외선 노출 빈도가 높거나, 건조함과 표정 습관
                등의 영향으로 잔주름 및 탄력 저하를 체감하기 쉬운 상태입니다.
                광노화를 완화하기 위한 규칙적인 자외선 차단과 보습 중심의 예방
                관리가 특히 강조됩니다.
              </p>
            </div>
            <div className="border-t border-slate-100 pt-4">
              <h3 className="text-lg font-bold text-slate-900">
                탄력형 (Tight, T)
              </h3>
              <p className="mt-1 text-slate-600">
                평소 자외선 차단 습관이나 피부 컨디션 덕분에 탄력 저하나
                잔주름에 대한 체감이 상대적으로 덜한 상태입니다. 현재의
                안정적인 탄력 상태를 유지하기 위한 기본적인 보습과 예방적
                자외선 차단이 중심이 됩니다.
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-xl bg-emerald-50/70 p-4 text-sm leading-7 text-emerald-950">
            <p className="font-bold text-emerald-800">일상 관찰 팁</p>
            <p className="mt-1">
              평소 야외 활동 시 자외선 차단제를 바르는 빈도와, 건조할 때
              눈가·입가 주변 잔주름의 체감 정도를 점검해 보세요.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            5. 4가지 축의 결합: 16가지 입체적 피부 유형의 탄생
          </h2>
          <p className="mt-4 text-slate-600">
            이 네 축은 각자의 특성을 독립적으로 반영합니다. 각 축에서 관찰된
            특성을 순서대로 조합하면 총 16가지(2×2×2×2)의 피부 타입 코드가
            구성됩니다.
          </p>
          <div className="mt-4 rounded-2xl border border-emerald-100 bg-white p-5 text-sm leading-7 text-slate-700">
            <p className="font-bold text-emerald-800">
              코드 표기 순서: 유수분(D/O) → 반응성(S/R) → 색소(P/N) → 탄력(W/T)
            </p>
            <p className="mt-2 text-slate-600">
              예를 들어 <strong className="text-slate-900">OSPW</strong> 타입은 다음과 같이 이해할 수 있습니다:
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
              <li><strong>O (지성)</strong>: 피지 분비가 많아 번들거림이 고민이지만,</li>
              <li><strong>S (민감성)</strong>: 피부 반응 역치가 낮아 자극적인 성분에 쉽게 붉어질 수 있으며,</li>
              <li><strong>P (색소성)</strong>: 트러블이 가라앉은 뒤 갈색 자국이 남기 쉽고,</li>
              <li><strong>W (주름형)</strong>: 자외선과 건조에 노출될 경우 잔주름이나 탄력 저하를 신경 써야 하는 상태입니다.</li>
            </ul>
          </div>
          <p className="mt-4 text-slate-600">
            만약 이 유형의 사용자가 &lsquo;지성&rsquo;이라는 한 가지 사실에만 집중하여
            알코올 함량이 높거나 강한 각질 제거 제품을 자주 쓴다면, 민감한(S)
            장벽을 자극해 붉어짐이 심해지고, 그 결과 생긴 염증이 색소성(P)
            경향과 만나 짙은 흔적을 남기는 악순환이 발생할 수 있습니다.
          </p>
          <p className="mt-3 text-slate-600">
            이처럼 4가지 축을 함께 살펴보는 것은, 피부 고민이 여러 개 겹칠 때
            어떤 자극을 먼저 줄이고 무엇을 조심해야 할지 관리의 우선순위를
            정하는 데 도움을 줍니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            6. 피부 특성을 관찰할 때 유의할 점
          </h2>
          <div className="mt-4 space-y-4">
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                1. 피부타입은 평생 고정된 것이 아닙니다.
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                계절, 거주 지역의 기후, 호르몬 변화, 복용하는 약물이나 수면
                상태에 따라 피지 분비량(D/O)과 피부 반응성(S/R)은 달라질 수
                있습니다. 여름철에 지성(O)에 가깝던 피부가 건조한 겨울철에는
                건성(D) 경향을 보일 수 있습니다.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                2. 저항성(R) 피부도 기본적인 관리는 필요합니다.
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                즉각적인 붉어짐이나 트러블이 적다고 해서 피부가 자외선이나 강한
                마찰에 무적인 것은 아닙니다. 자극을 덜 느낄 뿐이므로 자외선
                차단과 부드러운 세안은 동일하게 지켜야 합니다.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                3. 설문 결과는 질환 진단이 아닙니다.
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                온라인 설문을 통한 피부타입 분류는 화장품 선택과 일상 관리의
                방향을 잡기 위한 참고용 경향성 안내입니다. 접촉성 피부염,
                지루성 피부염, 주사(Rosacea) 등 의학적 치료가 필요한 피부 질환은
                반드시 피부과 전문의의 진료를 통해 정확한 진단과 치료를 받아야
                합니다.
              </p>
            </div>
          </div>
        </section>
      </div>

      <aside className="mt-12 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
        <h2 className="text-base font-bold text-emerald-950">
          내 피부타입을 직접 확인해보고 싶다면
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          ILINA 피부타입 서비스에서 33문항 설문으로 4가지 특성과 16가지 유형 중
          나의 경향을 확인해 보세요.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`${siteConfig.url}/survey`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800"
          >
            피부타입 검사 시작하기
          </a>
          <a
            href={`${siteConfig.url}/guide`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            16가지 유형 전체 보기
          </a>
        </div>
      </aside>

      <nav aria-label="관련 콘텐츠" className="mt-10 border-t border-emerald-100 pt-8">
        <p className="text-xs font-bold tracking-widest text-emerald-700">관련 글</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Link
            href="/guides/how-to-use-results"
            className="block rounded-xl border border-slate-100 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm"
          >
            <p className="text-xs font-bold text-emerald-700">다음 가이드</p>
            <p className="mt-1 text-base font-bold text-slate-900">
              피부타입 결과를 일상의 스킨케어 기준으로 활용하는 5가지 원칙
            </p>
          </Link>
          <Link
            href="/story/why-we-built-skin-type"
            className="block rounded-xl border border-slate-100 bg-white p-4 transition hover:border-emerald-200 hover:shadow-sm"
          >
            <p className="text-xs font-bold text-emerald-700">제작 이야기</p>
            <p className="mt-1 text-base font-bold text-slate-900">
              ILINA가 로그인 없는 33문항 피부타입 서비스를 만든 이유
            </p>
          </Link>
        </div>
      </nav>
    </article>
  );
}
