# ILINA 공식 홈페이지 개선 — Phase 1 검증

- 작성일: 2026-10-08
- 기준 문서: `docs/audit/adsense-content-audit.md`를 먼저 읽고 실제 소스와 비교함.
- 범위: 루트 홈페이지 콘텐츠·브랜드 소개·운영 정보 및 요청에 명시된 도메인/SEO 정리.
- 검증 환경: Next.js 16.2.6 production build, 로컬 `next start`(127.0.0.1:3108), Host 헤더별 HTTP 요청, Chrome headless.
- 운영 사이트 배포는 수행하지 않음. 이 작업은 애드센스 승인 여부를 보장하지 않음.

## 변경 파일 및 내용

| 파일 | 변경 내용 |
|---|---|
| `app/ilina-home/page.tsx` | 링크 카드 중심 홈을 브랜드 소개, 공개 피부타입 서비스 설명, 33문항의 목적, 네 가지 특성과 16유형, 결과 활용 안내, 참고 정보의 한계, 검사/가이드 CTA로 개선 |
| `app/ilina-home/layout.tsx` | 루트 전용 메타데이터, 브랜드 내비게이션, 소개·개인정보·문의 푸터 추가. 기존 홈의 skin 푸터 숨김 처리를 브랜드 페이지 전체에 적용 |
| `app/ilina-home/about/page.tsx` | ILINA의 기획·제작·운영 방향 및 문의 안내. skin 서비스 소개와 목적을 구분하고 상세 서비스 소개로 연결 |
| `app/ilina-home/privacy/page.tsx` | 루트의 정보 페이지 운영 현황에 맞는 별도 방침. 입력 폼/설문 없음, 광고·방문 분석 스크립트 없음, 브라우저 저장 없음, 접속 기록 가능성, 이메일 문의, skin 서비스 별도 방침 안내 |
| `app/ilina-home/robots.txt/route.ts` | 루트 robots를 정적 응답으로 제공하고 루트 sitemap 지정. Next.js의 robots 메타데이터 파일은 app 최상위 규약이므로 하위 경로에는 명시적 Route Handler 사용 |
| `app/ilina-home/sitemap.ts` | 루트의 `/`, `/about`, `/privacy`만 포함하는 사이트맵 추가 |
| `next.config.ts` | 기존 Host 조건 rewrite 방식을 유지하면서 루트 소개·개인정보·robots·sitemap으로 확대 |
| `proxy.ts` | Next.js 16 Proxy로 직접 `/ilina-home/**` 접근을 루트 공개 주소로 308 이동. `www.ilina.kr` 정규화 및 루트의 skin 기능/콘텐츠 경로를 skin 도메인으로 이동 |
| `config/site.ts` | 기존 skin URL과 구분되는 `brandUrl` 추가. 문의 이메일은 기존 설정값/기본값 사용 |
| `app/layout.tsx` | skin 도메인을 기본 metadataBase로 설정. 브랜드 하위 레이아웃에서 루트 도메인으로 재정의 |
| `app/page.tsx`, `app/guide/page.tsx`, `app/about/page.tsx`, `app/privacy/page.tsx` | skin 주요 공개 페이지의 절대 canonical 추가 |
| `app/dev/layout.tsx` | `/dev` 및 하위 페이지에 `noindex, nofollow` 적용 |
| `app/robots.ts` | skin robots에 개발/브랜드 내부 경로 제외 추가. 기존 skin sitemap URL 유지 |
| `docs/verification/2026-10-08-ilina-home-checks.json` | 최종 HTTP/브라우저 검증 결과 |
| `docs/verification/2026-10-08-ilina-home-mobile-*.png` | 홈페이지·소개·개인정보 페이지의 390px 캡처 |
| 이 문서 | 변경 내용, 검증 결과, 미검증 및 후속 항목 기록 |

기존 `docs/audit/`는 작업 시작 전부터 존재한 미추적 문서이며 수정하지 않았다. 새 라이브러리는 추가하지 않았다.

