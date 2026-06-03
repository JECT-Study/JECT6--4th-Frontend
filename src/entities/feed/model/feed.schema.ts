import { z } from 'zod'

import { campaignSchema } from '@/entities/campaign'

// 히어로 배너 타입
export const HeroType = z.enum(['POPULAR', 'ACTIVITY_BASED', 'AI_MATCHED'])
export type HeroType = z.infer<typeof HeroType>

// GET /feed/hero 응답
export const feedHeroSchema = z.object({
  type: HeroType,
  campaigns: z.array(campaignSchema),
})
export type FeedHero = z.infer<typeof feedHeroSchema>

// 피드 섹션 타입
export const FeedSectionType = z.enum([
  'AI_MATCHED_CAMPAIGNS',
  'LEVEL_UP_QUEST',
  'KEYWORD_MATCHED',
  'PREMIUM_PROMOTION',
  'RECENT_LIKED',
  'REALTIME_POPULAR',
  'ACTIVITY_CATEGORY',
  'BLOG_GROWTH_BANNER',
  'AI_BLOG_DIAGNOSIS',
  'SIGNUP_BANNER',
  'CLOSING_SOON',
])
export type FeedSectionType = z.infer<typeof FeedSectionType>

// 피드 섹션 아이템
export const feedSectionSchema = z.object({
  section: z.number(),
  type: FeedSectionType,
  title: z.string(),
  campaigns: z.array(campaignSchema).optional(),
  bannerUrl: z.string().optional(),
})
export type FeedSection = z.infer<typeof feedSectionSchema>

// GET /feed/body 응답
export const feedBodySchema = z.object({
  sections: z.array(feedSectionSchema),
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
