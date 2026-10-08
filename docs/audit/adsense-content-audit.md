# ILINA 애드센스 콘텐츠 품질 사전 분석

- 작성일: 2026-10-08
- 분석 범위: 저장소 소스코드 기준 (`/Users/jin/zhyun/dev/skin`)
- 분석 목적: `ilina.kr` AdSense ‘가치가 별로 없는 콘텐츠(Low Value Content)’ 거절에 대한 구조·콘텐츠·SEO 사전 진단 및 개선 계획 수립
- 이번 산출물: 분석 문서만 작성. 서비스 코드·UI·라우팅·배포 설정은 변경하지 않음

> **중요 한계**  
> Google의 실제 내부 심사 기준이나 이번 거절의 정확한 원인은 확인할 수 없다. 아래 내용은 코드에서 확인된 사실과, AdSense 공개 정책·일반적인 심사 관행에 기반한 **잠재 원인 추정**을 구분하여 기술한다.  
> 실제 운영 사이트(`ilina.kr`, `skin.ilina.kr`)의 HTTP 응답, Search Console 색인 상태, AdSense 계정 설정은 본 분석에서 검증하지 않았다.

---

## 1. 분석 개요

### 1.1 서비스 운영 방향 (전제)

| 도메인 | 역할 |
|---|---|
| `ilina.kr` | ILINA 브랜드 공식 홈페이지 |
| `skin.ilina.kr` | 공개 중인 피부타입 분석 서비스 |

- ILINA 정체성: 작지만 유용한 웹서비스를 직접 만들고 운영하는 브랜드
- 미공개 서비스는 홈페이지·본 문서의 외부 공개용 콘텐츠 제안에 포함하지 않음
- 기존 피부타입 서비스의 기능·디자인은 최대한 유지하는 방향

### 1.2 한 줄 진단

**실질적인 정보·기능 콘텐츠는 `skin.ilina.kr`에 집중되어 있고, AdSense 심사 대상인 `ilina.kr` 루트는 브랜드명 + 서비스 링크 카드 수준의 페이지에 머물러 있다.**  
이 구조는 Low Value Content 거절과 강하게 정합한다. 다만 Google이 서브도메인 콘텐츠를 어느 범위까지 함께 보았는지는 본 분석으로 확정할 수 없다.

### 1.3 확인된 사실 vs 추정

| 구분 | 내용 |
|---|---|
| 확인됨 (코드) | Host rewrite로 `ilina.kr` `/` → `/ilina-home`, 홈 콘텐츠 분량·구성, sitemap/robots가 `skin.ilina.kr` 기준, ads.txt 존재, AdSense 스크립트 미삽입, privacy/about/guide/16타입 페이지 존재 |
| 추정 (검증 필요) | 실제 배포가 동일 앱인지, `www` 처리, 색인 여부, AdSense가 루트만 심사했는지, 트래픽·체류시간 |
| 단정 불가 | Google 거절의 단일 확정 원인, 정책 위반 여부 |

---

## 2. 현재 사이트 및 라우팅 구조

### 2.1 기술 스택

| 항목 | 값 | 근거 |
|---|---|---|
| 프레임워크 | Next.js 16 App Router | `package.json` |
| UI | React 19, Tailwind CSS 4 | `package.json`, `tailwind.config.js` |
| 데이터 | 정적 JSON / TS 상수, 서버 DB 없음 | `README.md`, `docs/project-analysis.md` |
| middleware | 없음 | `middleware.ts` / `middleware.js` 미존재 |

### 2.2 Host 기반 분기

`next.config.ts`의 `rewrites().beforeFiles`에서 **호스트가 정확히 `ilina.kr`일 때만** `/`를 `/ilina-home`으로 rewrite한다.

```10:27:next.config.ts
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/",
          destination: "/ilina-home",
          has: [
            {
              type: "host",
              value: "ilina.kr",
            },
          ],
        },
      ],
```

| 요청 | 코드상 기대 동작 |
|---|---|
| `https://ilina.kr/` | `/ilina-home` 페이지 렌더 |
| `https://skin.ilina.kr/` | `app/page.tsx` (피부타입 시작 화면) |
| `https://ilina.kr/ilina-home` | 동일 홈 컴포넌트에 직접 접근 가능 (별도 차단 없음) |
| `www.ilina.kr` | rewrite 조건에 없음 → **코드만으로는 홈 rewrite 미적용**. 실제 DNS/호스팅 리다이렉트는 미검증 |

