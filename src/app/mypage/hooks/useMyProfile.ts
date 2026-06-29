'use client'

import { useQuery } from '@tanstack/react-query'

import { userService } from '@/service'

import type { InterestCategory } from '@/entities/user'

export const MY_PROFILE_KEY = ['user', 'me'] as const

export const CATEGORY_LABELS: Record<InterestCategory, string> = {
  FOOD: '맛집',
  BEAUTY: '뷰티',
  CULTURE: '문화',
  TRAVEL: '여행',
  TECH_IT: '테크/IT',
  PET: '펫',
  LIVING: '리빙',
  FASHION: '패션',
  ETC: '기타',
}

export function useMyProfile() {
  return useQuery({
    queryKey: MY_PROFILE_KEY,
    queryFn: () => userService.getMe(),
  })
}
