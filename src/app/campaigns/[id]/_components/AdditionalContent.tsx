import type { Campaign, CampaignLikesAnalysis } from '@/entities/campaign'

import { CampaignActionSection } from './CampaignActionSection'
import { CampaignList } from './CampaignList'
import { MyBlogSummury } from './MyBlogSummury'

interface Props {
  campaignId: number
  isLiked: boolean
  related: Campaign[]
  likesAnalysis: CampaignLikesAnalysis
}

export function AdditionalContent({ campaignId, isLiked, related, likesAnalysis }: Props) {
  return (
    <div className="flex flex-col gap-7.5">
      <MyBlogSummury />
      <CampaignActionSection
        campaignId={campaignId}
        initialIsLiked={isLiked}
        likesAnalysis={likesAnalysis}
      />
      <CampaignList campaigns={related} />
    </div>
  )
}