URL은 rewrite이므로 브라우저 주소는 `/`로 유지되는 것이 Next.js rewrite의 일반 동작이다. 실제 배포 환경에서의 Host 헤더·프록시 동작은 별도 확인이 필요하다.

### 2.3 사이트 설정

```3:9:config/site.ts
export const siteConfig = {
  name: "ILINA",
  serviceName: "ILINA 피부타입",
  url: "https://skin.ilina.kr",
  privacyContactEmail: configuredPrivacyContact || "do.il2na@gmail.com",
} as const;
```

- 공식 `siteConfig.url`은 **서브도메인만** 가리킨다.
- `robots.ts` / `sitemap.ts`도 이 URL을 기준으로 생성된다.
- 배포 설정 파일(`vercel.json` 등)은 저장소에 없다. 도메인 연결·환경변수는 코드 밖 설정으로 본다.

### 2.4 도메인별 개념 구조

```text
ilina.kr
  └─ /  → (rewrite) /ilina-home   ← 브랜드 홈 (현재 최소 콘텐츠)
       └─ 외부 링크 → https://skin.ilina.kr
       └─ 개인정보 → https://skin.ilina.kr/privacy
       └─ mailto 문의

skin.ilina.kr
  ├─ /                 설문 시작
  ├─ /survey           설문 (noindex)
  ├─ /result           결과 (noindex)
  ├─ /guide            피부 타입 가이드
  ├─ /about            서비스 소개
  ├─ /privacy          개인정보처리방침
  ├─ /skin-type/[type] 16타입 상세
  ├─ /play/skin-type/* 별칭·제품 추천
  └─ /dev/*            개발용 (공개 라우트)
```

---

## 3. 현재 공개 페이지 목록

### 3.1 `ilina.kr`에서 의미 있는 공개 표면 (코드 기준)

| URL (개념) | 라우트 파일 | 성격 | 비고 |
|---|---|---|---|
| `/` | `app/ilina-home/page.tsx` | 브랜드 홈 | Host rewrite 시에만 루트로 노출 |
| `/ilina-home` | 동일 | 직접 경로 | 의도된 공개 URL인지 불명확 |
| 기타 `/guide`, `/about` 등 | `app/*` | **같은 앱에 존재** | Host 분기 없이 동일 경로로 서빙될 수 있음. **실제 `ilina.kr/guide` 접근·색인 여부는 미검증** |

루트 홈(`ilina-home`)은 사이트 공통 푸터(`SiteFooter`)를 CSS로 숨긴다.

```15:15:app/ilina-home/page.tsx
      <style>{`footer[data-skin-site-footer] { display: none; }`}</style>
```

따라서 루트 홈에서는 `/guide`, `/about`으로의 내부 링크가 푸터를 통해 노출되지 않는다.

### 3.2 `skin.ilina.kr` 공개·준공개 페이지

| 경로 | 파일 | 색인 메타 (코드) | sitemap 포함 |
|---|---|---|---|
| `/` | `app/page.tsx` | 기본(허용) | ✅ |
| `/survey` | `app/survey/page.tsx` | `noindex, follow` | ❌ |
| `/result` | `app/result/layout.tsx` | `noindex, follow` | ❌ |
| `/guide` | `app/guide/page.tsx` | 기본 | ✅ |
| `/about` | `app/about/page.tsx` | 기본 | ✅ |
| `/privacy` | `app/privacy/page.tsx` | 기본 | ✅ |
| `/skin-type/[type]` | `app/skin-type/[type]/page.tsx` | 기본 + relative canonical | ✅ (16개) |
| `/skin-type/[type]/products` | `app/skin-type/[type]/products/page.tsx` | 기본(명시적 noindex 없음) | ❌ |
| `/play/skin-type` | `app/play/skin-type/page.tsx` | 기본 | ❌ |
| `/play/skin-type/survey` | redirect/이동형 | (survey와 유사 흐름) | ❌ |
| `/play/skin-type/products` | layout에 `noindex` | noindex | ❌ |
| `/dev`, `/dev/result/*` | `app/dev/*` | **noindex 없음** | ❌ |
| `/ilina-home` | `app/ilina-home/page.tsx` | 기본 | ❌ |

### 3.3 연결 관계 (사용자 동선)

```text
[ilina.kr 홈]
  → (외부 a 태그) skin.ilina.kr
  → skin.ilina.kr/privacy
  → mailto

[skin.ilina.kr 홈 = 설문 시작]
  → /survey → (sessionStorage) /result → 제품 추천
  푸터: /guide, /about, /privacy

[/guide]
  → /skin-type/{code} × 16
  → ContentShell 내비: /, /guide, /about

[/about]
  → mailto, /privacy

[/skin-type/{code}]
  → /survey, /guide
```

