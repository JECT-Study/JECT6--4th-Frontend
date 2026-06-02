import { z } from 'zod'

import { campaignSchema } from '@/entities/campaign'

// POST /onboarding/response 요청
export const onboardingResponseRequestSchema = z.object({
  sessionId: z.string(),
  step: z.union([z.literal(1), z.literal(2), z.literal(3), z.literal(4)]),
  answer: z.string(),
})
export type OnboardingResponseRequest = z.infer<typeof onboardingResponseRequestSchema>

// POST /onboarding/response 응답
export const onboardingResponseResultSchema = z.object({
  sessionId: z.string(),
  step: z.number(),
  isComplete: z.boolean(),
  nextStep: z.number().nullable(),
})
export type OnboardingResponseResult = z.infer<typeof onboardingResponseResultSchema>

// GET /onboarding/recommendations 응답
export const onboardingRecommendationsSchema = z.object({
  sessionId: z.string(),
  campaigns: z.array(campaignSchema),
})
export type OnboardingRecommendations = z.infer<typeof onboardingRecommendationsSchema>
