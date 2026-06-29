'use client'

import { useQuery } from '@tanstack/react-query'

import { campaignService, myService } from '@/service'

export function useMyCampaignsSummary() {
  return useQuery({
    queryKey: ['my', 'campaigns', 'summary'],
    queryFn: () => myService.getCampaigns(),
  })
}
export function useLikedCampaigns(params?: { page?: number; size?: number }) {
  return useQuery({
    queryKey: ['my', 'campaigns', 'likes', params],
    queryFn: () => myService.getLikedCampaigns(params),
  })
}
export function useRecentViewCampaigns(params?: { page?: number; size?: number }) {
  return useQuery({
    queryKey: ['my', 'campaigns', 'recent-views', params],
    queryFn: () => myService.getRecentViewCampaigns(params),
  })
}
export function useRecommendedCampaigns() {
  return useQuery({
    queryKey: ['campaigns', 'popular'],
    queryFn: () => campaignService.getPopular(),
  })
}