## 콘텐츠와 디자인

- 현재 공개한 서비스는 피부타입만 표시한다. 미공개 프로젝트나 내부 기술정보를 공개 페이지에 넣지 않았다.
- 네 가지 피부 특성을 질문으로 돌아보는 기준으로 설명하고, 유형을 등급이나 의료적 진단으로 제시하지 않는다.
- 구현된 결과의 유형·축별 점수·특징·관리 참고 사항·제품 목록을 안내하되 개별 제품의 적합성이나 효과를 보장하지 않는다.
- 결과와 실제 경험의 비교, 우선 관심사 정리, 제품 변경 후 반응 기록을 홈페이지용 문장으로 작성했다. skin 가이드 본문을 복사하지 않았다.
- 에메랄드/민트 색상, 제한된 본문 폭, 구분선과 문단 중심의 구성으로 기존 브랜드 톤을 유지했다. 추가 애니메이션이나 장식은 없다.
- 주요 CTA는 검사 시작과 가이드 보기 두 가지다. 시작 링크는 실제 설문 주소 `https://skin.ilina.kr/survey`다.

## Host별 공개 경로

| 요청 | 결과 |
|---|---|
| `ilina.kr/` | 브랜드 홈 (200) |
| `ilina.kr/about`, `/privacy` | 브랜드 전용 페이지 (200) |
| `ilina.kr/robots.txt`, `/sitemap.xml` | 루트 URL을 사용하는 별도 응답 (200) |
| `skin.ilina.kr/`, `/about`, `/privacy` | 기존 skin 페이지 (200) |
| `skin.ilina.kr/robots.txt`, `/sitemap.xml` | 기존 skin 도메인 기준 응답 (200) |
| 루트의 `/guide`, `/survey`, `/result`, `/skin-type/**`, `/play/**`, `/dev/**` | 같은 경로의 `skin.ilina.kr` 주소로 308 이동 |
| 양 도메인 및 localhost의 `/ilina-home`, `/ilina-home/**` | 대응하는 `https://ilina.kr/` 공개 경로로 308 이동 |
| `www.ilina.kr/**` | `ilina.kr`로 308 이동, 경로와 쿼리 유지 |
| `ilina.kr/unknown` | 404 |
| 양 도메인의 `/ads.txt` | 기존 파일 유지 (200) |

Host rewrite는 기존 `next.config.ts`의 상대 destination 방식을 유지한다. Proxy는 리다이렉트만 맡아 내부 rewrite를 다시 외부 요청으로 처리하는 문제를 피한다. `Host: ilina.kr:3108`도 브랜드 홈으로 처리되는 것을 확인했다.

## 기존 서비스 영향

- DB, 인증, 설문 문항·계산·세션 저장, 결과 화면, 추천 데이터 및 제품 기능 코드는 변경하지 않았다.
- skin 서비스의 기존 주소를 유지했다. 기존 루트의 skin 경로 방문자는 skin 도메인으로 이동한다.
- skin의 소개/개인정보 페이지는 canonical 추가 외에 본문과 동작을 유지했다.
- 기존 16유형 페이지의 상대 canonical은 skin metadataBase를 통해 올바른 절대 URL로 생성된다.
- `/dev`는 접근 가능하되 검색 색인을 요청하지 않는다. 접근 제어를 새로 도입한 것은 아니다.
- 브랜드용 푸터 숨김 스타일은 기존 홈 방식을 확장했으며, skin 페이지에서는 기존 푸터를 유지한다.

## 테스트 결과

