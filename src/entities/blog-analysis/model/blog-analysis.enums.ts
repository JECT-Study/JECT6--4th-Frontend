import { z } from 'zod'

export const AnalysisStatus = z.enum(['pending', 'in_progress', 'completed', 'failed'])
export type AnalysisStatus = z.infer<typeof AnalysisStatus>

export const ReasonType = z.enum(['BLOG_FITNESS', 'SELECTION_PROBABILITY', 'PERFORMANCE_BASED'])
export type ReasonType = z.infer<typeof ReasonType>
