'use client'

import { useMemo } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useAtomValue } from 'jotai'

import { myService } from '@/service'

import { isLoggedInAtom } from '@/entities/auth'

// 내가 좋아요한 공고 id 집합. 화면(홈/목록/상세)마다 응답의 liked 값이 달라
// 하트가 들쭉날쭉한 문제를 해결하기 위해, 모든 카드가 이 집합을 참조한다.
export function useLikedCampaignIds(): Set<number> {
  const isLoggedIn = useAtomValue(isLoggedInAtom)

  const { data } = useQuery({
    queryKey: ['my', 'liked-ids'],
    queryFn: () => myService.getLikes(),
    enabled: isLoggedIn,
    staleTime: 60 * 1000,
  })

  return useMemo(() => new Set((data ?? []).map(campaign => campaign.id)), [data])
}
