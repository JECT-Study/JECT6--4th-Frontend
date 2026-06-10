'use client'

import { useSyncExternalStore } from 'react'

import type { Campaign } from '@/entities/campaign'

const STORAGE_KEY = 'recent_views'
const MAX_ITEMS = 5

function readStorage(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? '[]'
  } catch {
    return '[]'
  }
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

export function saveRecentView(campaign: Campaign): void {
  try {
    const prev: Campaign[] = JSON.parse(readStorage()) as Campaign[]
    const deduped = prev.filter(c => c.id !== campaign.id)
    const next = [campaign, ...deduped].slice(0, MAX_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // localStorage 접근 불가 환경 무시
  }
}

export function useRecentViews(): Campaign[] {
  const json = useSyncExternalStore(subscribe, readStorage, () => '[]')
  try {
    return JSON.parse(json) as Campaign[]
  } catch {
    return []
  }
}
