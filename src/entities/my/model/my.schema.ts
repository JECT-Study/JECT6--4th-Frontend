import { z } from 'zod'

import { PointTransactionType, UserCampaignStatus, WithdrawStatus } from './my.enums'

// 마이페이지 공고 요약의 최근 지원 아이템
export const myRecentAppliedCampaignSummarySchema = z.object({
  id: z.number(),
  campaignId: z.number(),
  title: z.string(),
  brandName: z.string(),
  status: UserCampaignStatus,
  appliedAt: z.string(),
  applyEndDate: z.string(),
})
export type MyRecentAppliedCampaignSummary = z.infer<typeof myRecentAppliedCampaignSummarySchema>

// GET /my/campaigns 응답
export const myCampaignSummarySchema = z.object({
  recentViewCount: z.number(),
  likedCount: z.number(),
  recentAppliedCampaign: z.array(myRecentAppliedCampaignSummarySchema),
})
export type MyCampaignSummary = z.infer<typeof myCampaignSummarySchema>

// GET /my/campaigns 목록 아이템
export const myCampaignSchema = z.object({
  id: z.number(),
  campaignId: z.number(),
  campaignTitle: z.string(),
  brandName: z.string(),
  status: UserCampaignStatus,
  appliedAt: z.string(),
  reviewDeadline: z.string().nullable(),
  dDay: z.number().nullable(),
  rewardAmount: z.number().nullable(),
  isUrgent: z.boolean(),
})
export type MyCampaign = z.infer<typeof myCampaignSchema>

// GET /my/campaigns/{id} 상세
export const myCampaignDetailSchema = myCampaignSchema
export type MyCampaignDetail = z.infer<typeof myCampaignDetailSchema>

// GET /my/campaigns/recent-applies 목록 아이템
export const myRecentAppliedCampaignSchema = z.object({
  id: z.number(),
  campaignId: z.number(),
  campaignTitle: z.string(),
  brandName: z.string(),
  appliedAt: z.string(),
  applyEndDate: z.string(),
})
export type MyRecentAppliedCampaign = z.infer<typeof myRecentAppliedCampaignSchema>

export const simplePageSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    content: z.array(itemSchema),
    totalElements: z.number(),
    totalPages: z.number(),
    size: z.number(),
    number: z.number(),
  })

export type SimplePage<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
}

// 포인트 거래 내역 아이템
export const pointTransactionSchema = z.object({
  id: z.number(),
  type: PointTransactionType,
  amount: z.number(),
  description: z.string().nullable(),
  balanceAfter: z.number(),
  createdAt: z.string(),
})
export type PointTransaction = z.infer<typeof pointTransactionSchema>

// GET /my/points 응답
export const pointsResponseSchema = z.object({
  balance: z.number(),
  transactions: z.array(pointTransactionSchema),
  totalElements: z.number().optional(),
})
export type PointsResponse = z.infer<typeof pointsResponseSchema>

// POST /my/points/withdraw 요청
export const withdrawRequestSchema = z.object({
  amount: z.number(),
  bankName: z.string(),
  accountNumber: z.string(),
  accountHolder: z.string(),
})
export type WithdrawRequest = z.infer<typeof withdrawRequestSchema>

// POST /my/points/withdraw 응답
export const withdrawResponseSchema = z.object({
  transactionId: z.number(),
  amount: z.number(),
  status: WithdrawStatus,
  bankName: z.string(),
  maskedAccountNumber: z.string(),
  requestedAt: z.string(),
})
export type WithdrawResponse = z.infer<typeof withdrawResponseSchema>

// GET /my/ai-history 응답
export const aiHistoryItemSchema = z.object({
  historyId: z.number(),
  diagnosisDate: z.string(),
})
export const aiHistorySchema = z.object({
  aiHistory: z
    .array(aiHistoryItemSchema)
    .nullish()
    .transform(v => v ?? []),
})
export type AiHistoryItem = z.infer<typeof aiHistoryItemSchema>
export type AiHistory = z.infer<typeof aiHistorySchema>
