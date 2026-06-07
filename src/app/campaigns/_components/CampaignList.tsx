import { aiCampaigns } from '@/app/_components/home/home.mock'
import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

export function CampaignList() {
  return (
    <div className="flex flex-col gap-15">
      <div className="flex items-center justify-between">
        <div className="text-22 leading-6.25 font-semibold">공고 전체 보기</div>
      </div>
      <div className="grid grid-cols-4 gap-x-6 gap-y-26 pb-15">
        {aiCampaigns.map(item => (
          <HomeCampaignCard key={item.id} variant="vertical" className="max-w-none" {...item} />
        ))}
      </div>
    </div>
  )
}
