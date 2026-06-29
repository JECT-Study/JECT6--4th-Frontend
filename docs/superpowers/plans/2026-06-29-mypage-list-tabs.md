# 마이페이지 관심공고 + AI히스토리 탭 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:subagent-driven-development. Steps use checkbox (`- [ ]`).

**Goal:** 마이페이지 "관심 공고" 탭(오버뷰 + 좋아요/최근조회 전체목록)과 "AI 히스토리" 탭을 기존 API와 연동해 구현. `feat/mypage`에 이어 커밋(PR #41 갱신).

**Architecture:** 기존 `/mypage/*` 중첩 라우트에 stub였던 `saved`/`ai-history`를 채우고, 관심공고 전체목록용 하위 라우트(`saved/likes`, `saved/recent-views`)를 추가. 데이터는 기존 `myService`/`campaignService`/`blogAnalysisService`를 react-query 훅으로 래핑. 카드 그리드는 기존 `HomeCampaignCard` 재사용.

**Tech Stack:** Next.js 16 App Router · React 19 · TS · @tanstack/react-query · Tailwind4 · zod.

## Global Constraints
- 레포 `JECT6--4th-Frontend`, 브랜치 `feat/mypage`(이어서). 백엔드 무변경(프론트 전용). 커밋 author `jwanp <joohwan726@naver.com>`.
- 테스트 러너 없음 → 게이트 = `yarn type-check` clean + `npx eslint src/app/mypage src/service` exit 0. TDD 단위테스트 작성 금지.
- import-x/order: next→react→외부→@/(@/service,@/components,@/entities,@/shared,@/lib 각 빈 줄 구분)→상대. `'use client'`는 훅/상태 파일. async onClick은 `() => { void fn() }`.
- Tailwind 커스텀 토큰 사용(neutral_*, violet_*, red_50, text-16/.. 등). Figma `get_design_context`(fileKey dwJ8bn41tF7w2qiqAUymf8) 결과 토큰 우선.
- 재사용(재생성 금지): `@/app/_components/home/HomeCampaignCard`(props=Campaign spread + className/variant), `@/components/ui/carousel`(embla), `@/lib/utils`(cn), 기존 `src/app/mypage/_components/SectionShell`, `getApiErrorMessage`(`mypage/hooks/useProfileMutations`).

## 관련 API (현재 src/service/index.ts, main 머지 반영본)
- `myService.getCampaigns()` → `myCampaignSummarySchema {recentViewCount, likedCount, recentAppliedCampaign[]}` (오버뷰 카운트2+최근지원)
- `myService.getLikedCampaigns({page,size})` → `simplePageSchema(campaignSchema)` (좋아요 전체)
- `myService.getRecentViewCampaigns({page,size})` → `simplePageSchema(campaignSchema)` (최근조회 전체)
- `campaignService.getPopular()` → `Campaign[]` (추천 캐러셀 백업 소스)
- `blogAnalysisService.getQuota()` → `quotaResponseSchema {used,limit,remaining,resetAt?}`
- **신규 추가 필요**: `myService.getAiHistory()` → `GET /my/ai-history` → `{aiHistory:[{historyId, diagnosisDate}]}` (지난 진단 결과). 백엔드에 존재 확인됨.

## Figma 노드
- 관심공고 오버뷰 696:4752 / AI히스토리 702:8177 / 좋아요 전체 701:5575(또는 6302) / 최근조회 전체 701:5866.

## 라우트/파일 구조
```
src/app/mypage/saved/
  page.tsx                         # 오버뷰
  likes/page.tsx                   # 좋아요 전체
  recent-views/page.tsx            # 최근조회 전체
  _components/{SavedSummaryCard,AppliedCampaignCard,SavedCampaignGrid,RecommendCarousel}.tsx
  hooks/useMyCampaigns.ts
src/app/mypage/ai-history/
  page.tsx
  _components/{AiDiagnosisCard,QuotaBanner}.tsx
  hooks/useAiHistory.ts
src/service/index.ts               # + getAiHistory
src/entities/my/model/my.schema.ts # + aiHistorySchema
```

---

### Task A: 서비스/스키마 추가 (getAiHistory) + 훅 토대

**Files:** Modify `src/entities/my/model/my.schema.ts`, `src/entities/my/index.ts`, `src/service/index.ts`. Create `src/app/mypage/saved/hooks/useMyCampaigns.ts`, `src/app/mypage/ai-history/hooks/useAiHistory.ts`.

**Interfaces produced:**
- `aiHistorySchema`/`AiHistoryResponse` (`{aiHistory: {historyId:number, diagnosisDate:string}[]}`)
- `myService.getAiHistory()`
- `useMyCampaignsSummary()`, `useLikedCampaigns(params?)`, `useRecentViewCampaigns(params?)`
- `useAiHistory()`, `useQuota()`

- [ ] **Step 1: aiHistory 스키마 추가**

`src/entities/my/model/my.schema.ts` 끝에:
```ts
// GET /my/ai-history 응답
export const aiHistoryItemSchema = z.object({
  historyId: z.number(),
  diagnosisDate: z.string(),
})
export const aiHistorySchema = z.object({
  aiHistory: z.array(aiHistoryItemSchema).nullish().transform(v => v ?? []),
})
export type AiHistoryItem = z.infer<typeof aiHistoryItemSchema>
export type AiHistory = z.infer<typeof aiHistorySchema>
```
`src/entities/my/index.ts`에 `aiHistorySchema`, 타입 export 추가.

- [ ] **Step 2: 서비스 메서드 추가**

`src/service/index.ts`의 `myService`에 추가(상단 import에 `aiHistorySchema` 추가):
```ts
  /** GET /my/ai-history — 지난 AI 진단 이력 */
  getAiHistory: () =>
    http.get('/my/ai-history').then(res => aiHistorySchema.parse(res.data)),
```

- [ ] **Step 3: react-query 훅 작성**

`src/app/mypage/saved/hooks/useMyCampaigns.ts`:
```ts
'use client'

import { useQuery } from '@tanstack/react-query'

import { campaignService, myService } from '@/service'

export function useMyCampaignsSummary() {
  return useQuery({ queryKey: ['my', 'campaigns', 'summary'], queryFn: () => myService.getCampaigns() })
}
export function useLikedCampaigns(params?: { page?: number; size?: number }) {
  return useQuery({ queryKey: ['my', 'campaigns', 'likes', params], queryFn: () => myService.getLikedCampaigns(params) })
}
export function useRecentViewCampaigns(params?: { page?: number; size?: number }) {
  return useQuery({ queryKey: ['my', 'campaigns', 'recent-views', params], queryFn: () => myService.getRecentViewCampaigns(params) })
}
export function useRecommendedCampaigns() {
  return useQuery({ queryKey: ['campaigns', 'popular'], queryFn: () => campaignService.getPopular() })
}
```

`src/app/mypage/ai-history/hooks/useAiHistory.ts`:
```ts
'use client'

import { useQuery } from '@tanstack/react-query'

import { blogAnalysisService, myService } from '@/service'

export function useAiHistory() {
  return useQuery({ queryKey: ['my', 'ai-history'], queryFn: () => myService.getAiHistory() })
}
export function useQuota() {
  return useQuery({ queryKey: ['blog', 'diagnosis', 'quota'], queryFn: () => blogAnalysisService.getQuota() })
}
```

- [ ] **Step 4: 게이트 + 커밋**

`yarn type-check && npx eslint src/app/mypage src/service src/entities` → clean.
```bash
git -c user.name='jwanp' -c user.email='joohwan726@naver.com' commit -m "feat(mypage): ai-history 서비스/스키마 + 관심공고·히스토리 훅 추가"
```

---

### Task B: 관심 공고 오버뷰 (`/mypage/saved`)

**Files:** Create `_components/SavedSummaryCard.tsx`, `_components/AppliedCampaignCard.tsx`; rewrite `src/app/mypage/saved/page.tsx`.
**Figma:** 696:4752 (get_design_context로 토큰 추출).

- [ ] **Step 1:** `get_design_context`(node 696:4752)로 레이아웃/토큰 확인.

- [ ] **Step 2: SavedSummaryCard 작성** — props `{label, count, href}`. 좌측 라벨+`N개`, 우측 arrow(ChevronRight). `Link`로 href 이동. 카드 스타일은 v1 `AccountNavCard`와 동일 톤(rounded-2xl border neutral_95).

- [ ] **Step 3: AppliedCampaignCard 작성** — props = `MyRecentAppliedCampaign` (`{campaignId, campaignTitle, brandName, applyEndDate, appliedAt}`). 썸네일 placeholder(bg-neutral_95) + 제목 + 브랜드 + D-day(applyEndDate 기준 계산). 클릭 시 `/campaigns/{campaignId}` 이동(Link).

- [ ] **Step 4: saved/page.tsx 조립**
```tsx
'use client'
// useMyCampaignsSummary()로 data 조회. isLoading/isError 처리(v1 account/page 패턴 동일).
// 상단: SavedSummaryCard 2개 (최근 조회 N개 → /mypage/saved/recent-views, 좋아요 N개 → /mypage/saved/likes)
// 하단: "최근 지원한 공고" 제목 + recentAppliedCampaign.map(AppliedCampaignCard) (빈 상태 처리)
```

- [ ] **Step 5:** 게이트(`yarn type-check && npx eslint src/app/mypage`) + 커밋 `feat(mypage): 관심 공고 오버뷰 탭`.

---

### Task C: 관심 공고 전체목록 (`/mypage/saved/likes`, `/mypage/saved/recent-views`)

**Files:** Create `_components/SavedCampaignGrid.tsx`, `_components/RecommendCarousel.tsx`, `saved/likes/page.tsx`, `saved/recent-views/page.tsx`.
**Figma:** 701:5575(좋아요), 701:5866(최근조회) — get_design_context.

- [ ] **Step 1:** `get_design_context`(701:5866, 701:5575)로 그리드/카드/캐러셀 토큰 확인. `HomeCampaignCard`의 실제 props(Campaign 필드: id, brandName, channel, applyEndDate, title, thumbnailUrl 등)와 `getLikedCampaigns`/`getRecentViewCampaigns` 반환(`simplePage(campaignSchema)`)의 필드 일치 확인.

- [ ] **Step 2: SavedCampaignGrid 작성** — props `{campaigns: Campaign[]}`. 4열 그리드(반응형), 각 항목 `<HomeCampaignCard {...campaign} />`. 빈 상태("관심 공고가 없습니다.").

- [ ] **Step 3: RecommendCarousel 작성** — `useRecommendedCampaigns()`(getPopular)로 5장, 제목 "맞춤 추천 체험단"(또는 Figma 카피). `@/components/ui/carousel`(embla) 재사용. 데이터 없으면 섹션 숨김.

- [ ] **Step 4: likes/page.tsx** — `useLikedCampaigns()`로 `content` 그리드 렌더 + RecommendCarousel. 제목 "내 관심 공고"/"좋아요 한 공고"(Figma). 로딩/에러/빈 처리.

- [ ] **Step 5: recent-views/page.tsx** — `useRecentViewCampaigns()` 동일 패턴, 제목 "최근 조회한 공고". (추천 캐러셀은 Figma상 좋아요 화면에만 있으면 likes에만, 둘 다면 공통 적용 — get_design_context로 확인.)

- [ ] **Step 6:** 게이트 + 커밋 `feat(mypage): 관심 공고 전체목록(좋아요/최근조회) + 추천 캐러셀`.

---

### Task D: AI 히스토리 탭 (`/mypage/ai-history`)

**Files:** Create `_components/AiDiagnosisCard.tsx`, `_components/QuotaBanner.tsx`; rewrite `src/app/mypage/ai-history/page.tsx`.
**Figma:** 702:8177 — get_design_context.

- [ ] **Step 1:** `get_design_context`(702:8177)로 배너/카드/쿼터배너 토큰 확인.

- [ ] **Step 2: AiDiagnosisCard 작성** — props `{index, diagnosisDate}`. 아이콘 + "AI 블로그 진단 {index}" + 진단 날짜. (상세 라우트 미정의 → 카드 클릭은 표시만, 또는 추후 라우팅. v1은 표시만.)

- [ ] **Step 3: QuotaBanner 작성** — props `{used, limit, remaining}`. remaining<=0이면 "준비된 {limit}회의 AI 무료 진단을 모두 사용하셨어요" + 설명 + "결제하기 →"(Link `/mypage/subscription`). remaining>0이면 "남은 무료 진단 {remaining}회" 톤으로 표시(또는 Figma 카피).

- [ ] **Step 4: ai-history/page.tsx 조립**
```tsx
'use client'
// 상단 배너: "내 블로그 AI 상세 분석" + 설명 + "AI 진단하기" 버튼(Link `/analyze`)
// "지난 분석 결과" 섹션: useAiHistory().aiHistory.map((h,i)=><AiDiagnosisCard index={i+1} diagnosisDate={h.diagnosisDate}/>) (빈 상태 처리)
// 하단: useQuota() → <QuotaBanner .../>
// 로딩/에러 처리(account/page 패턴)
```

- [ ] **Step 5:** 게이트(`yarn type-check && npx eslint src/app/mypage`) + 커밋 `feat(mypage): AI 히스토리 탭`.

---

### Task E: 마무리 — 빌드 + 실연동 검증 + push

- [ ] **Step 1:** `yarn type-check && npx eslint src/app/mypage src/service src/entities` 전체 clean.
- [ ] **Step 2:** 실연동(로컬 docker 스택 가동중, demo-login 토큰): /mypage/saved, /saved/likes, /saved/recent-views, /mypage/ai-history 브라우저 확인. (데모 데이터에 좋아요/최근조회/ai-history가 없으면 빈 상태 확인 + 가능하면 API로 시드.)
- [ ] **Step 3:** `git push` (PR #41 자동 갱신).

---

## Self-Review
- 관심공고 오버뷰(696:4752)→Task B / 전체목록(701:5866,5575)→Task C / AI히스토리(702:8177)→Task D / 서비스·훅·스키마→Task A / 검증→Task E. 모두 커버.
- 카드 재사용: 전체목록은 HomeCampaignCard(Campaign), 최근지원은 별도 AppliedCampaignCard(다른 shape) — 의도적 분리.
- 추천 캐러셀은 getPopular 백업 소스(개인화 추천 엔드포인트 부재 시) — Task C에서 명시, 데이터 없으면 숨김.
- 미정의 항목: AI 진단 카드 상세 라우트 없음 → 표시만(degrade). "결제하기"/"AI 진단하기" → 기존/스텁 라우트 연결.
