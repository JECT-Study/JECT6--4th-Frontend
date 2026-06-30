'use client'

import { useQuery } from '@tanstack/react-query'

import { userService } from '@/service'

export const ACCOUNT_ME_QUERY_KEY = ['user', 'me'] as const

export function useAccountMe() {
  return useQuery({
    queryKey: ACCOUNT_ME_QUERY_KEY,
    queryFn: () => userService.getMe(),
  })
}
