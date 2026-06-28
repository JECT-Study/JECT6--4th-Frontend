'use client'

import type { MouseEvent, PointerEvent } from 'react'
import { useState } from 'react'

import { ChevronDownIcon, XIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { REGION_OPTIONS, type RegionSelection } from '@/constant'
import { cn } from '@/lib/utils'

const CITIES = REGION_OPTIONS

interface Props {
  location: string
  setLocation: (location: RegionSelection | null) => void
  triggerClassName?: string
}

export function LocationDropdown({ location, setLocation, triggerClassName }: Props) {
  const [selectedCity, setSelectedCity] = useState(CITIES[0])

  const districts = selectedCity.children

  const handleCitySelect = (city: (typeof CITIES)[number]) => {
    setSelectedCity(city)

    if (location === city.name) {
      setLocation(null)
      return
    }

    setLocation({
      label: city.name,
      parentRegionId: city.id,
    })
  }

  const handleSelect = (district: (typeof districts)[number]) => {
    const label = `${selectedCity.name} ${district.name}`

    if (location === label) {
      setLocation(null)
      return
    }

    setLocation({
      label,
      parentRegionId: selectedCity.id,
      childRegionId: district.id,
    })
  }

  const clearLocation = (event: MouseEvent<SVGSVGElement>) => {
    event.preventDefault()
    event.stopPropagation()
    setLocation(null)
  }

  const stopTrigger = (event: PointerEvent<SVGSVGElement>) => {
    event.preventDefault()
    event.stopPropagation()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            'group flex gap-3 h-10 w-fit cursor-pointer items-center justify-between bg-white px-3 font-pretendard text-[25px] leading-48 font-semibold text-neutral_20 outline-none disabled:cursor-not-allowed disabled:bg-neutral_99 disabled:text-neutral_70',
            triggerClassName
          )}
          type="button"
        >
          <span>{location || '지역 선택'}</span>
          <span className="flex items-center gap-1">
            {location && (
              <XIcon
                className="size-5 text-neutral_50 hover:text-neutral_20"
                aria-label="지역 필터 해제"
                onPointerDown={stopTrigger}
                onClick={clearLocation}
              />
            )}
            <ChevronDownIcon
              className="size-6 transition-transform group-data-[state=open]:rotate-180"
              aria-hidden
            />
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex h-82 w-132.5 overflow-hidden rounded-[10px] border-neutral_95 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        {/* 시/도 */}
        <div className="flex w-1/2 shrink-0 flex-col overflow-hidden border-r border-[#E0E0E0] text-14 leading-24">
          <p className="mb-5 shrink-0 font-bold">전국</p>
          <ul className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">
            {CITIES.map(city => (
              <li
                key={city.id}
                onClick={() => handleCitySelect(city)}
                className={cn(
                  'shrink-0 cursor-pointer transition hover:text-red_40',
                  location === city.name || selectedCity.id === city.id
                    ? 'font-bold text-red_50'
                    : 'text-neutral_70'
                )}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </div>

        {/* 구/군 */}
        <div className="ml-5 flex flex-1 flex-col overflow-hidden text-14 leading-24">
          <p className="mb-5 shrink-0 font-bold">전체</p>
          <ul className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">
            {districts.map(district => {
              const key = `${selectedCity.name} ${district.name}`
              const selected = location === key
              return (
                <li
                  key={district.id}
                  onClick={() => handleSelect(district)}
                  className={cn(
                    'shrink-0 cursor-pointer transition',
                    selected ? 'font-bold text-red_50' : 'text-neutral_70 hover:text-neutral_50'
                  )}
                >
                  {district.name}
                </li>
              )
            })}
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
