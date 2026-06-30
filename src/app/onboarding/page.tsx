'use client'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { userService } from '@/service'

import { InterestCategory } from '@/entities/user'

import Step1 from './_components/Step1'
import Step2 from './_components/Step2'
import Step3 from './_components/Step3'

type OnboardingStep = 1 | 2 | 3
type ActivityLevel = 'ENTRY' | 'BEGINNER' | 'INTERMEDIATE' | 'EXPERT'

export default function Page() {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>(1)
  const [nickname, setNickname] = useState('')
  const [nicknameAvailable, setNicknameAvailable] = useState<boolean | null>(null)
  const [categories, setCategories] = useState<InterestCategory[]>([])
  const [activityLevel, setActivityLevel] = useState<ActivityLevel | ''>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleRandomNickname = async () => {
    setErrorMessage('')

    try {
      const { nickname: nextNickname } = await userService.randomNickname()
      setNickname(nextNickname)
      setNicknameAvailable(null)
    } catch {
      setErrorMessage('랜덤 닉네임을 불러오지 못했어요.')
    }
  }

  const handleCheckNickname = async () => {
    if (!nickname) return

    setErrorMessage('')

    try {
      const { available } = await userService.checkNickname(nickname)
      setNicknameAvailable(available)
      if (!available) {
        setErrorMessage('이미 사용 중인 닉네임이에요.')
      }
    } catch {
      setErrorMessage('닉네임 중복 확인에 실패했어요.')
    }
  }

  const submitProfile = async () => {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      await userService.createProfile({
        nickname,
        categoryTypes: categories,
      })

      router.replace('/')
    } catch {
      setErrorMessage('회원가입에 실패했어요. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_18%,rgba(255,116,116,0.16)_0%,rgba(255,229,229,0.46)_33%,rgba(255,255,255,0.98)_72%)] px-6">
      <ProgressIndicator step={step} />
      {step === 1 && (
        <Step1
          isNicknameAvailable={nicknameAvailable}
          isSubmitting={isSubmitting}
          nickname={nickname}
          onChangeNickname={value => {
            setNickname(value)
            setNicknameAvailable(null)
          }}
          onCheckNickname={() => void handleCheckNickname()}
          onRandomNickname={() => void handleRandomNickname()}
          onSubmit={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <Step2
          isSubmitting={isSubmitting}
          onBack={() => setStep(1)}
          selected={categories}
          setSelected={setCategories}
          onSubmit={() => setStep(3)}
        />
      )}
      {step === 3 && (
        <Step3
          activityLevel={activityLevel}
          isSubmitting={isSubmitting}
          onBack={() => setStep(2)}
          setActivityLevel={setActivityLevel}
          onSubmit={() => void submitProfile()}
        />
      )}
      {errorMessage && <p className="text-14 font-medium leading-20 text-red_50">{errorMessage}</p>}
    </div>
  )
}

function ProgressIndicator({ step }: { step: OnboardingStep }) {
  return (
    <div className="flex items-center gap-5">
      {[1, 2, 3].map(item => (
        <div key={item} className="flex items-center gap-5">
          <span
            className={`size-2.5 rounded-full transition-colors ${
              item <= step ? 'bg-[#FF6B6B]' : 'border border-[#B8B8B8] bg-white'
            }`}
          />
          {item < 3 && (
            <span
              className={`h-px w-11 transition-colors ${
                item < step ? 'bg-[#FF6B6B]' : 'bg-[#B8B8B8]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
