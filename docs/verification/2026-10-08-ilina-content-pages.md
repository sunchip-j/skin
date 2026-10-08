# ILINA Phase 3 — 콘텐츠 페이지 구현 및 검증 보고서

- 작성일: 2026-10-08
- 작성 목적: Phase 2에서 기획·보완된 오리지널 콘텐츠 3종을 `ilina.kr` 루트 도메인에 실제 웹페이지로 구현하고, 라우팅·SEO·기존 서브도메인 격리 상태를 로컬에서 종합 검증함.
- 검증 환경: Next.js 16.2.6 production build, 로컬 production server(`next start -H 127.0.0.1`), Host 헤더별 HTTP 요청 자동화 테스트 (Python urllib).
- 원칙 준수: Git commit, push, Vercel 운영 배포는 수행하지 않음. `skin.ilina.kr`의 디자인과 기능은 100% 동일하게 보존함.

---

## 1. 구현 페이지 및 URL

| 번호 | 콘텐츠 제목 | 구현 파일 경로 | 공개 URL |
|---|---|---|---|
| **1** | 피부타입을 결정하는 4가지 기준: 건성·지성 너머의 입체적 분류 | `app/ilina-home/guides/four-dimensions/page.tsx` | `https://ilina.kr/guides/four-dimensions` |
| **2** | 피부타입 결과를 일상의 스킨케어 기준으로 활용하는 5가지 원칙 | `app/ilina-home/guides/how-to-use-results/page.tsx` | `https://ilina.kr/guides/how-to-use-results` |
| **3** | ILINA가 로그인 없는 33문항 피부타입 서비스를 만든 이유 | `app/ilina-home/story/why-we-built-skin-type/page.tsx` | `https://ilina.kr/story/why-we-built-skin-type` |

---

## 2. 변경 파일 목록

| 파일 | 변경 구분 | 내용 요약 |
|---|---|---|
| `app/ilina-home/guides/four-dimensions/page.tsx` | 신규 생성 | 4개 생리적 축(D/O, S/R, P/N, W/T)과 일상 자가 관찰법, 16유형 결합 원리 및 OSPW 딜레마 사례, 관찰 시 유의사항을 담은 독립 가이드 페이지 |
| `app/ilina-home/guides/how-to-use-results/page.tsx` | 신규 생성 | 결과 코드를 '관리의 나침반'으로 삼는 5대 원칙, 피부 유형 vs 상태 대비표(모바일 대응 가로스크롤 래퍼), 관리 우선순위 공식, 화장품 1종 교체 수칙, 의료 진료 신호 안내 페이지 |
| `app/ilina-home/story/why-we-built-skin-type/page.tsx` | 신규 생성 | 33문항 재구성 맥락, 바우만 체계 대비 ILINA 자체 설계 영역, 무서버·무로그인 브라우저 메모리 계산 아키텍처, 서비스 운영 철학을 담은 메이킹 스토리 페이지 |
| `app/ilina-home/page.tsx` | 수정 | 홈페이지에 신규 3개 글을 소개하는 "가이드 & 제작 이야기" 섹션 추가 (제목, 핵심 요약, 읽어보기 링크) |
| `app/ilina-home/sitemap.ts` | 수정 | 루트 도메인 사이트맵에 신규 3개 URL 추가 (`/guides/four-dimensions`, `/guides/how-to-use-results`, `/story/why-we-built-skin-type`) |
| `next.config.ts` | 수정 | `rewrites().beforeFiles`에 호스트가 `ilina.kr`일 때 신규 3개 경로를 `/ilina-home/**`으로 매핑하는 규칙 추가 |
| `docs/verification/2026-10-08-ilina-content-pages.md` | 신규 생성 | 본 검증 보고서 |

---

## 3. 주요 콘텐츠 및 디자인 구현 특징

1. **Phase 2 보완 본문의 완전한 반영**:
   - `docs/content/ilina-content-plan.md`의 보완된 본문 초안을 요약하거나 누락하지 않고 온전히 반영함.
   - 의학적 진단으로 오인될 수 있는 단정적 표현을 배제하고, 일상 스킨케어를 위한 참고용 경향 분석임을 명시함.
   - 자가 설문의 한계와 피부과 전문의 대면 진료가 필요한 응급/위험 신호(열감, 홍조, 진물, 급성 결절, 점의 변화 등)를 강조함.
2. **반응형 디자인 및 가독성 최적화**:
   - 기존 ILINA 브랜드 톤(에메랄드/민트 포인트, 슬레이트 텍스트, 카드형 레이아웃)을 완벽히 계승함.
   - `guides/how-to-use-results`의 '피부 유형 vs 상태' 비교표는 `overflow-x-auto` 래퍼와 `min-w-[500px]` 스타일을 적용하여 390px 모바일 화면에서도 레이아웃 깨짐이나 가로 넘침 없이 부드럽게 스크롤되도록 구현함.
   - 각 글 하단에 '관련 글' 내비게이션 카드 및 피부타입 서비스(`https://skin.ilina.kr/survey`)로 바로 이동할 수 있는 절제된 CTA를 배치함.
3. **홈페이지 연계**:
   - `ilina.kr` 메인 홈(`app/ilina-home/page.tsx`)에 "피부를 더 깊이 이해하는 글" 섹션을 신설하여, 3개 콘텐츠의 가치와 요약을 한눈에 파악하고 진입할 수 있도록 연결함.

---

## 4. SEO 및 라우팅 처리

1. **메타데이터 및 Canonical**:
   - 각 페이지에 고유한 `title`, `description`, `openGraph` 메타데이터 부여.
   - 각 페이지에 `alternates: { canonical: "https://ilina.kr/..." }` 절대 경로 명시.
