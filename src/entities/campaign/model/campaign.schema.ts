import { z } from 'zod'

import {
  CampaignCategory,
  CampaignChannel,
  CampaignSort,
  CampaignStatus,
  CampaignType,
} from './campaign.enums'

// 공통 페이지네이션 응답
export const paginatedSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    content: z.array(itemSchema),
    number: z.number().optional(),
    page: z.number().optional(),
    size: z.number().optional(),
    totalElements: z.number(),
    totalPages: z.number().optional(),
    hasNext: z.boolean().optional(),
  })

export type Paginated<T> = {
  content: T[]
  number?: number
  page?: number
  size?: number
  totalElements: number
  totalPages?: number
  hasNext?: boolean
}

// 이미지
export const campaignImageSchema = z.object({
  url: z.string(),
  altText: z.string().optional(),
})
export type CampaignImage = z.infer<typeof campaignImageSchema>

// 위치 정보
export const campaignLocationSchema = z.object({
  regionDepth1: z.string().nullable(),
  regionDepth2: z.string().nullable(),
  address: z.string().nullable(),
  latitude: z.number().nullable(),
  longitude: z.number().nullable(),
})
export type CampaignLocation = z.infer<typeof campaignLocationSchema>

// 링크
export const campaignLinkSchema = z.object({
  title: z.string().optional(),
  url: z.string(),
})

// 체험단 상세 정보
export const campaignDetailInfoSchema = z.object({
  searchKeywords: z.array(z.string()),
  links: z.array(campaignLinkSchema),
  additionalNotice: z.string().nullable(),
  caution: z.string().nullable(),
  mission: z.string().nullable(),
})
export type CampaignDetailInfo = z.infer<typeof campaignDetailInfoSchema>

// 공고 목록 아이템
export const campaignSchema = z.object({
  id: z.number(),
  title: z.string(),
  brandName: z.string().optional(),
  category: CampaignCategory.optional(),
  type: CampaignType.optional(),
  channel: CampaignChannel.optional(),
  thumbnailUrl: z.string().optional(),
  images: z.array(campaignImageSchema).optional(),
  providedContent: z.string().optional(),
  recruitCount: z.number().optional(),
  applyCount: z.number().optional(),
  applyEndDate: z.string().optional(),
  isGuaranteed: z.boolean().optional(),
  region: z.string().optional(),
  status: CampaignStatus.optional(),
  viewCount: z.number().optional(),
  sourcePlatform: z.string().optional(),
})
export type Campaign = z.infer<typeof campaignSchema>

// 공고 상세
export const campaignDetailSchema = campaignSchema.extend({
  applyStartDate: z.string().optional(),
  announceDate: z.string().optional(),
  reviewDeadline: z.string().optional(),
  mission: z.string().optional(),
  sourceUrl: z.string().optional(),
  location: campaignLocationSchema.nullable().optional(),
  campaignDetail: campaignDetailInfoSchema.nullable().optional(),
  status: CampaignStatus,
  isLiked: z.boolean().optional(),
  viewerCount: z.number().optional(),
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
  count: z.number(),
})
export type CampaignViewers = z.infer<typeof campaignViewersSchema>

// GET /campaigns/{id}/likes/analysis 응답
export const campaignLikesAnalysisSchema = z.object({
  campaignId: z.number().optional(),
  likeCount: z.number(),
  analyzed: z.boolean().optional(),
  topCategories: z.array(z.object({ category: z.string(), count: z.number() })).optional(),
  topKeywords: z.array(z.string()).optional(),
})
export type CampaignLikesAnalysis = z.infer<typeof campaignLikesAnalysisSchema>

// POST /campaigns/{id}/like 응답
export const campaignLikeSchema = z.object({
  liked: z.boolean(),
  likeCount: z.number(),
})
export type CampaignLike = z.infer<typeof campaignLikeSchema>
