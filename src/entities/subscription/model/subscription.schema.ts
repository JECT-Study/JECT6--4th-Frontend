import { z } from 'zod'

import { PlanType, SubscriptionStatus } from './subscription.enums'

// GET /my/subscription 응답
export const subscriptionSchema = z.object({
  planType: PlanType,
  status: SubscriptionStatus,
  startedAt: z.string(),
  expiresAt: z.string().nullable(),
  autoRenew: z.boolean(),
  aiCreditRemaining: z.number(),
  aiCreditTotal: z.number(),
})
export type Subscription = z.infer<typeof subscriptionSchema>

// POST /my/subscription/upgrade 요청
export const upgradeSubscriptionSchema = z.object({
  planType: PlanType,
  paymentMethod: z.string(),
  paymentToken: z.string(),
})
export type UpgradeSubscriptionRequest = z.infer<typeof upgradeSubscriptionSchema>

// DELETE /my/subscription 응답
export const cancelSubscriptionResponseSchema = z.object({
  status: SubscriptionStatus,
  expiresAt: z.string().nullable(),
})
export type CancelSubscriptionResponse = z.infer<typeof cancelSubscriptionResponseSchema>
