'use client'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

import { HomeCampaignCard } from '@/app/_components/home/HomeCampaignCard'

import { useRecommendedCampaigns } from '../hooks/useMyCampaigns'

export function RecommendCarousel() {
  const { data: campaigns } = useRecommendedCampaigns()

  if (!campaigns || campaigns.length === 0) {
    return null
  }

  return (
    <section className="mt-16 w-full">
      <div className="mb-10 flex items-center justify-between">
        <h2 className="text-25 font-semibold tracking-wider text-neutral_20">
          00님에게 맞춰 추천하는 맞춤 체험단
        </h2>
      </div>
      <Carousel opts={{ align: 'start' }} className="w-full">
        <CarouselContent>
          {campaigns.slice(0, 10).map(c => (
            <CarouselItem key={c.id} className="basis-1/5">
              <HomeCampaignCard {...c} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-left-14" />
        <CarouselNext className="-right-14" />
      </Carousel>
    </section>
  )
}
