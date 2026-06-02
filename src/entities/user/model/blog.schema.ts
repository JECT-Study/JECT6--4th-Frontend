import { z } from 'zod'

import { BlogPlatform, BlogStatus } from './user.enums'

// blogs 테이블 기준 확정 필드.
export const blogSchema = z.object({
  id: z.number(),
  userId: z.number(),
  blogUrl: z.string(),
  platform: BlogPlatform,
  status: BlogStatus,
  createdAt: z.string(),
})

export type Blog = z.infer<typeof blogSchema>
