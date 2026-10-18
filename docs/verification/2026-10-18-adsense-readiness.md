# ILINA 애드센스 재심사 준비 최종 보완

작성일: 2026-10-18. 범위: 코드 수정 및 로컬 production 검증. 커밋, push, 배포, DNS·호스팅·다른 서비스 설정 변경 없음. 이전 작업의 미커밋 변경을 보존하여 이어서 작업했다.

현재 상태는 **로컬의 기술·콘텐츠 보완 완료, 운영 반영 및 실제 사이트 확인 전**이다. 애드센스 승인 여부나 색인 완료를 확인한 상태가 아니다. 앞선 기록의 ‘skin 검색 대표 주소 유지’는 이번 사용자 요청에 따라 폐기했다.

## 확인된 문제와 수정

| 문제 | 보완 |
| --- | --- |
| 루트 서비스 canonical이 skin을 가리킴 | 공개 서비스 canonical과 OG URL을 양쪽 Host에서 루트로 통일. `config/seo.ts` 공통 생성 함수와 `serviceCanonicalUrl`로 관리 |
| 루트 sitemap에서 서비스 누락 | 홈, 피부 가이드, 16유형, 기존 16개 공개 제품 URL, 기존 소개·정책·글을 포함한 40개 URL 등재. 개인 세션과 별칭은 제외 |
| skin sitemap의 중복 URL과 루트 대표 정책 충돌 | 별도 내용의 skin 소개·정책 2개만 유지. 이 두 페이지는 기존 자기 canonical 유지 |
| 일부 canonical이 HTTP 헤더에만 있었음 | 기존 루트 전용 HTTP canonical 제거. 양쪽 공유 페이지의 HTML canonical·OG로 일원화 |
| 홈에서 상세 안내 글이 쉽게 발견되지 않음 | 루트 홈과 피부 가이드에만 서버 렌더 탐색 영역 추가. 검사 방식, 4가지 특성, 결과 해석, 추천 기준, 제작 이야기·문의·정책 연결 |
| 16유형 제품 페이지의 직접 탐색 연결 부족 | 루트 가이드에서 기존 16개 제품 URL로 이동하는 비교 목록 제공. 페이지·제품·결과 데이터 복제 없음 |
| 루트 소개가 검사 방식·추천 원리를 충분히 설명하지 않음 | 기존 `/about`에 축별 문항 수, 합산·구간 판정, 게이지 해석, 활성 제품·유형 매핑·카테고리·등록 순서, 선택 단계, 판매처 이동과 한계 설명 |
| 일부 설명이 검증 범위를 넘어섬 | 원본 문진표 문항 수에 관한 근거 없는 정확한 수치 제거. 원본과 다른 ILINA 구성·배점·임계값의 한계 명시. 제작 글의 마케팅 의도에 관한 OG 문구 수정 |
| sessionStorage 삭제를 절대적으로 설명 | 제작 글에서 탭 복원 시 데이터가 돌아올 수 있음을 설명. 개인정보방침의 실제 브라우저 처리 설명 및 이전 방침 보존 유지 |
| 안내 모달의 루트 키보드 접근성 | 루트 홈에서만 이름 연결, 초기 포커스, Tab/Shift+Tab 포커스 유지, Escape 닫기, 포커스 복원 및 배경 스크롤 잠금 적용 |
| 작은 화면의 홈 안내 대비, 글의 main 영역 | 루트 홈의 일부 작은 안내 글과 시작 버튼 색 대비 보완. 기존 글 3개의 최상위 본문을 main으로 명시 |

공개 콘텐츠 URL을 추가로 늘리지 않았다. `/service-entry` 및 `/service-entry/guide`는 기존 검사 화면과 가이드에 루트 전용 탐색 영역을 조합하는 내부 렌더 경로다. 직접 요청은 공개 URL로 이동하고 robots에서는 내부 경로를 제외한다. Host rewrite를 사용하므로 headers()에 의한 전체 동적 렌더링 전환 없이 정적 생성을 유지한다.

