import { z } from 'zod'

import { campaignSchema } from '@/entities/campaign'
import { CampaignCategory } from '@/entities/campaign/model/campaign.enums'

import { AnalysisStatus, BlogMetricKey, InsightType, ReasonType } from './blog-analysis.enums'

// POST /blog/analyze 요청
export const analyzeRequestSchema = z.object({
  blogUrl: z.string().url(),
})
export type AnalyzeRequest = z.infer<typeof analyzeRequestSchema>

// POST /blog/analyze 응답 (202 Accepted)
export const analyzeJobResponseSchema = z.object({
  documentId: z.number(),
  status: AnalysisStatus,
  message: z.string(),
  aiCreditRemaining: z.number(),
})
export type AnalyzeJobResponse = z.infer<typeof analyzeJobResponseSchema>

export const analysisMetricSchema = z.object({
  key: BlogMetricKey,
  label: z.string(),
  score: z.number().min(0).max(100),
  color: z.string(),
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
  metrics: z.array(analysisMetricSchema),
  categoryFits: z.array(categoryFitSchema),
  strengthCard: analysisInsightCardSchema,
  weaknessCard: analysisInsightCardSchema,
})
export type AnalysisResult = z.infer<typeof analysisResultSchema>

// GET /blog/analysis/{documentId} 응답
export const blogAnalysisResponseSchema = z.object({
  analysisId: z.number(),
  documentId: z.number(),
  userNickname: z.string(),
  blogName: z.string(),
  blogType: z.string(),
  primaryCategory: CampaignCategory,
  percentile: z.number().int().min(0).max(100),
  status: AnalysisStatus,
  analysis: analysisResultSchema.nullable(),
  analyzedAt: z.string().nullable(),
})
export type BlogAnalysisResponse = z.infer<typeof blogAnalysisResponseSchema>

// GET /blog/analysis/history 아이템
export const analysisHistoryItemSchema = z.object({
  id: z.number(),
  channelUrl: z.string(),
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
export const recommendedCampaignSchema = campaignSchema.extend({
  fitnessScore: z.number(),
  selectionScore: z.number(),
  reasonType: ReasonType,
  reasonMessage: z.string(),
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
  id: z.number(),
  nickname: z.string(),
  blogName: z.string(),
  handle: z.string(),
  badge: z.string(),
  postTitle: z.string(),
  postUrl: z.string().url(),
  blogUrl: z.string().url(),
  likeCount: z.number(),
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
