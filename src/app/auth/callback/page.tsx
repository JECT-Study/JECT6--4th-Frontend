'use client'

import { useRouter } from 'next/navigation'

import { useEffect, useState } from 'react'

import { useSetAtom } from 'jotai'

import { userService } from '@/service'

import { authAtom, tokenResponseSchema } from '@/entities/auth'

export default function Page() {
  const router = useRouter()
  const setAuth = useSetAtom(authAtom)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const completeLogin = async () => {
      const params = new URLSearchParams(window.location.search)
      const tokenResult = tokenResponseSchema.safeParse({
        accessToken: params.get('accessToken'),
        refreshToken: params.get('refreshToken'),
        tokenType: params.get('tokenType') ?? 'Bearer',
        expiresIn: params.get('expiresIn'),
      })

      if (!tokenResult.success) {
        setErrorMessage('로그인 토큰을 확인할 수 없어요. 다시 로그인해주세요.')
        router.replace('/auth/login')
        return
      }

      const auth = tokenResult.data

      setAuth(auth)
      window.localStorage.setItem('auth', JSON.stringify(auth))
      window.history.replaceState(null, '', '/auth/callback')

      try {
        const profile = await userService.getMe()
        router.replace(profile.profileCompleted ? '/' : '/onboarding')
      } catch {
        router.replace('/')
      }
    }

    void completeLogin()
  }, [router, setAuth])

  return (
    <main className="flex min-h-120 items-center justify-center px-6 py-20">
      <p className="m-0 text-16 font-medium leading-24 text-neutral_60">
        {errorMessage || '로그인 처리 중...'}
      </p>
    </main>
  )
}
