import { z } from 'zod'

import { BlogPlatform, BlogStatus } from './user.enums'

export const blogSchema = z.object({
  id: z.number(),
  blogUrl: z.string(),
  platform: BlogPlatform,
  status: BlogStatus,
})

export type Blog = z.infer<typeof blogSchema>