**갭:** `ilina.kr` → 피부 가이드/소개/타입 상세로 가는 **같은 도메인 내부 링크가 없다.**  
피부 서비스 시작 화면(`SkinTypeStartScreen`)에도 `/guide`, `/about` CTA가 없고, 푸터에만 있다.

---

## 4. 콘텐츠 품질 분석

### 4.1 루트 홈페이지 (`app/ilina-home/page.tsx`)

**구성**

1. 브랜드명 `ILINA` (작은 타이포)
2. 카드 1개: “피부타입 / 나의 피부 특성 알아보기” → `https://skin.ilina.kr`
3. 푸터: 개인정보처리방침(서브도메인), 문의(mailto), © 2026 ILINA

**메타데이터**

```3:6:app/ilina-home/page.tsx
export const metadata: Metadata = {
  title: "ILINA",
  description: "ILINA 서비스",
};
```

title/description이 브랜드·서비스 가치를 설명하기에 매우 빈약하다.

**사용자 가치**

| 얻을 수 있는 것 | 여부 |
|---|---|
| 브랜드가 무엇인지 | 이름만 (정체성·미션 설명 없음) |
| 서비스가 무엇을 하는지 | 한 줄 수준 |
| 바로 쓸 수 있는 정보/도구 | 없음 (외부 이동만) |
| 운영자·신뢰 정보 | 이메일 링크 정도 |
| 가이드·소개 문서 | 없음 |

**판정:** 단순 서비스 링크(디렉터리형) 페이지에 가깝다. AdSense Low Value Content 관점에서 **가장 취약한 공개 표면**이다.

### 4.2 피부타입 서비스 (`skin.ilina.kr`) — 상대적으로 양호

| 영역 | 상태 | 근거 |
|---|---|---|
| 인터랙티브 설문 | 있음 | 33문항, 클라이언트 계산 (`questions.json`, `calculate.ts`) |
| 결과 설명 | 있음 | `results.json` 16타입, 특성·주의 |
| 관리 가이드 | 있음 | `skin-type-care.ts` 타입당 3포인트 |
| 가이드 허브 | 있음 | `app/guide/page.tsx` + 16 상세 페이지 |
| 서비스 소개 | 있음 | `app/about/page.tsx` (목적·작성원칙·한계·문의) |
| 개인정보 | 있음 | `app/privacy/page.tsx` (AdSense 예고 조항 포함) |
| 제품 추천 | 있음 | 정적 제품 JSON + 타입 매핑 |

시작 화면은 `"use client"`이나 본문 텍스트가 JSX에 있어 SSR HTML에 텍스트가 포함되는 구조다. (완전 CSR 빈 셸은 아님)

### 4.3 페이지별 콘텐츠 부족·중복

| 페이지 | 부족/중복 | 설명 |
|---|---|---|
| `ilina-home` | **심각 부족** | 고유 문단·가이드·서비스 설명 거의 없음 |
| `about` | 짧지만 목적 명확 | 3섹션, 신뢰·한계 안내에는 유효. 브랜드 스토리·제작 과정은 없음 |
| `guide` | 허브로는 적정 | 축 설명 + 16타입 카드. 축별 심화 글은 타입 페이지에 분산 |
| `skin-type/[type]` | 양호 | 타입별 features/care/caution. 템플릿 구조는 유사하나 문구는 타입별 작성 |
| 시작 화면 vs guide | **일부 중복** | 4축 설명이 시작 화면·모달·guide에 반복. 의도된 온보딩이면 허용 범위 |
| privacy | 충분 | 법적/광고 안내용으로 적정. “콘텐츠 가치”와는 별개 |

### 4.4 검색엔진이 읽을 수 있는 HTML 텍스트

| 표면 | 평가 |
|---|---|
| `ilina-home` | 서버 컴포넌트, 텍스트 존재하나 **분량 극소** |
| `/guide`, `/about`, `/skin-type/*` | 서버 컴포넌트 + 정적 데이터, 텍스트 풍부 |
| `/`, start screen | 클라이언트 컴포넌트이나 초기 HTML에 카피 포함 가능 |
| `/result` | 클라이언트 + sessionStorage 의존, **의도적 noindex** |

### 4.5 도메인 간 콘텐츠 불균형 (핵심)