## 도메인·기능 정책

| 경로 | ilina.kr | skin.ilina.kr |
| --- | --- | --- |
| `/` | 기존 검사 시작 화면 + 루트 전용 안내 탐색 | 기존 화면 그대로 |
| `/guide` | 기존 가이드 + 안내 및 공개 제품 탐색 | 기존 화면 그대로 |
| `/survey`, `/result`, `/play/skin-type/products` | 같은 출처에서 검사·결과·세션 추천, 기존 noindex | 기존 검사·결과·세션 추천, 기존 noindex |
| `/skin-type/[type]`, `/skin-type/[type]/products` | 기존 데이터·기능 재사용, 루트 canonical·OG | 기존 화면·기능, 루트 canonical·OG |
| `/play/skin-type` | 시작 화면 별칭, 루트 `/` canonical | 기존 시작 화면 별칭, 루트 `/` canonical |
| `/company`, 기존 가이드 2개, 스토리 | 기존 콘텐츠 보존 | 기존과 같이 공개되지 않음 |
| `/about`, `/privacy` | 루트 소개·정책, 자기 canonical | 기존의 별도 내용·자기 canonical 유지 |
| robots | 자기 도메인의 sitemap, 공개 콘텐츠 크롤링 허용, 내부·개발 경로 제외 | 동일 정책, 자기 도메인의 sitemap |

설문 문항, 점수 계산, 결과 데이터, 추천 제품·순서·확장 동작, 결과 저장은 수정하지 않았다. skin에 루트의 안내 영역·모달 개선 옵션·색상 변경이 적용되지 않는다. skin 내 상대 링크는 기존 출처를 유지하여 검사 중 루트로 이동하지 않는다. 루트 링크도 같은 출처에서 검사와 결과를 이어간다.

## 수정 파일

이전 작업에서 이미 수정된 소개 홈·레이아웃·가이드 CTA·정책은 유지했다. 이번 최종 보완에서 추가 또는 수정한 파일은 다음과 같다.

- SEO 설정: `config/site.ts`, `config/seo.ts`(신규).
- 공유 페이지 메타데이터: `app/page.tsx`, `app/guide/page.tsx`, `app/play/skin-type/page.tsx`, `app/skin-type/[type]/page.tsx`, `app/skin-type/[type]/products/page.tsx`.
- 라우팅·루트 전용 탐색: `proxy.ts`, `next.config.ts`, `app/components/service-resources.tsx`(신규), `app/service-entry/page.tsx`(신규), `app/service-entry/guide/page.tsx`(신규).
- 루트 홈의 접근성 옵션: `features/skin-type/components/skin-type-start-screen.tsx`.
- sitemap·robots: `app/sitemap.ts`, `app/robots.ts`, `app/ilina-home/sitemap.ts`, `app/ilina-home/robots.txt/route.ts`.
- 설명·정책·본문 구조: `app/ilina-home/about/page.tsx`, `app/ilina-home/privacy/page.tsx`, `app/ilina-home/story/why-we-built-skin-type/page.tsx`, `app/ilina-home/guides/four-dimensions/page.tsx`, `app/ilina-home/guides/how-to-use-results/page.tsx`.
- 검증: `scripts/verify-service-hosts.py`(신규), `scripts/verify-service-browser.cjs`(신규), 이 문서 및 이전 검증 기록의 후속 정책 안내.

## 로컬 검증 결과

Next.js 16.2.6 production build 및 `next start --hostname 127.0.0.1 --port 3108` 사용. HTTP Host 헤더 및 별도 Chrome의 로컬 Host resolver로 두 도메인을 검증했다. 실제 운영 DNS나 HTTPS를 변경하지 않았다.

