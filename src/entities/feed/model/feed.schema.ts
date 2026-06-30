import { z } from 'zod'

import { campaignSchema } from '@/entities/campaign'

// 히어로 배너 타입
export const HeroType = z.enum(['ANONYMOUS', 'LOGGED_IN', 'BLOG_LINKED', 'BANNER'])
export type HeroType = z.infer<typeof HeroType>

// GET /feed/hero 응답
export const feedHeroSchema = z.object({
  type: HeroType,
  message: z.string(),
  actionLabel: z.string(),
})
export type FeedHero = z.infer<typeof feedHeroSchema>

// GET /feed/body 응답
export const feedBodySchema = z.object({
  popular: z.array(campaignSchema),
  closingSoon: z.array(campaignSchema),
  guaranteed: z.array(campaignSchema),
})
export type FeedBody = z.infer<typeof feedBodySchema>

// AI 추천 공고 아이템 (GET /feed/ai-recommendations)
export const aiRecommendedCampaignSchema = campaignSchema.extend({
  fitnessScore: z.number(),
  reason: z.string(),
})
export type AiRecommendedCampaign = z.infer<typeof aiRecommendedCampaignSchema>

export const aiRecommendationsSchema = z.object({
  campaigns: z.array(aiRecommendedCampaignSchema),
})
export type AiRecommendations = z.infer<typeof aiRecommendationsSchema>

// 블로거 성공 사례 아이템 (GET /feed/blogger-stories)
export const bloggerStorySchema = z.object({
  bloggerNickname: z.string(),
  campaignTitle: z.string(),
  story: z.string(),
})
export type BloggerStory = z.infer<typeof bloggerStorySchema>

export const bloggerStoriesSchema = z.object({
  stories: z.array(bloggerStorySchema),
})
export type BloggerStories = z.infer<typeof bloggerStoriesSchema>
