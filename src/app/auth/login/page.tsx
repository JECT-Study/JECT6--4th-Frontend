'use client'

import Image from 'next/image'

import { useState } from 'react'

import type { Provider } from '@/entities/user'

import AuthBackgroundImage from '@/shared/assets/icons/auth_background.png'
import { Button } from '@/shared/ui'

export default function Page() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleKakaoClick = () => {
    setIsLoading(true)
    setErrorMessage('')

    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080'

    window.location.href = `${apiBaseUrl.replace(/\/$/, '')}/api/auth/login/kakao`
  }

  const handleClick = (type: Provider) => {
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080'
    window.location.href = `${apiBaseUrl.replace(/\/$/, '')}/api/auth/login/${type.toLowerCase()}`
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
          <div className="text-16 leading-24">소셜 계정으로 간편하게 로그인하세요.</div>
        </div>
        <div className="flex flex-col gap-7">
          <Button
            variant="tertiary"
            className="border border-neutral_90"
            size="lg"
            disabled={isLoading}
            onClick={handleKakaoClick}
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
