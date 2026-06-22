import { z } from 'zod'

import { tokenResponseSchema } from '@/entities/auth'
import {
  analyzeJobResponseSchema,
  analysisHistoryResponseSchema,
  analysisRecommendationsResponseSchema,
  blogAnalysisResponseSchema,
  chatResponseSchema,
  popularBloggersResponseSchema,
  type AnalyzeRequest,
  type AnalysisHistoryResponse,
  type AnalysisRecommendationsResponse,
  type ChatRequest,
  type PopularBloggersResponse,
} from '@/entities/blog-analysis'
import {
  campaignDetailSchema,
  campaignLikeSchema,
  campaignLikesAnalysisSchema,
  campaignSchema,
  campaignViewersSchema,
  paginatedSchema,
  type CampaignListParams,
} from '@/entities/campaign'
import { feedBodySchema, feedHeroSchema } from '@/entities/feed'
import {
  myCampaignDetailSchema,
  myCampaignSchema,
  pointsResponseSchema,
  withdrawResponseSchema,
  type WithdrawRequest,
} from '@/entities/my'
import {
  onboardingRecommendationsSchema,
  onboardingResponseResultSchema,
  type OnboardingResponseRequest,
} from '@/entities/onboarding'
import {
  blogSchema,
  userProfileSchema,
  updateUserProfileResponseSchema,
  nicknameCheckSchema,
  type Provider,
  type UpdateUserProfileRequest,
} from '@/entities/user'

import { http } from '@/shared/api'

// ==============================
// Auth
// ==============================

export const authService = {
  /** POST /auth/login/{provider} — OAuth 코드로 서비스 토큰 발급 */
  login: (provider: Provider) =>
    http
      .post(`/api/auth/login/${provider.toLowerCase()}`)
      .then(res => tokenResponseSchema.parse(res.data)),

  /** POST /auth/logout — Redis refresh token 세션 제거 */
  logout: () => http.post<void>('/api/auth/logout').then(res => res.data),

  /** POST /auth/refresh — Access Token 재발급 */
  refresh: () =>
    http
      .post('/api/auth/refresh')
      .then(res =>
        z
          .object({ accessToken: z.string(), tokenType: z.string(), expiresIn: z.number() })
          .parse(res.data)
      ),
}

// ==============================
// User
// ==============================

export const userService = {
  /** GET /users/me — 내 정보 조회 */
  getMe: () => http.get('/api/users/me').then(res => userProfileSchema.parse(res.data)),

  /** POST /users/me — 프로필 최초 생성 (온보딩 완료 시) */
  createProfile: (data: UpdateUserProfileRequest) =>
    http.post('/api/users/me', data).then(res => updateUserProfileResponseSchema.parse(res.data)),

  /** PATCH /users/me — 프로필 부분 수정 */
  updateMe: (data: UpdateUserProfileRequest) =>
    http.patch('/api/users/me', data).then(res => userProfileSchema.parse(res.data)),

  /** POST /users/me/blog — 블로그 연동 */
  linkBlog: (data: { blogUrl: string; platform: string }) =>
    http.post('/api/users/me/blog', data).then(res => blogSchema.parse(res.data)),

  /** GET /users/nickname/check — 닉네임 중복 확인 */
  checkNickname: (nickname: string) =>
    http
      .get('/api/users/nickname/check', { params: { nickname } })
      .then(res => nicknameCheckSchema.parse(res.data)),

  /** GET /users/nickname/random — 랜덤 닉네임 생성 */
  randomNickname: () =>
    http
      .get('/api/users/nickname/random')
      .then(res => z.object({ nickname: z.string() }).parse(res.data)),

  /** DELETE /users/me — 회원 탈퇴 */
  deleteMe: () => http.delete<void>('/api/users/me').then(res => res.data),
}

// ==============================
// Feed
// ==============================

export const feedService = {
  /** GET /feed/hero — 히어로 배너 (비로그인/로그인/블로그연동 분기) */
  getHero: () => http.get('/feed/hero').then(res => feedHeroSchema.parse(res.data)),

  /** GET /feed/body — 메인 바디 (인기·마감임박·100%당첨) */
  getBody: () => http.get('/feed/body').then(res => feedBodySchema.parse(res.data)),
}

// ==============================
// Campaign
// ==============================

