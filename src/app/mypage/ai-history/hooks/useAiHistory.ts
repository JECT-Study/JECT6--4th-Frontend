'use client'

import { useQuery } from '@tanstack/react-query'

import { blogAnalysisService, myService } from '@/service'

export function useAiHistory() {
  return useQuery({ queryKey: ['my', 'ai-history'], queryFn: () => myService.getAiHistory() })
}
export function useQuota() {
  return useQuery({
    queryKey: ['blog', 'diagnosis', 'quota'],
    queryFn: () => blogAnalysisService.getQuota(),
  })
}