2. **도메인 격리 및 라우팅 분리**:
   - `next.config.ts`의 `rewrites`에서 `has: [{ type: "host", value: "ilina.kr" }]` 조건으로만 신규 페이지를 rewrite하므로, `skin.ilina.kr`에서는 해당 rewrite가 발동하지 않음.
   - `skin.ilina.kr/guides/...` 및 `skin.ilina.kr/story/...` 요청 시 `app/` 루트에 해당 디렉토리가 없어 **404 Not Found**로 정확히 처리됨 (서브도메인에 노출 방지 및 중복 페이지 원천 차단).
   - 기존 `skin.ilina.kr/guide`(피부 가이드) 및 `ilina.kr/guide`(skin으로 308 이동)는 정규식 분기에 의해 아무런 간섭 없이 기존 동작 유지.
3. **Sitemap 및 Search Engine**:
   - `https://ilina.kr/sitemap.xml`에 신규 3개 URL 정상 등록 확인.
   - `skin.ilina.kr`의 사이트맵과 robots 정책은 변경 없이 격리 유지.
   - 모든 신규 페이지는 Next.js 정적 렌더링(Static Generation, ○)으로 빌드되어 검색엔진 크롤러가 완성된 HTML 텍스트를 즉시 수집 가능.

---

## 5. 테스트 및 검증 결과

### 5.1 빌드 및 정적 검사
- **ESLint**: 통과 (`npm run lint` 오류 0건)
- **TypeScript & Production Build**: 통과 (`npm run build` 성공)
  - 신규 3개 페이지 정적 생성 완료 (`○ /ilina-home/guides/four-dimensions`, `○ /ilina-home/guides/how-to-use-results`, `○ /ilina-home/story/why-we-built-skin-type`)
  - 총 40개 라우트 빌드 성공.

### 5.2 자동화 HTTP 및 라우팅 검증 (24개 항목 전체 통과)
로컬 production 서버(`127.0.0.1`)를 대상으로 `Host` 헤더 분기 테스트 스크립트 실행:

| 검증 항목 | 기대 결과 | 실제 결과 | 판정 |
|---|---|---|---|
| `GET ilina.kr /` | HTTP 200, 신규 3개 글 링크 포함 | 200 OK, 링크 3개 확인 | **PASS** |
| `GET ilina.kr /guides/four-dimensions` | HTTP 200, title, description, canonical, H1, OSPW 예시 | 200 OK, HTML 36.3KB | **PASS** |
| `GET ilina.kr /guides/how-to-use-results` | HTTP 200, title, description, canonical, H1, 비교표 | 200 OK, HTML 35.0KB, table 포함 | **PASS** |
| `GET ilina.kr /story/why-we-built-skin-type` | HTTP 200, title, description, canonical, H1, 33문항 설명 | 200 OK, HTML 32.6KB | **PASS** |
| `GET ilina.kr /sitemap.xml` | 신규 3개 URL 포함 | 5개 전체 경로 정상 포함 | **PASS** |
| `GET skin.ilina.kr /guides/four-dimensions` | HTTP 404 Not Found (격리) | 404 Not Found | **PASS** |
| `GET skin.ilina.kr /guides/how-to-use-results` | HTTP 404 Not Found (격리) | 404 Not Found | **PASS** |
| `GET skin.ilina.kr /story/why-we-built-skin-type` | HTTP 404 Not Found (격리) | 404 Not Found | **PASS** |
| `GET skin.ilina.kr /` | 기존 피부타입 시작 화면 (Baumann) | 200 OK, 기존 화면 유지 | **PASS** |
| `GET skin.ilina.kr /guide` | 기존 16타입 가이드 화면 | 200 OK, 기존 화면 유지 | **PASS** |
| `GET skin.ilina.kr /survey` | 기존 설문 화면 | 200 OK, 기존 화면 유지 | **PASS** |
| `GET ilina.kr /guide` | `https://skin.ilina.kr/guide`로 308 redirect | 308 Permanent Redirect | **PASS** |
| `GET ilina.kr /survey` | `https://skin.ilina.kr/survey`로 308 redirect | 308 Permanent Redirect | **PASS** |
| `GET ilina.kr /ilina-home/guides/...` | `https://ilina.kr/guides/...`로 308 redirect | 308 Permanent Redirect | **PASS** |

---

## 6. 기존 피부타입 서비스(`skin.ilina.kr`) 영향 평가

- **시각적·기능적 영향**: **전무 (0%)**
  - 설문 문항 데이터(`questions.json`), 결과 데이터(`results.json`), 제품 추천 로직(`product-recommendation.ts`), 세션 스토리지 처리(`result-session.ts`) 등 기존 기능 코드 수정 없음.
  - 서브도메인의 UI 컴포넌트나 공통 CSS 토큰 수정 없음.
  - 기존 주소 체계(`/guide`, `/survey`, `/result`, `/skin-type/[type]`) 정상 보존.

---

## 7. 운영 배포 후 추가 확인 사항

1. **Vercel 프로덕션 배포 후 Host 헤더 동작 확인**:
   - 실제 운영 도메인 `https://ilina.kr/guides/four-dimensions` 등 3개 페이지의 HTTP 200 및 HTML 본문 렌더링 확인.
   - `https://skin.ilina.kr/guides/four-dimensions` 접근 시 404 응답 확인.
2. **Search Console 사이트맵 제출**:
   - `https://ilina.kr/sitemap.xml`을 Google Search Console에 재제출하여 신규 가이드 및 스토리 페이지 3건의 색인 요청 진행.
3. **Google AdSense 재심사 신청**:
   - 루트 도메인에 고유한 텍스트 콘텐츠(가이드 2편, 브랜드 및 제작 스토리 1편, 확장된 홈 소개)가 충분히 색인된 후 AdSense 사이트 검토 요청 진행.
