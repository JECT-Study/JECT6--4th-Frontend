import { z } from 'zod'

import { UserRole } from './user.enums'

// users 테이블 기준 확정 필드. provider/providerId는 표기 혼재로 추후 확정.
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
