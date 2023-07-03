import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { strict as assert } from "assert"
import { makeRequest } from "@/lib/spotify/make-request"

export async function getTrack(trackId: string) {
  const authResult = await getAuth(cookies())
  assert.ok(authResult.authenticated)
  const { auth } = authResult
  const path = `/tracks/${trackId}`
  return await makeRequest<
    SpotifyApi.TrackObjectFull | { error: SpotifyApi.ErrorObject }
  >(auth, path)
}
