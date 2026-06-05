'use client'

import { useState } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  SelectableCategory,
  INTEREST_CATEGORY_LABEL,
  CHANNEL_LABEL,
  SelectableChannel,
} from '@/constant'
import { cn } from '@/lib/utils'

import { InterestCategory, UserChannel } from '@/entities/user'
// import { userService } from '@/service'

import CheckIcon from '@/shared/assets/icons/checked.svg'
import UnCheckIcon from '@/shared/assets/icons/unchecked.svg'
import XIcon from '@/shared/assets/icons/x.svg'
import { Button, Input } from '@/shared/ui'

import RegionSelector from './_components/RegionSelector'

const registerSchema = z.object({
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이에요.')
    .max(12, '닉네임은 최대 12자까지 가능해요.')
    .regex(/^[가-힣a-zA-Z0-9]+$/, '한글, 영문, 숫자만 사용 가능해요.'),
  interestCategories: z.array(z.string()).min(1, '카테고리를 최소 1개 선택해주세요.'),
  channels: z.array(z.string()),
  regions: z.array(z.string()),
})

type RegisterFormValues = z.infer<typeof registerSchema>

export default function Page() {
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegisterFormValues>({
    mode: 'onChange',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nickname: '',
      interestCategories: [],
      channels: [],
      regions: [],
    },
  })

  const categoryList = watch('interestCategories') as SelectableCategory[]
  const channelList = watch('channels') as SelectableChannel[]
  const regionList = watch('regions')

  const handleRandomNickname = () => {
    // const { nickname } = await userService.randomNickname()
    const nickname = '테스트닉네임'
    setValue('nickname', nickname, { shouldValidate: true })
    setNicknameAvailable(null)
  }

  const handleCheckNickname = () => {
    const nickname = watch('nickname')
    console.log(nickname)
    // const { available } = await userService.checkNickname(nickname)
    const available = nickname !== '테스트 닉네임'
    setNicknameAvailable(available)
    if (!available) {
      setError('nickname', { message: '이미 사용 중인 닉네임이에요.' })
    }
  }

  const toggleCategory = (item: SelectableCategory) => {
    if (categoryList.includes(item)) {
      setValue(
        'interestCategories',
        categoryList.filter(v => v !== item),
        { shouldValidate: true }
      )
    } else if (categoryList.length < 5) {
      setValue('interestCategories', [...categoryList, item], { shouldValidate: true })
    }
  }

  const toggleChannel = (item: SelectableChannel) => {
    if (channelList.includes(item)) {
      setValue(
        'channels',
        channelList.filter(v => v !== item)
      )
    } else {
      setValue('channels', [...channelList, item])
    }
  }

  const onSubmit = (data: RegisterFormValues) => {
    if (nicknameAvailable !== true) {
      setError('nickname', { message: '닉네임 중복 확인을 해주세요.' })
      return
    }
    const validCategories = data.interestCategories.filter((c): c is InterestCategory =>
      InterestCategory.options.includes(c as InterestCategory)
    )
    console.log({
      nickname: data.nickname,
      interestCategories: validCategories,
      channels: data.channels as UserChannel[],
      regions: data.regions,
    })
    // await userService.updateMe({
    //   nickname: data.nickname,
    //   interestCategories: validCategories,
    //   channels: data.channels as UserChannel[],
    //   regions: data.regions,
    // })
  }

  return (
    <form onSubmit={e => void handleSubmit(onSubmit)(e)} className="flex w-full max-w-360 mx-auto">
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
          <div className="flex gap-2.5 pr-12.75">
            <Input
              placeholder="닉네임을 입력해주세요"
              inputClassName="text-14 leading-24"
              errorMessage={errors.nickname?.message}
              helperText={
                nicknameAvailable === true
                  ? '사용 가능한 닉네임이에요.'
                  : '2~12자, 한글/영문/숫자 사용 가능'
              }
              rightAddon={
                <Button
                  type="button"
                  className="py-0.75 px-2.5 text-12 leading-7.5 h-fit"
                  onClick={handleRandomNickname}
                >
                  랜덤 생성
                </Button>
              }
              {...register('nickname', {
                onChange: () => setNicknameAvailable(null),
              })}
            />
            <Button
              type="button"
              className="w-36.75 shrink-0 text-14 leading-7.5 font-medium py-2.5 h-12 self-start"
              onClick={handleCheckNickname}
              disabled={!watch('nickname') || isSubmitting}
            >
              중복 확인
            </Button>
          </div>
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
                onClick={() => toggleCategory(item)}
                className={cn(
                  'py-1.5 px-3 border text-14 leading-7.5 border-[#E0E0E0] rounded-[10px] transition hover:bg-neutral_99',
                  categoryList.includes(item)
                    ? 'cursor-pointer text-red_50 font-semibold'
                    : categoryList.length >= 5
                      ? 'cursor-not-allowed text-[#C0C0C0]'
                      : 'cursor-pointer text-neutral_70 hover:text-neutral_50'
                )}
              >
                {INTEREST_CATEGORY_LABEL[item]}
              </div>
            ))}
            <div
              onClick={() => toggleCategory('OTHER')}
              className={cn(
                'py-1.5 px-3 border text-14 leading-7.5 border-[#E0E0E0] rounded-[10px] transition hover:bg-neutral_99',
                categoryList.includes('OTHER')
                  ? 'cursor-pointer text-red_50 font-semibold'
                  : categoryList.length >= 5
                    ? 'cursor-not-allowed text-[#C0C0C0]'
                    : 'cursor-pointer text-neutral_70 hover:text-neutral_50'
              )}
            >
              {INTEREST_CATEGORY_LABEL['OTHER']}
            </div>
          </div>
          {errors.interestCategories && (
            <p className="text-12 leading-24 text-red_50 mb-1">
              {errors.interestCategories.message}
            </p>
          )}
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
                onClick={() => toggleChannel(item)}
                className={cn(
                  'cursor-pointer py-1.5 px-3 border text-14 gap-2.5 flex items-center leading-7.5 border-[#E0E0E0] rounded-[10px] hover:bg-neutral_99 transition',
                  channelList.includes(item)
                    ? 'text-red_50 font-semibold'
                    : 'text-neutral_70 hover:text-neutral_50'
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
            <div
              onClick={() => toggleChannel('OTHER')}
              className={cn(
                'cursor-pointer py-1.5 px-3 border text-14 gap-2.5 flex items-center leading-7.5 border-[#E0E0E0] rounded-[10px] hover:bg-neutral_99 transition',
                channelList.includes('OTHER')
                  ? 'text-red_50 font-semibold'
                  : 'text-neutral_70 hover:text-neutral_50'
              )}
            >
              {channelList.includes('OTHER') ? (
                <CheckIcon className="fill-red_50 stroke-red_50" />
              ) : (
                <UnCheckIcon />
              )}
              {CHANNEL_LABEL['OTHER']}
            </div>
          </div>
          <div className="h-px w-full bg-[#E0E0E0] mb-17" />
        </div>
        {/* 지역 선택 섹션 */}
        <div className="flex flex-col mb-12.5">
          <h2 className="mb-8.25 text-20 leading-7.5 font-medium">
            지역 선택(최대 5개)
            <span className="text-18 leading-7.5 text-[#666666]"> (선택)</span>
          </h2>
          <RegionSelector
            regionList={regionList}
            setRegionList={list => setValue('regions', list)}
          />
          <div className="flex gap-2.5 mb-8.25 mt-2.5 h-8">
            {regionList.map(item => (
              <div
                key={item}
                className="flex items-center py-1 px-2.5 rounded-[10px] bg-[#F4F4F5] text-neutral_80 text-[10px] leading-24 gap-1.25"
              >
                {item}
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={() =>
                    setValue(
                      'regions',
                      regionList.filter(v => v !== item)
                    )
                  }
                >
                  <XIcon className="size-4 stroke-[#D1D5DC]" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-3.25 pr-13 mb-12.75">
            <Button
              type="button"
              className="w-1/5 border"
              variant="tertiary"
              onClick={() => setValue('regions', [])}
            >
              초기화
            </Button>
            <Button type="button" className="w-4/5" variant="secondary">
              적용
            </Button>
          </div>
          <div className="h-px w-full bg-[#E0E0E0]" />
        </div>
        <Button
          type="submit"
          className="w-full"
          variant="secondary"
          disabled={isSubmitting || !isValid}
        >
          회원가입하기
        </Button>
      </div>
    </form>
  )
}
