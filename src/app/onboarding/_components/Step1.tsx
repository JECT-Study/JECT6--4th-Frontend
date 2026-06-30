'use client'

import { RotateCcw } from 'lucide-react'

import { Button } from '@/shared/ui'

interface Props {
  isNicknameAvailable: boolean | null
  isSubmitting: boolean
  nickname: string
  onChangeNickname: (nickname: string) => void
  onCheckNickname: () => void
  onRandomNickname: () => void
  onSubmit: () => void
}

const NICKNAME_PATTERN = /^[가-힣a-zA-Z0-9]+$/

export default function Step1({
  isNicknameAvailable,
  isSubmitting,
  nickname,
  onChangeNickname,
  onCheckNickname,
  onRandomNickname,
  onSubmit,
}: Props) {
  const nicknameErrorMessage = getNicknameErrorMessage(nickname)
  const canSubmit = nickname.length > 0 && !nicknameErrorMessage && isNicknameAvailable === true

  return (
    <div className="mt-17 w-full max-w-185">
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-center text-[42px] font-bold leading-13 text-black">
          닉네임을 설정해주세요
        </h1>
        <p className="text-18 leading-7 text-[#9A8F8F]">
          몇가지 정보만 입력하면 나에게 맞는 공고를 추천받을 수 있어요
        </p>
      </div>
      <div className="mt-16 flex flex-col">
        <label className="mb-5 text-18 font-medium leading-7 text-black">
          닉네임 <span className="text-red_50">(필수)</span>
        </label>
        <div className="flex w-full rounded-[14px] border border-[#BDBDBD] bg-white px-5 py-5 shadow-[0_10px_20px_rgba(255,122,122,0.15)] focus-within:border-[#FF6B6B]">
          <input
            value={nickname}
            placeholder="2~12자, 한글/영문/숫자 사용 가능"
            className="min-w-0 flex-1 border-0 bg-transparent text-20 font-medium leading-7 text-black outline-none placeholder:text-[#6F6F6F]"
            onChange={event => onChangeNickname(event.target.value)}
          />
          <Button
            type="button"
            className="h-12 w-27 shrink-0 rounded-[10px] border-0 text-14 font-medium leading-5"
            disabled={!nickname || Boolean(nicknameErrorMessage) || isSubmitting}
            onClick={onCheckNickname}
          >
            중복 확인
          </Button>
        </div>
        {(nicknameErrorMessage || isNicknameAvailable === true) && (
          <p
            className={`mt-2 text-14 leading-5 ${
              nicknameErrorMessage ? 'text-red_50' : 'text-[#6F6F6F]'
            }`}
          >
            {nicknameErrorMessage || '사용 가능한 닉네임이에요.'}
          </p>
        )}
        <button
          type="button"
          className="mt-5 flex w-fit items-center cursor-pointer gap-2 text-18 font-medium leading-7 text-[#9A9A9A] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isSubmitting}
          onClick={onRandomNickname}
        >
          <RotateCcw className="size-5" aria-hidden />
          닉네임 추천받기
        </button>
        <Button
          className="mt-22 h-18 w-full rounded-lg bg-[#0B1220] text-18 font-semibold leading-7 text-white hover:bg-[#151D2D]"
          disabled={!canSubmit || isSubmitting}
          onClick={onSubmit}
        >
          다음
        </Button>
      </div>
    </div>
  )
}

function getNicknameErrorMessage(nickname: string) {
  if (!nickname) return ''
  if (nickname.length < 2) return '닉네임은 최소 2자 이상이에요.'
  if (nickname.length > 12) return '닉네임은 최대 12자까지 가능해요.'
  if (!NICKNAME_PATTERN.test(nickname)) return '한글, 영문, 숫자만 사용 가능해요.'
  return ''
}
