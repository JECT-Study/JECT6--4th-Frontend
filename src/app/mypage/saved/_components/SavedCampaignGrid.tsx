import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

import type { Campaign } from '@/entities/campaign'

interface SavedCampaignGridProps {
  campaigns: Campaign[]
}

export function SavedCampaignGrid({ campaigns }: SavedCampaignGridProps) {
  if (campaigns.length === 0) {
    return <p className="py-16 text-center text-16 text-neutral_60">관심 공고가 없습니다.</p>
  }

  return (
    <div className="grid grid-cols-4 gap-6">
      {campaigns.map(c => (
        <HomeCampaignCard key={c.id} {...c} />
      ))}
    </div>
  )
}
