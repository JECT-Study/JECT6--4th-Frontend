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
  z
    .object({
      content: z.array(itemSchema),
      number: z.number().optional(),
      size: z.number().optional(),
      totalElements: z.number(),
      totalPages: z.number().optional(),
      sort: z.unknown().optional(),
      pageable: z.unknown().optional(),
      first: z.boolean().optional(),
      numberOfElements: z.number().optional(),
      last: z.boolean().optional(),
      empty: z.boolean().optional(),
      hasNext: z.boolean().optional(),
    })
    .transform(page => ({
      ...page,
      hasNext: page.hasNext ?? (typeof page.last === 'boolean' ? !page.last : undefined),
    }))

export type Paginated<T> = {
  content: T[]
  number?: number
  size?: number
  totalElements: number
  totalPages?: number
  sort?: unknown
  pageable?: unknown
  first?: boolean
  numberOfElements?: number
  last?: boolean
  empty?: boolean
  hasNext?: boolean
}

// 이미지
export const campaignImageSchema = z.object({
  url: z.string(),
  altText: z.string().optional(),
})
export type CampaignImage = z.infer<typeof campaignImageSchema>

// 위치 정보
export const campaignLocationSchema = z
  .object({
    regionDepth1: z.string().nullable().optional(),
    regionDepth2: z.string().nullable().optional(),
    address: z.string().nullable(),
    lat: z.number().nullable().optional(),
    lng: z.number().nullable().optional(),
    latitude: z.number().nullable().optional(),
    longitude: z.number().nullable().optional(),
  })
  .transform(location => ({
    ...location,
    latitude: location.latitude ?? location.lat ?? null,
    longitude: location.longitude ?? location.lng ?? null,
  }))
export type CampaignLocation = z.infer<typeof campaignLocationSchema>

// 링크
export const campaignLinkSchema = z
  .union([
    z.string(),
    z.object({
      title: z.string().optional(),
      url: z.string(),
    }),
  ])
  .transform(link => (typeof link === 'string' ? { url: link } : link))

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
  region: z.string().nullish(),
  parentRegionId: z.number().nullish(),
  childRegionId: z.number().nullish(),
  status: CampaignStatus.optional(),
  viewCount: z.number().optional(),
  sourcePlatform: z.string().optional(),
  liked: z.boolean().optional(),
})
export type Campaign = z.infer<typeof campaignSchema>

// 공고 상세
export const campaignDetailSchema = campaignSchema.extend({
  applyStartDate: z.string().nullish(),
  announceDate: z.string().nullish(),
  purchaseStartDate: z.string().nullish(),
  purchaseEndDate: z.string().nullish(),
  reviewDeadline: z.string().nullish(),
  mission: z.string().nullish(),
  searchKeywords: z.string().nullish(),
  sourceUrl: z.string().nullish(),
  location: campaignLocationSchema.nullable().optional(),
  campaignDetail: campaignDetailInfoSchema.nullable().optional(),
  status: CampaignStatus.optional(),
})
export type CampaignDetail = z.infer<typeof campaignDetailSchema>

// GET /campaigns 쿼리 파라미터
export const campaignListParamsSchema = z.object({
  categories: z.array(CampaignCategory).optional(),
  category: CampaignCategory.optional(),
  type: CampaignType.optional(),
  region: z.string().optional(),
  parentRegionId: z.number().optional(),
  childRegionId: z.number().optional(),
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
