'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

import { InterestCategory } from '@/entities/user'

import { CATEGORY_LABELS } from '../hooks/useMyProfile'
import { getApiErrorMessage } from '../hooks/useProfileMutations'

import { SectionShell } from './SectionShell'

const ALL_CATEGORIES = InterestCategory.options

export function CategorySection({
  selected,
  onSave,
  isSaving = false,
}: {
  selected: InterestCategory[]
  onSave?: (next: InterestCategory[]) => Promise<unknown>
  isSaving?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState<InterestCategory[]>(selected)
  const [saveError, setSaveError] = useState<string>()

  const handleSaveCategories = async () => {
    try {
      await onSave?.(draft)
      setSaveError(undefined)
      setEditing(false)
    } catch (e) {
      setSaveError(getApiErrorMessage(e))
    }
  }

  const toggle = (c: InterestCategory) =>
    setDraft(prev => (prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]))

  return (
    <SectionShell
      title="관심 카테고리"
      action={
        editing ? (
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={isSaving}
              onClick={() => {
                void handleSaveCategories()
              }}
            >
              저장
            </Button>
            <Button size="sm" variant="tertiary" onClick={() => setEditing(false)}>
              취소
            </Button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => {
              setDraft(selected)
              setSaveError(undefined)
              setEditing(true)
            }}
            className="text-[18px] font-medium text-[#9b9b9b] hover:text-neutral_30"
          >
            편집
          </button>
        )
      }
    >
      <div className="rounded-[16px] border border-[#dcdcdc] px-6 py-8">
        <div className="flex flex-wrap gap-4">
          {(editing ? ALL_CATEGORIES : selected).map(c => {
            const active = editing ? draft.includes(c) : true
            return (
              <button
                key={c}
                type="button"
                disabled={!editing}
                onClick={() => editing && toggle(c)}
                className={cn(
                  'rounded-[10px] px-4 py-2 text-[20px] font-medium tracking-[0.8px] transition-colors',
                  active
                    ? 'bg-neutral_20 text-white'
                    : 'bg-[#f7f7f7] text-[#474747] hover:bg-neutral_95'
                )}
              >
                {CATEGORY_LABELS[c]}
              </button>
            )
          })}
        </div>
      </div>
      {editing && saveError && <p className="mt-2 text-12 text-red_50">{saveError}</p>}
      {!editing && selected.length === 0 && (
        <p className="text-14 text-neutral_60">선택된 관심 카테고리가 없습니다.</p>
      )}
    </SectionShell>
  )
}
