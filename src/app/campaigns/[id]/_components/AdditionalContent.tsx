import type { Campaign, CampaignLikesAnalysis } from '@/entities/campaign'

import { CampaignActionSection } from './CampaignActionSection'
import { CampaignList } from './CampaignList'
// import { MyBlogSummury } from './MyBlogSummury'

interface Props {
  campaignId: number
  isLiked: boolean
  related: Campaign[]
  likesAnalysis: CampaignLikesAnalysis
  url: string
}

export function AdditionalContent({ campaignId, isLiked, related, likesAnalysis, url }: Props) {
  return (
    <div className="flex flex-col gap-7.5 sticky top-0">
      {/* <MyBlogSummury /> */}
      <CampaignList campaigns={related} />
      <CampaignActionSection
        url={url}
        campaignId={campaignId}
        initialIsLiked={isLiked}
        likesAnalysis={likesAnalysis}
      />
    </div>
  )
}
