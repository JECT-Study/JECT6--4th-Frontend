import Hamburger from '@/shared/assets/icons/hamburger.svg'
import SearchIcon from '@/shared/assets/icons/search.svg'
import { Button, Input } from '@/shared/ui'

export function Header() {
  return (
    <header className="w-screen">
      <div className="max-w-360 px-30 py-6 flex items-center justify-between mx-auto">
        <div className="flex gap-4 items-center">
          <Button className="bg-[#F5F5F5] p-2 hover:bg-neutral_95">
            <Hamburger className="size-8" />
          </Button>
          LOGO
        </div>
        <div className="flex gap-6">
          <Input
            variant="search"
            placeholder="원하는 공고를 입력해주세요"
            className="w-93.5"
            inputClassName="text-14 leading-4.5"
            leftAddon={<SearchIcon className="size-6" />}
          />
          <div className="flex gap-3">
            <Button
              variant="tertiary"
              className="border border-[#E0E0E0] text-16 leading-20 text-red_50 px-3 py-3.5"
            >
              로그인
            </Button>
            <Button
              variant="tertiary"
              className="border border-[#E0E0E0] text-16 leading-20 text-[#666666] font-medium px-3 py-3.5"
            >
              마이페이지
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
