# Skin 프로젝트 분석

작성 기준: 2026-09-27, `main` 브랜치 현재 작업 트리

## 1. 프로젝트 개요

이 프로젝트는 ILINA의 피부 타입 설문 및 제품 추천 서비스다. 로그인, 회원가입, 데이터베이스, 별도 API 없이 정적 데이터와 브라우저 계산만으로 동작한다.

주요 기능은 다음과 같다.

- 33개 문항 피부 타입 설문
- D/O, S/R, P/N, W/T 네 축 점수 계산
- 16개 피부 타입 중 하나로 결과 판정
- 타입별 특성 설명과 관리 포인트 제공
- 타입 및 카테고리별 제품 추천
- 결과 공유
- 개인정보처리방침 및 ILINA 서비스 홈 제공

## 2. 기술 구성

| 영역 | 기술 |
|---|---|
| 프레임워크 | Next.js 16 App Router |
| UI | React 19 |
| 언어 | TypeScript 5 |
| 스타일 | Tailwind CSS 4 |
| 데이터 | 정적 JSON 및 TypeScript 상수 |
| 사용자 결과 저장 | 브라우저 `sessionStorage` |
| 서버/DB | 사용하지 않음 |
| 배포 빌드 | `next build --webpack` |

주요 명령은 다음과 같다.

```bash
npm run dev
npm run lint
npm run build
npm run start
```

## 3. 주요 라우트

| 경로 | 역할 |
|---|---|
| `/` | 피부 타입 설문 시작 화면 |
| `/survey` | 33개 문항 설문 진행 |
| `/result` | `sessionStorage`에 저장된 결과 표시 |
| `/play/skin-type` | 피부 타입 시작 화면의 별칭 |
| `/play/skin-type/survey` | `/survey`로 이동 |
| `/play/skin-type/products` | 현재 세션 결과에 맞는 제품 추천 |
| `/skin-type/[type]/products` | 타입 코드를 URL로 지정하는 제품 추천 화면 |
| `/dev` | 개발용 화면 목록 |
| `/dev/result` | 16개 타입 결과 미리 보기 목록 |
| `/dev/result/[type]` | 설문 없이 특정 결과 확인 |
| `/ilina-home` | ILINA 서비스 홈 |
| `/privacy` | 개인정보처리방침 |
| `/robots.txt` | 검색 엔진 설정 |
| `/sitemap.xml` | 사이트맵 |

`next.config.ts`에는 요청 호스트가 `ilina.kr`일 때 `/`를 `/ilina-home`으로 보내는 rewrite가 있다. 피부 타입 서비스의 기본 URL은 `skin.ilina.kr`로 설정되어 있다.

## 4. 디렉터리 구조

```text
app/
  page.tsx                         # 설문 시작 화면
  survey/page.tsx                  # 설문 페이지
  result/page.tsx                  # 결과 페이지
  play/skin-type/products/page.tsx # 세션 기반 제품 추천 페이지
  skin-type/[type]/products/       # URL 타입 기반 추천 페이지
  dev/                             # 개발용 결과 미리 보기
  privacy/                         # 개인정보처리방침

features/skin-type/
  calculate.ts                     # 점수 계산 및 타입 판정
  result-session.ts                # 결과 sessionStorage 저장/복원
  types.ts                         # 도메인 타입
  dev-preview.ts                   # 16개 타입 미리 보기 점수 생성
  components/                      # 설문, 결과 공유, 제품 카드 UI
  data/
    questions.json                 # 33개 설문 문항과 임계값
    results.json                   # 16개 타입 결과 문구
    skin-type-care.ts              # 16개 타입별 관리 포인트
    skin-type-info.ts              # 특성 설명과 스킨케어 루틴
    skin-products.json             # 제품과 타입별 추천 매핑
  lib/
    product-recommendation.ts      # 제품 검증, 필터, 정렬

config/
  site.ts                          # 서비스 URL과 개인정보 연락처
```

## 5. 설문과 타입 판정 흐름

### 5.1 질문 데이터

`features/skin-type/data/questions.json`에 네 축과 33개 질문이 저장되어 있다.

| 축 | 질문 수 | 결과 |
|---|---:|---|
| `dry_oily` | 6 | D 또는 O |
| `sensitive_resistant` | 9 | S 또는 R |
| `pigmented_nonpigmented` | 7 | P 또는 N |
| `wrinkled_tight` | 11 | W 또는 T |
| 합계 | 33 | 4글자 타입 코드 |

각 선택지는 `text`와 `score`를 갖는다. 임계값도 같은 JSON의 각 dimension에 들어 있다.

### 5.2 설문 UI

