import { z } from 'zod'

export const PlanType = z.enum(['FREE', 'BASIC', 'PRO'])
export type PlanType = z.infer<typeof PlanType>

export const SubscriptionStatus = z.enum(['ACTIVE', 'EXPIRED', 'CANCELLED'])
export type SubscriptionStatus = z.infer<typeof SubscriptionStatus>
