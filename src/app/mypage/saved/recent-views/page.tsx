'use client'

import { useRecentViews } from '@/shared/hooks/useRecentViews'

import { SavedCampaignGrid } from '../_components/SavedCampaignGrid'

export default function RecentViewsPage() {
  // 최근 조회는 백엔드가 추적하지 않으므로 클라이언트(localStorage) 기록을 사용한다.
  const campaigns = useRecentViews()

  return (
    <div className="pb-20">
      <h1 className="pb-10 pt-13 text-28 font-bold leading-40 tracking-tight text-[#303030]">
        최근 조회한 공고
      </h1>
      <SavedCampaignGrid campaigns={campaigns} emptyText="최근 조회한 공고가 없습니다." />
    </div>
  )
}
