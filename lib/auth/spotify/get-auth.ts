import authConfig from "@/config/auth.json"
import { parseCookieValue } from "@/lib/utils/parse-cookie-value"
import { authenticateWithRefresh } from "@/lib/auth/spotify/authenticate-with-refresh"
import { RequestCookies } from "next/dist/compiled/@edge-runtime/cookies"
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies"

export interface AuthToken {
  access_token: string
  token_type: string
  expires_in: string
  refresh_token: string
  scope: string
}

export interface Unauthenticated {
  authenticated: false
}

export interface Authenticated {
  authenticated: true
  auth: AuthToken
}

export type AuthResult = Unauthenticated | Authenticated

export async function getAuth(
  cookieStore: RequestCookies | ReadonlyRequestCookies
): Promise<AuthResult> {
  // todo ensure user exists in db already
  const authCookie = cookieStore.get(authConfig.spotify.tokenName)
  const cookieVal = parseCookieValue<AuthToken>(authCookie?.value)
  if (
    typeof cookieVal === "object" &&
    cookieVal != null &&
    "refresh_token" in cookieVal
  ) {
    const authorized = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/v1/verify-authorization`,
      {
        mode: "same-origin",
        method: "POST",
        body: JSON.stringify(cookieVal),
      }
    ).then((result) => result.json())
    if (authorized.success) {
      const refreshAuth = await authenticateWithRefresh(cookieVal.refresh_token)
      return {
        auth: { ...refreshAuth, refresh_token: cookieVal.refresh_token },
        authenticated: true,
      }
    }
  }

  return {
    authenticated: false,
  }
}
