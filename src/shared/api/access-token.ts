let accessToken: string | null = null
let tokenType = 'Bearer'

export function setAccessToken(token: { accessToken: string; tokenType?: string }) {
  accessToken = token.accessToken
  tokenType = token.tokenType || 'Bearer'
}

export function clearAccessToken() {
  accessToken = null
  tokenType = 'Bearer'
}

export function getAuthorizationHeader() {
  return accessToken ? `${tokenType} ${accessToken}` : null
}
