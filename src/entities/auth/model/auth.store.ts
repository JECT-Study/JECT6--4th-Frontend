import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

import type { TokenResponse } from './auth.schema'

export const authAtom = atomWithStorage<TokenResponse | null>('auth', null)

export const isLoggedInAtom = atom(get => Boolean(get(authAtom)?.accessToken))
