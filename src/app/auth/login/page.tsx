'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { useSetAtom } from 'jotai'

import { authService } from '@/service'

import { authAtom } from '@/entities/auth'

import AuthBackgroundImage from '@/shared/assets/icons/auth_background.png'
import { Button } from '@/shared/ui'

export default function Page() {
  const router = useRouter()
  const setAuth = useSetAtom(authAtom)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleDemoLogin = async () => {
    setIsLoading(true)
    setErrorMessage('')

    try {
      const token = await authService.demoLogin()

      setAuth(token)
      router.replace(token.user.isProfileCompleted ? '/' : '/auth/register')
    } catch {
      setErrorMessage('데모 로그인에 실패했어요. 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex w-full max-w-360 mx-auto">
      <div className="relative min-h-screen w-10/19 overflow-hidden">
        <Image
          src={AuthBackgroundImage}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 53vw"
          className="object-contain"
        />
      </div>
      <div className="px-13 py-45 flex-1">
        <div className="flex flex-col items-center gap-4.5 mb-13.75">
          <h1 className="text-36 leading-7.5 font-medium">[로그인]</h1>
          <div className="text-16 leading-24">데모 계정으로 로컬 테스트를 시작하세요.</div>
        </div>
        <div className="flex flex-col gap-7">
          <Button
            variant="tertiary"
            className="border border-neutral_90"
            size="lg"
            disabled={isLoading}
            onClick={() => void handleDemoLogin()}
          >
            데모 계정으로 계속하기
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
