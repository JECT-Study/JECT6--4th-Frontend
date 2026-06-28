# 마이페이지(My Page) 설계 — v1

- **작성일**: 2026-06-28
- **대상 레포**: `JECT6--4th-Frontend` (단독 작업, PR도 이 레포로)
- **작업 브랜치**: `feat/mypage` (base: `main`)
- **Figma**: JECT lowfi Wireframe, 노드 `702:7858` ("마이페이지" / "내 계정 관리" 탭)
- **백엔드**: `JECT6-4th-Server` (develop) — **연동 대상일 뿐 코드 변경 없음**

## 1. 목표 & 범위

Figma 마이페이지(탭 4개: 내 계정 관리 · 관심 공고 · AI 히스토리 · 구독/결제)를 프론트엔드에 구현하고
기존 백엔드 API와 연동한다.

**원칙**
- 프론트엔드 단독 작업. 백엔드는 손대지 않는다.
- 기존 API에 프론트를 맞춘다(conform). 백엔드에 없는 기능은 화면단에서 graceful degrade.
- **세로 슬라이스**로 진행: "내 계정 관리" 탭을 end-to-end로 먼저 완성한 뒤 나머지 탭을 순차 추가.

**v1 완성 기준**: 마이페이지 골격(라우트+탭바) + "내 계정 관리" 탭이 조회/수정까지 실제 API와 연동되어 동작.
나머지 3탭은 v1 이후 순차 진행(아래 7. 후속 순서).

## 2. 아키텍처 — 라우팅 & 폴더 구조

Next.js App Router의 **중첩 라우트 + 공통 레이아웃(탭바)** 방식을 채택한다.
탭별 코드가 분리되고 URL이 공유 가능하다.

```
src/app/mypage/
├── layout.tsx              # 공통 레이아웃: Header 아래 4탭 네비(활성/언더라인) + 로그인 가드
├── account/page.tsx        # 내 계정 관리   (v1 핵심)
├── saved/page.tsx          # 관심 공고
├── ai-history/page.tsx     # AI 히스토리
├── subscription/page.tsx   # 구독/결제
└── _components/            # 탭 전용 컴포넌트
    ├── MyPageTabs.tsx       # 탭 네비게이션(활성 표시)
    ├── ProfileHeader.tsx    # 닉네임 + 편집
    ├── BlogLinkSection.tsx  # 내 블로그 연동 + 편집
    ├── CategorySection.tsx  # 관심 카테고리 + 편집
    └── AccountNavCard.tsx   # 하단 진입 카드(회원정보 수정/결제수단/비밀번호)
```

**탭 ↔ URL 매핑**
| 탭 | 경로 |
|---|---|
| 내 계정 관리 | `/mypage/account` |
| 관심 공고 | `/mypage/saved` |
| AI 히스토리 | `/mypage/ai-history` |
| 구독/결제 | `/mypage/subscription` |

- `/mypage` 진입 시 `/mypage/account`로 리다이렉트.
- `layout.tsx`에서 로그인 가드: `authAtom`이 없으면 `/auth/login`으로 리다이렉트.

**재사용 자산** (이미 존재):
- API 호출: `src/service/index.ts` (`userService`, `myService`)
- 스키마/타입: `src/entities/{user,my,auth}/model/*`
- 인증 상태: `src/entities/auth/model/auth.store.ts` (`authAtom`)
- HTTP 클라이언트: `src/shared/api/http.ts` (토큰 주입 + snake/camel 변환 자동)
- 공용 UI: `src/components/ui/button.tsx`, `src/shared/ui/input/Input.tsx`, `src/shared/ui/dropdown/Dropdown.tsx`
- 데이터 패칭: `@tanstack/react-query` (훅으로 래핑)

## 3. 컴포넌트 분해 — "내 계정 관리" 탭 (`/mypage/account`)

Figma `702:7858` 기준. 위에서 아래로:

1. **ProfileHeader** — 사용자 닉네임(`사용자 닉네임`) + "편집". 편집 시 닉네임 인라인 수정 + 중복 체크.
2. **BlogLinkSection** ("내 블로그 연동") — 연동된 네이버 블로그 URL 표시 + "편집". 미연동 시 연동 유도.
3. **CategorySection** ("관심 카테고리") — 선택된 카테고리 칩 + "편집". 편집 시 카테고리 다중선택.
4. **개인 정보 관리 섹션** — 진입 카드 3개(우측 arrow):
   - 회원 정보 수정 (`회원 정보 수정`)
   - 내 결제 수단 (`내 결제 수단`)
   - 비밀번호 및 계정 (`비밀번호 및 계정`)

각 컴포넌트는 단일 책임을 가지며, 데이터는 상위 page에서 react-query로 받아 props로 주입한다.

## 4. API 매핑 — "내 계정 관리"

