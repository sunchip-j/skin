import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "피부타입 결과를 활용하는 5가지 원칙 | ILINA",
  description:
    "4글자 피부타입 결과를 화장품 과소비로 연결하지 않고, 피부 유형과 일시적 상태를 구분하며 일상의 기본 루틴을 정비하는 구체적인 실천 원칙을 소개합니다.",
  alternates: { canonical: `${siteConfig.brandUrl}/guides/how-to-use-results` },
  openGraph: {
    title: "피부타입 결과를 활용하는 5가지 원칙 | ILINA",
    description:
      "결과 코드를 '관리의 나침반'으로 삼아 기본 루틴을 지키고, 화장품 선택과 교체의 안전한 순서를 익히는 실천 가이드입니다.",
    url: `${siteConfig.brandUrl}/guides/how-to-use-results`,
    siteName: "ILINA",
    locale: "ko_KR",
    type: "article",
  },
};

export default function HowToUseResultsGuidePage() {
  return (
    <article className="py-12 sm:py-16">
      <header className="border-b border-emerald-100 pb-8">
        <p className="text-xs font-bold tracking-widest text-emerald-700">
          피부 가이드
        </p>
        <h1 className="mt-3 text-3xl font-black leading-tight tracking-tight text-slate-950 sm:text-4xl">
          피부타입 결과를 일상의 스킨케어 기준으로 활용하는 5가지 원칙
        </h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          피부타입 설문을 마치고 DSNT나 OSPW와 같은 4글자 결과를 확인했을 때,
          많은 사람들이 가장 먼저 하는 고민은 &ldquo;이제 어떤 화장품을 새로
          사야 할까?&rdquo;입니다.
        </p>
        <p className="mt-3 text-base leading-8 text-slate-600">
          하지만 도출된 4글자 코드는 특정 제품을 즉시 구매하도록 권유하는
          성적표가 아닙니다. 복잡한 화장품 마케팅 정보 속에서 중심을 잡고,
          내 피부가 지금 어떤 부분에서 가장 많은 부담을 느끼고 있는지 되짚어보는
          &lsquo;나침반&rsquo;에 가깝습니다.
        </p>
        <p className="mt-3 text-base leading-8 text-slate-600">
          설문 결과를 건강한 일상 스킨케어로 연결하기 위해 참고할 만한 5가지
          실천 원칙을 정리해 드립니다.
        </p>
      </header>

      <div className="mt-10 space-y-12 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            원칙 1. 결과 코드는 우열의 성적표가 아닌 &lsquo;관리의 나침반&rsquo;입니다
          </h2>
          <p className="mt-4 text-slate-600">
            16가지 피부타입 중 &ldquo;가장 이상적인 우월한 타입&rdquo;이나
            &ldquo;반드시 고쳐야 할 나쁜 타입&rdquo;은 없습니다.
          </p>
          <p className="mt-3 text-slate-600">
            예를 들어 <strong className="text-slate-900">DRNT</strong>(건성·저항성·비색소·탄력)는
            자극 반응이나 색소 침착 고민이 적어 안정적으로 보이지만, 건조함에
            둔감해 보습을 소홀히 하다가 뒤늦게 피부 거칠어짐을 겪기 쉽습니다.
            반대로 <strong className="text-slate-900">OSPW</strong>(지성·민감성·색소성·주름형)는
            일상에서 신경 쓸 항목이 많지만, 그만큼 자외선 차단과 부드러운 세안
            습관을 일찍부터 들여 피부를 건강하게 보호할 기회가 됩니다.
          </p>
          <p className="mt-3 text-slate-600">
            결과 코드는 내 피부의 장점과 유의할 점을 돌아보고, 일상 루틴에서 어디에
            먼저 관심을 기울여야 할지 방향을 잡는 참고 자료입니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            원칙 2. &lsquo;피부 유형(Type)&rsquo;과 &lsquo;일시적 상태(Condition)&rsquo;를 구분하세요
          </h2>
          <p className="mt-4 text-slate-600">
            스킨케어에서 겪는 혼란 중 상당수는 일시적으로 뒤집어진 피부 컨디션을
            장기적인 피부 체질로 오해하는 데서 발생합니다.
          </p>

          <div className="my-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[500px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-slate-900">
                  <th scope="col" className="p-4 font-bold">구분</th>
                  <th scope="col" className="p-4 font-bold">피부 유형 (Skin Type)</th>
                  <th scope="col" className="p-4 font-bold">피부 상태 (Skin Condition)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr>
                  <th scope="row" className="p-4 font-bold text-slate-900">정의</th>
                  <td className="p-4">피지 분비 경향, 자극 반응성 등 비교적 지속적으로 관찰되는 개인의 특성</td>
                  <td className="p-4">수면 부족, 스트레스, 환절기 건조, 자극 등으로 일시 발생한 피부 반응</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-bold text-slate-900">변화 양상</th>
                  <td className="p-4">계절, 연령, 생활 환경에 따라 점진적으로 변화</td>
                  <td className="p-4">수일에서 수주 단위로 비교적 빠르게 변동 가능</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-bold text-slate-900">대표 사례</th>
                  <td className="p-4">평소 피지 분비가 많음(O), 화장품 교체 시 붉어짐이 잦음(S)</td>
                  <td className="p-4">야근 후 뾰루지, 찬 바람으로 인한 각질 들뜸, 일시적 접촉 반응</td>
                </tr>
                <tr>
                  <th scope="row" className="p-4 font-bold text-slate-900">대처 방향</th>
                  <td className="p-4">기본적인 보습·세안·자외선 차단의 일관된 루틴 유지</td>
                  <td className="p-4">피부를 자극하는 요인 제거 및 진정을 위한 휴식</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="mt-3 text-slate-600">
            예를 들어 평소 피지 분비가 왕성한 지성(O) 피부라도, 건조한 실내
            환경에 오래 머물거나 강한 세안제를 자주 쓰면 일시적으로 각질이 하얗게
            일어나고 심한 속당김을 느낄 수 있습니다. 이때 &ldquo;피부가
            극건성으로 완전히 바뀌었다&rdquo;고 오판하여 유분이 매우 많은 무거운
            크림이나 오일을 듬뿍 바르면 모공을 막아 트러블이 심해질 수 있습니다.
          </p>
          <p className="mt-3 text-slate-600">
            설문 결과는 장기적인 &lsquo;유형&rsquo;의 경향성을 나타내므로,
            일시적인 컨디션 난조가 있을 때는 기초 제품을 전면 교체하기보다
            자극 요인을 줄이고 피부가 스스로 안정을 찾도록 돕는 것이 좋습니다.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            원칙 3. 여러 고민이 겹칠 때: 자극 완화와 보습 안정을 우선 고려하세요
          </h2>
          <p className="mt-4 text-slate-600">
            결과 코드 안에 민감성(S), 색소성(P), 주름형(W) 등 여러 관리 포인트가
            함께 포함되어 있을 때, 모든 고민을 동시에 해결하려 들면 피부에
            오히려 무리가 갈 수 있습니다.
          </p>
          <p className="mt-3 text-slate-600">
            일반적으로 다음과 같은 순서로 루틴의 균형을 잡아가는 접근이 도움이 됩니다.
          </p>
          <ol className="mt-5 space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100">
            <li className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">
                1
              </span>
              <div>
                <strong className="text-slate-900">피부 반응 완화와 자극 최소화</strong>
                <p className="mt-1 text-sm text-slate-600">
                  피부가 붉어지거나 따가운 민감 반응(S)이 나타나고 있다면,
                  고농도 각질 제거제나 강한 기능성 성분의 사용은 잠시 쉬어가는 것이
                  권장됩니다. 순한 세안과 자극이 적은 보습으로 피부 표면이
                  편안해지도록 돕는 것이 우선입니다.
                </p>
              </div>
            </li>
            <li className="flex gap-4 border-t border-slate-100 pt-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">
                2
              </span>
              <div>
                <strong className="text-slate-900">유수분 균형 맞추기</strong>
                <p className="mt-1 text-sm text-slate-600">
                  피부가 차분해졌다면 세안 후 적절한 유수분을 공급합니다.
                  건성이라면 수분 증발을 막아주는 크림 제형을, 지성이라면 유분감이
                  덜한 가벼운 젤이나 로션을 선택합니다.
                </p>
              </div>
            </li>
            <li className="flex gap-4 border-t border-slate-100 pt-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">
                3
              </span>
              <div>
                <strong className="text-slate-900">자외선 차단 습관 정착</strong>
                <p className="mt-1 text-sm text-slate-600">
                  색소 침착(P)과 광노화(W) 관리는 문제가 생긴 뒤 지우는 것보다
                  예방이 훨씬 중요합니다. 평소 내 피부에 자극이 없는 자외선
                  차단제를 매일 꾸준히 사용하는 것만으로도 장기적인 관리의 큰
                  부분을 채울 수 있습니다.
                </p>
              </div>
            </li>
            <li className="flex gap-4 border-t border-slate-100 pt-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-black text-emerald-800">
                4
              </span>
              <div>
                <strong className="text-slate-900">기능성 케어의 단계적 도입</strong>
                <p className="mt-1 text-sm text-slate-600">
                  피부 바탕이 충분히 편안하고 기초 루틴이 안정되었을 때, 미백이나
                  주름 개선 등의 기능성 제품을 하나씩 천천히 시도해 봅니다.
                </p>
              </div>
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            원칙 4. 화장품을 바꾸거나 선택할 때 참고할 실천 수칙
          </h2>
          <p className="mt-4 text-slate-600">
            피부타입 결과를 참고해 스킨케어 루틴을 정비하고자 한다면 다음 수칙을
            기억해 두면 좋습니다.
          </p>
          <div className="mt-5 space-y-4">
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                1. 새로운 제품은 한 번에 하나씩만 도입해 보세요.
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                클렌저, 토너, 보습제를 같은 날 동시에 바꾸면 피부에 트러블이
                생겼을 때 어떤 제품의 어떤 성분이 원인이 되었는지 파악하기
                어렵습니다. 하나의 제품을 추가하거나 교체한 뒤 며칠간 피부
                반응을 지켜보고 다음 단계를 결정하는 편이 안전합니다.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                2. 민감한 편이라면 부분 테스트를 먼저 고려하세요.
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                성분 변화에 예민하게 반응하는 편이라면 얼굴 전체에 바르기 전,
                턱선이나 귀 뒤쪽처럼 눈에 잘 띄지 않는 연약한 부위에 소량을
                며칠 발라보며 가려움이나 붉어짐이 없는지 확인해 보는 방법이
                도움이 됩니다.
              </p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-white p-5">
              <h3 className="font-bold text-slate-900">
                3. 루틴을 불필요하게 복잡하게 늘리지 마세요.
              </h3>
              <p className="mt-1 text-sm text-slate-600">
                스킨케어 단계를 과도하게 늘린다고 해서 피부 흡수가 무한정
                늘어나는 것은 아닙니다. 오히려 피부가 접하는 성분과 방부제 노출이
                늘어 자극 가능성이 커질 수 있습니다. &lsquo;순한 세안 - 적절한
                보습 - 자외선 차단&rsquo;이라는 기본 골격을 잘 지키는 것이 가장
                중요합니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-black tracking-tight text-slate-950">
            원칙 5. 자가 설문 결과의 분명한 한계와 진료가 필요한 신호
          </h2>
          <p className="mt-4 text-slate-600">
            ILINA 피부타입 검사는 본인의 체감과 경험에 기초한 온라인 자가 설문
            도구입니다. 임상 진단 장비를 통한 정밀 검사가 아니므로 다음과 같은
            증상이 관찰될 때는 설문 결과에 의존하지 말고 피부과 전문의를 찾아야
            합니다.
          </p>
          <ul className="mt-4 list-disc space-y-2 rounded-2xl bg-amber-50/70 p-6 pl-10 text-sm leading-7 text-amber-950">
            <li>화장품 사용과 무관하게 얼굴 전체에 열감, 심한 홍조, 부종이 지속되는 경우</li>
            <li>진물이 나거나 가려움, 따가움, 통증이 참기 힘들 정도로 동반되는 경우</li>
            <li>좁쌀이나 화농성 결절이 얼굴 전반에 급격히 번지는 경우</li>
            <li>피부에 생긴 점이나 반점의 모양, 크기, 색상이 빠르게 변하는 경우</li>
          </ul>
          <p className="mt-4 text-sm text-slate-500">
            자가 설문은 일상의 편안한 스킨케어 방향을 잡기 위한 가이드일 뿐,
            결코 전문적인 의학적 진단과 치료를 대체할 수 없습니다.
          </p>
        </section>
      </div>

      <aside className="mt-12 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
        <h2 className="text-base font-bold text-emerald-950">
          내 피부타입 결과 확인하기
        </h2>
        <p className="mt-2 text-sm leading-7 text-slate-600">
          피부의 4개 축 점수와 나의 유형에 맞는 관리 포인트를 아직 확인하지
          않으셨다면, 33문항 설문을 진행해 보세요.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a
            href={`${siteConfig.url}/survey`}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-emerald-700 px-5 text-sm font-bold text-white hover:bg-emerald-800"
          >
            피부타입 설문 시작하기
          </a>
          <Link
            href="/guides/four-dimensions"
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-emerald-200 bg-white px-5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            4가지 피부 기준 알아보기
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
            <p className="text-xs font-bold text-emerald-700">이전 가이드</p>
            <p className="mt-1 text-base font-bold text-slate-900">
              피부타입을 결정하는 4가지 기준: 건성·지성 너머의 입체적 분류
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
