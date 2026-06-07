'use client'

import { Dispatch, SetStateAction, useState } from 'react'

import { ChevronDownIcon } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { REGION_DATA } from '@/constant'
import { cn } from '@/lib/utils'

const CITIES = Object.keys(REGION_DATA)

interface Props {
  location: string
  setLocation: Dispatch<SetStateAction<string>>
}

export function LocationDropdown({ location, setLocation }: Props) {
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[0])

  const districts = REGION_DATA[selectedCity] ?? []

  const handleSelect = (district: string) => {
    setLocation(`${selectedCity} ${district}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex gap-3 h-10 w-fit cursor-pointer items-center justify-between bg-white px-3 font-pretendard text-[25px] leading-48 font-semibold text-neutral_20 outline-none disabled:cursor-not-allowed disabled:bg-neutral_99 disabled:text-neutral_70"
          type="button"
        >
          <span>{location || '지역 선택'}</span>
          <ChevronDownIcon
            className="size-6 transition-transform group-data-[state=open]:rotate-180"
            aria-hidden
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex h-82 w-132.5 overflow-hidden rounded-[10px] border-neutral_95 bg-white p-5 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
        {/* 시/도 */}
        <div className="flex w-1/2 shrink-0 flex-col overflow-hidden border-r border-[#E0E0E0] text-14 leading-24">
          <p className="mb-5 shrink-0 font-bold">전국</p>
          <ul className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">
            {CITIES.map(city => (
              <li
                key={city}
                onClick={() => setSelectedCity(city)}
                className={cn(
                  'shrink-0 cursor-pointer transition hover:text-red_40',
                  selectedCity === city ? 'font-bold text-red_50' : 'text-neutral_70'
                )}
              >
                {city}
              </li>
            ))}
          </ul>
        </div>

        {/* 구/군 */}
        <div className="ml-5 flex flex-1 flex-col overflow-hidden text-14 leading-24">
          <p className="mb-5 shrink-0 font-bold">전체</p>
          <ul className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto">
            {districts.map(district => {
              const key = `${selectedCity} ${district}`
              const selected = location === key
              return (
                <li
                  key={district}
                  onClick={() => handleSelect(district)}
                  className={cn(
                    'shrink-0 cursor-pointer transition',
                    selected ? 'font-bold text-red_50' : 'text-neutral_70 hover:text-neutral_50'
                  )}
                >
                  {district}
                </li>
              )
            })}
          </ul>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
