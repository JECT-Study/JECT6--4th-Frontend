/* eslint-disable @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment */
'use client'

import Script from 'next/script'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    naver: any
  }
}

interface CampaignMapProps {
  regionDepth1: string | null
  regionDepth2: string | null
}

const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? ''

export function CampaignMap({ regionDepth1, regionDepth2 }: CampaignMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)

  const address = [regionDepth1, regionDepth2].filter(Boolean).join(' ')

  function initMap() {
    if (!mapRef.current || !window.naver?.maps) return

    const map = new window.naver.maps.Map(mapRef.current, {
      zoom: 15,
      mapTypeControl: false,
    })

    if (!address || !window.naver.maps.Service) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    window.naver.maps.Service.geocode({ query: address }, (status: number, response: any) => {
      if (status !== window.naver.maps.Service.Status.OK) return

      const result = response.v2?.addresses?.[0]
      if (!result) return

      const position = new window.naver.maps.LatLng(result.y, result.x)
      map.setCenter(position)
      new window.naver.maps.Marker({ map, position })
    })
  }

  useEffect(() => {
    if (window.naver?.maps) initMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!address) return null

  return (
    <div className="p-5 flex flex-col gap-3 rounded-[8px] border border-neutral_95">
      <span className="">위치 정보</span>
      <Script
        src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}&submodules=geocoder`}
        strategy="afterInteractive"
        onLoad={initMap}
      />
      <div ref={mapRef} className="w-157.5 h-120 overflow-hidden rounded-lg bg-neutral_95" />
    </div>
  )
}