| 검사 | 결과 |
| --- | --- |
| lint | 최종 검증 스크립트 포함 통과 |
| production build | TypeScript와 빌드 통과. 42개 정적 생성 단계 완료. 내부 조합 페이지도 정적 생성 |
| Host별 회귀 | 변경 전 100개 응답을 기록. 의도적으로 바꾼 SEO를 제외한 skin·다른 Host의 렌더 본문·상태·이동 일치 |
| canonical·OG | 양쪽 공유 공개 페이지 및 별칭에서 루트 URL 일치. 중복 HTTP canonical 없음 |
| sitemap | 루트 40개, skin 2개. 모든 등재 URL이 200이고 자기 canonical. 중복 정책 충돌 없음 |
| robots·404·이동 | 각 robots의 자기 sitemap, 기존 noindex, 없는 경로·잘못된 유형의 404/noindex, www·내부 경로 정규화 확인 |
| 탐색 크롤링 | sitemap을 출발점으로 삼지 않고 루트 홈의 링크를 따라 42개 공개 경로 도달. 내부 링크와 fragment 대상 정상 |
| 실제 33문항 검사 | 양쪽에서 문항 선택 → 제출 → 결과 → 새로고침 복원 → 제품 추천 → 결과 복귀 → 재검사 통과. 출처 유지 |
| 결과 없는 접근 | 결과·세션 제품 페이지가 같은 도메인의 설문으로 이동 |
| 16유형 | 양쪽에서 16개의 유효한 대표 점수 세션으로 결과·세션 추천·제품 링크 표시 확인. 16가지 답변 조합을 모두 33문항씩 입력한 검사는 아님 |
| skin 시각 회귀 | 시작·설문·결과·제품 추천의 화면 텍스트 및 PNG 바이트가 변경 전과 모두 일치 |
| 모바일·데스크톱 | 320/390/768/1440px × 주요 12경로 = 48개 검사. 가로 넘침 없음, main/h1 각 1개, 접근성 트리상 이름 없는 버튼·링크 없음 |
| 루트 키보드 모달 | 접근 가능한 이름, 초기 포커스, Tab/Shift+Tab 유지, Escape 닫기·포커스 복원 통과 |
| 콘텐츠 보존·ads.txt | 회사·기존 글·정책 및 이전 방침 보존. 양 도메인의 ads.txt 동일 |

본문 회귀에서 메타데이터와 렌더 식별자는 비교하지 않는다. 다른 Host 검증은 이 로컬 앱에 `memorina.ilina.kr` 헤더를 전달한 결과이며 실제 memorina 서비스를 검사하거나 변경한 것이 아니다. 화면 크기·키보드·기본 접근성 트리는 확인했으나 전수 WCAG 적합성이나 실제 iOS/Android 스크린리더 검증을 의미하지 않는다. 기존 공통 화면의 모든 작은 안내 글 대비를 바꾸지는 않았다.

검증 재실행:

```sh
npm run lint
npm run build
npm run start -- --hostname 127.0.0.1 --port 3108
python3 scripts/verify-service-hosts.py
node scripts/verify-service-browser.cjs
```

브라우저 스크립트에는 별도 Chrome의 CDP 포트 9338과 `ilina.kr`, `skin.ilina.kr`을 127.0.0.1로 연결한 테스트용 Host resolver가 필요하다. 기존 브라우저 세션을 사용하거나 운영 사이트에 연결하지 않는다. 이전 상태 비교가 필요하면 구현 변경 전 `python3 scripts/verify-service-hosts.py --record-before /private/tmp/before.json`, 변경 후 `--before /private/tmp/before.json`을 사용한다. 브라우저 baseline은 `--baseline` 및 `ILINA_BROWSER_BASELINE` 환경변수로 지정할 수 있다. 이번 실행의 PNG·기준 자료는 `/private/tmp/ilina-root-*`, `/private/tmp/ilina-review-*`에 있으며 영구 보관 자료는 아니다.

## 애드센스 정책 관점과 준비 상태

공식 정책에서 확인한 항목에 한정하여 점검했다.

