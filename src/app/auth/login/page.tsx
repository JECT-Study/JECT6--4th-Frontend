'use client'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { useSetAtom } from 'jotai'

import { authService } from '@/service'

import { authAtom } from '@/entities/auth'
import type { Provider } from '@/entities/user'

import { Button } from '@/shared/ui'

export default function Page() {
  const router = useRouter()
  const setAuth = useSetAtom(authAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleClick = async (type: Provider) => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const token = await authService.login(type, {
        code: '1234',
        redirectUri: window.location.origin + window.location.pathname,
      })

      setAuth({ ...token, accessToken: '1234' })
      router.replace(token.user.isProfileCompleted ? '/' : '/onboarding')
    } catch {
      setErrorMessage('로그인에 실패했어요. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full max-w-360 mx-auto">
      <div className="bg-[#FAFAFA] w-10/19">이미지</div>
      <div className="px-13 py-45 flex-1">
        <div className="flex flex-col items-center gap-4.5 mb-13.75">
          <h1 className="text-36 leading-7.5 font-medium">[로그인]</h1>
          <div className="text-16 leading-24">소셜 계정으로 간편하게 로그인하세요.</div>
        </div>
        <div className="flex flex-col gap-7">
          <Button
            variant="tertiary"
            className="border border-neutral_90"
            size="lg"
            disabled={isLoading}
            onClick={() => void handleClick('KAKAO')}
          >
            카카오 계정으로 계속하기
          </Button>
          <Button
            variant="tertiary"
            className="border border-neutral_90"
            size="lg"
            disabled={isLoading}
            onClick={() => void handleClick('NAVER')}
          >
            네이버 계정으로 계속하기
          </Button>
          <Button
            variant="tertiary"
            className="border border-neutral_90"
            size="lg"
            disabled={isLoading}
            onClick={() => void handleClick('GOOGLE')}
          >
            구글 계정으로 계속하기
          </Button>
          {isLoading && (
            <p className="m-0 text-center text-14 font-medium leading-20 text-neutral_60">
              로그인 처리 중...
            </p>
          )}
          {errorMessage && (
            <p className="m-0 text-center text-14 font-medium leading-20 text-red_50">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
