import { z } from 'zod'

import { blogSchema } from './blog.schema'
import {
  InterestCategory,
  Provider,
  SubscriptionType,
  UserChannel,
  UserGrade,
  UserRole,
  BlogPlatform,
} from './user.enums'

// users 테이블 기준 DB 엔티티
export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  role: UserRole,
  pointBalance: z.number(),
  isOnboardingCompleted: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
export type User = z.infer<typeof userSchema>

// GET /users/me 응답
export const userProfileSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  provider: Provider,
  interestCategories: z.array(InterestCategory),
  channels: z.array(UserChannel),
  regions: z.array(z.string()),
  grade: UserGrade,
  subscriptionType: SubscriptionType,
  aiCreditRemaining: z.number(),
  pointBalance: z.number(),
  blog: blogSchema.nullable(),
  createdAt: z.string(),
})
export type UserProfile = z.infer<typeof userProfileSchema>

// PATCH /users/me 요청
export const updateUserProfileSchema = z.object({
  nickname: z.string().optional(),
  interestCategories: z.array(InterestCategory).optional(),
  channels: z.array(UserChannel).optional(),
  regions: z.array(z.string()).optional(),
})
export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileSchema>

// POST /users/me/blog 요청
export const blogLinkSchema = z.object({
  blogUrl: z.string(),
  platform: BlogPlatform,
})
export type BlogLinkRequest = z.infer<typeof blogLinkSchema>
