'use client'

import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'

import { campaignService } from '@/service'

import type { Campaign, CampaignCategory } from '@/entities/campaign'

type PopularCampaignCategory = CampaignCategory | 'ALL'

async function getPopularCampaignsByCategory(category: CampaignCategory): Promise<Campaign[]> {
  const response = await campaignService.getCampaigns({
    category,
    page: 0,
    size: 6,
    sort: 'POPULAR',
  })

  return response.content
}

export function usePopularCampaigns(initialCampaigns: Campaign[]) {
  const [category, setCategory] = useState<PopularCampaignCategory>('ALL')
  const { data, isFetching } = useQuery({
    queryKey: ['popular-campaigns', category],
    queryFn: () =>
      category === 'ALL' ? initialCampaigns : getPopularCampaignsByCategory(category),
    placeholderData: previousData => previousData ?? initialCampaigns,
  })

  return {
    category,
    campaigns: data ?? initialCampaigns,
    isLoading: isFetching,
    setCategory,
  }
}
