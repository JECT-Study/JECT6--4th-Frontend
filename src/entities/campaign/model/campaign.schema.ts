import { z } from 'zod'

import {
  CampaignCategory,
  CampaignChannel,
  CampaignPlatform,
  CampaignSort,
  CampaignStatus,
  CampaignType,
} from './campaign.enums'

// 공통 페이지네이션 응답
export const paginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    content: z.array(itemSchema),
    page: z.number(),
    size: z.number(),
    totalElements: z.number(),
    hasNext: z.boolean(),
  })

export type Paginated<T> = {
  content: T[]
  page: number
  size: number
  totalElements: number
  hasNext: boolean
}

// 공고 목록 아이템
export const campaignSchema = z.object({
  id: z.number(),
  title: z.string(),
  brandName: z.string(),
  category: CampaignCategory,
  type: CampaignType,
  channel: CampaignChannel,
  providedContent: z.string(),
  recruitCount: z.number(),
  applyCount: z.number(),
  applyEndDate: z.string(),
  isGuaranteed: z.boolean(),
  thumbnailUrl: z.string().nullable(),
})
export type Campaign = z.infer<typeof campaignSchema>

// 공고 상세
export const campaignDetailSchema = campaignSchema.extend({
  description: z.string().nullable(),
  regionDepth1: z.string().nullable(),
  regionDepth2: z.string().nullable(),
  applyStartDate: z.string(),
  announceDate: z.string(),
  reviewDeadline: z.string(),
  status: CampaignStatus,
  sourcePlatform: CampaignPlatform.optional(),
  isLiked: z.boolean(),
  viewerCount: z.number(),
})
export type CampaignDetail = z.infer<typeof campaignDetailSchema>

// GET /campaigns 쿼리 파라미터
export const campaignListParamsSchema = z.object({
  category: CampaignCategory.optional(),
  type: CampaignType.optional(),
  region: z.string().optional(),
  channel: CampaignChannel.optional(),
  sort: CampaignSort.optional(),
  page: z.number().optional(),
  size: z.number().optional(),
})
export type CampaignListParams = z.infer<typeof campaignListParamsSchema>

// GET /campaigns/{id}/viewers 응답
export const campaignViewersSchema = z.object({
  campaignId: z.number(),
  viewerCount: z.number(),
})
export type CampaignViewers = z.infer<typeof campaignViewersSchema>

// GET /campaigns/{id}/likes/analysis 응답
export const campaignLikesAnalysisSchema = z.object({
  likeCount: z.number(),
  analysisMessage: z.string(),
})
export type CampaignLikesAnalysis = z.infer<typeof campaignLikesAnalysisSchema>

// POST /campaigns/{id}/like 응답
export const campaignLikeSchema = z.object({
  liked: z.boolean(),
  likeCount: z.number(),
})
export type CampaignLike = z.infer<typeof campaignLikeSchema>
