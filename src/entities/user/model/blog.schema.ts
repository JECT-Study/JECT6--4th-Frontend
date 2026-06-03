import { z } from 'zod'

import { BlogPlatform, BlogStatus } from './user.enums'

export const blogSchema = z.object({
  id: z.number(),
  userId: z.number().optional(),
  blogUrl: z.string(),
  platform: BlogPlatform,
  status: BlogStatus,
  lastCrawledAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string().optional(),
})

export type Blog = z.infer<typeof blogSchema>
