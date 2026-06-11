'use client'

import { useRouter } from 'next/navigation'

import { useState } from 'react'

import { onboardingService } from '@/service'

import Step1 from './_components/Step1'
import Step2 from './_components/Step2'
import Step3 from './_components/Step3'
import Step4 from './_components/Step4'

type OnboardingStep = 1 | 2 | 3 | 4

export default function Page() {
  const router = useRouter()
  const [step, setStep] = useState<OnboardingStep>(1)
  const [sessionId, setSessionId] = useState('')
  const [answers, setAnswers] = useState<Record<OnboardingStep, string>>({
    1: '',
    2: '',
    3: '',
    4: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const updateAnswer = (targetStep: OnboardingStep) => (answer: string) => {
    setAnswers(prev => ({ ...prev, [targetStep]: answer }))
  }

  const submitStep = async (targetStep: OnboardingStep, answer: string) => {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const result = await onboardingService.saveResponse({
        sessionId: sessionId || undefined,
        step: targetStep,
        answer,
      })

      setSessionId(result.sessionId)

      if (targetStep === 4) {
        router.replace('/')
        return
      }

      setStep((targetStep + 1) as OnboardingStep)
    } catch {
      setErrorMessage('응답 저장에 실패했어요. 다시 시도해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex justify-centerd flex-col gap-10 items-center min-h-screen bg-[linear-gradient(135deg,rgba(233,212,255,0.3)_0%,rgba(252,206,232,0.3)_50%,rgba(255,214,168,0.3)_100%)]">
      <ProgressIndicator step={step} />
      {step === 1 && (
        <Step1
          isSubmitting={isSubmitting}
          selected={answers[1]}
          setSelected={updateAnswer(1)}
          onSubmit={answer => void submitStep(1, answer)}
        />
      )}
      {step === 2 && (
        <Step2
          isSubmitting={isSubmitting}
          selected={answers[2]}
          setSelected={updateAnswer(2)}
          onSubmit={answer => void submitStep(2, answer)}
        />
      )}
      {step === 3 && (
        <Step3
          isSubmitting={isSubmitting}
          selected={answers[3]}
          setSelected={updateAnswer(3)}
          onSubmit={answer => void submitStep(3, answer)}
        />
      )}
      {step === 4 && (
        <Step4
          isSubmitting={isSubmitting}
          selected={answers[4]}
          setSelected={updateAnswer(4)}
          onSubmit={answer => void submitStep(4, answer)}
        />
      )}
      {errorMessage && <p className="text-14 font-medium leading-20 text-red_50">{errorMessage}</p>}
    </div>
  )
}

function ProgressIndicator({ step }: { step: OnboardingStep }) {
  return (
    <div className="mt-12 flex items-center gap-2">
      {[1, 2, 3, 4].map(item => (
        <span
          key={item}
          className={`h-2 rounded-full transition-all ${
            item === step ? 'w-10 bg-[#9810FA]' : 'w-2 bg-[#D8B4FE]'
          }`}
        />
      ))}
    </div>
  )
}
