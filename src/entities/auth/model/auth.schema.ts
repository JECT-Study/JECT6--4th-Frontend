import { z } from 'zod'

import { SubscriptionType } from '@/entities/user'

// POST /auth/login/{provider} 요청
export const loginRequestSchema = z.object({
  code: z.string(),
  redirectUri: z.string(),
})
export type LoginRequest = z.infer<typeof loginRequestSchema>

// 토큰 응답에 포함된 간략 유저 정보
export const tokenUserSchema = z.object({
  id: z.number(),
  nickname: z.string(),
  profileImageUrl: z.string().nullable(),
  subscriptionType: SubscriptionType,
  aiCreditRemaining: z.number(),
  isProfileCompleted: z.boolean(),
})
export type TokenUser = z.infer<typeof tokenUserSchema>

// POST /auth/login/{provider} 응답
export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.string(),
  user: tokenUserSchema,
})
export type TokenResponse = z.infer<typeof tokenResponseSchema>
