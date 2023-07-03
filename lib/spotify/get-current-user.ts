import { AuthToken } from "@/lib/auth/spotify/get-auth"
import { strict as assert } from "assert"
import { makeRequest } from "@/lib/spotify/make-request"

export async function getCurrentUser(authToken: AuthToken) {
  assert.ok(!!authToken)
  const path = `/me`
  return await makeRequest<
    SpotifyApi.CurrentUsersProfileResponse | { error: SpotifyApi.ErrorObject }
  >(authToken, path)
}
