# 루트 도메인의 피부타입 서비스 제공

> 이 문서는 1차 구현 기록이다. 검색 대표 주소를 skin으로 유지하는 아래 정책은 후속 요청으로 변경되었다. 현재 정책과 최종 재심사 준비 점검은 [최종 보완 보고서](2026-10-18-adsense-readiness.md)를 따른다.

검증일: 2026-10-18. 코드 수정 및 로컬 production 검증만 수행. 커밋, push, 배포, DNS 및 호스팅 설정 변경 없음.

## 구현 및 SEO 결정

- `ilina.kr/`는 `app/page.tsx`의 기존 피부타입 시작 화면을 제공한다. 설문, 결과, 유형별 정보, 추천은 기존 app 라우트와 기능 코드를 그대로 사용한다.
- 루트의 `/guide`, `/survey`, `/result`, `/skin-type/**`, `/play/**`에서 skin으로 이동하던 Proxy 308을 제거했다. `/dev/**`의 기존 이동은 유지했다.
- 기존 소개 홈은 루트 Host에만 `/company` → `/ilina-home`으로 rewrite한다. `/about`, `/privacy`, 가이드 2개, 제작 스토리의 기존 공개 경로와 본문은 유지한다. `/ilina-home` 직접 접근은 루트에서 `/company`로 정규화하며 skin 및 다른 Host의 기존 내부 경로 정규화는 유지한다.
- 소개 홈과 기존 글의 검사·가이드 CTA는 같은 출처의 `/survey`, `/guide`를 사용한다. 소개 레이아웃에 `/company` 링크를 추가했다.
- 루트 개인정보처리방침은 브라우저 내 계산, 서버 전송·저장 없음, 결과 코드·4축 점수의 `sessionStorage` 저장, 두 출처 사이 저장소 분리, 결과가 없을 때 같은 출처의 설문으로 이동하는 동작을 설명한다. 2026-10-08 방침 전문은 이전 방침 접기 영역에 보존했다.
- skin의 UI, 데이터, 계산, 저장 코드, canonical, sitemap, robots는 수정하지 않았다. `config/site.ts`의 서비스 URL 및 루트 layout의 metadataBase도 유지했다.
- 루트 홈·피부 가이드·16유형 페이지는 기존 HTML의 skin canonical을 재사용한다. 기존 canonical이 없는 `/play/skin-type` 별칭과 유효한 타입별 공개 제품 페이지에는 **루트 응답에만** `Link: <https://skin.ilina.kr/...>; rel="canonical"`을 추가했다. skin의 HTML이나 응답에는 이를 추가하지 않는다.
- 설문·개인 결과·세션 추천의 기존 noindex를 유지한다. 두 도메인 robots도 그대로 유지하여 canonical을 크롤링할 수 있게 한다.
- 루트 sitemap의 `/` 항목은 `/company`로 바꿨다. 루트 소유의 소개·정책·글 6개만 등재하며, skin canonical의 서비스 중복 URL은 등재하지 않는다. skin sitemap은 변경하지 않았다.

HTTP canonical은 Google Search가 지원한다. 출처: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls#rel-canonical-header

## 수정 파일

| 파일 | 변경 |
| --- | --- |
| `proxy.ts` | 루트 서비스 이동 해제, 소개 홈 정규화, 루트 전용 HTTP canonical |
| `next.config.ts` | 루트 홈 rewrite를 `/company`로 이동 |
| `app/ilina-home/page.tsx` | `/company` canonical·OG, 같은 출처 CTA 및 안내 |
| `app/ilina-home/layout.tsx` | 보존 소개 홈으로 가는 링크 |
| `app/ilina-home/about/page.tsx` | 양쪽 도메인의 서비스 제공 설명 |
| `app/ilina-home/privacy/page.tsx` | 실제 처리 방식 반영, 이전 방침 보존 |
| `app/ilina-home/guides/four-dimensions/page.tsx` | 같은 출처 검사·가이드 CTA |
| `app/ilina-home/guides/how-to-use-results/page.tsx` | 같은 출처 검사 CTA |
| `app/ilina-home/story/why-we-built-skin-type/page.tsx` | 같은 출처 검사 CTA |
| `app/ilina-home/sitemap.ts` | root-owned 콘텐츠만 등재, 소개 홈 URL 갱신 |

## 로컬 검증

