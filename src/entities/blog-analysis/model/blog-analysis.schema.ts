import { z } from 'zod'

import { CampaignCategory } from '@/entities/campaign'

import { AnalysisStatus, BlogMetricKey, InsightType } from './blog-analysis.enums'

const unknownRecordSchema = z.record(z.string(), z.unknown())

// POST /blog/analyze 요청
export const analyzeRequestSchema = z.object({
  blogId: z.number().optional(),
  documentId: z.number().optional(),
  analysisMode: z.enum(['FULL_BLOG', 'POST', 'full_blog', 'post']).optional(),
  forceRefresh: z.boolean().optional(),
})
export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>

// POST /blog/analyze 응답 (202 Accepted)
export const analyzeJobResponseSchema = z.object({
  documentId: z.number(),
  status: AnalysisStatus,
  message: z.string(),
  aiCreditRemaining: z.number().nullable().optional(),
  correlationId: z.string().optional(),
  batchId: z.string().optional(),
  cached: z.boolean().optional(),
  cachedJobId: z.number().optional(),
})
export type AnalyzeJobResponse = z.infer<typeof analyzeJobResponseSchema>

// 백엔드 metrics는 { name, score } 형태로 내려온다(레거시 { key, label, color } 도 허용).
export const analysisMetricSchema = z.object({
  key: BlogMetricKey.optional(),
  label: z.string().optional(),
  name: z.string().optional(),
  score: z.number().min(0).max(100),
  color: z.string().optional(),
})
export type AnalysisMetric = z.infer<typeof analysisMetricSchema>

export const categoryFitSchema = z.object({
  category: CampaignCategory,
  keyword: z.string(),
  activityScore: z.number().int().min(0),
  fitnessScore: z.number().min(0).max(100),
  message: z.string(),
})
export type CategoryFit = z.infer<typeof categoryFitSchema>

export const analysisInsightCardSchema = z.object({
  id: z.string(),
  type: InsightType,
  label: z.string(),
  title: z.string(),
  description: z.string(),
  actionLabel: z.string(),
  metricKey: BlogMetricKey,
})
export type AnalysisInsightCard = z.infer<typeof analysisInsightCardSchema>

// LLM 분석 결과
export const analysisResultSchema = z.object({
  summary: z.string(),
  keyTopics: z.array(z.string()),
  tone: z.string(),
  targetAudience: z.string(),
  suggestions: z.array(z.string()),
  overallScore: z.number().optional(),
  percentile: z.number().optional(),
  blogType: z.string().optional(),
  strengthSummary: z.string().optional(),
  weaknessSummary: z.string().optional(),
  topCategories: z.array(unknownRecordSchema).optional(),
  metrics: z.array(analysisMetricSchema).optional(),
  categoryFits: z.array(categoryFitSchema).optional(),
  strengthCard: analysisInsightCardSchema.optional(),
  weaknessCard: analysisInsightCardSchema.optional(),
})
export type AnalysisResult = z.infer<typeof analysisResultSchema>

// GET /blog/analysis/{documentId} 응답
export const blogAnalysisResponseSchema = z.object({
  documentId: z.number(),
  // 백엔드는 소문자(예: 'completed')로 내려주기도 하므로 대문자로 정규화한다.
  status: z.preprocess(v => (typeof v === 'string' ? v.toUpperCase() : v), AnalysisStatus),
  analysis: analysisResultSchema.nullable().optional(),
  analyzedAt: z.string().nullable().optional(),
  analysisId: z.number().optional(),
  userNickname: z.string().optional(),
  blogName: z.string().optional(),
  blogType: z.string().optional(),
  primaryCategory: CampaignCategory.optional(),
  percentile: z.number().int().min(0).max(100).optional(),
})
export type BlogAnalysisResponse = z.infer<typeof blogAnalysisResponseSchema>

// GET /blog/analysis/history 아이템
export const analysisHistoryItemSchema = z.object({
  id: z.number(),
  channelUrl: z.string().nullable(),
  analyzedAt: z.string(),
  isLocked: z.boolean(),
})
export type AnalysisHistoryItem = z.infer<typeof analysisHistoryItemSchema>

// GET /blog/analysis/history 응답
export const analysisHistoryResponseSchema = z.object({
  content: z.array(analysisHistoryItemSchema),
  totalElements: z.number(),
  visibleCount: z.number(),
})
export type AnalysisHistoryResponse = z.infer<typeof analysisHistoryResponseSchema>

// GET /blog/analysis/{id}/recommendations 공고 아이템
export const recommendedCampaignSchema = z.object({
  id: z.number(),
  title: z.string(),
  category: CampaignCategory.optional(),
  thumbnailUrl: z.string().optional(),
  applyEndDate: z.string().optional(),
  fitnessScore: z.number().default(0),
  selectionScore: z.number().default(0),
  reasonMessage: z.string().default(''),
})
export type RecommendedCampaign = z.infer<typeof recommendedCampaignSchema>

// GET /blog/analysis/{id}/recommendations 응답
export const analysisRecommendationsResponseSchema = z.object({
  analysisId: z.number(),
  campaigns: z.array(recommendedCampaignSchema),
})
export type AnalysisRecommendationsResponse = z.infer<typeof analysisRecommendationsResponseSchema>

// GET /blog/analysis/{id}/bloggers 아이템
export const popularBloggerSchema = z.object({
  nickname: z.string(),
  overallScore: z.number(),
  profileUrl: z.string(),
})
export type PopularBlogger = z.infer<typeof popularBloggerSchema>

// GET /blog/analysis/{id}/bloggers 응답
export const popularBloggersResponseSchema = z.object({
  category: z.string(),
  bloggers: z.array(popularBloggerSchema),
})
export type PopularBloggersResponse = z.infer<typeof popularBloggersResponseSchema>

// POST /blog/chat 요청
export const chatRequestSchema = z.object({
  sessionId: z.string(),
  documentId: z.number(),
  message: z.string(),
})
export type ChatRequest = z.infer<typeof chatRequestSchema>

// POST /blog/chat 응답
export const chatResponseSchema = z.object({
  sessionId: z.string(),
  reply: z.string(),
  tokensUsed: z.number(),
  tokensRemaining: z.number(),
})
export type ChatResponse = z.infer<typeof chatResponseSchema>

// POST /blog/diagnosis 요청
export const diagnoseRequestSchema = z.object({
  documentId: z.number(),
})
export type DiagnoseRequest = z.infer<typeof diagnoseRequestSchema>

// POST /blog/diagnosis 응답
export const diagnoseResponseSchema = z.object({
  id: z.number(),
  userId: z.number().optional(),
  metrics: unknownRecordSchema,
  categoryFit: z.array(z.unknown()).optional(),
  strengths: z.array(z.string()),
  weaknesses: z.array(z.string()),
  hasEmbedding: z.boolean().optional(),
})
export type DiagnoseResponse = z.infer<typeof diagnoseResponseSchema>

// GET /blog/diagnosis/quota 응답
export const quotaResponseSchema = z.object({
  used: z.number(),
  limit: z.number(),
  remaining: z.number(),
  resetAt: z.string().optional(),
})
export type QuotaResponse = z.infer<typeof quotaResponseSchema>
