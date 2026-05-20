import type { HTMLAttributes } from 'react'

import { Button } from '../button'
import { Input } from '../input'

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  logoText?: string
}

export function Header({ className = '', logoText = 'JECT', ...props }: HeaderProps) {
  return (
    <header
      className={[
        'flex h-24 w-full items-center justify-between gap-12 border-b border-neutral_95 bg-white px-16 font-pretendard text-neutral_20',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <h1 className="m-0 whitespace-nowrap text-24 font-bold leading-32">{logoText}</h1>
      <div className="flex flex-[0_1_570px] items-center gap-3">
        <Input
          className="min-w-60 flex-1"
          variant="search"
          placeholder="원하는 공고를 입력해주세요"
        />
        <Button className="min-w-[88px] shrink-0" variant="tertiary">
          로그인
        </Button>
        <Button className="min-w-[88px] shrink-0" variant="navy">
          마이페이지
        </Button>
      </div>
    </header>
  )
}