- **풍부한 콘텐츠 도메인:** `skin.ilina.kr`
- **심사에 반복 거절된 도메인(배경):** `ilina.kr`
- 루트는 서브도메인으로의 **출구** 역할만 하고, 자체로는 “읽을 거리·쓸 기능”이 없다.

이 불균형이 Low Value Content와 가장 잘 맞는 **코드상 확인된 구조적 원인**이다.

---

## 5. SEO 및 검색엔진 접근성 분석

### 5.1 robots.txt

```4:12:app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
```

| 항목 | 상태 |
|---|---|
| 전체 allow | ✅ |
| sitemap URL | `https://skin.ilina.kr/sitemap.xml`만 명시 |
| `ilina.kr` 전용 sitemap | ❌ 코드에 없음 |
| `/dev` 차단 | ❌ |

동일 배포라면 `https://ilina.kr/robots.txt`도 같은 응답을 줄 수 있다. 그 경우 루트 도메인 robots가 **서브도메인 sitemap만** 가리키게 된다. 실제 응답은 미검증.

### 5.2 sitemap.xml

`app/sitemap.ts` 포함 URL (모두 `https://skin.ilina.kr` prefix):

- `/`
- `/guide`
- `/about`
- `/privacy`
- `/skin-type/{16 codes}`

**미포함:** `https://ilina.kr/`, `/ilina-home`, 제품 URL, play 별칭, survey/result(의도적)

### 5.3 title / description

| 페이지 | title | description |
|---|---|---|
| Root layout 기본 | `Modified Baumann SKIN TYPE` | 33문항… |
| skin `/` | 동일 | 동일 |
| `ilina-home` | `ILINA` | `ILINA 서비스` ← **부실** |
| guide | `피부 타입 가이드 \| ILINA` | 양호 |
| about | `서비스와 콘텐츠 소개 \| ILINA` | 양호 |
| privacy | `개인정보처리방침 \| ILINA` | 양호 |
| type pages | `{CODE} 피부 타입 특징과 관리법 \| ILINA` | result.summary 기반 |

루트 레이아웃 기본 title이 피부 서비스 중심이라, 브랜드 홈·기타 페이지에서 상속 시 브랜드 일관성이 약해질 수 있다. (`ilina-home`은 자체 title로 덮음)

### 5.4 canonical / metadataBase

- `metadataBase` **미설정** (`app/layout.tsx`)
- 타입 페이지만 relative canonical: `alternates.canonical: /skin-type/...`
- 절대 canonical·도메인별 canonical 분기 없음

상대 canonical은 Next가 `metadataBase` 또는 요청 호스트로 절대화할 수 있으나, **도메인별 의도를 코드로 고정하지 않은 상태**다. 추가 검증 필요.

### 5.5 noindex

| 적용 | 미적용(주의) |
|---|---|
| `/survey`, `/result`, `/play/skin-type/products` | `/dev/**`, `/skin-type/*/products`, `/play/skin-type` |

개발 도구 페이지가 검색에 노출될 여지가 있다. AdSense 직접 사유라기보다 사이트 품질·신뢰 측면에서 정리 권장.

### 5.6 서버 렌더링

- App Router 기본 SSR/SSG 활용
- 타입 페이지: `generateStaticParams`로 정적 생성 가능
- 설문 결과는 클라이언트 세션 의존 → noindex와 정합

### 5.7 내부 링크

- skin 쪽: footer + ContentShell 내비로 guide/about/home 연결
- **루트 홈 ↔ guide/about/타입 상세: 단절**
- 시작 화면 → 가이드 진입 CTA 부재 (푸터만)

### 5.8 모바일

- `viewport`: device-width, initialScale 1 (`app/layout.tsx`)
- UI 전반 max-width 제한 세로 레이아웃 (모바일 우선)
- 실제 기기/Lighthouse 점수는 미측정

---

## 6. 애드센스 관련 위험 요소

> 아래는 **코드에서 확인된 사항**과 **추가 검증이 필요한 사항**을 분리한다. 코드만으로 Google 정책 위반을 단정하지 않는다.

### 6.1 확인된 사항

| 항목 | 상태 | 근거 |
|---|---|---|
| AdSense 스크립트 (`adsbygoogle` 등) | **코드에 없음** | 전역 grep 결과 없음 |
| `ads.txt` | 존재 | `public/ads.txt` → `google.com, pub-5009951959536942, DIRECT, f08c47fec0942fa0` |
| 개인정보처리방침 | skin에 존재, AdSense·쿠키 조항 포함 | `app/privacy/page.tsx` §5 |
| 문의 채널 | 이메일 | `siteConfig.privacyContactEmail` / ilina-home mailto |
| 서비스 소개 | skin `/about` | 루트에는 없음 |
| 운영 주체 설명 | 최소 (브랜드명·이메일) | 상호·주소·대표자 등 없음 (필수 여부는 관할·상품에 따라 다름) |
| 루트 콘텐츠 가치 | 매우 낮음 | `ilina-home` 구성 |

