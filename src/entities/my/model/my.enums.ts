import { z } from 'zod'

export const UserCampaignStatus = z.enum([
  'LIKED',
  'VIEWED',
  'APPLIED',
  'REVIEWING',
  'SELECTED',
  'COMPLETED',
])
export type UserCampaignStatus = z.infer<typeof UserCampaignStatus>

export const PointTransactionType = z.enum(['EARN', 'SPEND', 'REFUND', 'WITHDRAW'])
export type PointTransactionType = z.infer<typeof PointTransactionType>

export const WithdrawStatus = z.enum(['PENDING', 'COMPLETED', 'FAILED'])
export type WithdrawStatus = z.infer<typeof WithdrawStatus>
