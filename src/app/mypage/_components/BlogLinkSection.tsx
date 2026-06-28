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
            className="text-16 font-medium text-neutral_60 hover:text-neutral_30"
          >
            편집
          </button>
        )
      }
    >
      {editing ? (
        <div className="flex items-end gap-3">
          <Input
            variant="url"
            label="네이버 블로그 URL"
            value={value}
            onChange={e => setValue(e.target.value)}
            errorMessage={error}
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
      ) : (
        <div className="flex items-center gap-6 rounded-2xl border border-neutral_95 px-6 py-6">
          <span className="size-[62px] shrink-0 rounded-full bg-neutral_95" aria-hidden />
          <div className="flex flex-col gap-1">
            <span className="text-16 font-semibold text-neutral_20">네이버 블로그 URL</span>
            <span className="text-14 text-neutral_60">
              {blogUrl ?? '연동된 블로그가 없습니다.'}
            </span>
          </div>
        </div>
      )}
    </SectionShell>
  )
}
