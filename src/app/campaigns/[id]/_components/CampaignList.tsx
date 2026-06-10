import Link from 'next/link'

import { ChevronRightIcon } from 'lucide-react'

import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

import type { Campaign } from '@/entities/campaign'

interface Props {
  campaigns: Campaign[]
}

export function CampaignList({ campaigns }: Props) {
  if (campaigns.length === 0) return null

  return (
    <div className="p-7.5 flex flex-col gap-9.25 border border-neutral_95 rounded-[8px]">
      <div className="flex items-center justify-between">
        <p className="text-24 leading-32 font-semibold">유사한 공고 더보기</p>
        <Link href="/campaigns" className="text-20 leading-32">
          <div className="flex items-center gpa-1 text-[#a8a8a8]">
            더보기
            <ChevronRightIcon size={24} />
          </div>
        </Link>
      </div>
      {campaigns.map(item => (
        <HomeCampaignCard key={item.id} variant="horizontal" className="max-w-none" {...item} />
      ))}
    </div>
  )
}