`features/skin-type/components/test-runner.tsx`가 클라이언트 상태로 다음을 관리한다.

- 현재 질문 인덱스
- 질문 ID별 선택지 인덱스
- 이전 질문 이동
- 전체 응답 완료 여부
- 제출 중 상태와 오류

답변은 서버로 전송되지 않는다.

### 5.3 계산 로직

`features/skin-type/calculate.ts`의 처리 순서는 다음과 같다.

1. 각 질문의 선택지 점수를 dimension별로 합산한다.
2. `questions.json`의 임계값으로 네 축의 문자를 판정한다.
3. 문자를 D/O → S/R → P/N → W/T 순서로 결합한다.
4. `results.json`에서 같은 코드를 가진 결과를 찾는다.
5. 점수, 임계값, 최대 점수, 문자와 결과 문구를 `SkinAssessmentResult`로 반환한다.

판정 로직은 제품 추천과 분리되어 있다. 제품 데이터 변경은 설문 점수나 타입 결과에 영향을 주지 않는다.

## 6. 결과 저장과 복원

`features/skin-type/result-session.ts`가 결과 코드와 점수를 다음 키로 저장한다.

```text
ilina.skin-type.result.v1
```

저장 위치는 `sessionStorage`이므로 다음 특성이 있다.

- 브라우저 탭 단위로 유지된다.
- 서버에 사용자 답변을 저장하지 않는다.
- 새 세션에서 `/result`에 직접 접근하면 `/survey`로 이동한다.
- 복원할 때 타입 코드 형식과 점수 유효성을 다시 확인한다.
- 저장된 코드와 점수로 계산한 코드가 다르면 결과를 사용하지 않는다.

## 7. 결과 콘텐츠 구조

### 7.1 타입 기본 결과

`features/skin-type/data/results.json`에 16개 타입의 다음 정보가 있다.

- 타입 코드
- 제목
- 상단 요약
- 특성 및 관리 관련 보조 데이터
- 공유 문구

현재 결과 페이지 상단에서는 `title`, `summary`, `shareText`를 주로 사용한다.

### 7.2 개별 특성 설명

`features/skin-type/data/skin-type-info.ts`의 함수가 D/O, S/R, P/N, W/T 각각의 의미를 설명한다. 결과 페이지의 네 원형 아이콘 옆에 표시된다.

이 영역은 행동 지침보다 피부 특성의 의미를 설명하는 역할에 집중한다.

### 7.3 타입별 관리 포인트

`features/skin-type/data/skin-type-care.ts`에 16개 타입별 관리 포인트가 정확히 3개씩 저장되어 있다.

```ts
type SkinTypeCareItem = {
  title: string;
  description: string;
};
```

단일 특성 문구를 기계적으로 조합하지 않고 네 특성의 관계를 고려한 확정 콘텐츠다.

### 7.4 게이지

결과 페이지는 각 dimension의 실제 점수를 최대 점수로 나눈 위치에 마커를 표시한다. 숫자나 퍼센트는 노출하지 않는다.

표현 순서는 다음과 같다.

- DRY ↔ OILY
- RESISTANT ↔ SENSITIVE
- NON-PIGMENTED ↔ PIGMENTED
- TIGHT ↔ WRINKLED

## 8. 제품 추천 데이터

### 8.1 현재 규모

| 항목 | 수량 |
|---|---:|
| 전체 제품 레코드 | 28 |
| 활성 제품 | 17 |
| 비활성 제품 | 11 |
| 활성 추천 매핑 | 164 |

활성 제품의 카테고리별 수량은 다음과 같다.

| 카테고리 | 제품 수 |
|---|---:|
| cleanser | 3 |
| toner | 3 |
| serum | 4 |
| moisturizer | 4 |
| sunscreen | 3 |

### 8.2 제품 구조

`features/skin-type/data/skin-products.json`은 제품 중심 구조다. 타입별로 독립된 제품 목록을 두지 않고 제품 하나가 여러 타입의 recommendation을 가진다.

```ts
type SkinProduct = {
  id: string;
  brand: string;
  name: string;
  category: ProductCategory;
  imageUrl?: string;
  tags: string[];
  summary: string;
  oliveYoungGoodsNo?: string;
  oliveYoungUrl?: string;
  recommendations: ProductRecommendation[];
  active: boolean;
};

type ProductRecommendation = {
  skinType: SkinTypeCode;
  focusTraits: SkinTrait[];
  reason: string;
  order: number;
};
```

### 8.3 필드 역할

