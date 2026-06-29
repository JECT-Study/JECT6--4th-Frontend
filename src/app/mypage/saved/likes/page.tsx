'use client'

import { RecommendCarousel } from '../_components/RecommendCarousel'
import { SavedCampaignGrid } from '../_components/SavedCampaignGrid'
import { useLikedCampaigns } from '../hooks/useMyCampaigns'

export default function LikesPage() {
  // TODO: 페이지네이션/무한스크롤은 후속. 현재는 충분히 큰 페이지로 한 번에 조회해 잘림 방지.
  const { data, isLoading, isError, refetch } = useLikedCampaigns({ size: 100 })

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
      <h1 className="pb-10 pt-13 text-28 font-bold leading-40 tracking-tight text-[#303030]">
        내 관심 공고
      </h1>
      <SavedCampaignGrid campaigns={data.content} />
      <RecommendCarousel />
    </div>
  )
}
