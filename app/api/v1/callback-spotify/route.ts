// Callback Spotify
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import * as querystring from "querystring"
import { getCookieHeader } from "@/lib/utils/cookie-header"

export async function GET(request: Request) {
  // has middleware to validate silly secret
  const cookieStore = cookies()
  const stateKey = process.env.STATE_SECRET

  const { searchParams } = new URL(request.url)
  const code = searchParams.get("code")
  const state = searchParams.get("state")
  const requestStateCookie = cookieStore.get(stateKey)

  if (!code || !requestStateCookie || requestStateCookie.value !== state) {
    console.log("Unauthorized", { code, requestStateCookie, state })
    return new NextResponse(
      "<h1>Unauthorized</h1>",
      { status: 401, headers: { "content-type": "text/html" } }
    )
  }

  const clientID = process.env.SPOTIFY_CLIENT_ID
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
  const host = process.env.NEXT_PUBLIC_HOST

  if (!clientID || !clientSecret || !host) {
    console.error('CONFIGURE YOUR env DUDE!')
    return new NextResponse(null, { status: 500 })
  }

  const token = Buffer.from(`${clientID}:${clientSecret}`).toString('base64')
  const url = `https://accounts.spotify.com/api/token?${querystring.stringify({
    grant_type: 'authorization_code',
    code,
    redirect_uri: `${host}/api/v1/callback-spotify`
  })}`

  const auth = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${token}`,
      'content-type': 'application/x-www-form-urlencoded'
    },
    redirect: 'follow'
  }).then(result => result.json())

  return NextResponse.json({ success: true })
}