Next.js 16.2.6, `npm run build` 후 `npm run start -- --hostname 127.0.0.1 --port 3108` 사용. HTTP 요청은 Host 헤더를 지정했다. 별도 headless Chrome 프로필의 Host resolver로 `ilina.kr:3108`, `skin.ilina.kr:3108`을 로컬 서버에 연결했다. 운영 HTTPS/DNS를 변경하거나 운영 사용자 데이터에 접근하지 않았다.

| 검사 | 결과 |
| --- | --- |
| `npm run lint` | 통과 |
| `npm run build` | TypeScript 및 production 빌드 통과, 기존 정적 생성 유지 |
| 변경 전후 skin·다른 Host 회귀 비교 | 92개 응답 일치. 상태, 이동 주소, canonical, robots, 렌더 콘텐츠 비교. robots/sitemap은 본문 전체 비교 |
| 루트 라우팅·SEO·콘텐츠 | 52개 검사 통과. 홈·가이드·16유형·16개 공개 제품·회사·소개·정책·기존 글·별칭·잘못된 타입·내부 경로·개발 경로·robots/sitemap 포함 |
| `www` 및 쿼리 보존 | `www` → 루트, 내부 경로 정규화, 개발 경로 이동의 쿼리 보존 확인 |
| 두 도메인 실제 검사 | 각각 33문항을 선택하고 결과 제출·저장·새로고침 복원·추천 목록·결과 복귀·재검사 통과. 출처 유지 |
| 결과 없는 직접 접근 | `/result`, `/play/skin-type/products`가 같은 도메인의 `/survey`로 이동 |
| 16유형 브라우저 표시 | 두 도메인 각각 16개의 유효한 대표 점수 세션을 주입하여 결과와 세션 기반 추천 표시, 제품 링크, 출처 유지 확인. 16가지 설문 조합을 모두 입력한 검사는 아님 |
| skin UI 비교 | 시작·설문·결과·추천 화면 텍스트 일치. 시작·결과·추천 PNG 바이트 일치. 설문 PNG는 촬영 시점 차이가 있어 완전 일치를 주장하지 않음 |
| 콘텐츠 보존 | `/company`, `/about`, `/privacy`, 기존 글 3개 200 및 자기 canonical, 이전 방침 접기 확인 |
| sitemap·robots·ads.txt | 루트 sitemap 6개 URL 확인, 각 robots의 자기 도메인 sitemap 유지, 양쪽 ads.txt 동일 |

비교 대상 다른 Host는 로컬 앱에 `memorina.ilina.kr` Host를 전달한 응답이다. 실제 memorina 배포를 테스트하거나 수정한 것은 아니다.

검증 스크립트와 baseline 및 PNG는 `/private/tmp/ilina-root-*`에 생성했다. 네트워크 검증 재실행: `python3 /private/tmp/ilina-root-check.py`, Chrome 세션이 살아 있는 동안 브라우저 재검증: `node /private/tmp/ilina-root-browser.cjs`. 서버 포트 3108, CDP 포트 9338이 필요하며 임시 파일은 장기 보관 자료가 아니다.

## 복원과 남은 확인

- 변경 전 배포로 되돌리는 것이 전체 롤백이다. 이번에는 커밋·배포하지 않았다.
- 향후 허브 복원 시 `next.config.ts`에서 루트 `/` → `/ilina-home` rewrite를 복원하고, Proxy의 루트 서비스 경로 이동 정책을 복원한다. `/company` 공개 여부에 따라 소개 홈 canonical·OG·sitemap도 함께 조정한다. 기능 코드를 복제하거나 검사·결과 코드를 되돌릴 필요는 없다. 개인정보 방침은 복원 후 실제 정보 처리 범위에 맞게 갱신해야 한다.
- 기존 루트의 308이 브라우저·CDN에 캐시되어 있을 수 있다. 배포 시 캐시와 실제 HTTPS/Host 전달, HTTP canonical 헤더 보존을 확인해야 한다.
- canonical은 검색엔진에 보내는 선호 신호다. 루트 중복 서비스의 독립 색인을 목표로 하지 않으며 검색 대표 주소는 skin을 유지한다. 이 정책의 애드센스 심사 효과는 로컬 검증으로 확인할 수 없다.
- 두 도메인의 결과 세션은 공유되지 않는다. 이는 출처별 브라우저 저장소의 기존 동작이다.
