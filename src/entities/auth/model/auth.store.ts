import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type { AuthState } from './auth.schema'

export const authAtom = atomWithStorage<AuthState | null>('auth', null)

export const isLoggedInAtom = atom(get => Boolean(get(authAtom)?.accessToken))