### 6.2 추가 검증 필요

| 항목 | 이유 |
|---|---|
| AdSense 신청 도메인이 `ilina.kr`인지, 서브도메인 포함인지 | 심사 범위 결정 |
| 라이브 `https://ilina.kr/ads.txt` 응답 | 배포·캐시·다중 도메인 서빙 |
| 광고 단위 실제 삽입 위치·밀도 | 현재 코드상 미삽입이나 콘솔/GTM으로 넣을 수 있음 |
| 맞춤형 광고·동의(CMP) 필요 지역 | 트래픽 지역에 따라 상이 |
| Search Console 색인·수동조치 | 본 분석 범위 밖 |
| 제품 추천의 제휴/광고성 표시 | 올리브영 외부 링크 존재 (`project-analysis.md`). 표시 충분성 별도 검토 |

### 6.3 잠재 리스크 (추정, 단정 아님)

1. **루트 도메인 thin content** — Low Value Content와 직접 정합
2. **도메인 간 콘텐츠 분리** — 심사가 루트만 보면 서브도메인 가치가 반영되지 않을 수 있음
3. **신뢰 신호 부족** — 브랜드 소개·제작 배경·연락이 루트에 빈약
4. **ads.txt는 있으나 사이트 콘텐츠 부족** — ads.txt만으로 승인되지 않음
5. **privacy가 “향후 AdSense” 표현** — 광고 미게재 상태와 모순은 아니나, 승인 후 실제 게재·고지 일치 필요
6. **`/dev` 공개** — 품질·전문성 인상 저하 가능

---

## 7. 개선 우선순위

Google 확정 원인 불가. 아래는 **영향도 × 코드로 확인된 심각도** 기준 우선순위다.

### 원인별 분석

#### 7.1 루트 도메인의 독립적인 콘텐츠 부족

| 항목 | 내용 |
|---|---|
| 현재 상태 | `ilina.kr` 홈이 링크 카드 1장 수준 |
| 근거 | `app/ilina-home/page.tsx`, rewrite `next.config.ts` |
| 문제 가능성 | **매우 높음** (Low Value Content와 가장 정합) |
| 개선 방안 | 루트에 브랜드·공개 서비스·가이드 요약·신뢰 정보를 담은 실질 홈 구축. 피부 서비스 기능은 서브도메인 유지 |
| 우선순위 | **P0** |

#### 7.2 단순 서비스 링크 모음 형태

| 항목 | 내용 |
|---|---|
| 현재 상태 | 홈 CTA가 외부 URL 이동뿐. 내부 정보 페이지 링크 없음 |
| 근거 | `ilina-home`의 `<a href="https://skin.ilina.kr">`, footer 숨김 |
| 문제 가능성 | **높음** |
| 개선 방안 | 홈에 서비스 설명 섹션 + 같은 도메인(또는 명확한 정보 페이지)으로의 내부 링크. “포털형 링크만 있는 사이트” 인상 제거 |
| 우선순위 | **P0** |

#### 7.3 사용자에게 제공하는 고유 가치 부족

| 항목 | 내용 |
|---|---|
| 현재 상태 | 고유 가치(설문·16타입 가이드)는 skin에 있음. 루트에는 전달되지 않음 |
| 근거 | skin의 guide/about/type vs ilina-home 분량 대비 |
| 문제 가능성 | **높음** (루트 심사 시) / skin만 보면 중간~양호 |
| 개선 방안 | 루트에 독창적 요약·제작 이야기·가이드 발췌를 두고, 상세·검사는 skin으로 연결. 복붙 미러링은 피할 것 |
| 우선순위 | **P0** |

#### 7.4 검색엔진 접근 및 색인 문제

| 항목 | 내용 |
|---|---|
| 현재 상태 | sitemap/robots가 skin 중심. 루트 URL 미포함. metadataBase/절대 canonical 부재 |
| 근거 | `app/sitemap.ts`, `app/robots.ts`, `config/site.ts` |
| 문제 가능성 | **중간** (콘텐츠 부족이 1차, SEO는 가중 요인) |
| 개선 방안 | `ilina.kr`용 sitemap·메타·내부링크 설계. 루트 공개 URL 확정 후 Search Console 등록·색인 요청(운영 작업) |
| 우선순위 | **P1** |

