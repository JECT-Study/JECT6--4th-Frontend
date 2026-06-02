import type { LoginRequest, TokenResponse } from '@/entities/auth'
import type {
  AnalyzeRequest,
  AnalyzeJobResponse,
  BlogAnalysisResponse,
  AnalysisHistoryResponse,
  AnalysisRecommendationsResponse,
  PopularBloggersResponse,
  ChatRequest,
  ChatResponse,
} from '@/entities/blog-analysis'
import type {
  Campaign,
  CampaignDetail,
  CampaignListParams,
  CampaignViewers,
  CampaignLikesAnalysis,
  CampaignLike,
  Paginated,
} from '@/entities/campaign'
import type { FeedHero, FeedBody, AiRecommendations, BloggerStories } from '@/entities/feed'
import type {
  MyCampaign,
  MyCampaignDetail,
  PointsResponse,
  WithdrawRequest,
  WithdrawResponse,
} from '@/entities/my'
import type {
  OnboardingResponseRequest,
  OnboardingResponseResult,
  OnboardingRecommendations,
} from '@/entities/onboarding'
import type {
  Subscription,
  UpgradeSubscriptionRequest,
  CancelSubscriptionResponse,
} from '@/entities/subscription'
import type {
  UserProfile,
  UpdateUserProfileRequest,
  BlogLinkRequest,
  Blog,
  Provider,
} from '@/entities/user'

import { http } from '@/shared/api'

// ==============================
// Auth
// ==============================

export const authService = {
  /** POST /auth/login/{provider} — 소셜 로그인 */
  login: (provider: Provider, data: LoginRequest) =>
    http.post<TokenResponse>(`/auth/login/${provider}`, data).then(res => res.data),

  /** POST /auth/logout — 로그아웃 */
  logout: () => http.post<void>('/auth/logout').then(res => res.data),
}

// ==============================
// User
// ==============================

export const userService = {
  /** GET /users/me — 내 정보 조회 */
  getMe: () => http.get<UserProfile>('/users/me').then(res => res.data),

  /** PATCH /users/me — 프로필 수정 */
  updateMe: (data: UpdateUserProfileRequest) =>
    http.patch<UserProfile>('/users/me', data).then(res => res.data),

  /** POST /users/me/blog — 블로그 연동 */
  linkBlog: (data: BlogLinkRequest) =>
    http.post<Blog>('/users/me/blog', data).then(res => res.data),

  /** DELETE /users/me/blog — 블로그 연동 해제 */
  unlinkBlog: () => http.delete<void>('/users/me/blog').then(res => res.data),

  /** GET /users/nickname/check — 닉네임 중복 확인 */
  checkNickname: (nickname: string) =>
    http
      .get<{ available: boolean }>('/users/nickname/check', { params: { nickname } })
      .then(res => res.data),

  /** GET /users/nickname/random — 랜덤 닉네임 생성 */
  randomNickname: () =>
    http.get<{ nickname: string }>('/users/nickname/random').then(res => res.data),

  /** DELETE /users/me — 회원 탈퇴 */
  deleteMe: () => http.delete<void>('/users/me').then(res => res.data),
}

// ==============================
// Subscription
// ==============================

export const subscriptionService = {
  /** GET /my/subscription — 구독 상태 조회 */
  getSubscription: () => http.get<Subscription>('/my/subscription').then(res => res.data),

  /** POST /my/subscription/upgrade — 프리미엄 구독 */
  upgrade: (data: UpgradeSubscriptionRequest) =>
    http.post<Subscription>('/my/subscription/upgrade', data).then(res => res.data),

  /** DELETE /my/subscription — 구독 해지 */
  cancel: () => http.delete<CancelSubscriptionResponse>('/my/subscription').then(res => res.data),
}

// ==============================
// Campaign
// ==============================

export const campaignService = {
  /** GET /campaigns — 공고 목록 (필터·정렬·무한스크롤) */
  getCampaigns: (params?: CampaignListParams) =>
    http.get<Paginated<Campaign>>('/campaigns', { params }).then(res => res.data),

  /** GET /campaigns/{id} — 공고 상세 */
  getCampaign: (id: number) => http.get<CampaignDetail>(`/campaigns/${id}`).then(res => res.data),

  /** GET /campaigns/{id}/viewers — 실시간 조회수 */
  getViewers: (id: number) =>
    http.get<CampaignViewers>(`/campaigns/${id}/viewers`).then(res => res.data),

  /** GET /campaigns/{id}/related — 관련 공고 3개 */
  getRelated: (id: number) =>
    http.get<Campaign[]>(`/campaigns/${id}/related`).then(res => res.data),

  /** GET /campaigns/{id}/likes/analysis — 좋아요 사용자 특성 LLM 메시지 */
  getLikesAnalysis: (id: number) =>
    http.get<CampaignLikesAnalysis>(`/campaigns/${id}/likes/analysis`).then(res => res.data),

  /** POST /campaigns/{id}/like — 좋아요 토글 */
  toggleLike: (id: number) =>
    http.post<CampaignLike>(`/campaigns/${id}/like`).then(res => res.data),

  /** GET /campaigns/search — 통합 검색 */
  search: (q: string, params?: Pick<CampaignListParams, 'page' | 'size'>) =>
    http
      .get<Paginated<Campaign>>('/campaigns/search', { params: { q, ...params } })
      .then(res => res.data),

  /** GET /campaigns/popular — 인기 체험단 */
  getPopular: () => http.get<Campaign[]>('/campaigns/popular').then(res => res.data),

  /** GET /campaigns/guaranteed — 100% 당첨 공고 */
  getGuaranteed: () => http.get<Campaign[]>('/campaigns/guaranteed').then(res => res.data),

  /** GET /campaigns/closing-soon — 마감 임박 공고 */
  getClosingSoon: () => http.get<Campaign[]>('/campaigns/closing-soon').then(res => res.data),
}