| 필드 | 역할 |
|---|---|
| `tags` | 제품 공통 태그. 제품 카드에 최대 3개 노출 |
| `summary` | 제품 공통 내부 설명. 현재 제품 카드에는 미노출 |
| `recommendations` | 제품을 추천할 타입별 정보 |
| `focusTraits` | 해당 조합에서 실제로 고려한 피부 특성. UI에는 미노출 |
| `reason` | 제품×피부타입 조합별 고객 노출 추천 이유 |
| `order` | 타입×카테고리 안에서 대표·대체 제품 순서 |
| `active` | 실제 추천 결과 노출 여부 |

### 8.4 선정과 정렬

`features/skin-type/lib/product-recommendation.ts`는 다음 순서로 제품을 선정한다.

1. JSON을 런타임 타입으로 검증한다.
2. `active: true` 제품만 남긴다.
3. recommendation의 `skinType`이 현재 결과와 같은 항목만 남긴다.
4. `order` 오름차순으로 정렬한다.
5. 첫 제품을 대표 제품, 나머지를 대체 제품으로 사용한다.

현재 데이터에서는 같은 타입×카테고리의 순서가 1부터 중복 없이 연속되도록 검증한다.

### 8.5 추천 기준

카테고리별로 직접 관련된 특성만 `focusTraits`에 사용한다.

| 카테고리 | 주요 특성 |
|---|---|
| cleanser | D/O, S/R |
| toner | D/O, S/R |
| serum | 제품 목적에 따라 D, S, P 또는 W |
| moisturizer | D/O, S/R |
| sunscreen | P, W, S 및 필요한 경우 D/O |

멜라 B3 세럼은 P 타입, 바쿠치올 세럼은 W 타입에만 연결된다. ORNT는 별도 기능성 세럼을 억지로 추천하지 않기 때문에 serum 추천이 없다.

### 8.6 외부 링크

활성 17개 제품은 모두 `oliveYoungUrl`을 사용해 올리브영 상품 상세로 연결된다. 링크 문구는 `올리브영에서 제품 보기`다.

## 9. 타입별 루틴 중요도

`features/skin-type/data/skin-type-info.ts`의 `routineLevels`가 카테고리 중요도를 관리한다.

```ts
type RecommendationLevel = "essential" | "recommended" | "optional";
```

기본값은 다음과 같다.

| 카테고리 | 기본 수준 |
|---|---|
| cleanser | essential |
| toner | optional |
| serum | recommended |
| moisturizer | recommended |
| sunscreen | essential |

각 타입은 필요한 카테고리만 기본값을 덮어쓴다. 현재 UI는 `optional`에만 별표와 `필요에 따라` 문구를 표시한다. `essential`과 `recommended`는 데이터상 구분되지만 시각적으로 별도 표시하지 않는다.

## 10. 제품 데이터 검증

`features/skin-type/lib/product-recommendation.ts`가 다음을 검사한다.

- 활성 제품 수가 17개인지
- 제품 ID가 비어 있거나 중복되지 않았는지
- 카테고리가 다섯 종류 중 하나인지
- 추천 타입 코드가 유효한지
- `focusTraits`가 비어 있지 않은지
- 각 focus trait이 실제 타입 코드에 포함되는지
- 추천 이유가 비어 있지 않은지
- 순서가 유효한 숫자인지
- 비활성 제품에 추천 매핑이 남아 있지 않은지
- 같은 타입×카테고리에서 순서가 1부터 중복 없이 이어지는지
- 색소 세럼이 P가 없는 타입에 연결되지 않았는지
- 탄력 세럼이 W가 없는 타입에 연결되지 않았는지
- O 타입 8개 모두 moisturizer 추천을 갖는지

데이터 불일치는 개발 경고 또는 오류로 처리된다.

## 11. UI 구성 원칙

서비스 전반은 모바일 화면을 우선한다.

- Emerald/Mint 계열 브랜드 컬러
- 최대 폭을 제한한 세로형 카드 레이아웃
- 결과 코드와 타입명을 우선 노출
- 제품은 카테고리별 대표 제품 한 개를 먼저 표시
- 대체 제품은 `다른 ○○ 추천 보기`로 펼침
- 제품 이미지는 현재 사용하지 않음
- 의료 진단을 대체하지 않는다는 안내 유지

## 12. 변경 작업별 주요 파일

| 변경 목적 | 주요 파일 |
|---|---|
| 질문·점수·임계값 변경 | `questions.json`, `calculate.ts` |
| 결과 제목·상단 요약 변경 | `results.json` |
| 타입별 관리 문구 변경 | `skin-type-care.ts` |
| D/O/S/R/P/N/W/T 설명 변경 | `skin-type-info.ts` |
| 루틴 필수·권장·선택 변경 | `skin-type-info.ts` |
| 제품 추가·비활성화 | `skin-products.json` |
| 제품 추천 타입·이유·순위 변경 | `skin-products.json` |
| 제품 데이터 스키마 변경 | `types.ts`, `product-recommendation.ts` |
| 제품 카드 문구 변경 | `product-card.tsx` |
| 추천 목록 동작 변경 | `product-recommendations.tsx` |
| 설문 화면 변경 | `test-runner.tsx`, `app/survey/page.tsx` |
| 결과 화면 변경 | `app/result/page.tsx` |