#### 7.5 운영 주체와 서비스 신뢰성 정보 부족

| 항목 | 내용 |
|---|---|
| 현재 상태 | 이메일·privacy·about( soft)만 존재. 루트에 About 없음 |
| 근거 | `ilina-home`, `about/page.tsx`, `privacy/page.tsx` |
| 문제 가능성 | **중간** |
| 개선 방안 | ILINA 소개(무엇을 만드는지), 문의, privacy를 루트에서도 도달 가능하게. 과도한 사업자 정보 요구를 단정하지 말 것 |
| 우선순위 | **P1** |

#### 7.6 콘텐츠 중복 또는 품질 문제

| 항목 | 내용 |
|---|---|
| 현재 상태 | 4축 설명 일부 반복. 타입 페이지는 템플릿 유사·문구 차별화됨. 루트↔skin 미러는 아직 없음 |
| 근거 | start screen / guide / type data |
| 문제 가능성 | **낮음~중간** (현재보다 향후 복제 확장이 위험) |
| 개선 방안 | 루트 콘텐츠는 “요약·맥락·브랜드”에 집중하고 타입 전문은 skin canonical 유지. 의학적 단정 표현 금지(기존 about 원칙 유지) |
| 우선순위 | **P2** |

#### 7.7 모바일 사용자 경험 문제

| 항목 | 내용 |
|---|---|
| 현재 상태 | 모바일 우선 레이아웃·viewport 설정 존재 |
| 근거 | `layout.tsx` viewport, UI max-width 패턴 |
| 문제 가능성 | **낮음** (코드상). 실측 필요 |
| 개선 방안 | 루트 홈 확장 시 기존 emerald/모바일 톤 유지, 과도한 카드 밀도·광고 과밀 지양 |
| 우선순위 | **P3** |

---

## 8. 권장 홈페이지 구조 및 사이트맵

### 8.1 설계 원칙

- 기존 ILINA 비주얼(에메랄드/민트, 모바일 폭) 유지
- 공개 서비스는 **피부타입만** 소개 (미공개 서비스 비노출)
- 홈을 “링크 모음”이 아니라 “읽을 수 있는 정보 + 서비스 진입”으로 확장
- 피부 설문·결과·제품 UI는 `skin.ilina.kr`에 유지 (동작 변경 최소화)
- 콘텐츠는 수량보다 독창성·정확성·실용성

### 8.2 페이지 필요성 검토

| 후보 | 필요성 | 권장 | 이유 |
|---|---|---|---|
| 메인 홈페이지 (`ilina.kr/`) | 필수 | **강화** | 현재 thin content의 핵심 |
| 공개 서비스 소개 | 필수 | 홈 섹션 또는 `/services` | 피부타입 1개면 홈 섹션으로 충분할 수 있음 |
| 피부타입 서비스 상세 안내 | 권장 | `/services/skin-type` 또는 skin `/about` 활용 | 루트에 요약 + skin 상세 링크가 이상적 |
| 피부 관리·유형 가이드 | 권장 | 루트에 큐레이션 + skin `/guide`·타입 페이지 | 이미 skin에 자산 있음. 루트 전체 복제 비권장 |
| 서비스 제작 이야기 | 선택 | `/story` 또는 홈 하단 1편 | 독창성·운영 신뢰에 도움. 1~2편이면 충분 |
| ILINA 소개 | 권장 | `/about` (루트) | 브랜드 정체성. skin `/about`과 역할 분리(브랜드 vs 서비스) |
| 개인정보처리방침 | 필수 | 루트에서도 접근 | 현재는 skin URL만 링크. 루트 path 제공 또는 동일 문서 명확화 |
| 문의 안내 | 권장 | 홈 푸터 + 짧은 `/contact` 또는 mailto 유지 | 별도 페이지는 내용이 이메일이면 과도할 수 있음 |

**추가하지 않을 것:** 미공개 서비스 목록, 의학적 진단·치료 콘텐츠, 키워드 나열형 자동 생성 페이지, skin 타입 16개의 무차별 미러.

### 8.3 권장 정보 구조 (목표 사이트맵)

