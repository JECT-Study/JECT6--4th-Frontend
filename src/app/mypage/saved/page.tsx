'use client'

import { SectionShell } from '../_components/SectionShell'

import { AppliedCampaignCard } from './_components/AppliedCampaignCard'
import { SavedSummaryCard } from './_components/SavedSummaryCard'
import { useMyCampaignsSummary } from './hooks/useMyCampaigns'

export default function SavedPage() {
  const { data, isLoading, isError, refetch } = useMyCampaignsSummary()

  if (isLoading) {
    return <p className="pt-12 text-16 text-neutral_60">불러오는 중...</p>
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col items-start gap-3 pt-12">
        <p className="text-16 text-neutral_60">정보를 불러오지 못했습니다.</p>
        <button
          type="button"
          onClick={() => {
            void refetch()
          }}
          className="text-16 font-medium text-violet_80"
        >
          다시 시도
        </button>
      </div>
    )
  }

  return (
    <div className="pb-20">
      {/* 내 관심 공고 요약 카드 */}
      <section className="mt-6">
        <h2 className="text-22 font-semibold text-neutral_20">내 관심 공고</h2>
        <div className="mt-6 flex gap-8">
          <SavedSummaryCard
            label="최근 조회 공고"
            count={data.recentViewCount}
            href="/mypage/saved/recent-views"
          />
          <SavedSummaryCard
            label="좋아요 한 공고"
            count={data.likedCount}
            href="/mypage/saved/likes"
          />
        </div>
      </section>

      {/* 최근 지원한 공고 */}
      <SectionShell title="최근 지원한 공고">
        {data.recentAppliedCampaign.length === 0 ? (
          <p className="text-16 text-neutral_60">최근 지원한 공고가 없습니다.</p>
        ) : (
          <div className="grid grid-cols-3 gap-11">
            {data.recentAppliedCampaign.map(campaign => (
              <AppliedCampaignCard
                key={campaign.id}
                campaignId={campaign.campaignId}
                title={campaign.title}
                brandName={campaign.brandName}
                applyEndDate={campaign.applyEndDate}
              />
            ))}
          </div>
        )}
      </SectionShell>
    </div>
  )
}
