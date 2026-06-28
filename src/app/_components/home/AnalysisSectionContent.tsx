'use client'

import Link from 'next/link'

import { useAtomValue } from 'jotai'
import { LockKeyhole, Sparkles } from 'lucide-react'

import { useAnalysisRecommendations } from '@/app/hooks/useAnalysisRecommendations'

import { isLoggedInAtom } from '@/entities/auth'
import type { RecommendedCampaign } from '@/entities/blog-analysis'
import type { Campaign } from '@/entities/campaign'

import { HomeCampaignCard } from './HomeCampaignCard'
import { SectionHeader } from './SectionHeader'

interface AnalysisSectionContentProps {
  previewCampaigns: Campaign[]
}

export function AnalysisSectionContent({ previewCampaigns }: AnalysisSectionContentProps) {
  const isLoggedIn = useAtomValue(isLoggedInAtom)
  const { isLoading, recommendations } = useAnalysisRecommendations(isLoggedIn)

  return (
    <section
      id="ai-campaigns"
      className="mx-auto mt-12 flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0"
    >
      <div className="flex max-w-170 flex-col gap-2">
        <SectionHeader title="AI 맞춤 체험단" />
        <p className="m-0 text-14 font-medium leading-20 text-neutral_50">
          AI가 내 블로그를 분석하여 상황에 딱 맞는 체험단을 추천해드려요.
        </p>
      </div>
      {isLoggedIn ? (
        <div className="min-h-80.5">
          {isLoading ? (
            <p className="py-20 text-center text-16 font-medium leading-24 text-neutral_60">
              AI 추천 공고를 불러오는 중...
            </p>
          ) : recommendations.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {recommendations.slice(0, 4).map(campaign => (
                <RecommendedCampaignCard key={campaign.id} campaign={campaign} />
              ))}
            </div>
          ) : (
            <p className="py-20 text-center text-16 font-medium leading-24 text-neutral_60">
              아직 추천할 분석 결과가 없어요.
            </p>
          )}
        </div>
      ) : (
        <LockedAnalysisPreview campaigns={previewCampaigns} />
      )}
    </section>
  )
}

function LockedAnalysisPreview({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <div className="relative min-h-80.5 overflow-hidden rounded-none bg-white">
      <div
        className="grid max-h-80.5 gap-6 overflow-hidden opacity-45 sm:grid-cols-2 lg:grid-cols-4"
        aria-hidden="true"
      >
        {campaigns.map(campaign => (
          <HomeCampaignCard key={campaign.id} variant="ai" className="max-w-none" {...campaign} />
        ))}
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/60 px-5 shadow-[0_0_50px_rgba(0,0,0,0.18)] backdrop-blur-sm">
        <div className="flex max-w-110 flex-col items-center gap-4 text-center">
          <span className="flex size-12 items-center justify-center rounded-full border border-neutral_20 bg-white text-neutral_20">
            <LockKeyhole className="size-7" aria-hidden />
          </span>
          <div className="flex flex-col gap-1">
            <h2 className="m-0 text-18 font-bold leading-28 text-neutral_20">
              AI 맞춤 공고는 로그인 후 확인할 수 있어요
            </h2>
            <p className="m-0 text-14 font-medium leading-20 text-neutral_40">
              로그인하고 AI가 추천하는 맞춤 공고를 확인해보세요.
            </p>
          </div>
          <p className="m-0 rounded-md bg-neutral_95 px-5 py-2.5 text-14 font-semibold leading-20 text-neutral_50">
            로그인 기능 연동 후 제공됩니다
          </p>
        </div>
      </div>
    </div>
  )
}

function RecommendedCampaignCard({ campaign }: { campaign: RecommendedCampaign }) {
  return (
    <Link href={`/campaigns/${campaign.id}`}>
      <article className="flex h-80.5 max-w-none flex-col gap-4 bg-transparent p-5 font-pretendard text-neutral_20">
        <div
          className="relative flex h-34 shrink-0 items-start justify-between rounded-md bg-neutral_99 p-4"
          aria-hidden="true"
        >
          <span className="rounded-sm bg-red_95 px-3 py-1 text-12 font-semibold leading-16 text-red_40">
            적합도 {campaign.fitnessScore}점
          </span>
          <Sparkles className="size-6 text-red_50" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
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
        </div>
      </article>
    </Link>
  )
}