| 화면 요소 | API | 비고 |
|---|---|---|
| 닉네임 조회 | `GET /api/users/me` → `UserMeResponse.nickname` | `userService.getMe()` |
| 닉네임 중복 체크 | `GET /api/users/nickname/check?nickname=` → `NicknameCheckResponse` | public |
| 닉네임 저장 | `PATCH /api/users/me` (`nickname`) | `userService.updateMe()` |
| 블로그 연동 조회 | `GET /api/users/me` → `UserMeResponse.blogs[]` (`BlogLinkResponse`) | |
| 블로그 연동 저장 | `POST /api/users/me/blog` (`blog_url`, `platform=NAVER`) | `userService.linkBlog()` |
| 관심 카테고리 조회 | `GET /api/users/me` → `UserMeResponse.categoryTypes[]` | |
| 관심 카테고리 저장 | `PATCH /api/users/me` (`interest_categories[]`) | enum: FOOD/BEAUTY/CULTURE/TRAVEL/TECH_IT/PET/LIVING/FASHION/ETC |
| 회원 정보 수정(진입) | 닉네임만 가능, 이메일 변경 API 없음 | **부분 → degrade** |
| 내 결제 수단(진입) | 없음 | **degrade** |
| 비밀번호 및 계정(진입) | 없음 | **degrade** |

응답 래퍼(`ApiResponse<T>`의 `{success,data}`)와 snake/camel 변환은 `http.ts`가 자동 처리하므로 서비스 레이어는 `data`만 다룬다.

## 5. Graceful Degrade 정책

백엔드에 엔드포인트가 없는 기능은 **숨기지 않고 비활성 + "준비 중" 안내**로 노출한다(디자인 형태 유지, 클릭 시 동작 없음 또는 안내 토스트).

| 기능 | 처리 |
|---|---|
| 회원 정보 수정 — 이메일 변경 | 필드는 표시하되 비활성(읽기 전용). 닉네임 변경만 동작. |
| 내 결제 수단 | 진입 카드 비활성 + "준비 중" 표시 |
| 비밀번호 및 계정 | 진입 카드 비활성 + "준비 중" 표시 |
| OAuth 연동계정 관리 | v1 미노출 (백엔드 미존재) |

## 6. 상태/에러 처리

- **로딩**: react-query `isLoading` → 스켈레톤/플레이스홀더.
- **에러**: 조회 실패 시 재시도 가능한 에러 영역. 저장 실패 시 인라인 에러 + 토스트.
- **빈 상태**: 블로그 미연동, 카테고리 미선택 등 각 섹션의 빈 상태 UI.
- **낙관적/무효화**: 수정 성공 시 `['user','me']` 쿼리 무효화로 재조회.

## 7. 구현 순서 (세로 슬라이스)

1. **골격** — `mypage/layout.tsx`(4탭 네비 + 활성표시 + 로그인 가드), 4개 라우트 stub, `/mypage`→`/mypage/account` 리다이렉트.
2. **내 계정 관리 정적 UI** — Figma `get_design_context`로 토큰 추출해 4섹션 구현(연동 전, mock 데이터).
3. **연동(읽기)** — `getMe()` react-query 훅으로 닉네임/블로그/카테고리 바인딩.
4. **연동(쓰기)** — 닉네임(중복체크 포함)·카테고리·블로그 편집 → `updateMe`/`linkBlog`, 성공 시 무효화.
5. **degrade 처리** — 결제수단·비밀번호 카드, 이메일 필드 비활성화. → **v1 = 1탭 end-to-end 완료**.
6. **나머지 3탭 순차**
   - 관심 공고: `GET /my/campaigns/likes`, `GET /my/campaigns/recent-views` (`SimplePageResponse<CampaignSummaryResponse>`)
   - AI 히스토리: `GET /my/ai-history` (`MyAiHistoryResponse`), 상세는 `GET /blog/analysis/{documentId}`
   - 구독/결제: 구독상태 read-only(`UserMeResponse`/로그인 응답의 `subscriptionType`,`aiCreditRemaining`) + 포인트 `GET /my/points`. 결제수단 관리부는 degrade.
7. **마무리** — 빈/로딩/에러/반응형 점검 → PR.

## 8. 범위 밖 (deferred)

비밀번호 변경, OAuth 연동계정 관리, 결제수단 CRUD, 이메일 변경, 구독 업/다운그레이드 — 모두 백엔드 미존재. v1에서는 화면 degrade만, 기능 구현 보류.

## 9. 검증

- 로컬 백엔드(docker `docker-compose.demo.yml`) 기동 후 실제 API로 조회/수정 동작 확인.
- 닉네임 중복 체크, 카테고리 저장, 블로그 연동 happy path 수동 확인.
- 미로그인 시 `/mypage` 접근 → 로그인 리다이렉트 확인.
