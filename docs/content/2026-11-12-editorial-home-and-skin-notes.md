# 운영 메인과 피부 관리 노트

작성: 2026-11-12 KST. 사용자는 운영 배포와 메인 직접 변경, 필요한 글·블로그 구성을 명시적으로 승인했다. 승인 보장은 할 수 없음을 안내했으며, 애드센스 재심사 신청 자체는 수행하지 않는다.

## 확인한 출발점

- 이전 커밋 `0e51ec3`은 GitHub의 Vercel 상태가 success였다. 운영 `/about`에 문항·배점과 제휴 설명, DSPW 제품 페이지에 큐레이터 고지가 실제로 표시됐다.
- 운영 메인은 검사 시작 화면 아래에 자료 링크를 두는 구조였다. 검사는 이용할 수 있었으나 읽을 글의 주제와 방문자의 다음 행동이 첫 화면에 잘 드러나지 않았다.
- Google의 내부 판단이나 적정 글 수는 알 수 없다. 이 변경은 확인한 정보 탐색 문제와 이용자의 후속 질문에 대응한다.

## 반영 구조

- `ilina.kr/`: 검사 + 안내 글 허브. 고민별 진입, 검사 CTA, 네 글 소개, 결과 활용 순서, 작성 기준, 기존 자료 링크.
- `/learn`: 네 글의 목록, 읽기 순서, 작성/AI 활용/감수/제휴/정정 기준.
- `/learn/simple-skin-care-routine`: 세정·보습·자외선 보호 중심의 루틴 정리, 역할별 표, 가상 사례.
- `/learn/oily-but-tight`: 부위·시간·생활 조건을 나눈 관찰 노트, D/O 경계 예시와 진료 신호.
- `/learn/introducing-new-products`: 정확한 제품·판본 확인, 부분 시험, 기록표와 중단·진료 기준.
- `/learn/sunscreen-label-and-use`: SPF·보호 범위·물 저항성, 재도포와 외출 준비표, 코드 해석의 한계.

글마다 작성 주체·작성/수정일·의료 감수의 한계·목차·문단별 원문 링크·비교표·확인 목록·FAQ·관련 글을 제공한다. 예시는 가상임을 표시하며 사용 후기나 임상 연구를 꾸미지 않는다. 글 본문에는 구매 제휴 링크를 넣지 않고 기존 제품 화면의 큐레이터 고지는 유지한다.

`skin.ilina.kr`의 시작 화면과 설문은 유지한다. 새 `/learn` 경로는 양 호스트에서 읽을 수 있으며 canonical은 루트에 모은다. 루트 사이트맵은 40개에서 45개로 늘고 서브도메인 사이트맵은 기존 2개다. 내부 경로를 공개 주소로 사용하지 않는다.

## 근거와 편집 판단

근거 자료는 2026-11-12 직접 열람했다. 내용은 독립적으로 재구성했고 원문의 장문 번역이나 이미지 복제는 하지 않았다. AAD의 미국 표시는 한국 표시와 동일하다고 환산하지 않았다.

- [AAD 기본 관리](https://www.aad.org/public/everyday-care/skin-care-basics/care/skin-care-budget)
- [AAD 세안](https://www.aad.org/public/everyday-care/skin-care-basics/care/face-washing-101)
- [AAD 지성 관리](https://www.aad.org/public/everyday-care/skin-care-basics/dry/oily-skin)
- [AAD 보습제 선택](https://www.aad.org/public/everyday-care/skin-care-basics/dry/pick-moisturizer)
- [AAD 새 제품 시험](https://www.aad.org/public/everyday-care/skin-care-secrets/prevent-skin-problems/test-skin-care-products)
- [AAD 선크림 선택](https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-select-sunscreen)
- [AAD 선크림 사용](https://www.aad.org/public/everyday-care/sun-protection/shade-clothing-sunscreen/how-to-apply-sunscreen)
- [NHS 접촉피부염과 진료 기준](https://www.nhs.uk/conditions/contact-dermatitis/)
- [NHS 악화·감염 신호](https://www.nhs.uk/conditions/contact-dermatitis/symptoms/)

지성 피부에 보습을 권하는 일반 안내와 제형·부위별 사용을 조절하는 보습제 안내를 같이 읽었다. 따라서 모든 O 유형에 같은 양/제형을 강요하지 않고 실제 불편과 조건을 기록하는 방식으로 구성했다. 글의 체크리스트와 표는 ILINA의 정보 정리 형식이며 진단 기준이나 검증된 피부 측정 도구가 아니다.

## 검증

- Next.js 프로덕션 빌드 및 타입 검사, app/features/관련 브라우저 스크립트 ESLint 통과.
- `verify-service-hosts.py`: 양 호스트 canonical·OG·noindex·404·리디렉션·robots, 루트 45개 사이트맵 URL, 47개 탐색 경로와 앵커 통과.
- `verify-content-readiness.py`: 기존 33문항/배점 공개, 16유형과 제품 근거, 큐레이터 15개·보류 2개 회귀 통과.
- `verify-editorial.py`: 네 글의 출처 참조·표 열 수·본문 초기 HTML·Article 구조화 데이터·작성일·관련 글·구매 제휴 링크 부재 확인.
- 브라우저 320/390/1440px × 메인·목록·네 글 총 18개 화면에서 가로 넘침 없음, main/h1 각각 하나. 데스크톱·모바일 메인 스크린샷 시각 검토.
- FAQ 펼침, 새 메인 CTA에서 33문항의 첫 문항으로 이동 확인. 확인한 브라우저 로그에 오류 없음. 기존 설문 전체 동작은 직전 변경에서 검증했고 이번에는 계산·문항을 변경하지 않았다.

## 남는 운영 과제

실제 승인 여부, Search Console의 Google 선택 canonical·마지막 크롤링·색인 상태는 계정에서 확인해야 한다. 글 네 편은 고정 승인 요건이 아니며, AI 사용 고지나 구조화 데이터도 승인 보증 수단이 아니다. 문항 원문·권리와 임상 타당성, 기존 유형/결과 문구의 전문 검토, 상품 현행 판본과 독립 웹사이트 큐레이터 사용 범위는 이전 실행 문서의 과제로 유지한다.

재신청은 새 내용의 운영 반영과 계정별 상태를 확인한 후 진행한다. 기능을 바꿔 심사를 통과한 뒤 원상복구하는 방식이나 승인용 분량 채우기를 운영 전략으로 삼지 않는다.
