'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { useAtomValue, useSetAtom } from 'jotai'
import { MessageCircle } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { authService } from '@/service'

import { useLogin } from '@/app/auth/login/hooks/useLogin'

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
              <>
                <Link href="/mypage">
                  <Button
                    variant="tertiary"
                    className="border border-[#E0E0E0] text-16 leading-20 text-[#666666] font-medium px-3 py-3.5"
                  >
                    마이페이지
                  </Button>
                </Link>
                <Button
                  variant="tertiary"
                  className="border border-[#E0E0E0] text-16 leading-20 text-[#666666] font-medium px-3 py-3.5"
                  disabled={isLoggingOut}
                  onClick={() => void logout()}
                >
                  로그아웃
                </Button>
              </>
            ) : (
              <LoginDialog />
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

function LoginDialog() {
  const { isError, isPending, login } = useLogin()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="tertiary"
          className="border border-[#E0E0E0] text-16 leading-20 text-red_50 px-3 py-3.5"
        >
          로그인
        </Button>
      </DialogTrigger>
      <DialogContent className="w-136.5 gap-0 rounded-lg p-0 sm:max-w-136.5">
        <div className="flex flex-col items-center px-19.25 py-10">
          <DialogHeader className="items-center gap-0">
            <DialogTitle className="text-28 font-bold leading-8 text-red_50">LOGO</DialogTitle>
            <DialogDescription className="mt-14 text-center text-20 font-semibold leading-8 text-[#1F2937]">
              블로거를 위한 맞춤 체험단 매칭
              <br />내 블로그에 딱 맞는 체험단을 AI가 찾아드려요
            </DialogDescription>
          </DialogHeader>

          <Button
            className="mt-14 h-11.5 w-full gap-3 rounded-md bg-[#FEE500] text-14 font-medium leading-5 text-[#191919] hover:bg-[#FADA0A]"
            disabled={isPending}
            onClick={() => login('KAKAO')}
          >
            <MessageCircle className="size-5 fill-current" />
            카카오 계정으로 계속하기
          </Button>

          {isError && (
            <p className="mt-4 text-center text-14 font-medium leading-20 text-red_50">
              로그인 페이지로 이동하지 못했어요. 다시 시도해주세요.
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
