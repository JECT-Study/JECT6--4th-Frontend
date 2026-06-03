import { z } from 'zod'

export const UserCampaignStatus = z.enum([
  'APPLIED',
  'REVIEWING',
  'SELECTED',
  'REJECTED',
  'COMPLETED',
])
export type UserCampaignStatus = z.infer<typeof UserCampaignStatus>

export const PointTransactionType = z.enum(['EARN', 'SPEND', 'REFUND'])
export type PointTransactionType = z.infer<typeof PointTransactionType>

export const WithdrawStatus = z.enum(['PENDING', 'COMPLETED', 'FAILED'])
export type WithdrawStatus = z.infer<typeof WithdrawStatus>
