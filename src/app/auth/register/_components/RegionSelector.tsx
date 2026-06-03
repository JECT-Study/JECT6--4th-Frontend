'use client'

import { useState } from 'react'

import { REGION_DATA } from '@/constant'
import { cn } from '@/lib/utils'

import CheckIcon from '@/shared/assets/icons/checked.svg'
import UnCheckIcon from '@/shared/assets/icons/unchecked.svg'

const CITIES = Object.keys(REGION_DATA)

interface RegionSelectorProps {
  regionList: string[]
  setRegionList: (list: string[]) => void
  maxCount?: number
}

export default function RegionSelector({
  regionList,
  setRegionList,
  maxCount = 5,
}: RegionSelectorProps) {
  const [selectedCity, setSelectedCity] = useState<string>(CITIES[0])

  const districts = REGION_DATA[selectedCity] ?? []

  const toggleDistrict = (district: string) => {
    const key = `${selectedCity} ${district}`
    if (regionList.includes(key)) {
      setRegionList(regionList.filter(v => v !== key))
    } else if (regionList.length < maxCount) {
      setRegionList([...regionList, key])
    }
  }

  return (
    <div className="flex border border-[#E0E0E0] rounded-[10px] h-82 max-w-132.5 p-5 overflow-hidden">
      {/* 시/도 목록 */}
      <div className="w-1/2 shrink-0 border-r border-[#E0E0E0] text-14 leading-24 flex flex-col overflow-hidden">
        <p className="mb-5 font-bold shrink-0">전국</p>
        <ul className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5">
          {CITIES.map(city => (
            <li
              key={city}
              onClick={() => setSelectedCity(city)}
              className={cn(
                'cursor-pointer shrink-0',
                selectedCity === city ? 'text-red_50 font-bold' : 'text-neutral_70'
              )}
            >
              {city}
            </li>
          ))}
        </ul>
      </div>

      {/* 구/시/군 목록 */}
      <div className="ml-5 flex-1 text-14 leading-24 flex flex-col overflow-hidden">
        <p className="mb-5 font-bold shrink-0">전체</p>
        <ul className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-5">
          {districts.map(district => {
            const key = `${selectedCity} ${district}`
            const selected = regionList.includes(key)
            const disabled = !selected && regionList.length >= maxCount
            return (
              <li
                key={district}
                onClick={() => !disabled && toggleDistrict(district)}
                className={cn(
                  'cursor-pointer shrink-0 flex justify-between items-center',
                  disabled ? 'text-[#C0C0C0] cursor-not-allowed' : 'text-neutral_70'
                )}
              >
                {district}
                {selected ? (
                  <CheckIcon className="fill-neutral_30 stroke-neutral_30" />
                ) : (
                  <UnCheckIcon />
                )}
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
