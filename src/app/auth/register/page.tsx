'use client'

import { useState } from 'react'

import { SelectableCategory, INTEREST_CATEGORY_LABEL, CHANNEL_LABEL } from '@/constant'
import { cn } from '@/lib/utils'

import { InterestCategory, UserChannel } from '@/entities/user'

import CheckIcon from '@/shared/assets/icons/checked.svg'
import UnCheckIcon from '@/shared/assets/icons/unchecked.svg'
import XIcon from '@/shared/assets/icons/x.svg'
import { Button, Input } from '@/shared/ui'

import RegionSelector from './_components/RegionSelector'

export default function Page() {
  const [categoryList, setCategoryList] = useState<SelectableCategory[]>([])
  const [channelList, setChannelList] = useState<UserChannel[]>([])
  const [regionList, setRegionList] = useState<string[]>([])

  return (
    <div className="flex w-full max-w-360 mx-auto">
      <div className="bg-[#FAFAFA] w-1/2">이미지</div>
      <div className="px-13 pt-21.25">
        <div className="flex flex-col gap-4.5 mb-13.75">
          <h1 className="text-36 leading-7.5 font-medium">[회원가입]</h1>
          <div className="text-16 leading-24">
            6단계 정보 입력으로 더 정확한 맞춤 추천을 제공해드려요.
          </div>
        </div>
        {/* 닉네임 입력 섹션 */}
        <div className="flex flex-col gap-5 mb-12.5">
          <h2 className="text-20 leading-7.5 font-medium">
            닉네임 입력 <span className="text-18 leading-7.5 text-red_50">(필수)</span>
          </h2>
          <div className="flex gap-2.5 pr-12.75 h-12">
            <Input
              placeholder="닉네임을 입력해주세요"
              inputClassName="text-14 leading-24"
              rightAddon={
                <Button className="py-0.75 px-2.5 text-12 leading-7.5 h-fit">랜덤 생성</Button>
              }
            />
            <Button className="w-36.75 text-14 leading-7.5 font-medium py-2.5">중복 확인</Button>
          </div>
          <p className="text-12 leading-24 text-neutral_70">2~12자, 한글/영문/숫자 사용 가능</p>
          <div className="h-px w-full bg-[#E0E0E0]" />
        </div>
        {/* 카테고리 선택 섹션 */}
        <div className="flex flex-col mb-12.5">
          <h2 className="mb-7.25 text-20 leading-7.5 font-medium">
            관심 카테고리 선택 (최대 5개, 최소 1개)
            <span className="text-18 leading-7.5 text-red_50"> (필수)</span>
          </h2>
          <div className="flex flex-wrap gap-4 mb-2.5">
            {InterestCategory.options.map(item => (
              <div
                key={item}
                onClick={() => {
                  if (categoryList.includes(item)) {
                    setCategoryList(categoryList.filter(v => v !== item))
                  } else if (categoryList.length < 5) {
                    setCategoryList([...categoryList, item])
                  }
                }}
                className={cn(
                  'py-1.5 px-3 border text-14 leading-7.5 border-[#E0E0E0] rounded-[10px]',
                  categoryList.includes(item)
                    ? 'cursor-pointer text-red_50'
                    : categoryList.length >= 5
                      ? 'cursor-not-allowed text-[#C0C0C0]'
                      : 'cursor-pointer text-neutral_70'
                )}
              >
                {INTEREST_CATEGORY_LABEL[item]}
              </div>
            ))}
            <div
              onClick={() => {
                if (categoryList.includes('other')) {
                  setCategoryList(categoryList.filter(v => v !== 'other'))
                } else if (categoryList.length < 5) {
                  setCategoryList([...categoryList, 'other'])
                }
              }}
              className={cn(
                'py-1.5 px-3 border text-14 leading-7.5 border-[#E0E0E0] rounded-[10px]',
                categoryList.includes('other')
                  ? 'cursor-pointer text-red_50'
                  : categoryList.length >= 5
                    ? 'cursor-not-allowed text-[#C0C0C0]'
                    : 'cursor-pointer text-neutral_70'
              )}
            >
              {INTEREST_CATEGORY_LABEL['other']}
            </div>
          </div>
          <p className="text-12 leading-24 text-neutral_70 mb-7">
            최소 1개 ~ 최대 5개까지 선택할 수 있어요.
          </p>
          <div className="h-px w-full bg-[#E0E0E0]" />
        </div>
        {/* 활동 유형 선택 섹션 */}
        <div className="flex flex-col">
          <h2 className="mb-5 text-20 leading-7.5 font-medium">
            활동 유형 선택 (중복 선택 가능)
            <span className="text-18 leading-7.5 text-[#666666]"> (선택)</span>
          </h2>
          <div className="flex gap-4 mb-8.25">
            {UserChannel.options.map(item => (
              <div
                key={item}
                onClick={() => {
                  if (channelList.includes(item)) {
                    setChannelList(channelList.filter(v => v !== item))
                  } else {
                    setChannelList([...channelList, item])
                  }
                }}
                className={cn(
                  'cursor-pointer py-1.5 px-3 border text-14 gap-2.5 flex items-center leading-7.5 border-[#E0E0E0] rounded-[10px]',
                  channelList.includes(item) ? 'text-red_50' : 'text-neutral_70'
                )}
              >
                {channelList.includes(item) ? (
                  <CheckIcon className="fill-red_50 stroke-red_50" />
                ) : (
                  <UnCheckIcon />
                )}
                {CHANNEL_LABEL[item]}
              </div>
            ))}
          </div>
          <div className="h-px w-full bg-[#E0E0E0] mb-17" />
        </div>
        {/* 지역 선택 섹션 */}
        <div className="flex flex-col mb-12.5">
          <h2 className="mb-8.25 text-20 leading-7.5 font-medium">
            지역 선택(최대 5개)<span className="text-18 leading-7.5 text-[#666666]"> (선택)</span>
          </h2>
          <RegionSelector regionList={regionList} setRegionList={setRegionList} />
          <div className="flex gap-2.5 mb-8.25 mt-2.5 h-8">
            {regionList.map(item => (
              <div
                key={item}
                className="flex items-center py-1 px-2.5 rounded-[10px] bg-[#F4F4F5] text-neutral_80 text-[10px] leading-24 gap-1.25"
              >
                {item}
                <button
                  className="cursor-pointer"
                  onClick={() => setRegionList(regionList.filter(v => v !== item))}
                >
                  <XIcon className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3.25 pr-13 mb-12.75">
            <Button className="w-1/5 border" variant="tertiary">
              초기화
            </Button>
            <Button className="w-4/5" variant="secondary">
              적용
            </Button>
          </div>
          <div className="h-px w-full bg-[#E0E0E0]" />
        </div>
        <Button className="w-full" variant="secondary">
          회원가입하기
        </Button>
      </div>
    </div>
  )
}
