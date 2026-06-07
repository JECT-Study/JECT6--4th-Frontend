import Link from 'next/link'

import { ChevronRightIcon } from 'lucide-react'

import { popularCampaigns } from '@/app/_components/home/home.mock'
import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

export function CampaignList() {
  const campaignList = popularCampaigns.slice(0, 3)
  return (
    <div className="p-7.5 flex flex-col gap-9.25 border border-neutral_95 rounded-[8px]">
      <div className="flex items-center justify-between">
        <p className="text-24 leading-32 font-semibold">유사한 공고 더보기</p>
        <Link href="/" className="text-20 leading-32">
          <div className="flex items-center gpa-1 text-[#a8a8a8]">
            더보기
            <ChevronRightIcon size={24} />
          </div>
        </Link>
      </div>
      {campaignList.map(item => (
        <HomeCampaignCard key={item.id} variant="horizontal" className="max-w-none" {...item} />
      ))}
    </div>
  )
}
