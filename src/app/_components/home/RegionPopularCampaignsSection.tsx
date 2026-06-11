'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { campaignService } from '@/service'

import { LocationDropdown } from '@/app/campaigns/_components/LocationDropdown'

import type { Campaign } from '@/entities/campaign'

import { Button } from '@/shared/ui'

import { HomeCampaignCard } from './HomeCampaignCard'

export default function RegionPopularCampaignsSection({ campaigns }: { campaigns: Campaign[] }) {
  const [region, setRegion] = useState('')
  const [displayedCampaigns, setDisplayedCampaigns] = useState(campaigns)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setDisplayedCampaigns(campaigns)
  }, [campaigns])

  useEffect(() => {
    if (!region) {
      setDisplayedCampaigns(campaigns)
      return
    }

    let ignore = false

    async function fetchCampaignsByRegion() {
      setIsLoading(true)

      try {
        const response = await campaignService.getCampaigns({
          region,
          page: 0,
          size: 6,
          sort: 'popular',
        })

        if (!ignore) {
          setDisplayedCampaigns(response.content)
        }
      } catch {
        if (!ignore) {
          setDisplayedCampaigns(campaigns)
        }
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    void fetchCampaignsByRegion()

    return () => {
      ignore = true
    }
  }, [campaigns, region])

  return (
    <section
      id="region-popular-campaigns"
      className="mx-auto mt-18 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <LocationDropdown
            location={region}
            setLocation={setRegion}
            triggerClassName="gap-1 text-[20px] leading-6 font-medium border py-[9px] pl-4 pr-2.5 rounded-[8px] h-12"
          />
          <h2 className="m-0 text-[25px] font-semibold leading-12 text-neutral_20">
            지역별 인기 체험
          </h2>
        </div>
      </div>
      <div className="grid gap-x-10 gap-y-8 lg:grid-cols-2">
        {[0, 1].map(column => (
          <div key={column} className="flex flex-col gap-6">
            {displayedCampaigns.slice(column * 3, column * 3 + 3).map(campaign => (
              <HomeCampaignCard
                key={`region-${campaign.id}`}
                variant="horizontal"
                className="max-w-none"
                {...campaign}
              />
            ))}
          </div>
        ))}
      </div>
      {isLoading && (
        <p className="m-0 text-center text-14 font-medium leading-20 text-neutral_60">
          불러오는 중...
        </p>
      )}
      <Link href="/campaigns">
        <Button variant="tertiary" className="w-full border-[#8A8A8A] py-6">
          전체 보기
        </Button>
      </Link>
    </section>
  )
}