// ==============================
// Feed
// ==============================

export const feedService = {
  /** GET /feed/hero — 히어로 배너 (유저 상태별 분기) */
  getHero: () => http.get<FeedHero>('/feed/hero').then(res => res.data),

  /** GET /feed/body — 메인 바디 5섹션 */
  getBody: () => http.get<FeedBody>('/feed/body').then(res => res.data),

  /** GET /feed/ai-recommendations — AI 맞춤 추천 (로그인+연동 필수) */
  getAiRecommendations: () =>
    http.get<AiRecommendations>('/feed/ai-recommendations').then(res => res.data),

  /** GET /feed/blogger-stories — 유명 블로거 성공 사례 */
  getBloggerStories: () => http.get<BloggerStories>('/feed/blogger-stories').then(res => res.data),
}

// ==============================
// My
// ==============================

export const myService = {
  /** GET /my/campaigns — 내 체험단 목록 */
  getCampaigns: (params?: { status?: string; page?: number; size?: number }) =>
    http.get<Paginated<MyCampaign>>('/my/campaigns', { params }).then(res => res.data),

  /** GET /my/campaigns/{id} — 내 체험단 상세 */
  getCampaign: (id: number) =>
    http.get<MyCampaignDetail>(`/my/campaigns/${id}`).then(res => res.data),

  /** GET /my/points — 포인트 잔액·거래 내역 */
  getPoints: (params?: { page?: number; size?: number }) =>
    http.get<PointsResponse>('/my/points', { params }).then(res => res.data),

  /** POST /my/points/withdraw — 포인트 출금 신청 (최소 5,000P) */
  withdraw: (data: WithdrawRequest) =>
    http.post<WithdrawResponse>('/my/points/withdraw', data).then(res => res.data),

  /** GET /my/recent-views — 최근 본 공고 */
  getRecentViews: () => http.get<Campaign[]>('/my/recent-views').then(res => res.data),

  /** GET /my/likes — 찜한 공고 */
  getLikes: (params?: { page?: number; size?: number }) =>
    http.get<Paginated<Campaign>>('/my/likes', { params }).then(res => res.data),
}

// ==============================
// Onboarding
// ==============================

export const onboardingService = {
  /** POST /onboarding/response — 온보딩 단계별 응답 저장 */
  saveResponse: (data: OnboardingResponseRequest) =>
    http.post<OnboardingResponseResult>('/onboarding/response', data).then(res => res.data),

  /** GET /onboarding/recommendations — 온보딩 기반 추천 공고 */
  getRecommendations: (sessionId: string) =>
    http
      .get<OnboardingRecommendations>('/onboarding/recommendations', {
        params: { sessionId },
      })
      .then(res => res.data),
}

// ==============================
// Blog Analysis
// ==============================

export const blogAnalysisService = {
  /** POST /blog/analyze — 블로그 분석 요청 (크레딧 차감 → Queue 발행) */
  analyze: (data: AnalyzeRequest) =>
    http.post<AnalyzeJobResponse>('/blog/analyze', data).then(res => res.data),

  /** GET /blog/analysis/{documentId} — 분석 결과 조회 */
  getAnalysis: (documentId: number) =>
    http.get<BlogAnalysisResponse>(`/blog/analysis/${documentId}`).then(res => res.data),

  /** GET /blog/analysis/history — 분석 이력 (Free: 3건, Premium: 전체) */
  getHistory: (params?: { page?: number; size?: number }) =>
    http.get<AnalysisHistoryResponse>('/blog/analysis/history', { params }).then(res => res.data),

  /** GET /blog/analysis/{analysisId}/recommendations — AI 추천 공고 (최대 8개) */
  getRecommendations: (analysisId: number) =>
    http
      .get<AnalysisRecommendationsResponse>(`/blog/analysis/${analysisId}/recommendations`)
      .then(res => res.data),

  /** GET /blog/analysis/{analysisId}/bloggers — 인기 블로거 Top3 */
  getBloggers: (analysisId: number) =>
    http
      .get<PopularBloggersResponse>(`/blog/analysis/${analysisId}/bloggers`)
      .then(res => res.data),

  /** POST /blog/chat — 블로그 기반 AI 챗봇 */
  chat: (data: ChatRequest) => http.post<ChatResponse>('/blog/chat', data).then(res => res.data),
}
