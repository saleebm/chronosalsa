import { NextResponse } from "next/server"
import * as querystring from "querystring"
import { generateRandomString } from "@/lib/utils/generate-random-string"
import { getCookieValue } from "@/lib/utils/get-cookie-value"
import { Headers } from "next/dist/compiled/@edge-runtime/primitives"
import { serverCookieOpts } from "@/lib/utils/server-cookie-opts"

// Authorize Spotify
export async function GET(request: Request, response: NextResponse) {
  //todo modify this if making public, make it user choice to share
  const scope =
    "playlist-read-private playlist-read-collaborative user-library-read" +
    " user-read-private user-library-read"
  const clientID = process.env.SPOTIFY_CLIENT_ID
  const host = process.env.NEXT_PUBLIC_HOST
  const stateKey = process.env.STATE_SECRET

  if (!clientID || !host || !stateKey) {
    throw new Error("Misconfigured env dude")
  }

  const state = generateRandomString(16)
  const setCookieHeader = getCookieValue(stateKey, state, serverCookieOpts)

  const queryParams = querystring.stringify({
    client_id: clientID,
    response_type: "code",
    redirect_uri: `${host}/api/v1/callback-spotify`,
    state: state,
    scope: scope,
  })

  const headers = new Headers()
  headers.set("Set-Cookie", setCookieHeader)

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${queryParams}`,
    {
      headers,
    }
  )
}
