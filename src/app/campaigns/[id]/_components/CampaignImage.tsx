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
    const isHttp = url.protocol === 'https:' || url.protocol === 'http:'
    const hasRealHost = /^[a-z0-9-]+(\.[a-z0-9-]+)+$/i.test(url.hostname)
    return isHttp && hasRealHost
  } catch {
    return false
  }
}

// 잘못된 URL(throw 방지)이거나 로드 실패(onError, 404 등)면 기본 placeholder를 보여준다.
export function CampaignImage({ src, alt }: { src: string; alt: string }) {
  const [failed, setFailed] = useState(false)

  if (!isRenderableImageSrc(src) || failed) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-neutral_95">
        <ImageOff className="size-10 text-neutral_60" aria-hidden />
      </div>
    )
  }

  return <Image src={src} alt={alt} fill className="object-cover" onError={() => setFailed(true)} />
}
