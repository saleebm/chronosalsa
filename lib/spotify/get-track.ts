import { getAuth } from "@/lib/auth/spotify/get-auth"
import { cookies } from "next/headers"
import { strict as assert } from "assert"
import { makeRequest } from "@/lib/spotify/make-request"
import fs from "fs"
import { getFixture } from "@/lib/utils/get-fixture.ts"

export async function getTrack(trackId: string, forceRefresh = false) {
  const authResult = await getAuth(cookies())
  assert.ok(authResult.authenticated)

  let result
  const cachedPath = `${process.cwd()}/fixtures/tracks/${trackId}.json`
  if (!forceRefresh && fs.existsSync(cachedPath)) {
    try {
      const file = getFixture(cachedPath)
      if (file) result = file
    } catch (error) {
      console.log("error", error)
    }
  } else {
    const { auth } = authResult
    const path = `/tracks/${trackId}`
    result = await makeRequest<
      SpotifyApi.TrackObjectFull | { error: SpotifyApi.ErrorObject }
    >(auth, path)
  }

  if ("error" in result) return result
  // write the file to disk for later use
  fs.writeFileSync(cachedPath, JSON.stringify(result))
  return result
}
