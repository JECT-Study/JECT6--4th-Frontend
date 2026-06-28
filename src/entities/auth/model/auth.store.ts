import { atom } from 'jotai'

import { clearAccessToken, setAccessToken } from '@/shared/api/access-token'

import type { AuthState } from './auth.schema'

const authStateAtom = atom(null as AuthState | null)

export const authAtom = atom(
  get => get(authStateAtom),
  (_get, set, auth: AuthState | null) => {
    set(authStateAtom, auth)

    if (auth?.accessToken) {
      setAccessToken(auth)
      return
    }

    clearAccessToken()
  }
)

export const isLoggedInAtom = atom(get => Boolean(get(authAtom)?.accessToken))
