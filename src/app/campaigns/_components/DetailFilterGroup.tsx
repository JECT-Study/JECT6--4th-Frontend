'use client'

import type { Dispatch, SetStateAction } from 'react'

import { CAMPAIGN_CATEGORY_LABEL, CHANNEL_LABEL, TYPE_LABEL } from '@/constant'

import type { CampaignListParams } from '@/entities/campaign'
import { CampaignCategory, CampaignChannel, CampaignSort, CampaignType } from '@/entities/campaign'

import { Dropdown } from '@/shared/ui'

const SORT_OPTIONS = CampaignSort.options.map(value => ({
  value,
  label: { CLOSING: '마감임박', COMPETITION: '경쟁 낮은순', POPULAR: '인기순' }[value],
}))

const CATEGORY_OPTIONS = CampaignCategory.options.map(value => ({
  value,
  label: CAMPAIGN_CATEGORY_LABEL[value],
}))

const TYPE_OPTIONS = CampaignType.options.map(value => ({
  value,
  label: TYPE_LABEL[value],
}))

const CHANNEL_OPTIONS = CampaignChannel.options.map(value => ({
  value,
  label: CHANNEL_LABEL[value],
}))

interface Props {
  params: CampaignListParams
  setParams: Dispatch<SetStateAction<CampaignListParams>>
}

const FILTER_ITEM_CLASS = 'hover:bg-red_95 hover:text-red_50 focus:bg-red_95 focus:text-red_50'
const FILTER_ACTIVE_ITEM_CLASS = 'bg-red_95 text-red_50 font-bold focus:bg-red_95 focus:text-red_50'

function filterTriggerClass(selected: boolean) {
  return selected
    ? 'outline-none border-[#FB2929] text-[#FB2929] bg-[#FB2929]/10 hover:bg-[#FB2929]/15 gap-0.5 text-[16px] leading-[20px] font-regular'
    : 'outline-none border-neutral_95 hover:border-neutral_70 gap-0.5 text-[16px] leading-[20px] font-regular'
}

export function DetailFilterGroup({ params, setParams }: Props) {
  const update = (key: keyof CampaignListParams) => (value: string) =>
    setParams(prev => ({ ...prev, [key]: value, page: 0 }))

  return (
    <div className="flex items-center gap-4">
      <Dropdown
        className="w-fit min-w-auto"
        placeholder="카테고리"
        options={CATEGORY_OPTIONS}
        value={params.category}
        onChange={update('category')}
        triggerClassName={filterTriggerClass(!!params.category)}
        itemClassName={FILTER_ITEM_CLASS}
        activeItemClassName={FILTER_ACTIVE_ITEM_CLASS}
      />
      <Dropdown
        className="w-fit min-w-auto"
        placeholder="유형"
        options={TYPE_OPTIONS}
        value={params.type}
        onChange={update('type')}
        triggerClassName={filterTriggerClass(!!params.type)}
        itemClassName={FILTER_ITEM_CLASS}
        activeItemClassName={FILTER_ACTIVE_ITEM_CLASS}
      />
      <Dropdown
        className="w-fit min-w-auto"
        placeholder="채널"
        options={CHANNEL_OPTIONS}
        value={params.channel}
        onChange={update('channel')}
        triggerClassName={filterTriggerClass(!!params.channel)}
        itemClassName={FILTER_ITEM_CLASS}
        activeItemClassName={FILTER_ACTIVE_ITEM_CLASS}
      />
      <Dropdown
        className="w-fit min-w-auto"
        placeholder="상태"
        options={SORT_OPTIONS}
        value={params.sort}
        onChange={update('sort')}
        triggerClassName={filterTriggerClass(!!params.sort)}
        itemClassName={FILTER_ITEM_CLASS}
        activeItemClassName={FILTER_ACTIVE_ITEM_CLASS}
      />
    </div>
  )
}
