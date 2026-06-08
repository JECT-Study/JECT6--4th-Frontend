import Link from 'next/link'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import WarningIcon from '@/shared/assets/icons/warning.svg'
import { Button } from '@/shared/ui'

interface Props {
  handleClick: () => void
}

export default function AnalyzeDialog({ handleClick }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">결과보기</Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center p-9 w-125 sm:max-w-125">
        <DialogHeader className="flex flex-col items-center">
          <div className="flex items-center justify-center size-16 rounded-full bg-[#FFEDD4] mb-6">
            <WarningIcon />
          </div>
          <DialogTitle className="text-22 leading-7.5 font-medium text-center">
            포스팅이 5개 이상이어야
            <br />
            블로그 분석을 할 수 있어요
          </DialogTitle>
          <DialogDescription className="text-16 leading-6.5 text-[#4A5565]">
            몇 가지 질문을 통해 관심있어 할 공고를 확인해봐요!
          </DialogDescription>
        </DialogHeader>
        <div className="rounede-[18px] p-5.5 bg-[#F9FAFB] w-full flex justify-between">
          <div className="flex flex-col items-center gap-2.25 w-44.5">
            <p className="text-16 leading-5.5 text-[#6A7282]">현재 글 수</p>
            <p className="text-[34px] leading-10 font-bold">2개</p>
          </div>
          <div className="flex flex-col items-center gap-2.25 w-44.5">
            <p className="text-16 leading-5.5 text-[#6A7282]">필요 글 수</p>
            <p className="text-[34px] leading-10 font-bold text-[#2673DD]">최소 5개</p>
          </div>
        </div>
        <p className="text-16 leading-5.5 text-[#6A7282]">
          블로그에 글을 더 작성한 후 다시 시도해주세요.
        </p>
        <div className="flex items-center gap-3.25 w-full">
          <Link href="/campaigns" className="w-1/2">
            <Button variant="tertiary" className="w-full">
              모든 공고 보기
            </Button>
          </Link>
          <Button className="w-1/2" onClick={handleClick}>
            관심 공고 찾기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