```text
https://ilina.kr/
  ├─ /                      브랜드 홈 (소개 + 공개 서비스 + 가이드 요약 + CTA)
  ├─ /about                 ILINA 브랜드·운영 방향
  ├─ /services/skin-type    피부타입 서비스 상세 (목적·방법·한계·시작 CTA)
  ├─ /guides                가이드 허브 (요약 카드 → skin 상세로)
  ├─ /story                 (선택) 제작 이야기 1편+
  ├─ /privacy               개인정보처리방침 (루트 도달 가능)
  ├─ /contact               (선택) 문의 — mailto로 대체 가능
  ├─ /robots.txt
  ├─ /sitemap.xml           ← ilina.kr URL 포함
  └─ /ads.txt

https://skin.ilina.kr/       (기능 서비스 — 현행 유지)
  ├─ /  /survey  /result
  ├─ /guide  /skin-type/*
  ├─ /about  /privacy
  └─ …
```

구현 시 Host별 라우팅·콘텐츠 분리는 **최소 변경**으로 설계한다. (예: 루트 전용 페이지를 `app/(ilina)/…`로 두고 rewrite/레이아웃만 확장하는 방식 등 — 구체 구현은 후속 단계)

### 8.4 권장 홈 첫 화면 구성 (콘텐츠 와이어)

1. **브랜드:** ILINA
2. **한 줄 정체성:** 작지만 유용한 웹서비스를 직접 만들고 운영합니다
3. **공개 서비스 소개 블록:** 피부타입 — 무엇을 알려주는지 / 33문항 / 의학적 진단 아님
4. **CTA:** 검사 시작 (`skin.ilina.kr`) + 가이드 보기
5. **짧은 유용 정보:** 4축 요약 또는 “결과 활용법” 3~5문단 (복붙이 아닌 홈용 서술)
6. **신뢰:** 소개·문의·개인정보 링크

---

## 9. 신규 콘텐츠 제안

의학적 근거가 불명확한 치료·효과 주장은 제안하지 않는다. 기존 서비스 원칙(참고용·진단 대체 불가)을 따른다.

### 9.1 루트 홈에 바로 쓸 콘텐츠 (우선)

| 블록 | 제안 요지 | 독창성 포인트 |
|---|---|---|
| ILINA란 | 직접 기획·제작·운영하는 소규모 웹서비스 브랜드 | 운영 주체·태도 |
| 피부타입 서비스 | Baumann 체계 기반 변형 설문, 4축·16타입, 서버 비저장 | 이미 구현된 동작만 서술 |
| 이런 분께 | 유분/민감/색소/탄력 경향을 정리하고 싶은 사용자 | 대상 명확화 |
| 결과 활용법 | 세안·보습·자외선 우선, 한 번에 제품 많이 바꾸지 않기 | about/guide와 톤 맞추되 문장 재작성 |
| 한계 | 온라인 설문 ≠ 진료 | 신뢰 |

### 9.2 가이드 큐레이션 (루트 `/guides` 또는 홈 섹션)

skin에 이미 있는 자산을 **요약 카드로만** 노출하고 상세는 `skin.ilina.kr/guide`, `/skin-type/{code}`로 연결.

예시 카드(제목만, 본문은 후속 작성):

- 건성·지성, 무엇을 관찰하면 될까
- 민감 반응이 있을 때 루틴을 단순화하는 이유
- 색소 흔적과 자외선 차단
- 16가지 타입 코드 읽는 법

### 9.3 제작 이야기 (선택, 1편으로 시작)

- 왜 피부타입 서비스를 만들었는지
- 로그인·서버 저장 없이 설계한 이유 (privacy와 정합)
- 문항·임계값·타입 문구를 직접 관리한다는 점

코드에 없는 기능을 “있다”고 쓰지 말 것.

### 9.4 작성·품질 기준

- 타입별 문구는 기존처럼 특성 조합을 반영 (기계적 치환 금지)
- 치료·완치·의료 효과 보장 금지
- skin 페이지 全文 복사로 루트 페이지 수를 늘리지 말 것
- 공개 서비스가 늘어갈 때 홈의 “공개 서비스” 섹션만 확장 가능한 구조 유지

---

## 10. 단계별 구현 계획

> 본 단계는 **계획**이다. 이번 작업에서는 구현하지 않는다.  
> 제약: 기존 설문/API/DB/인증/배포 설정 불변, 불필요 패키지 금지, 디자인 전면 교체 금지, 미공개 서비스 비노출.

### Phase 0 — 운영 확인 (코드 변경 최소/없음)

1. 라이브에서 `ilina.kr/`가 `/ilina-home` 콘텐츠인지 확인
2. `ilina.kr/ads.txt`, `robots.txt` 응답 확인
3. AdSense 신청 도메인·서브도메인 범위 확인
4. Search Console에 `ilina.kr` 속성·색인 현황 확인 (가능 시)

