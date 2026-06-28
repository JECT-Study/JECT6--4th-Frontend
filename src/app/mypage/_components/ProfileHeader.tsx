'use client'

import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { userService } from '@/service'

import { Input } from '@/shared/ui/input/Input'

export function ProfileHeader({
  nickname,
  onSave,
  isSaving = false,
}: {
  nickname: string
  onSave?: (nickname: string) => void
  isSaving?: boolean
}) {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(nickname)
  const [error, setError] = useState<string>()
  const [checking, setChecking] = useState(false)

  const handleSave = async () => {
    const next = value.trim()
    if (!next) {
      setError('닉네임을 입력해 주세요.')
      return
    }
    if (next === nickname) {
      setEditing(false)
      return
    }
    setChecking(true)
    try {
      const { available } = await userService.checkNickname(next)
      if (!available) {
        setError('이미 사용 중인 닉네임입니다.')
        return
      }
    } catch {
      setError('닉네임 확인 중 오류가 발생했습니다. 다시 시도해 주세요.')
      return
    } finally {
      setChecking(false)
    }
    setError(undefined)
    onSave?.(next)
    setEditing(false)
  }

  if (!editing) {
    return (
      <div className="flex items-end gap-4 pt-12">
        <h1 className="text-40 font-bold leading-12 text-neutral_20">{nickname}</h1>
        <button
          type="button"
          onClick={() => {
            setValue(nickname)
            setEditing(true)
          }}
          className="pb-2 text-16 font-medium text-neutral_60 hover:text-neutral_30"
        >
          편집
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-end gap-3 pt-12">
      <Input
        label="닉네임"
        value={value}
        onChange={e => setValue(e.target.value)}
        errorMessage={error}
        maxLength={12}
        className="w-80"
      />
      <Button
        size="md"
        disabled={isSaving || checking}
        onClick={() => {
          void handleSave()
        }}
      >
        저장
      </Button>
      <Button size="md" variant="tertiary" onClick={() => setEditing(false)}>
        취소
      </Button>
    </div>
  )
}