## 13. 수정 시 주의사항

### 판정 데이터

- 질문 ID를 변경하면 기존 응답 객체와 계산 흐름에 영향을 준다.
- 선택지 순서는 답변에 저장되는 인덱스와 연결된다.
- 임계값은 가능한 최소·최대 점수 전체를 빠짐없이 포함해야 한다.
- 16개 타입 결과가 모두 유지되어야 한다.

### 제품 데이터

- 활성 제품 수를 변경하면 현재 검증 상수도 함께 검토해야 한다.
- `focusTraits`는 반드시 추천 대상 타입에 실제 포함된 문자만 사용한다.
- 같은 타입×카테고리에서 `order`를 중복시키지 않는다.
- P 전용 세럼과 W 전용 세럼의 타입 제한을 지킨다.
- 태그는 제품 공통 정보이고 추천 이유는 제품×타입별 정보다.
- `oliveYoungGoodsNo`와 URL을 임의로 추측하거나 교체하지 않는다.
- 비활성 제품을 다시 사용할 때는 recommendation을 새로 구성해야 한다.

### 콘텐츠와 UI

- 결과의 개별 특성 설명과 타입별 관리 포인트가 중복되지 않도록 한다.
- 추천 이유는 제품 효능을 단정하지 않고 해당 카테고리의 관리 방향을 설명한다.
- 모바일에서 긴 제목과 문장이 카드 폭을 넘지 않는지 확인한다.
- 게이지의 TIGHT/WRINKLED 표현과 숫자를 표시하지 않는 정책을 유지한다.

## 14. 검증 절차

일반적인 변경 후 최소 검증 순서는 다음과 같다.

```bash
npm run lint
npm run build
git diff --check
```

추가로 확인할 항목:

1. 33개 질문이 모두 존재하는지
2. 가능한 점수 전체가 임계값에 포함되는지
3. 16개 결과 타입이 모두 존재하는지
4. 활성 제품 수와 카테고리별 수가 의도와 일치하는지
5. recommendation의 타입, focus trait, 순서가 유효한지
6. O 타입 moisturizer 추천이 유지되는지
7. 비활성 제품이 화면에 나타나지 않는지
8. `/dev/result/[type]`에서 결과 화면을 확인할 수 있는지
9. 모바일 폭에서 가로 스크롤이 발생하지 않는지

## 15. 알려진 유지보수 사항

- `docs/products-coverage.md`는 과거 제품 풀 기준으로 작성되어 현재 17개 활성 제품과 164개 매핑을 반영하지 않을 수 있다. 제품 추천 데이터 변경 시 재생성이 필요하다.
- `skin-products_bak.json`은 런타임에서 사용하지 않는 백업 데이터다.
- `SkinProduct.summary`는 필수 데이터지만 현재 제품 카드에는 표시하지 않는다.
- `essential`과 `recommended`는 현재 UI에서 시각적으로 구분되지 않는다.
- 독립 `tsc --noEmit` 실행 시 `.next/dev`가 `app/result/page.tsx`의 named export를 Next 페이지 규칙 위반으로 감지할 수 있다. Production build 내부 TypeScript 검사는 통과하며, 향후 결과 콘텐츠 컴포넌트를 페이지 파일 밖으로 이동하면 이 구조적 문제를 해소할 수 있다.
- 제품 태그에는 근거 URL이나 검증일 같은 provenance 필드가 없다. 태그 신뢰성을 체계적으로 관리하려면 별도 메타데이터 구조가 필요하다.

## 16. 현재 상태 요약

현재 서비스는 다음 조건을 만족한다.

- 설문과 판정이 서버 없이 완결된다.
- 33개 질문과 16개 타입 결과가 존재한다.
- 결과는 세션 단위로 안전하게 복원 검증된다.
- 타입별 관리 콘텐츠가 3개씩 분리되어 있다.
- 활성 제품 17개와 추천 매핑 164개가 구조적으로 검증된다.
- O 타입 8개 모두 보습제 추천이 있다.
- 추천 이유는 카테고리와 관련 있는 피부 특성을 중심으로 관리된다.
- 비활성 제품은 추천 결과에 노출되지 않는다.
- 모바일 중심 결과 및 추천 UI를 유지한다.