1. **Production build: 통과** — `npm run build` (webpack), 컴파일·빌드 TypeScript·정적 페이지 생성 완료.
2. **ESLint: 통과** — `npm run lint`.
3. **별도 TypeScript 검사: 조건부 통과** — 기본 `npx tsc --noEmit`은 기존 `.next/dev/types/app/result/page.ts`에 남은 `SkinTypeResultContent` export 검사 오류로 실패했다. 이번 변경 파일과 production 생성 타입을 포함하고 오래된 `.next/dev` 타입만 제외한 임시 설정으로 `tsc --noEmit -p /private/tmp/ilina-phase1-tsconfig.json`을 실행해 통과했다. 기존 결과 페이지를 수정하거나 생성 캐시를 삭제하지 않았다.
4. **HTTP/브라우저 자동 검증: 124개 통과** — 상세 결과는 `2026-10-08-ilina-home-checks.json`.
5. **SEO: 통과** — 루트 sitemap 3개, skin sitemap 20개가 각각 올바른 도메인을 가리킨다. 각 robots의 sitemap 주소, 양 도메인의 홈/소개/개인정보 canonical, skin 16개 유형 canonical, `/dev`와 하위 페이지의 noindex 확인.
6. **모바일/반응형: 통과** — 홈·소개·개인정보를 320/390/768/1440px에서 확인. 가로 스크롤 없음, 페이지당 h1 하나, 루트 skin 푸터 숨김 확인. 390px 전체 캡처 세 장을 직접 열어 본문·여백·CTA·이메일 줄바꿈을 검수했다.
7. **링크: 통과** — 브랜드 홈 → 소개 → 개인정보 내부 이동, 문의 mailto 존재, 검사/가이드 CTA URL 및 대상 경로 정상 응답 확인.
8. **skin 기능: 통과** — 기존 설문에서 33문항을 실제 선택하고 결과 제출 → 결과 표시 → sessionStorage 저장 → 새로고침 후 결과 복원 확인. 타입 상세와 추천 제품 경로 정상 응답 확인.
9. **노출 확인: 통과** — 루트 공개 페이지의 HTML에 미공개 프로젝트명/내부 DB 설정 문자열이 없는지 검사하고 콘텐츠를 검수했다.
10. **브라우저 실행 오류: 없음** — 검증 흐름 중 Runtime exception 없음.
11. **변경 형식: 통과** — `git diff --check`.

## 미검증 항목

- 실제 운영 배포 후의 HTTPS, CDN 캐시, Host 전달 방식 및 DNS/`www` 연결. 로컬 production 서버 검증 결과와 운영 결과는 구분한다.
- Search Console 색인 상태, 크롤러 재방문, 이미 색인된 `/dev`·중복 페이지의 제거 여부.
- 애드센스 계정 설정, 심사 결과, 광고 게재 및 ads.txt 계정 소유 관계. 광고 스크립트는 추가하지 않았다.
- 실제 휴대전화/여러 브라우저의 렌더링, Lighthouse 및 보조공학 사용성 평가.
- 모든 응답 조합의 설문 결과와 모든 제품 외부 링크. 대표 설문 흐름과 기존 경로 보존을 검증했다.
- 문의 메일의 실제 송수신과 운영자의 이메일 삭제 처리, 호스팅 로그의 구체적인 항목·보관 기간. 확인되지 않은 기간이나 제공자 이름을 방침에 임의로 넣지 않았다.

## 후속 콘텐츠 개선 항목

- 실제 운영 환경의 로그 처리와 이메일 문의 보관/삭제 기준을 확인해 개인정보 안내를 구체화한다.
- 공개된 피부타입 서비스의 사용자 질문을 바탕으로 필요한 안내를 보완한다. 필요 시 제작 배경이나 가이드 큐레이션을 별도 콘텐츠로 검토한다.
- 기존 skin 콘텐츠의 의학적 표현과 제품 정보의 출처·갱신 상태는 별도 단계에서 점검한다. 이번 Phase 1에서는 기존 본문·데이터를 대규모로 수정하지 않았다.
- 배포 후 루트/skin robots·sitemap·canonical·리다이렉트를 다시 확인하고 Search Console에서 올바른 공개 URL의 색인 상태를 확인한다.
- 오래된 `.next/dev` 생성 타입 오류는 별도 개발환경 정리 또는 기존 결과 페이지 export 구조 점검 대상으로 남긴다.
