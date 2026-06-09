import { z } from 'zod'

export const AnalysisStatus = z.enum(['pending', 'in_progress', 'completed', 'failed'])
export type AnalysisStatus = z.infer<typeof AnalysisStatus>

export const ReasonType = z.enum([
  'BLOG_FITNESS',
  'SELECTION_PROBABILITY',
  'PERFORMANCE_BASED',
  'CATEGORY_MATCH',
])
export type ReasonType = z.infer<typeof ReasonType>

export const BlogMetricKey = z.enum([
  'TOPIC_CONSISTENCY',
  'IMAGE_USAGE',
  'POST_VIEW',
  'INTERACTION',
  'INFORMATIVENESS',
  'KEYWORD_USAGE',
])
export type BlogMetricKey = z.infer<typeof BlogMetricKey>

export const InsightType = z.enum(['strength', 'weakness'])
export type InsightType = z.infer<typeof InsightType>
