'use client'

import Script from 'next/script'

import { useRef, useState } from 'react'

import type { CampaignLocation } from '@/entities/campaign'

import LocationIcon from '@/shared/assets/icons/location.svg'

type NaverLatLng = object

interface NaverMapInstance {
  setCenter: (position: NaverLatLng) => void
}

interface NaverGeocodeResponse {
  v2?: {
    addresses?: {
      x: string
      y: string
    }[]
  }
}

interface NaverMaps {
  LatLng: new (latitude: number, longitude: number) => NaverLatLng
  Map: new (
    element: HTMLElement,
    options: {
      mapTypeControl: boolean
      zoom: number
    }
  ) => NaverMapInstance
  Marker: new (options: { map: NaverMapInstance; position: NaverLatLng }) => unknown
  Service?: {
    Status: {
      OK: number
    }
    geocode: (
      options: { query: string },
      callback: (status: number, response: NaverGeocodeResponse) => void
    ) => void
  }
}

declare global {
  interface Window {
    naver?: {
      maps: NaverMaps
    }
  }
}

interface Props {
  location?: CampaignLocation | null
}

const CLIENT_ID = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID ?? ''

export function CampaignMap({ location }: Props) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const address =
    location?.address ?? [location?.regionDepth1, location?.regionDepth2].filter(Boolean).join(' ')
  const hasCoordinate =
    typeof location?.latitude === 'number' && typeof location?.longitude === 'number'

  function renderMarker(map: NaverMapInstance, latitude: number, longitude: number) {
    const position = new window.naver.maps.LatLng(latitude, longitude)

    map.setCenter(position)
    new window.naver.maps.Marker({ map, position })
  }

  function initMap() {
    if (!mapRef.current || !window.naver?.maps) return

    setErrorMessage(null)

    const map = new window.naver.maps.Map(mapRef.current, {
      zoom: 15,
      mapTypeControl: false,
    })

    if (hasCoordinate) {
      renderMarker(map, location.latitude, location.longitude)
      setIsMapReady(true)
      return
    }

    if (!address) {
      setErrorMessage('위치 정보가 없습니다.')
      return
    }

    if (!window.naver.maps.Service) {
      setErrorMessage('지도 검색 서비스를 불러오지 못했습니다.')
      return
    }

    window.naver.maps.Service.geocode({ query: address }, (status, response) => {
      if (status !== window.naver.maps.Service.Status.OK) {
        setErrorMessage('주소를 지도에서 찾지 못했습니다.')
        return
      }

      const result = response.v2?.addresses?.[0]
      if (!result) {
        setErrorMessage('주소를 지도에서 찾지 못했습니다.')
        return
      }

      renderMarker(map, Number(result.y), Number(result.x))
      setIsMapReady(true)
    })
  }

  if (!address && !hasCoordinate) return null

  return (
    <div className="flex flex-col gap-5 rounded-[8px] border border-neutral_95 p-5">
      <div className="flex items-center gap-2.5">
        <LocationIcon />
        <span className="text-24 font-medium leading-32">위치 정보</span>
      </div>
      {CLIENT_ID && (
        <Script
          src={`https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${CLIENT_ID}&submodules=geocoder`}
          strategy="afterInteractive"
          onReady={initMap}
        />
      )}
      {address && <p className="m-0 text-16 font-medium leading-24 text-neutral_50">{address}</p>}
      <div className="relative h-120 w-full overflow-hidden rounded-lg bg-neutral_95">
        <div ref={mapRef} className="size-full" />
        {(!CLIENT_ID || errorMessage || !isMapReady) && (
          <div className="absolute inset-0 flex items-center justify-center bg-neutral_95 px-5 text-center text-15 font-medium leading-22 text-neutral_60">
            {!CLIENT_ID
              ? '지도 API 키가 설정되지 않았습니다.'
              : (errorMessage ?? '지도를 불러오는 중...')}
          </div>
        )}
      </div>
    </div>
  )
}
