import Link from 'next/link'

import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react'

import type { RecommendedCampaign } from '@/entities/blog-analysis'

import { Button } from '@/shared/ui'

export function RecommendationSection({
  recommendations,
}: {
  recommendations: RecommendedCampaign[]
}) {
  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <h2 className="text-24 font-bold leading-36">AI 추천 공고</h2>
          <p className="mt-4 text-16 font-semibold leading-24 text-neutral_20">
            *사용자가 선택한 선호 뿐만 아니라 블로그의 유형과 포스팅 방식 등을 종합하여 분석한 결과
            AI가 추천하는 공고입니다.
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            aria-label="이전 추천 공고"
            className="size-10 rounded-full bg-white p-0 text-neutral_20"
            variant="tertiary"
          >
            <ChevronLeft className="size-5" />
          </Button>
          <Button
            aria-label="다음 추천 공고"
            className="size-10 rounded-full bg-white p-0 text-neutral_20"
            variant="tertiary"
          >
            <ChevronRight className="size-5" />
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {recommendations.map(campaign => (
          <RecommendedCampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </section>
  )
}

function RecommendedCampaignCard({ campaign }: { campaign: RecommendedCampaign }) {
  return (
    <Link href={`/campaigns/${campaign.id}`} className="block h-full">
      <article className="flex h-full flex-col gap-4 rounded-lg border border-neutral_95 bg-white p-5 font-pretendard text-neutral_20 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="rounded-sm bg-red_95 px-3 py-1 text-12 font-semibold leading-16 text-red_40">
            적합도 {campaign.fitnessScore}점
          </span>
          <Sparkles className="size-6 text-red_50" aria-hidden />
        </div>
        <h3 className="m-0 line-clamp-2 text-18 font-semibold leading-28 text-neutral_20">
          {campaign.title}
        </h3>
        <p className="m-0 line-clamp-3 text-14 font-medium leading-20 text-neutral_50">
          {campaign.reasonMessage}
        </p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-neutral_95 pt-3 text-14 font-semibold leading-20">
          <span className="text-neutral_50">선정 가능성</span>
          <span className="text-red_50">{campaign.selectionScore}점</span>
        </div>
      </article>
    </Link>
  )
}