export const campaignService = {
  /** GET /campaigns — 공고 목록 (필터·정렬·페이지네이션) */
  getCampaigns: (params?: CampaignListParams) =>
    http.get('/campaigns', { params }).then(res => paginatedSchema(campaignSchema).parse(res.data)),

  /** GET /campaigns/{id} — 공고 상세 */
  getCampaign: (id: number) =>
    http.get(`/campaigns/${id}`).then(res => campaignDetailSchema.parse(res.data)),

  /** GET /campaigns/{id}/viewers — 실시간 조회수 (Redis) */
  getViewers: (id: number) =>
    http.get(`/campaigns/${id}/viewers`).then(res => campaignViewersSchema.parse(res.data)),

  /** GET /campaigns/{id}/related — 관련 공고 최대 3개 */
  getRelated: (id: number) =>
    http.get(`/campaigns/${id}/related`).then(res => z.array(campaignSchema).parse(res.data)),

  /** GET /campaigns/search — 공고 검색 */
  search: (keyword: string, params?: { page?: number; size?: number }) =>
    http
      .get('/campaigns/search', { params: { keyword, ...params } })
      .then(res => paginatedSchema(campaignSchema).parse(res.data)),

  /** GET /campaigns/popular — 인기 체험단 Top10 */
  getPopular: () =>
    http.get('/campaigns/popular').then(res => z.array(campaignSchema).parse(res.data)),

  /** GET /campaigns/guaranteed — 100% 당첨 공고 */
  getGuaranteed: () =>
    http.get('/campaigns/guaranteed').then(res => z.array(campaignSchema).parse(res.data)),

  /** GET /campaigns/closing-soon — 마감 임박 공고 */
  getClosingSoon: () =>
    http.get('/campaigns/closing-soon').then(res => z.array(campaignSchema).parse(res.data)),

  /** POST /campaigns/{id}/like — 좋아요 토글 */
  toggleLike: (id: number) =>
    http.post(`/campaigns/${id}/like`).then(res => campaignLikeSchema.parse(res.data)),

  /** GET /campaigns/{id}/likes/analysis — 좋아요 사용자 특성 분석 */
  getLikesAnalysis: (id: number) =>
    http
      .get(`/campaigns/${id}/likes/analysis`)
      .then(res => campaignLikesAnalysisSchema.parse(res.data)),
}

// ==============================
// My
// ==============================

export const myService = {
  /** GET /my/campaigns — 내 체험단 목록 */
  getCampaigns: (params?: { status?: string; page?: number; size?: number }) =>
    http.get('/my/campaigns', { params }).then(res => z.array(myCampaignSchema).parse(res.data)),

  /** GET /my/campaigns/{id} — 내 체험단 상세 (user_campaign_id 기준) */
  getCampaign: (id: number) =>
    http.get(`/my/campaigns/${id}`).then(res => myCampaignDetailSchema.parse(res.data)),

  /** GET /my/points — 포인트 잔액·거래 내역 */
  getPoints: (params?: { page?: number; size?: number }) =>
    http.get('/my/points', { params }).then(res => pointsResponseSchema.parse(res.data)),

  /** POST /my/points/withdraw — 포인트 출금 신청 (최소 5,000P) */
  withdraw: (data: WithdrawRequest) =>
    http.post('/my/points/withdraw', data).then(res => withdrawResponseSchema.parse(res.data)),

  /** GET /my/recent-views — 최근 본 공고 목록 */
  getRecentViews: () =>
    http.get('/my/recent-views').then(res => z.array(campaignSchema).parse(res.data)),

  /** GET /my/likes — 찜한 공고 목록 */
  getLikes: (params?: { page?: number; size?: number }) =>
    http.get('/my/likes', { params }).then(res => z.array(campaignSchema).parse(res.data)),
}

// ==============================
// Onboarding
// ==============================

export const onboardingService = {
  /** POST /onboarding/response — 온보딩 단계별 응답 저장 */
  saveResponse: (data: OnboardingResponseRequest) =>
    http
      .post('/onboarding/response', data)
      .then(res => onboardingResponseResultSchema.parse(res.data)),

  /** GET /onboarding/recommendations — 온보딩 기반 추천 공고 */
  getRecommendations: (sessionId: string) =>
    http
      .get('/onboarding/recommendations', { params: { sessionId } })
      .then(res => onboardingRecommendationsSchema.parse(res.data)),
}

// ==============================
// Blog Analysis
// ==============================

export const blogAnalysisService = {
  /** POST /blog/analyze — 블로그 분석 요청 (RabbitMQ Queue 발행, 202 비동기) */
  analyze: (data: AnalyzeRequest) =>
    http.post('/blog/analyze', data).then(res => analyzeJobResponseSchema.parse(res.data)),

  /** GET /blog/analysis/{documentId} — 분석 결과 조회 */
  getAnalysis: (documentId: number) =>
    http
      .get(`/blog/analysis/${documentId}`)
      .then(res => blogAnalysisResponseSchema.parse(res.data)),

  /** GET /blog/analysis/history — 분석 이력 (Free: 최근 3건, Premium: 전체) */
  getHistory: (params?: { page?: number; size?: number }): Promise<AnalysisHistoryResponse> =>
    http
      .get('/blog/analysis/history', { params })
      .then(res => analysisHistoryResponseSchema.parse(res.data)),

  /** GET /blog/analysis/{analysisId}/recommendations — AI 추천 공고 최대 8개 */
  getRecommendations: (analysisId: number): Promise<AnalysisRecommendationsResponse> =>
    http
      .get(`/blog/analysis/${analysisId}/recommendations`)
      .then(res => analysisRecommendationsResponseSchema.parse(res.data)),

  /** GET /blog/analysis/{analysisId}/bloggers — 인기 블로거 Top3 */
  getBloggers: (analysisId: number): Promise<PopularBloggersResponse> =>
    http
      .get(`/blog/analysis/${analysisId}/bloggers`)
      .then(res => popularBloggersResponseSchema.parse(res.data)),

  /** POST /blog/chat — AI 챗봇 메시지 */
  chat: (data: ChatRequest) =>
    http.post('/blog/chat', data).then(res => chatResponseSchema.parse(res.data)),

  /** DELETE /blog/chat/{sessionId} — 챗 세션 초기화 */
  deleteChat: (sessionId: string) =>
    http.delete<void>(`/blog/chat/${sessionId}`).then(res => res.data),
}
