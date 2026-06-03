import { z } from 'zod'

import { PointTransactionType, UserCampaignStatus, WithdrawStatus } from './my.enums'

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
  rewardAmount: z.number(),
  rewardStatus: z.string(),
})
export type MyCampaign = z.infer<typeof myCampaignSchema>

// GET /my/campaigns/{id} 상세
export const myCampaignDetailSchema = myCampaignSchema.extend({
  thumbnailUrl: z.string().nullable(),
  reviewUrl: z.string().nullable(),
  selectedAt: z.string().nullable(),
  completedAt: z.string().nullable(),
})
export type MyCampaignDetail = z.infer<typeof myCampaignDetailSchema>

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
  page: z.number(),
  totalElements: z.number(),
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
  accountNumber: z.string(),
  requestedAt: z.string(),
})
export type WithdrawResponse = z.infer<typeof withdrawResponseSchema>
