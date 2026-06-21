'use client'

import { useQuery } from '@tanstack/react-query'

import { blogAnalysisService } from '@/service'

import type { RecommendedCampaign } from '@/entities/blog-analysis'

async function getAnalysisRecommendations(): Promise<RecommendedCampaign[]> {
  const history = await blogAnalysisService.getHistory()
  const latestId = history.content[0]?.id
  if (!latestId) return []

  const response = await blogAnalysisService.getRecommendations(latestId)

  return response.campaigns
}

export function useAnalysisRecommendations(isLoggedIn: boolean) {
  const { data, isFetching } = useQuery({
    queryKey: ['analysis-recommendations'],
    queryFn: getAnalysisRecommendations,
    enabled: isLoggedIn,
  })

  return {
    recommendations: isLoggedIn ? (data ?? []) : [],
    isLoading: isFetching,
  }
}
