import axios, { AxiosHeaders } from 'axios'

import type { TokenResponse } from '@/entities/auth'

import { keysToCamel, keysToSnake } from './case-converter'

const PUBLIC_PATHS = ['/api/auth/login', '/api/auth/refresh']

const getStoredAuth = (): Pick<TokenResponse, 'accessToken' | 'tokenType'> | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const storedAuth = window.localStorage.getItem('auth')

  if (!storedAuth) {
    return null
  }

  try {
    const parsedAuth = JSON.parse(storedAuth) as Partial<TokenResponse> | null

    if (!parsedAuth?.accessToken) {
      return null
    }

    return {
      accessToken: parsedAuth.accessToken,
      tokenType: parsedAuth.tokenType ?? 'Bearer',
    }
  } catch {
    return null
  }
}

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 바디·쿼리를 snake_case로 변환해 서버로 보낸다.
http.interceptors.request.use(config => {
  const headers = AxiosHeaders.from(config.headers)
  const isPublicPath = PUBLIC_PATHS.some(path => config.url?.startsWith(path))

  if (isPublicPath) {
    headers.delete('Authorization')
  } else {
    const auth = getStoredAuth()

    if (auth) {
      headers.set('Authorization', `${auth.tokenType} ${auth.accessToken}`)
    } else {
      headers.delete('Authorization')
    }
  }

  config.headers = headers

  if (config.data) {
    config.data = keysToSnake(config.data)
  }
  if (config.params) {
    config.params = keysToSnake(config.params)
  }
  return config
})

// 응답 데이터를 camelCase로 변환하고, { success, data } 래퍼를 벗겨서 프론트로 전달한다.
http.interceptors.response.use(
  response => {
    response.data = keysToCamel(response.data)
    if (
      response.data !== null &&
      typeof response.data === 'object' &&
      'success' in response.data &&
      'data' in response.data
    ) {
      response.data = response.data.data
    }
    return response
  },
  (error: unknown) => {
    if (axios.isAxiosError<unknown>(error) && error.response?.data) {
      error.response.data = keysToCamel(error.response.data)
    }
    throw error
  }
)
