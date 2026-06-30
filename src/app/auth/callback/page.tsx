'use client'

import { useRouter, useSearchParams } from 'next/navigation'

import { Suspense, useEffect, useState } from 'react'

import { useSetAtom } from 'jotai'

import { userService } from '@/service'

import { authAtom, authTokenSchema } from '@/entities/auth'

function AuthCallbackContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const setAuth = useSetAtom(authAtom)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let isMounted = true

    const processCallback = async () => {
      const parsedToken = authTokenSchema.safeParse({
        accessToken: searchParams.get('accessToken'),
        refreshToken: searchParams.get('refreshToken'),
        tokenType: searchParams.get('tokenType'),
        expiresIn: Number(searchParams.get('expiresIn')),
      })

      if (!parsedToken.success) {
        setErrorMessage('로그인 정보가 올바르지 않아요. 다시 로그인해주세요.')
        return
      }

      setAuth(parsedToken.data)

      try {
        const user = await userService.getMe()

        if (!isMounted) {
          return
        }

        router.replace(user.profileCompleted ? '/' : '/onboarding')
      } catch {
        if (!isMounted) {
          return
        }

        setAuth(null)
        setErrorMessage('로그인 처리에 실패했어요. 다시 시도해주세요.')
      }
    }

    void processCallback()

    return () => {
      isMounted = false
    }
  }, [router, searchParams, setAuth])

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6">
      <p className="text-center text-16 font-medium leading-24 text-neutral_60">
        {errorMessage || '로그인 처리 중...'}
      </p>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen w-full items-center justify-center px-6">
          <p className="text-center text-16 font-medium leading-24 text-neutral_60">
            로그인 처리 중...
          </p>
        </div>
      }
    >
      <AuthCallbackContent />
    </Suspense>
  )
}
