'use client'

import Image from 'next/image'

import { useState } from 'react'

import { ImageOff } from 'lucide-react'

// next/image는 호스트가 설정에 없거나 URL이 비정상이면 onError가 아니라 렌더 중 throw한다.
// 백엔드(mock)가 "https://..." 같은 깨진 URL을 주면 페이지 전체가 크래시하므로,
// next/image에 넘기기 전에 렌더 가능한 src인지 먼저 검증한다.
export function isRenderableImageSrc(src: string): boolean {
  if (!src) return false
  if (src.startsWith('/')) return true // 로컬(상대) 경로 허용
  try {
    const url = new URL(src)
    // next.config.ts의 remotePatterns가 https만 허용하므로 https로 제한한다.
    const isHttps = url.protocol === 'https:'
    // localhost·IP·단일 도메인은 허용하되, "..." 같은 비정상 호스트만 거부한다.
    const hasValidHost = url.hostname.length > 0 && !/^\.+$/.test(url.hostname)
    return isHttps && hasValidHost
  } catch {
    return false
  }
}

// 잘못된 URL(throw 방지)이거나 로드 실패(onError, 404 등)면 기본 placeholder를 보여준다.
export function CampaignImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)
  const [prevSrc, setPrevSrc] = useState(src)

  // src가 바뀌면 이전 실패 상태가 placeholder로 고착되지 않도록 리셋한다.
  // (effect 대신 렌더 중 보정 — React 권장 패턴이며 set-state-in-effect 룰을 회피)
  if (src !== prevSrc) {
    setPrevSrc(src)
    setFailed(false)
  }

  if (!isRenderableImageSrc(src) || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral_95">
        <ImageOff className="size-10 text-neutral_60" aria-hidden />
      </div>
    )
  }

  return <Image src={src} alt={alt} fill className="object-cover" onError={() => setFailed(true)} />
}
