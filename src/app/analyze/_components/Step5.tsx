'use client'

// import { useState } from 'react'

import { Button } from '@/shared/ui'

interface Props {
  handleStep: (v: number) => void
}

export default function Step5({ handleStep }: Props) {
  // const [selected, setSeleted] = useState()

  return (
    <div className="py-32.5">
      <div className="flex flex-col gap-4 items-center">
        <h1 className="text-[48px] leading-15.75 space-x-[-1.2px] font-semibold text-center">
          주로 어떤 주제로
          <br />
          블로그를 운영하고 있나요?
        </h1>
        <p className="text-18 leading-28 text-[#4A5565]">최대 2개까지 선택할 수 있어요</p>
      </div>
      <div className="flex flex-col items-center gap-6 pt-12">
        <div className="flex flex-col gap-8.25"></div>
        <Button className="w-100" onClick={() => handleStep(6)}>
          다음
        </Button>
      </div>
    </div>
  )
}
