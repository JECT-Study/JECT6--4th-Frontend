'use client'

import { useRouter } from 'next/navigation'

import { useCallback, useState } from 'react'

import { blogAnalysisService } from '@/service'

import type { BlogAnalysisResponse } from '@/entities/blog-analysis'

import Step1 from './_components/Step1'
import Step2 from './_components/Step2'
import Step3 from './_components/Step3'

export default function Page() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [blogUrl, setBlogUrl] = useState('')
  const [documentId, setDocumentId] = useState<number | null>(null)
  const [analysis, setAnalysis] = useState<BlogAnalysisResponse | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const startAnalysis = async (nextBlogUrl: string) => {
    setIsSubmitting(true)
    setErrorMessage('')

    try {
      const job = await blogAnalysisService.analyze({ blogUrl: nextBlogUrl })
      setBlogUrl(nextBlogUrl)
      setDocumentId(job.documentId)
      setStep(2)
    } catch {
      setErrorMessage('블로그 분석 요청에 실패했어요. URL을 확인해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const completeAnalysis = useCallback((nextAnalysis: BlogAnalysisResponse) => {
    setAnalysis(nextAnalysis)
    setStep(3)
  }, [])

  const handleError = useCallback((message: string) => {
    setErrorMessage(message)
    setStep(1)
  }, [])

  const reset = () => {
    setStep(1)
    setBlogUrl('')
    setDocumentId(null)
    setAnalysis(null)
    setErrorMessage('')
  }

  const viewResult = () => {
    router.push('/blog-ai-analysis')
  }

  return (
    <div className="flex justify-center flex-col gap-16 items-center min-h-screen bg-[linear-gradient(135deg,rgba(233,212,255,0.3)_0%,rgba(252,206,232,0.3)_50%,rgba(255,214,168,0.3)_100%)]">
      {step === 1 && (
        <Step1 isSubmitting={isSubmitting} onSubmit={url => void startAnalysis(url)} />
      )}
      {step === 2 && documentId !== null && (
        <Step2
          blogUrl={blogUrl}
          documentId={documentId}
          onComplete={completeAnalysis}
          onError={handleError}
        />
      )}
      {step === 3 && analysis && (
        <Step3 analysis={analysis} blogUrl={blogUrl} onCancel={reset} onViewResult={viewResult} />
      )}
      {errorMessage && (
        <p className="rounded-md bg-white/70 px-5 py-3 text-14 font-medium leading-20 text-red_50">
          {errorMessage}
        </p>
      )}
    </div>
  )
}
