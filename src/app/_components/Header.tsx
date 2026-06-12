'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { useAtomValue, useSetAtom } from 'jotai'

import { authService } from '@/service'

import { authAtom, isLoggedInAtom } from '@/entities/auth'

// import Hamburger from '@/shared/assets/icons/hamburger.svg'
import LogoImage from '@/shared/assets/icons/logo.png'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Button, Input } from '@/shared/ui'

export function Header() {
  const router = useRouter()
  const isLoggedIn = useAtomValue(isLoggedInAtom)
  const setAuth = useSetAtom(authAtom)
  const [keyword, setKeyword] = useState('')
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const submitSearch = () => {
    const trimmedKeyword = keyword.trim()

    if (!trimmedKeyword) {
      router.push('/campaigns')
      return
    }

    router.push(`/campaigns?keyword=${encodeURIComponent(trimmedKeyword)}`)
  }

  const logout = async () => {
    setIsLoggingOut(true)

    try {
      await authService.logout()
    } finally {
      setAuth(null)
      setIsLoggingOut(false)
      router.replace('/')
    }
  }

  return (
    <header className="w-full">
      <div className="max-w-360 px-30 py-6 flex items-center justify-between mx-auto">
        <div className="flex gap-4 items-center">
          {/* <Button className="bg-[#F5F5F5] p-2 hover:bg-neutral_95">
            <Hamburger className="size-8" />
          </Button> */}
          <Link href="/" className="block w-32 shrink-0">
            <Image src={LogoImage} alt="Boost" className="h-auto w-full" priority />
          </Link>
        </div>
        <div className="flex gap-6">
          <Input
            variant="search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                submitSearch()
              }
            }}
            placeholder="원하는 공고를 입력해주세요"
            className="w-93.5"
            inputClassName="text-14 leading-4.5"
            leftAddon={<SearchIcon className="size-6" />}
          />
          <div className="flex gap-3">
            {isLoggedIn ? (
              <Button
                variant="tertiary"
                className="border border-[#E0E0E0] text-16 leading-20 text-[#666666] font-medium px-3 py-3.5"
                disabled={isLoggingOut}
                onClick={() => void logout()}
              >
                로그아웃
              </Button>
            ) : (
              <Link href="/auth/login">
                <Button
                  variant="tertiary"
                  className="border border-[#E0E0E0] text-16 leading-20 text-red_50 px-3 py-3.5"
                >
                  로그인
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