- [AdSense 준비 안내](https://support.google.com/adsense/answer/7299563?hl=en-EN)는 방문자에게 관련 있는 고유 콘텐츠와 이용하기 쉬운 탐색을 강조한다. 이번에는 기존 글의 실제 발견 가능성과 서비스 설명의 정합성을 보완했다. 문서 수·글자 수·방문자 수·대기 일수 같은 승인 수치를 임의로 설정하지 않았다.
- [Google 게시자 정책](https://support.google.com/adsense/answer/10502938?hl=ko)의 인벤토리 가치·오해 유발·개인정보 관련 항목을 검토했다. 의료적 진단이나 특정 제품 효과를 보장하는 설명으로 확장하지 않았고, 실제 브라우저 처리와 문의 방식을 명시했다.
- 광고 스크립트나 광고 지면을 새로 넣지 않았다. 현재 코드에는 광고 요청/배치가 없어 실제 광고 배치 적합성이나 동의 처리를 테스트한 상태는 아니다. 향후 설문, 로딩, 오류, 이동 화면 등에 광고를 일괄 삽입하지 말고 게시자 콘텐츠의 맥락과 조작 버튼 근접 여부를 별도 검토해야 한다.
- ads.txt 파일은 존재하지만 게시자 ID의 계정 소유·현재 승인 상태는 로컬 코드만으로 확인할 수 없다. 애드센스 대시보드의 사이트 확인·계정 상태와 운영 크롤러 접근을 확인해야 한다.
- canonical 정책은 [Google Search 공식 지침](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)에 따라 일관되게 구성했다. 검색 대표 URL 선택·색인·AdSense 승인은 서로 별도 판단이며 이번 작업으로 결과를 보장할 수 없다.

**재심사 제출 전 남은 작업:** 승인된 운영 반영 후 실제 HTTPS URL, CDN의 과거 308 캐시, Host rewrite 및 HTML 메타데이터, sitemap/robots/ads.txt, AdSense 대시보드의 사이트 확인 상태를 점검한다. Search Console에서 루트 sitemap과 선택된 canonical을 확인한다. 콘텐츠 권리나 제품 제휴·협찬 여부는 사업 운영 사실에 따라 관리해야 하며 코드만으로 그 사실을 단정하지 않았다. 현 제품 데이터에는 외부 이미지 URL이 없고 판매처 링크는 일반 올리브영 상품 URL이다. 실제 판매 정보·링크 유효성은 이번 로컬 범위에서 전수 확인하지 않았다.

## 허브 복원 방법

전체 롤백은 이전 코드/배포로 복원하는 방식이다. 향후 기능을 유지하면서 허브로 전환하려면 다음 정책을 함께 조정한다.

1. `next.config.ts`의 루트 `/`를 기존 `/ilina-home`으로 다시 연결한다. 루트 `/guide`의 전용 조합 경로도 유지 여부에 맞게 정리한다. `/company`의 보존 또는 홈 정규화 정책을 결정한다.
2. 서비스의 검색 대표를 skin으로 돌릴 경우 `serviceCanonicalUrl`을 skin으로 변경한다. 소개 홈 canonical·OG, 양 도메인의 sitemap, robots와 실제 서비스 제공 경로를 함께 맞춘다. skin sitemap의 기존 서비스 항목도 다시 등재한다.
3. 루트에서 서비스 경로를 계속 제공할지, 기존과 같이 skin으로 이동시킬지 결정하여 `proxy.ts`를 조정한다. 결과 저장은 출처별이므로 검사 중 도메인을 바꾸지 않는다.
4. 개인정보처리방침은 복원 시 실제 루트의 설문·저장 제공 범위를 반영해 갱신하고 이전 방침 이력은 남긴다.
5. 같은 검증 스크립트의 canonical/sitemap 기대 정책을 새 정책에 맞춰 갱신하여 재검증한다. 공유 검사·결과·추천 기능을 복제하거나 교체할 필요는 없다.
