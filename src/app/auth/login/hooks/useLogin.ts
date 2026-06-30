'use client'

import { useMutation } from '@tanstack/react-query'

import type { Provider } from '@/entities/user'

const DEFAULT_PROVIDER: Provider = 'KAKAO'

function getOAuthLoginUrl(provider: Provider) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
  const pathname = `/api/auth/login/${provider.toLowerCase()}`

  return `${baseUrl}${pathname}`
}

export function useLogin() {
  const loginMutation = useMutation({
    mutationFn: (provider: Provider = DEFAULT_PROVIDER) => {
      window.location.assign(getOAuthLoginUrl(provider))
      return Promise.resolve()
    },
  })

  return {
    isError: loginMutation.isError,
    isPending: loginMutation.isPending,
    login: (provider: Provider = DEFAULT_PROVIDER) => loginMutation.mutate(provider),
  }
}
