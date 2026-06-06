'use client'
import { Provider } from '@/entities/user'

import { Button } from '@/shared/ui'

export default function Page() {
  const handleClick = (type: Provider) => {
    console.log(type)
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
            onClick={() => handleClick('KAKAO')}
          >
            카카오 계정으로 계속하기
          </Button>
          <Button
            variant="tertiary"
            className="border border-neutral_90"
            size="lg"
            onClick={() => handleClick('NAVER')}
          >
            네이버 계정으로 계속하기
          </Button>
          <Button
            variant="tertiary"
            className="border border-neutral_90"
            size="lg"
            onClick={() => handleClick('GOOGLE')}
          >
            구글 계정으로 계속하기
          </Button>
        </div>
      </div>
    </div>
  )
}
