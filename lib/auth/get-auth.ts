import authConfig from "@/config/auth.json"
import { parseCookieValue } from "@/lib/utils/parse-cookie-value"
import { authenticateWithRefresh } from "@/lib/auth/spotify/authenticate-with-refresh"
import { NextRequest } from "next/server"

interface AuthToken {
  access_token: string
  token_type: string
  expires_in: string
  refresh_token: string
  scope: string
}

interface Unauthenticated {
  authenticated: false
}

interface Authenticated {
  authenticated: true
  auth: AuthToken
}

type AuthResult = Unauthenticated | Authenticated

export async function getAuth(request: NextRequest): Promise<AuthResult> {
  const cookieStore = request.cookies
  const authCookie = cookieStore.get(authConfig.spotify.tokenName)
  const cookieVal = parseCookieValue<AuthToken>(authCookie?.value)
  if (typeof cookieVal === "object" && cookieVal != null && "refresh_token" in cookieVal) {
    const refreshAuth = await authenticateWithRefresh(cookieVal.refresh_token)
    return {
      auth: refreshAuth,
      authenticated: true
    }
  }

  return {
    authenticated: false
  }
}
