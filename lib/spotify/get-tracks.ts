import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { strict as assert } from "assert"
import { makeRequest } from "@/lib/spotify/make-request"

export async function getTracks(trackIds: ReadonlyArray<string>) {
  const authResult = await getAuth(cookies())
  assert.ok(authResult.authenticated)
  const { auth } = authResult
  const trackId = trackIds.join(",")
  const path = `/tracks?ids=${trackId}`
  return await makeRequest<
    SpotifyApi.MultipleTracksResponse | { error: SpotifyApi.ErrorObject }
  >(auth, path)
}
