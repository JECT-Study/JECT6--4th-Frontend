import { z } from 'zod'

import { blogSchema } from './blog.schema'
import { InterestCategory, UserChannel, UserRole } from './user.enums'

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

// 활동 채널 아이템
export const activityChannelSchema = z.object({
  id: z.number(),
  activityType: UserChannel,
  url: z.string(),
})
export type ActivityChannel = z.infer<typeof activityChannelSchema>

// GET /users/me 응답
export const userProfileSchema = z
  .object({
    id: z.number(),
    nickname: z.string().nullable(),
    profileCompleted: z.boolean().optional(),
    isProfileCompleted: z.boolean().optional(),
    isOnboardingCompleted: z.boolean().optional(),
    categoryTypes: z
      .array(InterestCategory)
      .nullish()
      .transform(value => value ?? []),
    activityTypes: z
      .array(UserChannel)
      .nullish()
      .transform(value => value ?? []),
    regionIds: z
      .array(z.number())
      .nullish()
      .transform(value => value ?? []),
    blogs: z
      .array(blogSchema)
      .nullish()
      .transform(value => value ?? []),
  })
  .transform(({ isOnboardingCompleted, isProfileCompleted, profileCompleted, ...profile }) => ({
    ...profile,
    profileCompleted: profileCompleted ?? isProfileCompleted ?? isOnboardingCompleted ?? false,
  }))
export type UserProfile = z.infer<typeof userProfileSchema>

// PATCH /users/me 요청
export const updateUserProfileSchema = z.object({
  nickname: z.string().optional(),
  categoryTypes: z.array(InterestCategory).optional(),
  activityTypes: z.array(UserChannel).optional(),
  regionIds: z.array(z.number()).optional(),
})
export type UpdateUserProfileRequest = z.infer<typeof updateUserProfileSchema>

// PATCH /users/me 응답
export const updateUserProfileResponseSchema = z.object({
  userId: z.number(),
  nickname: z.string(),
  profileCompleted: z.boolean(),
  categoryTypes: z.array(InterestCategory),
  activityTypes: z.array(UserChannel),
  regionIds: z.array(z.number()),
})
export type UpdateUserProfileResponse = z.infer<typeof updateUserProfileResponseSchema>

// POST /users/me/activity-channel 요청
export const activityChannelRequestSchema = z.object({
  activityType: UserChannel,
  url: z.string(),
})
export type ActivityChannelRequest = z.infer<typeof activityChannelRequestSchema>

// GET /users/nickname/check 응답
export const nicknameCheckSchema = z.object({
  nickname: z.string(),
  available: z.boolean(),
})
export type NicknameCheck = z.infer<typeof nicknameCheckSchema>

// GET /users/nickname/random 응답
export const randomNicknameSchema = z.object({
  nickname: z.string(),
})
export type RandomNickname = z.infer<typeof randomNicknameSchema>
