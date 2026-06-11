'use client'

import { useState } from 'react'

import Step1 from './_components/Step1'
import Step2 from './_components/Step2'
import Step3 from './_components/Step3'

export default function Page() {
  const [step, setStep] = useState(1)

  const handleStep = (value: number) => {
    setStep(value)
  }

  return (
    <div className="flex justify-center flex-col gap-16 items-center min-h-screen bg-[linear-gradient(135deg,rgba(233,212,255,0.3)_0%,rgba(252,206,232,0.3)_50%,rgba(255,214,168,0.3)_100%)]">
      {step === 1 && <Step1 handleStep={handleStep} />}
      {step === 2 && <Step2 handleStep={handleStep} />}
      {step === 3 && <Step3 handleStep={handleStep} />}
    </div>
  )
}
