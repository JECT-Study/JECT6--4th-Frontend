import axios, { type InternalAxiosRequestConfig } from 'axios'

import { clearAccessToken, getAuthorizationHeader, setAccessToken } from './access-token'
import { keysToCamel } from './case-converter'

const isWrappedResponse = (value: unknown): value is { success: unknown; data: unknown } =>
  value !== null && typeof value === 'object' && 'success' in value && 'data' in value

const baseURL =
  typeof window === 'undefined'
    ? (process.env.API_BASE_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL)
    : process.env.NEXT_PUBLIC_API_BASE_URL

type RefreshResponse = {
  accessToken: string
  expiresIn: number
  tokenType: string
}

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean
}

export const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

const refreshHttp = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

let refreshPromise: Promise<RefreshResponse> | null = null

function unwrapResponseData<T>(data: unknown): T {
  const responseData = keysToCamel(data)

  return (isWrappedResponse(responseData) ? responseData.data : responseData) as T
}

async function refreshAccessToken() {
  refreshPromise ??= refreshHttp
    .post('/api/auth/refresh')
    .then(res => {
      const refreshedToken = unwrapResponseData<RefreshResponse>(res.data)

      setAccessToken(refreshedToken)

      return refreshedToken
    })
    .catch(error => {
      clearAccessToken()
      throw error
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

http.interceptors.request.use(config => {
  const authorizationHeader = getAuthorizationHeader()

  if (authorizationHeader) {
    config.headers.Authorization = authorizationHeader
  } else {
    delete config.headers.Authorization
  }

  return config
})

// 응답 데이터를 camelCase로 변환하고, { success, data } 래퍼를 벗겨서 프론트로 전달한다.
http.interceptors.response.use(
  response => {
    const responseData: unknown = response.data

    response.data = unwrapResponseData<unknown>(responseData)

    return response
  },
  async (error: unknown) => {
    if (!axios.isAxiosError<unknown>(error)) {
      throw error
    }

    const originalRequest = error.config as RetryableRequestConfig | undefined
    const isRefreshRequest = originalRequest?.url?.includes('/api/auth/refresh')

    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !isRefreshRequest
    ) {
      originalRequest._retry = true

      try {
        const refreshedToken = await refreshAccessToken()

        originalRequest.headers.Authorization = `${refreshedToken.tokenType} ${refreshedToken.accessToken}`

        return await http(originalRequest)
      } catch {
        throw error
      }
    }

    if (error.response?.data) {
      error.response.data = keysToCamel(error.response.data)
    }

    throw error
  }
)
