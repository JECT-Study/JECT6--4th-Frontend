import { z } from 'zod'

import { CampaignCategory, CampaignChannel } from '@/entities/campaign'

// POST /onboarding/response 요청
export const onboardingResponseRequestSchema = z.object({
  sessionId: z.string().optional(),
  step: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
    z.literal(5),
    z.literal(6),
  ]),
  answer: z.string().optional(),
  activityTypes: z.array(CampaignChannel).optional(),
  regionIds: z.array(z.number()).optional(),
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

// GET /onboarding/recommendations 응답 캠페인 요약
export const onboardingCampaignSummarySchema = z.object({
  id: z.number(),
  title: z.string(),
  category: CampaignCategory,
  thumbnailUrl: z.string().nullable(),
  applyEndDate: z.string(),
})
export type OnboardingCampaignSummary = z.infer<typeof onboardingCampaignSummarySchema>

// GET /onboarding/recommendations 응답
export const onboardingRecommendationsSchema = z.object({
  sessionId: z.string(),
  campaigns: z.array(onboardingCampaignSummarySchema),
})
export type OnboardingRecommendations = z.infer<typeof onboardingRecommendationsSchema>
