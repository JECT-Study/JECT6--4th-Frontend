import axios from 'axios'

import { keysToCamel } from './case-converter'

const isWrappedResponse = (value: unknown): value is { success: unknown; data: unknown } =>
  value !== null && typeof value === 'object' && 'success' in value && 'data' in value

const baseURL =
  typeof window === 'undefined'
    ? (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)
    : process.env.NEXT_PUBLIC_API_BASE_URL

export const http = axios.create({
  baseURL:
    typeof window === 'undefined'
      ? (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)
      : process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(config => {
  if (typeof window !== 'undefined') {
    const storedAuth = window.localStorage.getItem('auth')

    if (storedAuth) {
      try {
        const auth = JSON.parse(storedAuth) as { accessToken?: string; tokenType?: string }
        const tokenType = auth.tokenType || 'Bearer'

        if (auth.accessToken) {
          config.headers.Authorization = `${tokenType} ${auth.accessToken}`
        }
      } catch {
        delete config.headers.Authorization
      }
    } else {
      delete config.headers.Authorization
    }
  }

  return config
})

// 응답 데이터를 camelCase로 변환하고, { success, data } 래퍼를 벗겨서 프론트로 전달한다.
http.interceptors.response.use(
  response => {
    const responseData = keysToCamel(response.data)

    response.data = isWrappedResponse(responseData) ? responseData.data : responseData

    return response
  },
  (error: unknown) => {
    if (axios.isAxiosError<unknown>(error) && error.response?.data) {
      error.response.data = keysToCamel(error.response.data)
    }
    throw error
  }
)
