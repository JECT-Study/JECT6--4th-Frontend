import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

import type { Campaign } from '@/entities/campaign'

interface SavedCampaignGridProps {
  campaigns: Campaign[]
  emptyText?: string
}

export function SavedCampaignGrid({
  campaigns,
  emptyText = '관심 공고가 없습니다.',
}: SavedCampaignGridProps) {
  if (campaigns.length === 0) {
    return <p className="py-16 text-center text-16 text-neutral_60">{emptyText}</p>
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {campaigns.map(c => (
        <HomeCampaignCard key={c.id} {...c} />
      ))}
    </div>
  )
}
