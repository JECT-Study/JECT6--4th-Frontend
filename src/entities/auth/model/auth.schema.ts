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

export const authTokenSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  expiresIn: z.number(),
  tokenType: z.string(),
})
export type AuthToken = z.infer<typeof authTokenSchema>

// POST /auth/login/{provider} 응답
export const tokenResponseSchema = authTokenSchema.extend({
  user: tokenUserSchema,
})
export type TokenResponse = z.infer<typeof tokenResponseSchema>
export type AuthState = AuthToken & { user?: TokenUser }