### Phase 1 — 루트 콘텐츠 P0 (재심사의 핵심)

1. `ilina-home`(또는 후속 루트 홈)에 브랜드·서비스·활용법·신뢰 섹션 추가
2. 루트에서 `/about`, `/privacy`(또는 동등), 가이드 진입 링크 제공
3. 메타 title/description을 브랜드·가치 중심으로 교체
4. 피부 검사 CTA는 `skin.ilina.kr` 유지

### Phase 2 — 정보 구조·SEO P1

1. `ilina.kr` URL을 담는 sitemap/robots 전략 수립 (Host별 분기 또는 분리)
2. `metadataBase`·canonical 정책 정리 (루트 vs skin)
3. `/dev` noindex 또는 비공개
4. skin 시작 화면에서 가이드·소개 발견성 개선 (기능 변경 없는 링크 추가 수준)

### Phase 3 — 독창 콘텐츠 P1~P2

1. 제작 이야기 1편
2. 가이드 큐레이션 페이지 (요약만)
3. 서비스 상세 안내 페이지 (필요 시)

### Phase 4 — 재심사 준비

1. 루트에서 스크롤·읽기 가능한 고유 텍스트가 충분한지 검수
2. 모바일에서 홈→가이드→검사 동선 확인
3. privacy·문의·ads.txt 일치
4. 광고 코드는 **콘텐츠 충분성 확보 후** 삽입 권장 (현재 코드에 스크립트 없음)

---

## 11. 재심사 전 검증 체크리스트

### 콘텐츠·UX

- [ ] `ilina.kr` 홈만 보고도 ILINA가 무엇을 하는지 이해되는가
- [ ] 홈에 외부 링크 외의 **본문 정보**(여러 문단)가 있는가
- [ ] 공개 서비스(피부타입) 설명·한계·시작 방법이 명시되는가
- [ ] 가이드 또는 동등한 유용 정보로 이동 가능한가
- [ ] 미공개 서비스가 노출되지 않는가
- [ ] 의학적 과잉 주장 없는가
- [ ] skin 설문·결과·제품 기능이 회귀 없이 동작하는가

### 신뢰·정책

- [ ] 개인정보처리방침이 루트에서 도달 가능한가
- [ ] 문의 이메일이 유효한가
- [ ] AdSense 관련 privacy 조항이 실제 광고 상태와 맞는가
- [ ] `ads.txt`가 신청 계정 pub-ID와 일치하는가

### SEO·크롤링

- [ ] `ilina.kr`의 title/description이 구체적인가
- [ ] 루트 주요 URL이 sitemap에 있는가 (전략 확정 후)
- [ ] robots가 필요한 페이지만 허용/차단하는가
- [ ] `/dev`가 색인되지 않는가
- [ ] canonical이 도메인 의도와 맞는가

### 라이브 검증 (본 문서 작성 시 미실시)

- [ ] 실제 HTML에 본문 텍스트가 렌더되는가 (View-Source)
- [ ] Search Console 커버리지
- [ ] 모바일 실기기 확인
- [ ] AdSense 정책 센터·이전 거절 사유 문구 재확인

---

## 부록 A. 주요 파일 인덱스

| 주제 | 경로 |
|---|---|
| Host rewrite | `next.config.ts` |
| 사이트 URL·문의 | `config/site.ts` |
| 루트 홈 | `app/ilina-home/page.tsx` |
| skin 홈 | `app/page.tsx`, `features/skin-type/components/skin-type-start-screen.tsx` |
| 가이드 | `app/guide/page.tsx` |
| 소개 | `app/about/page.tsx` |
| 개인정보·AdSense 조항 | `app/privacy/page.tsx` |
| 타입 상세 | `app/skin-type/[type]/page.tsx` |
| 타입/케어 데이터 | `features/skin-type/data/skin-type-info.ts`, `skin-type-care.ts`, `results.json` |
| robots / sitemap | `app/robots.ts`, `app/sitemap.ts` |
| ads.txt | `public/ads.txt` |
| 푸터·내비 | `app/components/site-footer.tsx`, `content-shell.tsx` |
| 기존 분석 | `docs/project-analysis.md` |

## 부록 B. 분석 방법

1. 저장소 디렉터리·App Router 페이지 목록 조사
2. rewrite, siteConfig, robots, sitemap, metadata, ads.txt, privacy 열람
3. AdSense/스크립트/noindex/canonical 전역 검색
4. 운영 사이트 HTTP·Search Console은 미검증 → 해당 항목은 추정/체크리스트로 분리
