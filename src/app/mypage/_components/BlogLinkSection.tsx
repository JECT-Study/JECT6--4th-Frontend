'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'

import { Input } from '@/shared/ui/input/Input'

import { getApiErrorMessage } from '../hooks/useProfileMutations'

import { SectionShell } from './SectionShell'

export function BlogLinkSection({
  blogUrl,
  onSave,
  isSaving = false,
}: {
  blogUrl: string | null
  onSave?: (blogUrl: string) => Promise<unknown>
  isSaving?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(blogUrl ?? '')
  const [error, setError] = useState<string>()

  const handleSave = async () => {
    const next = value.trim()
    if (!next.startsWith('https://')) {
      setError('https:// 로 시작하는 URL을 입력해 주세요.')
      return
    }
    try {
      await onSave?.(next)
      setError(undefined)
      setEditing(false)
    } catch (e) {
      setError(getApiErrorMessage(e))
    }
  }

  return (
    <SectionShell
      title="내 블로그 연동"
      action={
        editing ? null : (
          <button
            type="button"
            onClick={() => {
              setValue(blogUrl ?? '')
              setError(undefined)
              setEditing(true)
            }}
            className="text-[18px] font-medium text-[#9b9b9b] hover:text-neutral_30"
          >
            편집
          </button>
        )
      }
    >
      {editing ? (
        <div>
          <div className="flex items-end gap-3">
            <Input
              variant="url"
              label="네이버 블로그 URL"
              value={value}
              onChange={e => setValue(e.target.value)}
              placeholder="https://blog.naver.com/..."
              className="flex-1"
            />
            <Button
              disabled={isSaving}
              onClick={() => {
                void handleSave()
              }}
            >
              저장
            </Button>
            <Button variant="tertiary" onClick={() => setEditing(false)}>
              취소
            </Button>
          </div>
          {error && <p className="mt-2 text-12 font-normal leading-16 text-red_50">{error}</p>}
        </div>
      ) : (
        <div className="flex items-center gap-6 rounded-[16px] border border-[#dcdcdc] px-6 py-8">
          <span className="size-[62px] shrink-0 rounded-[12px] bg-neutral_95" aria-hidden />
          <div className="flex flex-col gap-1">
            <span className="text-[22px] font-semibold text-[#474747]">네이버 블로그 URL</span>
            <span className="text-[18px] font-medium text-[#008dcf] underline">
              {blogUrl ?? '연동된 블로그가 없습니다.'}
            </span>
          </div>
        </div>
      )}
    </SectionShell>
  )
}
