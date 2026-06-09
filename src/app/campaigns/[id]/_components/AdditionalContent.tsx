import { CampaignActionSection } from './CampaignActionSection'
import { CampaignList } from './CampaignList'
import { MyBlogSummury } from './MyBlogSummury'

export function AdditionalContent() {
  return (
    <div className="flex flex-col gap-7.5">
      <MyBlogSummury />
      <CampaignActionSection />
      <CampaignList />
    </div>
  )
}
