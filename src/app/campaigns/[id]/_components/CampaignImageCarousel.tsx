'use client'

import Image from 'next/image'

import { useEffect, useState } from 'react'

import { ImageOff } from 'lucide-react'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

interface CampaignImageCarouselProps {
  images?: string[]
}

// next/image는 호스트가 설정에 없거나 URL이 비정상이면 onError가 아니라 렌더 중 throw한다.
// 백엔드(mock)가 "https://..." 같은 깨진 URL을 주면 상세 페이지 전체가 크래시하므로,
// next/image에 넘기기 전에 렌더 가능한 src인지 먼저 검증한다.
function isRenderableImageSrc(src: string): boolean {
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

// 잘못된 URL이거나 로드 실패(404 등)면 기본 placeholder를 보여준다.
function CampaignImage({ src, alt }: { src: string; alt: string }) {
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

export function CampaignImageCarousel({ images = [] }: CampaignImageCarouselProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!api) return
    const onSelect = () => setCurrent(api.selectedScrollSnap())
    api.on('select', onSelect)
    return () => {
      api.off('select', onSelect)
    }
  }, [api])

  if (images.length === 0) {
    return <div className="h-100 w-full bg-neutral_95 mb-7.5 rounded-lg" />
  }

  return (
    <div className="relative mb-7.5">
      <Carousel setApi={setApi} opts={{ loop: true }}>
        <CarouselContent className="ml-0">
          {images.map((src, i) => (
            <CarouselItem key={i} className="pl-0">
              <div className="relative h-100 w-full overflow-hidden rounded-lg bg-neutral_95">
                <CampaignImage src={src} alt={`이미지 ${i + 1}`} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </>
        )}
      </Carousel>
      {images.length > 1 && (
        <div
          className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2"
          aria-hidden
        >
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-hidden
              className={cn(
                'size-2 rounded-full transition-colors',
                i === current ? 'bg-white' : 'bg-white/50'
              )}
              onClick={() => api?.scrollTo(i)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
